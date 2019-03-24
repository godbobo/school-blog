<template>
  <div class="index-container">
    <div class="title">
      <h1>{{ topic.name }}</h1>
      <div class="info">
        <span>{{ topic.creator.name }} 创建于 {{ topic.upt }}</span>
      </div>
    </div>
    <el-tabs :stretch="true" class="tab-container">
      <el-tab-pane class="list">
        <span slot="label">
          <svg-icon icon-class="list"/>文章列表
        </span>
        <transition-group name="list">
          <div v-for="(essay, idx) in essaylst" :key="idx" class="item">
            <router-link :to="'/browser/essay/detail/' + essay.id" class="item-header">{{ essay.title }}</router-link>
            <p class="item-body">{{ essay.summary }}</p>
            <div class="item-footer flex-row-container">
              <div class="left">

                <el-tag v-for="(tag, tindex) in essay.tags" :key="tindex" :color="tag.background" :style="{ color: tag.color }" :hit="true" class="tag">{{ tag.name }}</el-tag>
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
        <el-pagination :total="essaytotal" :page-size="essayrows" class="page" background layout="prev, pager, next" @current-change="handleEssayPageChange"/>
      </el-tab-pane>
      <el-tab-pane class="summary">
        <span slot="label">
          <svg-icon icon-class="summary"/>话题介绍
        </span>
        <viewer :value="topic.summary" />
      </el-tab-pane>
      <el-tab-pane class="comment">
        <span slot="label">
          <svg-icon icon-class="comment"/>评论
        </span>
        <div class="body">
          <el-form ref="comment-form">
            <el-form-item label="写下你的评论：">
              <textarea v-model="commentcontent" class="content-ipt" name="content"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="sendComment">提交</el-button>
            </el-form-item>
          </el-form>
          <h2>评论列表</h2>
          <hr>
          <div class="list">
            <div v-for="(comment, cdx) in commentlst" :key="cdx" class="item flex-row-container">
              <div class="user-info flex-row-container">
                <img :src="comment.creator.headimg">
                <div class="name-wrap flex-column-container">
                  <span class="name">{{ comment.creator.name }}：</span>
                  <span class="time">{{ comment.upt }}</span>
                </div>
              </div>
              <div class="content">{{ comment.content }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane class="file">
        <span slot="label">
          <svg-icon icon-class="file"/>文件
        </span>
        定时任务补偿
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as topic from '@/api/topic'
import * as essay from '@/api/essay'
import * as comment from '@/api/comment'
import 'tui-editor/dist/tui-editor-contents.css'
import 'highlight.js/styles/github.css'
import Viewer from '@toast-ui/vue-editor/src/Viewer.vue'
export default {
  name: 'BrowserTopicDetail',
  components: { Viewer },
  props: {
    id: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      topic: {
        name: '',
        creator: {
          name: ''
        },
        upt: '',
        summary: ''
      }, // 文章基本信息
      essaylst: [], // 文章列表
      essaycurrentpage: 1, // 当前文章页数
      essayrows: 15, // 每页显示文章数量
      essaytotal: 0, // 文章总数
      commentcontent: '', // 评论内容
      commentlst: [], // 评论列表
      commentcurrentpage: 1, // 当前评论页数
      commnetrows: 10, // 每页显示评论数量
      commenttotal: 0
    }
  },
  mounted() {
    this.getTopic()
  },
  methods: {
    getTopic() {
      topic.find(this.id).then(data => {
        this.getEssayLst()
        this.getCommentLst()
        this.topic = data.topic
      })
    },
    getEssayLst() {
      essay.lstByTopic(this.id, this.essaycurrentpage - 1, this.essayrows).then(data => {
        this.essaylst = data.essaylst
        this.essaytotal = data.total
      })
    },
    sendComment() {
      comment.add(this.commentcontent, 1, this.id).then(() => {
        this.commentcontent = ''
        this.getCommentLst()
      })
    },
    getCommentLst() {
      comment.lst(this.commentcurrentpage - 1, this.commnetrows, 1, this.id).then(data => {
        this.commentlst = data.commentlst
        this.commenttotal = data.total
      })
    },
    handleEssayPageChange(val) {
      this.essaycurrentpage = val
      this.getEssayLst()
    },
    handleCommentPageChanged(val) {
      this.commentcurrentpage = val
      this.getCommentLst()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.title {
  .info {
    color: $secondaryTxt;
  }
}

.tab-container {
  margin-top: 20px;
  .el-tabs {
    background: $fourBorder;
  }
  .list {
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
  .comment {
    .body {
      .el-form-item {
        margin: 0;
        .content-ipt {
          width: 100%;
          height: 100px;
          resize: none;
        }
      }
    }
    .list {
      .item {
        margin-top: 20px;
        .user-info {
          img {
            width: 50px;
            height: 50px;
          }
          .name-wrap {
            justify-content: center;
            padding-right: 10px;
            .name {
              text-align: right;
            }
            .time {
              margin-top: 5px;
              color: $secondaryTxt;
              font-size: 14px;
            }
          }
        }
        .content {
          background: $fourBorder;
          padding: 5px;
          flex-grow: 1;
        }
      }
    }
  }
}
</style>

