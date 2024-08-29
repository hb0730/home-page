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
   * 已经过去的时间
   */
  elapsed: number
  /**
   * 进度
   */
  pass: number
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
  // 日进度
  const todayStartDate = new Date(new Date().toLocaleDateString()).getTime()
  const todayPassHours = (new Date().getTime() - todayStartDate) / 1000 / 60 / 60
  const todayPassHoursPercent = (todayPassHours / 24) * 100

  // 周进度
  const weeks = [7, 1, 2, 3, 4, 5, 6]
  const weekDay = weeks[new Date().getDay()]
  const weekDayPassPercent = (weekDay / 7) * 100

  // 月进度
  const year = new Date().getFullYear()
  const date = new Date().getDate()
  const month = new Date().getMonth() + 1
  const monthAll = new Date(year, month, 0).getDate()
  const monthPassPercent = (date / monthAll) * 100

  // 年进度
  const yearStartDate = new Date(year, 0, 1).getTime()
  const yearEndDate = new Date(year + 1, 0, 1).getTime()
  const yearPassHours = (new Date().getTime() - yearStartDate) / 1000 / 60 / 60
  const yearTotalHours = (yearEndDate - yearStartDate) / 1000 / 60 / 60
  const yearPassPercent = (yearPassHours / yearTotalHours) * 100

  return {
    day: {
      elapsed: Math.floor(todayPassHours),
      pass: Math.floor(todayPassHoursPercent),
    },
    week: {
      elapsed: weekDay,
      pass: Math.floor(weekDayPassPercent),
    },
    month: {
      elapsed: date,
      pass: Math.floor(monthPassPercent),
    },
    year: {
      elapsed: month - 1,
      pass: Math.floor(yearPassPercent),
    },
  }
}
