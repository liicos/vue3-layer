# Vue3-Layer 弹出层

[![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/xaboy/form-create)
[![github](https://img.shields.io/badge/Author-legad-blue.svg)](https://github.com/xaboy)
[![document](https://img.shields.io/badge/Doc-welcome-red.svg)]()

vue3-layer 是一款基于 layer.js 上层封装的 vue3 组件，100%支持 layer.js 的 API

## 文档 (Document) 正在建设中...

## 通过 npm 或者 yarn 安装

```shell
# npm
npm install vue3-layer --save
# yarn
yarn add vue3-layer
```

## 浏览器直接引入

使用 CDN 引入

```html
<head>
  <!-- 引入样式 -->
  <link rel="stylesheet" href="//unpkg.com/vue3-layer/dist/s3layer.css" />
  <!-- 引入 Vue -->
  <script src="//unpkg.com/vue@next"></script>
  <!-- 引入组件库 -->
  <script src="//unpkg.com/vue3-layer/dist/s3layer.umd.min.js"></script>
</head>
```

## 使用

```vue
<template>
  <s3-layer v-model="visible" :title="title" @success="success" @end="end">
    <span>this is vue3-layer</span>
  </s3-layer>
  <button @click="visible = true">显示</button>
</template>

<script setup>
import { ref } from 'vue'
import { s3Layer } from 'vue3-layer'
import 'vue3-layer/dist/s3layer.css'

const visible = ref(false)
const title = ref('标题')

const success = (layero, index) => {
  console.log('success', layero, index)
}
const end = () => {
  console.log('end')
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
```
