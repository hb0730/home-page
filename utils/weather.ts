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
  return ownthink()
}

/**
 * 教书先生API https://api.oioweb.cn/doc/weather/GetWeather
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
