<template>
  <base-card>
    <section>
      <div class="metronome-view">
        <the-metronome />
      </div>
      <div class="blog-about-metronome">
        <div class="about-metronome">
          <h2>What is Metronome?</h2>
          <p>
            A metronome is a practice tool that produces a steady pulse (or
            beat) to help musicians improve their timing and rhythm. The pulses are
            measured in
            <b>beats-per-minute (BPM)</b>.
          </p>
          <p>
            And because metronome is fully integrated with the rest of the ChordEx platform, you can easily store and 
            organize all your practice sessions, notes, and recordings in one place.
            This makes it easy to track your progress over time, and stay motivated as you work towards your musical goals.
          </p>
          <p>
            You can also use the feature with <b>"Tap Tempo"</b> button to find out the rythm of a song.
            So whether you're a guitarist, pianist, drummer, or any other type of musician, Chordex's metronome is the perfect tool to help you take your playing to the next level. 
          </p>
        </div>
        <div class="about-usage">
          <h2>How to use ChordEx metronome?</h2>
          <p>
            This metronome also includes the possibility to adjust the accent (sincopation) of the first beat by <b>clicking</b> on the first beat circle.
          </p>
          <ul>
            <li>
              <b>Sincopation</b> - click on the first circle to toggle accent of
              the first beat
            </li>
            <li>
              <b>Tap tempo</b> - click the red button to find the rythm of the
              songs
            </li>
            <li>
              <b>Manually set tempo</b> - use the slider or the left / right
              arrow keys on your keyboard
            </li>
            <li>
              <b>Measure</b> - change the number of beats in a bar at the very
              bottom of metronome
            </li>
          </ul>
        </div>
        <div>
          <h2>Understanding Time Signatures</h2>
          <p>
            Time signatures are one of the most important indications in music.
            Understanding them is essential for musicians, whether you're a beginner or a professional.
            We use time signatures to help <b>divide music into phrases</b> and
            make it easier to <b>memorize and understand</b> music.
          </p>
          <p>
            They provide a framework for the music, helping musicians know when to play certain notes and for how long.
            This structure is critical when writing a song because it helps to ensure that the rhythm is consistent and supports 
            the melody and lyrics. It allows the songwriter to create a clear and organized framework for the song's structure and to
            control the pace and flow of the music.
          </p>
          <p>
            Time signatures consist of <b>two</b> numbers: a top number and a
            bottom number. The <b>top</b> number indicates the number of beats
            in each measure, while the <b>bottom</b> number tells you what note
            values those beats are. The <u>most used time</u> signature is
            <b>4/4.</b> If the bottom number is a 4, it means the beats are
            quarter notes (four quarter notes in a measure).
          </p>
        </div>
        <div>
          <h2>Why are Time Signatures Important?</h2>
          <p>
            They help musicians play together in time and establish the feel and groove of a song. 
            Understanding time signatures is also crucial for reading and writing music notation. 
            By understanding the number of beats in each measure and the corresponding note value, musicians can 
            accurately notate and play the rhythms in a piece of music.
          </p>
          <p>
            Different time signatures can create different rhythmic feels, and they are commonly used to give a 
            piece of music a specific groove or feel. For example, a 4/4 time signature is common in pop and rock music, while 
            a 3/4 time signature is often used in waltzes and other ballads.
          </p>
        </div>
      </div>
    </section>
  </base-card>
</template>

<script>
import TheMetronome from "../components/ui/TheMetronome.vue";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    TheMetronome,
  },
  setup() {
    const store = useStore();

    const sidebarIsActive = computed(() => {
      return store.getters.sidebarIsActive;
    });

    const isDesktop = computed(() => {
      return !store.getters.isMobile;
    });

    return {
      sidebarIsActive,
      isDesktop,
    };
  },
};
</script>

<style lang="scss" scoped>
.title-metronome {
  text-align: center;
}

.metronome-view {
  margin: 25px auto;
  background-color: #f1f1f1;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  max-width: 920px;

  @include md {
    border-radius: 16px;
  }
}

.blog-about-metronome {
  max-width: 720px;
  margin: 42px auto;
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 14px;

  @include md {
    gap: 44px;
  }

  p {
    line-height: 28px;
    color: #454545;
    font-size: 18px;
    margin-bottom: 18px;
  }

  mark {
    background-color: #ffcdd2;
    // color: white;
  }

  h2 {
    padding-left: 8px;
    margin-bottom: 14px;
    border-left: 5px solid $burgundy;
  }

  .about-usage {
    ul {
      list-style: none;
      list-style: circle inside;

      li {
        position: relative;
        margin-bottom: 18px;
      }
    }
  }
}
</style>