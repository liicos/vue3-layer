---
layout: home
title: Vue3 Layer
hero:
  name: Vue3 Layer
  text: Vue 3 驱动的 layui layer 弹层解决方案
  tagline: 用组件化方式接入 layer，同时完整保留 layui layer 原生 API。
  actions:
    - text: 快速上手
      link: /guide/getting-started
      theme: brand
    - text: 查看示例
      link: /api/options
      theme: alt
    - text: Layui Layer 文档
      link: https://layui.dev/docs/2/layer/
      theme: alt
features:
  - title: Vue 组件化
    details: 用 v-model、插槽和事件管理弹层，同时保留 Vue 响应式上下文。
  - title: 原生 layer API
    details: 完整导出 layui layer，alert、confirm、msg、photos、iframe 等能力都可直接使用。
  - title: Vite 与类型声明
    details: 使用 Vite 构建组件库，输出 ESM、UMD 和 TypeScript 声明文件。
  - title: 只支持 Vue 3
    details: 面向 Vue 3.5+ 设计，不再兼容 Vue 2 和旧 Vue CLI 构建链。
---

## 两种用法

### Vue 组件

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { S3Layer } from 'vue3-layer'

const visible = ref(false)
</script>

<template>
  <button type="button" @click="visible = true">打开弹层</button>

  <S3Layer v-model="visible" :options="{ title: '标题', area: ['520px', '320px'] }">
    <div>Vue 插槽内容</div>
  </S3Layer>
</template>
```

### 原生方法

```ts
import { layer } from 'vue3-layer'

layer.msg('保存成功')
layer.confirm('确定继续？')
layer.photos({ photos: '#photos' })
```

## 为什么重构

旧版基于 Vue CLI、`layer-src` 和动态 `createApp()`。新版改为 Vite、`layui@2.13.7` 和 Vue `Teleport`，让插槽内容能保留父组件上下文，也让构建和文档更贴近现代 Vue 3 项目。
