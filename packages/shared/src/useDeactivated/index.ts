import { onActivated, onDeactivated, ref } from 'vue'

/**
 * 是否被取消激活了
 * once:true 则只记录一次历史状态，可以用于判断组件是否被<keep-alive>
 */
export function useDeactivated(once = false) {
  const isDeactivated = ref(false)

  onDeactivated(() => {
    isDeactivated.value = true
  })

  once ||
    onActivated(() => {
      isDeactivated.value = false
    })

  return isDeactivated
}
