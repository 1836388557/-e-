import request from '@/utils/request'

// 上传商品类型
export function uploadType(data) {
  return request({
    url: '/admin/insertCommodityType',
    method: 'post',
    data // {pacName: "string"}
  })
}

// 删除商品类型
export function deleteType(data) {
  return request({
    url: '/admin/deleteCommodityType',
    method: 'post',
    data // {pacId: 0}
  })
}

// 获取商品类型
export function getType(data) {
  return request({
    url: '/api/getCommodityTypeList',
    method: 'get',
    data // null
  })
}
