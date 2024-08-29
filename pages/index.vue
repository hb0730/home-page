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
    <div class="container" px-3 ma w-full h-full flex items-center justify-center>
      <div v-if="windowStore.isSmallScreen.value" w-full h-full>
        <Swiper
          :modules="[SwiperMousewheel]"
          :slides-pre-view="1"
          :space-between="40"
          :mousewheel="true"
          :centered-slides="true"
          class="w-full h-full "
        >
          <SwiperSlide>
            <div h-full flex items-center flex-col justify-center>
              <ModulesProfile />
              <ModulesSocial />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div h-full flex items-center flex-col justify-center>
              <ModulesTimes />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div h-full flex items-center flex-col justify-center>
              <ModulesTimeCapsule />
              <ModulesSites />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div v-else w-full h-full flex justify-center items-center>
        <div class="left" flex-1>
          <ModulesProfile />
          <ModulesSocial />
        </div>
        <div class="right w-50%" ml-3>
          <Swiper
            :modules="[SwiperMousewheel]"
            :slides-pre-view="1"
            :space-between="40"
            :mousewheel="true"
          >
            <SwiperSlide>
              <ModulesTimes />
            </SwiperSlide>
            <SwiperSlide>
              <ModulesTimeCapsule />
            </SwiperSlide>
          </Swiper>
          <div class="mt-3">
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
