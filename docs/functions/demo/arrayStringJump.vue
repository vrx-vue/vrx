<script lang="ts" setup>
  import { arrayStringJump } from '@vrx/core'
  import { ref, computed, watch } from 'vue'
  const stringRef = ref('')
  const stringJumpRef = arrayStringJump(stringRef)
  const arrayStrRef = ref('[]')
  const arrayRef = ref([])

  watch(arrayStrRef, (n) => {
    try {
      arrayRef.value = JSON.parse(`{"data":${n}}`).data
    } catch (e) {}
  })

  const arrayJumpRef = arrayStringJump(arrayRef)
</script>
<template>
  <p>请输入数组</p>
  <input
    v-model="arrayStrRef"
    class="placeholder:text-$vp-c-text-1 border-1px border-solid rounded-4px p-10px"
  />
  <div class="language-ts p-20px">
    {{ arrayJumpRef }}
  </div>
  <p>请输入',' 分割的字符串</p>
  <input
    v-model="stringRef"
    class="placeholder:text-$vp-c-text-1 border-1px border-solid rounded-4px p-10px"
  />
  <div class="language-ts p-20px">
    {{ stringJumpRef }}
  </div>
</template>

<style scoped></style>
