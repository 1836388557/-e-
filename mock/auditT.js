const Mock = require('mockjs')

// 模拟数据

// 全部100条数据
const count = 100
// 商品数据
const goodList = []

for (let i = 0; i < count; i++) {
  goodList.push(Mock.mock({
    images: ['@image', '@image', '@image'],
    title: '@cword(30)',
    content: '@cword(300)',
    createDate: '@datetime',
    'school|1': ['黄金校区', '章贡校区'],
    'type|1': ['衣服', '生活用品', '数码'],
    'status|1': [0, 1, 2]
  }))
}

// 需求数据
const needList = []

for (let i = 0; i < count; i++) {
  needList.push(Mock.mock({
    title: '@cword(30)',
    content: '@cword(300)',
    createDate: '@datetime',
    'school|1': ['黄金校区', '章贡校区'],
    'type|1': ['衣服', '生活用品', '数码'],
    'status|1': [0, 1, 2]
  }))
}

// 拼车数据
const poolList = []

for (let i = 0; i < count; i++) {
  poolList.push(Mock.mock({
    title: '@cword(30)',
    content: '@cword(300)',
    createDate: '@datetime',
    'school|1': ['黄金校区', '章贡校区'],
    'status|1': [0, 1, 2]
  }))
}

// 活动数据
const activityList = []

for (let i = 0; i < count; i++) {
  activityList.push(Mock.mock({
    title: '@cword(30)',
    content: '@cword(300)',
    createDate: '@datetime',
    'school|1': ['黄金校区', '章贡校区'],
    'status|1': [0, 1, 2]
  }))
}

// 兼职数据
const jobList = []

for (let i = 0; i < count; i++) {
  jobList.push(Mock.mock({
    title: '@cword(30)',
    content: '@cword(300)',
    createDate: '@datetime',
    'school|1': ['黄金校区', '章贡校区'],
    'status|1': [0, 1, 2]
  }))
}

// 招领数据
const findList = []

for (let i = 0; i < count; i++) {
  findList.push(Mock.mock({
    images: ['@image', '@image', '@image'],
    title: '@cword(30)',
    content: '@cword(300)',
    createDate: '@datetime',
    'school|1': ['黄金校区', '章贡校区'],
    'status|1': [0, 1, 2]
  }))
}

// 遗失数据
const lostList = []

for (let i = 0; i < count; i++) {
  lostList.push(Mock.mock({
    images: ['@image', '@image', '@image'],
    title: '@cword(30)',
    content: '@cword(300)',
    createDate: '@datetime',
    'school|1': ['黄金校区', '章贡校区'],
    'status|1': [0, 1, 2]
  }))
}

// 接口模块
module.exports = [
  // 商品接口
  {
    url: '/vue-admin-template/auditT/good/list',
    type: 'get',
    response: config => {
      const { title, type, school, status, page = 1, limit = 20 } = config.query

      // console.log('config.query', config.query)
      const mockList = needList.filter(item => {
        if (school && item.school !== school && school !== undefined) return false
        if (type && item.type !== type && type !== undefined) return false
        if (item.status !== Number(status) && status !== undefined) return false
        if (title && item.title.indexOf(title) < 0 && title !== undefined) return false
        return true
      })

      // console.log(mockList)
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
  // 需求接口
  {
    url: '/vue-admin-template/auditT/need/list',
    type: 'get',
    response: config => {
      const { title, type, school, status, page = 1, limit = 20 } = config.query

      // console.log('config.query', config.query)
      const mockList = needList.filter(item => {
        if (school && item.school !== school && school !== undefined) return false
        if (type && item.type !== type && type !== undefined) return false
        if (item.status !== Number(status) && status !== undefined) return false
        if (title && item.title.indexOf(title) < 0 && title !== undefined) return false
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
  // 拼车接口
  {
    url: '/vue-admin-template/auditT/pool/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { title, school, status, page = 1, limit = 20 } = config.query

      const mockList = needList.filter(item => {
        if (school && item.school !== school && school !== undefined) return false
        if (item.status !== Number(status) && status !== undefined) return false
        if (title && item.title.indexOf(title) < 0 && title !== undefined) return false
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
  // 活动接口
  {
    url: '/vue-admin-template/auditT/activity/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { title, school, status, page = 1, limit = 20 } = config.query

      const mockList = needList.filter(item => {
        if (school && item.school !== school && school !== undefined) return false
        if (item.status !== Number(status) && status !== undefined) return false
        if (title && item.title.indexOf(title) < 0 && title !== undefined) return false
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
  // 兼职接口
  {
    url: '/vue-admin-template/auditT/job/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { title, school, status, page = 1, limit = 20 } = config.query

      const mockList = needList.filter(item => {
        if (school && item.school !== school && school !== undefined) return false
        if (item.status !== Number(status) && status !== undefined) return false
        if (title && item.title.indexOf(title) < 0 && title !== undefined) return false
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
  // 招领接口
  {
    url: '/vue-admin-template/auditT/find/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { title, school, page = 1, limit = 20 } = config.query

      const mockList = needList.filter(item => {
        if (school && item.school !== school) return false
        if (title && item.title.indexOf(title) < 0) return false
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
  // 遗失接口
  {
    url: '/vue-admin-template/auditT/lost/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { title, school, page = 1, limit = 20 } = config.query

      const mockList = needList.filter(item => {
        if (school && item.school !== school) return false
        if (title && item.title.indexOf(title) < 0) return false
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
  }

]
