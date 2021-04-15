import Vue         from 'vue';
import Vuex        from 'vuex';
import {api}       from "boot/axios";
import tabs        from "./tabs";
import stepsValues from "./stepsValues";

Vue.use(Vuex);

export default function (/* { ssrContext } */) {
    const Store = new Vuex.Store({
        modules: {
            tabs,
            stepsValues
        },
        state: {
            step: 1,
            requests: [],
            organization: {},
            service: {},
            day: {},
            time: {},
            person: {}
        },
        getters: {
            getStep(state) {
                return state.step;
            },
            getOrganizations(state) {
                const organizations = [];

                for (let organization of state.requests) {
                    if (!checkOrganizationForVacantRequests(organization)) {
                        organization['disable'] = true;
                    }

                    organizations.push(organization);
                }

                return organizations;
            },
            getOrganization(state) {
                return state.organization;
            },
            getServices(state) {
                const services = [];

                if (Array.isArray(state.organization.services)) {
                    for (let service of state.organization.services) {
                        if (!checkServiceForVacantRequests(service)) {
                            service['disable'] = true;
                        }

                        services.push(service);
                    }
                }

                return services;
            },
            getService(state) {
                return state.service;
            },
            getDays(state) {
                const days = [];

                if (Array.isArray(state.service['appointments'])) {
                    for (let day of state.service['appointments']) {
                        if (!checkDayForVacantRequests(day)) {
                            day['disable'] = true;
                        }

                        days.push(day);
                    }
                }

                return days;
            },
            getDay(state) {
                return state.day;
            },
            getTimes(state) {
                return state.day.times;
            },
            getTime(state) {
                return state.time;
            },
            getPerson(state) {
                return state.person;
            }
        },
        mutations: {
            setStep(state, step) {
                state.step = step;
            },
            setRequests(state, requests) {
                state.requests = requests;
            },
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
            setPerson(state, person) {
                state.person = person;
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
            },
            reload({dispatch, commit}) {
                dispatch('fetchOpenApplications').then(() => {
                    commit('setStep', 1);
                    commit('setTime', {});
                    commit('setDay', {});
                    commit('setService', {});
                    commit('setOrganization', {});

                    dispatch('stepsValues/clear');

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


function checkOrganizationForVacantRequests(organization) {
    let result = false;

    for (let service of organization.services) {
        result = result || checkServiceForVacantRequests(service);
    }

    return result;
}

function checkServiceForVacantRequests(service) {
    let result = false;

    for (let day of service['appointments']) {
        result = result || checkDayForVacantRequests(day);
    }

    return result;
}

function checkDayForVacantRequests(day) {
    let result = false;

    for (let time of day.times) {
        result = result || time['free'];
    }

    return result;
}
