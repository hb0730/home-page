<script setup lang="ts">
const timeStr = ref('')
function updateTime() {
  timeStr.value = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}
onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<template>
  <div class="space-y-2">
    <div class="text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
      {{ timeStr }}
    </div>
    <div class="text-9px font-bold uppercase tracking-0.25em text-white/30">
      {{ new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', weekday: 'long' }).toUpperCase() }} / BEIJING
    </div>
  </div>
</template>
