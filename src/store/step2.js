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
                url: '/requests/step2',
                method: 'get',
                params: {
                    organization: organization
                }
            }).then(response => {
                if (response.data.length === 0) return Promise.reject('Выбраная организация не предоставляет услуг физическим лицам');
                commit('setServices', response.data);
            });
        }
    }
}
