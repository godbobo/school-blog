import request from '@/utils/request'

// 获取当前用户的消息列表
function lst(type) {
  return request({
    url: '/message/lst',
    method: 'post',
    data: {
      queryType: type
    }
  })
}

// 获取聊天记录
function lstFromTarget(id) {
  return request({
    url: '/message/lstFromTarget',
    method: 'post',
    data: {
      'user.id': id
    }
  })
}

export { lst, lstFromTarget }
