# Migration

The old package used Vue CLI, `layer-src`, jQuery globals, and `createApp()` for popup slot content.

The new version uses Vite, `layui@2.13.7`, TypeScript declarations, and Vue `Teleport`.

Most simple usages continue to work:

```vue
<s3-layer v-model="visible" title="标题">
  内容
</s3-layer>
```

The recommended new form is:

```vue
<S3Layer v-model="visible" :options="{ title: '标题' }">
  内容
</S3Layer>
```

For layer callbacks, prefer `options`:

```vue
<S3Layer
  v-model="visible"
  :options="{
    title: 'Confirm',
    yes: index => layer.close(index)
  }"
/>
```
