import request from '@/utils/request'

// 发布通告
export function publishMess(data) {
  return request({
    url: '/admin/publishSystemMessage',
    method: 'post',
    data // null
  })
}
