<template>
    <Step :name="2"
          title="Услуга"
          icon="mdi-room-service"
          :before-next="beforeNext">
        <q-select label="Услуга"
                  :options="services"
                  v-model="service"/>
    </Step>
</template>

<script>
import Step from "components/steps/Step";

export default {
    name: "Step2",
    components: {
        Step
    },
    data(){
        return {
            service: null
        }
    },
    computed: {
        // service: {
        //     get() {
        //         return this.$store.getters['registration/getService'];
        //     },
        //     set(val) {
        //         this.$store.commit('registration/setService', val);
        //     }
        // },
        services(){
            return this.$store.getters['step2/getServices'];
        }
    },
    methods: {
        beforeNext() {
            return new Promise((resolve, reject) => {
                if (!this.service) return reject('Выберите услугу');

                if (this.service === this.$store.getters['registration/getService']) return resolve();

                this.$store.dispatch('step3/fetchDays', this.service.value).then(() => {
                    this.$store.commit('registration/setService', this.service);
                    resolve()
                }).catch(() => {
                    reject('Неудалось выполнить запрос');
                });
            });
        }
    }
}
</script>
