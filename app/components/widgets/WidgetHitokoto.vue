<script setup lang="ts">
/**
 * 一言 (Hitokoto) 组件
 * 作用：调用 hitokoto.cn 接口获取随机语录
 * 特色：点击卡片可手动刷新语录，支持 Playfair Display 艺术字体渲染
 */
import type { DashboardItem } from '~/data/dashboard'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()

const { data, pending, refresh } = useFetch<any>('https://v1.hitokoto.cn', {
  lazy: true,
  server: false,
})
</script>

<template>
  <ClientOnly>
    <div class="flex flex-col h-full justify-between group/hitokoto cursor-pointer" @click="refresh">
      <div class="flex justify-between items-center opacity-50">
        <span class="text-[9px] font-bold uppercase tracking-widest">Hitokoto / 一言</span>
        <i class="i-ri-refresh-line transition-transform duration-500 group-hover/hitokoto:rotate-180" />
      </div>

      <div class="flex-1 flex flex-col justify-center py-2">
        <div v-if="pending" class="space-y-2 animate-pulse">
          <div class="h-3 w-full bg-white/10 rounded" />
          <div class="h-3 w-2/3 bg-white/10 rounded" />
        </div>
        <div v-else class="space-y-3">
          <p class="text-sm font-medium leading-relaxed text-white/90 serif-italic">
            「{{ data?.hitokoto }}」
          </p>
          <p class="text-right text-[10px] text-slate-500 font-bold">
            —— {{ data?.from_who || data?.creator || '佚名' }} · 《{{ data?.from }}》
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 text-[8px] text-slate-600 font-bold uppercase tracking-tighter">
        <span>Click to refresh</span>
        <div class="w-1 h-1 rounded-full bg-purple-500" />
      </div>
    </div>

    <!-- 骨架屏占位，确保 SSR 结构一致 -->
    <template #fallback>
      <div class="flex flex-col h-full justify-between opacity-50">
        <div class="flex justify-between items-center opacity-50">
          <span class="text-[9px] font-bold uppercase tracking-widest">Hitokoto / 一言</span>
          <i class="i-ri-refresh-line" />
        </div>
        <div class="flex-1 flex flex-col justify-center py-2 space-y-2 animate-pulse">
          <div class="h-3 w-full bg-white/10 rounded" />
          <div class="h-3 w-2/3 bg-white/10 rounded" />
        </div>
        <div class="flex items-center gap-2 text-[8px] text-slate-600 font-bold uppercase tracking-tighter">
          <span>Loading...</span>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<style scoped>
.serif-italic {
  font-family: 'Playfair Display', serif;
  font-style: italic;
}
</style>
