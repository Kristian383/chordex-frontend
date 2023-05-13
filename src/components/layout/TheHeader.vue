<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav class="container">
      <span v-if="!hideLogo" class="logo">
        <router-link to="/home">
          <img src="@/assets/guitar.svg" alt="Quote Logo" />
        </router-link>
      </span>
      <div class="title"><h2>Chord<span style="color: var(--burgundy)">Ex</span></h2></div>
      <ul class="navigation">
        <li>
          <router-link class="link" active-class="active" to="/home">
            Home
          </router-link>
        </li>
        <li>
          <router-link
            class="link"
            :class="{ not_logged: isLogged }"
            active-class="active"
            to="/songs"
          >
            App
          </router-link>
        </li>
        <li>
          <router-link class="link" active-class="active" to="/about">
            About
          </router-link>
        </li>
        <li>
          <router-link class="link" active-class="active" to="/metronome">
            Metronome
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

const store = useStore();

const scrolledNav = ref(false);
const hideLogo = ref(false);
const windowWidth = ref(window.innerWidth);

const isLogged = computed(() => {
  return !store.getters.token;
});

const checkScreen = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value <= 900) {
    store.commit("setMobile", true);
    hideLogo.value = true;
  } else {
    store.commit("setMobile", false);
    hideLogo.value = false;
  }
};
const updateScroll = () => {
  const scrollPosition = window.scrollY;
  if (scrollPosition >= 50) {
    scrolledNav.value = true;
  } else {
    scrolledNav.value = false;
  }
};

onMounted(() => {
  window.addEventListener("resize", checkScreen);
  window.addEventListener("scroll", updateScroll);
  checkScreen();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreen);
  window.removeEventListener("scroll", updateScroll);
});
</script>
<style scoped>
header {
  background-color: var(--white);
  z-index: 70;
  width: 100%;
  transition: 0.5s ease all;
  position: sticky;
  top: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
header nav {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 0;
  transition: 0.5s ease all;
  margin: 0 auto;
  width: 100%;
  position: relative;
}

header .navigation {
  display: flex;
  align-items: center;
  flex: 1;
  overflow-x: auto;
}
header .navigation::-webkit-scrollbar {
  display: none;
}
/*  */
@media (min-width: 71.25rem) {
  header nav {
    max-width: 1140px;
  }
}

@media (min-width: 40rem) {
  header nav {
    flex-direction: row;
    width: 90%;
  }

  .title {
    padding-left: 1.5625rem;
  }
  header .navigation {
    justify-content: flex-end;
  }
}

.title {
  align-self: center;
}

header nav ul,
header nav .link {
  color: #000;
  font-weight: 600;
  list-style: none;
  text-decoration: none;
}
header nav li {
  text-transform: uppercase;
  padding: 1rem;
  margin-left: 1rem;
  user-select: none;
}
header nav .link {
  font-size: 1rem;
  transition: 0.5s ease all;
  padding-bottom: 0.25rem;
  border-bottom: 0.25rem solid transparent;
}
header nav .link:hover {
  color: #d8323c;
}
header nav .link.not_logged {
  color: var(--mid_gray);
  pointer-events: none;
}
header nav .link.active {
  border-color: #d8323c;
}
header nav .logo {
  display: flex;
  align-items: center;
}
header nav .logo img {
  width: 3.125rem;
  transition: 0.5s ease all;
}

/* .scrolled-nav {
  background-color: rgb(245, 245, 245);
} */
.scrolled-nav nav {
  padding: 0.5rem 0;
}
.scrolled-nav nav .logo img {
  width: 2.5rem;
}
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: 1s ease all;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: translateX(-250px);
}
.mobile-nav-enter-to {
  transform: translateX(0);
}
</style>