<template>
  <div class="index-container">
    <el-row :gutter="30">
      <el-col :span="16">
        <el-card class="content-card">
          <div slot="header" class="header">
            <h1>{{ essay.title }}</h1>
            <div class="info">
              <span>{{ essay.author.name }} 创作于 {{ essay.upt }}</span>
              <span v-if="essay.tags">标签：{{ taglst }}</span>
              <span v-if="essay.topic">所属话题：{{ essay.topic.name }}</span>
            </div>
          </div>
          <transition name="fade">
            <viewer v-loading="isloading" v-if="essay.content.length > 0" :value="essay.content"/>
          </transition>
        </el-card>
        <el-card class="comment-card">
          <div slot="header" class="header">
            <h3><svg-icon icon-class="comment"/> 评论</h3>
          </div>
          <div class="body">
            <el-form ref="comment-form">
              <el-form-item label="写下你的评论：">
                <textarea v-model="commentcontent" class="content-ipt" name="content"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleCommentAdd">提交</el-button>
              </el-form-item>
            </el-form>
            <h2>评论列表</h2>
            <hr>
            <div class="list">
              <comment :comments="commentlst" @commit-comment="handleSubCommentAdd" />
            </div>
            <el-pagination :total="commenttotal" :current-page="commentpage" :page-size="commentrows" class="page" background layout="prev, pager, next" @current-change="onPageChanged"/>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="author-card">
          <div slot="header" class="header flex-row-container">
            <h3><svg-icon icon-class="user"/> 作者</h3>
            <el-button v-if="count.isfollow" type="primary" class="button" @click="handleFollow">取消关注</el-button>
            <el-button v-if="!count.isfollow" type="text" class="button" @click="handleFollow">关注</el-button>
          </div>
          <div class="body">
            <div class="avator-wrap">
              <img :src="essay.author.headimg">
            </div>
            <div class="info">
              <h2>{{ essay.author.name }}</h2>
              <div>{{ essay.author.college }}</div>
            </div>
          </div>
          <div class="footer flex-row-container">
            <div class="item">
              <div class="title">文章</div>
              <div class="count">{{ count.wzcount }}</div>
            </div>
            <div class="item">
              <div class="title">话题</div>
              <div class="count">{{ count.htcount }}</div>
            </div>
            <div class="item">
              <div class="title">收藏</div>
              <div class="count">{{ count.sccount }}</div>
            </div>
            <div class="item">
              <div class="title">粉丝</div>
              <div class="count">{{ count.fscount }}</div>
            </div>
          </div>
        </el-card>
        <el-card class="file-card">
          <div slot="header" class="header">
            <h3><svg-icon icon-class="resource"/> 资源下载</h3>
          </div>
          <div class="body">
            <el-upload
              :before-remove="handleFileRemove"
              :before-upload="beforeUpload"
              :on-preview="downloadFile"
              :file-list="filelst"
              :multiple="false"
              :action="uploadapi"
              :headers="header"
              :data="uploadfileparam"
              class="upload-demo">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </el-card>
        <el-card v-if="aboutlst.length > 0" class="about-card">
          <div slot="header" class="header">
            <h3><svg-icon icon-class="recommand"/> 相关推荐</h3>
          </div>
          <div class="body">
            <router-link v-for="(aboutitem, aindex) in aboutlst" :key="aindex" :to="'/browser/essay/detail/' + aboutitem.id">{{ aboutitem.title }}</router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="like flex-column-container" @click="handleLike">
      <svg-icon :class="{ 'normal': !isfav, 'primary': isfav }" icon-class="real-heart"/>
    </div>
    <scroll-top/>
  </div>
</template>

<script>
import { find, essayLstAbout, essaySetLike } from '@/api/essay'
import { userCount, userFollow } from '@/api/user'
import * as comment from '@/api/comment'
import * as resource from '@/api/file'
import 'tui-editor/dist/tui-editor-contents.css'
import 'highlight.js/styles/github.css'
import Viewer from '@toast-ui/vue-editor/src/Viewer.vue'
import ScrollTop from '@/components/ScrollTop/index.vue'
import Comment from '@/components/Comment/index.vue'

export default {
  name: 'EssayDetail',
  components: { Viewer, ScrollTop, Comment },
  props: {
    id: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      essay: {
        title: '', // 标题
        content: '', // 文章内容
        author: {
          name: '', // 姓名
          college: ''
        }
      },
      aboutlst: [],
      uploadapi: process.env.BASE_API + 'file/upload',
      header: {
        'Authorization': this.$store.getters.token
      },
      filelst: [], // 文件列表
      uploadfileparam: {
        queryType: 0,
        id: this.id
      }, // 上传文件时附加的参数
      count: {
        wzcount: 0, // 文章数量
        htcount: 0, // 话题数量
        sccount: 0, // 收藏数量
        fscount: 0, // 粉丝数量
        isfollow: false, // 当前登录用户是否关注该用户,
        isfav: false // 当前登录用户是否收藏该文章
      },
      commentcontent: '', // 评论框内容
      commentlst: [], // 评论列表
      commenttotal: 0, // 评论数量
      commentrows: 6, // 每页显示评论数量
      commentpage: 1, // 评论列表当前页
      isfav: false, // 是否已收藏该文章
      isloading: false
    }
  },
  computed: {
    taglst() {
      let temp = ''
      this.essay.tags.map(val => {
        temp += (val.name + '、')
      })
      return temp.substr(0, temp.length - 1)
    }
  },
  watch: {
    '$route'(to, from) {
      this.handleDetail() // 重新获取数据
    }
  },
  created() {
    // 创建组件后需要做的工作
    this.handleDetail()
    this.handleCommentLst()
  },
  methods: {
    handleDetail() {
      this.isloading = true
      find(this.id, 0).then(response => {
        this.isloading = false
        this.essay = response.essay
        this.isfav = response.isfav
        this.filelst = response.essay.files
        this.handleCount(this.essay.author.id)
        // 若存在所属话题则获取相关文章
        if (this.essay.topic) {
          this.handleLst(this.essay.topic.id)
        }
      }).catch(() => {
        this.isloading = false
        // 文章获取失败则重定向到404页面
        this.$router.replace('/404')
      })
    },
    handleLst(id) {
      essayLstAbout(id).then(response => {
        this.aboutlst = response.aboutlst
      })
    },
    handleCount(id) {
      userCount(id).then(response => {
        this.count = response
      })
    },
    handleFollow() {
      const type = this.count.isfollow ? 1 : 0
      userFollow(this.essay.author.id, type).then(response => {
        this.count.isfollow = !this.count.isfollow
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      })
    },
    handleCommentAdd() {
      comment.add(this.commentcontent, 0, this.id).then(response => {
        this.commentcontent = ''
        this.$message({
          message: '评论成功',
          type: 'success'
        })
        this.handleCommentLst()
      })
    },
    handleSubCommentAdd(content, commentid, creatorid) {
      console.log(content, commentid, creatorid)
      comment.addSubComment(content, commentid, creatorid).then(response => {
        this.$message({
          message: '评论成功',
          type: 'success'
        })
        this.handleCommentLst()
      })
    },
    handleCommentLst() {
      comment.lst(this.commentpage - 1, this.commentrows, 0, this.id).then(response => {
        this.commentlst = response.commentlst
        this.commenttotal = response.total
      })
    },
    handleFileRemove(file, fileList) {
      if (this.$store.getters.username !== this.essay.author.id) {
        this.$message({
          message: '仅作者可以管理文件',
          type: 'error'
        })
        return false
      }
      return resource.remove(this.id, 0, file.id)
    },
    downloadFile(file) {
      window.open(file.url, '_blank')
    },
    beforeUpload(file) {
      if (this.$store.getters.username !== this.essay.author.id) {
        return false
      }
    },
    handleLike() {
      essaySetLike(this.id).then(response => {
        this.isfav = !this.isfav
        const msg = this.isfav ? '收藏成功' : '取消收藏成功'
        this.$message({
          message: msg,
          type: 'success'
        })
      })
    },
    onPageChanged(val) {
      this.commentpage = val
      this.handleCommentLst()
    }
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
          padding: 5px 10px;
        }
      }
      .content {
        background: $fourBorder;
        padding: 0 10px;
        flex-grow: 1;
        .bottom {
          text-align: right;
          .time {
            margin-top: 5px;
            color: $secondaryTxt;
            font-size: 14px;
          }
        }
      }
    }
  }
  .page {
    margin-top: 10px;
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
      padding: 5px 10px;
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

.file-card {
  margin-top: 15px;
  .header {
    h3 {
      margin: 0;
    }
  }
  .body {
    a {
      &:hover {
        color: red;
      }
      display: block;
      margin: 5px;
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
      &:hover {
        color: red;
      }
      display: block;
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

.like {
  position: fixed;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: white;
  border-radius: 20px;
  height: 40px;
  width: 40px;
  bottom: 160px;
  right: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .normal {
    color: gray;
  }
  .primary {
    color: red;
  }
}
</style>
