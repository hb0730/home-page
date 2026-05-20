<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const activeSeason = useState<string>('activeSeason', () => 'spring')

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
  constructor(cw: number, ch: number) { this.canvasWidth = cw; this.canvasHeight = ch }
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
      if (Math.random() < 0.003)
        this.reset(); return
    }
    this.x -= this.speed * Math.cos(this.angle); this.y += this.speed * Math.sin(this.angle)
    this.opacity -= 0.008
    if (this.opacity <= 0 || this.x < -this.length || this.y > this.canvasHeight + this.length)
      this.active = false
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
    ctx.strokeStyle = grad; ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(this.x, this.y); ctx.lineTo(endX, endY); ctx.stroke()
    ctx.globalAlpha = 1
  }
}

class SeasonParticle {
  x = 0; y = 0; size = 0; speedX = 0; speedY = 0; angle = 0; spinSpeed = 0; opacity = 0; type = 'snow'
  canvasWidth = 0; canvasHeight = 0

  constructor(cw: number, ch: number, type: string) {
    this.canvasWidth = cw; this.canvasHeight = ch; this.type = type
    this.reset(true)
  }

  reset(randomY = false) {
    this.x = Math.random() * this.canvasWidth
    this.opacity = Math.random() * 0.6 + 0.4
    this.angle = Math.random() * Math.PI * 2
    this.spinSpeed = (Math.random() - 0.5) * 0.1

    if (this.type === 'winter') {
      this.y = randomY ? Math.random() * this.canvasHeight : -50
      this.size = Math.random() * 4 + 2
      this.speedY = Math.random() * 3 + 2
      this.speedX = (Math.random() - 0.5) * 1.5
    }
    else if (this.type === 'spring') {
      this.y = randomY ? Math.random() * this.canvasHeight : this.canvasHeight + 50
      this.size = Math.random() * 8 + 4
      this.speedY = -(Math.random() * 2.5 + 1.5)
      this.speedX = (Math.random() - 0.5) * 3
    }
    else if (this.type === 'autumn') {
      this.y = randomY ? Math.random() * this.canvasHeight : -50
      this.size = Math.random() * 10 + 5
      this.speedY = Math.random() * 3 + 1.5
      this.speedX = (Math.random() - 0.5) * 4
    }
    else if (this.type === 'summer') {
      this.y = randomY ? Math.random() * this.canvasHeight : Math.random() * this.canvasHeight
      this.size = Math.random() * 3 + 1.5
      this.speedY = (Math.random() - 0.5) * 1
      this.speedX = (Math.random() - 0.5) * 1
      this.opacity = 0
    }
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    this.angle += this.spinSpeed

    if (this.type === 'summer') {
      this.opacity += (Math.random() > 0.5 ? 0.02 : -0.02)
      this.opacity = Math.max(0, Math.min(0.8, this.opacity))
    }

    if (this.type === 'winter' || this.type === 'autumn') {
      if (this.y > this.canvasHeight + 50)
        this.reset()
    }
    else if (this.type === 'spring') {
      if (this.y < -50)
        this.reset()
    }

    if (this.x < -100)
      this.x = this.canvasWidth + 100
    if (this.x > this.canvasWidth + 100)
      this.x = -100
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)
    ctx.globalAlpha = this.opacity

    if (this.type === 'winter') {
      ctx.fillStyle = '#ffffff'
      ctx.shadowBlur = 15; ctx.shadowColor = '#ffffff'
      ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI * 2); ctx.fill()
    }
    else if (this.type === 'spring') {
      ctx.fillStyle = '#f472b6'
      ctx.shadowBlur = 20; ctx.shadowColor = '#fbcfe8'
      ctx.beginPath()
      ctx.moveTo(0, -this.size)
      ctx.quadraticCurveTo(this.size, -this.size, this.size, 0)
      ctx.quadraticCurveTo(this.size, this.size, 0, this.size)
      ctx.quadraticCurveTo(-this.size, this.size, -this.size, 0)
      ctx.quadraticCurveTo(-this.size, -this.size, 0, -this.size)
      ctx.fill()
    }
    else if (this.type === 'autumn') {
      ctx.fillStyle = '#f59e0b'
      ctx.shadowBlur = 20; ctx.shadowColor = '#fcd34d'
      // simple leaf shape
      ctx.beginPath()
      ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2)
      ctx.fill()
    }
    else if (this.type === 'summer') {
      ctx.fillStyle = '#fde047'
      ctx.shadowBlur = 15; ctx.shadowColor = '#fef08a'
      ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI * 2); ctx.fill()
    }
    ctx.restore()
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
  let seasonParticles: SeasonParticle[] = []

  const numStars = 600
  const focalLength = 1000
  const rotateSpeedX = 0.0002
  const rotateSpeedY = 0.0004

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
      const colors = [{ c: '#ffffff', g: '#ffffff' }, { c: '#e0f2fe', g: '#38bdf8' }, { c: '#fae8ff', g: '#d946ef' }, { c: '#fefce8', g: '#facc15' }]
      const color: any = colors[Math.floor(Math.random() * colors.length)]
      return {
        x: (Math.random() - 0.5) * 4000,
        y: (Math.random() - 0.5) * 4000,
        z: (Math.random() - 0.5) * 4000,
        size: Math.random() * 2.5 + 0.5,
        color: color.c,
        glowColor: color.g,
        opacity: Math.random(),
        twinkle: Math.random() * 0.03 + 0.01,
      }
    })
    meteors = Array.from({ length: 3 }, () => new Meteor(canvas.width, canvas.height))
  }

  let currentParticleType = ''
  const syncSeasonParticles = () => {
    if (activeSeason.value !== currentParticleType) {
      currentParticleType = activeSeason.value
      const count = activeSeason.value === 'summer' ? 50 : 60
      seasonParticles = Array.from({ length: count }, () => new SeasonParticle(canvas.width, canvas.height, activeSeason.value))
    }
  }

  let heatPulse = 0
  const animate = () => {
    syncSeasonParticles()
    ctx.fillStyle = '#020510'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    if (activeSeason.value === 'summer') {
      heatPulse += 0.02
      const grad = ctx.createRadialGradient(canvas.width / 2, canvas.height, 0, canvas.width / 2, canvas.height, canvas.width)
      grad.addColorStop(0, `rgba(245, 158, 11, ${Math.sin(heatPulse) * 0.1 + 0.15})`)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad; ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    mouseX += (targetMouseX - mouseX) * 0.05
    mouseY += (targetMouseY - mouseY) * 0.05

    stars.forEach((s) => {
      let cosX = Math.cos(rotateSpeedX); let sinX = Math.sin(rotateSpeedX)
      let y1 = s.y * cosX - s.z * sinX; let z1 = s.z * cosX + s.y * sinX
      s.y = y1; s.z = z1
      let cosY = Math.cos(rotateSpeedY); let sinY = Math.sin(rotateSpeedY)
      let x2 = s.x * cosY - s.z * sinY; let z2 = s.z * cosY + s.x * sinY
      s.x = x2; s.z = z2

      // 【关键修复】如果星星移动到摄像机后方（z <= -focalLength），则不进行渲染
      // 增加 100 像素的缓冲区以确保平滑消失并防止负半径错误
      if (s.z <= -focalLength + 100)
        return

      let scale = focalLength / (focalLength + s.z)
      let x2d = s.x * scale + canvas.width / 2 - mouseX * scale
      let y2d = s.y * scale + canvas.height / 2 - mouseY * scale

      if (x2d < -100 || x2d > canvas.width + 100 || y2d < -100 || y2d > canvas.height + 100)
        return

      s.opacity += s.twinkle
      if (s.opacity > 1 || s.opacity < 0.1)
        s.twinkle *= -1

      // 确保半径永远为正
      const radius = Math.max(0.1, s.size * scale)

      ctx.globalAlpha = s.opacity
      ctx.shadowBlur = radius * 8; ctx.shadowColor = s.glowColor
      ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(x2d, y2d, radius, 0, Math.PI * 2); ctx.fill()
    })

    meteors.forEach((m) => { m.update(); m.draw(ctx) })
    seasonParticles.forEach((p) => { p.update(); p.draw(ctx) })
    requestAnimationFrame(animate)
  }

  window.addEventListener('resize', resize)
  resize(); initStars(); animate()
  onUnmounted(() => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('resize', resize) })
})
</script>

<template>
  <div class="fixed inset-0 z-0 overflow-hidden bg-[#020510]">
    <canvas ref="canvasRef" class="block w-full h-full" />
    <div class="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_15%_25%,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(217,70,239,0.15),transparent_45%),radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.08),transparent_60%)]" />
    <div class="pointer-events-none absolute inset-0 z-2 bg-gradient-to-b from-transparent to-[#020510]/50" />
  </div>
</template>
