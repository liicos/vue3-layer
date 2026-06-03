import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue3 Layer',
  description: '基于 Vue 3 和 layui layer 的弹层组件',
  base: '/',
  appearance: false,
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API', link: '/api/component' },
      { text: 'Layui Layer 文档', link: 'https://layui.dev/docs/2/layer/' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '组件用法', link: '/guide/component' },
          { text: '原生 Layer API', link: '/guide/native-layer' },
          { text: '迁移指南', link: '/guide/migration' }
        ]
      },
      {
        text: 'API',
        items: [
          { text: '组件 API', link: '/api/component' },
          { text: 'Layer 参数', link: '/api/options' },
          { text: '事件', link: '/api/events' },
          { text: '实例方法', link: '/api/instance' }
        ]
      },
      {
        text: '示例',
        items: [
          { text: '层类型', link: '/examples/types' },
          { text: '图片层', link: '/examples/photos' },
          { text: 'Iframe', link: '/examples/iframe' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/liicos/vue3-layer' }]
  }
})
