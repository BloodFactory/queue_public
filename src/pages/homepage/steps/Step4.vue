<template>
    <Step :name="4"
          title="Время"
          icon="mdi-clock-outline"
          :before-next="beforeNext">
        <div class="row q-col-gutter-md">
            <div class="col-1" v-for="(_time, index) in times" :key="index">
                <q-btn :label="_time.value" :color="!_time.free ? 'red' : (time === _time ? 'primary' : 'green')" @click="time = _time" class="full-width" :disable="!_time.free"/>
            </div>
        </div>
    </Step>
</template>

<script>
import Step from "./Step";

export default {
    name: "Step4",
    components: {
        Step
    },
    computed: {
        times() {
            return this.$store.getters['getTimes'];
        },
        time: {
            get() {
                return this.$store.getters['stepsValues/getTime'];
            },
            set(val) {
                this.$store.commit('stepsValues/setTime', val);
            }
        }
    },
    methods: {
        color(time) {
            if (!time.free) return 'red';

            return this.time === time ? 'primary' : 'green';
        },
        setTime(time) {
            this.time = time;
        },
        beforeNext() {
            return new Promise((resolve, reject) => {
                if (!this.time) return reject('Выберите время');

                this.$store.commit('setTime', this.time);

                resolve();
            });
        }
    }
}
</script>
