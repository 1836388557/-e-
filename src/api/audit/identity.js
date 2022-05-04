import request from '@/utils/request'

// 认证请求审核
export function identityCheck(data) {
  return request({
    url: '/admin/identityAuthenticationCheck',
    method: 'post',
    data // {"arId": 0,"flag": 0,"identId": "","userId": ""}
  })
}

// 认证请求审核
export function getIdentity(data) {
  return request({
    url: '/admin/getIdentityAuthenticationList',
    method: 'post',
    data // {"page": 0,"pageSize": 0,"param": "","status": 0}
  })
}
