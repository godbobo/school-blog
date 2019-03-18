<template>
  <div class="index-container">
    <el-row :gutter="30">
      <el-col :span="16">
        <el-card class="content-card">
          <div slot="header" class="header">
            <h1>十大经典算法总结 - 做个隐士 - 博客园</h1>
            <div class="info">
              <span>老王 创作于 2019-03-16</span>
              <span>标签：笔记、框架、java</span>
              <span>所属话题：Spring Boot</span>
            </div>
          </div>
          <p>十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结</p>
        </el-card>
        <el-card class="comment-card">
          <div slot="header" class="header">
            <h3><svg-icon icon-class="comment"/> 评论</h3>
          </div>
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
                <div class="content">
                  你的文章写的很棒
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="author-card">
          <div slot="header" class="header flex-row-container">
            <h3><svg-icon icon-class="user"/> 作者</h3>
            <el-button type="text" class="button">关注</el-button>
          </div>
          <div class="body">
            <div class="avator-wrap">
              <img src="https://i.loli.net/2019/03/16/5c8c9b1c3e372.jpg">
            </div>
            <div class="info">
              <h2>老王</h2>
              <div>信息工程系</div>
            </div>
          </div>
          <div class="footer flex-row-container">
            <div class="item">
              <div class="title">文章</div>
              <div class="count">23</div>
            </div>
            <div class="item">
              <div class="title">话题</div>
              <div class="count">23</div>
            </div>
            <div class="item">
              <div class="title">收藏</div>
              <div class="count">23</div>
            </div>
            <div class="item">
              <div class="title">关注者</div>
              <div class="count">23</div>
            </div>
          </div>
        </el-card>
        <el-card class="about-card">
          <div slot="header" class="header">
            <h3><svg-icon icon-class="recommand"/> 相关推荐</h3>
          </div>
          <div class="body">
            <a>十大经典算法总结 - 做个隐士 - 博客园</a>
            <a>十大经典算法总结 - 做个隐士 - 博客园</a>
            <a>十大经典算法总结 - 做个隐士 - 博客园</a>
            <a>十大经典算法总结 - 做个隐士 - 博客园</a>
          </div>
        </el-card>
        <el-card class="directory-card">
          <div slot="header" class="header">
            <h3><svg-icon icon-class="directory"/> 目录</h3>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'EssayDetail',
  data() {
    return {
      essay: {},
      test: ''
    }
  },
  created() {
    // 创建组件后需要做的工作
    console.log(this.$route.params)
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.content-card {
  .header {
    h1 {
      margin: 0;
    }
    .info {
      margin-top: 20px;
      font-size: 14px;
      color: $secondaryTxt;
      span {
        margin-right: 15px;
      }
    }
  }
}

.comment-card {
  margin-top: 15px;
  .header {
    h3 {
      margin: 0;
    }
  }
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

.author-card {
  .header {
    justify-content: space-between;
    h3 {
      display: inline-block;
      margin: 0;
    }
    .button {
      padding: 0;
    }
  }
  .body {
    height: 100px;
    .avator-wrap {
      float: left;
      margin-right: 15px;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .info {
      float: left;
    }
  }
  .footer {
    margin-top: 15px;
    justify-content: space-around;
    .item {
      text-align: center;
      .title {
        font-weight: bold;
      }
      .count {
        margin-top: 6px;
      }
    }
  }
}

.about-card {
  margin-top: 15px;
  .header {
    h3 {
      margin: 0;
    }
  }
  .body {
    a {
      display: inline-block;
      margin: 5px;
    }
  }
}

.directory-card {
  margin-top: 15px;
  .header {
    h3 {
      margin: 0;
    }
  }
}
</style>
