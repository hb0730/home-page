<script setup lang="ts">
import type { DashboardItem } from '~/data/dashboard'
import { sites } from '~/data/sites'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()

const displaySites = sites.slice(0, 2)
</script>

<template>
  <!-- Widget Type: Status -->
  <template v-if="item.data.type === 'status'">
    <div class="flex items-center justify-center flex-col h-full text-center">
      <div class="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400 shadow-[0_0_20px_#60a5fa]" />
      <span class="mt-4 text-9px font-bold uppercase tracking-0.2em text-blue-400">{{ item.data.title }}</span>
    </div>
  </template>

  <!-- Widget Type: Lab -->
  <template v-else-if="item.data.type === 'lab'">
    <div class="flex items-center justify-center flex-col h-full text-center">
      <div class="font-serif text-2xl font-black italic text-slate-200/50">
        {{ item.data.title }}
      </div>
      <span class="mt-1 text-8px font-bold uppercase tracking-0.1em text-white/20">WIP</span>
    </div>
  </template>

  <!-- Widget Type: Quote -->
  <template v-else-if="item.data.type === 'quote'">
    <div class="flex items-center justify-center flex-col h-full text-center">
      <p class="text-9px italic text-slate-500 leading-tight">
        "{{ item.data.content }}"
      </p>
    </div>
  </template>

  <!-- Widget Type: Links/Ecosystem -->
  <template v-else-if="item.data.type === 'links'">
    <div class="flex items-center justify-between h-full w-full">
      <div>
        <span class="text-9px font-bold uppercase tracking-0.2em text-white/30">Ecosystem</span>
        <h3 class="mt-1 text-xl font-black text-white">
          {{ item.data.title }}
        </h3>
      </div>
      <div class="flex gap-2">
        <div v-for="site in displaySites" :key="site.title" class="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-bold border border-white/5">
          {{ site.title[0] }}
        </div>
      </div>
    </div>
  </template>
</template>
