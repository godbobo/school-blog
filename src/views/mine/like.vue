<template>
  <div class="index-container">
    <el-tabs type="border-card">
      <el-tab-pane label="我收藏的文章">
        <transition-group name="list">
          <div v-for="(essay, eindex) in essaylst" :key="eindex" class="item">
            <router-link :to="'/browser/essay/detail/' + essay.id" class="item-header">{{ essay.title }}</router-link>
            <p class="item-body">{{ essay.summary }}</p>
            <div class="item-footer flex-row-container">
              <div class="left">
                <el-tag v-for="(tag, tidx) in essay.tags" :key="tidx" :color="tag.background" :style="{ color: tag.color }" :hit="true" class="tag">{{ tag.name }}</el-tag>
                <div class="count">
                  <span style="color: green;"><svg-icon icon-class="eye-open"/> {{ essay.view }}</span>
                  <span style="color: pink;"><svg-icon icon-class="like"/> {{ essay.lovercount }}</span>
                </div>
              </div>
              <div class="right">
                <span class="timestamp">{{ essay.author.name }} 创作于 {{ essay.upt }}</span>
              </div>
            </div>
          </div>
        </transition-group>
        <el-pagination :total="essaytotal" :page-size="rows" class="page" background layout="prev, pager, next" @current-change="handleEssayPageChange"/>
      </el-tab-pane>
      <el-tab-pane label="我加入的话题">
        <transition-group name="list">
          <div v-for="(tpc, tdx) in topiclst" :key="tdx" class="item">
            <router-link :to="'/browser/topic/detail/' + tpc.id" class="item-header">{{ tpc.name }}</router-link>
            <p class="item-body">{{ tpc.summary }}</p>
            <div class="item-footer flex-row-container">
              <div class="left">
                <el-tag v-for="(tag, tindex) in tpc.tags" :key="tindex" :color="tag.background" :style="{ color: tag.color }" :hit="true" class="tag">{{ tag.name }}</el-tag>
                <div class="count">
                  <span style="color: #409EFF;"><svg-icon icon-class="user"/> {{ tpc.usercount }}</span>
                  <span style="color: #67C23A;" class="el-icon-document"> {{ tpc.essaycount }}</span>
                </div>
              </div>
              <div class="right">
                <span class="timestamp">{{ tpc.creator.name }} 创建于 {{ tpc.upt }}</span>
              </div>
            </div>
          </div>
        </transition-group>
        <el-pagination :total="topictotal" :page-size="rows" class="page" background layout="prev, pager, next" @current-change="handleTopicPageChanged"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as essay from '@/api/essay'
import * as topic from '@/api/topic'
export default {
  name: 'MineLike',
  data() {
    return {
      essaylst: [], // 文章列表
      essaycurrentpage: 1, // 当前文章页数
      rows: 15, // 每页显示数量
      essaytotal: 0, // 文章总数
      topiclst: [], // 话题列表
      topiccurrentpage: 1, // 当前话题页数
      topictotal: 0
    }
  },
  mounted() {
    this.getEssayLst()
    this.getTopicLst()
  },
  methods: {
    getEssayLst() {
      essay.lstByLover(this.$store.getters.username, this.essaycurrentpage - 1, this.rows).then(data => {
        this.essaylst = data.essaylst
        this.essaytotal = data.total
      })
    },
    getTopicLst() {
      topic.lstByFollower(this.$store.getters.username, this.topiccurrentpage - 1, this.rows).then(data => {
        this.topiclst = data.topiclst
        this.topictotal = data.total
      })
    },
    handleEssayPageChange(val) {
      this.essaycurrentpage = val
      this.getEssayLst()
    },
    handleTopicPageChanged(val) {
      this.topiccurrentpage = val
      this.getTopicLst()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

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
</style>
