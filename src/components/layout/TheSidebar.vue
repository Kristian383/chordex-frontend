<template>
  <div v-if="isAuthenticated" class="hamburger" @click="toggleSidebar">
    <font-awesome-icon id="btn" icon="bars" />
  </div>
  <transition name="fade">
    <aside v-if="sidebarIsActive" class="sidebar">
      <ul class="nav_list">
        <the-sidebar-playlist-link
          v-for="sidebarLink in sidebarLinks"
          :key="sidebarLink.label"
          v-bind="sidebarLink"
          :is-active="$route.fullPath === `/${sidebarLink.routeName}`"
          :playlists="getPlaylists"
          @log-out="logOutUser"
        />
        <!-- <li>
          <div class="toggle-mode">
            <input
              type="checkbox"
              @click="toggleDarkMode"
              class="checkbox"
              id="chk"
            />
            <label class="label" for="chk">
              <font-awesome-icon icon="moon"></font-awesome-icon>
              <font-awesome-icon icon="sun"></font-awesome-icon>
              <div class="ball"></div>
            </label>
          </div>
        </li> -->
      </ul>

      <div class="profile_content">
        <div class="profile">
          <div class="profile_details">
            <img src="@/assets/guitar.webp" alt="Guitar instrument" title="Guitar" />
            <div class="name">{{ getUserData.username }}</div>
          </div>
        </div>
      </div>
    </aside>
  </transition>
</template>

<script setup>
import TheSidebarPlaylistLink from "./TheSidebarPlaylistLink.vue";
import { useStore } from "vuex";
import { computed } from "vue";

import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

const sidebarLinks = [
  {
    label: "Account",
    routeName: "profile",
    iconName: "user-alt",
  },
  {
    label: "Songs",
    routeName: "songs",
    iconName: "music",
  },
  {
    label: "Artists",
    routeName: "artists",
    iconName: "users",
  },
  {
    label: "Songs by Key",
    routeName: "song-keys",
    iconName: "sort-amount-down-alt",
  },
  {
    label: "My Playlists",
    routeName: "playlists",
    iconName: "list-ul",
    isDropdown: true
  },
  {
    label: "Add New Song",
    routeName: "new",
    iconName: "plus-square",
  },
  {
    label: "My Songs",
    routeName: "songs?isMySong=True",
    iconName: "clipboard-list",
  },
  {
    label: "Keys & Notes",
    routeName: "find-key",
    iconName: "question-circle",
  },
  {
    label: "Websites",
    routeName: "resources",
    iconName: "sticky-note",
  },
  {
    label: "Metronome",
    routeName: "metronome",
    iconName: "drum",
  },
  {
    label: "Logout",
    routeName: "home",
    iconName: "sign-out-alt",
  },
];

const store = useStore();

const getPlaylists = computed(() => store.getters.getPlaylists);

const isAuthenticated = computed(() => {
  return store.getters.token;
});

const sidebarIsActive = computed(() => {
  return store.getters.sidebarIsActive;
});

const getUserData = computed(() => {
  return store.getters.user;
});

function toggleSidebar() {
  store.commit("toggleSidebar");
}

function logOutUser() {
  store.dispatch("logout");
  store.commit("removeSidebar");
}
</script>

<style lang="scss" scoped>
.hamburger {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  font-size: 1.5rem;
  z-index: 102;
  cursor: pointer;

  &:hover {
    color: #333;
  }
}

.sidebar {
  height: 100%;
  width: 15rem;
  background-color: var(--dark_blue_sidebar);
  // position: absolute;
  position: fixed;
  top: 0;
  left: 0;
  padding: 5.625rem 0.875rem;
  transition: all 0.3s ease;
  z-index: 50;
}

.sidebar #btn {
  color: var(--f1_gray);
  position: absolute;
  left: 90%;
  top: 1.625rem;
  font-size: 1.5rem;
  text-align: center;
  transform: translateX(-50%);
  cursor: pointer;
  transition: 0.8s ease all;
}

.sidebar .nav_list {
  margin-top: 1.25rem;
  overflow-y: auto;
  padding-right: 0.25rem;
  height: 100%;

  @include scrollbar;
}

// dark mode
// .sidebar ul li .toggle-mode {
//   transition: all 0.3s ease;
//   margin-top: 10px;
//   display: flex;
//   align-items: center;
//   padding-top: 10px;
//   position: absolute;
//   left: 25px;
// }

// .sidebar ul li .toggle-mode .checkbox {
//   opacity: 0;
//   position: absolute;
// }

// .sidebar ul li .toggle-mode .label {
//   background-color: var(--dark_gray_chips);
//   border-radius: 50px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 5px;
//   position: relative;
//   height: 24px;
//   width: 48px;
//   transform: scale(1.5);
// }

// .sidebar ul li .toggle-mode .label .ball {
//   background-color: var(--white);

//   border-radius: 50%;
//   position: absolute;
//   top: 2px;
//   left: 2px;
//   height: 20px;
//   width: 20px;
//   transform: translateX(0px);
//   transition: transform 0.2s linear;
// }
// .sidebar ul li .toggle-mode svg {
//   font-size: 14px;
// }
// .sidebar ul li .toggle-mode .checkbox:checked + .label .ball {
//   transform: translateX(24px);
// }

// .fa-moon {
//   color: #f1c40f;
// }

// .fa-sun {
//   color: #f39c12;
// }

.sidebar .profile_content {
  position: absolute;
  color: var(--f1_gray);
  left: 0;
  bottom: 0;
  width: 100%;

  .profile {
    position: relative;
    padding: 14px 6px;
    height: 70px;
    background-color: #131920;

    .profile_details {
      opacity: 1;
      pointer-events: auto;
      display: flex;
      align-items: center;

      .name {
        font-weight: 400;
      }

      img {
        height: 45px;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
  transform: translateX(-100%);
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>