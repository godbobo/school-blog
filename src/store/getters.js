const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  // 文章模块
  essayeditmode: state => state.essay.essayeditmode,
  essaysavevisible: state => state.essay.essaysavevisible
}
export default getters
