import request from '@/utils/request'

// 商品信息请求
export function getGoodList(params) {
  return request({
    url: '/vue-admin-template/auditT/good/list',
    method: 'get',
    params
  })
}

// 需求信息请求
export function getNeedList(data) {
  return request({
    url: '/vue-admin-template/auditT/need/list',
    method: 'get',
    data
  })
}

// 拼车信息请求
export function getPoolList(data) {
  return request({
    url: '/vue-admin-template/auditT/pool/list',
    method: 'get',
    data
  })
}

// 活动信息请求
export function getActivityList(data) {
  return request({
    url: '/vue-admin-template/auditT/activity/list',
    method: 'get',
    data
  })
}

// 兼职信息请求
export function getJobList(data) {
  return request({
    url: '/vue-admin-template/auditT/job/list',
    method: 'get',
    data
  })
}

// 招领信息请求
export function getFindList(data) {
  return request({
    url: '/vue-admin-template/auditT/find/list',
    method: 'get',
    data
  })
}

// 遗失信息请求
export function getLostList(data) {
  return request({
    url: '/vue-admin-template/auditT/lost/list',
    method: 'get',
    data
  })
}
