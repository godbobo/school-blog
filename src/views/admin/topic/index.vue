<template>
  <div class="app-container">
    <div class="table-top-toolbar border-shadow">
      <el-input v-model="filtertxt" class="input-with-select" placeholder="请输入搜索内容" @change="handleFilterChanged">
        <el-select slot="prepend" v-model="filtertype" class="select-type" @change="handleFilterChanged">
          <el-option :value="0" label="请选择" />
          <el-option :value="1" label="登录名" />
          <el-option :value="2" label="标题" />
          <el-option :value="3" label="介绍" />
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleFilterChanged">搜索</el-button>
      </el-input>
    </div>
    <el-table ref="filterTable" :data="lst" :stripe="true" style="width: 100%">
      <el-table-column :index="indexstart" type="index" width="50"/>
      <el-table-column prop="name" label="标题" />
      <el-table-column :formatter="formatter" prop="tags" label="标签"/>
      <el-table-column prop="creator.realName" label="创建者" sortable/>
      <el-table-column prop="essaycount" label="文章数量" sortable width="100px"/>
      <el-table-column prop="usercount" label="参与数" sortable width="100px"/>
      <el-table-column prop="upt" label="创建时间" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="browserTopic(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="total" :page-size="rows" class="pagination-margin" background layout="prev, pager, next" @current-change="handlePageChanged" />
  </div>
</template>

<script>
import * as topic from '@/api/topic'

export default {
  name: 'AdminTopicManage',
  data() {
    return {
      lst: [], // 表格中用户数据
      rows: 15, // 每页显示数量
      total: 0, // 查询结果总数
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
    this.getLst()
  },
  methods: {
    formatter(row, column, cellValue) {
      let res = ''
      if (row.tags) {
        row.tags.map(val => {
          res += val.name + ','
        })
      }
      return res === '' ? res : res.substr(0, res.length - 1)
    },
    getLst() {
      topic.lst(this.pageindex - 1, this.rows, this.filtertype, this.filtertxt).then(response => {
        if (response.total !== 0) {
          this.lst = response.lst
        } else {
          this.lst = []
        }
        this.total = response.total
      })
    },
    handlePageChanged(val) {
      this.pageindex = val
      this.getLst()
    },
    handleFilterChanged() {
      if (this.pageindex !== 1) {
        this.pageindex = 1
      } else {
        this.getLst()
      }
    },
    browserTopic(row) {
      this.$router.push('/browser/topic/detail/' + row.id)
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
