<template>
    <q-page class="flex flex-center">
        <q-card style="width: 800px;">
            <q-tabs v-model="tab"
                    active-color="primary"
                    indicator-color="primary"
                    align="justify"
                    dense
                    narrow-indicator>
                <q-tab name="registration" label="Регистрация"/>
                <q-tab name="search" label="Поиск"/>
            </q-tabs>

            <q-separator/>

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="registration">
                    <Registration/>
                </q-tab-panel>

                <q-tab-panel name="search">
                    <Search/>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>

    </q-page>
</template>

<script>
export default {
    name: 'PageIndex',
    components: {
        Registration: () => import('./Registration'),
        Search: () => import('./Search')
    },
    data() {
        return {
            tab: 'registration'
        }
    }
}
</script>
