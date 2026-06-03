import 'layui'
import 'layui/dist/css/layui.css'
import type { LayerApi } from './types'

type LayuiGlobal = {
  layer?: LayerApi
  [key: string]: unknown
}

function readGlobalLayui() {
  const scope = globalThis as unknown as {
    layui?: LayuiGlobal
    layer?: LayerApi
  }

  if (scope.layui?.layer) return scope.layui
  if (scope.layer) return { layer: scope.layer }
  return undefined
}

function resolveLayui(): LayuiGlobal {
  const resolved = readGlobalLayui()

  if (!resolved?.layer) {
    throw new Error('layui layer is not available. Make sure this code runs in a browser environment.')
  }

  return resolved
}

export function getLayui(): LayuiGlobal {
  return resolveLayui()
}

export function getLayer(): LayerApi {
  return resolveLayui().layer as LayerApi
}

export const layui = new Proxy(
  {},
  {
    get(_target, key) {
      return resolveLayui()[key as string]
    },
    set(_target, key, value) {
      resolveLayui()[key as string] = value
      return true
    }
  }
) as LayuiGlobal

export const layer = new Proxy(
  {},
  {
    get(_target, key) {
      const api = getLayer()
      const value = api[key as keyof LayerApi]
      return typeof value === 'function' ? value.bind(api) : value
    },
    set(_target, key, value) {
      getLayer()[key as keyof LayerApi] = value as never
      return true
    }
  }
) as LayerApi
