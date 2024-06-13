export default defineAppConfig({
  siteTitle: 'My site', // 站点名称
  siteAuthor: 'hb0730', // 作者
  siteKeywords: 'hb0730,个人主页', // 关键词,
  siteUrl: 'https://hb0730.me', // 站点地址
  siteLogo: 'https://cravatar.cn/avatar/8b21c82521c08425c4426b156ff80623?size=256', // 站点logo
  siteDescription: '我本就是一个不喜欢主动的人，虽然灵魂有趣但不爱表达，还死倔，也慢热，遇到懂我的人是幸运，遇不到也是正常了，慢热、沉默、喜欢独处、三观正，比你想象的深情，也比你以为的冷漠', // 站点描述
  siteIcon: 'https://cravatar.cn/avatar/8b21c82521c08425c4426b156ff80623?size=256', // 站点icon
  siteStartDate: '2024-03-05', // 建站时间
  siteIcp: '', // 备案号
  social: [
    {
      name: 'Github',
      icon: '/images/icon/github.png',
      tip: '去 Github 看看',
      url: 'https://github.com/hb0730',
    },
    {
      name: 'Email',
      icon: '/images/icon/email.png',
      tip: '来封 Email ~',
      url: 'mailto:1278032416@qq.com',
    },
  ],
  links: [
    {
      icon: 'fa-solid:blog',
      name: '博客',
      link: 'https://blog.hb0730.me/',
    },
    {
      icon: 'fa-solid:book-reader',
      name: '网站导航',
      link: 'https://t-nav.hb0730.me',
    },
    {
      icon: 'tdesign:object-storage',
      name: '网盘',
      link: 'https://s0.hb0730.me',
    },
    {
      icon: 'fa-solid:heartbeat',
      name: '站点检测',
      link: 'https://status.hb0730.me',
    },
    {
      icon: 'fa-brands:docker',
      name: 'Docker Proxy',
      link: 'https://docker.uhoox.ink',
    },
  ],
})
