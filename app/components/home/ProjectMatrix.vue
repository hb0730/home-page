<script setup lang="ts">
import { dashboardConfig } from '~/data/dashboard'
import StarCard from '../ui/StarCard.vue'

import WidgetBattery from '../widgets/WidgetBattery.vue'
import WidgetGeneric from '../widgets/WidgetGeneric.vue'
import WidgetMusic from '../widgets/WidgetMusic.vue'
import WidgetProject from '../widgets/WidgetProject.vue'
import WidgetSeasons from '../widgets/WidgetSeasons.vue'
import WidgetSite from '../widgets/WidgetSite.vue'
import WidgetTerminal from '../widgets/WidgetTerminal.vue'
</script>

<template>
  <div class="grid grid-cols-1 gap-5 auto-rows-auto md:grid-cols-4 md:auto-rows-[170px]">
    <template v-for="(item, index) in dashboardConfig" :key="index">
      <StarCard
        :span="item.data.span"
        :glow-color="item.data.color"
        :variant="(item.data as any).variant"
        :class="{
          'items-center justify-center text-center bg-blue-500/5! border-blue-500/20!': item.type === 'widget' && item.data.type === 'status',
          'items-center justify-center border-dashed! border-white/10!': item.type === 'widget' && item.data.type === 'lab',
          'bg-gradient-to-br from-white/2 to-transparent': item.type === 'widget' && item.data.type === 'quote',
          'bg-slate-950/80! border-emerald-500/20!': item.type === 'widget' && item.data.type === 'terminal',
        }"
      >
        <WidgetProject v-if="item.type === 'project'" :item="item as any" />
        <WidgetSite v-else-if="item.type === 'site'" :item="item as any" />

        <WidgetMusic v-else-if="item.type === 'widget' && item.data.type === 'music'" />
        <WidgetTerminal v-else-if="item.type === 'widget' && item.data.type === 'terminal'" />
        <WidgetBattery v-else-if="item.type === 'widget' && item.data.type === 'battery'" />
        <WidgetSeasons v-else-if="item.type === 'widget' && item.data.type === 'seasons'" :item="item as any" />
        <WidgetGeneric v-else-if="item.type === 'widget'" :item="item as any" />
      </StarCard>
    </template>
  </div>
</template>
