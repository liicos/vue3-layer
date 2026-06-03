import type { ComponentPublicInstance } from 'vue'

type Awaitable<T> = T | Promise<T>

export type LayerIndex = number
export type LayerElement = HTMLElement & {
  addClass?: (className: string) => LayerElement
  css?: (style: string | Record<string, unknown>) => LayerElement
}

export interface LayerOpenOptions {
  type?: number
  title?: string | false | string[]
  content?: string | HTMLElement | unknown
  skin?: string
  area?: string | string[]
  offset?: string | string[]
  icon?: number
  btn?: string | string[] | false
  closeBtn?: string | number | false
  shade?: string | number | unknown[]
  shadeClose?: boolean
  time?: number
  id?: string
  anim?: number
  isOutAnim?: boolean
  maxmin?: boolean
  fixed?: boolean
  resize?: boolean
  resizing?: (layero: LayerElement) => void
  scrollbar?: boolean
  maxWidth?: number
  maxHeight?: number
  zIndex?: number
  move?: string | false
  moveOut?: boolean
  moveEnd?: (layero: LayerElement) => void
  tips?: number | unknown[]
  tipsMore?: boolean
  success?: (layero: LayerElement, index: LayerIndex) => void
  yes?: (index: LayerIndex, layero: LayerElement) => void
  cancel?: (index: LayerIndex, layero: LayerElement) => boolean | void
  beforeEnd?: (index: LayerIndex, layero?: LayerElement) => Awaitable<boolean | void>
  end?: () => void
  full?: (layero: LayerElement, index: LayerIndex) => void
  min?: (layero: LayerElement, index: LayerIndex) => void
  restore?: (layero: LayerElement, index: LayerIndex) => void
  [key: string]: unknown
}

export interface LayerApi {
  open(options: LayerOpenOptions): LayerIndex
  alert(content: string, options?: LayerOpenOptions | ((index: LayerIndex) => void), yes?: (index: LayerIndex) => void): LayerIndex
  confirm(
    content: string,
    options?: LayerOpenOptions | ((index: LayerIndex) => void),
    yes?: (index: LayerIndex) => void,
    cancel?: (index: LayerIndex) => void
  ): LayerIndex
  msg(content: string, options?: LayerOpenOptions | (() => void), end?: () => void): LayerIndex
  load(icon?: number, options?: LayerOpenOptions): LayerIndex
  tips(content: string, follow: string | HTMLElement, options?: LayerOpenOptions): LayerIndex
  prompt(options?: LayerOpenOptions, yes?: (value: string, index: LayerIndex, elem: unknown) => void): LayerIndex
  photos(options: Record<string, unknown>, loop?: boolean): LayerIndex
  tab(options: LayerOpenOptions): LayerIndex
  close(index: LayerIndex): void
  closeAll(type?: string): void
  closeLast(type?: string): void
  config(options: Record<string, unknown>): LayerApi
  ready(callback: () => void): LayerApi
  style(index: LayerIndex, css: string | Record<string, unknown>): void
  title(title: string, index: LayerIndex): void
  getChildFrame(selector: string, index: LayerIndex): unknown
  getFrameIndex(windowName: string): LayerIndex
  iframeAuto(index: LayerIndex): void
  iframeSrc(index: LayerIndex, url: string): void
  setTop(layero: LayerElement): void
  full(index: LayerIndex): void
  min(index: LayerIndex): void
  restore(index: LayerIndex): void
  [key: string]: unknown
}

export type S3LayerOptions = LayerOpenOptions

export interface S3LayerProps {
  modelValue: boolean
  options?: S3LayerOptions
}

export interface S3LayerExpose {
  getIndex: () => LayerIndex | undefined
  close: () => void
  style: (css: string | Record<string, unknown>) => void
  title: (title: string) => void
  full: () => void
  min: () => void
  restore: () => void
}

export type S3LayerInstance = ComponentPublicInstance<S3LayerProps, S3LayerExpose>
