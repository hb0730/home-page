<script setup lang="ts">
/**
 * 核心项目展示组件
 * 作用：展示主要的开发项目、作品或产品
 * 特色：支持 Featured 勋章展示、Tag 列表渲染、以及底部渐变装饰
 */
import type { DashboardItem } from '~/data/dashboard'

defineProps<{
  item: Extract<DashboardItem, { type: 'project' }>
}>()
</script>

<template>
  <div class="flex flex-col h-full">
    <div>
      <div class="flex items-center justify-between">
        <span class="text-9px font-bold uppercase tracking-0.2em text-white/30">
          {{ item.data.featured ? 'Primary Work' : 'Project' }}
        </span>
        <i v-if="item.data.icon" :class="item.data.icon" class="text-xl text-white/50" />
      </div>
      <h3 class="mt-2 text-2xl font-black text-white leading-tight">
        <a :href="item.data.href" target="_blank" rel="noopener noreferrer" class="hover:underline hover:decoration-white/30 hover:underline-offset-4">
          {{ item.data.title }}
        </a>
      </h3>
    </div>
    <p class="mt-4 text-xs text-slate-400 leading-relaxed">
      {{ item.data.description }}
    </p>

    <!-- Special decoration for long cards -->
    <div v-if="item.data.span?.includes('row-span-2') && !item.data.span?.includes('col-span-2')" class="mt-auto h-24 w-full bg-gradient-to-t from-white/5 to-transparent rounded-t-2xl border-t border-x border-white/5" />

    <div v-if="item.data.tags" class="mt-auto pt-6 flex flex-wrap gap-2">
      <span v-for="tag in item.data.tags" :key="tag" class="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-8px font-bold uppercase tracking-0.1em text-slate-400">
        {{ tag }}
      </span>
    </div>
  </div>
</template>
