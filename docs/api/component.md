# Component API

`S3Layer` 是 `layer.open()` 的 Vue 组件适配层。它不替代原生 `layer`，只负责把 Vue 的 `v-model`、插槽和事件接入 layui layer。

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `modelValue` | `boolean` | `false` | 控制弹层打开状态，用 `v-model` 绑定。 |
| `options` | `S3LayerOptions` | `{}` | 传给 `layer.open(options)` 的配置。 |

兼容旧写法时，顶层 attrs 也会合并到 options：

```vue
<s3-layer v-model="visible" title="标题" :area="['520px', '320px']">
  内容
</s3-layer>
```

推荐新写法：

```vue
<S3Layer v-model="visible" :options="{ title: '标题', area: ['520px', '320px'] }">
  内容
</S3Layer>
```

## Slots

| 名称 | 说明 |
| --- | --- |
| `default` | Vue 内容。存在默认插槽时，组件自动创建 `type: 1` page 层并用 `Teleport` 渲染内容。 |

有插槽：

```vue
<S3Layer v-model="visible" :options="{ title: '表单' }">
  <UserForm />
</S3Layer>
```

无插槽：

```vue
<S3Layer
  v-model="visible"
  :options="{ type: 2, title: 'iframe', content: 'https://layui.dev', area: ['80%', '80%'] }"
/>
```

## Emits

| 事件 | 参数 |
| --- | --- |
| `update:modelValue` | `(value: boolean)` |
| `success` | `(layero, index)` |
| `yes` | `(index, layero)` |
| `cancel` | `(index, layero)` |
| `beforeEnd` | `(index, layero?)` |
| `end` | `()` |
| `moveEnd` | `(layero)` |
| `resizing` | `(layero)` |
| `full` | `(layero, index)` |
| `min` | `(layero, index)` |
| `restore` | `(layero, index)` |

## Expose

通过模板 ref 可调用当前组件实例方法：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { S3LayerExpose } from 'vue3-layer'

const layerRef = ref<S3LayerExpose>()
</script>

<template>
  <S3Layer ref="layerRef" v-model="visible" />
  <button type="button" @click="layerRef?.full()">最大化</button>
</template>
```

| 方法 | 说明 |
| --- | --- |
| `getIndex()` | 返回当前 layer index。 |
| `close()` | 关闭当前弹层。 |
| `style(css)` | 调用 `layer.style(index, css)`。 |
| `title(title)` | 调用 `layer.title(title, index)`。 |
| `full()` | 最大化。 |
| `min()` | 最小化。 |
| `restore()` | 还原。 |

## 设计边界

- Vue 插槽内容优先用 `S3Layer`。
- `msg`、`alert`、`confirm`、`prompt`、`photos`、`tab` 等方法式调用优先用导出的原生 `layer`。
- 需要完整控制按钮返回值、阻止关闭、iframe 操作时，优先把回调写在 `options` 中。
