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
  <footer class="blur w-full p-3 absolute bottom-0 left-0 text-center">
    <div class="flex items-center h-full w-full justify-center max-md:text-size-[0.8rem] text-hidden">
      <span>&copy; {{ startDate }} <a :href="url" target="_blank" class="hover-scale">{{ config.author }}</a></span>
      <span class="max-md:hidden">&nbsp;Power by <a href="https://hb0730.me" target="_blank" class="hover-scale">hb0730</a> </span>
      <span class="max-md:hidden">&nbsp;Theme by <a href="https://github.com/imsyy/home" target="_blank" class="hover-scale">imsyy</a></span>
      <span>&nbsp;<a v-if="config.icp" href="http://beian.miit.gov.cn" target="_blank" class="hover-scale">{{ config.icp }}</a></span>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.blur {
  backdrop-filter: blur(10px);
  background: rgb(0 0 0 / 25%);
  filter: none;
}
</style>
