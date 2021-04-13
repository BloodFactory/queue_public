<template>
    <div id="q-app">
        <LoadingApp v-if="loading"/>
        <router-view v-else/>
    </div>
</template>
<script>
import LoadingApp from "components/LoadingApp";

export default {
    name: 'App',
    components: {
        LoadingApp
    },
    data() {
        return {
            loading: true
        }
    },
    mounted() {
        this.$store.dispatch('fetchOpenApplications').then(() => {
            this.loading = false;
        });
    }
}
</script>
