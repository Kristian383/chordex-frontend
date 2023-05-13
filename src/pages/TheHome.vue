<template>
  <section>
    <div class="home-welcome-container">
      <div v-if="!isLogged" class="auth-form-container">
        <new-user-auth />
      </div>
      <div class="form-and-img-container" :class="{ logged: isLogged }">
        <div style="padding: 0 1rem">
          <h2>
            Welcome to Chord<span style="color: var(--burgundy)">Ex</span>, the ultimate music website!
          </h2>
          <h3>Customize your music library - keep track of songs and store them at one place</h3>
        </div>
        <div>
          <img src="@/assets/home.jpg" alt="musician" />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="app-preview-container">
      <div class="details-container">
        <div class="details-container-header">
          <h3>
            ORGANIZE YOUR CHORD PROGRESSIONS AND LYRICS
          </h3>
          <img src="@/assets/playlists.png" alt="musician" />
        </div>
        <p>
          Are you tired of losing track of the songs you've learned on your instrument?
        </p>
        <p>
          This app is designed specifically for musicians who want an easy
          and convenient way to store and organize their music.
        </p>
        <p>
          Whether you're a beginner or a pro, it has everything you need to take your music to the next level.
        </p>
      </div>
      <img
        style="filter: drop-shadow(2.5px 2.5px 5px #ccc)" src="@/assets/home_cards.png" alt="app design"
        class="app-image"
      />
    </div>
    <!-- items -->
    <div class="cards-container">
      <h2>VIRTUAL SONGBOOK FOR ANY MUSICIAN</h2>
      <div class="items">
        <div class="item" style="grid-area: item1;">
          <h4>YouTube video integration</h4>
          <img src="@/assets/yt.png" alt="YouTube" />
          <p>
            Paste YouTube link of a song or a lesson and have it displayed
            together with other song details such as chords, tempo etc.
          </p>
        </div>
        <div class="item" style="grid-area: item2;">
          <h4>Metronome</h4>
          <img src="@/assets/metro.png" alt="Metronome" />
          <p>
            After inserting tempo (BPM) of each song, you get a feature to play
            metronome and practice at the same time.
          </p>
        </div>
        <div class="item" style="grid-area: item3;">
          <h4>Virtual Songbook</h4>
          <img src="@/assets/book.png" alt="Virtual Songbook" />
          <p>
            <!-- Instead of having a book and carrying it all around, you can write
            it all here. -->
            Store all your favorite songs, chord progressions, and lyrics in one place.
          </p>
        </div>
        <div class="item" style="grid-area: item4;">
          <h4>Faster learning</h4>
          <img src="@/assets/thinking.png" alt="Faster learning" />
          <p>
            You can keep track of learned songs and easily recall all of them.
          </p>
        </div>
        <div class="item" style="grid-area: item5;">
          <h4>Playlists</h4>
          <img src="@/assets/playlist_.png" alt="Playlists" />
          <p>
            Easily organize and find your songs by adding them to custom playlists.
          </p>
        </div>
        <div class="item" style="grid-area: item6;">
          <h4>Song BPM and key</h4>
          <img src="@/assets/search.png" alt="Search song info" />
          <p>
            Find the BPM (tempo) and key of any song by typing in the artist and song name.
          </p>
        </div>
      </div>
    </div>
    <!-- products -->
    <div class="products-wrapper-bckg">
      <div class="products">
        <div class="product">
          <div class="product-image">
            <img src="@/assets/full.png" alt="logo" />
          </div>
          <div class="product-info">
            <p>Built-in features:</p>
            <ul>
              <li>Immediately get a song key and BPM</li>
              <li>Insert and watch YouTube video of a song/lesson</li>
              <li>Write and analyze chord progressions</li>
              <li>Built-in metronome</li>
              <li>Add songs to playlists</li>
              <li>Search and filter the songs</li>
              <li>Store often used websites in a list</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <scroll-up :class="{ show: showBackToTop }" />
  </section>
</template>

<script>
import NewUserAuth from "./../components/ui/auth/new-api/NewUserAuth.vue";
export default {
  components: {
    NewUserAuth,
  },
  data() {
    return {
      showBackToTop: false,
    };
  },
  computed: {
    isLogged() {
      return !!this.$store.getters.token;
    },
  },
  mounted() {
    if (this.$route.path == "/home") {
      this.$store.commit("removeSidebar");
    }

    window.addEventListener("scroll", this.showButtonUp);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.showButtonUp);
  },
  methods: {
    showButtonUp() {
      if (window.scrollY > 800) {
        this.showBackToTop = true;
      } else if (window.scrollY < 800) {
        this.showBackToTop = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home-welcome-container {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 106.25rem;
  margin: 0 auto;
  height: 100%;
  gap: 1rem;

  .auth-form-container {
    position: relative;
    // min-height: 37.5rem;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: start;
  }
  
  .form-and-img-container {
    // height: 90vh;
    text-align: center;
    padding-top: 1rem;

    h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    img {
      width: 100%;
      height: 100%;
      max-height: 500px;
      object-fit: contain;
    }
  }
  
  @media (min-width: 1000px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 0;
      .auth-form-container {
        margin-top: 5.625rem;
      }
      .form-and-img-container {
        grid-column: 2/4;
        padding-top: 5.625rem;
      }
      .form-and-img-container.logged {
        grid-column: 1/4;
      }
  }
}

.app-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  .app-image {
      width: 100%;
      height: 100%;
      max-height: 700px;
      object-fit: contain;
    }

    .details-container {
      border-top: 6px solid #ff4f5a;
      padding: 1rem;
      position: relative;
      color: var(--dark_blue_sidebar);
      // background-color: #f8f8f8;
      background: #FFE5E6;
      background: linear-gradient(120deg, rgba(255,229,230,1) 0%, rgba(255,229,230,1) 35%, rgba(255,255,255,1) 100%);
      // box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px 0, rgba(0, 0, 0, 0.1) 0 0 1px 0;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

      .details-container-header {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        padding-bottom: 0.5rem;

        h3 {
          // color: var(--burgundy);
          text-align: center;
        }
      }

      p {
        font-size: 1.25rem; 
        margin-bottom: 1rem;
      }

      @media (min-width: 1000px) {
        padding: 1rem 2rem 2rem 2rem; 
        border-radius: 0.75rem;
        border-top: 0;
      }
    }
}
/* card items */
.cards-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  background: #f8f8f8;
  background: linear-gradient(20deg, rgba(242,242,242,1) 0%, rgba(255,255,255,1) 100%);
  margin-top: 1.5rem;
  padding: 1.75rem 0.5rem;
  gap: 1.5rem;
  text-align: center;

  .items {
    padding: 0.5rem;
    display: grid;
    max-width: 1700px;
    margin: 0 auto;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 2rem;
    grid-template-areas:
      "item1"
      "item2"
      "item3"
      "item4"
      "item5"
      "item6";

    @media (min-width: 720px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
      "item1 item2"
      "item3 item4"
      "item5 item6";
    }
    @media (min-width: 1350px) {
        grid-template-areas: 
        "item1 item2 item3 item4"
          ". item5 item6 .";
    }
  }
}

.items .item {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  background-color: #fff;
  gap: 18px;
  transition: 0.3s ease-in all;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
  padding: 14px;
}
.items .item:hover {
  transform: rotateZ(-1deg) scale(1.04);
}
.items .item p {
  text-align: center;
  color: var(--dark_gray_font);
  line-height: 24px;
}
.products-wrapper-bckg {
  height: 100%;
  padding-bottom: 18px;
}
.products {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1700px;
  margin: 0 auto;
}

.product {
  display: grid;
  height: 600px;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
}
.product-image {
  order: 2;
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0 0.5rem;
}
.product-info {
  background-color: #fff;
  display: flex;
  color: var(--dark_gray_font);

  flex-direction: column;
  padding: 24px;
  border-radius: 8px;
  font-size: 20px;
  line-height: 28px;
  gap: 44px;
  order: 1;
  max-width: 600px;
}
.product-info p {
  font-weight: 600;
  max-width: 500px;
}

.product-info ul {
  list-style: none;
}
.product-info ul li {
  padding-top: 8px;
}
.product-info ul li:before {
  /* content: "\2713\0020"; */
  /* content:"\2611\0020";  */
  content: "\2714\0020";
  color: var(--green);
}
@media (min-width: 1000px) {
  .product {
    grid-template-columns: 1fr 1fr;
  }
}
</style>