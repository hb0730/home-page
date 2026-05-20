<script setup lang="ts">
import type { DashboardItem } from '~/data/dashboard'
import { dashboardConfig } from '~/data/dashboard'
import StarCard from '../ui/StarCard.vue'

// 【性能与SSR优化】使用 eager: true 一次性静态导入所有 widgets，确保 SSR 渲染一致性，彻底消除 Hydration 警告
const widgetModules = import.meta.glob('../widgets/Widget*.vue', { eager: true })
const componentMap: Record<string, any> = {}

// 自动扫描并建立映射
for (const path in widgetModules) {
  const match = path.match(/\.\.\/widgets\/Widget(.*)\.vue$/)
  if (match) {
    const typeName = match[1].toLowerCase()
    // eager 模式下直接获取 .default 导出
    componentMap[typeName] = (widgetModules[path] as any).default
  }
}

function resolveComponent(item: DashboardItem) {
  const type = item.type === 'widget' ? item.data.type : item.type
  return componentMap[type] || null
}
</script>

<template>
  <div class="grid grid-cols-1 gap-5 auto-rows-auto md:grid-cols-4 md:auto-rows-[170px]">
    <template v-for="(item, index) in dashboardConfig" :key="index">
      <StarCard
        :span="item.data.span"
        :glow-color="item.data.color"
        :variant="(item.data as any).variant"
        :class="{
          'bg-slate-950/80! border-emerald-500/20!': item.type === 'widget' && item.data.type === 'terminal',
        }"
      >
        <!-- 自动识别加载的组件 -->
        <component :is="resolveComponent(item)" :item="item" />
      </StarCard>
    </template>
  </div>
</template>
