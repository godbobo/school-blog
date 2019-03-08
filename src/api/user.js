import request from '@/utils/request'
import { QUERY_USERLST_NORMAL } from '@/common/var'

// 获取用户列表, 某些参数为可选条件，row 和 page 有默认值
function getUserLst(row = 10, page = 0, type = QUERY_USERLST_NORMAL, ...values) {
  return request({
    url: '/user/lst',
    method: 'post',
    data: {
      row: row,
      page: page,
      queryType: type,
      queryList: values
    }
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
