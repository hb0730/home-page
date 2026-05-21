import { defineConfig, presetIcons, presetWind4 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      }
    }),
  ],
  safelist: [
    'i-ri-github-fill',
    'i-ri-mail-fill',
    'i-ri-article-fill',
    'i-ri-links-fill',
    'i-ri-dashboard-fill',
    'i-ri-home-4-fill',
    'i-mdi-heart-pulse',
    'i-ri-file-user-fill',
    'i-ri-qr-code-line',
    'i-ri-book-read-fill',
    'i-ri-music-fill',
    'i-ri-calendar-event-line',
    'i-ri-refresh-line',
    'i-ri-map-pin-2-fill',
    // Weather Icons
    'i-ri-sun-fill',
    'i-ri-moon-clear-fill',
    'i-ri-sun-cloudy-fill',
    'i-ri-moon-cloudy-fill',
    'i-ri-cloudy-fill',
    'i-ri-cloudy-2-fill',
    'i-ri-mist-fill',
    'i-ri-drizzle-fill',
    'i-ri-rainy-fill',
    'i-ri-snowy-fill',
    'i-ri-thunderstorms-fill',
    'i-ri-windy-line',
    'i-ri-drop-line',
    // Grid Spans
    'md:col-span-1',
    'md:col-span-2',
    'md:col-span-3',
    'md:col-span-4',
    'md:row-span-1',
    'md:row-span-2',
  ],
  rules: [
    // 允许通过 class="custom-qr-gh" 来直接使用公共目录下的图片作为图标
    [/^custom-qr-(.*)$/, ([, name]) => ({ 
      'background-image': `url(/assets/images/${name}.jpg)`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
      'width': '100%',
      'height': '100%',
      'display': 'block'
    })]
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'app/data/**/*.ts',
      ]
    }
  }
})
