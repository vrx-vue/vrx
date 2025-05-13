import type { Fn } from '@vrx/shared'
import { noop, useDeactivated } from '@vrx/shared'
import { type MaybeRef, watch } from 'vue'
import { isString } from '@vill-v/type-as'
import type { MayBeElementRef } from '../unrefElement'
import { unrefElement } from '../unrefElement'

interface InferEventTarget<Events> {
  addEventListener(event: Events, fn?: any, options?: any): any

  removeEventListener(event: Events, fn?: any, options?: any): any
}

export type WindowEventName = keyof WindowEventMap
export type DocumentEventName = keyof DocumentEventMap

export interface GeneralEventListener<E = Event> {
  (evt: E): void
}

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 1: Omitted Window target
 *
 * @see https://vueuse.org/useEventListener
 * @param event
 * @param listener
 * @param options
 */
export function useKeepAliveEventListener<E extends keyof WindowEventMap>(
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 2: Explicitly Window target
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useKeepAliveEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 3: Explicitly Document target
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useKeepAliveEventListener<E extends keyof DocumentEventMap>(
  target: Document,
  event: E,
  listener: (this: Document, ev: DocumentEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 4: Custom event target with event type infer
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useKeepAliveEventListener<Names extends string, EventType = Event>(
  target: InferEventTarget<Names>,
  event: Names,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register using addEventListener on mounted, and removeEventListener automatically on unmounted.
 *
 * Overload 5: Custom event target fallback
 *
 * @see https://vueuse.org/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 */
export function useKeepAliveEventListener<EventType = Event>(
  target: MaybeRef<EventTarget | null | undefined>,
  event: string,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * 改写自 vueuse
 * 为了解决<keep-alive> 场景，监听器未被取消的情景，对部分业务进行了重写
 * 因为此改写仅针对<keep-alive>场景 , 相对vueuse/useEventListener会缺少很多功能
 * 一般情况请使用vueuse
 * @param args
 * @licence https://github.com/vueuse/vueuse/blob/main/packages/core/useEventListener/index.ts
 */
export function useKeepAliveEventListener(...args: any[]) {
  const isDeactivated = useDeactivated()
  let target: MaybeRef<EventTarget> | undefined
  let event: string
  let listener: any
  let options: any

  if (isString(args[0])) {
    ;[event, listener, options] = args
    target = window
  } else {
    ;[target, event, listener, options] = args
  }

  if (!target) return noop

  let cleanup = noop

  const stopWatch = watch(
    [() => unrefElement(target as unknown as MayBeElementRef), isDeactivated],
    ([el, deactivated]) => {
      cleanup()
      if (!el || deactivated) return

      el.addEventListener(event, listener, options)

      cleanup = () => {
        el.removeEventListener(event, listener, options)
        cleanup = noop
      }
    },
    { immediate: true, flush: 'post' }
  )

  return () => {
    stopWatch()
    cleanup()
  }
}
