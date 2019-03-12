import request from '@/utils/request'

function topicAdd(name, tags, summary) {
  return request({
    url: '/topic/add',
    method: 'post',
    data: {
      'topic.name': name,
      'topic.summary': summary,
      'jsonRest': JSON.stringify(tags)
    }
  })
}

// 获取与用户相关的话题
function topicLstAbout() {
  return request({
    url: '/topic/lstAboutId',
    method: 'get'
  })
}

export { topicAdd, topicLstAbout }
