import request from '@/utils/request'

// 删除管理员
export function deleteManager(data) {
  return request({
    url: '/root/deleteManager',
    method: 'post',
    data // { adId: "string"}
  })
}

// 添加管理员
export function addManager(data) {
  return request({
    url: '/root/addManager',
    method: 'post',
    data // {"adEmail": "string","adPassword": "string","adRole": "string","adUsername": "string"}
  })
}

// 获取管理员列表
export function getManager(data) {
  return request({
    url: '/admin/getManagerList',
    method: 'post',
    data // {page: 0,pageSize: 0}
  })
}

// 修改管理员信息
export function modifyManager(data) {
  return request({
    url: '/root/modifyManager',
    method: 'post',
    data // {"adEmail": "string","adId": "string","adPassword": "string","adRole": "string","adUsername":"string"}
  })
}
