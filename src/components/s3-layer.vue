<template>
  <div class="s3-layer"></div>
</template>

<script>
import $ from 'jquery'
import 'layer-src/src/theme/default/layer.css'
import { createApp, onMounted, defineComponent, watch } from 'vue'
import { customAlphabet } from 'nanoid'

window.$ = window.jQuery = $

export default defineComponent({
  name: 's3-layer',
  inheritAttrs: false,
  props: {
    modelValue: {
      required: true,
      type: Boolean,
      default: () => false
    }
  },
  emits: ['update:modelValue', 'success', 'end', 'moveEnd', 'full', 'min', 'restore', 'resizing'],
  setup(props, { slots, emit, attrs }) {
    const layer = window.layer
    let layerIndex
    const init = () => {
      const nanoid = customAlphabet('abcdefghijklmn', 10)
      const id = nanoid()
      const options = {
        title: '信息',
        content: `<div id="${id}"></div>`,
        ...attrs
      }

      for (const attr in attrs) {
        if (attr.substr(0, 5) === 'onBtn') {
          delete options[attr]
          options[attr.substr(2).toLowerCase()] = attrs[attr]
        }
      }

      layerIndex = layer.open({
        ...options,
        resizing(layero) {
          emit('resizing', layero)
        },

        end() {
          emit('update:modelValue', false)
          emit('end', false)
        },

        success(layero, index) {
          attrs.class && layero.addClass(attrs.class)
          attrs.style && layero.css(attrs.style)

          createApp(() => slots.default?.()).mount('#' + id)
          window.dispatchEvent(new Event('resize'))
          emit('success', layero, index)
        },

        moveEnd(layero) {
          emit('moveEnd', layero)
        },

        yes(index, layero) {
          if (attrs.onYes && typeof attrs.onYes === 'function') {
            attrs.onYes(index, layero)
          } else {
            layer.close(index)
          }
        },

        cancel: function (index, layero) {
          if (attrs.onCancel && typeof attrs.onCancel === 'function') {
            return attrs.onCancel(index, layero)
          }
        },

        full(layero, index) {
          emit('full', layero, index)
        },

        min(layero, index) {
          emit('min', layero, index)
        },

        restore(layero, index) {
          emit('restore', layero, index)
        }
      })
    }

    watch(
      () => props.modelValue,
      value => {
        value ? init() : layer.close(layerIndex)
      }
    )

    onMounted(() => {
      if (props.modelValue === true) {
        init()
      }
    })
  }
})
</script>
<style scoped></style>
