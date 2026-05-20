<script setup lang="ts">
/**
 * 技术栈走马灯组件
 * 作用：以无限循环滚动的方式展示技术标签
 * 特色：纯 CSS 动画实现，支持双向交错滚动，自动适配 siteConfig 中的 tags
 */
import { siteConfig } from '~/data/site-config'

const tags = siteConfig.widgets?.marquee?.tags || []
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <span class="text-[9px] font-bold uppercase tracking-widest text-amber-500">Full Stack</span>

    <div class="flex-1 flex flex-col justify-center overflow-hidden">
      <!-- Infinite Marquee -->
      <div class="flex flex-col gap-2 mask-linear-fade">
        <div class="marquee-track flex gap-2">
          <div v-for="tag in [...tags, ...tags]" :key="tag" class="whitespace-nowrap px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold text-amber-200">
            {{ tag }}
          </div>
        </div>
        <div class="marquee-track-reverse flex gap-2 ml-[-50%]">
          <div v-for="tag in [...tags.slice().reverse(), ...tags.slice().reverse()]" :key="tag" class="whitespace-nowrap px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">
            {{ tag }}
          </div>
        </div>
      </div>
    </div>

    <div class="text-right text-[10px] font-black text-amber-600/50 italic">
      Always Learning.
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
.marquee-track {
  animation: marquee 20s linear infinite;
}
.marquee-track-reverse {
  animation: marquee-reverse 25s linear infinite;
}
.mask-linear-fade {
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}
</style>
