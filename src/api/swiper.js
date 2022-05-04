import request from '@/utils/request'

// 上传轮播
export function uploadSwiper(data) {
  return request({
    url: '/admin/uploadSlideshow',
    method: 'post',
    data // {ssPic: "string"}
  })
}

// 删除轮播图
export function deleteSwiper(data) {
  return request({
    url: '/admin/deleteSlideshow',
    method: 'post',
    data // { ssId: 0}
  })
}

// 获取轮播图
export function getSwiper(data) {
  return request({
    url: '/api/getSlideshowList',
    method: 'post',
    data
  })
}

// 上传图像
export function uploadImage(data) {
  return request({
    url: '/api/uploadImage',
    method: 'post',
    data // {"imgBase64": "string","type": "string", "username": "string"}
  })
}

