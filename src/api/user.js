import request from '@/utils/request'
import * as qtp from '@/common/var'

// 获取用户列表, 某些参数为可选条件，row 和 page 有默认值
function getUserLst(row = 10, page = 0, type = qtp.QUERY_USERLST_NORMAL, arg) {
  let args = {}
  if (type === qtp.QUERY_USERLST_USERNAME) {
    args = { 'user.id': arg }
  } else if (type === qtp.QUERY_USERLST_NAME) {
    args = { 'user.name': arg }
  } else if (type === qtp.QUERY_USERLST_COLLEGE) {
    args = { 'user.college': arg }
  }
  const params = Object.assign({ row: row, page: page, queryType: type }, args)
  return request({
    url: '/user/lst',
    method: 'post',
    data: params
  })
}

function addUser(...values) {
  return request({
    url: '/user/add',
    method: 'post',
    data: {
      queryList: values
    }
  })
}

export { getUserLst, addUser }
