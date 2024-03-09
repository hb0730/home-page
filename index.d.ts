declare module 'nuxt/schema' {
  interface AppConfig {
    /**
     * 站点title
     */
    siteTitle: string
    /**
     * 作者
     */
    siteAuthor: string
    /**
     * 关键词
     */
    siteKeywords: string
    /**
     * 站点 url
     */
    siteUrl: string
    /**
     * 站点logo
     */
    siteLogo: string
    /**
     * 站点描述
     */
    siteDescription: string
    /**
     * 站点icon
     */
    siteIcon: string
    /**
     * 建站时间
     */
    siteStartDate?: string
    /**
     * 备案号
     */
    siteIcp?: string
    /**
     * 社交
     */
    social?: Social[]
    /**
     * 站点
     */
    links?: SiteLink[]
  }
  /**
   * 社交平台
   */
  interface Social {
    /**
     * 名称 Github QQ Email
     */
    name: string
    /**
     * 图标
     */
    icon: string
    /**
     * 提示
     */
    tip: string
    /**
     * 链接
     */
    url: string
  }
  /**
   * 站点
   */
  interface SiteLink {
    icon?: string
    name: string
    link: string
  }
}
declare global{
  /**
   * 天气
   */
  interface Weather {
    /**
     * 省
     */
    province?: string
    /**
     * 城市
     */
    city?: string
    /**
     * 天气
     */
    weather?: string
    /**
     * 温度
     */
    temperature?: string
    /**
     * 风向
     */
    wind?: string
    /**
     * 风力
     */
    windPower?: string

  }
  /**
   * 一言  https://hitokoto.cn
   */
  interface Hitokoto {
    /**
     * 一言标识
     */
    id: string
    /**
     * 一言正文。编码方式 unicode。使用 utf-8。
     */
    hitokoto: string
    /**
     * 类型。请参考第三节参数的表格
     */
    type: string
    /**
     * 一言的出处
     */
    from: string
    /**
     * 一言的作者
     */
    from_who: string
    /**
     * 添加者
     */
    creator: string
    /**
     * 添加者用户标识
     */
    creator_uid: string
    /**
     * 审核员标识
     */
    reviewer: string
    /**
     * 一言唯一标识；可以链接到 https://hitokoto.cn?uuid=[uuid] 查看这个一言的完整信息
     */
    uuid: string
    /**
     * 提交方式
     */
    commit_from: string
    /**
     * 添加时间
     */
    created_at: string
    /**
     * 句子长度
     */
    length: number
  }
}
export {}
