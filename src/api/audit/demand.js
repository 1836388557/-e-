import request from '@/utils/request'

// 需求审核
export function demandCheck(data) {
  return request({
    url: '/admin/demandCheck',
    method: 'post',
    data // {"flag": 0,"id": 0}
  })
}

// 获取需求列表
export function getDemand(data) {
  return request({
    url: '/admin/getDemandDetailList',
    method: 'post',
    data // {"page": 0,"pageSize": 0,"param": "string","status": 0}
  })
}
