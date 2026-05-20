<script setup lang="ts">
import type { DashboardItem } from '~/data/dashboard'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()
</script>

<template>
  <div class="flex items-center justify-center flex-col h-full text-center">
    <p class="text-9px italic text-slate-500 leading-tight">
      "{{ item.data.content }}"
    </p>
  </div>
</template>
