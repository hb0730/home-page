import './index.scss'
import type { CapsuleProgress, TimeCapsule } from '@/utils/times'
import { getTimeCapsule } from '@/utils/times'

export default defineComponent({
  name: 'WidgetTimeCapsule',
  setup(_, { attrs }) {
    // 进度条数据
    const timeDate = ref<TimeCapsule>(getTimeCapsule())
    const timerId = ref()
    const capsuleArray = computed<CapsuleProgress[]>(() => {
      return [
        timeDate.value.day,
        timeDate.value.week,
        timeDate.value.month,
        timeDate.value.year,
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
          {capsuleArray.value.map(item => (
            <>
              <div class="flex items-center justify-between m-[1rem_0_.5rem] text-size-[0.95rem] block">
                <span>
                  {item.name}
                  已度过
                  {item.elapsed}
                  {item.unit === 'day' ? '小时' : '天'}
                </span>
                <span class="opacity-[0.6] text-size-[0.85rem]">
                  剩余
                  {item.remaining}
                  {item.unit === 'day' ? '小时' : '天'}
                </span>
              </div>
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
