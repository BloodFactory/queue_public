<template>
    <Step :name="6"
          title="Подтверждение и запись"
          icon="mdi-checkbox-marked-circle-outline"
          :before-next="beforeNext">
        <div>Шаг 5</div>
    </Step>
</template>

<script>
import Step from "components/steps/Step";

export default {
    name: "Step6",
    components: {
        Step
    },
    computed: {},
    methods: {
        beforeNext() {}
    }
}
</script>
