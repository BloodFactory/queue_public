export default {
    namespaced: true,
    state: {
        organization: null,
        service: null,
        day: null,
        time: null,
        person: {
            lastName: '',
            firstName: '',
            middleName: '',
            birthday: '',
            email: '',
            phone: ''
        }
    },
    getters: {
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
        getPersonLastName(state) {
            return state.person.lastName;
        },
        getPersonFirstName(state) {
            return state.person.firstName;
        },
        getPersonMiddleName(state) {
            return state.person.middleName;
        },
        getPersonBirthday(state) {
            return state.person.birthday;
        },
        getPersonPhone(state) {
            return state.person.phone;
        },
        getPersonEmail(state) {
            return state.person.email;
        }
    },
    mutations: {
        setOrganization(state, organization) {
            state.organization = organization;
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
        setPersonLastName(state, lastName) {
            state.person.lastName = lastName;
        },
        setPersonFirstName(state, firstName) {
            state.person.firstName = firstName;
        },
        setPersonMiddleName(state, middleName) {
            state.person.middleName = middleName;
        },
        setPersonBirthday(state, birthday) {
            state.person.birthday = birthday;
        },
        setPersonPhone(state, phone) {
            state.person.phone = phone;
        },
        setPersonEmail(state, email) {
            state.person.email = email;
        }
    },
    actions: {
        clear({commit}) {
            commit('setOrganization', null);
            commit('setService', null);
            commit('setDay', null);
            commit('setTime', null);
            commit('setPersonLastName', '');
            commit('setPersonFirstName', '');
            commit('setPersonMiddleName', '');
            commit('setPersonBirthday', '');
            commit('setPersonPhone', '');
            commit('setPersonEmail', '');

            return Promise.resolve();
        }
    }
}
