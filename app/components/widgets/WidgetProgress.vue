<script setup lang="ts">
import { computed } from 'vue'
import { siteConfig } from '~/data/site-config'

const progress = computed(() => {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const end = new Date(now.getFullYear() + 1, 0, 1)
  return Math.floor((now.getTime() - start.getTime()) / (end.getTime() - start.getTime()) * 100)
})

const daysLeft = computed(() => {
  const now = new Date()
  const end = new Date(now.getFullYear(), 11, 31)
  return Math.floor((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
})
</script>

<template>
  <div class="flex flex-col h-full justify-between text-center">
    <span class="text-[9px] font-bold uppercase tracking-widest text-rose-500">
      {{ siteConfig.widgets?.progress?.label || 'Year Progress' }}
    </span>

    <div class="flex-1 flex flex-col justify-center items-center">
      <div class="relative w-24 h-24 flex items-center justify-center">
         <!-- Circular Progress SVG -->
         <svg class="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6" fill="transparent" class="text-white/5" />
            <circle cx="48" cy="48" r="40" stroke="currentColor" stroke-width="6" fill="transparent" 
              class="text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" 
              :style="{ 
                strokeDasharray: '251.2', 
                strokeDashoffset: 251.2 - (251.2 * progress) / 100,
                transition: 'stroke-dashoffset 2s ease-out'
              }" 
            />
         </svg>
         <div class="absolute inset-0 flex flex-col items-center justify-center">
           <span class="text-2xl font-black text-white leading-none">{{ progress }}%</span>
           <span class="text-[8px] text-slate-500 font-bold uppercase mt-1">{{ new Date().getFullYear() }}</span>
         </div>
      </div>
    </div>

    <div class="text-[10px] font-medium text-slate-400">
      Only <span class="text-white font-bold">{{ daysLeft }}</span> days left.
    </div>
  </div>
</template>
