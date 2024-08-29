import type { Hitokoto } from '@/utils/hitokoto'
import getHotokoto from '@/utils/hitokoto'

export default defineComponent({
  name: 'WidgetHitokoto',
  setup(_, { attrs }) {
    const data = ref<Hitokoto>({})
    onMounted(() => {
      getHotokoto().then((res) => {
        data.value = res
      })
    })
    return () => (
      <div
        h-full
        flex
        flex-col
        justify-evenly
        {...attrs}
      >
        <span
          class="text-size-[1.1rem] "
          break-all
          text-ellipsis
          overflow="hidden"
          display="box"
        >
          {data.value?.hitokoto}
        </span>
        <span
          mt-2
          font-bold
          self-end
          class="text-size-[1.1rem]"
        >
          -「&nbsp;
          { data.value?.from_who || data.value?.from || '佚名' }
&nbsp;」
        </span>
      </div>
    )
  },
})
