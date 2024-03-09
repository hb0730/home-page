// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  css: [
    '~/assets/css/main.scss',
    '~/assets/css/fonts.scss',
  ],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@morev/vue-transitions/nuxt',
    'nuxt-icon',
    'nuxt-swiper',
  ],
})
