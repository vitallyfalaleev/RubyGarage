import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1/';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    modal: false,
  },
  mutations: {
    STATE_REQUEST(state) {
      state.status = 'loading'
    },
    STATE_SUCCESS(state) {
      state.status = 'success';
    },
    SET_MODAL(state, data) {
      state.modal = data
    }
  },
  actions: {
    createSession({commit}, {user}){
      commit("STATE_REQUEST")
      axios
          .post( BASE_URL + 'login', {user})
          .then(res => {
            commit("STATE_SUCCESS")
            sessionStorage.setItem('token', res.headers.authorization)
            sessionStorage.setItem('user-id', res.data.user.id)
            sessionStorage.setItem('user-email', res.data.user.email)
            this.$router.go(this.$router.currentRoute)
          })
      console.log("createSession",{commit})
    },
    setModal({commit, state}, data) {
      commit('SET_MODAL', data)
      return state.modal
    }
  },
  modules: {
  },
  getters: {
    status: state => {
      return state.status
    },
    modal: state => {
      return state.modal
    },
  }
})
