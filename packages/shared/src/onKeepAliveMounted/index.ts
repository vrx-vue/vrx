import { onActivated, onMounted } from 'vue-demi'
import { Fn } from '../utils'
import { useDeactivated } from '../useDeactivated'

/**
 * 在<keep-alive>中持续触发初始化
 * @param fn
 */
export function onKeepAliveMounted(fn: Fn) {
  const isDeactivated = useDeactivated(true)
  onMounted(() => {
    if (isDeactivated.value) {
      return
    }
    return fn()
  })

  onActivated(() => {
    if (!isDeactivated.value) {
      return
    }
    return fn()
  })
}
