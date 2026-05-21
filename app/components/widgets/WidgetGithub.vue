<script setup lang="ts">
/**
 * GitHub 贡献图组件
 * 作用：调用第三方 API 获取用户真实的 GitHub 提交记录并以点阵图形式展示
 * 特色：支持全宽展示、Hover 放大交互、实时数据抓取
 */
import type { DashboardItem } from '~/data/dashboard'
import { computed } from 'vue'
import { siteConfig } from '~/data/site-config'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()

const username = siteConfig.widgets?.github?.username || 'hb0730'
const { data, pending, error } = useFetch<{
  contributions: any[][]
  totalContributions: number
}>(`https://github-contributions-api.deno.dev/${username}.json`, {
  lazy: true,
  server: false,
})

// Map levels to UnoCSS classes
const colorMap: Record<string, string> = {
  NONE: 'bg-white/5',
  FIRST_QUARTILE: 'bg-emerald-900',
  SECOND_QUARTILE: 'bg-emerald-600',
  THIRD_QUARTILE: 'bg-emerald-400',
  FOURTH_QUARTILE: 'bg-emerald-200',
}

// Get more weeks to fit the full-row width (approx 48-50 weeks)
const displayedWeeks = computed(() => {
  if (!data.value?.contributions)
    return []
  return data.value.contributions.slice(-48)
})
</script>

<template>
  <ClientOnly>
    <!-- 全局跳转链接 -->
    <a 
      :href="`https://github.com/${username}`" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="absolute inset-0 z-30"
    />

    <div class="flex flex-col h-full justify-between relative">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <i class="i-ri-github-fill text-emerald-500 text-xl" />
          <span class="text-[10px] font-black uppercase tracking-widest text-emerald-500">
            {{ siteConfig.widgets?.github?.label || 'GitHub Activity' }}
          </span>
        </div>
        <span class="text-[9px] text-slate-500 font-bold opacity-50 uppercase tracking-tighter">Last 12 Months</span>
      </div>

      <!-- Real Data Graph -->
      <div v-if="pending" class="flex gap-[4px] mt-4 opacity-30 animate-pulse justify-between">
        <div v-for="w in 48" :key="w" class="flex flex-col gap-[4px]">
          <div v-for="d in 7" :key="d" class="w-3 h-3 rounded-[2px] bg-white/10" />
        </div>
      </div>

      <div v-else-if="error" class="flex-1 flex items-center justify-center text-[10px] text-rose-400 italic">
        Failed to load GitHub data
      </div>

      <div v-else class="flex-1 flex flex-col justify-center min-h-0 py-4">
        <div class="opacity-90 hover:opacity-100 transition-opacity overflow-x-auto overflow-y-hidden no-scrollbar">
          <div class="flex gap-[4px] sm:gap-[5px] min-w-max pb-2 px-1">
            <div v-for="(week, wIdx) in displayedWeeks" :key="wIdx" class="flex flex-col gap-[4px] sm:gap-[5px]">
              <div
                v-for="(day, dIdx) in week"
                :key="dIdx"
                class="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[2px] transition-all duration-500 hover:(scale-150 z-10 shadow-[0_0_15px_rgba(52,211,153,0.6)])"
                :class="colorMap[day.contributionLevel] || 'bg-white/5'"
                :title="`${day.date}: ${day.contributionCount} commits`"
              />
            </div>
          </div>
        </div>

        <!-- Stats Summary Layer -->
        <div class="mt-6 grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
          <div class="text-center">
            <div class="text-lg font-black text-white">
              {{ data?.totalContributions }}
            </div>
            <div class="text-[8px] text-slate-500 uppercase tracking-widest mt-1">
              Yearly Total
            </div>
          </div>
          <div class="text-center border-x border-white/5">
            <div class="text-lg font-black text-emerald-400">
              Perfect
            </div>
            <div class="text-[8px] text-slate-500 uppercase tracking-widest mt-1">
              Build Status
            </div>
          </div>
          <div class="text-center">
            <div class="text-lg font-black text-white">
              Active
            </div>
            <div class="text-[8px] text-slate-500 uppercase tracking-widest mt-1">
              Coding Streak
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between opacity-60 border-t border-white/5 pt-3">
        <div class="flex items-center gap-2">
          <img :src="siteConfig.logo" class="w-5 h-5 rounded-full border border-white/10">
          <span class="text-xs font-black text-white">@{{ username }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[8px] text-slate-500 uppercase font-bold">Less</span>
          <div class="flex gap-1">
            <div class="w-2 h-2 rounded-sm bg-white/5" />
            <div class="w-2 h-2 rounded-sm bg-emerald-900" />
            <div class="w-2 h-2 rounded-sm bg-emerald-600" />
            <div class="w-2 h-2 rounded-sm bg-emerald-400" />
            <div class="w-2 h-2 rounded-sm bg-emerald-200" />
          </div>
          <span class="text-[8px] text-slate-500 uppercase font-bold ml-1">More</span>
        </div>
      </div>
    </div>

    <template #fallback>
      <div class="flex flex-col h-full justify-between opacity-50">
        <div class="flex justify-between items-center">
          <span class="text-[9px] font-bold uppercase tracking-widest text-emerald-500">GitHub Activity</span>
          <i class="i-ri-github-fill text-emerald-500 text-lg" />
        </div>
        <div class="flex gap-[4px] mt-4 justify-between">
          <div v-for="w in 48" :key="w" class="flex flex-col gap-[4px]">
            <div v-for="d in 7" :key="d" class="w-3 h-3 rounded-[2px] bg-white/10" />
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between">
          <span class="text-xs font-black text-white">@{{ username }}</span>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>
