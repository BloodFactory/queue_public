export default {
    namespaced: true,
    state: {
        step: 1,
        organization: null,
        service: null
    },
    getters: {
        getStep(state) {
            return state.step;
        },
        getOrganization(state) {
            return state.organization;
        },
        getService(state) {
            return state.service;
        }
    },
    mutations: {
        setOrganization(state, organization) {
            state.organization = organization;
        },
        setStep(state, step) {
            state.step = step;
        },
        setService(state, service) {
            state.service = service;
        }
    },
    actions: {},
}
