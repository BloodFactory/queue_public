import Vue          from 'vue';
import Vuex         from 'vuex';
import tabs         from "src/store/tabs";
import registration from "src/store/registration";
import step1        from "src/store/step1";
import step2        from "src/store/step2";
import step3        from "src/store/step3";

// import example from './module-example'

Vue.use(Vuex)

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
            tabs,
            registration,
            step1,
            step2,
            step3
        },

        // enable strict mode (adds overhead!)
        // for dev mode only
        strict: process.env.DEBUGGING
    })

    return Store
}
