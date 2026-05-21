<script setup lang="ts">
import type { DashboardItem } from '~/data/dashboard'
/**
 * 实时天气组件 (API 驱动版)
 * 作用：调用 Open-Meteo 公共接口获取当前位置的实时天气
 * 特色：自动映射天气代码到动态图标，支持温度、风速、湿度实时显示
 */
import { computed } from 'vue'
import { siteConfig } from '~/data/site-config'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()

// 从配置中获取坐标，实现天气与地理位置的联动
const locConfig = siteConfig.widgets?.location
const lat = locConfig?.coords?.latNum ?? 22.54
const lon = locConfig?.coords?.lngNum ?? 114.05

// 使用 Nuxt useFetch 获取实时天气数据
const { data, pending, error } = useFetch<any>(
  `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=auto`,
  {
    lazy: true,
    server: false,
  },
)

/**
 * WMO 天气代码映射：将 API 返回的状态码转换为图标和描述
 * 参考：https://open-meteo.com/en/docs
 */
const weatherMap = computed(() => {
  const code = data.value?.current?.weather_code ?? 0
  const isDay = data.value?.current?.is_day ?? 1

  const map: Record<number, { icon: string, label: string, color: string }> = {
    0: { icon: isDay ? 'i-ri-sun-fill' : 'i-ri-moon-clear-fill', label: '晴朗', color: 'text-amber-400' },
    1: { icon: isDay ? 'i-ri-sun-cloudy-fill' : 'i-ri-moon-cloudy-fill', label: '晴间多云', color: 'text-sky-300' },
    2: { icon: 'i-ri-cloudy-fill', label: '多云', color: 'text-slate-400' },
    3: { icon: 'i-ri-cloudy-2-fill', label: '阴天', color: 'text-slate-500' },
    45: { icon: 'i-ri-mist-fill', label: '有雾', color: 'text-slate-300' },
    48: { icon: 'i-ri-mist-fill', label: '霾', color: 'text-slate-400' },
    51: { icon: 'i-ri-drizzle-fill', label: '毛毛雨', color: 'text-blue-300' },
    61: { icon: 'i-ri-rainy-fill', label: '小雨', color: 'text-blue-400' },
    63: { icon: 'i-ri-rainy-fill', label: '中雨', color: 'text-blue-500' },
    65: { icon: 'i-ri-rainy-fill', label: '大雨', color: 'text-blue-600' },
    71: { icon: 'i-ri-snowy-fill', label: '小雪', color: 'text-white' },
    95: { icon: 'i-ri-thunderstorms-fill', label: '雷阵雨', color: 'text-purple-400' },
  }

  return map[code] || map[0]
})

const currentTemp = computed(() => Math.round(data.value?.current?.temperature_2m ?? 26))
const humidity = computed(() => data.value?.current?.relative_humidity_2m ?? 0)
const windSpeed = computed(() => data.value?.current?.wind_speed_10m ?? 0)
</script>

<template>
  <div class="flex flex-col h-full justify-between group/weather">
    <div class="flex justify-between items-center opacity-50">
      <span class="text-[9px] font-bold uppercase tracking-widest">{{ siteConfig.widgets?.weather?.label || 'Weather' }}</span>
      <span v-if="!pending" class="text-[8px] uppercase font-bold">{{ weatherMap.label }}</span>
    </div>

    <div class="flex-1 flex flex-col items-center justify-center gap-2">
      <!-- 加载状态 -->
      <div v-if="pending" class="animate-pulse flex flex-col items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-white/10" />
        <div class="w-16 h-8 bg-white/10 rounded" />
      </div>

      <!-- 错误处理 -->
      <div v-else-if="error" class="text-rose-400 text-[10px] italic">
        Weather Offline
      </div>

      <!-- 实时数据展示 -->
      <template v-else>
        <div class="relative">
          <i :class="[weatherMap.icon, weatherMap.color]" class="text-5xl transition-transform duration-700 group-hover/weather:scale-110" />
          <!-- 动态光晕层 -->
          <div class="absolute -inset-4 opacity-20 blur-2xl rounded-full -z-1" :class="weatherMap.color.replace('text-', 'bg-')" />
        </div>
        <div class="flex items-baseline gap-1">
          <span class="text-4xl font-black text-white leading-none">{{ currentTemp }}</span>
          <span class="text-sm font-bold opacity-40">°C</span>
        </div>
      </template>
    </div>

    <!-- 底部详情栏 -->
    <div class="flex justify-between items-center text-[9px] font-bold text-slate-500 uppercase tracking-tighter border-t border-white/5 pt-3">
      <div class="flex items-center gap-1.5">
        <i class="i-ri-windy-line" />
        <span>{{ windSpeed }}<small class="lowercase ml-0.5">km/h</small></span>
      </div>
      <div class="flex items-center gap-1.5">
        <i class="i-ri-drop-line" />
        <span>{{ humidity }}%</span>
      </div>
    </div>
  </div>
</template>
