<template>
    <Step :name="4"
          title="Время"
          icon="mdi-clock-outline"
          :before-next="beforeNext">
        <div>Шаг 4</div>
    </Step>
</template>

<script>
import Step from "components/steps/Step";

export default {
    name: "Step4",
    components: {
        Step
    },
    computed: {},
    methods: {
        beforeNext() {}
    }
}
</script>
