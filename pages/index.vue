<template>
  <div class="video-container">
    <video id="video" width="640" controls autoplay muted playsinline></video>
  </div>
</template>

<script setup lang="ts">
const manifestUri = '/stream/movie/master.m3u8';

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
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  } catch (e) {
    // onError is executed if the asynchronous load fails.
    onError(e);
  }
}
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
