<template>
  <div class="index-container">
    <el-row :gutter="30">
      <el-col :span="16">
        <el-card>
          <div slot="header" class="part-header flex-row-container">
            <h4 class="el-icon-document"> 话题列表</h4>
            <el-button type="text" class="header-button" icon="el-icon-refresh" @click="handleRefresh">刷新</el-button>
          </div>
          <div class="part-body">
            <div v-for="(titem, tindex) in lst" :key="tindex" class="item">
              <router-link :to="'/browser/topic/detail/' + titem.id" class="item-header">{{ titem.name }}</router-link>
              <p class="item-body">{{ titem.summary }}</p>
              <div class="item-footer flex-row-container">
                <div class="left">
                  <el-tag v-for="(tag, tidx) in titem.tags" :key="tidx" :color="tag.background" :style="{ color: tag.color }" :hit="true" class="tag">{{ tag.name }}</el-tag>
                  <div class="count">
                    <span style="color: #409EFF;"><svg-icon icon-class="user"/> {{ titem.usercount }}</span>
                    <span style="color: #67C23A;" class="el-icon-document"> {{ titem.essaycount }}</span>
                  </div>
                </div>
                <div class="right">
                  <span class="timestamp">{{ titem.creator.name }} 创建于 {{ titem.upt }}</span>
                </div>
              </div>
            </div>
            <el-pagination :total="total" :page-size="row" class="page" background layout="prev, pager, next" @current-change="handlePageChange"/>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="part-header flex-row-container">
            <h4><svg-icon icon-class="recommand"/> 推荐列表</h4>
          </div>
          <div class="part-body">
            <div v-for="(about, idx) in aboutlst" :key="idx" class="item">
              <router-link :to="'/browser/topic/detail/' + about.id" class="item-header"><span style="color: red;"><svg-icon icon-class="topic"/></span> {{ about.name }}</router-link>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as topic from '@/api/topic'
export default {
  name: 'BrowserTopicLst',
  data() {
    return {
      lst: [], // 话题列表
      row: 15, // 每页数量
      currentpage: 1, // 当前页数
      total: 0, // 话题总数
      aboutlst: []
    }
  },
  created() {
    this.getLst()
    this.getAboutLst()
  },
  methods: {
    getLst() {
      topic.lst(this.currentpage - 1, this.row).then(data => {
        this.lst = data.lst
        this.total = data.total
      })
    },
    getAboutLst() {
      topic.lstAbout().then(data => {
        this.aboutlst = data.lst
      })
    },
    handlePageChange(val) {
      this.currentpage = val
      this.getLst()
    },
    handleRefresh() {
      this.currentpage = 1
      this.getLst()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.part-header {
  justify-content: space-between;
  h4 {
    display: inline-block;
    font-size: 18px;
    margin: 0;
  }
  .header-button {
    padding: 0;
  }
}

.part-body {
  .item {
    .item-header {
      display: inline-block;
      color: black;
      font-size: 18px;
      font-weight: bold;
      padding-top: 15px;
    }
    .item-body {
      color: $secondaryTxt;
      font-size: 14px;
      line-height: 22px;
    }
    .item-footer {
      justify-content: space-between;
      .left {
        .count {
          display: inline;
          margin-left: 10px;
        }
      }
      .right {
        .timestamp {
          color: $holdTxt;
          font-size: 12px;
          line-height: 32px;
        }
      }
    }
  }
  .page {
    margin-top: 20px;
  }
}
</style>
