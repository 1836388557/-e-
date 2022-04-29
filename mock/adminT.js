const Mock = require('mockjs')
/*
  用户名  @string
  密码    @string
  状态    0 普通用户 1 管理员
*/

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    // headImage: '@image',
    username: '@string(10,20)',
    password: '@string(10,20)',
    'status|1': [0, 1]
  }))
}

module.exports = [
  {
    url: '/vue-admin-template/adminT/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { username, page = 1, limit = 20 } = config.query

      const mockList = List.filter(item => {
        if (username && item.username.indexOf(username) < 0) return false
        return true
      })

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      // console.log(pageList)
      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/vue-element-admin/adminT/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
