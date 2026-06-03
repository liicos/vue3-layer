# 组件用法

`S3Layer` 把 Vue 状态和 layui layer 生命周期连接起来：

- `v-model` 为 `true` 时调用 `layer.open()`。
- `v-model` 为 `false` 时关闭当前弹层。
- 有默认插槽时，使用 `Teleport` 把 Vue 内容渲染进 layer 内容区。
- 无默认插槽时，`options.content` 原样交给 layui。

## 基础弹层

```vue
<S3Layer
  v-model="visible"
  :options="{
    title: '用户表单',
    area: ['640px', '420px'],
    maxmin: true,
    shadeClose: true
  }"
>
  <UserForm />
</S3Layer>
```

## iframe 弹层

iframe 层不要传默认插槽：

```vue
<S3Layer
  v-model="visible"
  :options="{
    type: 2,
    title: 'iframe',
    content: 'https://layui.dev',
    area: ['80%', '80%'],
    maxmin: true
  }"
/>
```

## 按钮回调

需要控制按钮关闭行为时，把回调写在 `options` 中：

```vue
<S3Layer
  v-model="visible"
  :options="{
    title: '确认',
    btn: ['保存', '取消'],
    yes(index) {
      save()
      layer.close(index)
    },
    btn2() {
      return false
    }
  }"
>
  保存后将关闭，取消按钮会保持打开。
</S3Layer>
```

## 事件监听

```vue
<S3Layer
  v-model="visible"
  @success="(layero, index) => console.log(layero, index)"
  @end="() => console.log('closed')"
>
  内容
</S3Layer>
```

如果事件需要返回值影响 layer 行为，使用 `options` 回调。
