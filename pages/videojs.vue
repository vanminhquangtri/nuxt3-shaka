<template>
  <div>
    <video
      width="640"
      id="vid"
      class="video-js vjs-tech vjs-default-skin"
      muted
      autoplay
      playsinline
      ref="video"
      style="max-width: 100%"
    ></video>
  </div>
</template>

<script lang="ts" setup>
// const manifestUri =
//   'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

const manifestUri =
  '/stream/terminator-3-rise-of-the-machines-2003-us-1705385000/master.m3u8';

// const manifestUri =
//   '/stream/terminator-3-rise-of-the-machines-2003-us-1705385000/stream.mpd';
const video = ref(null);

const initPlayer = () => {
  if (typeof (window as any).videojs !== 'undefined') {
    try {
      (window as any).player = (window as any).videojs(
        video.value,
        {
          controls: true,
          autoplay: true,
          muted: true,
          sources: [
            {
              src: manifestUri,
              // src: DEMO_STREAM_MULTISUBAUDIO,
              type: 'application/x-mpegURL',
            },
          ],
        },
        () => {
          console.log('---LOADED PLAYER');
        },
      );
    } catch (error) {
      console.log('error :>> ', error);
    }
  }
};

onMounted(() => {
  initPlayer();
});
</script>
