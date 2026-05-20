import type { ProjectItem, SiteItem, WidgetItem } from '~/types/home'
import { projects } from './projects'
import { sites } from './sites'

export type DashboardItem
  = | { type: 'project', data: ProjectItem }
    | { type: 'site', data: SiteItem }
    | { type: 'widget', data: WidgetItem }

// 霓虹色彩库，用于为没有指定颜色的卡片自动分配发光色
const colors = [
  'bg-blue-500',
  'bg-emerald-500',
  'bg-purple-500',
  'bg-rose-500',
  'bg-amber-500',
  'bg-sky-500',
  'bg-pink-500',
  'bg-indigo-500',
]

let colorIndex = 0
const getNextColor = () => colors[colorIndex++ % colors.length]

// 1. 自动解析并映射 Projects
const projectItems: DashboardItem[] = projects.map(p => ({
  type: 'project',
  data: {
    ...p,
    // 如果没有配置 span，则根据 featured 状态自动分配 2x2 或 1x2
    span: p.span || (p.featured ? 'md:col-span-2 md:row-span-2' : 'md:row-span-2'),
    // 如果没有配置颜色，则自动从色彩库中取一个
    color: p.color || getNextColor(),
  },
}))

// 2. 自动解析并映射 Sites
const siteItems: DashboardItem[] = sites.map(s => ({
  type: 'site',
  data: {
    ...s,
    // 所有 Site 默认占用 1x1 格子，QR 将通过 Hover 放大展示
    span: s.span || 'md:col-span-1',
    color: s.color || getNextColor()
  }
}))

// 3. 固定的个性化小组件 (Widgets)
const widgetItems: DashboardItem[] = [
  {
    type: 'widget',
    data: {
      id: 'system-status',
      title: 'System Ready',
      type: 'status',
      color: 'bg-sky-400',
      span: 'md:col-span-1',
      variant: 'circle'
    } as any
  },
  {
    type: 'widget',
    data: {
      id: 'daily-quote',
      title: 'Quote',
      content: 'Simplicity is the ultimate sophistication.',
      type: 'quote',
      span: 'md:col-span-1',
      variant: 'ghost'
    } as any
  },
  // --- ROW 5 Quirky Widgets ---
  {
    type: 'widget',
    data: {
      id: 'music-player',
      title: 'Now Playing',
      type: 'music',
      color: 'bg-indigo-500',
      span: 'md:col-span-2'
    } as any
  },
  {
    type: 'widget',
    data: {
      id: 'hacker-terminal',
      title: 'Terminal',
      type: 'terminal',
      color: 'bg-emerald-500',
      span: 'md:col-span-1'
    } as any
  },
  {
    type: 'widget',
    data: {
      id: 'coffee-battery',
      title: 'Energy',
      type: 'battery',
      color: 'bg-amber-500',
      span: 'md:col-span-1'
    } as any
  }
]

// 组装最终的 Dashboard 渲染流
export const dashboardConfig: DashboardItem[] = [
  ...projectItems,
  ...siteItems,
  ...widgetItems,
]
