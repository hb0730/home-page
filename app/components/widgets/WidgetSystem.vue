<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { siteConfig } from '~/data/site-config'

const cpuLoad = ref(45)
const memLoad = ref(62)
const netSpeed = ref(1.2)

let interval: any

onMounted(() => {
  interval = setInterval(() => {
    cpuLoad.value = Math.floor(Math.random() * 30 + 30)
    memLoad.value = Math.floor(Math.random() * 10 + 60)
    netSpeed.value = parseFloat((Math.random() * 5).toFixed(1))
  }, 2000)
})

onUnmounted(() => clearInterval(interval))
</script>

<template>
  <div class="flex flex-col h-full justify-between font-mono">
    <div class="flex justify-between items-center opacity-50">
      <span class="text-[9px] font-bold uppercase tracking-widest">{{ siteConfig.widgets?.system?.label || 'System' }}</span>
      <span class="text-[8px]">htop v3.2.1</span>
    </div>

    <div class="flex-1 flex flex-col justify-center gap-3 py-2">
      <!-- CPU Bar -->
      <div class="space-y-1">
        <div class="flex justify-between text-[9px] uppercase tracking-tighter">
          <span>CPU [Intel i9]</span>
          <span class="text-blue-400">{{ cpuLoad }}%</span>
        </div>
        <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div class="h-full bg-blue-500 transition-all duration-1000 ease-out" :style="{ width: `${cpuLoad}%` }"></div>
        </div>
      </div>

      <!-- Memory Bar -->
      <div class="space-y-1">
        <div class="flex justify-between text-[9px] uppercase tracking-tighter">
          <span>MEM [DDR5 64G]</span>
          <span class="text-emerald-400">{{ memLoad }}%</span>
        </div>
        <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div class="h-full bg-emerald-500 transition-all duration-1000 ease-out" :style="{ width: `${memLoad}%` }"></div>
        </div>
      </div>

      <!-- Network -->
      <div class="flex items-center gap-4 text-[10px] text-white/40">
        <div class="flex items-center gap-1.5">
          <i class="i-ri-download-cloud-2-line text-blue-400"></i>
          <span>{{ netSpeed }} MB/s</span>
        </div>
        <div class="flex items-center gap-1.5">
          <i class="i-ri-upload-cloud-2-line text-emerald-400"></i>
          <span>0.4 MB/s</span>
        </div>
      </div>
    </div>

    <div class="flex gap-1.5 opacity-30">
      <div v-for="i in 12" :key="i" class="w-1.5 h-1.5 rounded-full bg-white/20"></div>
    </div>
  </div>
</template>
