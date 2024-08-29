import './index.scss'

export default defineComponent({
  name: 'WidgetClock',
  setup(_, { attrs }) {
    const timeList = ref([12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    const transform = ref('scale(1)')
    const hourRotate = ref('rotate(0deg)')
    const minuteRotate = ref('rotate(0deg)')
    const secondRotate = ref('rotate(0deg)')
    const timerId = ref()
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

    return () => (
      <>
        <div class="clock-widget clock" {...attrs}>
          <div class="clock_background" />
          <div class="clock_circle" />
          <div class="clock_hour" style={{ transform: hourRotate.value }} />
          <div class="clock_minute" style={{ transform: minuteRotate.value }} />
          <div class="clock_second" style={{ transform: secondRotate.value }} />
          {timeList.value.map((h) => {
            return (
              <p class="hour">
                <span>{h}</span>
              </p>
            )
          })}
        </div>
      </>
    )
  },
})
