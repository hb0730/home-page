<script lang='ts' setup>
const appConfig = useAppConfig()
const siteLinks = appConfig.links || []
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
  <div class="site_link">
    <div class="line">
      <Icon name="heroicons-solid:link" size="20" class="icon" />
      <span class="title">网站列表</span>
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
        <div class="grid grid-cols-3 gap-4 link-all">
          <a v-for="(item, index) in site" :key="index" class="widget link-item" :href="item.link" target="_blank">
            <Icon v-if="item.icon" :name="item.icon" class="icon text-hidden" size="26" />
            <span class="title text-hidden ">{{ item.name }}</span>
          </a>
        </div>
      </SwiperSlide>
      <div class="swiper-pagination" />
    </Swiper>
  </div>
</template>

<style lang='scss' scoped>
.site_link {
  // width: 100%;
  // height: 100%;
  .line {
    margin: 2rem 0.25rem 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    animation: fade 0.5s;
    .icon {
      // width: 1em;
      // height: 1em;
      display: inline-flex;
    }
    .title {
      margin-left: 8px;
      font-size: 1.15rem;
      text-shadow: 0 0 5px #00000050;
    }
  }
  .swiper {
    left: -10px;
    width: calc(100% + 20px);
    padding: 5px 10px 0;
    z-index: 0;
    .swiper-slide {
      height: 100%;
    }
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
  .link-all {
    height: 220px;
    @media (max-width: 720px) {
      height: 180px;
    }
    .link-item {
      height: 100px;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      padding: 0 10px;
      animation: fade 0.5s;
      @media (max-width: 720px) {
        height: 80px;
        flex-direction: column;
      }
      .icon {
        display: inline-flex;
      }
      .title {
        font-size: 1.1rem;
        margin-left: 8px;
        @media (max-width: 720px) {
          font-size: 0.9rem;
          width: 100%;
          text-align: center;
          margin-left: 0;
          margin-top: 0.5rem;
        }
      }
      &:hover {
        transform: scale(1.02);
        background: rgb(0 0 0 / 40%);
        transition: 0.3s;
      }

      &:active {
        transform: scale(1);
      }

      .name {
        font-size: 1.1rem;
        margin-left: 8px;
      }
    }
  }
}
</style>
