<script setup lang="ts">
const config = useAppConfig()
const fullYear = new Date().getFullYear()
const url = computed(() => {
  const { url } = config
  if (!url)
    return ''
  if (!/^https?:\/\//.test(url))
    return `//${url}`
  return url
})
const startDate = computed(() => {
  const { startDate } = config
  if (!startDate)
    return fullYear
  if (startDate.length >= 4) {
    const _year = startDate.substring(0, 4)
    if (_year === (`${fullYear}`))
      return fullYear
    return `${_year}-${fullYear}`
  }
  return null
})
</script>

<template>
  <div class="blur" w-full p-3 absolute bottom-0 left-0 text-center>
    <div>
      <span>&copy; {{ startDate }} <a :href="url" target="_blank" class="hover-scale">{{ config.author }}</a></span>
      <span>&nbsp;Power by <a href="http://hb0730.me" target="_blank" class="hover-scale">hb0730</a> </span>
      <span>&nbsp;Theme by <a href="https://github.com/imsyy/home" target="_blank" class="hover-scale">imsyy</a></span>
      &nbsp;<a v-if="config.icp" href="http://beian.miit.gov.cn" target="_blank" class="hover-scale">{{ config.icp }}</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blur {
  backdrop-filter: blur(10px);
  background: rgb(0 0 0 / 25%);
  filter: none;
}
</style>
