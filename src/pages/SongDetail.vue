<template>
  <base-card>
    <template #song_detail_title>
      <div class="navigation-buttons">
        <button
          class="prev-button"
          :disabled="disableNavigationButton === 'prev' || disableNavigationButton === 'both'"
          @keydown.enter="goToSong('prev')"
          @click="goToSong('prev')"
        >
          <font-awesome-icon icon="chevron-left" />
        </button>
        <button
          class="next-button"
          :disabled="disableNavigationButton === 'next' || disableNavigationButton === 'both'"
          @keydown.enter="goToSong('next')"
          @click="goToSong('next')"
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>
    </template>
    <the-loader v-if="songsLoading" />
    <div v-else-if="showDetails" class="song-detail">
      <!-- yt video  -->
      <div class="box video"> 
        <iframe
          v-if="songData.ytLink"
          :src="songData.ytLink"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <img v-else :src="songData.imgUrl || imgUrl" alt="Artist" />
      </div>
      <div class="box song-info">
        <div class="top-icons">
          <div class="action-icons">
            <font-awesome-icon :icon="favoriteIconName" style="pointer-events: none" :class="{ 'is-favorite': isFavorite }" />
            <img class="add-to-playlist-icon" src="@/assets/add-to-playlist.png" @click="openModal = true" />
            <font-awesome-icon icon="edit" class="edit" @click="openEdit" />
            <font-awesome-icon icon="trash-alt" class="delete" @click="deleteSong" />
          </div>
        </div>
        <div>
          <router-link class="artist-link" :to="artistRoute">{{ songData.artist }}</router-link>
        </div>
        <!-- Song and bpm -->
        <div>
          <div>{{ songData.songName }}</div>
          <div v-if="songData.bpm" title="BPM">
            <font-awesome-icon icon="drum" />
            {{ songData.bpm }}
          </div>
        </div>
        <!-- keys -->
        <div v-if="songData.firstKey">
          <div><b>Key:</b> {{ songData.firstKey }}</div>
          <div v-if="songData.firstKeyNotes"><b>Chords in key:</b> {{ songData.firstKeyNotes }}</div>
          <div v-if="songData.firstChordProgression">
            <b>Chord progression:</b> {{ songData.firstChordProgression }}
          </div>
        </div>
        <div v-if="songData.secondKey">
          <div><b>Key Change:</b> {{ songData.secondKey }}</div>
          <div>
            <b>Chords in scale:</b> {{ songData.secondKeyNotes }}
          </div>
          <div v-if="songData.secondChordProgression">
            <b>Chord progression:</b> {{ songData.secondChordProgression }}
          </div>
        </div>
        <!-- capo  tuning guitar-->
        <div>
          <div v-if="songData.capo"><b>Capo: </b>{{ songData.capo }}</div>
          <div><b>Tuning: </b>{{ songData.tuning ? songData.tuning : "Standard" }}</div>
          <div v-if="songData.acoustic || songData.electric">
            <b>Guitar type: </b> {{ songData.acoustic ? "Acoustic" : "" }}
            {{ songData.electric ? "Eletric" : "" }}
          </div>
        </div>
        <!-- chordsWebsiteLink -->
        <div>
          <div v-if="songData.chordsWebsiteLink">
            <b>Chords website: </b>
            <a :href="songData.chordsWebsiteLink" target="_blank"> Link </a>
          </div>
        </div>
        <div v-if="songData.difficulty">
          <div><b>Difficulty: </b> {{ songData.difficulty }}</div>
        </div>
      </div>
      <div v-if="songData.songText" class="box notebook">
        <hr />
        <br />
        <div class="copy-notes-container">
          <font-awesome-icon
            v-if="!copiedSongText" 
            class="copy-notes-icon" :icon="['far', 'copy']"
            title="Copy notes" @click="copyToClipboard"
          />
          <span v-else>Copied!</span>
        </div>
        <pre>{{ songData.songText }}</pre>
      </div>
    </div>
    <add-to-playlist-modal
      v-if="openModal"
      :playlists="getPlaylists"
      :song-id="songId"
      @close-modal="closePlaylistModal"
    />
  </base-card>
</template>

<script>
import { ref, computed, onBeforeUnmount, watch, onMounted, onUnmounted, defineAsyncComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const AddToPlaylistModal = defineAsyncComponent(() => import('../components/playlist/AddToPlaylistModal.vue'));

export default {
  name: "SongDetail",
  components: {
    AddToPlaylistModal
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
  
    const showDetails = ref(false);
    const imgUrl = computed(() => require("@/assets/music.png"));
    const isFavorite = computed(() => songData.value?.isFavorite);
    const songId = computed(() => route.params?.songId);
    const isMySong = computed(() => route.query?.isMySong === "True");

    const allSongs = computed(() => isMySong.value ? store.getters.getAllMySongs : store.getters.getAllSongs);
    const songsLoading = computed(() => store.getters.songsLoading);

    const getSong = (id) => {
      const song = allSongs.value.find((song) => song.songId == id);
      return song;
    };

    const songData = computed(() => {
      const song = getSong(songId.value);
      return song;
    });

    const unwatch = watch([songsLoading, songData], ([loading, data]) => {
      // This watcher will get called whenever songsLoading or songData changes. 
      // If the route change also causes a change in songsLoading or songData,
      // then the watcher will get called.
      if(!songId.value) return;
      if (!loading && !data) {
        router.push(route.query?.isMySong ? "/songs?isMySong=True" : "/songs");
      } else if (!loading && data) {
        showDetails.value = true;
        store.commit("setSongDetailTitle", data.songName);
      }
    }, {immediate: true});

    onBeforeUnmount(unwatch);

    function openEdit() {
      const pushRoute = isMySong.value
        ? `/new/${songId.value}?isMySong=True`
        : `/new/${songId.value}`;
      router.push(pushRoute);
    }

    async function deleteSong() {
      if (window.confirm(`Are you sure you want to delete '${songData.value?.songName}' song?`)) {
        const payload = {
          songName: songData.value?.songName,
          artist: songData.value?.artist,
          songId: songData.value?.songId,
        };
        router.push(
          route.query?.isMySong ? "/songs?isMySong=True" : "/songs"
        );
        const response = await store.dispatch("deleteSong", payload);
        if (!response) {
          window.alert("There was an error while trying to delete the song.");
        } 
      }
    }

    const favoriteIconName = computed(() => {
      if (!isFavorite.value) {
        return ["far", "heart"];
      }
      return "heart";
    });

    const artistRoute = computed(() => {
      const isMySong = songData?.value?.isMySong;
      const artist = songData?.value?.artist;
      const path = "/songs";
      const query = isMySong ? { isMySong: "True" } : { artist };
      return { path, query };
    });
    
    const getSongsFromPlaylist = computed(() => store.getters.getSongsFromPlaylist(store.state.activeFilters));
    const filters = computed(() => store.getters.getActiveFilters);

    const indexOfCurrentSong = computed(() => {
      const payload = { 
        id: +route.params?.songId, 
        query: route.query,
        playlist: route.query?.playlist,
        artist: route.query?.artist,
      };
      return store.getters.indexOfCurrentSong(payload);
    });

    const disableNavigationButton = computed(() => {
      const index = indexOfCurrentSong.value;
      const { query } = route;
      let lenAll;
      if (query?.isMySong) lenAll = store.getters.getAllMySongsLen;
      else if (query?.playlist) lenAll = getSongsFromPlaylist.value.length;
      else if (query?.artist) lenAll = store.getters.filterSongs(filters.value, {artist: query.artist}).length;
      else lenAll = store.getters.filterSongs(filters.value).length;

      if (index === 0) {
        return lenAll === 1 ? 'both' : "prev";
      } else if (index === lenAll - 1) {
        return "next";
      } else {
        return false;
      }
    });

    function goToSong(direction) {
      const { query } = route;
      const currentSongIndex = indexOfCurrentSong.value;
      const goToIndex = direction === "next" ? currentSongIndex + 1 : currentSongIndex - 1; 
      
      let goToSongId;
      if (query?.isMySong) goToSongId = store.getters.getAllMySongs[goToIndex]?.songId;
      else if (query?.playlist) goToSongId = getSongsFromPlaylist.value[goToIndex]?.songId;
      else if (query?.artist) {
        goToSongId = store.getters.filterSongs(filters.value, {artist: query.artist})[goToIndex]?.songId;
      }
      else goToSongId = store.getters.filterSongs(filters.value)[goToIndex]?.songId;

      let queryUrl = '';
      if (route.query?.playlist) queryUrl = `?playlist=${route.query?.playlist}`;
      else if (route.query?.artist) queryUrl = `?artist=${route.query?.artist}`;
      const pushRoute = query?.isMySong ? `/songs/${goToSongId}?isMySong=True` : `/songs/${goToSongId}${queryUrl}`;
      router.push(pushRoute);
    };

    const handleArrowKeys = (event) => {
      if (event.code === 'ArrowLeft' && !(disableNavigationButton.value === 'prev' || disableNavigationButton.value === 'both')) {
        goToSong("prev");
      } else if (event.code === 'ArrowRight' && !(disableNavigationButton.value === 'next' || disableNavigationButton.value === 'both')) {
        goToSong("next");
      }
    };

    onMounted(() => {
      if (route.query?.playlist && store.getters.getActivePlaylistSongsLength === 0) {
        store.dispatch("fetchSongsForPlaylist", route.query?.playlist);
      }
      window.addEventListener('keydown', handleArrowKeys);
    });

    onUnmounted(() => {
      window.removeEventListener('keydown', handleArrowKeys);
    });

    const copiedSongText = ref(false);
    const copyToClipboard = () => {
      copiedSongText.value = true;
      navigator.clipboard.writeText(songData?.value.songText);
      setTimeout(() => {
        copiedSongText.value = false;
      }, 2000);
    };

    const getPlaylists = computed(() => store.getters.getPlaylists);
    const openModal = ref(false);
    const closePlaylistModal = () => {
      openModal.value = false;
    };

    return {
      openEdit,
      deleteSong,
      favoriteIconName,
      imgUrl,
      songData,
      isFavorite,
      showDetails,
      songsLoading, 
      artistRoute,
      goToSong,
      disableNavigationButton,
      copyToClipboard,
      copiedSongText,
      openModal,
      closePlaylistModal,
      getPlaylists,
      songId
    };
  },
};
</script>

<style lang="scss" scoped>
.navigation-buttons {
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 8px;
    bottom: 8px;
    opacity: 0.5;
    box-sizing: border-box;
    border-right: 1px solid #e4e4e7;
  }
  
  .prev-button,
  .next-button {
    background-color: #fff;
    border: 2px solid #ddd;
    color: var(--mid_gray);
    padding: 8px 28px;
    cursor: pointer;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    &:hover  {
      background-color: #e4e4e7;
    }
    &[disabled] {
      opacity: 0.5;
      box-shadow: none;
      background-color: #f2f2f2;
      border-color: #ddd;
      color: #999;
      cursor: default;
      pointer-events: none;
      &:hover {
        background-color: #f1f1f1;
      }
    }
    &:active {
      background-color: #c9c9cc;
      border-color: #c9c9cc;
    }
  }
  .prev-button {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border-right: none;
  }
  .next-button {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-left: none;
  }
}
.song-detail {
  color: var(--font_black);
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  gap: 1rem;
  position: relative;
  max-width: 87.5rem;
  margin: 0 auto;
  border-radius: 0.375rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px 0, rgba(0, 0, 0, 0.1) 0 0 1px 0;
  font-size: 1.125rem;

  @media (min-width: 93.75rem) {
      grid-template-columns: 1fr 1fr;

      .box.notebook {
        grid-column: 1/3;
      }
  }
  
  .artist-link {
    color: inherit;
    font-weight: 600;
    &:hover {
      color: var(--dark_gray_font);
    }
  }

  .box {
    width: 15rem;
    justify-self: center;
    position: relative;
    &.notebook {
      line-height: 1.75rem;
      .copy-notes-container {
        position: absolute;
        top: 0.5rem;
        right: 0;
        .copy-notes-icon {
          cursor: pointer;
          &:hover {
            color: var(--dark_gray_font);
          }
        }
        span {
          font-size: 0.875rem;
        }
      }

      pre {
        white-space: pre-wrap; /* Since CSS 2.1 */
        white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
        white-space: -pre-wrap; /* Opera 4-6 */
        white-space: -o-pre-wrap; /* Opera 7 */
        word-wrap: break-word;
      }
    }
    &.video {
      text-align: center;
      iframe {
        width: 14.375rem;
        width: 100%;
        height: 100%;
      }

      img {
        height: 100%;
        max-height: 25rem;
        max-width: 100%;
        min-height: 12.5rem;
      }
    }

    @media (min-width: 25rem) {
      width: 18.75rem;
      min-height: 12.5rem;
    }
    @media (min-width: 37.5rem) {
      width: 25rem;
    }
  }
  @media (min-width: 48.125rem) {
    .box.song-info,
    .box.video {
      width: 37.5rem;
      min-height: 25rem;
    }
    .box.notebook {
      width: 100%;
    }
  }
  .song-info > div {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    margin: 0 auto;
    padding-bottom: 1.25rem;
    align-items: center;
    flex-wrap: wrap;
  }
  .action-icons {
    width: 100%;
    color: var(--dark_gray_chips);
    display: flex;
    gap: 1rem;

    svg,
    .add-to-playlist-icon {
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1.5rem;

      &:hover {
        filter: drop-shadow(1.5px 2px 2px rgb(0 0 0 / 0.3));
      }
    }

    .is-favorite {
      color: var(--burgundy);
    }
    .delete {
      position: absolute;
      right: 0;
    }

    .edit {
      position: absolute;
      right: 50px;
    }

    .delete:hover,
    .edit:hover {
      color: var(--font_black);
    }
  }
}
</style>