/**
 * 一言  https://hitokoto.cn
 */
export interface Hitokoto {
  /**
   * 一言标识
   */
  id?: string
  /**
   * 一言正文。编码方式 unicode。使用 utf-8。
   */
  hitokoto?: string
  /**
   * 类型。请参考第三节参数的表格
   */
  type?: string
  /**
   * 一言的出处
   */
  from?: string
  /**
   * 一言的作者
   */
  from_who?: string
  /**
   * 添加者
   */
  creator?: string
  /**
   * 添加者用户标识
   */
  creator_uid?: string
  /**
   * 审核员标识
   */
  reviewer?: string
  /**
   * 一言唯一标识；可以链接到 https://hitokoto.cn?uuid=[uuid] 查看这个一言的完整信息
   */
  uuid?: string
  /**
   * 提交方式
   */
  commit_from?: string
  /**
   * 添加时间
   */
  created_at?: string
  /**
   * 句子长度
   */
  length?: number
}

/**
 *  获取一言
 * @returns  Promise<Hitokoto> 一言
 */
export default function getHotokoto(): Promise<Hitokoto> {
  return fetch('https://v1.hitokoto.cn')
    .then(res => res.json()).catch(() => {
      return {
        hitokoto: '网络错误',
        from: '网络错误',
        id: '0',
        type: 'error',
        from_who: '网络错误',
        creator: '网络错误',
        creator_uid: '0',
        reviewer: '0',
        uuid: '0',
        commit_from: '网络错误',
        created_at: '网络错误',
        length: 0,
      }
    })
}
