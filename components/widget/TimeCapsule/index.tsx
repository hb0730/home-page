import './index.scss'
import { getTimeCapsule } from '@/utils/times'

export default defineComponent({
  name: 'WidgetTimeCapsule',
  setup(_, { attrs }) {
    // 进度条数据
    const timeDate = ref(getTimeCapsule())
    const timerId = ref()

    const capsuleList = computed(() => {
      return [
        {
          title: '本日',
          elapsed: timeDate.value.day.elapsed,
          pass: timeDate.value.day.pass,
          unit: 'hour',
        },
        {
          title: '本周',
          elapsed: timeDate.value.week.elapsed,
          pass: timeDate.value.week.pass,
          unit: 'day',
        },
        {
          title: '本月',
          elapsed: timeDate.value.month.elapsed,
          pass: timeDate.value.month.pass,
          unit: 'day',
        },
        {
          title: '今年',
          elapsed: timeDate.value.year.elapsed,
          pass: timeDate.value.year.pass,
          unit: 'month',
        },
      ]
    })
    // 获取时间胶囊
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

    return () => (
      <>
        <div class="w-full" {...attrs}>
          <div class="flex items-center text-size-[1.1rem] m-[0.2rem_0_1.5rem]">
            <div class="i-ri-hourglass-fill" size="8" />
            <span class="ml-2">时光胶囊</span>
          </div>
          {capsuleList.value.map(item => (
            <>
              <span class="m-[1rem_0_.5rem] text-size-[0.95rem] block">
                {item.title}
                已经度过了&nbsp;
                {item.elapsed}
                {' '}
                {{ hour: '小时', day: '天', month: '月' }[item.unit]}
              </span>
              <div class="w-full rounded-2 bg-[#00000020]">
                <div
                  class="text-xs font-medium p-0.5 progress_pass"
                  style={{ width: `${item.pass}%` }}
                >
                  <text>
                    {item.pass}
                    %
                  </text>
                </div>
              </div>
            </>
          ))}
        </div>
      </>
    )
  },
})
