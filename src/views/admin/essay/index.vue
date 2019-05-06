<template>
  <div class="app-container">
    <div class="table-top-toolbar border-shadow">
      <el-input v-model="filtertxt" class="input-with-select" placeholder="请输入搜索内容" @change="handleLst(1)">
        <el-select slot="prepend" v-model="filtertype" class="select-type" @change="handleLst(1)">
          <el-option :value="0" label="请选择" />
          <el-option :value="1" label="登录名" />
          <el-option :value="2" label="标题" />
          <el-option :value="3" label="内容" />
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleLst(1)">搜索</el-button>
      </el-input>
    </div>
    <el-table ref="filterTable" :data="tableData" :stripe="true" style="width: 100%">
      <el-table-column :index="indexstart" type="index" width="50"/>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="topic.name" label="所属话题" sortable/>
      <el-table-column prop="author.realName" label="作者" sortable/>
      <el-table-column prop="view" label="浏览量" sortable width="100px"/>
      <el-table-column prop="upt" label="更新时间" />
      <el-table-column label="操作" prop="top" width="250px">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="browserEssay(scope.row)">查看</el-button>
          <el-button :type="scope.row.top === 1 ? 'primary' : 'default'" size="mini" @click="handleSetTop(scope.row, scope.$index)"><svg-icon icon-class="top"/> 置顶</el-button>
          <el-button :type="scope.row.hide === 1 ? 'primary' : 'default'" size="mini" @click="handleSetHide(scope.row, scope.$index)"><svg-icon icon-class="hidden"/> 隐藏</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="tablerows" :current-page="pageindex" class="pagination-margin" background layout="prev, pager, next" @current-change="handleLst" />
  </div>
</template>

<script>
import { lst, essaySetTop, essaySetHide } from '@/api/essay'

export default {
  name: 'UserManage',
  data() {
    return {
      tableData: [], // 表格中用户数据
      tablerows: 0, // 查询结果总数
      pageindex: 1, // 当前页,分页使用该默认值作为起点，但服务器端使用0作为起点
      filtertxt: '', // 查询关键字
      filtertype: 0
    }
  },
  computed: {
    indexstart() {
      return 10 * (this.pageindex - 1) + 1
    }
  },
  created() {
    this.handleLst()
  },
  methods: {
    handleLst(index = this.pageindex) {
      // 得出查询类型
      if (index !== this.pageindex) {
        this.pageindex = index
      }
      lst(this.pageindex - 1, 10, 1, this.filtertype, this.filtertxt).then(response => {
        if (response.total !== 0) {
          this.tableData = response.lst
        } else {
          this.tableData = []
        }
        this.tablerows = response.total
      })
    },
    handleSetTop(row, index) {
      const top = row.top === 1 ? 0 : 1
      essaySetTop(row.id, top).then(response => {
        const temp = this.tableData
        temp[index].top = top
        this.tableData = Object.assign({}, temp)
      })
    },
    handleSetHide(row, index) {
      const hide = row.hide === 1 ? 0 : 1
      essaySetHide(row.id, hide).then(response => {
        const temp = this.tableData
        temp[index].hide = hide
        this.tableData = Object.assign({}, temp)
      })
    },
    browserEssay(row) {
      this.$router.push('/browser/essay/detail/' + row.id)
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
