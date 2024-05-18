---
category: utils
---

<script lang="ts" setup>
import ArrayStringJump from './demo/arrayStringJump.vue'
</script>

# arrayStringJump <Badge type="warning" text="测试" />

将string自动转换为array

将array自动转换为string

> 适用于与后端交互时其接受/返回特定分隔符模拟数组的字符串
>
> 示例: `parent,child,child`

## Demo

<ArrayStringJump />

## Usage

```ts twoslash
import { ref } from 'vue'
import { arrayStringJump } from '@vrx/core'

const stringRef = ref('')

const stringJumpRef = arrayStringJump(stringRef)
// stringJumpRef: []

stringRef.value = 'foo,bar'
// stringJumpRef: ['foo','bar']

stringJumpRef.value = []
// stringRef: ''

const arrayRef = ref<string[]>([])
const arrayJumpRef = arrayStringJump(arrayRef)
// arrayJumpRef: ''

arrayRef.value.push('foo')
arrayRef.value.push('bar')
// arrayJumpRef: 'foo,bar'

arrayJumpRef.value = ''
// arrayRef: []
```

## Type Declarations

```ts
declare function arrayStringJump(value: Ref<string>, sep?: string): WritableComputedRef<string[]>
declare function arrayStringJump(value: Ref<string[]>, sep?: string): WritableComputedRef<string>
declare function arrayStringJump(
  value: Ref<string | undefined>,
  sep?: string
): WritableComputedRef<string[] | undefined>
declare function arrayStringJump(
  value: Ref<string[] | undefined>,
  sep?: string
): WritableComputedRef<string | undefined>
```
