<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'

type DemoOptions = Record<string, unknown>

const S3Layer = shallowRef()
const layer = shallowRef()
const visible = ref(false)
const iframeVisible = ref(false)
const title = ref('参数示例')
const content = ref('这里是 Vue 插槽内容，可以响应式更新。')
const options = ref<DemoOptions>({})
const iframeOptions = {
  type: 2,
  title: 'iframe 示例',
  content: 'https://layui.dev',
  area: ['80%', '80%'],
  maxmin: true
}

onMounted(async () => {
  const mod = await import('../../src')
  S3Layer.value = mod.S3Layer
  layer.value = mod.layer
})

function open(label: string, nextOptions: DemoOptions, nextContent?: string) {
  title.value = label
  options.value = {
    title: label,
    area: ['520px', '320px'],
    shadeClose: true,
    ...nextOptions
  }
  content.value = nextContent || '这里是 Vue 插槽内容，可以响应式更新。'
  visible.value = true
}

function openButtons() {
  open(
    '自定义按钮',
    {
      btn: ['保存', '稍后', '取消'],
      yes(index: number) {
        layer.value?.msg('点击了保存')
        layer.value?.close(index)
      },
      btn2() {
        layer.value?.msg('点击了稍后')
        return false
      },
      btn3() {
        layer.value?.msg('点击了取消')
      }
    },
    '按钮 1 对应 yes，按钮 2 起对应 btn2、btn3，以此类推。'
  )
}
</script>

<template>
  <div class="demo-box">
    <div class="demo-box__actions">
      <button type="button" @click="open('自定义宽高 area', { area: ['500px', '240px'] })">area</button>
      <button type="button" @click="open('顶部 offset', { offset: 't' })">offset: t</button>
      <button type="button" @click="open('右下角 offset', { offset: 'rb' })">offset: rb</button>
      <button type="button" @click="openButtons">btn</button>
      <button type="button" @click="open('自定义遮罩 shade', { shade: [0.5, '#1f2937'] })">shade</button>
      <button type="button" @click="open('点击遮罩关闭', { shadeClose: true })">shadeClose</button>
      <button type="button" @click="open('2 秒自动关闭', { time: 2000 })">time</button>
      <button type="button" @click="open('动画 anim', { anim: 2 })">anim</button>
      <button type="button" @click="open('最大最小化 maxmin', { maxmin: true })">maxmin</button>
      <button type="button" @click="open('禁止拉伸 resize', { resize: false })">resize: false</button>
      <button type="button" @click="open('禁止拖拽 move', { move: false })">move: false</button>
      <button type="button" @click="iframeVisible = true">iframe</button>
    </div>

    <component :is="S3Layer" v-if="S3Layer" v-model="visible" :options="options">
      <div class="demo-content">
        <label>
          弹层内容
          <input v-model="content" type="text" />
        </label>
        <p>{{ content }}</p>
      </div>
    </component>

    <component :is="S3Layer" v-if="S3Layer" v-model="iframeVisible" :options="iframeOptions" />
  </div>
</template>

<style scoped>
.demo-box {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.demo-box__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.demo-box button {
  min-height: 34px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 6px;
  padding: 0 12px;
  color: #fff;
  background: var(--vp-c-brand-1);
  cursor: pointer;
}

.demo-content {
  padding: 20px;
}

.demo-content label {
  display: block;
  color: #334155;
  font-weight: 600;
}

.demo-content input {
  width: 100%;
  min-height: 34px;
  margin-top: 6px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0 10px;
  font: inherit;
}

.demo-content p {
  margin: 16px 0 0;
  color: #475569;
}
</style>
