<template>
    <div>
        <q-form ref="from" @submit.prevent="searchPerson">
            <div class="row q-col-gutter-xl">
                <div class="col-6">
                    <q-input v-model="form.lastName" label="Фамилия" :rules="rules.lastName"/>
                </div>
                <div class="col-6">
                    <q-input v-model="form.firstName" label="Имя" :rules="rules.firstName"/>
                </div>
                <div class="col-6">
                    <q-input v-model="form.middleName" label="Отчество"/>
                </div>
                <div class="col-6">
                    <q-input label="Дата рождения" v-model="form.birthday" :rules="rules.birthday" mask="##.##.####">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form.birthday" mask="DD.MM.YYYY" :locale="calendarLocale" :first-day-of-week="1">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Закрыть" color="primary" flat/>
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
            </div>

            <div class="row">
                <q-btn type="submit" label="Искать" color="primary" :loading="loading"/>
            </div>
        </q-form>
    </div>
</template>

<script>
import {calendar} from 'src/helpers/locale';

export default {
    name: "Search",
    data() {
        return {
            loading: false,
            calendarLocale: calendar,
            form: {
                lastName: '',
                firstName: '',
                middleName: '',
                birthday: ''
            },
            rules: {
                lastName: [
                    v => !!v || 'Введите фамилию'
                ],
                firstName: [
                    v => !!v || 'Введите имя'
                ],
                birthday: [
                    v => /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(v) || 'Введите корректную дату'
                ]

            }
        }
    },
    methods: {
        searchPerson() {
            if (this.loading) return;

            this.loading = true;

            this.$api({
                url: '/requests/search',
                method: 'get',
                params: this.form
            }).then(response => {
                this.$q.dialog({
                    title: 'Найдена запись',
                    message: response.data,
                    persistent: true
                });
            }).catch(error => {
                this.$q.notify({
                    message: error.response.data,
                    type: 'negative',
                    position: 'top'
                })
            }).finally(() => {
                this.loading = false;
            });
        }
    }
}
</script>
