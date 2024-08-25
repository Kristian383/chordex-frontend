<template>
  <base-card>
    <section>
      <header /> <!-- background-image -->
      <main>
        <div class="row">
          <div class="user-info">
            <div class="photo">
              <img
                class="profile-photo" alt="Profile" :title="getUserData.username"
                src="@/assets/home.webp"
              />
            </div>
            <h4 class="name">{{ getUserData.username }}</h4>
            <p class="mail">{{ getUserData.email }}</p>
            <!--  -->
            <div class="stats row">
              <div class="stat">
                <p class="number-stat">{{ numOfSongs }}</p>
                <p class="desc-stat">Songs</p>
              </div>
              <div class="stat">
                <p class="number-stat">{{ numOfArtists }}</p>
                <p class="desc-stat">Artists</p>
              </div>
              <div class="stat">
                <p class="number-stat">{{ numOfMySongs }}</p>
                <p class="desc-stat">My Songs</p>
              </div>
            </div>
            <!--  -->
          </div>
          <div class="right">
            <div class="container">
              <!-- username -->
              <div>
                <label class="form-control-label" for="input-username">
                  Username
                </label>
                <input
                  id="input-username"
                  type="text"
                  :value="getUserData.username"
                  disabled
                />
              </div>
              <!-- email -->
              <div>
                <label class="form-control-label" for="input-email">
                  Email
                </label>
                <input
                  id="input-email"
                  type="text"
                  :value="getUserData.email"
                  disabled
                />
              </div>
              <!-- delete acc -->
              <div class="container">
                <p class="delete" @click="openDeleteModal">Delete my account</p>
                <div class="loader">
                  <the-loader v-if="requestIsPending"></the-loader>
                </div>
                <p> {{ respondMsg }} </p>
              </div>
            </div>
          </div>
        </div>
        <!-- delete-modal -->
        <transition name="fade">
          <delete-modal
            v-if="showDeleteModal"
            @close-modal="closeDeleteModal"
            @send-delete="submitDeleteRequest"
          ></delete-modal>
        </transition>
      </main>
    </section>
  </base-card>
</template>

<script>
import { ref, computed, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
const DeleteModal = defineAsyncComponent(() => import('../components/ui/DeleteModal.vue'));

export default {
  components: {
    DeleteModal,
  },
  setup() {
    const requestIsPending = ref(false);
    const respondMsg = ref("");
    const respondMsgSuccess = ref(false);

    const showDeleteModal = ref(false);

    const store = useStore();

    function closeDeleteModal() {
      showDeleteModal.value = false;
    }

    function openDeleteModal() {
      showDeleteModal.value = true;
    }

    function submitDeleteRequest() {
      requestIsPending.value = true;
      showDeleteModal.value = false;

      store
        .dispatch("requestDeleteAccount", {
          email: getUserData.value.email,
        })
        .then((res) => {
          requestIsPending.value = false;
          if (res == true) {
            respondMsg.value =
              "An email for deleting your account has been sent to you.";
            respondMsgSuccess.value = true;
          } else {
            respondMsg.value =
              "Looks like something went wrong on our side. Please report to admin.";
            respondMsgSuccess.value = false;
          }
        });
    }

    const getUserData = computed(() => {
      return store.getters.user;
    });

    const numOfSongs = computed(() => {
      return store.getters.getAllSongs.length;
    });

    const numOfMySongs = computed(() => {
      return store.getters.getAllMySongs.length;
    });

    const numOfArtists = computed(() => {
      return store.getters.getArtists.length;
    });

    return {
      requestIsPending,
      respondMsg,
      getUserData,
      numOfSongs,
      numOfMySongs,
      numOfArtists,
      submitDeleteRequest,
      respondMsgSuccess,
      closeDeleteModal,
      openDeleteModal,
      showDeleteModal,
    };
  },
};
</script>

<style scoped>
header {
  background-image: url("../assets/sky.webp");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-top-left-radius: 0.3125rem;
  border-top-right-radius: 0.3125rem;
  height: 9.375rem;
}

.row {
  display: grid;
  color: var(--font_black);
  font-size: 1.125rem;
}

@media (min-width: 800px) {
  header {
    height: 15.625rem;
  }
}
@media (min-width: 1000px) {
  header {
    height: 15.625rem;
  }
  .row {
    grid-template-columns: 1fr 1fr;
  }
}

.user-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  max-width: 31.25rem;
  padding: 0.5rem;
}

.profile-photo {
  object-fit: cover;
  width: 12.5rem;
  height: 12.5rem;
  margin-top: -7.5rem;
  border-radius: 6.25rem;
  border: 0.25rem solid var(--white);
}
.name {
  margin-top: 1.25rem;
  font-weight: 600;
  font-size: 1.5rem;
}
.mail {
  margin-bottom: 0.3125rem;
  font-size: 1rem;
  color: var(--mid_gray);
}
.stats {
  margin-top: 1.5625rem;
  text-align: center;
  display: flex;
  widows: 100%;
  gap: 1.25rem;
  padding-bottom: 1.25rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--mid_gray);
}
.number-stat {
  padding: 0;
  font-weight: bold;
  color: #aaa;
  color: RGB(16, 17, 20);
}
.desc-stat {
  color: #888888;
}

/* username, email, pswd */
.right {
  padding: 0.875rem;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container > div {
  padding: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 25rem;
  width: 100%;
}
.container > div input {
  border: 0;
  padding: 0.75rem;
  border-radius: 0.5rem;
  outline: 0;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  color: RGB(16, 17, 20);
  font-size: inherit;
  margin-top: 0.875rem;
  cursor: pointer;
  transition: 0.4s;
  background-color: var(--form_gray);
}

.delete {
  color: red;
  font-size: 0.875rem;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>