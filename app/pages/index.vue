<script setup lang="ts">
import IdentityPanel from '~/components/home/IdentityPanel.vue'
import ProjectMatrix from '~/components/home/ProjectMatrix.vue'
</script>

<template>
  <main class="grid grid-cols-1 gap-8 lg:grid-cols-[340px_1fr] items-start">
    <IdentityPanel class="lg:sticky lg:top-12" />
    <ProjectMatrix />
  </main>
</template>
