import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-19',
  devtools: { enabled: true },
  css: ['~/assets/styles/main.css'],
  modules: ['@unocss/nuxt'],
  typescript: {
    strict: true,
  },
})
