<script setup lang="ts">
import { computed } from 'vue'
import { siteConfig } from '~/data/site-config'

// Calculate current season based on month (Northern Hemisphere)
const currentSeason = computed(() => {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
})

const seasons = [
  { id: 'spring', icon: '🌸', name: 'Spring', color: 'text-emerald-400' },
  { id: 'summer', icon: '☀️', name: 'Summer', color: 'text-rose-400' },
  { id: 'autumn', icon: '🍂', name: 'Autumn', color: 'text-amber-400' },
  { id: 'winter', icon: '❄️', name: 'Winter', color: 'text-sky-400' }
]
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <span class="text-[9px] font-bold uppercase tracking-widest text-slate-400">
      {{ siteConfig.widgets?.seasons?.label || 'Seasons' }}
    </span>
    
    <div class="flex-1 flex flex-col justify-center gap-3">
      <div class="flex justify-between items-center px-1">
        <template v-for="season in seasons" :key="season.id">
          <div 
            class="flex flex-col items-center gap-2 transition-all duration-500"
            :class="[
              currentSeason === season.id 
                ? 'scale-125 opacity-100' 
                : 'scale-90 opacity-30 grayscale hover:(scale-110 opacity-70 grayscale-0)'
            ]"
          >
            <div 
              class="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-lg border border-white/10"
              :class="currentSeason === season.id ? 'bg-white/15 animate-pulse' : 'bg-white/5'"
            >
              {{ season.icon }}
            </div>
            <span 
              v-if="currentSeason === season.id" 
              class="text-[9px] font-black tracking-widest uppercase transition-colors"
              :class="season.color"
            >
              {{ season.name }}
            </span>
          </div>
        </template>
      </div>
    </div>
    
    <div class="text-[10px] text-slate-500 font-medium italic text-right">
      Time flows.
    </div>
  </div>
</template>
