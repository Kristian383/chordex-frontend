export default {
    // async loadAllSongs(context) {
    //     const user_email = context.getters.user.email;
    //     const access_token = context.getters.token;
    //     const url = new URL(`api/songs/${user_email}`, process.env.VUE_APP_URL);

    //     context.commit("setLoader");
    //     let response;
    //     try {
    //         response = await fetch(url,
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": "Bearer " + access_token
    //                 },
    //             });
    //     } catch {
    //         context.commit("removeLoader");
    //         return "There was an error!";
    //     }
    //     const responseData = await response.json();

    //     if (!response.ok) {
    //         context.commit("removeLoader");
    //         return false;
    //     }

    //     context.commit("setAllSongs", responseData.songs);
    //     context.commit("removeLoader");
    //     return true;
    // },
    async loadPaginatedSongs(context) {
        const user_email = context.getters.user.email;
        const access_token = context.getters.token;
        const newSongsOffset = context.state.songsOffset;
        const url = new URL(`api/songs-paginated/${user_email}?offset=${newSongsOffset}&limit=40`, process.env.VUE_APP_URL);

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
        } catch(error) {
            console.error(error);
            context.commit("setAllSongsLoaded", true);
            return false;
        }
        const responseData = await response.json();

        if (!response.ok) {
            context.commit("setAllSongsLoaded", true);
            return false;
        }
        if (responseData?.songs?.length === 0) context.commit("setAllSongsLoaded", true);

        context.commit("setAllSongs", responseData.songs);
        context.commit("increaseSongsOffset", 40);
        return true;
    },
    async addNewSong(context, payload) {
        const user_email = context.getters.user.email;
        const access_token = context.getters.token;
        const url = new URL(`api/song/${user_email}`, process.env.VUE_APP_URL);

        const body = {...payload};
        let methodType = "POST";
        if (payload.songId) {
            methodType = "PUT";
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
                    body: JSON.stringify(body)
                });
        } catch(error) {
            console.error(error);
            return false;
        }
        const responseData = await response.json();
        if (!response.ok) {
            return false;
        } else {
            if (payload.songId) {
                context.commit("updateSong", payload);
            } else {
                const resp_payload = responseData.song;
                resp_payload.artist = responseData.artist.name;
                context.commit("insertSong", resp_payload);
            }
        }
        // return true
        return responseData.song.songId;
    },
    async deleteSong(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/song/${user_email}`, process.env.VUE_APP_URL);

        const body = {
            "songName": payload.songName,
            "artist": payload.artist
        };
        let response;
        try {
            response = await fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify(body)
                });
        } catch(error) {
            console.error(error);
            return false;
        }
        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to delete song.');
            return false;
        }
        context.commit("deleteSong", payload.songId);
        return true;
    },
    //MUSIC KEYS
    async loadMusicKeys(context) {
        let url = new URL(`api/keys`, process.env.VUE_APP_URL);
        let access_token = context.getters.token;

        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token,
                    },
                });
        } catch(error) {
            console.error(error);
            return;
        }
        const responseData = await response.json();

        if (!response.ok) {
            return;
        }
        context.commit("storeMusicKeys", responseData.musicKeys);
    },

    //ARTISTS
    async loadAllArtists(context) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/artists/${user_email}`, process.env.VUE_APP_URL);

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
        } catch(error) {
            console.error(error);
            return;
        }
        const responseData = await response.json();

        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load more artists.');
            return;
        }
        context.commit("setAllArtists", responseData.artists);
    },
    //NOTES 
    async loadUsersNotes(context) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/notes/${user_email}`, process.env.VUE_APP_URL);

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
        } catch(error) {
            console.error(error);
            return;
        }
        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load user notes.');
            return;
        }
        context.commit("updateUserNotes", responseData.notes);
        context.commit("updateTxtAreaHeight", responseData.txtAreaHeight);

    },
    async updateUsersNotes(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/notes/${user_email}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify(payload)

                });
        } catch(error) {
            console.error(error);
            return;
        }
        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to update user notes.');
            return;
        }
        context.commit("updateUserNotes", responseData.notes);
        context.commit("updateTxtAreaHeight", responseData.txtAreaHeight);

    },
    //websites
    async addUserWebsite(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/website/${user_email}`, process.env.VUE_APP_URL);
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
        } catch(error) {
            console.error(error);
            return;
        }
        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to add user website.');
            return;
        }
        context.commit("addUserWebsite", payload);
    },
    async deleteUserWebsite(context, name) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/website/${user_email}`, process.env.VUE_APP_URL);

        let response;
        try {
            response = await fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({ name })

                });
        } catch(error) {
            console.error(error);
            return;
        }
        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to add user website.');
            return;
        }
        context.commit("deleteUserWebsite", name);
    },
    async loadUserWebsites(context) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/websites/${user_email}`, process.env.VUE_APP_URL);
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
        } catch(error) {
            console.error(error);
            return;
        }
        const responseData = await response.json();
        if (!response.ok) {
            return;
        }
        context.commit("setUserWebsites", responseData.websites);
    },
    //SPOTIFY API
    async apiForSongInfo(context, payload) {
        let url = new URL("api/spotifyaccess", process.env.VUE_APP_URL);
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
                    body: JSON.stringify(payload)
                });
        } catch(error) {
            console.error(error);
            return false;
        }
        const responseData = await response.json();
        if (!response.ok) {
            return false;
        }
        return responseData;
    },
    async loadPlaylists(context) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/playlists/${user_email}`, process.env.VUE_APP_URL);

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
        } catch(error) {
            console.error(error);
            return;
        }
        if (!response.ok) {
            console.log(response.message);
            return false;
        }
        const responseData = await response.json();
        context.commit("setPlaylists", responseData.playlists);
    },
    async fetchSongPlaylists(context, songId) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/song-playlists/${user_email}/${songId}`, process.env.VUE_APP_URL);
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
        } catch(error) {
            return;
        }
        if (!response.ok) {
            console.log(response.message);
            return;
        }
        const responseData = await response.json();
        return responseData.playlists;
    },
    async deleteSongFromPlaylist(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/playlist/${user_email}/${payload.playlist_name}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({song_id: payload.song_id})
                });
        } catch(error) {
            console.error(error);
            return false;
        }
        return response.ok;
    },
    async addSongToPlaylist(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/playlist/${user_email}/${payload.playlist_name}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({song_id: payload.song_id})
                });
        } catch(error) {
            console.error(error);
            return false;
        }
        return response.ok;
    },
    async createPlaylist(context, name) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/playlists/${user_email}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({playlist_name: name})
                });
        } catch(error) {
            console.error(error);
            return;
        }
        if (response.status === 403) return 403;
        if(!response.ok) return false;
        context.commit("addPlaylist", name);
        return true;
    },
    async fetchSongsForPlaylist(context, name) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/playlist/${user_email}/${name}`, process.env.VUE_APP_URL);
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
        } catch(error) {
            console.error(error);
            return;
        }
        if(!response.ok) return false;

        const responseData = await response.json();
        context.commit("addSongsForPlaylist", responseData.songs);
    },
    async updatePlaylistName(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/playlists/${user_email}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify(payload)
                });
        } catch(error) {
            console.error(error);
            return;
        }
        if(!response.ok) return false;
        context.commit("updatePlaylistName", payload);
        return true;
    },
    async deletePlaylist(context, name) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`api/playlists/${user_email}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({playlist_name: name})
                });
        } catch(error) {
            console.error(error);
            return;
        }
        if(!response.ok) return false;
        context.commit("deletePlaylist", name);
        return true;
    }
};