import request from '@/utils/request'

function add(content, type, id) {
  const pms = {
    'comment.content': content,
    'comment.type': type
  }
  let params = {}
  if (type === 0) {
    params = Object.assign(pms, { 'comment.article.id': id })
  } else if (type === 1) {
    params = Object.assign(pms, { 'comment.topic.id': id })
  }
  return request({
    url: '/comment/add',
    method: 'post',
    data: params
  })
}

function lst(page, rows, type, id) {
  const pms = {
    queryType: type,
    page: page,
    row: rows
  }
  let params = {}
  if (type === 0) {
    params = Object.assign(pms, { 'article.id': id })
  } else if (type === 1) {
    params = Object.assign(pms, { 'topic.id': id })
  }
  return request({
    url: '/comment/lst',
    method: 'post',
    data: params
  })
}

export { add, lst }
