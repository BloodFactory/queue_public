<template>
    <Step :name="1"
          :title="title"
          icon="mdi-office-building"
          :before-next="beforeNext">
        <q-select label="Организация"
                  :options="organizations"
                  v-model="organization"/>
    </Step>
</template>

<script>
import Step from "components/steps/Step";

export default {
    name: "Step1",
    components: {
        Step
    },
    data() {
        return {
            organization: null
        }
    },
    computed: {
        title() {
            const org = this.$store.getters['registration/getOrganization'];
            return 'Организация' + (org ? ': ' + (org.label) : '');
        },
        organizations() {
            return this.$store.getters['step1/getOrganizations'];
        }
    },
    methods: {
        beforeNext() {
            return new Promise((resolve, reject) => {
                if (!this.organization) return reject('Выберите организацию');

                if (this.organization === this.$store.getters['registration/getOrganization']) return resolve();

                this.$store.dispatch('step2/fetchServices', this.organization.value).then(() => {
                    this.$store.commit('registration/setOrganization', this.organization);
                    resolve()
                }).catch(() => {
                    reject('Неудалось выполнить запрос');
                });
            });
        }
    }
}
</script>
