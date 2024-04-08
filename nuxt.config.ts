// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      script: [
        // {
        //   src: 'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.7.11/shaka-player.compiled.min.js',
        // },
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.7.11/shaka-player.ui.min.js',
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/video.js@8.10.0/dist/video.min.js',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/video.js@8.10.0/dist/video-js.min.css',
        },
      ],
    },
  },
});
