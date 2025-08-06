<script setup lang="ts">
import 'uno.css'
import '~/assets/css/font.scss'
import '~/assets/css/main.scss'
import 'swiper/swiper-bundle.css'


const config = useAppConfig()

function _console() {
  // 控制台输出
  const styleTitle1 = 'font-size: 20px;font-weight: 600;color: rgb(244,167,89);'
  const styleTitle2 = 'font-size:12px;color: rgb(244,167,89);'
  const styleContent = 'color: rgb(30,152,255);'

  const title1 = `${config.title} \n`
  const title2 = `${config.description}`
  const content = `${config.url} \n\n 作者：${config.author} \n\n`

  console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent)
}

useHead({
  title: config.title,
  link: [
    {
      rel: 'icon',
      href: config.icon,
    },
  ],
  meta: [
    {
      name: 'keywords',
      content: config.keywords,
    },
    {
      name: 'description',
      content: config.description,
    },
  ],
})

onMounted(() => {
  _console()
})
</script>

<template>
  <div fixed top-0 left-0 w-full h-full z-0>
    <Loading />
    <Background />
    <NuxtPage />
    <Footer />
  </div>
</template>
