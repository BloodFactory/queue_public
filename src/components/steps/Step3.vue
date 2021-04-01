<template>
    <Step :name="3"
          title="День"
          icon="mdi-calendar"
          :before-next="beforeNext">
        <div>Шаг 3</div>
    </Step>
</template>

<script>
import Step from "components/steps/Step";

export default {
    name: "Step3",
    components: {
        Step
    },
    computed: {},
    methods: {
        beforeNext() {}
    }
}
</script>
