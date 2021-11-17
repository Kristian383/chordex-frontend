export default {
    toggleSidebar(state) {
        state.sidebarIsActive = !state.sidebarIsActive;
    },
    removeSidebar(state) {
        state.sidebarIsActive = false;
    },
    toggleDarkMode(state) {
        state.darkMode = !state.darkMode;
    },

    toggleFavorite(state, payload) {
        let index = state.songs.findIndex(song => song.songId == payload.songId);
        state.songs[index].isFavorite = !state.songs[index].isFavorite;
    },

    setSongDetailTitle(state, payload) {
        state.songDetailTitle = payload;
    },
    sortSongs(state, option) {
        // console.log("opcija", option);
        if (option == "A-Z") {
            state.songs.sort((a, b) => a.songName.localeCompare(b.songName))
        } else if (option == "Z-A") {
            state.songs.sort((a, b) => b.songName.localeCompare(a.songName))
        } else if (option == "Least learned") {
            state.songs.sort((a, b) => a.practicedPrcntg - b.practicedPrcntg)
        } else if (option == "Best learned") {
            state.songs.sort((a, b) => b.practicedPrcntg - a.practicedPrcntg)
        }
        // else if (option == "Newest Added") {
        //     state.songs.sort((a, b) => b.practicedPrcntg - a.practicedPrcntg)
        // }else{

        // }
        // console.log(state.songs);

    },

    deleteSong(state, id) {
        let index = state.songs.findIndex(song => song.songId == id);
        state.songs.splice(index, 1)

    },

    storeMusicKeys(state, payload) {
        state.musicKeys = payload
    },

    // resources
    updateUserNotes(state, payload) {
        state.usefulResources.notes = payload;

    },
    addUserResourcesList(state, payload) {
        state.usefulResources.resourcesLinks.unshift(payload)
    },
    deleteUserResourcesList(state, id) {
        let index = state.usefulResources.resourcesLinks.findIndex(link => link.id == id);
        state.usefulResources.resourcesLinks.splice(index, 1)
    },
    updateTxtAreaHeight(state, payload) {
        state.usefulResources.txtAreaHeight = payload;
    },

    loadMoreSongs(state, payload) {
        for (let i = 0; i < payload.length; i++) {
            // state.songs.unshift(payload[i])
            state.songs.push(payload[i])
        }
    },

    //artists
    loadMoreArtists(state, payload) {
        for (let i = 0; i < payload.length; i++) {
            // state.songs.unshift(payload[i])
            //console.log(payload[i]);
            state.artists.push(payload[i])
        }

        for (let i = 0; i < state.artists.length; i++) {
            //console.log(state.artists[i]);
            state.artists[i].order=i+1
        }
        
    },
    sortArtists(state, option) {
        if (option == "A-Z") {
            state.artists.sort((a, b) => a.name.localeCompare(b.name))
        } else if (option == "Z-A") {
            state.artists.sort((a, b) => b.name.localeCompare(a.name))
        }
    },
    updateArtistsList(state, payload) {
        state.artists = payload
    },
    load20MoreArtists(state) {
        for (let i = 7; i < 20; i++) {
            let artist = { name: "John Frusciante", order: i, totalSongs: 12 };
            state.artists.push(artist)
        }
    }

}