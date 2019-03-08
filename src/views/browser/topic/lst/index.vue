<template>
  <div class="topic-container index-container">
    <el-row :gutter="15">
      <el-col :span="16">
        <div class="topic-list-container">
          <el-card v-for="(item, index) in lst" :key="index" class="box-card topic-item">
            <div slot="header">
              <a>{{ item.name }}</a>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">评论</el-button> -->
            </div>
            <div>
              <p class="second-text">{{ item.summary }}</p>
            </div>
            <div>
              <el-button style="width: 100%;" @click="item.show = !item.show">(展开/折叠)文章列表</el-button>
              <el-collapse-transition>
                <div v-show="item.show">
                  <a v-for="(it, v) in item.arts" :key="v" class="topic-art">{{ it.title }}</a>
                </div>
              </el-collapse-transition>
            </div>
          </el-card>
          <el-pagination
            :total="1000"
            background
            layout="prev, pager, next"/>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="topic-option-container">
          <el-card class="box-card">
            <div slot="header">
              <span>推荐</span>
            </div>
            <div>
              <a v-for="(item,index) in recommands" :key="index" class="recommand-item">{{ item.name }}</a>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Topic',
  data() {
    return {
      lst: [
        {
          id: 1111,
          name: '话题1',
          arts: [
            {
              id: 1111,
              title: '文章1'
            },
            {
              id: 222,
              title: '文章2'
            }
          ],
          show: false,
          summary: '这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介'
        },
        {
          id: 112,
          name: '话题2',
          arts: [
            {
              id: 1111,
              title: '文章1'
            },
            {
              id: 222,
              title: '文章2'
            }
          ],
          show: false,
          summary: '这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介'
        },
        {
          id: 113,
          name: '话题3',
          arts: [
            {
              id: 1111,
              title: '文章1'
            },
            {
              id: 222,
              title: '文章2'
            }
          ],
          show: false,
          summary: '这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介'
        },
        {
          id: 1114,
          name: '话题4',
          arts: [
            {
              id: 1111,
              title: '文章1'
            },
            {
              id: 222,
              title: '文章2'
            }
          ],
          show: false,
          summary: '这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介这是话题简介'
        }
      ],
      recommands: [
        {
          id: 123,
          name: '推荐话题1'
        },
        {
          id: 122,
          name: '推荐话题2'
        },
        {
          id: 123,
          name: '推荐话题3'
        },
        {
          id: 124,
          name: '推荐话题4'
        }
      ]
    }
  }
}
</script>

<style scoped>
.topic-list-container{
  min-height: 500px;
}
.topic-option-container{
  min-height: 300px;
}
.topic-item{
  margin-bottom: 14px;
}
.topic-art{
  display: block;
  padding: 5px 0;
}

.recommand-item{
  display: block;
  margin: 5px 0;
}
</style>
