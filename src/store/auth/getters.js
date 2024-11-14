
export default {
  token(state) {
    return state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },
  user(state) {
    return state.user;
  },
  checkCookieConsent(state) {
    return state.cookieConsent || localStorage.getItem("cookieConsent");
  },
};