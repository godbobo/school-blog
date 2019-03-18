<template>
  <div class="index-container">
    <div class="title">
      <h1>十大经典算法总结</h1>
      <div class="info">
        <span>老王 创建于 2019-01-03</span>
      </div>
    </div>
    <el-tabs class="tab-container" stretch="true">
      <el-tab-pane class="list">
        <span slot="label">
          <svg-icon icon-class="list"/>文章列表
        </span>
        <div v-for="o in 4" :key="o" class="item">
          <router-link to="/browser/essay/detail/23" class="item-header">十大经典算法总结 - 做个隐士 - 博客园</router-link>
          <p
            class="item-body"
          >十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结</p>
          <div class="item-footer flex-row-container">
            <div class="left">
              <el-tag type="info">标签三</el-tag>
              <el-tag type="info">标签三</el-tag>
              <el-tag type="info">标签三</el-tag>
              <div class="count">
                <span style="color: green;">
                  <svg-icon icon-class="eye-open"/>12
                </span>
                <span style="color: pink;">
                  <svg-icon icon-class="like"/>12
                </span>
              </div>
            </div>
            <div class="right">
              <span class="timestamp">老王 创作于 2019-03-16</span>
            </div>
          </div>
        </div>
        <el-pagination :total="1000" class="page" background layout="prev, pager, next"/>
      </el-tab-pane>
      <el-tab-pane class="summary">
        <span slot="label">
          <svg-icon icon-class="summary"/>话题介绍
        </span>
        消息中心
      </el-tab-pane>
      <el-tab-pane class="comment">
        <span slot="label">
          <svg-icon icon-class="comment"/>评论
        </span>
        <div class="body">
          <el-form ref="comment-form">
            <el-form-item label="写下你的评论：">
              <textarea class="content-ipt" name="content"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">提交</el-button>
            </el-form-item>
          </el-form>
          <h2>评论列表</h2>
          <hr>
          <div class="list">
            <div v-for="o in 4" :key="o" class="item flex-row-container">
              <div class="user-info flex-row-container">
                <img src="https://i.loli.net/2019/03/16/5c8c9b1c3e372.jpg">
                <div class="name-wrap flex-column-container">
                  <span class="name">老王：</span>
                  <span class="time">2019-03-16</span>
                </div>
              </div>
              <div class="content">你的文章写的很棒</div>
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

