import jwt_decode from "jwt-decode";
import { auth } from "./firebase";
import {
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

export default {
    logout(context) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");

        context.commit("setUser", {
            token: null,
            user: {}
        });
        context.commit("clearVuex");
    },
    async auth(context, payload) {
        const mode = payload.mode;
        let url = new URL(`api/login`, process.env.VUE_APP_URL);

        if (mode === "signup") {
            url = new URL(`api/register`, process.env.VUE_APP_URL);
        }
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: payload.user.email,
                        password: payload.user.password,
                        username: payload.user.username
                    })
                });
        } catch(error) {
            console.error(error);
            return "There was an error!";
        }

        const responseData = await response.json();
        if (!response.ok) {
            return responseData.message;
        }
        context.dispatch("setUserAndLoadData", { ...responseData, email: payload.user.email });
    },

    async signInWithGoogle() {
        var provider = new GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        let response = {};

        try {
            await signInWithPopup(auth, provider).then(function (result) {
                var user = result.user;
                response.google_token = user.accessToken;
                response.msg = "Success.";
            });
        } catch (error) {
            response.google_token = false;

            switch (error.code) {
                case "auth/user-not-found":
                    response.msg = "User not found";
                    break;
                case "auth/wrong-password":
                    response.msg = "Wrong password";
                    break;
                case "auth/popup-closed-by-user":
                    response.msg = "You closed the popup window.";
                    break;
                default:
                    response.msg = "Something went wrong";
            }
        }
        return response;
    },
    async firebaseBackendCall(context, google_token) {
        let url = new URL(`api/firebase`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({google_token})
                });
        } catch {
            return {
                message: "Something went wrong.",
                success: false
            };
        }
        const responseData = await response.json();
        if (!response.ok) {
            return {
                message: responseData.message,
                success: false
            };
        }

        context.dispatch("setUserAndLoadData", responseData);
        return {
            success: true,
            message: "ok"
        };
    },
    async setUserAndLoadData(context, payload) {
        localStorage.setItem("token", payload.token);
        localStorage.setItem("username", payload.user);
        localStorage.setItem("email", payload.email);
        context.commit("setUser", {
            user: {
                username: payload.user,
                email: payload.email
            },
            token: payload.token
        });
        // context.dispatch("loadAllSongs");
        context.commit("setLoader");
        while (!context.rootState.allSongsLoaded) {
            const res = await context.dispatch("loadPaginatedSongs");
            if (res === false) {
                context.dispatch("autoLogout");
                break;
            }
        }
        context.commit("removeLoader");
        context.dispatch("loadAllArtists");
        context.dispatch("loadMusicKeys");
        context.dispatch("loadPlaylists");
    },
    async tryLogin(context) {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        if (!token) return;

        const expiresIn = jwt_decode(token).exp;
        var ts = Math.round((new Date()).getTime() / 1000);
        if (expiresIn - ts < 0) {
            context.dispatch("autoLogout");
        } else {
            const user = { username, email };

            context.commit("setUser", {
                token: token,
                expiresIn,
                user
            });

            context.commit("activateSidebar");
            context.dispatch("loadPlaylists");
            context.commit("setLoader");
            while (!context.rootState.allSongsLoaded) {
                const res = await context.dispatch("loadPaginatedSongs");
                if (res === false) {
                    context.dispatch("autoLogout");
                    break;
                }
            }
            context.commit("removeLoader");
            context.dispatch("loadAllArtists");
            context.dispatch("loadMusicKeys");
        }
    },
    autoLogout(context) {
        context.dispatch("logout");
        context.commit("setAutoLogout");
    },

    async forgotPassword(_, email) {
        let url = new URL(`api/forgotpassword`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({ email })
                });

        } catch(error) {
            console.error(error);
            return "error";
        }
        if (!response.ok) {
            return false;
        } else {
            return true;
        }
    },

    async resetPassword(_, payload) {
        let url = new URL(`api/resetpassword/${payload.token}`, process.env.VUE_APP_URL);

        const expiresIn = jwt_decode(payload.token, { header: true }).exp;
        var ts = Math.round((new Date()).getTime() / 1000);

        if (expiresIn - ts < 0) {
            return "expired";
        }
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ new: payload.new, email: payload.email })
                });
            return "There was an error!";
        } catch(error) {
            console.error(error);
            return;
        }
        const responseData = await response.json();

        return responseData.message;
    }
    ,
    async contactMe(context, payload) {
        let access_token = context.getters.token;
        let url = new URL(`api/contactme`, process.env.VUE_APP_URL);

        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({
                        email: payload.email,
                        message: payload.message
                    })
                });

        } catch(error) {
            console.error(error);
            return false;
        }
        if (!response.ok) {
            return false;
        }
        return true;
    },

    async requestDeleteAccount(context, payload) {
        let url = new URL(`api/delete-acc-request`, process.env.VUE_APP_URL);
        let access_token = context.getters.token;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({ email: payload.email })
                });

        } catch {
            console.log("There was an error!");
            return "error";
        }
        if (!response.ok) {
            return false;
        } else {
            return true;
        }
    },

    async deleteAccount(context, payload) {
        let url = new URL(`api/delete-acc/${payload.token}`, process.env.VUE_APP_URL);
        let access_token = context.getters.token;

        const expiresIn = jwt_decode(payload.token, { header: true }).exp;
        let ts = Math.round((new Date()).getTime() / 1000);

        if (expiresIn - ts < 0) {
            return "expired";
        }
        let response;
        try {
            response = await fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({
                        email: payload.email,
                    })
                });

        } catch {
            return { success: false };
        }
        const responseData = await response.json();

        if (!response.ok) {
            return {
                message: responseData.message,
                success: false
            };
        }
        return {
            success: true,
            message: "ok"
        };
    },


};