# Vue3 Layer

Vue3 Layer is a Vue 3 wrapper around [layui layer](https://layui.dev/docs/2/layer/). It keeps the native `layer` API available and adds a Vue component for rendering slot content inside `layer.open()`.

## Install

```sh
npm install vue3-layer
```

Vue is a peer dependency:

```sh
npm install vue@^3.5.35
```

## Component Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { S3Layer } from 'vue3-layer'

const visible = ref(false)
</script>

<template>
  <button type="button" @click="visible = true">Open</button>

  <S3Layer v-model="visible" :options="{ title: 'Title', area: ['520px', '320px'] }">
    <div>Vue slot content</div>
  </S3Layer>
</template>
```

## Native Layer API

```ts
import { layer } from 'vue3-layer'

layer.alert('Message')
layer.confirm('Continue?')
layer.msg('Saved')
```

## Scripts

```sh
npm run dev
npm run build
npm run typecheck
npm run lint
npm run docs:dev
npm run docs:build
```

## Documentation

The local docs are powered by VitePress:

```sh
npm run docs:dev
```
