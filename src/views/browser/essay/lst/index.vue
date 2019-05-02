<template>
  <div class="index-container">
    <el-row :gutter="30">
      <el-col :span="16">
        <el-card>
          <div slot="header" class="part-header flex-row-container">
            <h4 class="el-icon-document"> 文章列表</h4>
            <el-button type="text" class="header-button" icon="el-icon-refresh" @click="refresh">刷新</el-button>
          </div>
          <div v-loading="isloading" class="part-body">
            <transition-group name="list">
              <div v-for="(item, index) in lst" :key="index" class="item">
                <router-link :to="'/browser/essay/detail/' + item.id" class="item-header"><span v-if="item.top === 1" style="color: #409EFF;"><svg-icon icon-class="top"/> </span>{{ item.title }}</router-link>
                <p class="item-body">{{ item.summary }}</p>
                <div class="item-footer flex-row-container">
                  <div class="left">
                    <div class="count">
                      <span style="color: green;"><svg-icon icon-class="eye-open"/> {{ item.view }}</span>
                      <span style="color: pink;"><svg-icon icon-class="like"/> {{ lovercount(index) }} </span>
                    </div>
                    <el-tag v-for="(tag, tindex) in item.tags" :key="tindex" :color="tag.background" :style="{ color: tag.color }" :hit="true" class="tag">{{ tag.name }}</el-tag>
                  </div>
                  <div class="right">
                    <span class="timestamp">{{ item.author.name }} 创作于 {{ item.upt }}</span>
                  </div>
                </div>
              </div>
            </transition-group>
            <el-pagination :total="total" :current-page="pageindex" :page-size="rows" class="page" background layout="prev, pager, next" @current-change="onPageChange"/>
          </div>

        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="part-header flex-row-container">
            <h4><svg-icon icon-class="recommand"/> 推荐列表</h4>
          </div>
          <transition appear>
            <div v-loading="isloading" class="part-body">
              <div v-for="(rditem, index) in recommandlst" :key="index" class="item">
                <router-link :to="'/browser/essay/detail/' + rditem.id" class="item-header"><span style="color: red;"><svg-icon icon-class="topic"/></span> {{ rditem.title }}</router-link>
              </div>
            </div>
          </transition>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { lst } from '@/api/essay'
import jump from 'jump.js'

export default {
  name: 'EssayLst',
  data() {
    return {
      lst: [], // 按时间倒序列表
      recommandlst: [], // 推荐列表
      total: 0, // 结果总数
      rows: 15, // 每页显示数量
      pageindex: 1, // 当前页
      isloading: false
    }
  },
  computed: {
    lovercount() {
      return function(index) {
        return this.lst[index].lovers ? this.lst[index].lovers.length : 0
      }
    }
  },
  created() {
    this.handleLst()
  },
  methods: {
    handleLst() {
      this.isloading = true
      lst(this.pageindex - 1, this.rows, 0).then(response => {
        this.isloading = false
        // 当第一页时显示置顶文章
        if (this.pageindex === 1 && response.toplst) {
          this.lst = [...response.toplst, ...response.lst]
        } else {
          this.lst = response.lst
        }
        this.recommandlst = response.recommandlst
        this.total = response.total
      }).catch(() => {
        this.isloading = false
      })
    },
    refresh() {
      this.pageindex = 1
      jump('body')
      this.handleLst()
    },
    onPageChange(val) {
      this.pageindex = val
      this.handleLst(val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.part-header {
  justify-content: space-between;
  h4 {
    display: inline-block;
    font-size: 18px;
    margin: 0;
  }
  .header-button {
    padding: 0;
  }
}

.part-body {
  .item {
    .item-header {
      display: inline-block;
      color: black;
      font-size: 18px;
      font-weight: bold;
      padding-top: 15px;
      &:hover {
        color: red;
      }
    }
    .item-body {
      color: $secondaryTxt;
      font-size: 14px;
      line-height: 22px;
    }
    .item-footer {
      justify-content: space-between;
      .left {
        .tag {
          margin-left: 10px;
        }
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

</style>
