import {api} from 'src/boot/axios';

export default {
    namespaced: true,
    state: {
        services: []
    },
    getters: {
        getServices(state) {
            return state.services;
        }
    },
    mutations: {
        setServices(state, services) {
            state.services = services;
        }
    },
    actions: {
        fetchServices({rootGetters, commit}, organization) {
            return api({
                url: '/steps/services',
                method: 'get',
                params: {
                    organization: organization
                }
            }).then(response => {
                commit('setServices', response.data);
            });
        }
    }
}
