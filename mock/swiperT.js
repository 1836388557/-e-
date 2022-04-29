const Mock = require('mockjs')

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    image: '@image'
    // createTime: '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/swiperT/list',
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
