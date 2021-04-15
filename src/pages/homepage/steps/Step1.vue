<template>
    <Step :name="1"
          :title="title"
          icon="mdi-office-building"
          :before-next="beforeNext">
        <q-select label="Организация"
                  :options="organizations"
                  v-model="organization">
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
    name: "Step1",
    components: {
        Step
    },
    computed: {
        title() {
            const org = this.$store.getters['registration/getOrganization'];
            return 'Организация' + (org ? ': ' + (org.label) : '');
        },
        organizations() {
            return this.$store.getters['getOrganizations'];
        },
        organization: {
            get() {
                return this.$store.getters['stepsValues/getOrganization'];
            },
            set(val) {
                this.$store.commit('stepsValues/setOrganization', val);
            }
        }
    },
    methods: {
        beforeNext() {
            return new Promise((resolve, reject) => {
                if (!this.organization) return reject('Выберите организацию');

                if (this.organization === this.$store.getters['getOrganization']) return resolve();

                this.$store.commit('setOrganization', this.organization);

                return resolve();
            });
        }
    }
}
</script>
