<script lang='ts' setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { TransitionFade } from '@morev/vue-transitions'
import { toast } from 'vue3-toastify'
import { mainStore } from './store'

const appConfig = useAppConfig()
const store = mainStore()

function getWindowWidth() {
  store.setInnerWidth(window.innerWidth)
}

watch(
  () => store.innerWidth,
  () => {
  },
)

function _console() {
  // 控制台输出
  const styleTitle1 = 'font-size: 20px;font-weight: 600;color: rgb(244,167,89);'
  const styleTitle2 = 'font-size:12px;color: rgb(244,167,89);'
  const styleContent = 'color: rgb(30,152,255);'

  const title1 = `${appConfig.siteTitle} 主页\n`
  const title2 = `${appConfig.siteDescription}`
  const content = `\n\n 版本：v1.0.0 \n\n 主页：${appConfig.siteUrl} \n\n 作者：${appConfig.siteAuthor} \n\n`

  // eslint-disable-next-line no-console
  console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent)
}

onMounted(() => {
  // 屏蔽右键
  document.oncontextmenu = function () {
    toast('本站禁用右键哦～', { })
    // 提示
    return false
  }
  // 获取窗口宽度
  getWindowWidth()
  // 监听窗口变化
  window.addEventListener('resize', getWindowWidth)

  _console()
})
onBeforeUnmount(() => {
  // 移除监听
  window.removeEventListener('resize', getWindowWidth)
})

useHead({
  title: appConfig.siteTitle,
  link: [
    {
      rel: 'icon',
      href: appConfig.siteIcon,
    },
  ],
  meta: [
    {
      name: 'keywords',
      content: appConfig.siteKeywords,
    },
    {
      name: 'description',
      content: appConfig.siteDescription,
    },
    {
      name: 'author',
      content: appConfig.siteAuthor,
    },
  ],
})
</script>

<template>
  <div id="app">
    <Loading />
    <Background />
    <TransitionFade mode="out-in">
      <main v-if="store.loadStatus" class="main">
        <div class="container">
          <Main />
        </div>
        <TransitionFade mode="out-in">
          <Footer />
        </TransitionFade>
      </main>
    </TransitionFade>
  </div>
</template>

<style lang='scss' scoped>
.main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  transition: transform 0.3s;
  animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    forwards;
  animation-delay: 0.5s;
  .container {
    width: 100%;
    height: 100vh;
    margin: 0 auto;
    .all {
      width: 100%;
      height: 100%;
      padding: 0 0.75rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
}
@keyframes fade-blur-main-in {
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}
</style>
