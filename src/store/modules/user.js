import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// 获取默认状态
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userId: '',
    userInfo: {
      username: '',
      password: ''
    }
  }
}

// 状态
const state = getDefaultState()

// 方法
const mutations = {
  // 重置重置状态
  RESET_STATE: (state) => {
    // 浅拷贝，将默认状态赋给 变量状态
    Object.assign(state, getDefaultState())
  },
  // 设置token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 设置token
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  // 设置名字
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo.username = userInfo.username
    state.userInfo.password = userInfo.password
    console.log(userInfo)
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }
}

//  异步方法
const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password, tag, rememberMe } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, tag, rememberMe }).then(response => {
        const { data, headers } = response
        // 保存token到vuex state
        console.log(username, password)

        commit('SET_USERINFO', { username, password })
        commit('SET_TOKEN', headers.authorization)
        commit('SET_USERID', data.data)
        setToken(headers.authorization)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('验证失败, 请重新登录.')
        }

        const { name, avatar } = data

        // 保存名字 头像到vuex state
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        // 移除token
        removeToken()
        resetRouter()
        // 重置状态
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 必须先移除token
      // 重置状态
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

