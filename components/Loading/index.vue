<script setup lang="ts">
const global = useGlobal()
const config = useAppConfig()

// TODO: 通过 nuxtApp.hook('page:finish') 来监听页面加载完成事件
// const nuxtApp = useNuxtApp()
// nuxtApp.hook('page:finish',() => {
//   global.loaded.value = true
// })
</script>

<template>
  <div class="loader-wrapper" :class="{ loaded: global.loaded.value }">
    <div class="loader">
      <div class="loader-circle" />
      <div class="loader-text">
        <span class="name">{{ config.title }}</span>
        <span class="tip"> 加载中...</span>
      </div>
    </div>
    <div class="loader-section" />
  </div>
</template>

<style lang="scss" scoped>
.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: hidden;
  .loader {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .loader-circle {
      border-radius: 50%;
      width: 4px;
      height: 4px;
      background: #fff;
      animation-name: pacman-dot;
      transform: translateX(14px);

      &::before,
      &::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        border: 14px solid #fff;
        border-right-color: transparent;
        top: -12px;
        left: -24px;
      }

      &,
      &::before,
      &::after {
        animation: {
          duration: 0.5s;
          timing-function: linear;
          iteration-count: infinite;
        }
      }

      &::before {
        animation-name: upper-jaw;
      }
      &::after {
        animation-name: lower-jaw;
      }
    }
    .loader-text {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      z-index: 2;
      margin-top: 40px;
      font-size: 24px;
      .tip {
        margin-top: 6px;
        font-size: 18px;
        opacity: 0.6;
      }
    }
  }
  .loader-section {
    width: 100%;
    height: 100%;
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(13, 13, 66, 1) 35%, rgba(20, 158, 186, 1) 100%);
  }
}
.loaded {
  visibility: hidden;
  transform: translateX(100%);
  transition:
    transform 0.3s 1s ease-out,
    visibility 0.3s 1s ease-out;
  .loader {
    .loader-circle,
    .loader-text {
      opacity: 0;
      transition: opacity 0.3s ease-out;
    }
  }
  .loader-section {
    transform: translateX(100%);
    transition: transform 0.5s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
@keyframes pacman-dot {
  0%,
  50% {
    background-color: #fff;
  }
  51%,
  100% {
    background-color: transparent;
  }
  0%,
  100% {
    transform: translateX(19px);
  }
  50% {
    transform: translateX(14px);
  }
}
@keyframes upper-jaw {
  50% {
    transform: rotate(50deg) translate(2px, -2px);
  }
}

@keyframes lower-jaw {
  50% {
    transform: rotate(-50deg) translate(2px, 2px);
  }
}
</style>
