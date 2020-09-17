import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

const state = {
  token: window.localStorage.getItem('token'),
  userInfo: {},
  loginOrLogout: 'Logout',
  loginStatus: true
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
