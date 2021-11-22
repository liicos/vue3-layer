<template>
  <div class="example">
    <s3-layer v-model="visible" :title="title" @success="success" @end="end">
      <input type="text" v-model="content" /> {{ content }}
      <button @click="visible = false">隐藏</button>
    </s3-layer>
    <button @click="visible = true">显示</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { s3Layer, layer } from './components/index'

layer.confirm('现在是使用layer.js原生API')

const content = ref('')
const visible = ref(false)
const title = ref('标题')

const success = (layero, index) => {
  console.log('success', layero, index)
}
const end = () => {
  console.log('end')
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.example {
  width: 100px;
  margin: 100px auto;
}
</style>
