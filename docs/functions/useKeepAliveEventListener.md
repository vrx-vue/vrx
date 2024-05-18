---
category: browser
---

# useKeepAliveEventListener

改写自[vueuse](https://vueuse.org)中[useEventListener](https://vueuse.org/useEventListener)

使[useEventListener](https://vueuse.org/useEventListener)在keep-alive场景下能

- 在onMounted 与 onActivated 注册监听器
- 在onDeactivated 与 onUnmounted 时移除监听器

## Usage

```ts twoslash
import { useKeepAliveEventListener } from '@vrx/core'

useKeepAliveEventListener('resize', () => {})

useKeepAliveEventListener(document.getElementById('app'), 'click', () => {})
```

## Type Declarations

```ts
interface InferEventTarget<Events> {
  addEventListener(event: Events, fn?: any, options?: any): any

  removeEventListener(event: Events, fn?: any, options?: any): any
}

declare type WindowEventName = keyof WindowEventMap
declare type DocumentEventName = keyof DocumentEventMap

interface GeneralEventListener<E = Event> {
  (evt: E): void
}

declare function useKeepAliveEventListener<E extends keyof WindowEventMap>(
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

declare function useKeepAliveEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

declare function useKeepAliveEventListener<E extends keyof DocumentEventMap>(
  target: Document,
  event: E,
  listener: (this: Document, ev: DocumentEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

declare function useKeepAliveEventListener<Names extends string, EventType = Event>(
  target: InferEventTarget<Names>,
  event: Names,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): Fn

declare function useKeepAliveEventListener<EventType = Event>(
  target: MayBeRef<EventTarget | null | undefined>,
  event: string,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): Fn
```
