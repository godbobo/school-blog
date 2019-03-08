import request from '@/utils/request'

// 获取文章列表
function lst() {
  return request({
    url: '/essay/lst',
    method: 'post'
  })
}

// 根据文章 id 查询文章
function find(essayid) {
  return request({
    url: '/essay/find',
    method: 'post',
    data: {
      id: essayid
    }
  })
}

export { lst, find }
