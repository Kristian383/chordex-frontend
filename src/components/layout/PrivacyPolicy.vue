<template>
  <div class="privacy-policy-popup">
    <p>
      We use cookies to improve your experience. By using our website, you agree to our 
      <router-link style="color:#fff" to="privacy-policy">privacy policy</router-link>.
    </p>
    <button @click="acceptCookies">Accept</button>
    <button @click="declineCookies">Decline</button>
  </div>
</template>
  
  <script>
import { useStore } from 'vuex';
  
export default {
  setup() {
    const store = useStore();

    const acceptCookies = () => {
      store.commit('setCookieConsent', 'accepted');
    };
  
    const declineCookies = () => {
      store.commit('setCookieConsent', 'declined');
    };
  
    return {
      acceptCookies,
      declineCookies,
    };
  },
};
  </script>
  
  <style scoped>
  .privacy-policy-popup {
    position: fixed;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;

    z-index: 999;
  }
  
  button {
    margin: 10px;
    padding: 10px 20px;
    background-color: var(--burgundy);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background: #b62730;
    }
  </style>
  