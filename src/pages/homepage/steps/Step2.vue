<template>
    <Step :name="2"
          title="Услуга"
          icon="mdi-room-service"
          :before-next="beforeNext">
        <q-select label="Услуга"
                  :options="services"
                  v-model="service">
            <template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
                <q-item v-bind="itemProps"
                        v-on="itemEvents"
                        :class="opt.disable && 'bg-red-3 text-black'">
                    <q-item-section>
                        <q-item-label>{{ opt.label }}</q-item-label>
                    </q-item-section>

                    <q-tooltip v-if="opt.disable">
                        Отсутствуют вакантным места
                    </q-tooltip>
                </q-item>
            </template>
        </q-select>
    </Step>
</template>

<script>
import Step from "./Step";

export default {
    name: "Step2",
    components: {
        Step
    },
    computed: {
        services() {
            return this.$store.getters['getServices'];
        },
        service: {
            get() {
                return this.$store.getters['stepsValues/getService'];
            },
            set(val) {
                this.$store.commit('stepsValues/setService', val);
            }
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
