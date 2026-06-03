<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef, useAttrs, useSlots, watch } from 'vue'
import { getLayer } from '../layui'
import type { LayerElement, LayerIndex, S3LayerOptions, S3LayerProps } from '../types'

defineOptions({
  name: 'S3Layer',
  inheritAttrs: false
})

const props = withDefaults(defineProps<S3LayerProps>(), {
  modelValue: false,
  options: () => ({})
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  success: [layero: LayerElement, index: LayerIndex]
  yes: [index: LayerIndex, layero: LayerElement]
  cancel: [index: LayerIndex, layero: LayerElement]
  beforeEnd: [index: LayerIndex, layero?: LayerElement]
  end: []
  moveEnd: [layero: LayerElement]
  resizing: [layero: LayerElement]
  full: [layero: LayerElement, index: LayerIndex]
  min: [layero: LayerElement, index: LayerIndex]
  restore: [layero: LayerElement, index: LayerIndex]
}>()

const attrs = useAttrs()
const slots = useSlots()
const layerIndex = ref<LayerIndex>()
const layerElement = shallowRef<LayerElement>()
const teleportTarget = shallowRef<HTMLElement>()
const closingAfterAsyncBeforeEnd = ref(false)
const hasSlotContent = computed(() => Boolean(slots.default))
let teleportSeed = 0

function toLayerCallbackName(attr: string) {
  const callbackName = attr.slice(2)
  return callbackName.charAt(0).toLowerCase() + callbackName.slice(1)
}

function attrsToOptions() {
  const options: S3LayerOptions = {}

  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'class' || key === 'style') return

    if (/^on[A-Z]/.test(key) && typeof value === 'function') {
      options[toLayerCallbackName(key)] = value
      return
    }

    options[key] = value
  })

  return options
}

function applyLayerAttrs(layero: LayerElement) {
  const className = attrs.class
  const style = attrs.style

  if (className) {
    if (typeof layero.addClass === 'function') {
      layero.addClass(String(className))
    } else {
      layero.classList.add(...String(className).split(/\s+/).filter(Boolean))
    }
  }

  if (style) {
    if (typeof layero.css === 'function') {
      layero.css(style as string | Record<string, unknown>)
    } else if (typeof style === 'string') {
      layero.setAttribute('style', `${layero.getAttribute('style') || ''};${style}`)
    } else if (typeof style === 'object') {
      Object.assign(layero.style, style)
    }
  }
}

function cleanup() {
  layerIndex.value = undefined
  layerElement.value = undefined
  teleportTarget.value = undefined
  closingAfterAsyncBeforeEnd.value = false
}

function close() {
  if (layerIndex.value === undefined) return
  getLayer().close(layerIndex.value)
}

function runBeforeEnd(options: S3LayerOptions, index: LayerIndex, layero?: LayerElement) {
  if (closingAfterAsyncBeforeEnd.value) return undefined

  emit('beforeEnd', index, layero)
  const result = options.beforeEnd?.(index, layero)

  if (result && typeof (result as Promise<unknown>).then === 'function') {
    ;(result as Promise<boolean | void>)
      .then(value => {
        if (value === false || layerIndex.value !== index) return
        closingAfterAsyncBeforeEnd.value = true
        getLayer().close(index)
      })
      .catch(() => undefined)

    return false
  }

  return result
}

async function open() {
  if (layerIndex.value !== undefined || typeof window === 'undefined') return

  const layer = getLayer()
  const teleportId = hasSlotContent.value ? `s3-layer-teleport-${Date.now()}-${teleportSeed++}` : undefined
  const optionAttrs = attrsToOptions()
  const userOptions = props.options || {}
  const options: S3LayerOptions = {
    title: '信息',
    ...optionAttrs,
    ...userOptions
  }

  if (teleportId) {
    options.type = 1
    options.content = `<div id="${teleportId}" class="s3-layer__teleport"></div>`
  }

  const {
    success,
    yes,
    cancel,
    beforeEnd,
    end,
    moveEnd,
    resizing,
    full,
    min,
    restore,
    ...openOptions
  } = options

  const index = layer.open({
    ...openOptions,
    success(layero, currentIndex) {
      layerElement.value = layero
      if (teleportId) {
        const target = document.getElementById(teleportId)
        if (target) {
          teleportTarget.value = target
        }
      }
      applyLayerAttrs(layero)
      success?.(layero, currentIndex)
      window.dispatchEvent(new Event('resize'))
      emit('success', layero, currentIndex)
    },
    yes(currentIndex, layero) {
      yes?.(currentIndex, layero)
      emit('yes', currentIndex, layero)

      if (!yes) {
        layer.close(currentIndex)
      }
    },
    cancel(currentIndex, layero) {
      const result = cancel?.(currentIndex, layero)
      emit('cancel', currentIndex, layero)
      return result
    },
    beforeEnd(currentIndex, layero) {
      return runBeforeEnd({ ...options, beforeEnd }, currentIndex, layero)
    },
    end() {
      end?.()
      emit('update:modelValue', false)
      emit('end')
      cleanup()
    },
    moveEnd(layero) {
      moveEnd?.(layero)
      emit('moveEnd', layero)
    },
    resizing(layero) {
      resizing?.(layero)
      emit('resizing', layero)
    },
    full(layero, currentIndex) {
      full?.(layero, currentIndex)
      emit('full', layero, currentIndex)
    },
    min(layero, currentIndex) {
      min?.(layero, currentIndex)
      emit('min', layero, currentIndex)
    },
    restore(layero, currentIndex) {
      restore?.(layero, currentIndex)
      emit('restore', layero, currentIndex)
    }
  })

  layerIndex.value = index
  await nextTick()
}

watch(
  () => props.modelValue,
  value => {
    if (value) {
      void open()
    } else {
      close()
    }
  }
)

onMounted(() => {
  if (props.modelValue) {
    void open()
  }
})

onBeforeUnmount(() => {
  close()
  cleanup()
})

function getIndex() {
  return layerIndex.value
}

function style(css: string | Record<string, unknown>) {
  if (layerIndex.value === undefined) return
  getLayer().style(layerIndex.value, css)
}

function title(titleValue: string) {
  if (layerIndex.value === undefined) return
  getLayer().title(titleValue, layerIndex.value)
}

function full() {
  if (layerIndex.value === undefined) return
  getLayer().full(layerIndex.value)
}

function min() {
  if (layerIndex.value === undefined) return
  getLayer().min(layerIndex.value)
}

function restore() {
  if (layerIndex.value === undefined) return
  getLayer().restore(layerIndex.value)
}

defineExpose({
  getIndex,
  close,
  style,
  title,
  full,
  min,
  restore
})
</script>

<template>
  <Teleport v-if="teleportTarget" :to="teleportTarget">
    <slot />
  </Teleport>
</template>
