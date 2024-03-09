<script lang='ts' setup>
import { mainStore } from '@/store'

const store = mainStore()

const showSwiper = computed(() => {
  if (store.getInnerWidth)
  // 如果是移动端，显示轮播图
    return store.getInnerWidth < 768

  return false
})
</script>

<template>
  <div class="main_content">
    <template v-if="showSwiper">
      <div class="main_container">
        <Swiper
          :modules="[SwiperMousewheel]"
          :slides-pre-view="1"
          :space-between="40"
          :mousewheel="true"
          :centered-slides="true"
        >
          <SwiperSlide>
            <ModulesTime />
            <ModulesHitokoto />
          </SwiperSlide>
          <SwiperSlide>
            <ModulesProfile />
            <ModulesSocialLink />
          </SwiperSlide>
          <SwiperSlide>
            <ModulesLive />
            <ModulesSiteLink />
          </SwiperSlide>
        </Swiper>
      </div>
    </template>
    <template v-else>
      <div class="main_left">
        <ModulesProfile />
        <ModulesSocialLink />
      </div>
      <div class="main_right">
        <Swiper
          :modules="[SwiperMousewheel]"
          :slides-pre-view="1"
          :space-between="40"
          :mousewheel="true"
        >
          <SwiperSlide>
            <ModulesTime />
            <ModulesHitokoto />
          </SwiperSlide>
          <SwiperSlide>
            <ModulesLive />
          </SwiperSlide>
        </Swiper>
        <ModulesSiteLink />
      </div>
    </template>
  </div>
</template>

<style lang="scss">
.main_container {
  .swiper-wrapper {
    display: flex;
    align-items: center;
  }
}
</style>

<style lang='scss' scoped>
.main_content {
  width: 100%;
  height: 100%;
  padding: 0 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .main_container {
    width: 100%;
    height: 100%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
  .main_left {
    flex: 1;
    // 平板
    @media (max-width: 1024px) {
      width: 50%;
    }
  }
  .main_right {
    flex: 1 0 0%;
    width: 50%;
    margin-left: 0.75rem;
    animation: fade 0.5s;
  }
}
</style>
