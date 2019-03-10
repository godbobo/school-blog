<template>
  <div class="app-container">
    <div class="title-container">
      <h2>我的标签</h2>
    </div>
    <el-row>
      <el-col :span="12">
        <el-card class="tag-card">
          <div slot="header" class="clearfix">
            <span>标签列表</span>
          </div>
          <div class="flex-row-container tag-lst">
            <el-tag v-for="(tag, index) in tags" :key="index" :style="{ color: tag.color }" :color="tag.background" closable class="tag-item" @close="clickCloseTag(tag)">{{ tag.name }}</el-tag>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <h3>新增标签</h3>
        <el-form ref="form" :model="newtagform" :rules="validateform">
          <el-form-item label="标签名：" prop="name">
            <el-input v-model="newtagform.name"/>
          </el-form-item>
          <el-form-item label="文字颜色：">
            <el-color-picker v-model="newtagform.color"/>
          </el-form-item>
          <el-form-item label="背景颜色：">
            <el-color-picker v-model="newtagform.background"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAddTag">立即创建</el-button>
          </el-form-item>
        </el-form>
        <div>
          <h3>效果预览</h3>
          <div class="preview-content">
            <el-tag :color="newtagform.background" :style="{ color: newtagform.color }" :hit="true">{{ previewtxt }}</el-tag>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { tagAdd, tagLstByUser, tagDelete } from '@/api/tag'

// TODO 修改该页样式，一种可能是改为三列另一种可能是修改标签列表样式

export default {
  name: 'MineTags',
  data() {
    return {
      newtagform: {
        name: '', // 标签名
        color: '#669EFF', // 标签文字颜色
        background: '#ECF5FF' // 标签背景颜色
      }, // 新增标签表单属性
      validateform: {
        name: [
          { min: 1, max: 10, message: '长度在1-10之间', trigger: 'blur' }
        ]
      }, // 新增标签表单验证
      tags: []
    }
  },
  computed: {
    previewtxt() {
      return this.newtagform.name.length > 0 ? this.newtagform.name : '示例标签'
    }
  },
  mounted() {
    // 获取标签列表
    this.handleTagLst()
  },
  methods: {
    clickCloseTag(tag) {
      this.$confirm('是否删除该标签？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDeleteTag(tag)
      })
    },
    handleAddTag() {
      // 验证表单内容，通过后继续
      this.$refs.form.validate((valid) => {
        if (valid) {
          tagAdd(this.newtagform.name, this.newtagform.color, this.newtagform.background).then(response => {
            if (response.code === 0) {
              // 创建成功后刷新列表
              this.handleTagLst()
              this.$message({
                message: '创建成功',
                type: 'success'
              })
            }
          }).catch(() => {
            this.$message({
              message: '创建失败',
              type: 'error'
            })
          })
        } else {
          this.$message({
            message: '请完善表单内容后提交！',
            type: 'success'
          })
        }
      })
    },
    handleDeleteTag(tag) {
      // 确定删除
      tagDelete(tag.id).then(response => {
        if (response.code === 0) {
          // 从标签列表中删除该标签
          this.tags.splice(this.tags.indexOf(tag), 1)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    handleTagLst() {
      tagLstByUser().then(response => {
        if (response.code === 0) {
          this.tags = response.data.lst
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

.title-container {
  border-bottom: 1px solid $oneBorder;
  color: $mainTxt;
}

.tag-card {
  margin: 30px 50px 30px 0;
}

.tag-lst {
  padding: 10px 20px;
  flex-wrap: wrap;
  .tag-item {
    margin: 10px 6px;
  }
}

.preview-container {
  border-top: 1px dashed $twoBorder;
}

.preview-content {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $twoBorder;
  border-radius: 4px;
}
</style>
