<template>
  <div>
    <video
      id="video"
      width="640"
      poster="//shaka-player-demo.appspot.com/assets/poster.jpg"
      controls
      autoplay
      muted
    ></video>
  </div>
</template>

<script setup lang="ts">
// const manifestUri =
//   'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

const manifestUri =
  '/stream/terminator-3-rise-of-the-machines-2003-us-1705385000/master.m3u8';

// const manifestUri =
//   '/stream/terminator-3-rise-of-the-machines-2003-us-1705385000/stream.mpd';

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
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
  const player = new shaka.Player();
  await player.attach(video);

  // Attach player to the window to make it easy to access in the JS console.
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

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}

onMounted(() => {
  initApp();
});
</script>
