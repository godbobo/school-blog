<template>
  <div class="index-container">
    <el-tabs type="border-card">
      <el-tab-pane label="我收藏的文章">
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
      <el-tab-pane label="我加入的话题">
        <div v-for="o in 4" :key="o" class="item">
          <router-link to="/browser/topic/detail/23" class="item-header">十大经典算法总结 - 做个隐士 - 博客园</router-link>
          <p
            class="item-body"
          >十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结十大经典算法总结</p>
          <div class="item-footer flex-row-container">
            <div class="left">
              <el-tag type="info">标签三</el-tag>
              <el-tag type="info">标签三</el-tag>
              <el-tag type="info">标签三</el-tag>
              <div class="count">
                <span style="color: #409EFF;">
                  <svg-icon icon-class="user"/>12
                </span>
                <span style="color: #67C23A;" class="el-icon-document">52</span>
              </div>
            </div>
            <div class="right">
              <span class="timestamp">老王 创建于 2019-03-16</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Essay',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

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
</style>
