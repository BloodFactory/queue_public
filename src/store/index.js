import Vue   from 'vue';
import Vuex  from 'vuex';
import tabs  from "src/store/tabs";
import {api} from "boot/axios";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
    const Store = new Vuex.Store({
        modules: {
            tabs
        },
        state: {
            requests: {}
        },
        getters: {},
        mutations: {
            setRequestssetRequests(state, requests) {
                state.requests = requests
            }
        },
        actions: {
            fetchOpenApplications({commit}) {
                return api({
                    url: '/requests',
                    methods: 'get'
                }).then(response => {
                    commit('setRequests', response.data);
                    return Promise.resolve();
                });
            }
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEBUGGING
    })

    return Store
}
