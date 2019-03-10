<template>
  <div>
    <editor ref="markdownEditor" v-model="essayform.content" :options="options" height="calc(100vh - 50px)" mode="markdown" preview-style="vertical"/>
    <el-dialog :visible.sync="dialogVisible" title="保存" width="45%">
      <el-form ref="essayform" :model="essayform" :rules="rules">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="essayform.title"/>
        </el-form-item>
        <el-form-item label="归类到话题?">
          <el-switch v-model="essayform.addtopic"/>
        </el-form-item>
        <el-form-item v-if="essayform.addtopic" label="所属话题：">
          <el-select v-model="essayform.topic" placeholder="请选择">
            <el-option v-for="item in topicoptions" :key="item.value" :value="item.value" :label="item.label"/>
          </el-select>
        </el-form-item>
        <el-form-item label="简介：" prop="summary">
          <el-input v-model="essayform.summary" type="textarea"/>
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

import { Editor } from '@toast-ui/vue-editor'
export default {
  name: 'Essay',
  components: { Editor },
  data() {
    return {
      editor: null, // tui-editor 对象的引用
      options: editorOptions, // tui-editor 的设置
      essayform: {
        title: '', // 标题
        summary: '', // 简介
        content: '', // 内容
        addtopic: false, // 是否添加到话题
        topic: '' // 话题 id
      }, // 新增文章表单
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        summary: [
          { required: true, message: '简介不能为空', trigger: 'blur' }
        ]
      },
      topicoptions: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
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
  mounted() {
    // 启用编辑模式
    this.$store.dispatch('EssayTriggerMode')
    this.editor = this.$refs.markdownEditor.editor
  },
  destroyed() {
    // 停用编辑模式
    this.$store.dispatch('EssayTriggerMode')
  },
  methods: {
    handleAddEssay() {
      this.$refs.essayform.validate(valid => {
        if (valid && this.essayform.content.length > 0) {
          const topicid = this.essayform.addtopic ? this.essayform.topic : 0
          essayAdd(this.essayform.title, this.essayform.summary, this.essayform.content, topicid).then(response => {
            if (response.code === 0) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
          })
        }
      })
    }
  }
}
</script>
