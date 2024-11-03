const SitemapPlugin = require('sitemap-webpack-plugin').default;

const paths = [
  { path: "/", priority: 1.0 },                  // Redirect to /home
  { path: "/home", priority: 1.0 },              // Home page
  { path: "/about", priority: 0.9 },             // About page
  { path: "/songs", priority: 0.9 },             // All Songs page
  { path: "/profile", priority: 0.7 },           // User Profile page
  { path: "/artists", priority: 0.7 },           // All Artists page
  { path: "/new", priority: 0.7 },               // Add Song page
  { path: "/find-key", priority: 0.7 },          // Music Keys page
  { path: "/song-keys", priority: 0.7 },         // Songs by Keys page
  { path: "/resources", priority: 0.7 },         // Useful websites page
  { path: "/metronome", priority: 0.9 },         // Metronome page
  { path: "/resetpswd", priority: 0.6 },         // Reset Password page
  { path: "/delete-acc", priority: 0.5 },        // Delete Account page
  { path: "/privacy-policy", priority: 0.5 },    // Privacy policy page
];
// { path: "/songs/:songId", priority: 0.9 },     // Song Detail page

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/index.scss";`,
      },
    },
  },
  configureWebpack: {
    plugins: [
      new SitemapPlugin({ base: 'https://chordex.net', paths })
    ]
  }
};
