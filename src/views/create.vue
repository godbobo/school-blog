<template>
  <div>
    <editor ref="markdownEditor" v-model="uform.content" :options="options" height="calc(100vh - 50px)" mode="markdown" preview-style="vertical"/>
    <el-dialog :visible.sync="dialogVisible" title="保存" width="45%">
      <el-form ref="uform" :model="uform" :rules="rules" size="small">
        <el-form-item label="类型:">
          <el-radio :label="1" v-model="savetype">文章</el-radio>
          <el-radio :label="2" v-model="savetype">话题</el-radio>
        </el-form-item>
        <el-form-item label="标题：" prop="title">
          <el-input v-model="uform.title"/>
        </el-form-item>
        <el-form-item v-if="savetype === 1" label="归类到话题?">
          <el-switch v-model="uform.addtopic"/>
        </el-form-item>
        <el-form-item v-if="uform.addtopic && savetype === 1" label="所属话题：">
          <el-select v-model="uform.topic" placeholder="请选择">
            <el-option v-for="item in topicoptions" :key="item.id" :value="item.id" :label="item.name"/>
          </el-select>
        </el-form-item>
        <el-form-item label="标签:">
          <el-select v-model="uform.tags" multiple placeholder="请选择">
            <el-option v-for="item in mytags" :key="item.id" :value="item.id" :label="item.name"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="savetype === 1" label="简介：" prop="summary">
          <el-input v-model="uform.summary" type="textarea"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddEssay">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import editorOptions from '@/common/editorOptions'
import { essayAdd } from '@/api/essay'
import { tagLstByUser } from '@/api/tag'
import * as topic from '@/api/topic'
// TODO 添加重置按钮
import { Editor } from '@toast-ui/vue-editor'
export default {
  name: 'Essay',
  components: { Editor },
  data() {
    return {
      editor: null, // tui-editor 对象的引用
      options: editorOptions, // tui-editor 的设置
      uform: {
        title: '', // 标题
        summary: '', // 简介
        content: '', // 内容
        addtopic: false, // 是否添加到话题
        topic: '', // 话题 id
        tags: [] // 标签列表
      }, // 新增文章表单
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '简介不能为空', trigger: 'blur' }
        ]
      },
      topicoptions: [], // 话题列表
      mytags: [], // 标签列表
      savetype: 1
    }
  },
  computed: {
    dialogVisible: {
      get: function() {
        return this.$store.getters.essaysavevisible
      },
      set: function(newVal) {
        this.$store.dispatch('EssayTriggerDialog')
      }
    }
  },
  watch: {
    savetype(newValue) {
      newValue === 1 ? this.uform.summary = this.uform.content.substr(0, 200) : this.uform.summary = '-'
    }
  },
  mounted() {
    // 启用编辑模式
    this.$store.dispatch('EssayTriggerMode')
    this.editor = this.$refs.markdownEditor.editor
    // 获取用户的标签列表
    this.handleTagLst()
    // 获取用户相关的话题列表
    this.handleTopicLst()
  },
  destroyed() {
    // 停用编辑模式
    this.$store.dispatch('EssayTriggerMode')
  },
  methods: {
    handleAddEssay() {
      this.$refs.uform.validate(valid => {
        if (valid && this.uform.content.length > 0) {
          if (this.savetype === 1) { // 保存文章
            const topicid = this.uform.addtopic ? this.uform.topic : 0
            essayAdd(this.uform.title, this.uform.summary, this.uform.content, this.uform.tags, topicid).then(response => {
              this.dialogVisible = false
            })
          } else { // 保存话题
            topic.add(this.uform.title, this.uform.tags, this.uform.content).then(response => {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.dialogVisible = false
            })
          }
        }
      })
    },
    handleTagLst() {
      tagLstByUser().then(data => {
        if (data) {
          this.mytags = data.lst
        }
      })
    },
    handleTopicLst() {
      topic.lstAbout().then(data => {
        if (data) {
          this.topicoptions = data.lst
        }
      })
    }
  }
}
</script>
