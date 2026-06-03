<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'

const layer = shallowRef()

onMounted(async () => {
  const mod = await import('../../src')
  layer.value = mod.layer
})

function openAlert() {
  layer.value?.alert('alert 信息框', { title: 'alert' })
}

function openConfirm() {
  layer.value?.confirm('确认继续吗？', { title: 'confirm' })
}

function openMsg() {
  layer.value?.msg('msg 提示')
}

function openLoad() {
  const index = layer.value?.load(1, { shade: 0.2 })
  window.setTimeout(() => {
    if (typeof index === 'number') layer.value?.close(index)
  }, 1200)
}

function openPrompt() {
  layer.value?.prompt({ title: '输入内容' }, (value: string, index: number) => {
    layer.value?.msg(`你输入了：${value}`)
    layer.value?.close(index)
  })
}
</script>

<template>
  <div class="native-demo">
    <button type="button" @click="openAlert">alert</button>
    <button type="button" @click="openConfirm">confirm</button>
    <button type="button" @click="openMsg">msg</button>
    <button type="button" @click="openLoad">load</button>
    <button type="button" @click="openPrompt">prompt</button>
  </div>
</template>

<style scoped>
.native-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.native-demo button {
  min-height: 34px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  padding: 0 12px;
  color: #fff;
  background: var(--vp-c-brand-1);
  cursor: pointer;
}
</style>
