import request from '@/utils/request'

// 商品审核
export function commodityCheck(data) {
  return request({
    url: '/admin/commodityCheck',
    method: 'post',
    data // {"flag": 0,"id": 0}
  })
}

// 获取商品列表
export function getCommodity(data) {
  return request({
    url: '/admin/getCommodityList',
    method: 'post',
    data // {"page": 0,"pageSize": 0,"param": "string","status": 0}
  })
}
