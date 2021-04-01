<template>

</template>

<script>
import {QSpinnerGears as Spinner} from 'quasar'

export default {
    name: "LoadingApp",
    beforeMount() {
        this.$q.loading.show({
            spinner: Spinner,
            message: 'Загрузка приложения',
            backgroundColor: 'white',
            messageColor: 'black',
            spinnerColor: 'black'
        })
    },
    destroyed() {
        this.$q.loading.hide();
    }
}
</script>
