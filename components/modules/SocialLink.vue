<script lang='ts' setup>
import { ref } from 'vue'

const appConfig = useAppConfig()
const socialLink = appConfig.social || []
const swiperSlideGroup = computed(() => {
  // 将socialLink分组 4个一组
  const result = []
  for (let i = 0; i < socialLink.length; i += 4)
    result.push(socialLink!.slice(i, i + 4))
  return result
})
const socialTip = ref('')
</script>

<template>
  <div class="social module">
    <Swiper
      :modules="[SwiperNavigation]"
      :navigation="{ nextEl: '.swiper-button-next',
                     prevEl: '.swiper-button-prev' }"
      :space-between="40"
      class="swiper-wrapper"
    >
      <SwiperSlide v-for="(array, index) in swiperSlideGroup" :key="index" class="swiper-slide">
        <ul>
          <li v-for="(item, i) in array" :key="i">
            <a :href="item.url" target="_blank" @mouseenter="socialTip = item.tip" @mouseleave="socialTip = ''">
              <img :src="item.icon" class="icon" :alt="item.tip" style="height: 24px;">
            </a>
          </li>
        </ul>
      </SwiperSlide>
    </Swiper>
    <div v-if="swiperSlideGroup.length > 1" class="swiper-button-prev swiper-button-next-ico" />
    <div v-if="swiperSlideGroup.length > 1" class="swiper-button-next swiper-button-prev-ico" />
  </div>
</template>

<style lang='scss' scoped>
.social {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 460px;
  width: 100%;
  height: 42px;
  background-color: transparent;
  border-radius: 6px;
  -webkit-backdrop-filter: blur(0);
  backdrop-filter: blur(0);
  animation: fade 0.5s;
  transition:
    background-color 0.3s,
    backdrop-filter 0.3s;
  .swiper-wrapper {
    .swiper-slide {
      ul {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        li {
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;

          a {
            display: flex;
            align-items: center;
            justify-content: center;
            .icon {
              margin: 0 12px;
              transition: transform 0.3s;
              &:hover {
                transform: scale(1.1);
              }
              &:active {
                transform: scale(1);
              }
            }
          }
        }
      }
    }
  }

  .swiper-button-prev-ico,
  .swiper-button-next-ico {
    -webkit-color: rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0.5);
    --swiper-navigation-size: 24px;
  }

  &:hover {
    background-color: #00000040;
    backdrop-filter: blur(5px);
    .tip {
      display: block;
    }
  }
}
</style>
