<template>
  <footer id="footer">
    <div class="container">
      <!-- Column 1: Navigation Links -->
      <div class="footer-column">
        <nav class="footer-nav">
          <router-link to="/" class="footer-link">Home</router-link>
          <router-link to="/songs" class="footer-link">Chordex</router-link>
          <router-link to="/about" class="footer-link">About</router-link>
          <router-link to="/privacy-policy" class="footer-link">Privacy Policy</router-link>
        </nav>
      </div>

      <!-- Column 2: Ko-fi Link and Attribution -->
      <div class="footer-column">
        <a href="https://ko-fi.com/I2I0JPDGB" target="_blank">
          <img
            height="36"
            style="border:0px;height:36px;"
            src="https://storage.ko-fi.com/cdn/kofi3.png?v=3"
            border="0"
            alt="Buy Me a Coffee at ko-fi.com"
          />
        </a>
        <a
          class="free-pick-link"
          target="_blank"
          href="https://www.freepik.com/vectors/banner"
        >
          Photos by Freepik
        </a>
      </div>

      <!-- Column 3: Copyright and Spotify Logo -->
      <div class="footer-column">
        <span>&copy; Kristian Nenadovic 2024</span>
        <div style="margin-top: auto;" class="spotify-logo">
          <img src="./../../assets/spotify.webp" alt="Spotify music for song information" title="Spotify music" />
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: var(--f1_gray);
  padding: 1.5rem 0;
  margin-top: auto;
}

.container {
  display: flex;
  justify-content: space-between;
  max-width: 71.25rem;
  margin: 0 auto;
  gap: 2rem;
  padding: 1.25rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  text-decoration: none;
  color: black;
  text-align: left;
  font-size: 1rem;
  &:hover {
    color: var(--primary-color);
  }
}

.spotify-logo {
  width: 6rem;
  img {
    width: 100%;
  }
}

.free-pick-link {
  text-decoration: none;
  color: black;
  font-size: 0.75rem;
  &:hover {
    color: var(--primary-color);
  }
}
</style>
