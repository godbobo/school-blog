<template>
  <div class="index-container">
    <el-card :body-style="{padding:'0'}" class="comment-wrap">
      <div slot="header" class="header">
        <span>消息管理</span>
      </div>
      <div class="body flex-row-container">
        <div class="list">
          <el-tabs :stretch="true" class="tabs" body type="border-card">
            <el-tab-pane label="未读消息(20)">
              <div class="item flex-row-container">
                <div class="avator">
                  <img src="https://i.loli.net/2019/03/16/5c8c9b1c3e372.jpg">
                </div>
                <div class="info">
                  <span>老刘</span>
                  <p>@老刘 评论了你的文章</p>
                </div>
                <div class="option">
                  <el-button class="button" type="danger" icon="el-icon-delete"/>
                </div>
              </div>
              <div class="no-data">
                <span>暂无数据</span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已读消息">已读消息</el-tab-pane>
          </el-tabs>
        </div>
        <div class="chat flex-column-container">
          <div class="header">
            <span>老刘</span>
          </div>
          <div class="body">
            <div class="chat-item flex-row-container">
              <div class="name">
                <a>老王:</a>
              </div>
              <div class="content">
                <p>你的这篇文章写的很好，可以交个朋友吗</p>
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

