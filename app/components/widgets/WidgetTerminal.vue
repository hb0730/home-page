<script setup lang="ts">
import { siteConfig } from '~/data/site-config'
</script>

<template>
  <div class="h-full flex flex-col font-mono text-[10px] sm:text-xs text-emerald-400 leading-relaxed overflow-hidden">
    <div class="flex justify-between items-center border-b border-emerald-500/20 pb-2 mb-2 opacity-50">
      <span class="tracking-widest">bash</span>
      <div class="flex gap-1.5">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <span class="w-2.5 h-2.5 rounded-full bg-green-500/50" />
      </div>
    </div>
    <div class="mt-auto">
      <div>
        <span class="text-emerald-600 font-bold">{{ siteConfig.widgets?.terminal?.user || 'user' }}@{{ siteConfig.widgets?.terminal?.host || 'local' }}:~$</span> {{ siteConfig.widgets?.terminal?.command }}
      </div>
      <div v-for="(log, i) in siteConfig.widgets?.terminal?.logs" :key="i" class="mt-1 opacity-70">
        {{ log }}
      </div>
      <div class="mt-1 text-white font-bold">
        Ready. <span class="animate-pulse bg-emerald-400 text-transparent">_</span>
      </div>
    </div>
  </div>
</template>
