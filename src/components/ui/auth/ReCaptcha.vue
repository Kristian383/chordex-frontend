<template>
  <VueRecaptcha
    :sitekey="siteKey"
    :load-recaptcha-script="true"
    class="captcha-container"
    @verify="handleSuccess"
    @error="handleError"
  ></VueRecaptcha>
</template>

<script >
import { computed } from "vue";
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "ReCaptcha",
  components: {
    VueRecaptcha,
  },
  emits: ["recaptchaCheck"],
  setup(_, { emit }) {
    const siteKey = computed(() => {
      return process.env.VUE_APP_RECAPTCHA;
    });

    const handleError = () => {
      // Do some validation
      emit("recaptchaCheck", false);
    };

    const handleSuccess = () => {
      // Do some validation
      emit("recaptchaCheck", true);
    };

    return {
      handleSuccess,
      handleError,
      siteKey,
    };
  },
};
</script>

<style lang="scss" scoped>
.captcha-container {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  bottom: 0.625rem;
  transform: translateX(-50%);
}
</style>

