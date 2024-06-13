<template>
  <div>
    <div class="nav-container">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/shaka">Shaka Player</NuxtLink>
      <NuxtLink to="/videojs">Video.js Player</NuxtLink>
    </div>
    <slot />
  </div>
</template>
<script lang="ts" setup></script>

<style>
.video-container {
  display: flex;
  justify-content: center;
}

video {
  max-width: 100%;
}

.nav-container {
  display: flex;
  justify-content: center;
  gap: 12px;
  align-items: center;
  margin-bottom: 24px;
}
</style>
