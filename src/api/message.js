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

// 删除与某人的聊天记录
function del(userId) {
  return request({
    url: '/message/delete',
    method: 'post',
    data: {
      'user.id': userId
    }
  })
}

// 发送消息
function send(id, content) {
  return request({
    url: '/message/send',
    method: 'post',
    data: {
      'user.id': id,
      'message.content': content
    }
  })
}

export { lst, lstFromTarget, send, del }
