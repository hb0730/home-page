<script setup lang="ts">
import { siteConfig } from '~/data/site-config'
import type { DashboardItem } from '~/data/dashboard'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()

const cups = siteConfig.widgets?.coffee?.cups || 3
const arr = Array.from({ length: 5 }, (_, i) => i < cups)
</script>

<template>
  <div class="flex flex-col h-full items-center justify-between text-center group/coffee">
    <span class="text-[9px] font-bold uppercase tracking-widest text-orange-400">
      {{ siteConfig.widgets?.coffee?.label || 'Coffee Intaken' }}
    </span>
    
    <div class="flex-1 flex flex-col justify-center items-center gap-3">
       <div class="text-4xl text-orange-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.4)] transition-transform duration-500 group-hover/coffee:-translate-y-2 group-hover/coffee:scale-110">
         ☕
       </div>
       
       <div class="flex gap-1.5 mt-2">
         <div 
           v-for="(filled, index) in arr" 
           :key="index"
           class="w-2.5 h-6 rounded-full transition-colors duration-500"
           :class="filled ? 'bg-orange-500 shadow-[0_0_10px_rgba(234,88,12,0.6)]' : 'bg-white/10'"
           :style="{ transitionDelay: `${index * 100}ms` }"
         ></div>
       </div>
    </div>
    
    <div class="text-sm font-black text-white">
      {{ cups }} / 5 Cups
    </div>
  </div>
</template>
