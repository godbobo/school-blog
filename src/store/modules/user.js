import { login, logout, getInfo } from '@/api/login'
import { getUserLst, addUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    role: -1,
    username: 0
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
    },
    SET_USERNAME: (state, id) => {
      state.username = id
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(data => {
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          if (data.user && data.user.role > -1) { // 验证返回的用户的合法性
            commit('SET_ROLES', data.user.role) // 获取到数据之后就可以将其存储到 store 了
            commit('SET_NAME', data.user.name)
            commit('SET_AVATAR', data.user.headimg)
            commit('SET_USERNAME', data.user.id)
          } else {
            reject('非法用户角色!') // 向外抛出错误信息
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      if (!state.token) {
        return
      }
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          if (response.user && response.user.role > -1) { // 验证返回的用户的合法性
            commit('SET_ROLES', response.user.role) // 获取到数据之后就可以将其存储到 store 了
            commit('SET_NAME', response.user.name)
            commit('SET_AVATAR', response.user.headimg)
            commit('SET_USERNAME', response.user.id)
          } else {
            reject('非法用户角色!') // 向外抛出错误信息
          }
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
    UserGetLst(payload) {
      return new Promise((resolve, reject) => {
        getUserLst(payload.size, payload.currentpage, payload.type, payload.arg1).then(response => {
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
