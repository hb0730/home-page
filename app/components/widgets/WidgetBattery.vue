<script setup lang="ts">
import { siteConfig } from '~/data/site-config'
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <span class="text-[9px] font-bold uppercase tracking-widest text-amber-500">{{ siteConfig.widgets?.battery?.label || 'Energy' }}</span>
    <div class="flex justify-center items-center flex-1 my-2">
      <!-- Battery Icon Body -->
      <div class="w-12 h-20 border-2 border-white/20 rounded-xl p-1 relative flex flex-col justify-end shadow-inner">
        <!-- Battery Top Node -->
        <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-white/20 rounded-t-sm" />
        <!-- Battery Fill -->
        <div class="w-full bg-gradient-to-t from-amber-500 to-amber-300 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-1000" :style="{ height: `${siteConfig.widgets?.battery?.level || 100}%` }" />
      </div>
    </div>
    <div class="text-center font-black text-2xl text-white tracking-tighter">
      {{ siteConfig.widgets?.battery?.level || 100 }}%
    </div>
  </div>
</template>
