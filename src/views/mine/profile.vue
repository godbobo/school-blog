<template>
  <div class="index-container">
    <h3 class="profile-title">个人资料</h3>
    <div class="profile-wrap">
      <div class="item flex-row-container">
        <div class="left">
          <span>id:</span>
        </div>
        <div class="right">
          <span>{{ userinfo.id }}</span>
        </div>
      </div>
      <div class="item flex-row-container">
        <div class="left">
          <span>头像:</span>
        </div>
        <div class="right">
          <my-upload
            :width="300"
            :height="300"
            :url="avatorapi"
            :headers="header"
            v-model="show"
            field="img"
            img-format="png"
            @crop-upload-success="onUploadSuccess"/>
          <img :src="userinfo.headimg" class="avatar-display">
          <el-button type="text" @click="toggleUploadModal">修改头像</el-button>
        </div>
      </div>
      <div class="item flex-row-container">
        <div class="left">
          <span>签名:</span>
        </div>
        <div class="right">
          <span>{{ userinfo.sign }}</span>
        </div>
      </div>
      <div class="item flex-row-container">
        <div class="left">
          <span>姓名:</span>
        </div>
        <div class="right">
          <span>{{ userinfo.name }}</span>
        </div>
      </div>
      <div class="item flex-row-container">
        <div class="left">
          <span>性别:</span>
        </div>
        <div class="right">
          <span>{{ userinfo.sex }}</span>
        </div>
      </div>
      <div class="item flex-row-container">
        <div class="left">
          <span>邮箱:</span>
        </div>
        <div class="right">
          <span>{{ userinfo.mail }}</span>
        </div>
      </div>
      <div class="item flex-row-container">
        <div class="left">
          <span>手机:</span>
        </div>
        <div class="right">
          <span>{{ userinfo.tel }}</span>
        </div>
      </div>
      <div class="item flex-row-container">
        <div class="left">
          <span>院系:</span>
        </div>
        <div class="right">
          <span>{{ userinfo.college }}</span>
        </div>
      </div>
      <div class="item flex-row-container">
        <div class="left">
          <span>专业:</span>
        </div>
        <div class="right">
          <span>{{ userinfo.pro }}</span>
        </div>
      </div>
      <div class="item flex-row-container">
        <div class="left">
          <span>爱好:</span>
        </div>
        <div class="right">
          <span>{{ userinfo.hobby }}</span>
        </div>
      </div>
    </div>
    <div class="profile-footer">
      <el-button type="text">修改资料</el-button>
      <el-button type="text">修改密码</el-button>
    </div>
  </div>
</template>

<script>
import * as user from '@/api/user'
import myUpload from 'vue-image-crop-upload'
export default {
  name: 'MineProfile',
  components: {
    'my-upload': myUpload
  },
  data() {
    return {
      show: false,
      avatorapi: process.env.BASE_API + 'user/avatarUpload',
      header: {
        'Authorization': this.$store.getters.token
      },
      userinfo: {}
    }
  },
  computed: {
    avatarurl() {
      return this.$store.getters.avatar
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    toggleUploadModal() {
      this.show = !this.show
    },
    getUserInfo() {
      user.get().then(response => {
        this.userinfo = response.user
      })
    },
    onUploadSuccess(data, field) {
      if (data.state.code === '10' || data.state.code === '00') {
        this.$store.commit('SET_AVATAR', data.data.url)
        this.userinfo.headimg = data.data.url
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.profile-title {
  text-align: center;
}

.profile-wrap {
  width: 50%;
  margin: 0 auto;
  border-top: gray 1px solid;
  padding: 10px 5px;
  .item {
    width: 100%;
    line-height: 2.5rem;
    .avatar-wrap {
      line-height: 80px;
    }
    .left {
      width: 20%;
      text-align: right;
      padding-right: 5px;
      font-weight: 500;
    }
    .right {
      flex-grow: 1;
      padding-left: 10px;
      color: #666;
      .avatar-display {
        width: 80px;
        height: 80px;
      }
    }
  }
}

.profile-footer {
  width: 50%;
  margin: 0 auto;
  text-align: right;
}

</style>
