import request from '@/utils/request'

// 活动审核
export function activityCheck(data) {
  return request({
    url: '/admin/activityCheck',
    method: 'post',
    data // {"flag": 0,"id": 0}
  })
}

// 获取活动列表
export function getActivity(data) {
  return request({
    url: '/admin/getActivityDetailList',
    method: 'post',
    data // {"page": 0,"pageSize": 0,"param": "string","status": 0}
  })
}
