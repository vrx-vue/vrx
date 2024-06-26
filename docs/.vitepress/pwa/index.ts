import type { PwaOptions } from '@vite-pwa/vitepress'
import { icons } from './icons'

export const pwa: PwaOptions = {
  manifest: {
    name: 'Vrx',
    short_name: 'Vrx',
    description: '开发中对于 vue composition-api 的总结',
    theme_color: '#10b981',
    icons,
  },
  workbox: {
    globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
  },
}
