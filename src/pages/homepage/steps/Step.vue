<template>
    <q-step :name="name"
            :title="title"
            :icon="icon"
            :done="done">
        <slot/>

        <q-stepper-navigation>
            <slot name="navigation">
                <q-btn :loading="loading" @click="next" color="primary" label="Продолжить"/>
                <q-btn :loading="loading" v-if="name > 1" @click="prev" color="primary" label="Назад" class="q-ml-sm" flat/>
            </slot>
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
            type: Function
        }
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        step() {
            return this.$store.getters['getStep'];
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
                this.$store.commit('setStep', this.step + 1);
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
            this.$store.commit('setStep', this.step - 1);
        }
    }
}
</script>
