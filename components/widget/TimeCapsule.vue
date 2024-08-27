<script lang='ts' setup>
import { getTimeCapsule } from '@/utils/times'

// 进度条数据
const timeDate = ref(getTimeCapsule())
const timerId = ref()

function changeData() {
  timerId.value = setInterval(() => {
    timeDate.value = getTimeCapsule()
  }, 1000)
}
onMounted(() => {
  changeData()
})

onBeforeUnmount(() => {
  if (timerId.value)
    clearInterval(timerId.value)
})
</script>

<template>
  <div class="time-capsule">
    <div class="title">
      <Icon name="icon-park-outline:hourglass-full" class="icon" size="24" />
      <span>时光胶囊</span>
    </div>
    <span class="text">今日已经度过了&nbsp;{{ timeDate.day.elapsed }} 小时</span>
    <div class="w-full progress_box">
      <div
        class="text-xs font-medium p-0.5 progress_pass"
        :style="{ width: `${timeDate.day.pass}%` }"
      >
        <text>  {{ `${timeDate.day.pass}%` }}</text>
      </div>
    </div>
    <span class="text">本周已经度过了&nbsp;{{ timeDate.week.elapsed }} 天</span>
    <div class="w-full progress_box">
      <div
        class="text-xs font-medium p-0.5 progress_pass"
        :style="{ width: `${timeDate.week.pass}%` }"
      >
        <text>  {{ `${timeDate.week.pass}%` }}</text>
      </div>
    </div>
    <span class="text">本月已经度过了&nbsp;{{ timeDate.month.elapsed }} 天</span>
    <div class="w-full progress_box">
      <div
        class="text-xs font-medium p-0.5 progress_pass"
        :style="{ width: `${timeDate.month.pass}%` }"
      >
        <text>  {{ `${timeDate.month.pass}%` }}</text>
      </div>
    </div>
    <span class="text">本年已经度过了&nbsp;{{ timeDate.year.elapsed }} 个月</span>
    <div class="w-full progress_box">
      <div
        class="text-xs font-medium p-0.5 progress_pass"
        :style="{ width: `${timeDate.year.pass}%` }"
      >
        <text>  {{ `${timeDate.year.pass}%` }}</text>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.time-capsule {
  width: 100%;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.2rem 0 1.5rem;
    font-size: 1.1rem;
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
    }
  }
  .text {
    display: block;
    margin: 1rem 0 0.5rem;
    font-size: 0.95rem;
  }
  .progress_box {
    border-radius: 6px;
    background-color: #00000020;
    .progress_pass {
      background-color: #efefef;
      border-radius: 6px;
      text-align: center;
      font-family: UnidreamLED;
      animation: progress_face 3s linear;
      text {
        color: #564d59;
        font-size: 0.9rem;
      }
    }
  }
}
@keyframes progress_face {
  0% {
    width: 0;
  }
}
</style>
