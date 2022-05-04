import request from '@/utils/request'

// 兼职审核
export function partTimeCheck(data) {
  return request({
    url: '/admin/partTimeCheck',
    method: 'post',
    data // {"flag": 0,"id": 0}
  })
}

// 兼职活动列表
export function getPartTime(data) {
  return request({
    url: '/admin/getPartTimeDetailList',
    method: 'post',
    data // {"page": 0,"pageSize": 0,"param": "string","status": 0}
  })
}
