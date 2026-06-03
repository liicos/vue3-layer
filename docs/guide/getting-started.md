# 快速开始

`vue3-layer` 是基于 layui layer 的 Vue 3 组件库。它提供两种使用方式：

- `S3Layer`：用 Vue 组件、`v-model`、插槽来写弹层内容。
- `layer`：直接使用 layui layer 原生 API。

## 安装

```sh
npm install vue3-layer
```

Vue 是 peer dependency：

```sh
npm install vue@^3.5.35
```

## 局部引入

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

## 全局注册

```ts
import { createApp } from 'vue'
import { S3Layer } from 'vue3-layer'
import App from './App.vue'

createApp(App).component('S3Layer', S3Layer).mount('#app')
```

## 原生 layer

```ts
import { layer } from 'vue3-layer'

layer.alert('提示')
layer.confirm('确定继续？')
layer.msg('保存成功')
```

## 旧写法兼容

旧版本常见写法仍然可用：

```vue
<s3-layer v-model="visible" title="标题" :area="['520px', '320px']">
  内容
</s3-layer>
```

新项目推荐把 layer 参数集中放到 `options`：

```vue
<S3Layer v-model="visible" :options="{ title: '标题', area: ['520px', '320px'] }">
  内容
</S3Layer>
```
