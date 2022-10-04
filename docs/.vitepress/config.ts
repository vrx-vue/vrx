import { defineConfig } from 'vitepress'
import * as fs from 'fs-extra'
import * as path from 'path'
// @ts-ignore
import matter from 'gray-matter'

import pkg from '../../package.json'

const getFunctions = () => {
  const dir = 'docs/functions'
  const funList: Record<string, { link: string; text: string }[]> = {}
  fs.readdirSync(path.resolve(dir)).forEach((item) => {
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
export default defineConfig({
  title: 'vrx',
  lang: 'zh-CN',
  base: '/',
  lastUpdated: true,
  vite: { server: { port: 3002 } },
  description: '开发中对于技术的总结，归纳',
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    logo: '/favicon.svg',
    lastUpdatedText: '最后更新时间',
    socialLinks: [{ link: 'https://gitee.com/vrx/vrx', icon: 'github' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present White Kite',
    },
    nav: [
      {
        text: '指引',
        link: '/guide/',
      },
      {
        text: '方法',
        link: '/functions/',
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
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  ],
})
