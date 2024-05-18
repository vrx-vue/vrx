import { h } from 'vue'
import Theme from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import TeamPage from './components/TeamPage.vue'
import ReloadPrompt from './components/ReloadPrompt.vue'
import './style/style.css'
import '@shikijs/vitepress-twoslash/style.css'
import 'uno.css'

export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(TeamPage),
      'layout-bottom': () => h(ReloadPrompt),
    })
  },
  enhanceApp({ app }) {
    app.use(TwoslashFloatingVue)
  },
}
