# Layer Options

<script setup>
import LayerOptionsDemo from '../components/LayerOptionsDemo.vue'
</script>

`S3Layer` 的 `options` 会传给 `layer.open(options)`。有默认插槽时，组件会强制使用 `type: 1` 并把 Vue 插槽内容渲染到 layer 内容区；没有默认插槽时，`content` 会原样交给 layui，适合 iframe、HTML 字符串、DOM 捕获层等原生用法。

<ClientOnly>
  <LayerOptionsDemo />
</ClientOnly>

## 常用配置

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `number` | `0` | 层类型。`0` 信息框，`1` 页面层，`2` iframe，`3` 加载层，`4` tips。 |
| `title` | `string \| false \| string[]` | `'信息'` | 标题。设为 `false` 可不显示标题栏。 |
| `content` | `string \| HTMLElement \| JQuery \| [string, 'yes' \| 'no']` | - | 内容。组件有插槽时会自动生成内容容器。 |
| `area` | `string \| string[]` | `'auto'` | 宽高。只设宽度可用 `'500px'`，宽高都设可用 `['500px', '300px']`。 |
| `offset` | `string \| string[]` | `'auto'` | 坐标。支持像素、数组和快捷方位。 |
| `icon` | `number` | - | 信息框图标。常用于 `alert`、`confirm`、`msg`。 |
| `btn` | `string \| string[] \| false` | `'确认'` | 按钮。多个按钮依次对应 `yes`、`btn2`、`btn3`。 |
| `btnAlign` | `'l' \| 'c' \| 'r'` | `'r'` | 按钮左对齐、居中、右对齐。 |
| `closeBtn` | `number \| string \| false` | `1` | 关闭按钮样式。设为 `0` 或 `false` 可隐藏。 |
| `shade` | `number \| [number, string] \| false` | `0.3` | 遮罩透明度和颜色。`0`/`false` 可不显示遮罩。 |
| `shadeClose` | `boolean` | `false` | 点击遮罩是否关闭。 |
| `time` | `number` | `0` | 自动关闭毫秒数，`0` 表示不自动关闭。 |
| `anim` | `number` | `0` | 弹出动画。`-1` 表示无动画。 |
| `isOutAnim` | `boolean` | `true` | 关闭时是否播放动画。 |
| `maxmin` | `boolean` | `false` | 是否显示最大化/最小化按钮，对 `type: 1/2` 有效。 |
| `fixed` | `boolean` | `true` | 是否固定在可视区域。 |
| `resize` | `boolean` | `true` | 是否允许右下角拉伸。 |
| `scrollbar` | `boolean` | `true` | 弹层打开时是否允许浏览器滚动。 |
| `move` | `string \| boolean` | `'.layui-layer-title'` | 拖拽触发元素，设为 `false` 禁止拖拽。 |
| `moveOut` | `boolean` | `false` | 是否允许拖出窗口外。 |
| `zIndex` | `number` | `19891014` | 层叠顺序起始值。 |

## `type`

```ts
{
  type: 0 // 信息框
  type: 1 // 页面层，适合 Vue 插槽
  type: 2 // iframe 层
  type: 3 // 加载层
  type: 4 // tips 层
}
```

组件有默认插槽时会自动使用 `type: 1`：

```vue
<S3Layer v-model="visible" :options="{ title: '页面层' }">
  <UserForm />
</S3Layer>
```

iframe 层不要传默认插槽：

```vue
<S3Layer
  v-model="visible"
  :options="{ type: 2, content: 'https://layui.dev', area: ['80%', '80%'] }"
/>
```

## `area`

```ts
{ area: '500px' }
{ area: ['500px', '300px'] }
{ area: ['80%', '80%'] }
```

## `offset`

| 值 | 说明 |
| --- | --- |
| `'auto'` | 默认，垂直水平居中。 |
| `'100px'` | 只定义 top，水平居中。 |
| `['100px', '50px']` | 同时定义 top 和 left。 |
| `'t'` | 顶部。 |
| `'r'` | 右侧。 |
| `'b'` | 底部。 |
| `'l'` | 左侧。 |
| `'lt'` | 左上角。 |
| `'lb'` | 左下角。 |
| `'rt'` | 右上角。 |
| `'rb'` | 右下角。 |

## `btn`

```ts
{
  btn: ['保存', '取消'],
  yes(index) {
    layer.close(index)
  },
  btn2(index) {
    return false
  }
}
```

`yes` 对应第一个按钮，`btn2` 从第二个按钮开始。回调返回 `false` 可阻止该按钮关闭弹层。

## `shade`

```ts
{ shade: 0.3 }
{ shade: [0.5, '#393D49'] }
{ shade: 0 }
{ shadeClose: true }
```

## 动画

| 值 | 说明 |
| --- | --- |
| `0` | 平滑放大。 |
| `1` | 从上掉落。 |
| `2` | 从底部往上滑入。 |
| `3` | 从左滑入。 |
| `4` | 从左翻滚。 |
| `5` | 渐显。 |
| `6` | 抖动。 |
| `-1` | 无动画。 |
