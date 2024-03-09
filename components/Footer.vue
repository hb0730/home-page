<script lang='ts' setup>
import { TransitionFade } from '@morev/vue-transitions'

const appConfig = useAppConfig()
const fullYear = new Date().getFullYear()

// // 加载配置信息
const siteIcp = appConfig.siteIcp
const siteAuthor = appConfig.siteAuthor
const siteUrl = computed(() => {
  const url = appConfig.siteUrl
  if (!url)
    return ''

  // 判断协议前缀
  if (!url.startsWith('http://') && !url.startsWith('https://'))
    return `//${url}`

  return url
})
// // 建站时间
const siteStartDate = computed(() => {
  const startDate = appConfig.siteStartDate
  if (!startDate)
    return fullYear

  if (startDate.length >= 4) {
    const _year = startDate.substring(0, 4)
    if (_year === (`${fullYear}`))
      return fullYear
    return `${_year}-${fullYear}`
  }
})
</script>

<template>
  <!-- 页脚 -->
  <div class="footer blur">
    <TransitionFade mode="out-in">
      <view class="power">
        <span>
          Copyright&nbsp;&copy; {{ siteStartDate }}
          <a :href="siteUrl">{{ siteAuthor }}</a>
        </span>
        <!-- 请勿更改 -->
        <span>
          Power by <a href="https://blog.hb0730.me">hb0730</a>
        </span>
        <a v-if="siteIcp" href="https://beian.miit.gov.cn" target="_blank">
          &amp;
          {{ siteIcp }}
        </a>
      </view>
    </TransitionFade>
  </div>
</template>

<style lang='scss' scoped>
.footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 46px;
  line-height: 46px;
  text-align: center;
  z-index: 0;
  font-size: 14px;
  .power {
    animation: fade 0.3s;
  }
  @media (max-width: 720px) {
    font-size: 0.85rem;
    &.blur {
      font-size: 0.85rem;
    }
  }
  @media (max-width: 480px) {
    font-size: 0.67rem;
    &.blur {
      font-size: 0.67rem;
    }
  }
}
.blur {
  backdrop-filter: blur(10px);
  background: rgb(0 0 0 / 25%);
  font-size: 16px;
  filter: none;
}
</style>
