export default {
   setAutoLogout(state) {
      state.didAutoLogout = true;
   },
   setUser(state, payload) {
      state.user = payload.user;
      state.token=payload.token;
   },
   logoutUserState(state) {
      state.user = {};
   },
   setCookieConsent(state, payload) {
       state.cookieConsent = payload;
       localStorage.setItem('cookieConsent', payload);
   },
};