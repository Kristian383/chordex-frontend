import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

export default {
    state() {
        return {
            user: {},
            token: null,
            didAutoLogout: false,
            cookieConsent: null,
        };
    },
    getters,
    actions,
    mutations
};