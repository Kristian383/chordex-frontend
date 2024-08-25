<template>
  <div 
    class="card"
    tabindex="0"
    @click.prevent="openSongDetail"
    @keydown.enter="openSongDetail"
    @mousedown.middle.prevent="openSongDetail"
  >
    <div class="card-header">
      <div class="image">
        <img :src="song.imgUrl || imgUrl" alt="Artists album" :title="song.artist" />
      </div>
      <div class="icons">
        <div
          class="icon"
          :class="{ is_favorite: isFavorite }"
          tabindex="0"
          @click.stop="toggleFavorite"
          @keydown.enter.stop="toggleFavorite"
        >
          <font-awesome-icon icon="heart" />
        </div>
        <!-- dropdown popper -->
        <VDropdown
          :dispose-timeout="1000"
          :distance="13"
          :container="containerEl || 'body'"
        >
          <div
            class="icon"
            tabindex="0"
            @click.stop
            @keydown.enter.stop
          >
            <font-awesome-icon icon="ellipsis-v" />
          </div>
          <template #popper>
            <ul class="dropdown-popup">
              <li
                class="dropdown-popup-item"
                @keydown.enter="openEditMode"
                @click="openEditMode"
              >
                <font-awesome-icon class="popup-item-icon" icon="edit" />
                <span>Edit</span>
              </li>
              <li v-if="!$route.query.isMySong" class="dropdown-popup-item" @click="$emit('openPlaylistModal', song.songId)">
                <!-- <font-awesome-icon class="popup-item-icon" icon="plus" /> -->
                <img
                  style="width: 1rem;"
                  title="Add song to playlist"
                  alt="Add song to playlist"
                  src="@/assets/add-to-playlist.webp"
                />
                <span>Playlist</span>
              </li>
              <li class="dropdown-popup-item delete" @click="deleteSong">
                <font-awesome-icon class="popup-item-icon" icon="trash-alt" />
                <span>Delete</span>
              </li>
            </ul>
          </template>
        </VDropdown>
      </div>
    </div>

    <div class="card-body">
      <div class="tags">
        <span v-if="song.firstKey" class="tag tag-teal">{{
          showFirstKey
        }}</span>
        <span
          v-if="song.difficulty"
          class="tag tag-teal difficulty"
          :class="skillLevelClass"
        >
          {{ song.difficulty }}
        </span>
        <span v-if="!song.capo && !song.difficulty" style="height: 24px" />
      </div>
      <h3
        class="artist"
        :aria-label="song.artist"
        :title="song.artist"
        @click.stop="chooseArtist"
      >
        {{ song.artist }}
      </h3>
      <h4 class="song_name" :aria-label="song.songName" :title="song.songName">
        {{ song.songName }}
      </h4>
      <div class="history-info">
        <font-awesome-icon icon="history" />
        <small>{{ timeSince }}</small>
      </div>
    </div>
    <div class="progress" :style="{ width: practicePercentage }" />
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

const props = defineProps(["song", "containerEl"]);
const emits = defineEmits(["openPlaylistModal"]);
const store = useStore();
const router = useRouter();
const route = useRoute();


const skillLevelClass = computed(() => {
  return props.song.difficulty;
});

const practicePercentage = computed(() => {
  return props.song.practicedPrcntg + "%";
});

const isFavorite = computed(() => {
  return props.song.isFavorite;
});

const imgUrl = computed(() => {
  return require("@/assets/music.webp");
});

const showFirstKey = computed(() => {
  let key;
  if (props.song.firstKey) {
    key = props.song.firstKey.split(" ");
    switch (key[1].toLowerCase()) {
    case "major":
      key = key[0] + " maj";
      break;
    default:
      key = key[0] + " min";
    }
  }
  return key;
});

const barColor = computed(() => {
  if (props.song.practicedPrcntg <= 40) return "rgb(194, 42, 42)";
  else if (props.song.practicedPrcntg > 34 && props.song.practicedPrcntg <= 80)
    return "#ff4500";

  return "#69b34c";
});

const timeSince = computed(() => {
  const lastViewedDate = +new Date(props.song.lastViewed);
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;
  var elapsed = new Date() - lastViewedDate;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + "s ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " min ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "h ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + "d ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " mon ago";
  } else {
    return Math.round(elapsed / msPerYear) + " yrs ago";
  }
});

function openSongDetail(event) {
  let queryUrl = '';
  if (route.query?.playlist) queryUrl = `?playlist=${route.query?.playlist}`;
  else if (route.query?.artist) queryUrl = `?artist=${route.query?.artist}`;
    
  const routePath = props.song.isMySong
    ? `/songs/${props.song.songId}?isMySong=True`
    : `/songs/${props.song.songId}${queryUrl}`;
  // Check if the ctrl key is pressed (or cmd key on Mac)
  if (event.ctrlKey || event.metaKey || event.button === 1) {
    event.preventDefault();
    const routeURL = router.resolve(routePath).href;
    window.open(routeURL, '_blank');
  } else {
    router.push(routePath);
  }
}

function toggleFavorite() {
  store.commit("toggleFavorite", {
    songId: props.song.songId,
    isMySong: route.query.isMySong,
  });
  store.dispatch("addNewSong", props.song);
}

function openEditMode() {
  const pushRoute = props.song.isMySong
    ? `/new/${props.song.songId}?isMySong=True`
    : `/new/${props.song.songId}`;
  router.push(pushRoute);
}

async function deleteSong() {
  const shouldDelete = window.confirm(`Are you sure you want to delete ${props.song.songName}?\n\nThis song will be removed from the entire app.`);
  if (!shouldDelete) return;

  const payload = {
    songName: props.song.songName,
    artist: props.song.artist,
    songId: props.song.songId,
  };
  await store.dispatch("deleteSong", payload);
}

function chooseArtist() {
  if (!props.song.isMySong) router.push("/songs?artist=" + encodeURIComponent(props.song.artist));
}

// PLAYLISTS - todo: 
// const playlistMap = reactive(new Map());

// async function fetchPlaylistsOfSong() {
//   const playlistsOfSong = await store.dispatch("fetchSongPlaylists", props.song.songId);
//   // mappedPlaylists.value = props.playlists.map({ name: element, checked: playlistsOfSong.includes(element) });
//   store.getters.getPlaylists.forEach((playlist) => playlistMap.set(playlist, playlistsOfSong.includes(playlist)))
// }
// const emitPlaylistData = reactive({
//   songId: props.song.songId,
//   playlistMap: playlistMap.value
// })

// }
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--white);
  border-radius: 0.125rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  overflow: hidden;
  width: 11.25rem;
  position: relative;
  height: 15rem;
  color: var(--font_black);
  transition: 0.3s ease-in all;
  cursor: pointer;

  &:hover {
    transform: rotateZ(-1deg) scale(1.04);
  }

  .card-header {
    .image {
      width: 100%;
      height: 6.25rem;
      text-align: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .icons {
      display: flex;
      position: absolute;
      top: 0;
      width: 100%;
      justify-content: space-between;
      padding: 0.25rem;
      z-index: 14;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.125rem;
        height: 2.125rem;
        border-radius: 50%;
        background-color: var(--white);
        transition: all 0.5s ease;

        @media (min-width: 720px) {
          &:hover {
            background-color: #303030;
            color: var(--white);
          }
        }
      }
    } 
  }

  .progress {
    bottom: 0;
    left: 0;
    position: absolute;
    top: 0;

    &:before {
      animation: slideIn 2s ease-out;
      background-color: v-bind(barColor);
      bottom: 0;
      left: 0;
      content: "";
      position: absolute;
      width: 100%;
      height: 0.375rem;
      border-radius: 0 0 2px 2px;
    }
  }
}

.is_favorite {
  color: var(--burgundy);
}
/* card body  */
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.5rem 0.75rem 0 0.75rem;
  gap: 0.625rem;
  width: 100%;
}

.tags {
  display: flex;
  gap: 0.25rem;
}
.tag {
  border-radius: 1.25rem;
  font-size: 0.75rem;
  margin: 0;
  color: var(--white);
  padding: 0.25rem 0.625rem;
  cursor: pointer;
}
.tag-teal {
  background-color: var(--teals);
}
.tag.difficulty {
  text-transform: uppercase;
}
.easy {
  background-color: var(--green);
}
.medium {
  background-color: var(--orange);
}
.hard {
  background: var(--burgundy);
}
.artist,
.song_name {
  text-transform: capitalize;
  z-index: 35;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}

.artist:hover {
  color: var(--burgundy);
}

.history-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.9375rem;
  margin-top: 0.5rem;
}
</style>