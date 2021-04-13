<template>
    <Step :name="4"
          title="Время"
          icon="mdi-clock-outline"
          :before-next="beforeNext">
        <div class="row q-col-gutter-md">
            <div class="col-3" v-for="(t, index) in times" :key="index">
                <q-btn :label="t.value" :color="time === t ? 'primary': 'green'" @click="time = t" class="full-width"/>
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
    data() {
        return {
            time: null
        }
    },
    computed: {
        times() {
            return this.$store.getters['getTimes'];
        }
    },
    methods: {
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
