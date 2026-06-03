<script setup lang="ts">
import { ref } from 'vue'
import { S3Layer, layer } from './index'

const visible = ref(false)
const content = ref('Vue slot content')
const title = ref('Vue3 Layer')

function openNativeConfirm() {
  layer.confirm('这是 layui layer 原生 confirm API', { title: '原生 API' })
}
</script>

<template>
  <main class="demo">
    <section class="demo__panel">
      <h1>Vue3 Layer</h1>
      <p>Vue 3 slot content rendered inside layui layer.</p>

      <div class="demo__actions">
        <button type="button" @click="visible = true">Open S3Layer</button>
        <button type="button" @click="openNativeConfirm">Native layer.confirm</button>
      </div>
    </section>

    <S3Layer
      v-model="visible"
      :options="{ title, area: ['520px', '320px'], maxmin: true, shadeClose: true }"
      @end="visible = false"
    >
      <div class="layer-content">
        <label>
          Content
          <input v-model="content" type="text" />
        </label>
        <p>{{ content }}</p>
        <button type="button" @click="visible = false">Close</button>
      </div>
    </S3Layer>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  color: #172033;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #f5f7fb;
}

button,
input {
  font: inherit;
}

button {
  min-height: 36px;
  border: 1px solid #1d4ed8;
  border-radius: 6px;
  padding: 0 14px;
  color: #fff;
  background: #2563eb;
  cursor: pointer;
}

button + button {
  margin-left: 8px;
}

input {
  width: 100%;
  min-height: 34px;
  margin-top: 6px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  padding: 0 10px;
}

.demo {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
}

.demo__panel {
  width: min(520px, 100%);
  border: 1px solid #d9e2f2;
  border-radius: 8px;
  padding: 28px;
  background: #fff;
  box-shadow: 0 18px 60px rgb(15 23 42 / 8%);
}

.demo__panel h1 {
  margin: 0 0 8px;
  font-size: 28px;
  line-height: 1.2;
}

.demo__panel p {
  margin: 0 0 20px;
  color: #64748b;
}

.layer-content {
  padding: 20px;
}

.layer-content label {
  display: block;
  color: #334155;
  font-weight: 600;
}

.layer-content p {
  min-height: 24px;
  margin: 16px 0;
  color: #475569;
}
</style>
