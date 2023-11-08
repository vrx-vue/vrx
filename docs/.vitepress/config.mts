import { defineConfig } from 'vitepress'
import * as fs from 'node:fs'
import * as path from 'node:path'
// @ts-ignore
import matter from 'gray-matter'

import pkg from '../../package.json'
import { giteeIcon } from './gitee-icon'
import UnoCss from 'unocss/vite'
import { presetUno } from 'unocss/preset-uno'
import { withPwa } from '@vite-pwa/vitepress'
import { pwa } from './pwa'

const getFunctions = () => {
  const dir = 'docs/functions'
  const funList: Record<string, { link: string; text: string }[]> = {}
  fs.readdirSync(path.resolve(dir)).forEach((item) => {
    if (item === 'demo') {
      return
    }
    if (item === 'index.md') {
      return
    }
    const mdRaw = fs.readFileSync(path.join(dir, item), 'utf-8')
    const funName = item.replace('.md', '')
    const { data } = matter(mdRaw)
    const category = data.category || 'core'
    funList[category] ||= []
    funList[category].push({
      link: `/functions/${funName}`,
      text: funName,
    })
  })

  return {
    '/functions/': [
      { text: '介绍', items: [{ text: '介绍', link: '/functions/' }] },
      ...Object.keys(funList)
        .sort()
        .map((key) => {
          return {
            text: key,
            items: funList[key],
          }
        }),
    ],
  }
}
export default withPwa(
  defineConfig({
    title: 'vrx',
    lang: 'zh-CN',
    base: '/',
    lastUpdated: true,
    vite: { server: { port: 3002 }, plugins: [UnoCss({ presets: [presetUno()] })] },
    description: '开发中对于技术的总结，归纳',
    cleanUrls: true,
    themeConfig: {
      logo: '/favicon.svg',
      lastUpdatedText: '最后更新时间',
      search: {
        provider: 'local',
        options: {
          locales: {
            root: {
              translations: {
                button: {
                  buttonText: '搜索文档',
                  buttonAriaLabel: '搜索文档',
                },
                modal: {
                  noResultsText: '无法找到相关结果',
                  resetButtonTitle: '清除查询条件',
                  footer: {
                    selectText: '选择',
                    navigateText: '切换',
                    closeText: '关闭',
                  },
                },
              },
            },
          },
        },
      },
      socialLinks: [
        {
          link: 'https://gitee.com/vrx/vrx',
          icon: {
            svg: giteeIcon,
          },
        },
      ],
      outline: {
        label: '本页',
      },
      docFooter: {
        prev: '上一页',
        next: '下一页',
      },
      sidebarMenuLabel: '菜单',
      returnToTopLabel: '返回顶部',
      darkModeSwitchLabel: '暗色模式',
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2022-present White Kite',
      },
      nav: [
        {
          text: '指引',
          link: '/guide/',
          activeMatch: '^/guide/',
        },
        {
          text: '方法',
          link: '/functions/',
          activeMatch: '^/functions/',
        },
        {
          text: pkg.version,
          items: [
            {
              text: 'Changelog',
              link: 'https://gitee.com/vrx/vrx/blob/master/CHANGELOG.md',
            },
          ],
        },
      ],
      sidebar: {
        '/guide/': [
          {
            text: '指引',
            items: [
              { text: '动机', link: '/guide/motive' },
              { text: '开始', link: '/guide/' },
              { text: 'Nuxt 集成', link: '/guide/nuxt' },
            ],
          },
          {
            text: '方法',
            items: [
              {
                text: '方法',
                link: '/functions/',
              },
            ],
          },
        ],
        ...getFunctions(),
      },
    },
    head: [
      ['meta', { name: 'theme-color', content: '#ffffff' }],
      ['meta', { name: 'author', content: 'WhiteKite' }],
      [
        'link',
        {
          rel: 'icon',
          href: '/favicon.ico',
          sizes: 'any',
        },
      ],
      [
        'link',
        {
          rel: 'icon',
          href: '/favicon.svg',
          type: 'image/svg+xml',
        },
      ],
      [
        'link',
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon-180x180.png',
        },
      ],
    ],
    pwa,
  })
)
