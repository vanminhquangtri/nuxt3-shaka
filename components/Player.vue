<template>
  <div class="video-container">
    <div>
      <div
        style="
          width: 100%;
          max-width: 100%;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        "
      >
        <input
          type="text"
          style="width: 100%; max-width: 100%; padding: 6px"
          v-model="url"
        />
        <button
          style="
            padding: 6px;
            cursor: pointer;
            background-color: #fe592a;
            border: 1px solid #fe592a;
          "
        >
          Play
        </button>
      </div>
      <div
        style="border: 1px solid green; position: relative"
        ref="playerContainerRef"
      >
        <video id="video" width="640" autoplay muted playsinline></video>
        <div
          v-if="error"
          style="
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <span>
            {{ error }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div></div>

  <div v-html="error" />
</template>

<script setup lang="ts">
const LIVE_NON_DRM_CONFIG: object = {
  streaming: {
    retryParameters: {
      timeout: 3000,
      maxAttempts: 1,
      baseDelay: 2000,
      backoffFactor: 2,
      fuzzFactor: 0.5,
    },
  },
  manifest: {
    retryParameters: {
      timeout: 3000,
      maxAttempts: 5,
      baseDelay: 200,
      backoffFactor: 2,
      fuzzFactor: 0.5,
    },
  },
  abr: {
    enabled: true,
  },
};
const video = ref<HTMLVideoElement | null>(null);
const manifestUri =
  'https://vod06-cdn.fptplay.net/POVOD/encoded/2024/01/28/theaccidentalspy-2001-hk-1706408052/master.m3u8';

const url = ref(
  'https://vod03-cdn.fptplay.net/POVOD/encoded/2024/04/10/vayhamkhongloithoat-theroundupnowayout-2023-ms-1712745686/H264/master.m3u8',
);

// const url = ref(
//   'https://vips-livecdn.fptplay.net/MTA4NDUxNDB8dnR2MWhkX3ZobHMuc21pbHxmcHR8MTcxODI3MTU2MnwxMDAuOTEuMTI1Ljd8NDBkZjAyYTVjMDE0ODBiOWYzMWVjOTM2N2Q0MjZkOTg/fnxhd1/vtv1hd_vhls.smil/playlist.m3u8',
// );

const error = ref('');
const playerContainerRef = ref('');

const initUi = () => {
  const video = document.getElementById('video');
  const uiConfig = {
    addSeekBar: true,
    controlPanelElements: [
      'play_pause',
      'mute',
      'volume',
      'live',
      'time_and_duration',
      'spacer',
      'fullscreen',
    ],
    seekBarColors: {
      buffered: 'rgba(255, 101, 0, 0.596)',
      played: 'rgba(255, 101, 0)',
    },
    volumeBarColors: {
      level: 'rgba(255, 101, 0)',
    },
  };
  try {
    if (!video || !playerContainerRef.value) {
      return;
    }
    //setting up shaka player UI overlay
    const ui = new window.shaka.ui.Overlay(
      window.player,
      playerContainerRef.value,
      video,
    );
    //pass in custom uiConfig
    ui.configure(uiConfig);
  } catch (error) {
    onError(error);
  }
};
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
  player.configure(LIVE_NON_DRM_CONFIG);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
    await player.load(url.value);
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
    initUi();
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
function onError(err) {
  // Log the error.
  error.value = err?.message;
}

onMounted(() => {
  initApp();
});
</script>
