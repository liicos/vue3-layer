# Layer Types

<script setup>
import LayerTypesDemo from '../components/LayerTypesDemo.vue'
</script>

<ClientOnly>
  <LayerTypesDemo />
</ClientOnly>

Use the component for Vue page layers:

```vue
<S3Layer v-model="visible" :options="{ type: 1, title: 'Page' }">
  <div>Page content</div>
</S3Layer>
```

Use native layer for dialog, loading, tips, and other built-in helpers:

```ts
layer.alert('Alert')
layer.msg('Message')
layer.load(1)
layer.tips('Tip', '#target')
```
