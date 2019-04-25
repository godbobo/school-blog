import request from '@/utils/request'
// import fileRequest from '@/utils/fileRequest'
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

// 批量添加用户
function batchAddUser(file) {
  const params = new FormData()
  params.append('excel', file)
  return request({
    url: '/user/excelUpload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: params
  })
}

// 计算用户关联表的行数量
function userCount(id) {
  return request({
    url: '/user/countUser',
    method: 'post',
    data: {
      'user.id': id
    }
  })
}

// 关注/取消关注用户
function userFollow(id, type) {
  return request({
    url: '/user/follow',
    method: 'post',
    data: {
      'user.id': id,
      queryType: type
    }
  })
}

// 获取用户信息
function get() {
  return request({
    url: '/user/getInfo',
    method: 'post'
  })
}

export { getUserLst, addUser, userCount, userFollow, get, batchAddUser }
