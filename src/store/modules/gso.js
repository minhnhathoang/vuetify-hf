import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,
    state: {
        provinces: [],
        district: [],
        communes: [],

        current_province: null,
        current_district: null,
        current_commune: null
    },
    getters: {
        provinces: state => state.provinces,
        districts: state => state.districts,
        communes: state => state.communes,

        current_province: state => state.current_province,
        current_district: state => state.current_district,
        current_commune: state => state.current_commune,
    },
    mutations: {
        setProvinceArr(state, data) {
            state.provinces = data;
        },
        setDistrictsArr(state, data) {
            state.districts = data;
        },
        setCommuneArr(state, data) {
            state.communes = data;
        }
    },
    actions: {
        getProvinces: ({commit, getters}) => {
            return new Promise((resolve, reject) => {
                axios.get('/provinces')
                    .then(response => {
                        commit('setProvinceArr', response.data.data);
                    })
                    .catch(error => {

                    })
            })
        },
        getDistrictsOfProvince: ({commit, getters}) => {
            let province = getters.current_province;
            return new Promise((resolve, reject) => {
                axios.post('/province/districts', {name: province})
                    .then(response => {
                        commit('setDistrictsArr', response.data.data);
                        commit('setCommuneArr', []);
                    })
                    .catch(error => {

                    })
            })
        },
        getCommunesOfDistrict: ({commit, getters}) => {
            let district = getters.current_district;
            return new Promise((resolve, reject) => {
                axios.post('/district/communes', {name: district})
                    .then(response => {
                        commit('setCommuneArr', response.data.data);
                    })
                    .catch(error => {

                    })
            })
        }
    }
}