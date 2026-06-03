# Vue3 Layer

[![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/liicos/vue3-layer)
[![github](https://img.shields.io/badge/Author-legad-blue.svg)](https://github.com/liicos)
[![document](https://img.shields.io/badge/Doc-welcome-red.svg)](http://vue-layer.then66.top)

vue3-layer 是一款基于 layui 的 layer.js 上层封装的 Vue 3 组件，100% 支持 layer.js 的 API。

如果你对 layer.js 的 UI 风格足够熟悉，你会发现国内使用 layer.js 的网站非常之多。然而基于 jQuery 的它并不能很好地适配 MVVM 的开发模式。开发这个组件的目的，就是为了让大家在 Vue 中也能方便地使用这个多功能弹出层。

## 特性

- 支持 Vue 3.5+
- 基于 `layui@2.13.7`
- 使用 `v-model` 控制弹层打开/关闭
- 使用 Vue `Teleport` 渲染插槽内容，保留父组件上下文
- 完整导出原生 `layer` API
- Vite 构建，输出 ESM、UMD 和 TypeScript 声明
- VitePress 文档和可运行示例

## 安装

```sh
npm install vue3-layer
```

Vue 是 peer dependency：

```sh
npm install vue@^3.5.35
```

## 组件用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { S3Layer } from 'vue3-layer'

const visible = ref(false)
</script>

<template>
  <button type="button" @click="visible = true">打开</button>

  <S3Layer v-model="visible" :options="{ title: '标题', area: ['520px', '320px'] }">
    <div>Vue 插槽内容</div>
  </S3Layer>
</template>
```

旧写法仍然兼容：

```vue
<s3-layer v-model="visible" title="标题" :area="['520px', '320px']">
  内容
</s3-layer>
```

## 原生 Layer API

```ts
import { layer } from 'vue3-layer'

layer.alert('提示')
layer.confirm('确定继续？')
layer.msg('保存成功')
layer.photos({ photos: '#photos' })
```

## 本地开发

```sh
npm install
npm run dev
npm run docs:dev
```

## 构建与检查

```sh
npm run lint
npm run typecheck
npm run build
npm run docs:build
```

## 文档

文档基于 VitePress：

```sh
npm run docs:dev
```

layui layer 官方文档：

https://layui.dev/docs/2/layer/
