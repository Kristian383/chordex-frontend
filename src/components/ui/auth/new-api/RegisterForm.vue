<template>
  <form>
    <div class="form-container">
      <h3>Sign Up</h3>
      <div class="input-group">
        <span><font-awesome-icon icon="user-alt"></font-awesome-icon></span>
        <input
          v-model.trim="userName"
          type="text"
          class="form-control"
          placeholder="User Name"
          required
          :class="{ 'error-msg': !formIsValid }"
          @focus="clearValidity"
        />
      </div>

      <div class="input-group">
        <span><font-awesome-icon icon="envelope"></font-awesome-icon></span>
        <input
          v-model.trim="userEmail"
          type="email"
          class="form-control"
          placeholder="Email Address"
          required
          :class="{ 'error-msg': !formIsValid }"
          @focus="clearValidity"
        />
      </div>

      <div class="input-group">
        <span
          class="icon"
        ><font-awesome-icon
          :icon="lockType"
          @click="togglePassword"
        ></font-awesome-icon></span>
        <input
          v-model.trim="userPassword"
          :type="pswdType"
          class="form-control"
          placeholder="Set Password"
          required
          :class="{ 'error-msg': !formIsValid }"
          @focus="clearValidity"
        />
      </div>
      <p v-if="errorText" class="feedback-text" :class="{ valid: goodRequest }">
        {{ errorText }}
      </p>
      <re-captcha @recaptcha-check="setReCaptchaValidity"></re-captcha>
    </div>
    <div class="form-footer">
      <button :disabled="isLoading" class="btn" @click.prevent="submitForm">
        Sign Up
      </button>
    </div>
  </form>
</template>

<script>
import { ref, computed, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ReCaptcha from "./../ReCaptcha.vue";

export default {
  components: {
    ReCaptcha,
  },
  props: ["requestIsLoading"],
  setup(props, { emit }) {
    const userEmail = ref("");
    const userName = ref("");
    const userPassword = ref("");
    const errorText = ref("");
    const goodRequest = ref(false);
    const formIsValid = ref(true);
    const recaptchaIsValid = ref(false);

    const { requestIsLoading } = toRefs(props);

    const isLoading = computed(() => {
      return requestIsLoading.value;
    });

    function clearValidity() {
      formIsValid.value = true;
    }

    function setReCaptchaValidity(validity) {
      recaptchaIsValid.value = validity;
    }

    const store = useStore();
    const router = useRouter();

    function submitForm() {
      formIsValid.value = true;
      errorText.value = "";
      goodRequest.value = false;
      emit("isLoading", true);

      if (
        !userEmail.value ||
        !userName.value ||
        !userPassword.value ||
        !userEmail.value.includes("@") ||
        !recaptchaIsValid.value
      ) {
        formIsValid.value = false;
        emit("isLoading", false);
        errorText.value = "Please check your input and recaptcha.";
        return;
      }

      if (userName.value.length < 3) {
        formIsValid.value = false;
        emit("isLoading", false);
        errorText.value = "Username must have atleast 3 characters.";
        return;
      }
      if (userPassword.value.length < 6) {
        formIsValid.value = false;
        emit("isLoading", false);
        errorText.value = "Password must have atleast 6 characters.";
        return;
      }

      const payload = {
        user: {
          email: userEmail.value,
          password: userPassword.value,
          username: userName.value,
        },
        mode: "signup",
      };

      store.dispatch("auth", payload).then((res) => {
        if (store.getters.token) {
          router.push("/songs");
          store.commit("activateSidebar");
          errorText.value = "Successfully registered.";
          goodRequest.value = true;
        } else {
          userName.value = "";
          userEmail.value = "";
          errorText.value = res;
        }
        emit("isLoading", false);
      });
    }

    const showPswd = ref(false);

    function togglePassword() {
      showPswd.value = !showPswd.value;
    }

    const lockType = computed(() => {
      return showPswd.value ? "lock-open" : "lock";
    });

    const pswdType = computed(() => {
      return showPswd.value ? "text" : "password";
    });

    return {
      userEmail,
      userName,
      userPassword,
      errorText,
      goodRequest,
      formIsValid,
      clearValidity,
      isLoading,
      submitForm,
      lockType,
      togglePassword,
      pswdType,
      setReCaptchaValidity,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";
@import "@/assets/styles/colors.scss";
@import "@/assets/styles/auth.scss";

.form-container {
  background: #fefefe;
  padding: 1.5625rem 1.875rem 5.625rem;
  position: relative;


  .input-group {
    @include input-group;
  }
  .feedback-text {
    @include feedback-text;
  }
  .feedback-text.valid {
    color: $green;
  }
}

.form-footer {
  @include form-footer;
}
</style>