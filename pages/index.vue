<script setup lang="ts">
const nuxtApp = useNuxtApp()
const windowStore = useWindow()

// ssr 下单独处理
nuxtApp.hook('page:finish', () => {
  windowStore.onResize()
})
</script>

<template>
  <div class="main" absolute top-0 left-0 w-full h-full>
    <div class="container" px-3 p-t-1 ma p-b-15 w-full h-full flex items-center justify-center>
      <div v-if="windowStore.isSmallScreen.value" w-full h-full>
        <swiper-container :slide-pre-view="1" :space-between="40" :mousewheel="true" :centered-slides="true"  class="w-full h-full ">
          <swiper-slide>
            <div h-full flex items-center flex-col justify-center overflow-auto scrollbar-none>
              <ModulesProfile />
              <ModulesSocial />
            </div>
          </swiper-slide>
          <swiper-slide>
           <div h-full flex items-center flex-col justify-center overflow-auto scrollbar-none>
              <ModulesTimes />
            </div>
          </swiper-slide>
          <swiper-slide>
            <div h-full flex items-center flex-col justify-center overflow-auto scrollbar-none>
              <ModulesTimeCapsule />
              <ModulesSites />
            </div>
          </swiper-slide>
        </swiper-container>
      </div>
      <div v-else w-full h-full flex justify-center items-center>
        <div class="left" flex-1 overflow-auto scrollbar-none>
          <ModulesProfile />
          <ModulesSocial />
        </div>
        <div class="right w-50%" ml-3>
          <swiper-container :mousewheel="true" :slide-pre-view="1" :space-between="40" >
            <swiper-slide>
              <ModulesTimes />
            </swiper-slide>
            <swiper-slide>
              <ModulesTimeCapsule />
            </swiper-slide>
          </swiper-container>
          <div class="mt-3" overflow-auto scrollbar-none>
            <WidgetSites />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  transform: scale(1.2);
  transition: transform 0.3s;
  animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s;
}
@keyframes fade-blur-main-in {
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}
</style>
