import Vue   from 'vue';
import Vuex  from 'vuex';
import tabs  from "./tabs";
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
                return state.requests;
            },
            getOrganization(state) {
                return state.organization;
            },
            getServices(state) {
                return state.organization.services;
            },
            getService(state) {
                return state.service;
            },
            getDays(state) {
                return state.service.appointments;
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
            }
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEBUGGING
    })

    return Store
}
