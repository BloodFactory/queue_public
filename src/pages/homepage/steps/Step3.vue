<template>
    <Step :name="3"
          title="День"
          icon="mdi-calendar"
          :before-next="beforeNext">
        <div class="row">
            <div class="col-3" v-for="(date, index) in days" :key="index">
                <q-btn :label="date.date"
                       :color="(date.hasOwnProperty('disable') && date.disable) ? 'red' : (day === date ? 'primary': 'green')"
                       :disable="date.hasOwnProperty('disable') && date.disable"
                       @click="day = date"/>
            </div>
        </div>
    </Step>
</template>

<script>
import Step from "./Step";

export default {
    name: "Step3",
    components: {
        Step
    },
    computed: {
        days() {
            return this.$store.getters['getDays'];
        },
        day: {
            get() {
                return this.$store.getters['stepsValues/getDay'];
            },
            set(val) {
                this.$store.commit('stepsValues/setDay', val);
            }
        }
    },
    methods: {
        beforeNext() {
            return new Promise((resolve, reject) => {
                if (!this.day) return reject('Выберите дату');

                if (this.day === this.$store.getters['getDay']) return resolve();

                this.$store.commit('setDay', this.day);
                resolve();
            });
        }
    }
}
</script>
