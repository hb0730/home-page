interface Item {
  variant?: 'circle' | 'ghost' // 圆形或幽灵风格，打破方正感
  hoverImage?: string // 悬停时展示的大图（如二维码图片）
}
export interface ProjectItem extends Item {
  id?: string
  title: string
  description: string
  href: string
  tags: string[]
  featured?: boolean
  icon?: string
  status?: 'active' | 'paused' | 'archived'
  // Layout Hints
  span?: string
  color?: string
}

export interface SiteItem extends Item {
  title: string
  href: string
  description?: string
  category: string
  icon?: string
  // Layout Hints
  span?: string
  color?: string
}

export interface SiteConfig extends Item {
  title: string
  author: string
  url: string
  keywords: string
  description: string
  logo: string
  icon: string
  startDate: string
  icp?: string
  footerText?: string
  motto?: string // keeping for compatibility if needed
  socials: {
    name: string
    icon: string
    tip: string
    url: string
  }[]
}
