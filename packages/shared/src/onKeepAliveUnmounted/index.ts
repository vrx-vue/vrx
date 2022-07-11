import { onDeactivated, onUnmounted } from 'vue-demi'
import { Fn } from '../utils'
import { useDeactivated } from '../useDeactivated'

/**
 * 在<keep-alive>中持续模拟触发卸载生命周期
 * @param fn
 */
export function onKeepAliveUnmounted(fn: Fn) {
  const isDeactivated = useDeactivated(true)

  onDeactivated(() => {
    if (!isDeactivated.value) {
      return
    }
    return fn()
  })

  onUnmounted(() => {
    if (isDeactivated.value) {
      return
    }
    return fn()
  })
}
