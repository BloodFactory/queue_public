import Vue   from 'vue';
import axios from 'axios';

const baseURL = 'http://localhost:9999/api';

const api = axios.create({
    baseURL
});

Vue.prototype.$axios = axios;
Vue.prototype.$api   = api;

export {
    axios,
    api
};
