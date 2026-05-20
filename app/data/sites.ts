import type { SiteItem } from '~/types/home'

export const sites: SiteItem[] = [
  {
    title: 'Blog',
    description: '记录一些个人的想法和生活',
    icon: 'i-ri-article-fill',
    href: 'https://hb0730.me/blog',
    category: '个人博客',
  },
  {
    title: '网站导航',
    description: '收集一些常用的网站，方便自己和朋友使用',
    icon: 'i-ri-links-fill',
    href: 'https://t-nav.hb0730.me',
    category: '网站导航',
  },
  {
    title: 'Github',
    description: '我的 Github 仓库，记录一些个人的项目和代码',
    icon: 'i-ri-github-fill',
    href: 'https://github.com/hb0730',
    category: '社交媒体',
  },
  {
    icon: '/assets/images/gh-qr.jpg',
    hoverImage: '/assets/images/gh-qr.jpg',
    title: '诗词',
    href: 'https://poetry.hb0730.me',
    category: '文学艺术',
  },
  {
    icon: 'i-mdi-heart-pulse',
    title: '心情树',
    href: 'https://mood.hb0730.me',
    category: '个人日记',
  },
  {
    icon: 'i-ri-file-user-fill',
    title: '个人简历',
    href: 'https://resume.hb0730.me',
    category: '个人资料',
  },

]
