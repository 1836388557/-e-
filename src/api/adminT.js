import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/adminT/list',
    method: 'get',
    params
  })
}

export function createAdmin(data) {
  return request({
    url: '/vue-element-admin/adminT/create',
    method: 'post',
    data
  })
}
