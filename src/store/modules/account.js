import axios from "axios";
import router from "@/router";

export default {
    state: {
        token: null,
        errors: null
    },
    getters: {},
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        logout(state) {
            state.token = null;
        },
        setErrors(state, errors) {
            state.errors = errors;
        },
    },
    actions: {
        login: ({commit}, loginData) => {
            axios.post('/login', loginData)
                .then(response => {
                    localStorage.setItem('accessToken', response.data.token);
                    commit('setToken', response.data.token);
                    commit('setErrors', null);
                    axios.defaults.headers.common['Authorization'] = response.data.token;
                    router.push('/');
                })
                .catch(error => {
                    commit('setToken', null);
                    commit('setErrors', error.response.data.error);
                });
        },

        REGISTER: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios
                    .post('/register', payload)
                    .then(({data, status}) => {
                        if (status === 200) {
                            commit('setToken', data.token);
                            router.push('/');
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
                ;
            });
        },

        logout: ({commit}) => {
            axios.post('/logout')
                .then(({data, status}) => {
                    commit('logout');
                    delete axios.defaults.headers.common['Authorization'];
                    localStorage.clear();
                    router.push('/login');
                })
                .catch(error => {
                    console.log(error);
                });
            ;
        },
    }
}