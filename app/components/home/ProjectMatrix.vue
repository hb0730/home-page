<script setup lang="ts">
import { dashboardConfig } from '~/data/dashboard'
import { sites } from '~/data/sites'
import StarCard from '../ui/StarCard.vue'

const displaySites = sites.slice(0, 2)

function getHostname(url: string) {
  try {
    return new URL(url).hostname
  }
  catch {
    return url.replace(/^https?:\/\//, '').split('/')[0]
  }
}
</script>

<template>
  <div class="grid grid-cols-1 gap-5 auto-rows-auto md:grid-cols-4 md:auto-rows-[170px]">
    <template v-for="(item, index) in dashboardConfig" :key="index">
      <!-- Project Type -->
      <StarCard 
        v-if="item.type === 'project'" 
        :span="item.data.span" 
        :glow-color="item.data.color"
        :variant="(item.data as any).variant"
      >
        <div class="flex flex-col h-full">
          <div>
            <div class="flex items-center justify-between">
              <span class="text-9px font-bold uppercase tracking-0.2em text-white/30">
                {{ item.data.featured ? 'Primary Work' : 'Project' }}
              </span>
              <!-- Project Icon -->
              <i v-if="item.data.icon" :class="item.data.icon" class="text-xl text-white/50"></i>
            </div>
            <h3 class="mt-2 text-2xl font-black text-white leading-tight">
              <a :href="item.data.href" target="_blank" rel="noopener noreferrer" class="hover:underline hover:decoration-white/30 hover:underline-offset-4">
                {{ item.data.title }}
              </a>
            </h3>
          </div>
          <p class="mt-4 text-xs text-slate-400 leading-relaxed">
            {{ item.data.description }}
          </p>

          <!-- Special decoration for long cards -->
          <div v-if="item.data.span?.includes('row-span-2') && !item.data.span?.includes('col-span-2')" class="mt-auto h-24 w-full bg-gradient-to-t from-white/5 to-transparent rounded-t-2xl border-t border-x border-white/5" />

          <div v-if="item.data.tags" class="mt-auto pt-6 flex flex-wrap gap-2">
            <span v-for="tag in item.data.tags" :key="tag" class="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-8px font-bold uppercase tracking-0.1em text-slate-400">
              {{ tag }}
            </span>
          </div>
        </div>
      </StarCard>
      <!-- Site Type -->
      <StarCard 
        v-else-if="item.type === 'site'" 
        :span="item.data.span" 
        :glow-color="item.data.color"
        :variant="(item.data as any).variant"
      >
        <a :href="item.data.href" target="_blank" rel="noopener noreferrer" class="absolute inset-0 z-30"></a>
        
        <!-- 默认状态：像普通 Icon 卡片一样 -->
        <div class="flex flex-col justify-between h-full transition-opacity duration-300" :class="{'group-hover:opacity-0': item.data.hoverImage}">
          <div class="text-3xl text-white/80 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
            <img v-if="item.data.icon?.startsWith('/') || item.data.icon?.startsWith('http')" :src="item.data.icon" class="h-10 w-10 rounded-xl object-cover" />
            <i v-else-if="item.data.icon" :class="item.data.icon"></i>
            <span v-else>🚀</span>
          </div>
          
          <div class="mt-4">
            <h4 class="text-sm font-bold text-white">{{ item.data.title }}</h4>
            <p class="mt-1 text-9px text-slate-400 line-clamp-2 leading-relaxed">{{ item.data.description || getHostname(item.data.href) }}</p>
          </div>
        </div>

        <!-- 悬停状态：大图占满整个卡片 -->
        <div v-if="item.data.hoverImage" class="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100 pointer-events-none">
           <div class="p-2 bg-white rounded-2xl shadow-2xl transform scale-75 transition-transform duration-500 group-hover:scale-100">
                <img :src="item.data.hoverImage" class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover" />
           </div>
           <p class="text-[9px] font-bold text-white uppercase tracking-widest mt-4 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">View Detail</p>
        </div>
      </StarCard>

      <!-- Widget Type: Status -->
      <StarCard
        v-else-if="item.type === 'widget' && item.data.type === 'status'"
        class="items-center justify-center text-center bg-blue-500/5! border-blue-500/20!"
        :span="item.data.span"
        :variant="(item.data as any).variant"
      >
        <div class="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400 shadow-[0_0_20px_#60a5fa]" />
        <span class="mt-4 text-9px font-bold uppercase tracking-0.2em text-blue-400">{{ item.data.title }}</span>
      </StarCard>

      <!-- Widget Type: Links/Ecosystem -->
      <StarCard
        v-else-if="item.type === 'widget' && item.data.type === 'links'"
        :span="item.data.span"
        :glow-color="item.data.color"
        :variant="(item.data as any).variant"
      >
        <div class="flex items-center justify-between h-full">
          <div>
            <span class="text-9px font-bold uppercase tracking-0.2em text-white/30">Ecosystem</span>
            <h3 class="mt-1 text-xl font-black text-white">
              {{ item.data.title }}
            </h3>
          </div>
          <div class="flex gap-2">
            <div v-for="site in displaySites" :key="site.title" class="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center text-xs font-bold border border-white/5">
              {{ site.title[0] }}
            </div>
          </div>
        </div>
      </StarCard>

      <!-- Widget Type: Lab -->
      <StarCard
        v-else-if="item.type === 'widget' && item.data.type === 'lab'"
        class="items-center justify-center border-dashed! border-white/10!"
        :span="item.data.span"
        :variant="(item.data as any).variant"
      >
        <div class="font-serif text-2xl font-black italic text-slate-200/50">
          {{ item.data.title }}
        </div>
        <span class="mt-1 text-8px font-bold uppercase tracking-0.1em text-white/20">WIP</span>
      </StarCard>

      <!-- Widget Type: Quote -->
      <StarCard
        v-else-if="item.type === 'widget' && item.data.type === 'quote'"
        class="bg-gradient-to-br from-white/2 to-transparent"
        :span="item.data.span"
        :variant="(item.data as any).variant"
      >
        <p class="text-9px italic text-slate-500 leading-tight">
          "{{ item.data.content }}"
        </p>
      </StarCard>
    </template>
  </div>
</template>
