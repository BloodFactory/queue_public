<template>
    <q-step :name="name"
            :title="title"
            :icon="icon"
            :done="done">
        <slot/>

        <q-stepper-navigation>
            <q-btn :loading="loading" @click="next" color="primary" label="Продолжить"/>
            <q-btn :loading="loading" v-if="name > 1" @click="prev" color="primary" label="Назад" class="q-ml-sm" flat/>
        </q-stepper-navigation>
    </q-step>
</template>

<script>
export default {
    name: "Step",
    props: {
        name: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        beforeNext: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        step() {
            return this.$store.getters['registration/getStep'];
        },
        done() {
            return this.step > this.name;
        }
    },
    methods: {
        next() {
            if (this.loading) return;

            this.loading = true;

            this.beforeNext().then(() => {
                this.$store.commit('registration/setStep', this.step + 1);
            }).catch(error => {
                this.$q.notify({
                    message: error,
                    type: 'negative',
                    position: 'top'
                })
            }).finally(() => {
                this.loading = false;
            });
        },
        prev() {
            this.$store.commit('registration/setStep', this.step - 1);
        }
    }
}
</script>
