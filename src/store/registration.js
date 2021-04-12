export default {
    namespaced: true,
    state: {
        step: 1,
        organization: null,
        service: null,
        day: null,
        time: null,
        person: {
            lastName: '',
            firstName: '',
            middleName: '',
            birthday: '',
            phone: '',
            email: ''
        }
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
        },
        getDay(state) {
            return state.day;
        },
        getTime(state) {
            return state.time;
        },
        getPerson(state) {
            return state.person;
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
        },
        setDay(state, day) {
            state.day = day;
        },
        setTime(state, time) {
            state.time = time;
        },
        setPerson(state, person) {
            state.person = person;
        }
    },
    actions: {},
}
