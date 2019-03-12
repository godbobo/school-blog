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

// 新增文章
function essayAdd(title, summary, content, tags, topic = 0) {
  // 是否添加 topic 在这里判断后在服务器还需要判断，因此设置默认值后直接发送即可
  return request({
    url: '/essay/add',
    method: 'post',
    data: {
      'article.title': title,
      'article.summary': summary,
      'article.content': content,
      'topic.id': topic,
      'jsonRest': JSON.stringify(tags)
    }
  })
}

export { lst, find, essayAdd }
