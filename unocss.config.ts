import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerAttributifyJsx,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  theme: {
    colors: {
      primary: '#64cc96',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.2,
    }),
    presetScrollbar(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributifyJsx(),
  ],
  safelist: [
    'i-ri-github-fill',
    'i-ri-github-line',
    'i-ri-mail-fill',
    'i-ri-mail-line',
    'i-ri-mail-open-fill',
    'i-ri-mail-open-line',
    'i-ri-qq-fill',
    'i-ri-qq-line',
    'i-ri-wechat-fill',
    'i-ri-wechat-line',
    'i-ri-weibo-fill',
    'i-ri-weibo-line',
    'i-ri-zhihu-fill',
    'i-ri-zhihu-line',
    'i-ri-cloud-fill',
    'i-ri-cloud-line',
    'i-ri-heart-pulse-fill',
    'i-ri-heart-pulse-line',
    'i-ri-book-read-fill',
    'i-ri-book-read-line',
    'i-ri-bookmark-3-fill',
    'i-ri-bookmark-3-line',
    'i-ri-blogger-fill',
    'i-ri-blogger-line',
    'i-ri-file-user-fill',
    'i-ri-file-user-line',
    'i-fa6-brands-docker',
  ],
})
