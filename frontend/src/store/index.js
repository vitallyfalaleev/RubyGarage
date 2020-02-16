import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1/';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        modal: false,
        projects: []
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
        },
        FETCH_PROJECTS(state, data) {
            state.projects = data
        },
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
                })
        },
        setModal({commit, state}, data) {
            commit('SET_MODAL', data)
            return state.modal
        },
        createProject({commit}, data) {
            commit("STATE_REQUEST")
            axios
                .post(BASE_URL+'projects',
                    {
                        project: {
                            title: data.title,
                            user_id: sessionStorage.getItem('user-id')
                        }
                    },
                    {
                        headers: {
                            Authorization: sessionStorage.getItem('token')
                        }
                    })
                .then(res => {
                    commit("STATE_SUCCESS")
                    console.log('new', res)
                })

        },
        getProjects({commit}){
            axios
                .get(BASE_URL + 'projects', {
                    params: {
                        user_id: sessionStorage.getItem('user-id')
                    },
                    headers: {
                        Authorization: sessionStorage.getItem('token')
                    }
                })
                .then(res => {
                    commit('FETCH_PROJECTS', res.data)
                    console.log('all', commit, res.data, this.projects)
                })
        },

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
        projects: state => {
            return state.projects
        }
    }
})
