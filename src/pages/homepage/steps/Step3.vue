<template>
    <Step :name="3"
          title="День"
          icon="mdi-calendar"
          :before-next="beforeNext">
        <div class="row">
            <div class="col-3" v-for="(date, index) in days" :key="index">
                <q-btn :label="date.date" :color="day === date ? 'primary': 'green'" @click="day = date"/>
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
    data() {
        return {
            day: null
        }
    },
    computed: {
        days() {
            return this.$store.getters['getDays'];
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
