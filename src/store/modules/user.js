import { login, logout, getInfo } from '@/api/login'
import { getUserLst, addUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    role: -1
  },

  // 名称仅仅用了大写，并不是设置了全局变量
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      console.log(avatar)
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.role = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          if (data.user && data.user.role > -1) { // 验证返回的用户的合法性
            commit('SET_ROLES', data.user.role) // 获取到数据之后就可以将其存储到 store 了
            commit('SET_NAME', data.user.name)
          } else {
            reject('非法用户角色!') // 向外抛出错误信息
          }
          // commit('SET_AVATAR', data.avatar)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.user && data.user.role > -1) { // 验证返回的用户的合法性
            commit('SET_ROLES', data.user.role) // 获取到数据之后就可以将其存储到 store 了
            commit('SET_NAME', data.user.name)
          } else {
            reject('非法用户角色!') // 向外抛出错误信息
          }
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error) // 向外抛出错误信息
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', -1)
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', -1)
        removeToken()
        resolve()
      })
    },

    // 获取用户列表（仅管理员有该权限）
    UserGetLst({ state }, payload) {
      if (state.role !== 2) {
        Message({
          message: '非管理员用户禁止此操作！',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      return new Promise((resolve, reject) => {
        getUserLst(payload.size, payload.currentpage).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 新增用户
    UserAdd({ commit }, payload) {
      return new Promise((resolve, reject) => {
        addUser(payload.name, payload.college, payload.tel, payload.role).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
