import { lst } from '@/api/essay'

const essay = {
  state: {
    essaylst: [],
    essay: {}
  },
  mutations: {
    SET_ESSAY_LST: (state, lst) => {
      state.essaylst = lst
    },
    SET_ESSAY: (state, essay) => {
      state.essay = essay
    }
  },
  actions: {
    EssayLst({ commit }) {
      return new Promise((resolve, reject) => {
        lst().then(response => {
          const data = response.data
          commit('SET_ESSAY_LST', data)
          console.log('essay lst:', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default essay
