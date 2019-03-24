<template>
  <div class="app-container">
    <div class="table-top-toolbar border-shadow">
      <!-- <el-button type="primary" size="small" icon="el-icon-plus" @click="clickAddUser">新增用户</el-button> -->
      <el-input v-model="filtertxt" class="input-with-select" placeholder="请输入搜索内容" @change="handleFilterChanged">
        <el-select slot="prepend" v-model="filtertype" class="select-type">
          <el-option :value="0" label="不过滤" />
          <el-option :value="1" label="按用户id" />
          <el-option :value="2" label="按标题" />
          <el-option :value="3" label="按所在院系" />
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleFilterChanged">搜索</el-button>
      </el-input>
    </div>
    <el-table ref="filterTable" :data="tableData" :stripe="true" style="width: 100%">
      <el-table-column label="选择" type="selection" />
      <el-table-column prop="id" label="编号" sortable column-key="id" width="80px"/>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="topic.name" label="所属话题" sortable/>
      <el-table-column prop="author.name" label="作者" sortable/>
      <el-table-column prop="view" label="浏览量" sortable width="100px"/>
      <el-table-column prop="upt" label="更新时间" />
      <el-table-column label="操作" prop="top" width="250px">
        <template slot-scope="scope">
          <el-button size="mini">查看</el-button>
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
  },
  created() {
    this.handleLst()
  },
  methods: {
    formatter(row, column, cellValue) {
    },
    handleLst(index = this.pageindex) {
      if (index !== this.pageindex) {
        this.pageindex = index
      }
      lst(this.pageindex - 1, 10, 1).then(response => {
        this.tableData = response.lst
        this.tablerows = response.total
      })
    },
    handleSetTop(row, index) {
      const top = row.top === 1 ? 0 : 1
      essaySetTop(row.id, top).then(response => {
        const temp = this.tableData
        temp[index].top = !row.top
        this.tableData = Object.assign({}, temp)
      })
    },
    handleSetHide(row, index) {
      const hide = row.hide === 1 ? 0 : 1
      essaySetHide(row.id, hide).then(response => {
        const temp = this.tableData
        temp[index].hide = !row.hide
        this.tableData = Object.assign({}, temp)
      })
    },
    handleFilterChanged() {
      console.log('点击搜索')
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
