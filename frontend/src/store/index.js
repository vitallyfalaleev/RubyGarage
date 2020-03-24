import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = 'https://rubygaragetodo.herokuapp.com/api/v1/';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isLogin: Cookies.get('logged'),
        userEmail: Cookies.get('user-email'),
        status: '',
        listStatus: true,
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
        LIST_REQUEST(state) {
            state.listStatus = true;
        },
        LIST_SUCCESS(state) {
            state.listStatus = false;
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
        DELETE_PROJECT(state, data) {
            state.projects.splice(state.projects.findIndex(function (i) {
                return i.id === data;
            }), 1)
        },
        ADD_TASK(state, data){
            const element = state.projects.findIndex(x => x.id == data.project_id)
            state.projects[element].attributes.tasks = [...state.projects[element].attributes.tasks, data]
        },
        DELETE_TASK(state, data){
            const element = state.projects.findIndex(x => x.id == data.project_id)
            state.projects[element].attributes.tasks.splice(state.projects[element].attributes.tasks.findIndex(function (i) {
                return i.id === data.id;
            }), 1)
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
                .then(res => {
                    console.log(res)
                    setTimeout(() => dispatch('createSession', {user}), 500)
                })
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
                    commit('ADD_PROJECT', res.data.data)
                })

        },
        updateProject({commit}, data) {
            axios
                .put(BASE_URL+'projects/'+data.id,
                    {
                        project: {
                            title: data.title,
                        }
                    },
                    {
                        headers: {
                            Authorization: Cookies.get('token')
                        }
                    })
                .then((res) => {
                    commit('ADD_PROJECT', res.data.data)
                })

        },
        deleteProject({commit}, data) {
            axios
                .delete(BASE_URL+'projects/'+data,
                    {
                        headers: {
                            Authorization: Cookies.get('token')
                        }
                    })
                .then(
                    commit('DELETE_PROJECT', data),
                )
        },
        getProjects({commit}){
            commit("LIST_REQUEST");
            axios
                .get(BASE_URL + 'projects.json', {
                    params: {
                        user_id: Cookies.get('user-id')
                    },
                    headers: {
                        Authorization: Cookies.get('token')
                    }
                })
                .then(res => {
                    commit('FETCH_PROJECTS', res.data.data)
                    commit("LIST_SUCCESS");

                })
        },
        setModal({commit}) {
            commit('SET_MODAL')
        },
        createTask({commit}, data){
            axios
                .post(BASE_URL+'tasks', {
                        task: {
                            name: data.task.title,
                            date: data.task.date,
                            project_id: data.project_id,
                            user_id: Cookies.get('user-id')
                        }
                    },
                    {
                        headers: {
                            Authorization: Cookies.get('token')
                        }
                    })
                .then(res => {
                    commit('ADD_TASK', res.data)
                })
        },
        doneTask({commit}, data){
            console.log(commit, data)
            axios
                .put(BASE_URL + 'tasks/' + data.id, {
                        task: {
                            done: data.status
                        }
                    },
                    {
                        headers: {
                            Authorization: Cookies.get('token')
                        }
                    })
        },
        updateTask({commit}, data){
            console.log(commit)
            axios
                .put(BASE_URL + 'tasks/' + data.id, {
                        task: {
                            name: data.name,
                            date: data.date,
                        }
                    },
                    {
                        headers: {
                            Authorization: Cookies.get('token')
                        }
                    })
        },
        deleteTask({commit}, data){
            axios
                .delete(BASE_URL + 'tasks/' + data.id,
                    {
                        headers: {
                            Authorization: Cookies.get('token')
                        }
                    })
                .then(
                    commit('DELETE_TASK', data)
                )

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
        listStatus: state => {
            return state.listStatus
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
