export default {

    async loadAllSongs(context) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `${process.env.VUE_APP_URL}songs/${username}`;

        context.commit("setLoader")
        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },

                });
        } catch {
            // console.log("There was an error!");
            context.commit("removeLoader")
            return "There was an error!"
        }
        const responseData = await response.json();

        if (!response.ok) {
            // window.alert(responseData.message || 'Failed to load more songs.');
            context.commit("removeLoader")
            return false
        }

        context.commit("setAllSongs", responseData.songs)
        context.commit("removeLoader")

    },
    async addNewSong(context, payload) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `${process.env.VUE_APP_URL}song/${username}`;
        const body = {
            username,
            ...payload
        }
        let methodType = "POST";
        if (payload.songId) {
            methodType = "PUT"
        }
        let lastViewed = new Date().toLocaleString();
        body.lastViewed = lastViewed;

        let response;
        try {
            response = await fetch(url,
                {
                    method: methodType,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify(
                        body
                    )
                });
        } catch {
            return false
        }
        const responseData = await response.json();
        if (!response.ok) {
            //  window.alert( 'Failed to add song.');
            return false
        } else {
            if (payload.songId) {
                context.commit("updateSong", payload)
            } else {
                const resp_payload = responseData.song;
                resp_payload.artist = responseData.artist.name
                context.commit("insertSong", resp_payload)
            }
        }
        // return true
        return responseData.song.songId
    },
    async deleteSong(context, payload) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `${process.env.VUE_APP_URL}song/${username}`;
        const body = {
            "songName": payload.songName,
            username,
            "artist": payload.artist
        }
        //console.log("delete body", body);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify(
                        body
                    )
                });
        } catch {
            return
        }
        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to delete song.');
            return
        }
        context.commit("deleteSong", payload.songId)
    },
    //
    //
    async loadMusicKeys(context) {
        let url = `${process.env.VUE_APP_URL}keys`;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
        } catch {
            return
        }
        const responseData = await response.json();

        if (!response.ok) {
            // window.alert(responseData.message || 'Failed to load more songs.');
            return
        }
        context.commit("storeMusicKeys", responseData.musicKeys)
    },

    //ARTISTS
    async loadAllArtists(context) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `${process.env.VUE_APP_URL}artists/${username}`;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                });
        } catch {
            return
        }
        const responseData = await response.json();

        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load more artists.');
            return
        }
        context.commit("setAllArtists", responseData.artists)
    },

    //NOTES 
    async loadUsersNotes(context) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `${process.env.VUE_APP_URL}notes/${username}`;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },

                });
        } catch {
            return;
        }
        const responseData = await response.json();
        //console.log("userNotes", responseData);
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load user notes.');
            return
        }
        context.commit("updateUserNotes", responseData.notes)
        context.commit("updateTxtAreaHeight", responseData.txtAreaHeight)

    },
    async updateUsersNotes(context, payload) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `${process.env.VUE_APP_URL}notes/${username}`;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify(
                        payload
                    )

                });
        } catch {
            return;
        }
        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to update user notes.');
            return
        }
        context.commit("updateUserNotes", responseData.notes)
        context.commit("updateTxtAreaHeight", responseData.txtAreaHeight)

    },
    //websites
    async addUserWebsite(context, payload) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `${process.env.VUE_APP_URL}website/${username}`;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify(
                        payload
                    )
                });
        } catch {
            return
        }
        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to add user website.');
            return
        }
        context.commit("addUserWebsite", payload)
    },
    async deleteUserWebsite(context, name) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `${process.env.VUE_APP_URL}website/${username}`;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify(
                        { name }
                    )

                });
        } catch {
            console.log("There was an error!");
            return
        }
        const responseData = await response.json();
        // console.log("deleteUserWebsite", responseData);
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to add user website.');
            return
        }
        context.commit("deleteUserWebsite", name)
    },
    async loadUserWebsites(context) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `${process.env.VUE_APP_URL}websites/${username}`;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },

                });
        } catch {
            console.log("There was an error!");
            return
        }
        const responseData = await response.json();
        if (!response.ok) {
            return
        }
        context.commit("setUserWebsites", responseData.websites)
    },

    //SPOTIFY API
    async apiForSongInfo(_, payload) {
        let url = `${process.env.VUE_APP_URL}spotifyacess`;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        payload
                    )
                });

        } catch {
            console.log("There was an error!");
            return false
        }
        const responseData = await response.json();
        if (!response.ok) {
            return false
        }
        // console.log(responseData);
        return responseData

    },
}