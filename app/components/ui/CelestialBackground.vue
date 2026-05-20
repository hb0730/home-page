<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Star {
  x: number
  y: number
  z: number
  size: number
  color: string
  glowColor: string
  opacity: number
  twinkle: number
}

class Meteor {
  x = 0; y = 0; length = 0; speed = 0; angle = 0; active = false; opacity = 0
  canvasWidth = 0; canvasHeight = 0

  constructor(cw: number, ch: number) {
    this.canvasWidth = cw; this.canvasHeight = ch
    this.active = false
  }

  reset() {
    this.x = Math.random() * this.canvasWidth + this.canvasWidth * 0.5
    this.y = Math.random() * -this.canvasHeight
    this.length = Math.random() * 200 + 100
    this.speed = Math.random() * 20 + 15
    this.angle = Math.PI / 4
    this.active = true
    this.opacity = 1
  }

  update() {
    if (!this.active) {
      // 增加流星出现概率
      if (Math.random() < 0.003)
        this.reset()
      return
    }
    this.x -= this.speed * Math.cos(this.angle)
    this.y += this.speed * Math.sin(this.angle)
    this.opacity -= 0.008
    if (this.opacity <= 0 || this.x < -this.length || this.y > this.canvasHeight + this.length) {
      this.active = false
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active)
      return
    ctx.globalAlpha = Math.max(0, this.opacity)
    const endX = this.x + this.length * Math.cos(this.angle)
    const endY = this.y - this.length * Math.sin(this.angle)
    const grad = ctx.createLinearGradient(this.x, this.y, endX, endY)
    grad.addColorStop(0, 'rgba(255,255,255,1)')
    grad.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.strokeStyle = grad
    ctx.lineWidth = 2.5
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(endX, endY)
    ctx.stroke()
    ctx.globalAlpha = 1
  }
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas)
    return
  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  let stars: Star[] = []
  let meteors: Meteor[] = []
  const numStars = 800 // 进一步增加星星密度
  const focalLength = 1000
  const rotateSpeedX = 0.0002
  const rotateSpeedY = 0.0004

  // 鼠标视差交互
  let targetMouseX = 0; let targetMouseY = 0
  let mouseX = 0; let mouseY = 0

  const onMouseMove = (e: MouseEvent) => {
    targetMouseX = (e.clientX - window.innerWidth / 2) * 1.5
    targetMouseY = (e.clientY - window.innerHeight / 2) * 1.5
  }
  window.addEventListener('mousemove', onMouseMove)

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  const initStars = () => {
    stars = Array.from({ length: numStars }, () => {
      // 更加绚丽、高饱和度的星系色彩
      const colors = [
        { c: '#ffffff', g: '#ffffff' },
        { c: '#ffffff', g: '#ffffff' },
        { c: '#e0f2fe', g: '#38bdf8' }, // 亮青
        { c: '#fae8ff', g: '#d946ef' }, // 亮紫
        { c: '#fefce8', g: '#facc15' }, // 灿金
        { c: '#ecfdf5', g: '#34d399' }, // 翠绿
      ]
      const color: any = colors[Math.floor(Math.random() * colors.length)]
      return {
        x: (Math.random() - 0.5) * 4000,
        y: (Math.random() - 0.5) * 4000,
        z: (Math.random() - 0.5) * 4000,
        size: Math.random() * 2.5 + 0.5,
        color: color.c,
        glowColor: color.g,
        opacity: Math.random(),
        twinkle: Math.random() * 0.03 + 0.01, // 更活泼的闪烁
      }
    })

    meteors = Array.from({ length: 4 }, () => new Meteor(canvas.width, canvas.height))
  }

  const animate = () => {
    ctx.fillStyle = '#020510' // 极暗夜蓝
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // 平滑的视差缓动
    mouseX += (targetMouseX - mouseX) * 0.05
    mouseY += (targetMouseY - mouseY) * 0.05

    stars.forEach((s) => {
      // Rotate 3D
      const cosX = Math.cos(rotateSpeedX); const sinX = Math.sin(rotateSpeedX)
      const y1 = s.y * cosX - s.z * sinX; const z1 = s.z * cosX + s.y * sinX
      s.y = y1; s.z = z1

      const cosY = Math.cos(rotateSpeedY); const sinY = Math.sin(rotateSpeedY)
      const x2 = s.x * cosY - s.z * sinY; const z2 = s.z * cosY + s.x * sinY
      s.x = x2; s.z = z2

      // Project to 2D 叠加鼠标视差
      const scale = focalLength / (focalLength + s.z)
      const x2d = s.x * scale + centerX - mouseX * scale
      const y2d = s.y * scale + centerY - mouseY * scale

      if (x2d < -100 || x2d > canvas.width + 100 || y2d < -100 || y2d > canvas.height + 100)
        return

      s.opacity += s.twinkle
      if (s.opacity > 1 || s.opacity < 0.1)
        s.twinkle *= -1

      const finalSize = s.size * scale
      if (finalSize < 0.1)
        return

      ctx.globalAlpha = Math.max(0, Math.min(1, s.opacity))
      ctx.shadowBlur = finalSize * 10 // 更大的光晕扩散
      ctx.shadowColor = s.glowColor
      ctx.fillStyle = s.color
      ctx.beginPath()
      ctx.arc(x2d, y2d, finalSize, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    })

    meteors.forEach((m) => {
      m.update()
      m.draw(ctx)
    })

    requestAnimationFrame(animate)
  }

  window.addEventListener('resize', resize)
  resize()
  initStars()
  animate()

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('resize', resize)
  })
})

const activeSeason = useState<string>('activeSeason', () => 'spring')
</script>

<template>
  <div class="fixed inset-0 z-0 overflow-hidden bg-[#020510]">
    <canvas ref="canvasRef" class="block" />
    <!-- 极光星云：高对比度的三色流光，让背景极为绚丽 -->
    <div class="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_15%_25%,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(217,70,239,0.15),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.08),transparent_60%)]" />
    <div class="pointer-events-none absolute inset-0 z-2 bg-gradient-to-b from-transparent to-[#020510]/50" />

    <!-- 全局季节特效层 -->
    <div class="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <!-- 冬季大雪 -->
      <template v-if="activeSeason === 'winter'">
        <div v-for="i in 30" :key="`w-${i}`" class="absolute bg-white rounded-full anim-snow-global" :style="{ left: `${Math.random() * 100}%`, width: `${Math.random() * 4 + 2}px`, height: `${Math.random() * 4 + 2}px`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${Math.random() * 3 + 5}s` }"></div>
      </template>
      
      <!-- 春季落樱 -->
      <template v-if="activeSeason === 'spring'">
        <div v-for="i in 25" :key="`s-${i}`" class="absolute bg-pink-300/60 rounded-full anim-blossom-global blur-[1px]" :style="{ left: `${Math.random() * 100}%`, width: `${Math.random() * 8 + 4}px`, height: `${Math.random() * 8 + 4}px`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${Math.random() * 4 + 6}s` }"></div>
      </template>
      
      <!-- 秋季落叶 -->
      <template v-if="activeSeason === 'autumn'">
        <div v-for="i in 20" :key="`a-${i}`" class="absolute bg-amber-500/50 rounded-sm anim-leaf-global" :style="{ left: `${Math.random() * 100}%`, width: `${Math.random() * 6 + 4}px`, height: `${Math.random() * 10 + 6}px`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${Math.random() * 4 + 5}s` }"></div>
      </template>
      
      <!-- 夏季热浪光晕 -->
      <template v-if="activeSeason === 'summer'">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.15),transparent_60%)] animate-pulse" style="animation-duration: 4s;"></div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* 全局降雪 */
@keyframes anim-snowfall-global {
  0% { transform: translateY(-20vh) translateX(0); opacity: 0; }
  20% { opacity: 0.8; }
  80% { opacity: 0.8; }
  100% { transform: translateY(120vh) translateX(10vw); opacity: 0; }
}
.anim-snow-global { animation: anim-snowfall-global linear infinite; top: -10px; }

/* 全局落樱 (从下往上飘或者从上往下飘) */
@keyframes anim-blossom-global {
  0% { transform: translateY(120vh) translateX(0) rotate(0deg); opacity: 0; }
  20% { opacity: 0.6; }
  80% { opacity: 0.6; }
  100% { transform: translateY(-20vh) translateX(20vw) rotate(360deg); opacity: 0; }
}
.anim-blossom-global { animation: anim-blossom-global ease-in-out infinite; bottom: -10px; }

/* 全局落叶 */
@keyframes anim-leaf-global {
  0% { transform: translateY(-20vh) translateX(0) rotate(0deg); opacity: 0; }
  20% { opacity: 0.6; }
  80% { opacity: 0.6; }
  100% { transform: translateY(120vh) translateX(-15vw) rotate(720deg); opacity: 0; }
}
.anim-leaf-global { animation: anim-leaf-global ease-in-out infinite; top: -10px; }
</style>
