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
                  <span>{{ unread.creator.name }}({{ unread.repeat }})</span>
                  <p>{{ unread.content }}</p>
                </div>
                <!-- <div class="option">
                  <el-button class="button" type="danger" icon="el-icon-delete" @click="deleteMsg(unread.creator.id, $event)"/>
                </div> -->
              </div>
              <div v-if="showunreadtip" class="no-data">
                <span>暂无数据</span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已读消息">
              <div v-for="(read, rdx) in readlst" :key="rdx" class="item flex-row-container" @click="handleClickTarget(read)">
                <div class="avator">
                  <img :src="read.creator.headimg">
                </div>
                <div class="info">
                  <span>{{ read.creator.name }}</span>
                  <p>{{ read.content }}</p>
                </div>
                <!-- <div class="option">
                  <el-button class="button" type="danger" icon="el-icon-delete" @click="deleteMsg(read.creator.id, $event)"/>
                </div> -->
              </div>
              <div v-if="showreadtip" class="no-data">
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
                <a v-if="!showLink(record.creator.id)">{{ record.creator.name }}:</a>
                <span v-if="showLink(record.creator.id)">{{ record.creator.name }}:</span>
              </div>
              <div class="content">
                <p v-if="record.type in [0,1,2]" v-html="record.content"/>
                <p v-if="!(record.type in [0,1,2])">{{ record.content }}</p>
              </div>
            </div>
          </div>
          <div class="footer">
            <textarea v-model="msgcontent" placeholder="回车键以发送消息" @keyup.enter="sendMessage"/>
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

let websocket = null

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
      recordtotal: 0, // 聊天记录总数
      msgcontent: ''
    }
  },
  computed: {
    showLink() {
      return function(id) {
        return this.$store.getters.username === id
      }
    },
    showunreadtip() {
      return this.unreadlst.length === 0
    },
    showreadtip() {
      return this.readlst.length === 0
    }
  },
  created() {
    setTimeout(() => {
      // 判断当前浏览器是否支持websocket
      if ('WebSocket' in window) {
        websocket = new WebSocket(`${process.env.WS_API}ws/message/${this.$store.getters.username}`)
      }
      if (websocket) {
        websocket.onopen = function() {
          console.log('ws opening...')
        }
        websocket.onmessage = (e) => {
          const m = JSON.parse(e.data)
          console.log('接收到消息：', m.data.msg.content)
          // 如果当前聊天窗口是目标对象。则直接添加记录
          if (this.target.id === m.data.msg.creator.id) {
            this.addRecord(m.data.msg)
          } else {
            let isadd = false
            this.unreadlst.every(val => {
              if (val.creator.id === m.data.msg.creator.id) { // 如果存在相同的目标，则将未读消息数量+1
                console.log('存在相同目标')
                val.repeat++
                isadd = true
                return false
              }
            })
            if (!isadd) { // 如果不存在相同目标，添加新的消息
              this.unreadlst = [m.data.msg, ...this.unreadlst]
            }
          }
        }
      }
    }, 1000)
  },
  mounted() {
    this.getLst(0)
    this.getLst(1)
  },
  beforeDestroy() {
    if (websocket) {
      websocket.close()
    }
  },
  methods: {
    getLst(type) {
      msg.lst(type).then(data => {
        if (type === 0) {
          this.unreadlst = [...this.unreadlst, ...data.lst]
          this.unreadlsttotal = data.total
        } else if (type === 1) {
          this.readlst = [...this.readlst, ...data.lst]
          this.readlsttotal = data.total
        }
      })
    },
    getRecord() {
      msg.lstFromTarget(this.target.id).then(data => {
        this.recordlst = data.lst.reverse()
        this.recordtotal = data.total
      })
    },
    sendMessage(e) {
      e.preventDefault()
      if (this.target.id) {
        msg.send(this.target.id, this.msgcontent).then(data => {
          this.addRecord(data.msg)
          this.msgcontent = ''
        })
      } else {
        this.$message({
          message: '请选择用户后发送消息',
          type: 'error'
        })
      }
    },
    // deleteMsg(id, e) {
    //   e.preventDefault() // 阻止点击穿透
    //   msg.del(id).then(data => {
    //     console.log('success')
    //   })
    // },
    addRecord(msg) {
      this.recordlst = [...this.recordlst, msg]
      this.recordtotal++
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
          &:hover .option {
            display: inline-block;
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
            display: none;
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

