const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const user = require('./user')
const table = require('./table')

// 模拟数据
const swiperT = require('./swiperT') // 管理员
const adminT = require('./adminT') // 管理员
const userT = require('./userT') //  用户
const auditT = require('./auditT') // 审核
const schoolT = require('./schoolT') // 学校
const goodSortT = require('./goodSortT') // 商品分类

const mocks = [
  ...user,
  ...table,
  ...adminT,
  ...userT,
  ...auditT,
  ...swiperT,
  ...schoolT,
  ...goodSortT
]

function mockXHR() {
  // mock 补丁

  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options

        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}

