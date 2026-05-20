<script setup lang="ts">
import { ref } from 'vue'
import { siteConfig } from '~/data/site-config'
import TimeDisplay from './TimeDisplay.vue'

const panelRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)

function onMouseMove(e: MouseEvent) {
  if (!panelRef.value)
    return
  const rect = panelRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}
</script>

<template>
  <aside
    ref="panelRef"
    class="group relative flex flex-col justify-between overflow-hidden rounded-48px border border-white/10 bg-white/2 p-10 shadow-[0_50px_150px_rgba(0,0,0,0.9)] backdrop-blur-40px saturate-150 transition-all duration-500 hover:(border-white/20 bg-white/5) sm:min-h-600px"
    @mousemove="onMouseMove"
  >
    <!-- 交互式聚光灯 -->
    <div
      class="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      :style="{
        background: `radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 40%)`,
      }"
    />

    <div class="relative z-10">
      <img
        :src="siteConfig.logo"
        :alt="siteConfig.author"
        referrerpolicy="no-referrer"
        class="mb-8 block h-20 w-20 rounded-3xl object-cover shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-all duration-500 group-hover:(scale-110 rotate-3 shadow-[0_0_80px_rgba(255,255,255,0.4)])"
      >

      <h1 class="mb-4 text-4xl font-black tracking-tight text-white transition-colors duration-500 group-hover:(text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60)">
        {{ siteConfig.author }}.
      </h1>
      <p class="mb-12 text-sm font-medium leading-relaxed text-slate-400 transition-colors duration-500 group-hover:text-slate-200">
        {{ siteConfig.description }}
      </p>

      <TimeDisplay />
    </div>
    <!-- Configurable Socials -->
    <div class="relative z-10 mt-12 flex flex-wrap gap-4">
      <a
        v-for="social in siteConfig.socials"
        :key="social.name"
        :href="social.url"
        :title="social.tip"
        target="_blank"
        rel="noopener noreferrer"
        class="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl transition-all hover:(-translate-y-2 scale-110 bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.2)])"
      >
        <i :class="social.icon" />
      </a>
    </div>
  </aside>
</template>
