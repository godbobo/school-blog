<template>
  <div class="app-container">
    <div class="title-container">
      <h2>我的标签</h2>
    </div>
    <el-row>
      <el-col :span="12">
        <h3>标签列表</h3>
      </el-col>
      <el-col :span="12">
        <h3>新增标签</h3>
        <el-form ref="form" :model="newtagform">
          <el-form-item label="标签名：">
            <el-input v-model="newtagform.name"/>
          </el-form-item>
          <el-form-item label="文字颜色：">
            <el-color-picker v-model="newtagform.color"/>
          </el-form-item>
          <el-form-item label="背景颜色：">
            <el-color-picker v-model="newtagform.background"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">立即创建</el-button>
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
export default {
  name: 'MineTags',
  data() {
    return {
      newtagform: {
        name: '', // 标签名
        color: '#669EFF', // 标签文字颜色
        background: '#ECF5FF' // 标签背景颜色
      }
    }
  },
  computed: {
    previewtxt() {
      return this.newtagform.name.length > 0 ? this.newtagform.name : '示例标签'
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
