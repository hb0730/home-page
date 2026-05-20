<script setup lang="ts">
/**
 * 站点/链接卡片组件
 * 作用：展示外部网站链接
 * 特色：内置“悬停揭秘”逻辑，如果配置了 hoverImage（如二维码），悬停时会全屏展示
 */
import type { DashboardItem } from '~/data/dashboard'

defineProps<{
  item: Extract<DashboardItem, { type: 'site' }>
}>()

function getHostname(url: string) {
  try {
    return new URL(url).hostname
  }
  catch {
    return url.replace(/^https?:\/\//, '').split('/')[0]
  }
}
</script>

<template>
  <a :href="item.data.href" target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-30" />

  <!-- 默认状态：像普通 Icon 卡片一样 -->
  <div class="flex flex-col justify-between h-full transition-opacity duration-300" :class="{ 'group-hover:opacity-0': item.data.hoverImage }">
    <div class="text-3xl text-white/80 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
      <img v-if="item.data.icon?.startsWith('/') || item.data.icon?.startsWith('http')" :src="item.data.icon" class="h-10 w-10 rounded-xl object-cover">
      <i v-else-if="item.data.icon" :class="item.data.icon" />
      <span v-else>🚀</span>
    </div>

    <div class="mt-4">
      <h4 class="text-sm font-bold text-white">
        {{ item.data.title }}
      </h4>
      <p class="mt-1 text-9px text-slate-400 line-clamp-2 leading-relaxed">
        {{ item.data.description || getHostname(item.data.href) }}
      </p>
    </div>
  </div>

  <!-- 悬停状态：大图占满整个卡片 -->
  <div v-if="item.data.hoverImage" class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 pointer-events-none">
    <div class="p-2 bg-white/10 rounded-2xl shadow-2xl border border-white/20 transform scale-75 transition-transform duration-500 group-hover:scale-100">
      <img :src="item.data.hoverImage" class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover">
    </div>
    <p class="text-[9px] font-bold text-white uppercase tracking-widest mt-4 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
      View Detail
    </p>
  </div>
</template>
