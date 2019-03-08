<template>
  <markdown-editor v-model="content" />
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  name: 'Essay',
  components: { MarkdownEditor },
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style scoped>

</style>
