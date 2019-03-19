import request from '@/utils/request'

// 获取文章列表
function lst(page, rows, type) {
  return request({
    url: '/essay/lst',
    method: 'post',
    data: {
      page: page,
      row: rows,
      queryType: type
    }
  })
}

// 获取指定id下文章
function essayLstAbout(id) {
  return request({
    url: '/essay/lstAbout',
    method: 'post',
    data: {
      'topic.id': id
    }
  })
}

// 根据文章 id 查询文章
function find(essayid, type) {
  return request({
    url: '/essay/find',
    method: 'post',
    data: {
      'article.id': essayid,
      queryType: type
    }
  })
}

// 收藏文章
function essaySetLike(id) {
  return request({
    url: '/essay/like',
    method: 'post',
    data: {
      'article.id': id
    }
  })
}

// 置顶与取消置顶
function essaySetTop(id, state) {
  return request({
    url: '/essay/update',
    method: 'post',
    data: {
      'article.id': id,
      'article.top': state
    }
  })
}

// 隐藏与取消隐藏
function essaySetHide(id, state) {
  return request({
    url: '/essay/update',
    method: 'post',
    data: {
      'article.id': id,
      'article.hide': state
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

export { lst, essayLstAbout, find, essayAdd, essaySetHide, essaySetTop, essaySetLike }
