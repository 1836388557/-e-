const Mock = require('mockjs')
/*
  用户名  @string
  密码    @string
  状态    0 普通用户 1 管理员
*/

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
    'status|1': [0, 1]
  }))
}

// 兼职数据
const jobList = []

for (let i = 0; i < count; i++) {
  jobList.push(Mock.mock({
    title: '@cword(30)',
    content: '@cword(300)',
    createDate: '@datetime',
    'status|1': [0, 1]
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
    'status|1': [0, 1]
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
    'status|1': [0, 1]
  }))
}

// 接口模块
module.exports = [
  // 商品接口
  {
    url: '/vue-admin-template/auditT/good/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { title, page = 1, limit = 20 } = config.query

      const mockList = goodList.filter(item => {
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
  // 需求接口
  {
    url: '/vue-admin-template/auditT/need/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { title, page = 1, limit = 20 } = config.query

      const mockList = needList.filter(item => {
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
  // 拼车接口
  {
    url: '/vue-admin-template/auditT/pool/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { title, page = 1, limit = 20 } = config.query

      const mockList = poolList.filter(item => {
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
  // 活动接口
  {
    url: '/vue-admin-template/auditT/activity/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { title, page = 1, limit = 20 } = config.query

      const mockList = activityList.filter(item => {
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
  // 兼职接口
  {
    url: '/vue-admin-template/auditT/job/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { title, page = 1, limit = 20 } = config.query

      const mockList = jobList.filter(item => {
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
  // 招领接口
  {
    url: '/vue-admin-template/auditT/find/list',
    type: 'get',
    response: config => {
      // console.log('config', config)
      const { title, page = 1, limit = 20 } = config.query

      const mockList = findList.filter(item => {
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
      const { title, page = 1, limit = 20 } = config.query

      const mockList = lostList.filter(item => {
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
