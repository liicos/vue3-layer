<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'

const S3Layer = shallowRef()
const layer = shallowRef()
const visible = ref(false)
const logs = ref<string[]>([])

onMounted(async () => {
  const mod = await import('../../src')
  S3Layer.value = mod.S3Layer
  layer.value = mod.layer
})

function log(name: string) {
  logs.value.unshift(`${new Date().toLocaleTimeString()} ${name}`)
  logs.value = logs.value.slice(0, 8)
}

const options = {
  title: '事件示例',
  area: ['520px', '320px'],
  maxmin: true,
  resize: true,
  btn: ['确定', '保持打开'],
  success() {
    log('success')
  },
  yes(index: number) {
    log('yes')
    layer.value?.close(index)
  },
  btn2() {
    log('btn2 return false')
    return false
  },
  cancel() {
    log('cancel')
  },
  end() {
    log('end')
  },
  moveEnd() {
    log('moveEnd')
  },
  resizing() {
    log('resizing')
  },
  full() {
    log('full')
  },
  min() {
    log('min')
  },
  restore() {
    log('restore')
  }
}
</script>

<template>
  <div class="event-demo">
    <button type="button" @click="visible = true">打开事件示例</button>
    <ul>
      <li v-for="item in logs" :key="item">{{ item }}</li>
    </ul>

    <component :is="S3Layer" v-if="S3Layer" v-model="visible" :options="options">
      <div class="event-content">
        <p>拖拽、拉伸、最大化、最小化或点击按钮后，事件会记录在文档页面中。</p>
      </div>
    </component>
  </div>
</template>

<style scoped>
.event-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.event-demo button {
  min-height: 34px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  padding: 0 12px;
  color: #fff;
  background: var(--vp-c-brand-1);
  cursor: pointer;
}

.event-demo ul {
  min-height: 28px;
  margin: 12px 0 0;
  padding-left: 18px;
  color: var(--vp-c-text-2);
}

.event-content {
  padding: 20px;
}
</style>
