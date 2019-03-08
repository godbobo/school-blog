<template>
  <div>
    <div>{{ test }}</div>
    文章详情</div>
</template>

<script>
export default {
  name: 'EssayDetail',
  data() {
    return {
      essay: {},
      test: ''
    }
  },
  created() {
    // 创建组件后需要做的工作
    this.$store.dispatch('Lst').then(() => {
      this.setData()
    })
  },
  methods: {
    setData() {
      this.test = '已获取到数据'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
