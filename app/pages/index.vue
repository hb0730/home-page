<script setup lang="ts">
import IdentityPanel from '~/components/home/IdentityPanel.vue'
import ProjectMatrix from '~/components/home/ProjectMatrix.vue'
</script>

<template>
  <main class="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr]">
    <IdentityPanel />
    <ProjectMatrix />
  </main>
</template>
