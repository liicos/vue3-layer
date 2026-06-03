# Events

<script setup>
import LayerEventsDemo from '../components/LayerEventsDemo.vue'
</script>

`S3Layer` 会把 layui layer 的主要回调转成 Vue 事件，同时仍允许你在 `options` 中传入原生回调。需要阻止关闭、控制按钮行为时，优先使用 `options` 回调，因为 Vue 事件本身不适合返回 `false`。

<ClientOnly>
  <LayerEventsDemo />
</ClientOnly>

## 事件表

| 事件 | 参数 | 触发时机 |
| --- | --- | --- |
| `success` | `(layero, index)` | 弹层 DOM 创建完成后。 |
| `yes` | `(index, layero)` | 点击第一个按钮。 |
| `cancel` | `(index, layero)` | 点击右上角关闭按钮。 |
| `beforeEnd` | `(index, layero?)` | 销毁前。 |
| `end` | `()` | 弹层销毁后。 |
| `moveEnd` | `(layero)` | 拖拽结束后。 |
| `resizing` | `(layero)` | 拉伸尺寸时。 |
| `full` | `(layero, index)` | 最大化后。 |
| `min` | `(layero, index)` | 最小化后。 |
| `restore` | `(layero, index)` | 从最大/最小化恢复后。 |

## 原生回调

```vue
<S3Layer
  v-model="visible"
  :options="{
    btn: ['保存', '取消'],
    yes(index) {
      save()
      layer.close(index)
    },
    btn2() {
      return false
    },
    cancel() {
      return confirm('确定关闭？')
    },
    end() {
      console.log('closed')
    }
  }"
/>
```

## Vue 事件

```vue
<S3Layer
  v-model="visible"
  @success="(layero, index) => console.log(layero, index)"
  @end="() => console.log('closed')"
>
  内容
</S3Layer>
```

如果要阻止关闭，请用 `options.cancel` 或 `options.beforeEnd` 返回 `false`。
