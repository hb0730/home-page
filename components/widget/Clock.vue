<script lang='ts' setup>
const timeList = ref([12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
const transform = ref('scale(1)')
const hourRotate = ref('rotate(0deg)')
const minuteRotate = ref('rotate(0deg)')
const secondRotate = ref('rotate(0deg)')
const timerId = ref()
const clockStyle = computed(() => {
  return {

  }
})
function updateTime() {
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()
  hourRotate.value = `rotate(${hour * 30 + minute * 0.5}deg)`
  minuteRotate.value = `rotate(${minute * 6}deg)`
  secondRotate.value = `rotate(${second * 6}deg)`
  transform.value = `scale(1)`

  if (second === 0)
    transform.value = `scale(1.1)`

  if (hour === 0 && minute === 0 && second === 0) {
    timeList.value = timeList.value.map((h) => {
      return h === 12 ? 1 : h + 1
    })
  }

  timerId.value = setTimeout(updateTime, 1000)
}
onMounted(() => {
  updateTime()
})
onBeforeUnmount(() => {
  clearTimeout(timerId.value)
})
</script>

<template>
  <div class="clock" :style="clockStyle">
    <div class="clock_background" />
    <div class="clock_circle" />
    <div class="clock_hour" :style="{ transform: hourRotate }" />
    <div class="clock_minute" :style="{ transform: minuteRotate }" />
    <div class="clock_second" :style="{ transform: secondRotate }" />
    <b v-for="h in timeList" :key="h" class="hour">
      <span>
        <i :style="{ transform }">{{ h }}</i>
      </span>
    </b>
  </div>
</template>

<style lang='scss' scoped>
$angle: 30deg;

.clock {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  text-align: center;
  font-size: 14px;
  @media (max-width: 720px) {
    width: 150px;
    height: 150px;
  }
  .clock_background {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-image: url('https://www.dmoe.cc/random.php');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center center;
    opacity: 0.5;
  }

  .hour {
    position: absolute;
    top: 0px;
    left: 50%;
    display: block;
    width: 20px;
    height: 50%;
    margin-left: -10px;
    padding-top: 4%;
    font-weight: 400;
    transform-origin: bottom;
    user-select: none;
    box-sizing: border-box;
    > span {
      display: block;

      > i {
        display: block;
        font-style: normal;
      }
    }
  }

  @for $i from 2 through 12 {
    .hour:nth-of-type(#{$i}) {
      transform: rotatez(#{$angle * ($i - 1)});
      > span {
        transform: rotatez(#{-$angle * ($i - 1)});
      }
    }
  }

  .clock_circle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    transform: translate(-50%, -50%);
    border: 2px solid #666666;
    border-radius: 100%;
    background-color: #ffffff;
    z-index: 1;
    box-sizing: border-box;

    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      content: '';
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background-color: #666666;
    }
  }

  .clock_hour,
  .clock_minute,
  .clock_second {
    position: absolute;
    top: 15%;
    left: 50%;
    display: block;
    width: 2px;
    height: 35%;
    margin-left: -1px;
    border-radius: 5px;
    transform-origin: bottom;
    background-color: #666666;
  }
  .clock_hour {
    background-color: #fceb92;
  }
  .clock_minute {
    background-color: #2580b4;
  }
  .clock_second {
    background-color: #e74c3c;
  }

  .clock_hour {
    top: 30%;
    width: 4px;
    height: 20%;
    margin-left: -2px;
  }

  .clock_second {
    width: 1px;
  }
}

.clock.is_small {
  width: 80px;
  height: 80px;
  border-width: 1px;
  font-size: 12px;

  .clock_circle {
    width: 10px;
    height: 10px;
    border-width: 1px;
    &:before {
      width: 2px;
      height: 2px;
    }
  }
}
</style>
