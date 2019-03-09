<template>
  <div>
    <editor ref="markdownEditor" v-model="content" :options="options" height="calc(100vh - 50px)" mode="markdown" preview-style="vertical"/>
    <el-dialog :visible.sync="dialogVisible" title="保存文章" width="45%">
      <span>保存。。。</span>
    </el-dialog>
  </div>
</template>

<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'codemirror/lib/codemirror.css'
import editorOptions from '@/common/editorOptions'

import { Editor } from '@toast-ui/vue-editor'
export default {
  name: 'Essay',
  components: { Editor },
  data() {
    return {
      content: '', // 编辑器绑定的输入内容
      editor: null, // tui-editor 对象的引用
      options: editorOptions
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
    console.log(this.$store.getters.essaysavevisible)
    this.$store.dispatch('EssayTriggerMode')
    this.editor = this.$refs.markdownEditor.editor
  },
  destroyed() {
    // 停用编辑模式
    this.$store.dispatch('EssayTriggerMode')
  }
}
</script>
