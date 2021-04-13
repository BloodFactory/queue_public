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
import Step from "./Step";

export default {
    name: "Step2",
    components: {
        Step
    },
    data() {
        return {
            service: null
        }
    },
    computed: {
        services() {
            return this.$store.getters['getServices'];
        }
    },
    methods: {
        beforeNext() {
            return new Promise((resolve, reject) => {
                if (!this.service) return reject('Выберите услугу');

                if (this.service === this.$store.getters['getService']) return resolve();

                this.$store.commit('setService', this.service);
                resolve();
            });
        }
    }
}
</script>
