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
    'i-ri-qr-code-line' // fallback icon
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
