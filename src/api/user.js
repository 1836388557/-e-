import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/auth/login',
    method: 'post',
    params,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;'
    }

  })
}

export function getInfo(params) {
  return request({
    url: '',
    method: 'get',
    params
  })
}

export function logout(params) {
  return request({
    url: '/user/logout',
    method: 'post',
    params
  })
}
