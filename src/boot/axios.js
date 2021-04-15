import Vue   from 'vue';
import axios from 'axios';

const baseURL = process.env.API_BASE_URL;

const api = axios.create({
    baseURL
});

Vue.prototype.$axios = axios;
Vue.prototype.$api   = api;

export {
    axios,
    api
};
