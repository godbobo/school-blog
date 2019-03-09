import { lst } from '@/api/essay'

const essay = {
  state: {
    essaylst: [], // 文章列表
    essay: {}, // 当前文章
    essayeditmode: false, // 编辑模式
    essaysavevisible: false
  },
  mutations: {
    SET_ESSAY_LST: (state, lst) => {
      state.essaylst = lst
    },
    SET_ESSAY: (state, essay) => {
      state.essay = essay
    },
    ESSAY_TRIGGER_MODE: (state) => {
      state.essayeditmode = !state.essayeditmode
    },
    ESSAY_TRIGGER_DIALOG: (state) => {
      state.essaysavevisible = !state.essaysavevisible
    }
  },
  actions: {
    // 获取文章列表
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
    },
    // 切换编辑模式
    EssayTriggerMode({ commit }) {
      commit('ESSAY_TRIGGER_MODE')
    },
    // 控制保存文章对话框显示隐藏
    EssayTriggerDialog({ commit }) {
      commit('ESSAY_TRIGGER_DIALOG')
    }
  }
}

export default essay
