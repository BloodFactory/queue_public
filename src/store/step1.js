import {api} from 'src/boot/axios';

export default {
    namespaced: true,
    state: {
        organizations: []
    },
    getters: {
        getOrganizations(state) {
            return state.organizations;
        }
    },
    mutations: {
        setOrganizations(state, organizations) {
            state.organizations = organizations;
        }
    },
    actions: {
        loadOrganizations({commit}) {
            return api({
                url: '/steps/organizations',
                methods: 'get'
            }).then(response => {
                commit('setOrganizations', response.data);
                return Promise.resolve();
            });
        }
    }
}
