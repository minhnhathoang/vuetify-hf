import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { SetupCalendar } from 'v-calendar';


loadFonts();

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.account.token}`
    return config;
});

import 'v-calendar/dist/style.css';

createApp(App)
    .use(router)
    .use(store)
    .use(vuetify)
    .use(VueAxios, axios)
    .use(SetupCalendar, {componentPrefix: 'vc',})
    .mount('#app')
