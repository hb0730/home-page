<script setup lang="ts">
const global = useGlobal()

/**
 * 加载完成
 */
function loaded() {
  setTimeout(
    () => {
      global.loaded.value = true
    },
    Math.floor(Math.random() * (600 - 300 + 1)) + 300,
  )
}
</script>

<template>
  <div class="cover">
    <nuxt-img :src="global.bgUrl.value" class="bg" alt="cover" @load="loaded" @error="loaded" />
    <div class="gray" />
  </div>
</template>

<style lang="scss" scoped>
.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.25s;
  z-index: -1;

  // &.show {
  //   // z-index: 1;
  // }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    filter: blur(20px) brightness(0.3);
    transition:
      filter 0.3s,
      transform 0.3s;
    animation: fade-blur-in 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.45s;
  }
  .gray {
    opacity: 1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.5) 100%),
      radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);

    transition: 1.5s;
    &.hidden {
      opacity: 0;
      transition: 1.5s;
    }
  }
}
@keyframes fade-blur-in {
  from {
    filter: blur(20px) brightness(0.3);
    transform: scale(1.6);
  }
  to {
    filter: blur(0) brightness(1);
    transform: scale(1.2);
  }
}
</style>
