import request from '@/utils/request'

// 移除文件
function remove(id, type, fileid) {
  const pms = {
    queryType: type,
    'file.id': fileid
  }
  let params = {}
  if (type === 0) {
    params = Object.assign(pms, { 'article.id': id })
  } else if (type === 1) {
    params = Object.assign(pms, { 'topic.id': id })
  }
  return request({
    url: '/file/remove',
    method: 'post',
    data: params
  })
}

export { remove }
