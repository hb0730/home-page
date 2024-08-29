import type { Weather } from '~/utils/weather'
import getWeather from '~/utils/weather'

export default defineComponent({
  name: 'WidgetWeather',
  setup(_, { attrs }) {
    const weather = ref<Weather>({})
    const success = computed(() => weather.value?.weather)
    const _city = computed(() => {
      return `当前城市：${weather.value?.city || weather.value?.province || '未知'}`
    })
    onMounted(() => {
      getWeather().then((res) => {
        weather.value = res
      })
    })
    const failedRender = () => {
      return (
        <div text-center w-full text-ellipsis overflow-x-hidden whitespace-nowrap {...attrs}>
          <span>天气数据获取失败</span>
        </div>
      )
    }
    const render = () => {
      return (
        <div text-center w-full text-ellipsis overflow-x-hidden whitespace-nowrap {...attrs}>
          <span>
            { _city.value }
            {' '}
          </span>
          <span>
            { weather.value?.weather }
            {' '}
          </span>
          <span>
            { weather.value?.temperature }
            {' '}
            ℃
            {' '}
          </span>
          <span>
            { weather.value?.wind }
            {' '}
          </span>
          <span>
            {weather.value?.windPower }
            {' '}
            级
            {' '}
          </span>
        </div>
      )
    }

    return () => (success.value ? render() : failedRender())
  },
})
