<template>
    <Step :name="5"
          title="Личные данные"
          icon="mdi-account"
          :before-next="beforeNext">
        <div>Шаг 5</div>
    </Step>
</template>

<script>
import Step from "components/steps/Step";

export default {
    name: "Step5",
    components: {
        Step
    },
    computed: {},
    methods: {
        beforeNext() {}
    }
}
</script>
