import type { SiteConfig } from '~/types/home'

export const siteConfig: SiteConfig = {
  title: '个人主页', // 网站标题
  author: 'hb0730', // 作者
  url: 'https://hb0730.me', // 网站地址
  keywords: 'hb0730,个人主页', // 网站关键字
  description: '我本就是一个不喜欢主动的人，虽然灵魂有趣但不爱表达，还死倔，也慢热，遇到懂我的人是幸运，遇不到也是正常了，慢热、沉默、喜欢独处、三观正，比你想象的深情，也比你以为的冷漠', // 网站描述
  logo: 'https://cravatar.cn/avatar/8b21c82521c08425c4426b156ff80623?size=256', // 网站logo
  icon: 'https://cravatar.cn/avatar/8b21c82521c08425c4426b156ff80623?size=256', // 网站图标
  startDate: '2024-03-05', // 网站创建日期
  icp: '湘ICP备2025134088号-1', // 备案号,
  footerText: 'DESIGNED BY HB0730 © 2026',
  socials: [
    {
      name: 'Github',
      icon: 'i-ri-github-fill',
      tip: '去 Github 看看',
      url: 'https://github.com/hb0730',
    },
    { name: 'Email', icon: 'i-ri-mail-fill', tip: '来封 Email ~', url: 'mailto:1278032416@qq.com' },
  ],
}
