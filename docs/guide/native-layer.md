# Native Layer API

<script setup>
import NativeMethodsDemo from '../components/NativeMethodsDemo.vue'
</script>

`vue3-layer` 不重新实现 layui layer。除了 Vue 组件外，包会完整导出原生 `layui` 和 `layer`，适合方法式调用。

<ClientOnly>
  <NativeMethodsDemo />
</ClientOnly>

```ts
import { layui, layer } from 'vue3-layer'
```

## 常用方法

| 方法 | 说明 |
| --- | --- |
| `layer.open(options)` | 打开任意类型弹层。 |
| `layer.alert(content, options?, yes?)` | 信息框。 |
| `layer.confirm(content, options?, yes?, cancel?)` | 询问框。 |
| `layer.msg(content, options?, end?)` | 消息提示。 |
| `layer.load(icon?, options?)` | 加载层。 |
| `layer.tips(content, follow, options?)` | tips 层。 |
| `layer.prompt(options?, yes?)` | 输入层。 |
| `layer.photos(options, loop?)` | 图片查看层。 |
| `layer.tab(options)` | tab 层。 |
| `layer.close(index)` | 关闭指定层。 |
| `layer.closeAll(type?)` | 关闭全部层，可按类型筛选。 |
| `layer.closeLast(type?)` | 关闭最后打开的层。 |
| `layer.style(index, css)` | 重新定义层样式。 |
| `layer.title(title, index)` | 改变标题。 |
| `layer.full(index)` | 最大化。 |
| `layer.min(index)` | 最小化。 |
| `layer.restore(index)` | 还原。 |

## 示例

```ts
layer.alert('提示', { title: 'alert' })
```

```ts
layer.confirm('确定删除吗？', { icon: 3 }, index => {
  layer.close(index)
})
```

```ts
const index = layer.load(1, { shade: 0.2 })
setTimeout(() => layer.close(index), 1200)
```

```ts
layer.prompt({ title: '请输入名称' }, (value, index) => {
  layer.msg(`你输入了：${value}`)
  layer.close(index)
})
```

更多参数以 layui 2 官方文档为准：

https://layui.dev/docs/2/layer/
