# Iframe

Use `type: 2` with no slot so the iframe options pass directly to layui:

```vue
<S3Layer
  v-model="visible"
  :options="{
    type: 2,
    title: 'Iframe',
    content: 'https://layui.dev',
    area: ['80%', '80%'],
    maxmin: true
  }"
/>
```

常用配置：

| 参数 | 说明 |
| --- | --- |
| `type: 2` | 指定 iframe 层。 |
| `content` | iframe URL。 |
| `area` | iframe 弹层宽高。 |
| `maxmin` | 是否允许最大化/最小化。 |

原生 iframe 方法：

```ts
layer.iframeAuto(index)
layer.iframeSrc(index, 'https://layui.dev')
const frame = layer.getChildFrame('body', index)
```
