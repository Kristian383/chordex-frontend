<template>
  <div id="contact-me" class="contact">
    <h2>Contact me</h2>
    <form>
      <div class="form-group">
        <label for="email">Email address <span style="color: var(--burgundy);">*</span></label>
        <input
          id="email"
          v-model.trim="email.val"
          type="email"
          name="email"
          required
          class="form-element"
          placeholder="user@gmail.com"
          :class="{ 'error-msg': !email.isValid }"
          @focus="clearValidity('email')"
        />
      </div>
      <div class="form-group full">
        <label for="message">Message:</label>
        <textarea
          id="message"
          v-model.trim="message.val"
          name="message"
          class="form-element"
          placeholder="Write me"
          rows="10"
          :class="{ 'error-msg': !message.isValid }"
          @focus="clearValidity('message')"
        ></textarea>
        <p class="error-text" :class="{ valid: goodRequest }">{{ infoMsg }}</p>
      </div>
      <!--  -->
      <div class="contact-me-recaptcha-container">
        <re-captcha class="contact-me-recaptcha" @recaptcha-check="setReCaptchaValidity" />
      </div>
      <!--  -->
      <button :disabled="isSending" class="btn send-btn" @click.prevent="submitForm">
        Send
      </button>
      <div class="loader">
        <the-loader v-if="isSending" />
      </div>
    </form>
  </div>
</template>

<script>
import ReCaptcha from "./ReCaptcha.vue";

export default {
  components: {
    ReCaptcha,
  },
  data() {
    return {
      email: {
        val: "",
        isValid: true,
      },
      message: {
        val: "",
        isValid: true,
      },
      infoMsg: "",
      isSending: false,
      goodRequest: false,
      recaptchaIsValid: false,
    };
  },
  methods: {
    setReCaptchaValidity(validity) {
      this.recaptchaIsValid = validity;
    },
    async submitForm() {
      this.goodRequest = false;
      //
      if (!this.email.val.includes("@") || !this.recaptchaIsValid) {
        this.infoMsg = "Please insert valid email and check recaptcha.";
        this.email.isValid = false;
        return;
      } else if (this.message.val.length > 900) {
        this.infoMsg = "Please insert shorter (900) message.";
        this.message.isValid = false;

        return;
      } else if (!this.message.val) {
        this.infoMsg = "Please insert message.";
        this.message.isValid = false;
        return;
      } else if (this.message.val.length < 30) {
        this.infoMsg =
          "Please insert more than 30 characters. You have: " +
          this.message.val.length;
        this.message.isValid = false;
        return;
      } else {
        //dispatch form data
        this.isSending = true;
        this.infoMsg = "Sending...";
        this.$store
          .dispatch("contactMe", {
            email: this.email.val,
            message: this.message.val,
          })
          .then((res) => {
            this.isSending = false;
            if (res) {
              this.infoMsg = "Your message has been sent.";
              this.email.val = "";
              this.message.val = "";
              this.goodRequest = true;
            } else {
              this.infoMsg = "Something went wrong.";
            }
          });
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  max-width: 1280px;
  width: 100%;
  position: relative;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px 0, rgba(0, 0, 0, 0.1) 0 0 1px 0;
  padding: 1rem 1rem 3rem;

  h2 {
    margin-bottom: 1rem;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;

    .contact-me-recaptcha-container {
      height: 78px;
      position: relative;
    }
  }

  .contact-me-recaptcha {
    top: 0;
  }
}
.contact form .form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--font_black);
}
.contact form .form-group .form-element {
  outline: none;
  border: none;
  display: block;
  width: 100%;
  border-radius: 4px;
  padding: 12px 16px;
  background-color: var(--form_gray);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  font-size: inherit;
}
.form-group .form-element:focus {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color: #fff;
}
.contact form .form-group textarea {
  resize: none;
  min-height: 100px;
  font-size: inherit;
}

.btn {
  background: var(--dark_gray_font);
  border-radius: 4px;
  max-width: 304px;
  width: 100%;
  padding: 10px 20px;
  border: none;
  color: var(--white);
  font-size: inherit;
  align-self: center;
  justify-self: center;
  transition: 0.5s ease;
}
.btn:hover {
  background: #59e4a8;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.loader {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10%;
}

.error-text {
  color: var(--burgundy);
  font-size: 14px;
  /* margin-bottom: 32px; */
}

.error-text.valid {
  color: var(--green);
}
</style>