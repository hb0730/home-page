import dayjs from 'dayjs'

/**
 * 时钟
 */
export interface Clock {
  /**
   * 年
   */
  year: number
  /**
   * 月
   */
  month: number
  /**
   * 日
   */
  day: number
  /**
   * 时
   */
  hour: number
  /**
   * 分
   */
  minute: number
  /**
   * 秒
   */
  second: number
  /**
   * 星期
   */
  weekday: string
}

/**
 * 时间胶囊
 */
export interface TimeCapsule {
  /**
   * 日进度
   */
  day: CapsuleProgress
  /**
   * 周进度
   */
  week: CapsuleProgress
  /**
   * 月进度
   */
  month: CapsuleProgress
  /**
   * 年进度
   */
  year: CapsuleProgress
}
/**
 * 时间胶囊进度
 */
export interface CapsuleProgress {
  /**
   * 名称
   */
  name: '今日' | '本周' | '本月' | '今年' | ''
  /**
   * 总时间
   */
  total: number
  /**
   * 已经过去的时间
   */
  elapsed: number
  /**
   * 剩余时间
   */
  remaining: number
  /**
   * 进度
   */
  pass: string
  unit?: 'day' | 'week' | 'month' | 'year'
}

/**
 *  获取当前时间
 * @returns 当前时间
 */
export function getCurrentTime(): Clock {
  const date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const currentTime = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekday: weekday[date.getDay()],
  }
  return currentTime
}

/**
 *  时光胶囊
 * @returns  时光胶囊
 */
export function getTimeCapsule(): TimeCapsule {
  const now = dayjs()
  const dayText = {
    day: '今日',
    week: '本周',
    month: '本月',
    year: '今年',
  }
  /**
   *  获取时间差
   * @param unit .
   */
  const getDiff = (unit: 'day' | 'week' | 'month' | 'year'): CapsuleProgress => {
    // 获取当前时间单位的开始时间
    const start = now.startOf(unit)
    // 获取当前时间单位的结束时间
    const end = now.endOf(unit)
    // 获取当前时间单位的总时间
    const total = end.diff(start, unit === 'day' ? 'hour' : 'day') + 1
    // 计算已经过去的时间(天数/小时)
    let passed = now.diff(start, unit === 'day' ? 'hour' : 'day')
    if (unit === 'week') {
      passed = (passed + 6) % 7
    }
    const remaining = total - passed
    const pass = (passed / total) * 100
    return {
      name: dayText[unit] as '今日' | '本周' | '本月' | '今年' | '',
      total,
      elapsed: passed,
      remaining,
      pass: pass.toFixed(2),
      unit,
    }
  }
  return {
    day: getDiff('day'),
    week: getDiff('week'),
    month: getDiff('month'),
    year: getDiff('year'),
  }
}
