import request from '@/utils/request'

// 拼车审核
export function carpoolCheck(data) {
  return request({
    url: '/admin/carpoolCheck',
    method: 'post',
    data // {"flag": 0,"id": 0}
  })
}

// 获取拼车列表
export function getcarpool(data) {
  return request({
    url: '/admin/getCarpoolDetailList',
    method: 'post',
    data // {"page": 0,"pageSize": 0,"param": "string","status": 0}
  })
}
