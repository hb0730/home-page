<script setup lang="ts">
import type { DashboardItem } from '~/data/dashboard'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()
</script>

<template>
  <div class="flex items-center justify-center flex-col h-full text-center">
    <div class="font-serif text-2xl font-black italic text-slate-200/50">
      {{ item.data.title }}
    </div>
    <span class="mt-1 text-8px font-bold uppercase tracking-0.1em text-white/20">WIP</span>
  </div>
</template>
