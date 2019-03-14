const essay = {
  state: {
    essayeditmode: false, // 编辑模式
    essaysavevisible: false
  },
  mutations: {
    ESSAY_TRIGGER_MODE: (state) => {
      state.essayeditmode = !state.essayeditmode
    },
    ESSAY_TRIGGER_DIALOG: (state) => {
      state.essaysavevisible = !state.essaysavevisible
    }
  },
  actions: {
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
