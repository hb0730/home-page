<script setup lang="ts">
/**
 * 月相追踪组件
 * 作用：根据当前日期实时计算并展示月亮的盈亏状态
 * 特色：内置天文算法计算月龄，带星空背景装饰和发光动效
 */
import type { DashboardItem } from '~/data/dashboard'
import { onMounted, ref } from 'vue'
import { siteConfig } from '~/data/site-config'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()

// Real moon phase calculation
function getMoonPhase() {
  const date = new Date()
  const lp = 2551443
  const now = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 35, 0)
  const newMoon = new Date(1970, 0, 7, 20, 35, 0)
  const phase = ((now.getTime() - newMoon.getTime()) / 1000) % lp
  const moonAge = Math.floor(phase / (24 * 3600)) + 1

  if (moonAge < 2)
    return { emoji: '🌑', label: 'New Moon' }
  if (moonAge < 7)
    return { emoji: '🌒', label: 'Waxing Crescent' }
  if (moonAge < 10)
    return { emoji: '🌓', label: 'First Quarter' }
  if (moonAge < 15)
    return { emoji: '🌔', label: 'Waxing Gibbous' }
  if (moonAge < 17)
    return { emoji: '🌕', label: 'Full Moon' }
  if (moonAge < 22)
    return { emoji: '🌖', label: 'Waning Gibbous' }
  if (moonAge < 25)
    return { emoji: '🌗', label: 'Last Quarter' }
  if (moonAge < 30)
    return { emoji: '🌘', label: 'Waning Crescent' }
  return { emoji: '🌑', label: 'New Moon' }
}

const moonPhase = ref(getMoonPhase())

onMounted(() => {
  moonPhase.value = getMoonPhase()
})
</script>

<template>
  <div class="flex flex-col h-full items-center justify-between text-center relative overflow-hidden">
    <!-- Starry background inside the moon widget -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-50">
      <div class="absolute top-4 left-6 w-0.5 h-0.5 bg-white rounded-full" />
      <div class="absolute top-10 right-4 w-1 h-1 bg-white rounded-full blur-[1px]" />
      <div class="absolute bottom-6 left-12 w-0.5 h-0.5 bg-white rounded-full" />
    </div>

    <span class="text-[9px] font-bold uppercase tracking-widest text-slate-400 relative z-10">
      {{ siteConfig.widgets?.moon?.label || 'Lunar Phase' }}
    </span>

    <div class="flex-1 flex items-center justify-center relative z-10">
      <div class="text-6xl drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-pulse" style="animation-duration: 4s;">
        {{ moonPhase.emoji }}
      </div>
    </div>

    <div class="relative z-10">
      <div class="text-sm font-black text-white">
        {{ moonPhase.label }}
      </div>
      <div class="text-[8px] text-slate-500 uppercase tracking-widest mt-1">
        Real-time Data
      </div>
    </div>
  </div>
</template>
