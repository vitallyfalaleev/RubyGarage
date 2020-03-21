import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = 'http://localhost:5000/api/v1/';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: Cookies.get('logged'),
        userEmail: Cookies.get('user-email'),
        status: '',
        modal: false,
        projects: []
    },
    mutations: {
        STATE_REQUEST(state) {
            state.status = 'loading';
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
        SET_EMAIL(state, email) {
            state.userEmail = email
        },
        FETCH_PROJECTS(state, data) {
            state.projects = data
        },
        ADD_PROJECT(state, data) {
            state.projects = [data, ...state.projects]
        },
        SET_COOKIES(state, data){
            data.forEach(cookie => {
                    return Cookies.set(cookie.name, cookie.value, { expires: 1 })

                }
            )
        },
        DELETE_COOKIES(state, data){
            data.forEach(cookie => {
                    return Cookies.remove(cookie.name)
                }
            )
            state.projects = []
        }
    },
    actions: {
        userRegistration({ dispatch }, {user}){
            axios
                .post( BASE_URL + 'signup', {user})
                .then(setTimeout(() => dispatch('createSession', {user}), 500))
        },
        createSession({commit}, {user}){
            commit("STATE_REQUEST");
            axios
                .post( BASE_URL + 'login', {user})
                .then(res => {
                    commit("STATE_SUCCESS");
                    let data = [{name: 'token', value: res.headers.authorization},
                        {name: 'user-id', value: res.data.user.id},
                        {name: 'user-email', value: res.data.user.email},
                        {name: 'logged', value: true}];
                    commit("SET_COOKIES", data);
                    commit("SET_EMAIL", res.data.user.email);
                    commit('SET_SESSION');
                    commit('SET_MODAL')
                })
        },
        destroySession({commit}){
            commit('DELETE_COOKIES', [{name: 'token'}, {name: 'user-id'}, {name: 'user-email'}, {name: 'logged'}])
            commit('SET_SESSION');
            commit('SET_MODAL')
        },
        setSession({commit}) {
            commit('SET_SESSION')
        },
        createProject({commit}, data) {
            commit("STATE_REQUEST");
            axios
                .post(BASE_URL+'projects',
                    {
                        project: {
                            title: data.title,
                            user_id: Cookies.get('user-id')
                        }
                    },
                    {
                        headers: {
                            Authorization: Cookies.get('token')
                        }
                    })
                .then((res) => {
                    commit("STATE_SUCCESS");
                    commit('ADD_PROJECT', res.data)
                })

        },
        getProjects({commit}){
            axios
                .get(BASE_URL + 'projects', {
                    params: {
                        user_id: Cookies.get('user-id')
                    },
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                })
                .then(res => {
                    commit('FETCH_PROJECTS', res.data.data)
                })
        },
        setModal({commit}) {
            commit('SET_MODAL')
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
        },
        userEmail: state => {
            return state.userEmail
        }
    }
})
