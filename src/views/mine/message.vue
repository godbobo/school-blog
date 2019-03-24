<template>
  <div class="index-container">
    <el-card :body-style="{padding:'0'}" class="comment-wrap">
      <div slot="header" class="header">
        <span>消息管理</span>
      </div>
      <div class="body flex-row-container">
        <div class="list">
          <el-tabs :stretch="true" class="tabs" body type="border-card">
            <el-tab-pane :label="`未读消息(${unreadlsttotal})`">
              <div v-for="(unread, udx) in unreadlst" :key="udx" class="item flex-row-container" @click="handleClickTarget(unread)">
                <div class="avator">
                  <img :src="unread.creator.headimg">
                </div>
                <div class="info">
                  <span>{{ unread.creator.name }}</span>
                  <p>{{ unread.content }}</p>
                </div>
                <div class="option">
                  <el-button class="button" type="danger" icon="el-icon-delete"/>
                </div>
              </div>
              <div class="no-data">
                <span>暂无数据</span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已读消息">
              <div v-for="(read, rdx) in readlst" :key="rdx" class="item flex-row-container">
                <div class="avator">
                  <img :src="read.creator.headimg">
                </div>
                <div class="info">
                  <span>{{ read.creator.name }}</span>
                  <p>{{ read.content }}</p>
                </div>
                <div class="option">
                  <el-button class="button" type="danger" icon="el-icon-delete"/>
                </div>
              </div>
              <div class="no-data">
                <span>暂无数据</span>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="chat flex-column-container">
          <div class="header">
            <span>{{ target.name }}</span>
          </div>
          <div class="body">
            <div v-for="(record, cdx) in recordlst" :key="cdx" class="chat-item flex-row-container">
              <div class="name">
                <a>{{ record.creator.name }}:</a>
              </div>
              <div class="content">
                <p>{{ record.content }}</p>
              </div>
            </div>
          </div>
          <div class="footer">
            <textarea placeholder="回车键以发送消息"/>
          </div>
          <div class="no-data flex-column-container">
            <span>暂无内容</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as msg from '@/api/message'
export default {
  name: 'MineMessage',
  data() {
    return {
      readlst: [], // 消息列表
      rows: 15, // 每页消息数量
      readlstcurrentpage: 1, // 当前消息页数
      readlsttotal: 0, // 已读消息总数
      unreadlst: [], // 消息列表
      unreadlstcurrentpage: 1, // 当前消息页数
      unreadlsttotal: 0, // 已读消息总数
      target: {
        id: undefined,
        name: ''
      }, // 聊天对象
      recordlst: [], // 聊天记录列表
      recordcurrentpage: 1, // 当前聊天记录页数
      recordtotal: 0
    }
  },
  mounted() {
    this.getLst(0)
    this.getLst(1)
  },
  methods: {
    getLst(type) {
      msg.lst(type).then(data => {
        if (type === 0) {
          this.unreadlst = Object.assign(this.unreadlst, data.lst)
          this.unreadlsttotal = data.total
        } else if (type === 1) {
          this.readlst = Object.assign(this.readlst, data.lst)
          this.readlsttotal = data.total
        }
      })
    },
    getRecord() {
      console.log(this.target)
      msg.lstFromTarget(this.target.id).then(data => {
        this.recordlst = Object.assign(this.recordlst, data.lst)
        this.recordtotal = data.total
      })
    },
    handleClickTarget(target) {
      this.target = target.creator
      this.getRecord()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.comment-wrap {
  .header {
    text-align: center;
    span {
      font-weight: bold;
    }
  }
  .body {
    .list {
      height: calc(100vh - 210px);
      width: 40%;
      .tabs {
        height: 100%;
        overflow: auto;
        .item {
          cursor: pointer;
          padding: 5px;
          &:hover {
            background: $threeBorder;
          }
          .avator {
            img {
              width: 60px;
              height: 60px;
              border-radius: 30px;
            }
          }
          .info {
            padding: 0 10px;
            flex-grow: 1;
            span {
              font-weight: bold;
            }
            p {
              color: $secondaryTxt;
              font-size: 14px;
            }
          }
          .option {
            .button {
              height: 100%;
            }
          }
        }
        .no-data {
          text-align: center;
          span {
            color: $holdTxt;
            font-size: 14px;
          }
        }
      }
    }
    .chat {
      background: $fourBorder;
      height: calc(100vh - 210px);
      width: 60%;
      .header {
        background: $threeBorder;
        text-align: center;
        border-bottom: $oneBorder solid 1px;
        height: 40px;
        span {
          font-weight: normal;
          line-height: 40px;
        }
      }
      .body {
        flex-grow: 1;
        padding: 15px;
        overflow: auto;
        .chat-item {
          margin-top: 10px;
          .name {
            a {
              color: #409EFF;
            }
          }
          .content {
            p {
              margin-top: 0;
              margin-left: 5px;
            }
          }
        }
      }
      .footer {
        border-top: 1px solid $oneBorder;
        height: 120px;
        textarea {
          resize: none;
          height: 100%;
          width: 100%;
          padding: 10px;
        }
      }
      .no-data {
        display: none;
        text-align: center;
        justify-content: center;
        height: 100%;
        span {
          color: $holdTxt;
        }
      }
    }
  }
}
</style>

