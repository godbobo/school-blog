<template>
  <div class="index-container flex-row-container container">
    <div class="left-part">
      <h1>个人资料</h1>
      <div class="profile-wrap">
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
            <span>{{ userinfo.realName }}</span>
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
            <span>班级:</span>
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
        <el-button type="text" @click="changedialogvisible = true">修改资料</el-button>
        <el-button type="text" @click="dialogFormVisible = true">修改密码</el-button>
      </div>
      <el-dialog :visible.sync="dialogFormVisible" title="修改密码">
        <el-form ref="ruleForm" :model="form" :rules="rules" status-icon>
          <el-form-item :label-width="formLabelWidth" label="旧密码" prop="old">
            <el-input v-model="form.old" type="password" auto-complete="off"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="新密码" prop="newpwd">
            <el-input v-model="form.newpwd" type="password" auto-complete="off"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="确认密码" prop="confirmpwd">
            <el-input v-model="form.confirmpwd" type="password" auto-complete="off"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmPwd">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="changedialogvisible" title="修改资料">
        <el-form ref="changeform" :model="userinfo" :rules="changerules" size="small">
          <el-form-item :label-width="formLabelWidth" prop="realName" label="姓名">
            <el-input v-model="userinfo.realName" auto-complete="off"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="签名">
            <el-input v-model="userinfo.sign" auto-complete="off"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" prop="mail" label="邮箱">
            <el-input v-model="userinfo.mail" type="email" auto-complete="off"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" prop="tel" label="手机">
            <el-input v-model="userinfo.tel" type="tel" auto-complete="off"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="班级">
            <el-input v-model="userinfo.pro" auto-complete="off"/>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="爱好">
            <el-input v-model="userinfo.hobby" auto-complete="off"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="changedialogvisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmUserinfo">提 交</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="right-part">
      <h1>我的关注</h1>
      <div class="list-container">
        <div v-for="(u,i) in follows" :key="i" class="flex-row-container list-item">
          <img :src="u.headimg">
          <div class="info flex-column-container">
            <span class="name">{{ u.realName }}</span>
            <span class="college">{{ u.college }}</span>
          </div>
          <div class="links">
            <el-button type="text" @click="browser(u.id)">Ta 的创作</el-button>
          </div>
        </div>
      </div>
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
    var validatePwd = (rule, value, callback) => {
      if (value === this.form.old) {
        callback(new Error('新密码必须和旧密码不同'))
      } else {
        callback()
      }
    }
    var validatePwd2 = (rule, value, callback) => {
      if (value !== this.form.newpwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      show: false,
      avatorapi: process.env.BASE_API + 'user/avatarUpload',
      header: {
        'Authorization': this.$store.getters.token
      },
      userinfo: {},
      dialogFormVisible: false,
      form: {
        old: '',
        newpwd: '',
        confirmpwd: ''
      },
      rules: {
        old: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        newpwd: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validatePwd, trigger: 'blur' }
        ],
        confirmpwd: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
          { validator: validatePwd2, trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      follows: [],
      changerules: {
        realName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        mail: [
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        tel: [
          { type: 'regexp', pattern: /^1(3|4|5|7|8)\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
        ]
      },
      changedialogvisible: false
    }
  },
  computed: {
    avatarurl() {
      return this.$store.getters.avatar
    }
  },
  mounted() {
    this.getUserInfo()
    this.getFollows()
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
    getFollows() {
      user.followLst().then(data => {
        if (data) {
          this.follows = data.lst
        }
      })
    },
    onUploadSuccess(data, field) {
      if (data.state.code === '10' || data.state.code === '00') {
        this.$store.commit('SET_AVATAR', data.data.url)
        this.userinfo.headimg = data.data.url
      }
    },
    handleConfirmPwd() { // 提交新密码
      // 对密码合法性进行验证
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          user.changePwd(this.form.old, this.form.newpwd).then(data => {
            this.dialogFormVisible = false
          })
        } else {
          this.$message({
            message: '请修正表单错误后再提交',
            type: 'error'
          })
        }
      })
    },
    handleConfirmUserinfo() {
      this.$refs['changeform'].validate(valid => {
        if (valid) {
          user.changeUserinfo(this.userinfo).then(() => {
            this.changedialogvisible = false
          }).catch(error => {
            console.log(error)
            this.changedialogvisible = false
          })
        } else {
          this.$message({
            message: '请修正表单错误后再提交',
            type: 'error'
          })
        }
      })
    },
    browser(id) {
      this.$router.push('/mine/product/u/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.left-part {
  flex-grow: 1;
}

.right-part {
  flex-grow: 1;
  .list-container {
    height: 100%;
    overflow: auto;
    .list-item {
      margin-top: 4px;
      background: #F2F6FC;
      border-radius: 5px;
      justify-items: center;
      padding: 5px;
      box-sizing: border-box;
      img{
        width: 70px;
        height: 70px;
      }
      .info {
        flex-grow: 1;
        margin-left: 10px;
      }
      .name {
        flex-grow: 1;
        line-height: 35px;
      }
      .college {
        flex-grow: 1;
        line-height: 35px;
        color: #909399;
      }
    }
  }
}

.profile-title {
  text-align: center;
}

.profile-wrap {
  margin: 0 auto;
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
