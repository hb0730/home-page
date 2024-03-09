import { defineStore } from 'pinia'
export interface StoreType {
  // 加载状态
  loadStatus: boolean
  // 壁纸种类
  coverType: number
  // 页面宽度
  innerWidth?: number
}
export const mainStore = defineStore('main', {
  state: (): StoreType => {
    return {
      loadStatus: false, // 加载状态
      coverType: 0, // 壁纸种类
      innerWidth: undefined, // 屏幕宽度
    }
  },
  getters: {
    /**
     *  获取屏幕宽度
     * @param state .
     * @returns .
     */
    getInnerWidth(state) {
      return state.innerWidth
    },
    /**
     *  获取壁纸种类
     * @param state .
     * @returns .
     */
    getCoverType(state) {
      return state.coverType
    },
  },
  actions: {
    /**
     * 设置页面宽度
     * @param value 页面宽度
     */
    setInnerWidth(value: number) {
      this.innerWidth = value
    },
    /**
     * 设置加载状态
     * @param value 加载状态
     */
    setLoadStatus(value: boolean) {
      this.loadStatus = value
    },
  },
})
