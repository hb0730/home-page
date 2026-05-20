import type { ProjectItem } from '~/types/home'

export const projects: ProjectItem[] = [
  {
    title: 'Boot-Admin',
    description: '基于 Spring Boot 的后台管理系统，提供快速开发和丰富功能',
    href: 'https://github.com/hb0730/boot-admin',
    tags: ['Java', 'Spring Boot', '后台管理'],
    featured: true,
    icon: 'i-ri-dashboard-fill',
    status: 'active',
  },
  {
    title: 'T-Nav',
    description: '一个简洁实用的网站导航，收集了各种常用工具和资源，方便自己和朋友使用',
    href: 'https://github.com/hb0730/t-nav',
    tags: ['网站导航', '工具'],
    icon: 'i-ri-links-fill',
    status: 'active',
  },
  {
    title: 'Home-page',
    description: '个人主页，记录一些个人的想法和生活，展示一些个人的项目和资源',
    href: 'https://github.com/hb0730/home-page',
    tags: ['个人主页', '博客'],
    icon: 'i-ri-home-4-fill',
    status: 'active',
  },
]
