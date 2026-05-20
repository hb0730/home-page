<script setup lang="ts">
import { siteConfig } from '~/data/site-config'
</script>

<template>
  <div class="flex items-center gap-6 h-full">
    <a v-if="siteConfig.widgets?.music?.url" :href="siteConfig.widgets?.music?.url" target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-30" />
    <div class="relative w-20 h-20 rounded-full border-4 border-slate-800 bg-slate-900 shadow-[0_10px_20px_rgba(0,0,0,0.5)] flex items-center justify-center animate-spin" style="animation-duration: 4s;">
      <!-- Record center -->
      <div class="w-6 h-6 rounded-full border border-slate-700 bg-indigo-500 shadow-inner" />
      <!-- Record grooves -->
      <div class="absolute w-16 h-16 rounded-full border-t-2 border-white/10" />
      <div class="absolute w-12 h-12 rounded-full border-b-2 border-white/5" />
    </div>
    <div class="flex-1">
      <div class="text-[9px] font-bold uppercase tracking-widest text-indigo-400 mb-1 flex items-center gap-2">
        <i class="i-ri-music-fill" /> Now Playing
      </div>
      <div class="text-lg font-black text-white truncate">
        {{ siteConfig.widgets?.music?.title || 'Unknown' }}
      </div>
      <div class="text-[10px] text-slate-400 mt-1">
        {{ siteConfig.widgets?.music?.artist || 'Unknown' }}
      </div>
      <div class="flex items-center gap-1.5 mt-3">
        <div class="w-1.5 h-3 bg-indigo-500 rounded-full animate-pulse" />
        <div class="w-1.5 h-5 bg-indigo-500 rounded-full animate-pulse" style="animation-delay: 150ms" />
        <div class="w-1.5 h-2 bg-indigo-500 rounded-full animate-pulse" style="animation-delay: 300ms" />
        <div class="w-1.5 h-6 bg-indigo-500 rounded-full animate-pulse" style="animation-delay: 450ms" />
        <div class="w-1.5 h-4 bg-indigo-500 rounded-full animate-pulse" style="animation-delay: 600ms" />
      </div>
    </div>
  </div>
</template>
