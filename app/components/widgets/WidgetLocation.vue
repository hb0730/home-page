<script setup lang="ts">
import type { DashboardItem } from '~/data/dashboard'
/**
 * 访客地理坐标雷达组件
 * 作用：显示一个带坐标网格的雷达扫描图，标注当前/示例位置
 * 特色：纯 CSS 动画实现的雷达扫描波，冷淡风 UI，点击跳转地图
 */
import { siteConfig } from '~/data/site-config'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()

const locConfig = siteConfig.widgets?.location || {
  label: 'Location',
  locationName: 'Unknown',
  mapUrl: '#',
  coords: { lat: '0°0\'N', lng: '0°0\'E' },
}
const coords = locConfig.coords
</script>

<template>
  <!-- 透明的全屏覆盖链接，确保点击卡片任何位置都能跳转 -->
  <a
    :href="locConfig.mapUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="absolute inset-0 z-30"
  />

  <div class="flex flex-col h-full justify-between relative overflow-hidden group/loc">
    <div class="flex justify-between items-center opacity-50 z-10 transition-opacity group-hover/loc:opacity-100">
      <div class="flex items-center gap-2">
        <span class="text-[9px] font-bold uppercase tracking-widest">{{ locConfig.label }}</span>
        <i class="i-ri-map-pin-2-fill text-[10px] text-emerald-500 transition-transform group-hover/loc:-translate-y-1" />
      </div>
      <span class="text-[8px] font-mono text-emerald-400 font-bold tracking-tighter">{{ locConfig.locationName }}</span>
    </div>

    <!-- 雷达扫描视觉效果 -->
    <div class="flex-1 flex items-center justify-center relative">
      <!-- 雷达网格圆环 -->
      <div class="absolute w-24 h-24 rounded-full border border-emerald-500/20 transition-colors group-hover/loc:border-emerald-500/40" />
      <div class="absolute w-16 h-16 rounded-full border border-emerald-500/10 transition-colors group-hover/loc:border-emerald-500/30" />
      <div class="absolute w-32 h-32 rounded-full border border-emerald-500/5 transition-colors group-hover/loc:border-emerald-500/20" />

      <!-- 坐标轴线 -->
      <div class="absolute w-full h-px bg-emerald-500/10 top-1/2 left-0 transition-colors group-hover/loc:bg-emerald-500/20" />
      <div class="absolute h-full w-px bg-emerald-500/10 left-1/2 top-0 transition-colors group-hover/loc:bg-emerald-500/20" />

      <!-- 扫描波 -->
      <div class="absolute w-16 h-16 rounded-full bg-emerald-500/20 animate-ping" />

      <!-- 目标指示器 (Blip) -->
      <div class="absolute top-1/3 left-2/3 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399] animate-pulse" />
    </div>

    <div class="z-10 bg-slate-950/40 backdrop-blur-sm p-2 rounded-lg border border-white/5 transition-all group-hover/loc:border-emerald-500/20 group-hover/loc:bg-slate-950/60">
      <div class="flex flex-col gap-1 font-mono">
        <div class="flex justify-between items-center">
          <span class="text-[8px] text-slate-500 uppercase transition-colors group-hover/loc:text-slate-400">LATITUDE</span>
          <span class="text-[10px] text-emerald-400 font-bold">{{ coords.lat }}</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-[8px] text-slate-500 uppercase transition-colors group-hover/loc:text-slate-400">LONGITUDE</span>
          <span class="text-[10px] text-emerald-400 font-bold">{{ coords.lng }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes ping {
  75%, 100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>
