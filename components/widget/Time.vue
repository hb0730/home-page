<script lang='ts' setup>
import { getCurrentTime } from '@/utils/times'

const currentTimes = getCurrentTime()
const fullYear = computed(() => {
  return `${currentTimes.year} 年`
})
const month = computed(() => {
  return `${currentTimes.month} 月`
})
const day = computed(() => {
  return `${currentTimes.day} 日`
})

const weekday = computed(() => {
  return `${currentTimes.weekday}`
})
const hour = ref()
const minute = ref()
const second = ref()
const timeId = ref()

function updateTime() {
  const now = new Date()
  hour.value = addZero(now.getHours())
  minute.value = addZero(now.getMinutes())
  second.value = addZero(now.getSeconds())
  timeId.value = setInterval(() => {
    const now = new Date()
    hour.value = addZero(now.getHours())
    minute.value = addZero(now.getMinutes())
    second.value = addZero(now.getSeconds())
  }, 1000)
}
function addZero(num: number) {
  return num < 10 ? `0${num}` : num
}
onMounted(() => {
  updateTime()
})
onBeforeUnmount(() => {
  if (timeId.value)
    clearInterval(timeId.value)
})
</script>

<template>
  <div class="time">
    <div class="date">
      <span>{{ fullYear }}</span>
      <span>{{ month }}</span>
      <span>{{ day }}</span>
      <span>{{ weekday }}</span>
    </div>
    <div class="text">
      {{ hour }}:{{ minute }}:{{ second }}
    </div>
  </div>
</template>

<style lang='scss' scoped>
 .time {
  font-size: 1.1rem;
  text-align: center;
  .date {
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
  .text {
    margin-top: 10px;
    font-size: 3.25rem;
    letter-spacing: 2px;
    font-family: 'UnidreamLED';
  }
}
</style>
