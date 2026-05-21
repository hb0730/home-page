<script setup lang="ts">
import type { DashboardItem } from '~/data/dashboard'
/**
 * 极简日程线组件
 * 作用：以时间轴的形式展示一天的常规状态
 * 特色：当前时间段高亮闪烁，带有极客风的连线 UI
 */
import { siteConfig } from '~/data/site-config'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()

const items = siteConfig.widgets?.schedule?.items || []
// 假定第二个任务是当前活跃状态
const activeIndex = 1
</script>

<template>
  <div class="flex flex-col h-full">
    <div class="flex justify-between items-center opacity-50 mb-6">
      <span class="text-[9px] font-bold uppercase tracking-widest">{{ siteConfig.widgets?.schedule?.label || 'Routine' }}</span>
      <i class="i-ri-calendar-event-line text-lg" />
    </div>

    <div class="flex-1 flex flex-col justify-center gap-6 relative">
      <!-- 连接虚线 -->
      <div class="absolute left-2.5 top-2 bottom-2 w-px border-l-2 border-dashed border-white/10 z-0" />

      <div
        v-for="(task, idx) in items"
        :key="idx"
        class="relative z-10 flex items-center gap-4 transition-all duration-300"
        :class="idx === activeIndex ? 'opacity-100' : 'opacity-40 hover:opacity-80'"
      >
        <div
          class="w-5 h-5 rounded-full flex items-center justify-center border-4 border-slate-900"
          :class="idx === activeIndex ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)] animate-pulse' : 'bg-white/20'"
        />
        <div>
          <div class="text-[10px] font-black tracking-widest text-indigo-400 font-mono">
            {{ task.time }}
          </div>
          <div class="text-sm font-bold text-white mt-1">
            {{ task.activity }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
