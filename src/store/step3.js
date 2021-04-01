import {api} from "boot/axios";

export default {
    namespaced: true,
    state: {
        days: []
    },
    getters: {
        getDays(state) {
            return state.days;
        }
    },
    mutations: {
        setDays(state, days) {
            state.days = days;
        }
    },
    actions: {
        fetchDays({rootGetters, commit}, service) {
            return api({
                url: '/steps/days',
                method: 'get',
                params: {
                    service: service
                }
            }).then(response => {
                commit('setDays', response.data.days);
            });
        }
    }
}
