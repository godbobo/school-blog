<template>
  <transition name="fade">
    <div v-if="show" class="scrollBox flex-column-container" @click="scrollToTop">
      <svg-icon class="icon" icon-class="arrow-top"/>
    </div>
  </transition>
</template>

<script>
import jump from 'jump.js'

export default {
  name: 'ScrollTop',
  data() {
    return {
      show: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      this.show = window.scrollY > document.body.clientHeight
    },
    scrollToTop() {
      jump('body')
    }
  }
}
</script>

<style lang="scss" scoped>
.scrollBox {
  background: white;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 100px;
  right: 50px;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  .icon {
    color: #409eff;
  }
}
</style>

