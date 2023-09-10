import type { PwaOptions } from '@vite-pwa/vitepress'
import { icons } from './icons'

export const pwa: PwaOptions = {
  registerType:'autoUpdate',
  manifest: {
    name: 'Vrx',
    short_name: 'Vrx',
    description: '开发中对于 vue composition-api 的总结',
    theme_color: '#10b981',
    id: '/',
    icons,
  },
}
