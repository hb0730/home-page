<script setup lang="ts">
</script>

<template>
  <div class="max-md:flex-col lg:h-14rem animate-[fade_0.3s] flex flex-row items-center justify-between min-w-90">
    <div class="widget" h-full w-full p-10>
      <WidgetHitokoto />
    </div>
    <div class="widget max-md:mt-10 lg:ml-10" h-full w-full p-5>
      <WidgetTime />
      <WidgetWeather />
    </div>
  </div>
</template>
