<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  span?: string
  glowColor?: string
  variant?: 'glass' | 'ghost' | 'circle'
}>()

const cardRef = ref<HTMLElement | null>(null)
const glareRef = ref<HTMLElement | null>(null)
const spotlightRef = ref<HTMLElement | null>(null)

let bounds: DOMRect | null = null
let mouseX = 0
let mouseY = 0
let targetRotateX = 0
let targetRotateY = 0
let currentRotateX = 0
let currentRotateY = 0
let isHovering = false
let rafId = 0

// 计算边界，避免频繁调用 getBoundingClientRect
function updateBounds() {
  if (cardRef.value) {
    bounds = cardRef.value.getBoundingClientRect()
  }
}

function onMouseEnter() {
  updateBounds()
  isHovering = true
  if (spotlightRef.value)
    spotlightRef.value.style.opacity = '1'
  if (glareRef.value)
    glareRef.value.style.opacity = '1'
  startAnimation()
}

function onMouseLeave() {
  isHovering = false
  targetRotateX = 0
  targetRotateY = 0
  if (spotlightRef.value)
    spotlightRef.value.style.opacity = '0'
  if (glareRef.value)
    glareRef.value.style.opacity = '0'

  // 快速恢复原状
  if (cardRef.value) {
    cardRef.value.style.transform = `translateY(0) scale(1) rotateX(0deg) rotateY(0deg)`
  }
}

function onMouseMove(e: MouseEvent) {
  if (!isHovering || !bounds)
    return

  // 聚光灯跟随
  mouseX = e.clientX - bounds.left
  mouseY = e.clientY - bounds.top

  if (spotlightRef.value) {
    // 【性能优化】使用 GPU 加速的 transform 替代极其昂贵的 background radial-gradient 重绘
    spotlightRef.value.style.transform = `translate(${mouseX - 400}px, ${mouseY - 400}px)`
  }

  // 3D 倾斜计算
  const centerX = bounds.width / 2
  const centerY = bounds.height / 2

  const maxRotate = props.variant === 'ghost' ? 5 : 12
  targetRotateY = ((mouseX - centerX) / centerX) * maxRotate
  targetRotateX = -((mouseY - centerY) / centerY) * maxRotate
}

function animate() {
  if (!isHovering && Math.abs(currentRotateX) < 0.1 && Math.abs(currentRotateY) < 0.1)
    return

  // 平滑缓动 (Lerp)
  currentRotateX += (targetRotateX - currentRotateX) * 0.15
  currentRotateY += (targetRotateY - currentRotateY) * 0.15

  if (cardRef.value && isHovering) {
    cardRef.value.style.transform = `translateY(-5px) scale(1.02) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`
  }

  if (glareRef.value && isHovering) {
    // 【性能优化】使用 GPU 加速的 translate 替代 linear-gradient 重绘
    glareRef.value.style.transform = `translate(${currentRotateY * -2}%, ${currentRotateX * -2}%)`
  }

  rafId = requestAnimationFrame(animate)
}

function startAnimation() {
  cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  window.addEventListener('resize', updateBounds, { passive: true })
  window.addEventListener('scroll', updateBounds, { passive: true })
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
  window.removeEventListener('resize', updateBounds)
  window.removeEventListener('scroll', updateBounds)
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'ghost':
      return 'border-transparent bg-transparent p-4 hover:bg-white/5 hover:border-white/10'
    case 'circle':
      return 'rounded-full border border-white/10 bg-white/5 p-6 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(255,255,255,0.1)] shadow-[0_10px_30px_rgba(0,0,0,0.2)]'
    default:
      return 'rounded-32px border border-white/10 bg-white/5 p-6 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(255,255,255,0.1)] shadow-[0_10px_30px_rgba(0,0,0,0.2)]'
  }
})
</script>

<template>
  <div class="perspective-1000px h-full" :class="span">
    <div
      ref="cardRef"
      class="group relative flex h-full flex-col justify-between overflow-hidden will-change-transform transition-colors duration-300"
      :class="variantClasses"
      style="transform-style: preserve-3d; transition: box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;"
      @mousemove="onMouseMove"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <!-- 聚光灯特效：使用超大尺寸和 translate 来避免重绘 -->
      <div
        ref="spotlightRef"
        class="pointer-events-none absolute left-0 top-0 z-0 h-[800px] w-[800px] opacity-0 transition-opacity duration-300 will-change-transform"
        style="background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 40%);"
      />

      <!-- 3D 高光反光 (Glare)：使用位移避免重绘 -->
      <div
        v-if="variant !== 'ghost'"
        ref="glareRef"
        class="pointer-events-none absolute -inset-full z-10 opacity-0 transition-opacity duration-300 mix-blend-overlay will-change-transform"
        style="background: linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);"
      />

      <!-- 静态绚丽光晕 -->
      <div
        v-if="glowColor"
        class="pointer-events-none absolute h-200px w-200px opacity-0 blur-60px transition-opacity duration-500 group-hover:opacity-50"
        :class="glowColor"
        style="top: -20%; right: -20%;"
      />

      <!-- 移除 pointer-events-none，使得内部链接可以点击 -->
      <div class="relative z-20 h-full flex flex-col" style="transform: translateZ(30px);">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.perspective-1000px {
  perspective: 1000px;
}
</style>
