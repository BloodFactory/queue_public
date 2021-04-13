<template>
    <q-stepper v-model="step"
               vertical
               color="primary"
               animated
               style="width: 100%"
               flat>
        <Step1/>
        <Step2/>
        <Step3/>
        <Step4/>
        <Step5/>
        <Step6/>
    </q-stepper>
</template>

<script>
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";

export default {
    name: "Registration",
    components: {
        Step1,
        Step2,
        Step3,
        Step4,
        Step5,
        Step6
    },
    computed: {
        step() {
            return this.$store.getters['getStep'];
        }
    },
}
</script>
