import request from '@/utils/request'

// 添加标签
function tagAdd(name, color, background) {
  return request({
    url: '/tag/add',
    method: 'post',
    data: {
      'tag.name': name,
      'tag.color': color,
      'tag.background': background
    }
  })
}

// 获取用户列表
function tagLstByUser() {
  return request({
    url: '/tag/lstByUser',
    method: 'get'
  })
}

// 删除指定用户
function tagDelete(id) {
  return request({
    url: '/tag/delete',
    method: 'post',
    data: {
      'tag.id': id
    }
  })
}

export { tagAdd, tagLstByUser, tagDelete }
