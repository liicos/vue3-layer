# Photos

`layer.photos()` is available from the native export:

```ts
import { layer } from 'vue3-layer'

layer.photos({
  photos: '#photo-list',
  anim: 5
})
```

HTML 示例：

```html
<div id="photo-list">
  <img src="/a.jpg" alt="图片 A" />
  <img src="/b.jpg" alt="图片 B" />
</div>
```

常用参数：

| 参数 | 说明 |
| --- | --- |
| `photos` | 图片容器选择器，或符合 layui 格式的数据对象。 |
| `anim` | 图片层动画。 |
| `tab` | 切换图片后的回调。 |
| `end` | 图片层关闭后的回调。 |
