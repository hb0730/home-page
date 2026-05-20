import type { SiteConfig } from '~/types/home'

/**
 * 全局站点配置：在这里修改您的个人信息、SEO 关键词和备案号
 */
export const siteConfig: SiteConfig = {
  title: '个人主页', // 浏览器标签页标题
  author: 'hb0730', // 您的名字/昵称
  url: 'https://hb0730.me', // 网站正式部署地址
  keywords: 'hb0730,个人主页,前端,后端,极客', // SEO 关键字
  description: '我本就是一个不喜欢主动的人，虽然灵魂有趣但不爱表达，还死倔，也慢热，遇到懂我的人是幸运，遇不到也是正常了，慢热、沉默、喜欢独处、三观正，比你想象的深情，也比你以为的冷漠', // 网站描述（SEO & 简介面板）
  logo: 'https://cravatar.cn/avatar/8b21c82521c08425c4426b156ff80623?size=256', // 头像直链
  icon: 'https://cravatar.cn/avatar/8b21c82521c08425c4426b156ff80623?size=256', // 浏览器 Favicon 图标
  startDate: '2024-03-05', // 站点创建日期（用于月相/进度计算）
  icp: '湘ICP备2025134088号-1', // 备案号
  footerText: 'DESIGNED BY HB0730 © 2026', // 页脚文案

  /**
   * 社交媒体链接配置：支持 Iconify 图标
   */
  socials: [
    {
      name: 'Github',
      icon: 'i-ri-github-fill',
      tip: '去 Github 看看',
      url: 'https://github.com/hb0730',
    },
    {
      name: 'Email',
      icon: 'i-ri-mail-fill',
      tip: '来封 Email ~',
      url: 'mailto:1278032416@qq.com',
    },
  ],

  /**
   * 个性化小组件数据配置
   */
  widgets: {
    // 四季标签
    seasons: {
      label: 'Cycle of Time',
    },
    // GitHub 贡献图配置
    github: {
      username: 'hb0730',
      label: 'Contributions',
    },
    // 月相配置
    moon: {
      label: 'Lunar Phase',
    },
    // 年进度配置
    progress: {
      label: 'Year Progress',
    },
    // 技术栈走马灯
    marquee: {
      tags: ['Nuxt 4', 'Vue 3', 'TypeScript', 'UnoCSS', 'Spring Boot', 'PostgreSQL', 'Docker', 'Vite', 'Pinia'],
    },
  },
}
