<script setup lang="ts">
import type { DashboardItem } from '~/data/dashboard'
import { dashboardConfig } from '~/data/dashboard'
import StarCard from '../ui/StarCard.vue'

/**
 * 【组件工厂】使用 Vite 的 import.meta.glob 批量发现所有 Widget 组件
 * 这样新增组件时无需手动 import，只需将文件放入 ../widgets/ 目录即可
 */
const widgetModules = import.meta.glob('../widgets/Widget*.vue', { eager: true })
const componentMap: Record<string, any> = {}

// 自动扫描并建立映射关系：例如 WidgetMusic.vue -> 'music'
for (const path in widgetModules) {
  const _match = path.match(/\.\.\/widgets\/Widget(.*)\.vue$/)
  if (_match) {
    const typeName = _match[1]
    if (!typeName)
      continue
    // 获取组件的默认导出
    componentMap[typeName.toLowerCase()] = (widgetModules[path] as any).default
  }
}

/**
 * 根据数据项的 type 动态解析对应的 Vue 组件
 */
function resolveComponent(item: DashboardItem) {
  // 如果是 widget 类型，则查找具体的小组件类型 (item.data.type)
  const type = item.type === 'widget' ? item.data.type : item.type
  return componentMap[type] || null
}
</script>

<template>
  <div class="grid grid-cols-1 gap-5 auto-rows-auto md:grid-cols-4 md:auto-rows-[170px]">
    <template v-for="(item, index) in dashboardConfig" :key="index">
      <!--
        使用 StarCard 作为通用外壳，处理 3D Hover、发光和网格占位
        通过 :is 动态挂载具体的业务组件内容
      -->
      <StarCard
        :span="item.data.span"
        :glow-color="item.data.color"
        :variant="(item.data as any).variant"
        :class="{
          'bg-slate-950/80! border-emerald-500/20!': item.type === 'widget' && item.data.type === 'terminal',
        }"
      >
        <component :is="resolveComponent(item)" :item="item" />
      </StarCard>
    </template>
  </div>
</template>
