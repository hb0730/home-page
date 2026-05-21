<script setup lang="ts">
/**
 * 四季轮转交互组件
 * 作用：感知当前季节并触发全屏气候特效（樱花、落叶、大雪等）
 * 特色：支持点击手动切换季节，通过全局状态 useState 与背景引擎联动
 */
import type { DashboardItem } from '~/data/dashboard'
import { onMounted } from 'vue'
import { siteConfig } from '~/data/site-config'

defineProps<{
  item: Extract<DashboardItem, { type: 'widget' }>
}>()

// Use global state so CelestialBackground can read it
const activeSeason = useState<string>('activeSeason', () => 'spring')

onMounted(() => {
  const month = new Date().getMonth() + 1
  if (month >= 3 && month <= 5)
    activeSeason.value = 'spring'
  else if (month >= 6 && month <= 8)
    activeSeason.value = 'summer'
  else if (month >= 9 && month <= 11)
    activeSeason.value = 'autumn'
  else activeSeason.value = 'winter'
})

function setSeason(id: string) {
  activeSeason.value = id
}

const seasons = [
  { id: 'spring', icon: '🌸', name: 'Spring', color: 'text-pink-400' },
  { id: 'summer', icon: '☀️', name: 'Summer', color: 'text-amber-400' },
  { id: 'autumn', icon: '🍂', name: 'Autumn', color: 'text-orange-400' },
  { id: 'winter', icon: '❄️', name: 'Winter', color: 'text-sky-400' },
]
</script>

<template>
  <div class="flex flex-col h-full justify-between">
    <div class="flex justify-between items-center">
      <span class="text-[9px] font-bold uppercase tracking-widest text-slate-400">
        {{ siteConfig.widgets?.seasons?.label || 'Cycle of Time' }}
      </span>
      <span class="text-[8px] opacity-30 uppercase tracking-widest">Interactive</span>
    </div>

    <div class="flex-1 flex flex-col justify-center gap-3">
      <div class="flex justify-between items-center px-1">
        <template v-for="season in seasons" :key="season.id">
          <div
            class="flex flex-col items-center gap-2 transition-all duration-700 cursor-pointer"
            :class="[
              activeSeason === season.id
                ? 'scale-125 opacity-100 z-10'
                : 'scale-90 opacity-30 grayscale hover:(scale-110 opacity-70 grayscale-0)',
            ]"
            @click="setSeason(season.id)"
          >
            <!-- 图标容器 (移除 overflow-hidden 让粒子可以飞出来) -->
            <div
              class="relative w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-lg border transition-colors duration-500"
              :class="activeSeason === season.id ? 'bg-white/20 border-white/40' : 'bg-white/5 border-white/10'"
            >
              <!-- 季节专属动画层 -->
              <template v-if="activeSeason === season.id">
                <!-- 冬季：下雪 -->
                <div v-if="season.id === 'winter'" class="absolute inset-0 pointer-events-none">
                  <div class="absolute -top-4 left-2 w-1.5 h-1.5 bg-white rounded-full anim-snow" />
                  <div class="absolute -top-2 left-5 w-2 h-2 bg-white/80 rounded-full anim-snow" style="animation-delay: 0.7s;" />
                  <div class="absolute -top-6 left-7 w-1 h-1 bg-white/60 rounded-full anim-snow" style="animation-delay: 1.5s;" />
                </div>
                <!-- 春季：落樱 -->
                <div v-if="season.id === 'spring'" class="absolute inset-0 pointer-events-none">
                  <div class="absolute -bottom-4 left-2 w-2 h-2 bg-pink-300 rounded-full anim-blossom blur-[0.5px]" />
                  <div class="absolute -bottom-2 left-6 w-1.5 h-1.5 bg-rose-400 rounded-full anim-blossom" style="animation-delay: 1.2s;" />
                  <div class="absolute -bottom-6 left-4 w-2.5 h-2.5 bg-pink-200 rounded-full anim-blossom blur-[1px]" style="animation-delay: 2s;" />
                </div>
                <!-- 夏季：光芒辐射 -->
                <div v-if="season.id === 'summer'" class="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div class="absolute w-4 h-4 border-2 border-yellow-400/60 rounded-full anim-radiate" />
                  <div class="absolute w-4 h-4 border-2 border-orange-400/40 rounded-full anim-radiate" style="animation-delay: 1s;" />
                </div>
                <!-- 秋季：落叶 -->
                <div v-if="season.id === 'autumn'" class="absolute inset-0 pointer-events-none">
                  <div class="absolute -top-4 left-2 w-2 h-3 bg-amber-500 rounded-[2px] anim-leaf" />
                  <div class="absolute -top-2 left-6 w-1.5 h-2 bg-orange-600 rounded-[2px] anim-leaf" style="animation-delay: 0.9s;" />
                  <div class="absolute -top-6 left-4 w-2.5 h-3 bg-yellow-500 rounded-[2px] anim-leaf" style="animation-delay: 1.8s;" />
                </div>
              </template>

              <span class="relative z-10 drop-shadow-lg">{{ season.icon }}</span>
            </div>
            <!-- 激活状态的文字 -->
            <span
              class="text-[9px] font-black tracking-widest uppercase transition-all duration-500 absolute -bottom-5"
              :class="activeSeason === season.id ? `opacity-100 transform translate-y-0 ${season.color}` : 'opacity-0 transform -translate-y-2'"
            >
              {{ season.name }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 避免与 UnoCSS 的 animate-* 冲突，使用 anim-* 命名 */

/* Winter Snow */
@keyframes anim-snowfall {
  0% { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(50px) translateX(15px) scale(0.5); opacity: 0; }
}
.anim-snow { animation: anim-snowfall 3s linear infinite; }

/* Spring Blossom */
@keyframes anim-float-up {
  0% { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-50px) rotate(180deg) scale(1.5); opacity: 0; }
}
.anim-blossom { animation: anim-float-up 4s ease-in-out infinite; }

/* Summer Rays */
@keyframes anim-radiate {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(3.5); opacity: 0; }
}
.anim-radiate { animation: anim-radiate 2.5s ease-out infinite; }

/* Autumn Leaves */
@keyframes anim-fall-leaf {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  20% { opacity: 1; }
  100% { transform: translateY(50px) rotate(360deg); opacity: 0; }
}
.anim-leaf { animation: anim-fall-leaf 3.5s ease-in-out infinite; }
</style>
