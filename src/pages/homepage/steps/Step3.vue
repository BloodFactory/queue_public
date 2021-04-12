<template>
    <Step :name="3"
          title="День"
          icon="mdi-calendar"
          :before-next="beforeNext">
        <div class="row">
            <div class="col-3" v-for="(date, index) in days" :key="index">
                <q-btn :label="date.value" :color="day === date ? 'primary': 'green'" @click="day = date"/>
            </div>
        </div>
    </Step>
</template>

<script>
import Step from "pages/homepage/steps/Step";

export default {
    name: "Step3",
    components: {
        Step
    },
    data() {
        return {
            day: null
        }
    },
    computed: {
        days() {
            return this.$store.getters['step3/getDays'];
        }
    },
    methods: {
        beforeNext() {
            return new Promise((resolve, reject) => {
                if (!this.day) return reject('Выберите дату');

                if (this.day === this.$store.getters['registration/getDay']) return resolve();

                const service = this.$store.getters['registration/getService'];

                this.$store.dispatch('step4/fetchTimes', {service: service.value, day: this.day.value}).then(() => {
                    this.$store.commit('registration/setDay', this.day);
                    resolve()
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
}
</script>
