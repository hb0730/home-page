// https://nuxt.com/docs/api/configuration/nuxt-config
import removeConsole from 'vite-plugin-remove-console'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    'nuxt-swiper',
  ],
  unocss: {
    autoImport: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  vite: {
    plugins: [
      removeConsole(),
    ],
  },
  compatibilityDate: '2024-08-27',
})
