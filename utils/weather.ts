export interface Weather {
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
 * Get the weather for a given location
 */
export default function getWeather(): Promise<Weather> {
  return vvhan()
}

/**
 * 教书先生API https://api.oioweb.cn/doc/weather/GetWeather
 * @deprecated
 */
async function ownthink(): Promise<Weather> {
  const response: any = await $fetch('https://api.oioweb.cn/api/weather/GetWeather', { ignoreResponseError: true })
  if (response?.code !== 200) {
    return {
      province: '',
      city: '',
      weather: '',
      temperature: '',
      wind: '',
      windPower: '',
    }
  }
  const res = response.result
  return {
    province: res.city.Province,
    city: res.city.City,
    weather: res.condition.day_weather_short,
    temperature: `${res.condition.min_degree} ~ ${res.condition.max_degree}`,
    wind: res.condition.day_wind_direction,
    windPower: res.condition.day_wind_power,
  }
}

/**
 *
 * vvhan API https://vvhan.com/api/weather
 * @returns
 */
async function vvhan(): Promise<Weather> {
  const response: any = await $fetch('https://api.vvhan.com/api/weather', { ignoreResponseError: true })
  if (!response?.success) {
    return {
      province: '',
      city: '',
      weather: '',
      temperature: '',
      wind: '',
      windPower: '',
    }
  }
  const res = response.data
  return {
    province: res.province ?? '',
    city: response.city ?? '',
    weather: res.type,
    temperature: `${res.high} ~ ${res.low}`.replaceAll('°C', ''),
    wind: res.fengxiang,
    windPower: res.fengli.replace('级', ''),
  }
}
