import request from '@/utils/request'

function topicAdd(name, summary) {
  return request({
    url: '/topic/add',
    method: 'post',
    data: {
      'topic.name': name,
      'topic.summary': summary
    }
  })
}

export { topicAdd }