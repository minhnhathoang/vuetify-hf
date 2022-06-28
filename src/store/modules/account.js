import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('accessToken'),
        errors: null,

        user: {
            id: null,
            full_name: null,
            first_name: null,
            surname: null,
            last_name: null,
            email: null,
            role: null,
            avatar: null,
            mobile: null,
            gender: null,
            birthday: null,
            joined_on: null
        }
    },
    getters: {
        user: state => state.user,
    },
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
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        login: ({commit}, loginData) => {
            return new Promise((resolve, reject) => {
                axios.post('/login', loginData)
                    .then(response => {
                        localStorage.setItem('accessToken', response.data.token);
                        localStorage.setItem('role', response.data.user.role);
                        commit('setToken', response.data.token);
                        commit('setErrors', null);
                        axios.defaults.headers.common['Authorization'] = response.data.token;
                        router.push('/');
                    })
                    .catch(error => {
                        commit('setToken', null);
                        commit('setErrors', error.response.data.error);
                        console.log(error);
                        reject(error.response.data.message);
                    })
            })
        },

        // REGISTER: ({commit}, payload) => {
        //     return new Promise((resolve, reject) => {
        //         axios
        //             .post('/register', payload)
        //             .then(({data, status}) => {
        //                 if (status === 200) {
        //                     commit('setToken', data.token);
        //                     router.push('/');
        //                 }
        //             })
        //             .catch(error => {
        //                 reject(error);
        //             });
        //         ;
        //     });
        // },

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
        },

        getUser: ({commit}) => {
            return new Promise((resolve, reject) => {
                axios.get('/user')
                    .then(response => {
                        commit('setUser', response.data.data[0]);
                        console.log(response);
                        resolve();
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error.response.data.message);
                    })
            })
        },

        updateProfile: ({commit, getters}, payload) => {
            return new Promise((resolve, reject) => {
                let user = getters.user
                axios.post('/user/profile/edit/' + user.id, payload, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        },

        changePassword: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post('/password/change', payload)
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        },

        addUser: ({}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post('/user/add', payload)
                    .then(response => {
                        this.$root.vtoast.show({message: response});
                        resolve(response);
                    })
                    .catch(error => {
                        this.$root.vtoast.show({message: error});
                        reject(error);
                    })
            })
        },
    }
}