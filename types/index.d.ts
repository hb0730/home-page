import type { AttributifyAttributes } from 'unocss/preset-attributify'

declare module 'nuxt/schema' {
  interface AppConfig {
    /**
     * 站点标题
     */
    title?: string
    /**
     * 作者
     */
    author?: string
    /**
     * 网站地址
     */
    url?: string
    /**
     * 网站关键字
     */
    keywords?: string
    /**
     * 网站描述
     */
    description?: string
    /**
     * 网站logo
     */
    logo?: string
    /**
     * 网站图标
     */
    icon?: string
    /**
     * 网站创建日期
     */
    startDate?: string
    /**
     * 备案号
     */
    icp?: string
    /**
     * 社交链接
     */
    social?: Social[]
    /**
     * 网站列表
     */
    website?: WebSiteLink[]
  }
  interface Social {
    /**
     * 社交名称
     */
    title?: string
    /**
     * 社交图标
     */
    icon?: string
    /**
     * 社交图标
     */
    src?: string
    /**
     * 提示
     */
    tip?: string
    /**
     * 社交链接
     */
    url?: string
  }

  interface WebSiteLink {
    /**
     * 项目图标
     */
    icon?: string
    /**
     * 项目图标
     */
    src?: string
    /**
     * 项目名称
     */
    title?: string
    /**
     * 项目链接
     */
    url?: string
  }
}

declare module '@vue/runtime-dom' {
  interface HTMLAttributes extends AttributifyAttributes {}
}

// It is always important to ensure you import/export something when augmenting a type
export {}
