<template>
    <Step :name="5"
          title="Личные данные"
          icon="mdi-account">
        <q-form ref="form" id="personalDataForm" @submit.prevent="next">
            <div class="row q-col-gutter-xl">
                <div class="col-6">
                    <q-input label="Фамилия" v-model="lastName" :rules="rules.lastName"/>
                </div>
                <div class="col-6">
                    <q-input label="Имя" v-model="firstName" :rules="rules.firstName"/>
                </div>
                <div class="col-6">
                    <q-input label="Отчество" v-model="middleName"/>
                </div>
                <div class="col-6">
                    <q-input label="Дата рождения" v-model="birthday" :rules="rules.birthday"/>
                </div>
                <div class="col-6">
                    <q-input label="Электроная почта" v-model="email" :rules="rules.email"/>
                </div>
                <div class="col-6">
                    <q-input label="Контактный телефон" v-model="phone" :rules="rules.phone" mask="+7 (###) ###-##-##"/>
                </div>
            </div>
        </q-form>

        <template v-slot:navigation>
            <q-btn type="submit" form="personalDataForm" color="primary" label="Продолжить"/>
            <q-btn @click="prev" color="primary" label="Назад" class="q-ml-sm" flat/>
        </template>
    </Step>
</template>

<script>
import Step from "./Step";

export default {
    name: "Step5",
    components: {
        Step
    },
    data() {
        return {
            rules: {
                lastName: [
                    v => !!v || 'Введите фамилию'
                ],
                firstName: [
                    v => !!v || 'Введите имя'
                ],
                birthday: [
                    v => /^[0-3]\d\.[0-1]\d\.[\d]+$/.test(v) || 'Введите корректную дату'
                ],
                email: [
                    v => this.email.length > 0 || this.phone.length > 0 || 'Укажите контактный телефон или электроную почту',
                    v => !v || /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(v) || 'Некорректный адрес элекьтронной почты'
                ],
                phone: [
                    v => this.email.length > 0 || this.phone.length > 0 || 'Укажите контактный телефон или электроную почту',
                    v => !v || /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(v) || 'Некорректный номер телефона'
                ]
            }
        }
    },
    computed: {
        step() {
            return this.$store.getters['getStep'];
        },
        lastName: {
            get() {
                return this.$store.getters['stepsValues/getPersonLastName'];
            },
            set(val) {
                this.$store.commit('stepsValues/setPersonLastName', val);
            }
        },
        firstName: {
            get() {
                return this.$store.getters['stepsValues/getPersonFirstName'];
            },
            set(val) {
                this.$store.commit('stepsValues/setPersonFirstName', val);
            }
        },
        middleName: {
            get() {
                return this.$store.getters['stepsValues/getPersonMiddleName'];
            },
            set(val) {
                this.$store.commit('stepsValues/setPersonMiddleName', val);
            }
        },
        birthday: {
            get() {
                return this.$store.getters['stepsValues/getPersonBirthday'];
            },
            set(val) {
                this.$store.commit('stepsValues/setPersonBirthday', val);
            }
        },
        phone: {
            get() {
                return this.$store.getters['stepsValues/getPersonPhone'];
            },
            set(val) {
                this.$store.commit('stepsValues/setPersonPhone', val);
            }
        },
        email: {
            get() {
                return this.$store.getters['stepsValues/getPersonEmail'];
            },
            set(val) {
                this.$store.commit('stepsValues/setPersonEmail', val);
            }
        }
    },
    methods: {
        next() {
            if (this.$refs.form.validate()) {
                let person = {};
                Object.assign(person, {
                    lastName: this.lastName,
                    firstName: this.firstName,
                    middleName: this.middleName,
                    birthday: this.birthday,
                    phone: this.phone,
                    email: this.email
                });
                this.$store.commit('setPerson', person);

                this.$store.commit('setStep', this.step + 1);
            }
        },
        prev() {
            this.$store.commit('setStep', this.step - 1);
        }
    }
}
</script>
