import {api} from "boot/axios";

export default {
    namespaced: true,
    state: {
        times: []
    },
    getters: {
        getTimes(state) {
            return state.times;
        }
    },
    mutations: {
        setTimes(state, times) {
            state.times = times;
        }
    },
    actions: {
        fetchTimes({rootGetters, commit}, {service, day}) {
            return api({
                url: '/requests/step4',
                method: 'get',
                params: {
                    service: service,
                    day: day
                }
            }).then(response => {
                commit('setTimes', response.data);
            });
        }
    }
}
