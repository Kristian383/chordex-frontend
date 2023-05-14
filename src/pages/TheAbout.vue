<template>
  <div class="about">
    <div class="about-picture">
      <img src="@/assets/green.jpg" alt="" />
    </div>
    <div class="about-text">
      <h2>Why should I use this website?</h2>
      <p>
        Do you play any <b>instrument</b> such as guitar, piano or bass? If so,
        then there is a good chance you'd find this website useful!
      </p>
      <p>
        What a better way of keeping the information about the songs than having
        it <u>all in one place</u> just with couple of clicks. <b>ChordEx</b> is
        imagined to be a virtual songbook where you can write your own
        information about songs that you learn or make. Not only can you easily
        refresh your memory, but also speed up the learning process and have
        more songs under your repertoire.
      </p>
      <p>
        Having insight of key and chord progressions of each song will
        eventually help you grasp concepts of writing a song. Keep all the main
        information at one place and learn much quicker!
      </p>
    </div>
    <contact-me />
  </div>
</template>

<script>
import ContactMe from "./../components/ui/auth/ContactMe.vue";

export default {
  components: {
    ContactMe,
  },
  mounted() {
    if (this.$route.path == "/about") {
      this.$store.commit("removeSidebar");
    }
  },
};
</script>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1600px;
  margin: 0 auto;
  justify-items: center;
  align-items: center;
  gap: 0.5rem;
}
@media (min-width: 1000px) {
  .about {
    grid-template-columns: repeat(2, 1fr);
  }
}

.about-picture {
  max-width: 600px;
  max-height: 600px;
}
.about-picture img {
  width: 100%;
  height: 100%;
}

.about-text {
  width: 100%;
  line-height: 31px;
  text-align: justify;
  border-top: 6px solid #59e4a8;
  padding: 16px;
}
.about-text h2 {
  text-align: center;
}

.about-text div {
  width: 100%;
}

.about-text p {
  max-width: 550px;
  font-size: 18px;
  margin: 0 auto;
  padding: 18px;
}
@media (min-width: 1000px) {
  .about-text h2 {
    text-align: start;
  }
  .about-text p {
    margin-left: 0;
    padding-left: 0;
  }
  .about-text {
    border-left: 6px solid #59e4a8;
    border-top: 0;
  }
}
</style>