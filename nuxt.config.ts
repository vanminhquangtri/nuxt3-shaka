// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      script: [
        {
          src: '/shaka-player/4.7.12/shaka-player.ui.min.js',
        },
        {
          src: '/video.js/8.10.0/video.min.js',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: '/shaka-player/4.7.12/controls.min.css',
        },
        {
          rel: 'stylesheet',
          href: '/video.js/8.10.0/video-js.min.css',
        },
      ],
    },
  },
});
