<template>
  <div class="video-container">
    <video
      ref="video"
      id="video"
      width="640"
      playsinline
      controls
      @loadedmetadata="playVideo"
    ></video>
  </div>

  <div></div>

  <div v-html="error" />
</template>

<script setup lang="ts">
const video = ref<HTMLVideoElement | null>(null);
const error = ref('');
const manifestUri =
  'https://vod06-cdn.fptplay.net/POVOD/encoded/2024/01/28/theaccidentalspy-2001-hk-1706408052/master.m3u8';

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  /*@ts-ignore*/
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  /*@ts-ignore*/
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}

async function initPlayer() {
  // Create a Player instance.
  const video = document.getElementById('video');
  /*@ts-ignore*/
  const player = new shaka.Player();
  await player.attach(video);

  // Attach player to the window to make it easy to access in the JS console.
  /*@ts-ignore*/
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
    await player.load(manifestUri);
    // listenPlayer();
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
    // playVideo();
  } catch (e) {
    // onError is executed if the asynchronous load fails.
    onError(e);
  }
}
const listenPlayer = () => {
  /*@ts-ignore*/
  const eventManager = new window.shaka.util.EventManager();
  eventManager.listenOnce(video.value, `play`, (ev: any) => {
    playVideo(ev);
  });
  eventManager.listenOnce(video.value, `playing`, () => {
    if (video.value) {
      // video.value.volume = 1;
    }
  });
};

const playVideo = (ev: any) => {
  error.value = error.value + '<br/>' + ' playVideo ' + ev.type;
  if (!video.value) {
    return;
  }

  try {
    const promise = video.value.play();
    if (promise) {
      promise
        .then(() => {
          console.log('play success');
        })
        .catch((e) => {
          console.log('ERROR auto play', e);
          error.value = e.message;
          if (video.value) {
            video.value.muted = true;
            playVideo(ev);
          }
        });
    } else {
      error.value = 'no promise';
    }
  } catch (e: any) {
    error.value = e.message;
  }
};

/*@ts-ignore*/
function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}
/*@ts-ignore*/
function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

onMounted(() => {
  initApp();
});
</script>
