<template>
  <div class="form-wrapper">
    <div class="form-header">
      <ul class="tab-group">
        <li
          class="tab"
          :class="{ active: showLogin }"
          @click.prevent="openLoginForm"
        >
          <a href="">Log In</a>
        </li>
        <li
          class="tab"
          :class="{ active: !showLogin && !showReset }"
          @click.prevent="openRegisterForm"
        >
          <a href="">Sign Up</a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <transition name="fade" tag="section" mode="out-in">
        <!-- login -->
        <div v-if="showLogin" id="login" key="login">
          <login-form
            :request-is-loading="reqIsLoading"
            @open-reset-form="openResetForm"
            @is-loading="setRequestLoading"
          ></login-form>
        </div>
        <!-- reset -->
        <div v-else-if="showReset" id="reset" key="reset">
          <forgot-form
            :request-is-loading="reqIsLoading"
            @open-login="openLoginForm"
            @is-loading="setRequestLoading"
          ></forgot-form>
        </div>
        <!-- ="signup" -->
        <div v-else id="signup" key="signup">
          <register-form
            :request-is-loading="reqIsLoading"
            @is-loading="setRequestLoading"
          ></register-form>
        </div>
      </transition>
      <div v-if="reqIsLoading" class="loader">
        <the-loader />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from "vue";
const ForgotForm = defineAsyncComponent(() => import('./ForgotForm.vue'));
const LoginForm = defineAsyncComponent(() => import('./LoginForm.vue'));
const RegisterForm = defineAsyncComponent(() => import('./RegisterForm.vue'));

export default {
  components: {
    ForgotForm,
    LoginForm,
    RegisterForm,
  },
  setup() {
    const showLogin = ref(true);
    const showReset = ref(false);
    const reqIsLoading = ref(false);

    function openRegisterForm() {
      showReset.value = false;
      showLogin.value = false;
    }
    function openLoginForm() {
      showLogin.value = true;
      showReset.value = false;
    }
    function openResetForm() {
      showLogin.value = false;
      showReset.value = true;
    }
    function setRequestLoading(data) {
      reqIsLoading.value = data;
    }

    return {
      showLogin,
      showReset,
      setRequestLoading,
      openResetForm,
      openLoginForm,
      openRegisterForm,
      reqIsLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";
@import "@/assets/styles/colors.scss";
@import "@/assets/styles/auth.scss";

.form-wrapper {
  @include form-wrapper;
  .form-header {
    background: $dark_blue_sidebar;
    border-radius: 8px 8px 0 0;
    padding: 10px 17px;

    .tab-group {
      list-style: none;
      margin: 20px 5px;
      &:after {
        content: "";
        display: table;
        clear: both;
      }
      li a {
        display: block;
        text-decoration: none;
        padding: 15px;
        background: rgba(160, 179, 176, 0.25);

        color: $white;
        float: left;
        width: 50%;
        text-align: center;
        cursor: pointer;
        -webkit-transition: 0.3s ease;
        transition: 0.3s ease;
        &:hover {
          background: #b62730;
        }
      }
      .active a {
        background: $burgundy;
      }
    }
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

/* loader */
.tab-content {
  position: relative;
}

.loader {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50%;
}
</style>