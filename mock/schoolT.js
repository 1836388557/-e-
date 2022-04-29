const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    id: '@integer(1,10)',
    title: '@county(0)' + '校区'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/schoolT/list',
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
