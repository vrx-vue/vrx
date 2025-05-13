import type { ComponentPublicInstance, MaybeRef } from 'vue'
import { unref } from 'vue'

export type VueInstance = ComponentPublicInstance
export type MayBeElementRef<T extends MayBeElement = MayBeElement> = MaybeRef<T>
export type MayBeElement = HTMLElement | SVGElement | VueInstance | undefined | null

export type UnRefElementReturn<T extends MayBeElement = MayBeElement> = T extends VueInstance
  ? Exclude<MayBeElement, VueInstance>
  : T | undefined

/**
 * Get the dom element of a ref of element or Vue component instance
 * 因为该方法只是内置了vueuse/unrefElement 未做任何更改，遂指作为内部使用
 * @param elRef
 * @licence https://github.com/vueuse/vueuse/blob/main/packages/core/unrefElement/index.ts
 */
export function unrefElement<T extends MayBeElement>(
  elRef: MayBeElementRef<T>
): UnRefElementReturn<T> {
  const plain = unref(elRef)
  return (plain as VueInstance)?.$el ?? plain
}
