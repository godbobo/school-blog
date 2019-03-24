<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户列表" name="lst">
        <div class="table-top-toolbar border-shadow">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="clickAddUser">新增用户</el-button>
          <el-input v-model="filtertxt" class="input-with-select" placeholder="请输入搜索内容" @change="handleFilterChanged">
            <el-select slot="prepend" v-model="filtertype" class="select-type">
              <el-option :value="0" label="不过滤"/>
              <el-option :value="1" label="按用户id"/>
              <el-option :value="2" label="按姓名"/>
              <el-option :value="3" label="按所在院系"/>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="handleFilterChanged">搜索</el-button>
          </el-input>
        </div>
        <el-table ref="filterTable" :data="tableData" :stripe="true" style="width: 100%">
          <el-table-column label="选择" type="selection"/>
          <el-table-column
            prop="id"
            label="编号"
            sortable
            column-key="id"
          />
          <el-table-column prop="name" label="姓名"/>
          <el-table-column prop="college" label="系别"/>
          <el-table-column :formatter="formatter" prop="role" label="角色"/>
          <el-table-column prop="tel" label="电话"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini">编辑</el-button>
              <el-button size="mini" type="danger">删除</el-button>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  更多<i class="el-icon-arrow-down el-icon--right"/>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>Ta 的文章</el-dropdown-item>
                  <el-dropdown-item>Ta 参与的话题</el-dropdown-item>
                  <el-dropdown-item>Ta 的资料</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :total="tablerows" :current-page="pageindex" class="pagination-margin" background layout="prev, pager, next" @current-change="handleUserList"/>
      </el-tab-pane>
      <el-tab-pane label="批量增加" name="add">配置管理</el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="addUserDialogVisible" :close-on-click-modal="true" title="添加用户" width="40%">
      <el-form ref="adduserform" :model="userform" :rules="rulesuserform">
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="userform.name" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="院系:" prop="college">
          <el-input v-model="userform.college"/>
        </el-form-item>
        <el-form-item label="手机号:" prop="tel">
          <el-input v-model="userform.tel" type="tel"/>
        </el-form-item>
        <el-form-item label="角色:" prop="role">
          <el-radio v-model="userform.role" label="0">学生</el-radio>
          <el-radio v-model="userform.role" label="1">教师</el-radio>
          <el-radio v-model="userform.role" label="2">管理员</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addUserDialogVisible = false">取 消</el-button>
        <el-button :loading="adduserbtnloading" size="small" type="primary" @click="handleAddUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserManage',
  data() {
    return {
      activeName: 'lst', // 当前 tab 页面
      tableData: [], // 表格中用户数据
      tablerows: 0, // 查询结果总数
      pageindex: 1, // 当前页,分页使用该默认值作为起点，但服务器端使用0作为起点
      addUserDialogVisible: false, // 添加用户弹出框
      userform: {
        name: '',
        college: '',
        tel: undefined,
        role: '0'
      }, // 用户表单信息
      rulesuserform: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2-20 个字符', trigger: 'blur' }
        ],
        college: [
          { required: true, message: '院系不能为空', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        role: [
          { type: 'enum', enum: ['0', '1', '2'], message: '非法角色属性', trigger: 'blur' }
        ]
      }, // 表单验证格式
      adduserbtnloading: false, // 添加用户按钮的加载状态
      filtertxt: '', // 查询关键字
      filtertype: 0
    }
  },
  computed: {
  },
  created() {
    this.handleUserList(this.pageindex)
  },
  methods: {
    formatter(row, column, cellValue) {
      if (cellValue === 0) {
        return '学生'
      } else if (cellValue === 1) {
        return '教师'
      } else if (cellValue === 2) {
        return '管理员'
      } else {
        return '非法用户'
      }
    },
    clickAddUser() {
      this.addUserDialogVisible = true
    },
    handleUserList(index = this.pageindex) {
      if (index !== this.pageindex) {
        this.pageindex = index
      }
      // 得出查询类型
      this.$store.dispatch('UserGetLst', { currentpage: index - 1, size: 10, type: this.filtertype, arg1: this.filtertxt }).then(response => {
        this.tableData = response.lst
        this.tablerows = response.total
      })
    },
    handleAddUser() {
      this.$refs.adduserform.validate(valid => {
        if (valid) {
          this.adduserbtnloading = true
          this.$store.dispatch('UserAdd', this.userform).then(response => {
            this.adduserbtnloading = false
            this.addUserDialogVisible = false
            // 若增加用户成功则刷新列表

            this.handleUserList()
          }).catch(() => {
            this.adduserbtnloading = false
          })
        } else {
          return false
        }
      })
    },
    handleFilterChanged() {
      this.handleUserList()
    }
  }
}
</script>

<style lang="scss" scoped>
.input-with-select {
  width: 500px;
  .select-type {
    width: 120px;
  }
}
</style>
