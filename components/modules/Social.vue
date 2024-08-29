<script setup lang="ts">
const config = useAppConfig()
const social = config.social || []
const swiperSlideGroup = computed(() => {
  // 将socialLink分组 4个一组
  const result = []
  for (let i = 0; i < social.length; i += 4)
    result.push(social!.slice(i, i + 4))
  return result
})
const tip = ref<string | undefined>('')
</script>

<template>
  <div class="social-module my-5 max-w-md w-full rounded-3 h-12 ">
    <Swiper
      :modules="[SwiperNavigation]"
      :navigation="{ nextEl: '.swiper-button-next',
                     prevEl: '.swiper-button-prev' }"
      :space-between="40"
      class="swiper-wrapper"
    >
      <SwiperSlide v-for="(array, index) in swiperSlideGroup" :key="index">
        <ul flex items-center justify-center h-full>
          <li v-for="(item) in array" :key="item.title" flex items-center justify-center w-25>
            <a
              class="hover-scale"
              :href="item.url"
              target="_blank"
              relative
              @mouseenter="tip = item.tip"
              @mouseleave="tip = ''"
            >
              <Icon :icon="item.icon" :src="item.src" size="7" />
            </a>
            <div pointer-events-none :display="!!tip" class="absolute bottom-0 left-0 right-0 text-center text-xs text-white bg-black bg-opacity-50 rounded-b-3">
              {{ tip }}
            </div>
          </li>
        </ul>
      </SwiperSlide>
    </Swiper>
    <div v-if="swiperSlideGroup.length > 1" class="swiper-button-prev swiper-button-next-ico" />
    <div v-if="swiperSlideGroup.length > 1" class="swiper-button-next swiper-button-prev-ico" />
  </div>
</template>

<style lang="scss" scoped>
.social-module {
  -webkit-backdrop-filter: blur(0);
  backdrop-filter: blur(0);
  animation: fade 0.5s;
  transition:
    background-color 0.3s,
    backdrop-filter 0.3s;

  &:hover {
    background-color: #00000040;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
  .swiper-button-prev-ico,
  .swiper-button-next-ico {
    -webkit-color: rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0.5);
    --swiper-navigation-size: 24px;
  }
}
</style>
