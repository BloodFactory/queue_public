<template>
    <Step :name="6"
          title="Подтверждение и запись"
          icon="mdi-checkbox-marked-circle-outline">
        <div class="row">
            <div class="col">
                <div class="text-h6 q-mb-md">Запись на приём</div>
                <div class="param">
                    <b>Организация:</b> <span class="text-grey-8">{{ organization && organization.label }}</span>
                </div>
                <div class="param">
                    <b>Услуга:</b> <span class="text-grey-8">{{ service && service.label }}</span>
                </div>
                <div class="param">
                    <b>День:</b> <span class="text-grey-8">{{ day && day.value }}</span>
                </div>
                <div class="param">
                    <b>Время:</b> <span class="text-grey-8">{{ time && time.value }}</span>
                </div>
            </div>
            <div class="col">
                <div class="text-h6 q-mb-md">Персональные данные</div>
                <div class="param">
                    <b>Фамилия:</b> <span class="text-grey-8">{{ person.lastName }}</span>
                </div>
                <div class="param">
                    <b>Имя:</b> <span class="text-grey-8">{{ person.firstName }}</span>
                </div>
                <div class="param">
                    <b>Отчество:</b> <span class="text-grey-8">{{ person.middleName ? person.middleName : 'Не указано' }}</span>
                </div>
                <div class="param">
                    <b>Дата рождения:</b> <span class="text-grey-8">{{ person.birthday }}</span>
                </div>
                <div class="param">
                    <b>Телефон:</b> <span class="text-grey-8">{{ person.phone ? person.phone : 'Не указано' }}</span>
                </div>
                <div class="param">
                    <b>e-mail:</b> <span class="text-grey-8">{{ person.email ? person.email : 'Не указано' }}</span>
                </div>
            </div>
        </div>

        <template v-slot:navigation>
            <q-btn :loading="loading" @click="submit" color="green" label="Записаться"/>
            <q-btn :loading="loading" @click="prev" color="primary" label="Назад" class="q-ml-sm" flat/>
        </template>

    </Step>
</template>

<script>
import Step from "pages/homepage/steps/Step";

export default {
    name: "Step6",
    components: {
        Step
    },
    data() {
        return {
            loading: false
        }
    },
    computed: {
        person() {
            return this.$store.getters['registration/getPerson'];
        },
        organization() {
            return this.$store.getters['registration/getOrganization'];
        },
        service() {
            return this.$store.getters['registration/getService'];
        },
        day() {
            return this.$store.getters['registration/getDay'];
        },
        time() {
            return this.$store.getters['registration/getTime'];
        },
        step() {
            return this.$store.getters['registration/getStep'];
        },
    },
    methods: {
        submit() {
            const data = {
                lastName: this.person.lastName,
                firstName: this.person.firstName,
                birthday: this.person.birthday,
                email: this.person.email,
                phone: this.person.phone,
                service: this.service.value,
                date: this.day.value,
                time: this.time.value
            };

            this.$api({
                url: '/requests/registrate',
                method: 'post',
                data: data
            });
        },
        prev() {
            this.$store.commit('registration/setStep', this.step - 1);
        }
    }
}
</script>

<style lang="scss" scoped>
.param {
    b {
        display: inline-block;
        width: 110px;
        text-align: right;
        margin-right: 5px;
    }
}
</style>
