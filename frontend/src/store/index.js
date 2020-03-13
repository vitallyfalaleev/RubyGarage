import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000/api/v1/';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: sessionStorage.getItem('logged'),
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
        SET_MODAL(state) {
            state.modal = !state.modal
        },
        SET_SESSION(state) {
            state.isLogin = !state.isLogin
        },
        FETCH_PROJECTS(state, data) {
            state.projects = data
        },
        SET_COOKIES(state, data) {
            data.options = {
                'max-age': 86400,
                ...data.options
            };

            if (data.options.expires instanceof Date) {
                data.options.expires = data.options.expires.toUTCString();
            }

            let updatedCookie = encodeURIComponent(data.name) + "=" + encodeURIComponent(data.value);

            for (let optionKey in data.options) {
                updatedCookie += "; " + optionKey;
                let optionValue = data.options[optionKey];
                if (optionValue !== true) {
                    updatedCookie += "=" + optionValue;
                }
            }

            document.cookie = updatedCookie;
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
                    sessionStorage.setItem('logged', true)

                })
        },
        setModal({commit}) {
            commit('SET_MODAL')
        },
        setSession({commit}) {
            commit('SET_SESSION')
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
                .then(() => {
                    commit("STATE_SUCCESS")
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
                })
        },

    },
    modules: {
    },
    getters: {
        isLogin: state => {
            return state.isLogin
        },
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
