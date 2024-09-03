export default defineComponent({
  name: 'WidgetTime',
  setup(_, { attrs }) {
    const current = ref<Clock>({})
    const timeInterval = ref<any>(null)

    const year = computed(() => `${current.value.year} 年 `)
    const month = computed(() => `${current.value.month} 月 `)
    const day = computed(() => `${current.value.day} 日 `)

    const updateTime = () => {
      current.value = getCurrentTime()
    }
    onMounted(() => {
      updateTime()
      timeInterval.value = setInterval(updateTime, 1000)
    })
    onBeforeUnmount(() => {
      if (timeInterval.value)
        clearInterval(timeInterval.value)
    })
    return () => (
      <div text-size-xl text-center {...attrs}>
        <div text-ellipsis overflow-x-hidden whitespace-normal>
          <span>{year.value}</span>
          <span>{month.value}</span>
          <span>{day.value}</span>
          <span>{current.value.weekday}</span>
        </div>
        <div mt-2 text-size-6xl font="tracking-widest" class="font-[UnidreamLED]">
          <span>{current.value.hour}</span>
          <span>:</span>
          <span>{current.value.minute}</span>
          <span>:</span>
          <span>{current.value.second}</span>
        </div>
      </div>
    )
  },
})
