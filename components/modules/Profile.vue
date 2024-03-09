<script lang='ts' setup>
import Typed from 'typed.js'

const appConfig = useAppConfig()
// const siteUrl = computed(() => {
//   const url = appConfig.siteUrl
//   if (!url)
//     return ''

//   // 判断协议前缀
//   if (!url.startsWith('http://') && !url.startsWith('https://'))
//     return `//${url}`

//   return url
// })
onMounted(() => {
})
</script>

<template>
  <div class="widget module profile">
    <view class="gravatar">
      <img :src="appConfig.siteLogo" alt="头像">
    </view>
    <view class="profile_info">
      <h3>{{ appConfig.siteAuthor }}</h3>
      <span id="description" class="description">{{ appConfig.siteDescription }}</span>
    </view>
    <!-- <a :href="siteUrl" class="icon" target="_blank">
      <Icon name="solar:square-forward-linear" />
    </a> -->
  </div>
</template>

<style lang='scss' scoped>
.profile {
  padding: 1rem;
  max-width: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
  .gravatar {
    flex: 1;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .profile_info {
    margin-left: 1rem;
    width: 250px;
    h3 {
      margin: 0;
      font-size: 1.5rem;
    }
    span {
      font-size: 1rem;
      color: #c1b8b8;
    }
  }

  .icon {
    // 右上角
    position: absolute;
    top: 0;
    right: 0;
    font-size: 2rem;
    color: #666;
  }
}
</style>
