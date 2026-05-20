<script setup lang="ts">
import type { DashboardItem } from '~/data/dashboard'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()
</script>

<template>
  <div class="flex items-center justify-center flex-col h-full text-center">
    <div class="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400 shadow-[0_0_20px_#60a5fa]" />
    <span class="mt-4 text-9px font-bold uppercase tracking-0.2em text-blue-400">{{ item.data.title }}</span>
  </div>
</template>
