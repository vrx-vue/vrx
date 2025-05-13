import { onMounted } from 'vue'

/**
 * 是否将一个方法在 `onMounted` 立刻执行
 * @param fn
 * @param immediate
 */
export const useImmediateFn = (fn: () => any, immediate?: boolean) => {
  immediate && onMounted(fn)
}
