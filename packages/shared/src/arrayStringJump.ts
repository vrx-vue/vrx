import { Ref, WritableComputedRef, computed } from 'vue-demi'
import { isNil } from '@vill-v/type-as'
export function arrayStringJump(value: Ref<string>, sep?: string): WritableComputedRef<string[]>

export function arrayStringJump(value: Ref<string[]>, sep?: string): WritableComputedRef<string>

export function arrayStringJump(
  value: Ref<string | undefined>,
  sep?: string
): WritableComputedRef<string[] | undefined>

export function arrayStringJump(
  value: Ref<string[] | undefined>,
  sep?: string
): WritableComputedRef<string | undefined>

/**
 * 将字符串转换为自已定分隔符的数组ref
 * @param value
 * @param sep
 */
export function arrayStringJump(value: Ref<string[] | string | undefined>, sep: string = ',') {
  return computed({
    get: () => {
      if (isNil(value.value)) {
        return
      }
      if (Array.isArray(value.value)) {
        return value.value.filter((item) => !!item).join(sep)
      }
      return value.value.split(sep).filter((item) => !!item)
    },
    set: (str) => {
      if (isNil(str)) {
        value.value = undefined
        return
      }
      if (Array.isArray(str)) {
        value.value = str.filter((item) => !!item).join(sep)
        return
      }
      value.value = (str ? str.split(sep) : []).filter((item) => !!item)
    },
  })
}
