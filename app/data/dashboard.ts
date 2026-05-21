import type { ProjectItem, SiteItem, WidgetItem } from '~/types/home'
import { projects } from './projects'
import { sites } from './sites'

/**
 * 仪表盘项联合类型
 */
export type DashboardItem = 
  | { type: 'project', data: ProjectItem }
  | { type: 'site', data: SiteItem }
  | { type: 'widget', data: WidgetItem }

/**
 * 霓虹色彩库：用于为卡片自动分配视觉氛围色
 */
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
// 获取循环色彩的辅助函数
const getNextColor = () => colors[colorIndex++ % colors.length]

/**
 * 1. 自动映射 Projects：将项目数据转换为 Bento 卡片项
 */
const projectItems: DashboardItem[] = projects.map(p => ({
  type: 'project',
  data: {
    ...p,
    // 布局规则：Featured 项目占 2x2，普通占 1x2 (纵向)
    span: p.span || (p.featured ? 'md:col-span-2 md:row-span-2' : 'md:row-span-2'),
    color: p.color || getNextColor(),
  },
}))

/**
 * 2. 自动映射 Sites：将个人站点转换为 1x1 磁贴
 */
const siteItems: DashboardItem[] = sites.map(s => ({
  type: 'site',
  data: {
    ...s,
    span: s.span || 'md:col-span-1',
    color: s.color || getNextColor(),
  },
}))

/**
 * 3. 固定的个性化小组件配置阵列
 */
const widgetItems: DashboardItem[] = [
  {
    type: 'widget',
    data: {
      id: 'github-graph',
      title: 'GitHub Activity',
      type: 'github',
      color: 'bg-emerald-500',
      span: 'md:col-span-4 md:row-span-2', // 核心数据看板，独占整行
    } as any,
  },
  {
    type: 'widget',
    data: {
      id: 'seasonal-widget',
      title: '四季更替',
      type: 'seasons',
      color: 'bg-pink-500',
      span: 'md:col-span-1',
    } as any,
  },
  {
    type: 'widget',
    data: {
      id: 'moon-phase',
      title: 'Moon',
      type: 'moon',
      color: 'bg-slate-300',
      span: 'md:col-span-1',
    } as any,
  },
  {
    type: 'widget',
    data: {
      id: 'hitokoto-widget',
      title: '一言',
      type: 'hitokoto',
      color: 'bg-purple-400',
      span: 'md:col-span-2', // 较宽的卡片展示文字
    } as any
  },
  {
    type: 'widget',
    data: {
      id: 'radar-location',
      title: 'Location',
      type: 'location',
      color: 'bg-emerald-600',
      span: 'md:col-span-1'
    } as any
  },
  {
    type: 'widget',
    data: {
      id: 'live-weather',
      title: 'Weather',
      type: 'weather',
      color: 'bg-sky-500',
      span: 'md:col-span-1'
    } as any
  },
  {
    type: 'widget',
    data: {
      id: 'tech-marquee',
      title: 'Stack',
      type: 'marquee',
      color: 'bg-amber-400',
      span: 'md:col-span-2' // 调整为 2x1 以填补日程表移除后的空隙
    } as any
  }
]

/**
 * 组装最终的 Dashboard 渲染流：决定页面内容的展示顺序
 */
export const dashboardConfig: DashboardItem[] = [
  ...projectItems,
  ...siteItems,
  ...widgetItems,
]
