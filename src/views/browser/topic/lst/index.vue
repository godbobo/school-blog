<template>
  <div class="index-container">
    <el-row :gutter="30">
      <el-col :span="16">
        <el-card>
          <div slot="header" class="part-header flex-row-container">
            <h4 class="el-icon-document"> 话题列表</h4>
            <el-button type="text" class="header-button" icon="el-icon-refresh">刷新</el-button>
          </div>
          <div class="part-body">
            <div v-for="o in 4" :key="o" class="item">
              <router-link to="/browser/topic/detail/23" class="item-header">十大经典算法总结 - 做个隐士 - 博客园</router-link>
              <p class="item-body">十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结</p>
              <div class="item-footer flex-row-container">
                <div class="left">
                  <el-tag type="info">标签三</el-tag>
                  <el-tag type="info">标签三</el-tag>
                  <el-tag type="info">标签三</el-tag>
                  <div class="count">
                    <span style="color: #409EFF;"><svg-icon icon-class="user"/> 12</span>
                    <span style="color: #67C23A;" class="el-icon-document"> 52</span>
                  </div>
                </div>
                <div class="right">
                  <span class="timestamp">老王 创建于 2019-03-16</span>
                </div>
              </div>
            </div>
            <el-pagination :total="1000" class="page" background layout="prev, pager, next"/>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header" class="part-header flex-row-container">
            <h4><svg-icon icon-class="recommand"/> 推荐列表</h4>
          </div>
          <div class="part-body">
            <div v-for="o in 4" :key="o" class="item">
              <a class="item-header"><span style="color: red;"><svg-icon icon-class="topic"/></span> 十大经典算法总结 - 做个隐士 - 博客园</a>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

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
</style>
