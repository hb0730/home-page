export default defineComponent({
  name: 'WidgetTime',
  setup(_, { attrs }) {
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
    return () => (
      <div text-size-xl text-center {...attrs}>
        <div text-ellipsis overflow-x-hidden whitespace-normal>
          <span>{fullYear.value}</span>
          <span>{month.value}</span>
          <span>{day.value}</span>
          <span>{weekday.value}</span>
        </div>
        <div mt-2 text-size-6xl font="tracking-widest" class="font-[UnidreamLED]">
          <span>{hour.value}</span>
          <span>:</span>
          <span>{minute.value}</span>
          <span>:</span>
          <span>{second.value}</span>
        </div>
      </div>
    )
  },
})
