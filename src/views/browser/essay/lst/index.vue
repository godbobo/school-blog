<template>
  <div class="essay-container index-container">
    <el-row :gutter="15">
      <el-col :span="16">
        <div class="essay-list-container">
          <el-card v-for="(item, index) in lst" :key="index" class="box-card essay-item">
            <div slot="header">
              <a @click="jump">{{ item.title }}</a>
              <div class="essay-more-container">
                <span class="second-text">浏览：{{ item.view }}</span>
                <span class="second-text">收藏：0</span>
                <span class="second-text">评论：0</span>
              </div>
            </div>
            <div>
              <p class="second-text">{{ item.summary }}</p>
            </div>
            <div>
              <!-- <el-tag v-for="(it, v) in item.tags" :key="v" class="essay-tag">{{ it.name }}</el-tag> -->
              <span class="second-text essay-time">{{ item.upt }}</span>
            </div>
          </el-card>
        </div>
        <el-pagination
          :total="1000"
          background
          layout="prev, pager, next"/>
      </el-col>
      <el-col :span="8">
        <div class="essay-option-container">
          <el-card class="box-card">
            <div slot="header">
              <span>推荐</span>
            </div>
            <div>
              <a v-for="(item,index) in recommands" :key="index" class="recommand-item" href="www.baidu.com?q={item.id}">{{ item.title }}</a>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { lst } from '@/api/essay'

export default {
  name: 'Essay',
  data() {
    return {
      lst: [],
      recommands: [
        {
          id: 213,
          title: '推荐1'
        },
        {
          id: 212,
          title: '推荐2'
        },
        {
          id: 213,
          title: '推荐3'
        },
        {
          id: 243,
          title: '推荐4'
        }
      ]
    }
  },
  created() {
    // 获取文章列表
    lst().then(response => {
      const data = response.data
      this.lst = data.lst
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    jump() {
      // this.$router.push('/browser/essay/detail')
    }
  }
}
</script>

<style>
.index-container{
  padding: 20px;
}
.second-text{
  color: grey;
  font-size: 14px;
}
</style>

<style scoped>
.essay-list-container{
  min-height: 500px;
  margin-bottom: 20px;
}
.essay-option-container{
  min-height: 300px;
  margin-top: 7px;
}
.essay-item{
  margin: 7px 0;
}
.essay-time{
  float: right;
}
.essay-tag{
  margin: 0 2px;
}
.essay-more-container{
  float: right;
}

.recommand-item{
  display: block;
  margin: 5px 0;
}
</style>
