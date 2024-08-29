<script setup lang="ts">
const appConfig = useAppConfig()
const siteLinks = appConfig.website || []
const siteLinkArray = computed(() => {
  const result = []
  for (let i = 0; i < siteLinks.length; i += 6) {
    const subArr = siteLinks.slice(i, i + 6)
    result.push(subArr)
  }
  return result
})
</script>

<template>
  <div class="sites">
    <div flex items-center text-size-lg class="mt-[2rem] m-x-[0.25rem] m-b-[1rem]">
      <Icon class="i-ri-link " />
      <span class="text-size-xl ml-2 text-shadow-[0_0_5px_rgba(0,0,0,.3137254902)]">网站列表</span>
    </div>
    <Swiper
      v-if="siteLinks.length > 0"
      :modules="[SwiperPagination, SwiperMousewheel]"
      :slides-pre-view="1"
      :space-between="40"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true,
        bulletElement: 'div',
      }"
      :mousewheel="true"
      :nested="true"
    >
      <SwiperSlide v-for="site in siteLinkArray" :key="site">
        <!-- 宫格 一行三个 -->
        <div class="grid grid-cols-3 gap-4">
          <a
            v-for="item in site"
            :key="item.title"
            class="widget site-item h-[6.5rem] flex items-center justify-center p-x-2 max-md:flex-col"
            :href="item.url"
            target="_blank"
          >
            <Icon :icon="item.icon" :src="item.src" size="8" />
            <span class="ml-2 text-size-lg text-shadow-[0_0_5px_#00000050] text-hidden">{{ item.title }}</span>
          </a>
        </div>
      </SwiperSlide>
      <div class="swiper-pagination" />
    </Swiper>
  </div>
</template>

<style lang="scss" scoped>
 .swiper {
  .swiper-pagination {
    position: static;
    margin-top: 4px;
    :deep(.swiper-pagination-bullet) {
      background-color: #fff;
      width: 18px;
      height: 4px;
      border-radius: 4px;
      transition: opacity 0.3s;
      &:hover {
        opacity: 1;
      }
    }
  }
}
.site-item {
  animation: fade 0.5s;
  &:hover {
    transform: scale(1.02);
    background: rgb(0 0 0 / 40%);
    transition: 0.3s;
  }

  &:active {
    transform: scale(1);
  }
}
</style>
