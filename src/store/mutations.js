import * as types from './types.js'

const mutations = {
  [types.LOGIN]: (state, value) => {
    state.token = value
  },
  [types.USERINFO]: (state, info) => {
    state.userInfo = info
  },
  [types.LOGINSTATUS]: (state, bool) => {
    state.loginStatus = bool
  },
  [types.LOGINORLOGOUT]: (state, value) => {
    state.loginOrLogout = value
  }
}

export default mutations
