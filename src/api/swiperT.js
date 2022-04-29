import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/swiperT/list',
    method: 'get',
    params
  })
}
