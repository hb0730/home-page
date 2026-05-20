<script setup lang="ts">
import CelestialBackground from '~/components/ui/CelestialBackground.vue'
import { siteConfig } from '~/data/site-config'
</script>

<template>
  <div class="min-h-screen font-sans text-[#e2e8f0]">
    <CelestialBackground />

    <div class="relative z-10 flex min-h-screen flex-col items-center justify-start px-4 py-12 sm:p-12 lg:p-16">
      <div class="mx-auto w-full max-w-1100px flex-1 flex flex-col justify-center">
        <slot />
      </div>

      <!-- Configurable Footer & ICP -->
      <footer class="mt-16 w-full max-w-1100px pb-4 text-center sm:flex sm:justify-between sm:text-left">        <p class="text-9px font-bold uppercase tracking-0.3em text-white/20">
          {{ siteConfig.footerText }}
        </p>
        <div class="mt-2 flex flex-col items-center gap-2 sm:mt-0 sm:flex-row sm:items-end">
          <p class="text-9px font-medium italic text-white/10">{{ siteConfig.motto }}</p>
          <a v-if="siteConfig.icp" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="text-9px font-bold uppercase tracking-0.1em text-white/20 hover:text-white/40 transition-colors">
            {{ siteConfig.icp }}
          </a>
        </div>
      </footer>
      </div>
      </div>
      </template>
