# Design Spec: Homepage Refactor (Portal OS)

## 1. Project Overview
Refactor the personal homepage (hb0730.me) into a modern, OS-styled portal using Nuxt 5 and pnpm. The goal is to create a "Portal OS" that elegantly displays projects, websites, and dynamic widgets with high performance and a premium user experience.

## 2. Core Concepts
- **Desktop UI (Bento OS)**: A Bento Grid-based layout mimicking a desktop operating system.
- **Mobile UI (iOS Style)**: A responsive view inspired by iOS home screens, featuring icon grids and widget stacks.
- **Data-Driven**: Content is managed via local JSON/Markdown files in the `content/` directory.

## 3. Technology Stack
- **Framework**: Nuxt 5 (Vue.js)
- **Package Manager**: pnpm
- **Styling**: Tailwind CSS + Shadcn Vue
- **Icons**: Iconify (via `@nuxt/icon`)
- **Content**: Nuxt Content v3 (or standard JSON imports for high-speed access)
- **Animations**: Motion One / VueUse Motion
- **Deployment**: Static Site Generation (SSG)

## 4. Data Structures

### 4.1 Projects (`content/projects.json`)
```json
{
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "icon": "iconify-id",
      "link": "url",
      "github": "repo-path",
      "tags": ["string"],
      "featured": "boolean"
    }
  ]
}
```

### 4.2 Websites/Links (`content/links.json`)
```json
{
  "categories": [
    {
      "name": "string",
      "links": [
        {
          "name": "string",
          "url": "url",
          "icon": "iconify-id",
          "color": "hex-code"
        }
      ]
    }
  ]
}
```

### 4.3 Widgets Configuration (`content/widgets.json`)
```json
{
  "desktop_layout": [
    { "type": "clock", "x": 0, "y": 0, "w": 2, "h": 2 },
    { "type": "mood-tree", "x": 2, "y": 0, "w": 2, "h": 2 }
  ],
  "mobile_layout": [
    { "type": "clock", "w": "full" },
    { "type": "icon-grid", "items": ["blog", "github"] }
  ]
}
```

## 5. Component Architecture

### 5.1 Layout Components
- `BentoGrid.vue`: Manages the desktop grid layout.
- `iOSHome.vue`: Manages the mobile icon grid and widget stack.
- `Dock.vue`: Persistent floating navigation bar.

### 5.2 Widget Components
- `Clock.vue`: Real-time digital/analog clock.
- `TimeCapsule.vue`: Visual progress bar for day/year.
- `Weather.vue`: Current weather (via API or placeholder).
- `MoodTree.vue`: Dynamic status visualization.

### 5.3 UI Primitives
- `GlassCard.vue`: Wrapper for all grid items with blur and border effects.
- `AppIcon.vue`: iOS-spec icon with super-ellipse masking.

## 6. Visual Design Details
- **Glassmorphism**: Use of `backdrop-blur` and low-opacity backgrounds.
- **Dynamic Backgrounds**: Subtle animated gradients or blurred imagery.
- **Interaction**: Mouse-follow glow effects on desktop, haptic-like feedback on mobile.

## 7. Implementation Milestones
1. **Scaffold**: Initialize Nuxt 5 project with pnpm and Tailwind.
2. **Data Layer**: Setup `content/` files and types.
3. **Core Layout**: Implement `BentoGrid` and `iOSHome` with responsive switching.
4. **Widgets**: Build the core widget set (Clock, Time Capsule, Mood Tree).
5. **Polishing**: Add glassmorphism, animations, and PWA support.
