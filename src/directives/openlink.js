// 该指令的作用是阻止点击a标签后页面自身跳转到相应链接，这对于原生应用来说是客观不正确的

const OpenLink = {}

OpenLink.install = function(Vue, options) {
  Vue.directive('openlink', function(el) {
    el.querySelectorAll('a').forEach(block => {
      block.addEventListener('click', function(e) {
        e.preventDefault()
        window.open(block.href, '_blank')
      })
    })
  })
}

export default OpenLink
