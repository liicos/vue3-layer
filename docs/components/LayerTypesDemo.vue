<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'

const visible = ref(false)
const message = ref('来自 VitePress 的 Vue 插槽内容')
const S3Layer = shallowRef()
const layer = shallowRef()

onMounted(async () => {
  const mod = await import('../../src')
  S3Layer.value = mod.S3Layer
  layer.value = mod.layer
})

function openNativeMsg() {
  layer.value?.msg('这是原生 layer.msg()')
}

function openNativeConfirm() {
  layer.value?.confirm('这是原生 layer.confirm()', { title: '原生 API' })
}
</script>

<template>
  <div class="layer-demo">
    <div class="layer-demo__actions">
      <button type="button" @click="visible = true">打开 Vue 组件弹层</button>
      <button type="button" @click="openNativeMsg">layer.msg</button>
      <button type="button" @click="openNativeConfirm">layer.confirm</button>
    </div>

    <p class="layer-demo__status">
      当前状态：{{ visible ? '已打开' : '已关闭' }}
    </p>

    <component
      :is="S3Layer"
      v-if="S3Layer"
      v-model="visible"
      :options="{ title: 'VitePress 示例', area: ['520px', '320px'], maxmin: true, shadeClose: true }"
    >
      <div class="layer-demo__content">
        <label>
          修改内容
          <input v-model="message" type="text" />
        </label>
        <p>{{ message }}</p>
        <button type="button" @click="visible = false">关闭</button>
      </div>
    </component>
  </div>
</template>

<style scoped>
.layer-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.layer-demo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.layer-demo button {
  min-height: 34px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  padding: 0 12px;
  color: #fff;
  background: var(--vp-c-brand-1);
  cursor: pointer;
}

.layer-demo__status {
  margin: 12px 0 0;
  color: var(--vp-c-text-2);
}

.layer-demo__content {
  padding: 20px;
}

.layer-demo__content label {
  display: block;
  color: #334155;
  font-weight: 600;
}

.layer-demo__content input {
  width: 100%;
  min-height: 34px;
  margin-top: 6px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0 10px;
  font: inherit;
}

.layer-demo__content p {
  min-height: 24px;
  margin: 16px 0;
  color: #475569;
}
</style>
