import request from '@/utils/request'

// 上传校区
export function uploadCampus(data) {
  return request({
    url: '/admin/insertCampus',
    method: 'post',
    data // {cmpName: "string"}
  })
}

// 删除校区
export function deleteCampus(data) {
  return request({
    url: '/admin/deleteCampus',
    method: 'post',
    data // {cmpId: 0}
  })
}

// 获取校区
export function getCampus(data) {
  return request({
    url: '/api/getCampusList',
    method: 'get',
    data // null
  })
}
