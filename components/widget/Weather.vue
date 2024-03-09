<script lang='ts' setup>
// const { data } = await useFetch<Weather>('/api/weather')
import { getWeather } from '@/api'

const data = await getWeather()
const _city = computed(() => {
  return `当前城市：${data?.city || '未知'}`
})
</script>

<template>
  <div v-if="data?.city && data?.weather" class="weather">
    <span>{{ _city }}&nbsp;</span>
    <span>{{ data?.weather }}&nbsp;</span>
    <span>{{ data?.temperature }} ℃&nbsp;</span>
    <span>{{ data?.wind }}&nbsp;</span>
    <span>{{ data?.windPower }} 级&nbsp;</span>
  </div>
  <div v-else class="weather">
    <span>天气数据获取失败</span>
  </div>
</template>

<style lang='scss' scoped>
  .weather {
  text-align: center;
  width: 100%;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
}
</style>
