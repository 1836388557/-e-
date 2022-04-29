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
export function getNeedList(params) {
  return request({
    url: '/vue-admin-template/auditT/need/list',
    method: 'get',
    params
  })
}

// 拼车信息请求
export function getPoolList(params) {
  return request({
    url: '/vue-admin-template/auditT/pool/list',
    method: 'get',
    params
  })
}

// 活动信息请求
export function getActivityList(params) {
  return request({
    url: '/vue-admin-template/auditT/activity/list',
    method: 'get',
    params
  })
}

// 兼职信息请求
export function getJobList(params) {
  return request({
    url: '/vue-admin-template/auditT/job/list',
    method: 'get',
    params
  })
}

// 招领信息请求
export function getFindList(params) {
  return request({
    url: '/vue-admin-template/auditT/find/list',
    method: 'get',
    params
  })
}

// 遗失信息请求
export function getLostList(params) {
  return request({
    url: '/vue-admin-template/auditT/lost/list',
    method: 'get',
    params
  })
}
