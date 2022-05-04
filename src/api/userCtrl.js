import request from '@/utils/request'

// 删除用户
export function deleteUser(data) {
  return request({
    url: '/admin/deleteUser',
    method: 'post',
    data // { userId: "string"}
  })
}

// 修改用户状态
export function updateUserStatus(data) {
  return request({
    url: '/admin/updateUserStatus',
    method: 'post',
    data // { status: 0,userId: "string"} 封禁 0， 解封 1
  })
}

// 获取用户列表
export function getUser(data) {
  return request({
    url: '/admin/getUserList',
    method: 'post',
    data // {page: 0,pageSize: 0,param: string,status: 0}
  })
}
