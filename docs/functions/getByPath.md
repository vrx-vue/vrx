---
category: utils
---

# getByPath

对 [@vill-v/path-prop](https://www.npmjs.com/package/@vill-v/path-prop) `getByPath` 的二次封装

内部使用 `unref` 保证传入 `ref` 或 `object` 都可以正确解析路径

## Usage

```ts
import {ref} from 'vue'
import {getByPath} from '@vrx/core'

const data = ref({text: {inner: 'test'}})

getByPath(data, 'text.inner')
// => test

const object = {text: {inner: 'test'}}

getByPath(object, 'text.inner')

// => test
```

## Type Declarations

```ts
declare type MayBeRef<T = any> = Ref<T> | T;

declare function getByPath<T = any>(data: MayBeRef<any>, path?: Path): any;
```

