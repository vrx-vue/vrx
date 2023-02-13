import { h } from 'vue'
import Theme from 'vitepress/theme'
import TeamPage from './components/TeamPage.vue'
import './style/style.css'
import 'uno.css'
export default {
  ...Theme,
  Layout() {
    return h(Theme.Layout, null, {
      'home-features-after': () => h(TeamPage),
    })
  },
}
