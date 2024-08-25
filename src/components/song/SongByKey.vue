<template>
  <li class="song-item">
    <div class="thumbnail">
      <img :src="song.imgUrl || artistPhoto" alt="Artist" />
    </div>
    <router-link :to="artistSongsRoute">
      {{ song.artist }}
    </router-link>
    <router-link :to="artistSongRoute">
      {{ song.songName }}
    </router-link>
    <div class="key-info">{{ song.songKey }}</div>
  </li>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps(["song"]);

const artistPhoto = computed(() => {
  return require("../../assets/guitar.webp");
});

const artistSongsRoute = computed(() => {
  return `/songs?artist=${props.song.artist}`;
});

const artistSongRoute = computed(() => {
  return `/songs/${props.song.songId}`;
});
</script>

<style lang="scss" scoped>
.song-item {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid #ccc;
  align-items: center;

  @media (min-width: 720px) {
    gap: 32px;
  }

  .thumbnail {
    padding: 0 10px;
  }

  .thumbnail img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: 600;

    &:hover {
      color: $burgundy;
    }
  }

  a {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  .key-info {
    margin-left: auto;
    font-size: 0.9rem;
  }
}
</style>