const Mock = require('mockjs')

const data = Mock.mock({
  'items': [{
    title: '衣服',
    createTime: '@datetime'
  },
  {
    title: '生活用品',
    createTime: '@datetime'
  }, {
    title: '数码',
    createTime: '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/goodSortT/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
