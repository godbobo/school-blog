<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户列表" name="lst">
        <div class="table-top-toolbar border-shadow">
          <div class="right-option">
            <el-button v-if="multiplesection.length > 0" type="primary" size="small" icon="el-icon-delete" @click="batchDeleteUser">批量删除</el-button>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="clickAddUser">新增用户</el-button>
          </div>

          <el-input v-model="filtertxt" class="input-with-select" placeholder="请输入搜索内容" @change="handleFilterChanged">
            <el-select slot="prepend" v-model="filtertype" class="select-type">
              <el-option :value="0" label="请选择"/>
              <el-option :value="1" label="登录名"/>
              <el-option :value="2" label="姓名"/>
              <el-option :value="3" label="院系"/>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="handleFilterChanged">搜索</el-button>
          </el-input>
        </div>
        <el-table ref="filterTable" :data="tableData" :stripe="true" style="width: 100%" @selection-change="handleSectionChanged">
          <el-table-column label="选择" type="selection"/>
          <el-table-column :index="indexstart" type="index" width="50"/>
          <el-table-column
            prop="loginname"
            label="登录名"
            sortable
            column-key="id"
          />
          <el-table-column prop="realName" label="姓名"/>
          <el-table-column prop="college" label="系别"/>
          <el-table-column :formatter="formatter" width="120" prop="role" label="角色"/>
          <el-table-column prop="tel" width="120" label="电话"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="resetPwd(scope.row)">重置密码</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :total="tablerows" :page-size="rows" :current-page="pageindex" class="pagination-margin" background layout="prev, pager, next" @current-change="handlePageChanged"/>
      </el-tab-pane>
      <el-tab-pane label="批量增加" name="add">
        <el-alert style="margin-bottom:10px;" title="您上传的Excel文件必须在表头包含role;name;loginname字段，表头信息必须正确才可以识别，详细信息可下载示例文档：" type="warning" show-icon><a :href="exampleurl" class="alert-link">示例文档</a></el-alert>
        <upload-excel-component ref="uploadfile" :on-success="handleSuccess"/>
        <div class="upload-wrap">
          <el-button type="primary" icon="el-icon-upload" @click="uploadExcel">确定上传</el-button>
        </div>
        <el-table :data="uploadtabledata" border highlight-current-row style="width: 100%;margin-top:20px;">
          <el-table-column v-for="item of uploadtableheader" :prop="item" :label="item" :key="item"/>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <el-dialog :visible.sync="addUserDialogVisible" :close-on-click-modal="true" title="添加用户" width="40%">
      <el-form ref="adduserform" :model="userform" :rules="rulesuserform" size="small">
        <el-form-item label="登录名:" prop="loginname">
          <el-input v-model="userform.loginname" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="userform.name" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="院系:" prop="college">
          <el-input v-model="userform.college"/>
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
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import * as user from '@/api/user'
export default {
  name: 'UserManage',
  components: { UploadExcelComponent },
  data() {
    return {
      activeName: 'lst', // 当前 tab 页面
      multiplesection: [], // 选中的数据
      tableData: [], // 表格中用户数据
      tablerows: 0, // 查询结果总数
      rows: 15, // 每页显示数量
      pageindex: 1, // 当前页,分页使用该默认值作为起点，但服务器端使用0作为起点
      addUserDialogVisible: false, // 添加用户弹出框
      userform: {
        loginname: '',
        name: '',
        college: '',
        role: '0'
      }, // 用户表单信息
      rulesuserform: {
        loginname: [
          { required: true, message: '登录名不能为空', trigger: 'blur' },
          { min: 4, message: '长度最少为 4 个字符', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9]+$/, message: '必须为字母或数字', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2-20 个字符', trigger: 'blur' }
        ],
        college: [
          { required: true, message: '院系不能为空', trigger: 'blur' }
        ],
        role: [
          { type: 'enum', enum: ['0', '1', '2'], message: '非法角色属性', trigger: 'blur' }
        ]
      }, // 表单验证格式
      adduserbtnloading: false, // 添加用户按钮的加载状态
      filtertxt: '', // 查询关键字
      filtertype: 0,
      uploadtabledata: [],
      uploadtableheader: [],
      exampleurl: process.env.FILE_URI + 'example/mock01.xlsx'
    }
  },
  computed: {
    indexstart() {
      return this.rows * (this.pageindex - 1) + 1
    }
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
    handleUserList() {
      // 得出查询类型
      if (this.filtertype === 1 && parseInt(this.filtertxt).toString() === 'NaN') {
        this.$message({
          message: '登录名格式不正确',
          type: 'error'
        })
      } else {
        this.$store.dispatch('UserGetLst', { currentpage: this.pageindex - 1, size: this.rows, type: this.filtertype, arg1: this.filtertxt }).then(response => {
          this.tableData = response.lst
          this.tablerows = response.total
        })
      }
    },
    handleAddUser() {
      this.$refs.adduserform.validate(valid => {
        if (valid) {
          this.adduserbtnloading = true
          user.add(this.userform).then(response => {
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
      if (this.pageindex !== 1) {
        this.pageindex = 1
      } else {
        this.handleUserList()
      }
    },
    handleSectionChanged(val) {
      this.multiplesection = val
    },
    handlePageChanged(val) {
      this.pageindex = val
      this.handleUserList()
    },
    handleSuccess({ results, header }) {
      this.uploadtabledata = results
      this.uploadtableheader = header
    },
    deleteUser(row) {
      user.del(row.id).then(data => {
        this.handleUserList()
      })
    },
    resetPwd(row) { // 重置密码
      if (this.$store.getters.roles > 0) { // 教师及管理员拥有重置密码权限
        user.resetPwd(row.id).then(data => {
          this.$notify({
            title: '重置密码成功',
            message: '密码默认为 <span style="color: red">111111</span> ，请提醒该用户及时修改密码',
            type: 'success',
            dangerouslyUseHTMLString: true
          })
        })
      }
    },
    batchDeleteUser() {
      // 获取每一项数据的id
      const ids = []
      this.multiplesection.map(val => {
        ids.push(val.id)
      })
      user.batchDelete(...ids).then(data => {
        this.handleUserList()
      })
    },
    uploadExcel() {
      if (this.uploadtableheader && this.uploadtableheader.length > 0 && this.uploadtabledata && this.uploadtabledata.length > 0) {
        const ml = ['loginname', 'name', 'role']
        // 判断表头是否包含指定字段
        let p = true
        ml.every((val) => {
          if (this.uploadtableheader.indexOf(val) < 0) {
            p = false
            this.$message({
              message: '未找到必填字段，请修改后重试',
              type: 'error'
            })
            return false
          }
        })
        if (p) {
          const f = this.$refs['uploadfile'].$refs['excel-upload-input'].files[0]
          user.batchAddUser(f).then(response => {
            console.log(response)
          })
        }
      }
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

.upload-wrap {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}

.alert-link {
  text-decoration: underline;
}
</style>
