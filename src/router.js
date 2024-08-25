import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";

// const Songs = () => import('./pages/Songs.vue');
import Songs from "./pages/Songs.vue";
const TheHome = () => import('./pages/TheHome.vue');
const UserProfile = () => import('./pages/UserProfile.vue');
const SongDetail = () => import('./pages/SongDetail.vue');
const ArtistsView = () => import('./pages/ArtistsView.vue');
const AddSong = () => import('./pages/AddSong.vue');
const ResetPassword = () => import('./pages/ResetPassword.vue');
const DeleteAccount = () => import('./pages/DeleteAccount.vue');
const FindKey = () => import('./pages/FindKey.vue');
const TheAbout = () => import('./pages/TheAbout.vue');
const ResourcesList = () => import('./components/ui/ResourcesList.vue');
const NotFound = () => import('./pages/NotFound.vue');
const MetronomeView = () => import('./pages/MetronomeView.vue');
const SongKeysAccordion = () => import('./pages/SongKeysAccordion.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      component: TheHome,
      name: "Home",
      meta: { 
        title: "Home | Chordex", 
        requiresUnauth: true, 
        description: "Customize your music library, keep track of songs and store them at one place with Chordex.", 
        canonicalUrl: "https://chordex.net/home" },
    },
    {
      path: "/about",
      component: TheAbout,
      name: "About",
      meta: { 
        title: "About | Chordex", 
        requiresUnauth: true, 
        description: "ChordEx is imagined to be a virtual songbook where you can write your own information about songs that you learn or make.", 
        canonicalUrl: "https://chordex.net/about" },
    },
    {
      path: "/songs",
      component: Songs,
      name: "All Songs",
      meta: { title: "Songs | Chordex",
        requiresAuth: true,
        canonicalUrl: "https://chordex.net/songs",
        description: "Browse your collection of songs, featuring various genres and styles. Find the perfect song for practice, performance, or enjoyment."
       },
    },
    {
      path: "/songs/:songId",
      component: SongDetail,
      name: "SongDetail",
      meta: { 
        title: "Song Detail | Chordex", 
        requiresAuth: true, 
        description: "Explore detailed information about this song, including its chords, lyrics, and other relevant data. Enhance your music experience with in-depth insights."
      },
      props: true,
    },

    {
      path: "/profile",
      component: UserProfile,
      name: "Account Settings",
      meta: { 
        title: "My Profile | Chordex", 
        requiresAuth: true, 
        canonicalUrl: "https://chordex.net/profile",
        description: "Manage your account settings, update your profile, and view your activity. Customize your Chordex experience to fit your musical preferences."
     },
    },
    {
      path: "/artists",
      component: ArtistsView,
      name: "All Artists",
      meta: { 
        title: "Artists | Chordex", 
        requiresAuth: true, 
        canonicalUrl: "https://chordex.net/artists",
        description: "Explore all the songs by your favorite artists. Discover a comprehensive list of tracks from various musicians and enjoy an extensive selection of music."
     },
    },
    {
      path: "/new",
      component: AddSong,
      name: "Add Song",
      meta: { 
        title: "Add Song | Chordex", 
        requiresAuth: true, 
        canonicalUrl: "https://chordex.net/new",
        description: "Add new songs to our database with ease. Share your favorite tracks and contribute to our growing collection of music."
     },
    },
    {
      path: "/new/:songId",
      component: AddSong,
      name: "Edit Song",
      meta: { 
        title: "Edit Song | Chordex", 
        requiresAuth: true,
        description: "Edit details for an existing song, including chords, lyrics, and other information. Keep our music collection up-to-date with your contributions."
      },
    },
    {
      path: "/find-key",
      component: FindKey,
      name: "Music Keys",
      meta: { 
        title: "Find Key | Chordex", 
        requiresAuth: true, 
        canonicalUrl: "https://chordex.net/find-key",
        description: "Utilize our tools to find the key of any song quickly. Perfect for musicians looking to transpose or analyze music."
     },
    },
    {
      path: "/song-keys",
      component: SongKeysAccordion,
      name: "Songs by Keys",
      meta: { 
        title: "Song Keys | Chordex",
        requiresAuth: true,
        canonicalUrl: "https://chordex.net/song-keys",
        description: "Explore songs organized by musical keys. Easily find songs that fit specific keys for practice or composition."
      },
    },
    {
      path: "/resources",
      component: ResourcesList,
      name: "Useful websites",
      meta: { 
        title: "Websites | Chordex",
        requiresAuth: true,
        canonicalUrl: "https://chordex.net/resources",
        description: "Make a list of your essential websites and tools to enhance your Chordex experience. Find valuable shortcuts to chord libraries, music theory resources, and other useful sites for musicians."
     },
    },
    {
      path: "/metronome",
      component: MetronomeView,
      name: "Metronome and Tap Tempo / Beats Per Minute",
      meta: { 
        title: "Metronome | Chordex",
        canonicalUrl: "https://chordex.net/metronome",
        description: "Use our metronome tool for precise tempo control and beat timing. Ideal for practice, composition, and improving your rhythm."
      },
    },
    {
      path: "/resetpswd",
      component: ResetPassword,
      name: "Reset Password",
      meta: { 
        title: "Reset Password | Chordex",
        resetPassword: false,
        requiresAuth: true,
        canonicalUrl: "https://chordex.net/resetpswd",
        description: "Reset your password if you’ve forgotten it. Follow the steps to securely update your account credentials and regain access."
      },
    },
    {
      path: "/delete-acc",
      component: DeleteAccount,
      name: "Delete Account",
      meta: { 
        title: "Delete Account | Chordex",
        requiresAuth: true,
        canonicalUrl: "https://chordex.net/delete-acc",
        description: "Permanently delete your account and remove all associated data. Ensure this action is what you want before proceeding."
      },
    },
    {
      path: "/:notFound(.*)*",
      component: NotFound,
      meta: { 
        title: "Page Not Found | Chordex",
        description: "The page you’re looking for could not be found. Check the URL or return to the homepage for more options.",
        canonicalUrl: "https://chordex.net/"
     },
    },
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0, behavior: "smooth" };
    }
  },
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}` || "Chordex";
  to.meta.previousRoute = from;

  // Remove existing canonical link tags
  document.querySelectorAll('link[rel="canonical"]').forEach(tag => tag.remove());

  // Add new canonical link tag
  if (to.meta.canonicalUrl) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', to.meta.canonicalUrl);
    document.head.appendChild(link);
  }

  // Remove existing description meta tags
  document.querySelectorAll('meta[name="description"]').forEach(tag => tag.remove());

  // Add new description meta tag
  if (to.meta.description) {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', to.meta.description);
    document.head.appendChild(meta);
  }

  if (to.meta.requiresAuth && !store.getters.token) {
    next("/home");
  } else if (store.getters.isMobile) {
    store.commit("removeSidebar");
    next();
  } else {
    next();
  }
});

export default router;
