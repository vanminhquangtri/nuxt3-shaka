<template>
  <div class="video-container">
    <video
      width="640"
      id="vid"
      class="video-js vjs-tech vjs-default-skin"
      muted
      autoplay
      playsinline
      ref="video"
    ></video>
  </div>
</template>

<script lang="ts" setup>
const manifestUri = '/stream/movie/master.m3u8';

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
