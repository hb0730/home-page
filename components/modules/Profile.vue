<script setup lang="ts">
const config = useAppConfig()
</script>

<template>
  <div class="profile-module widget animate-[fade_0.3s] my-5 flex items-center justify-center p-4 max-w-md">
    <div class="gravatar rounded-10px overflow-hidden flex-1">
      <img :src="config.logo" alt="avatar">
    </div>
    <div class="w-64 ml-4">
      <h3 text="6">
        {{ config.author }}
      </h3>
      <span text="4 gray-400">{{ config.description }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
