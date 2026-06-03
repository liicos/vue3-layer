# Instance Methods

Use a Vue template ref to access methods for the current layer instance:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { S3LayerExpose } from 'vue3-layer'

const layerRef = ref<S3LayerExpose>()
</script>

<template>
  <S3Layer ref="layerRef" v-model="visible" />
  <button type="button" @click="layerRef?.full()">Full</button>
</template>
```

Exposed methods:

| Method | Description |
| --- | --- |
| `getIndex()` | Returns the current layer index. |
| `close()` | Closes the current layer. |
| `style(css)` | Calls `layer.style(index, css)`. |
| `title(title)` | Calls `layer.title(title, index)`. |
| `full()` | Calls `layer.full(index)`. |
| `min()` | Calls `layer.min(index)`. |
| `restore()` | Calls `layer.restore(index)`. |
