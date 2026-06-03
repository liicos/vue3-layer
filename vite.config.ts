import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      root: resolve(__dirname, 'src'),
      entryRoot: resolve(__dirname, 'src'),
      outDirs: resolve(__dirname, 'dist'),
      tsconfigPath: resolve(__dirname, 'tsconfig.build.json'),
      include: ['**/*.ts', '**/*.vue'],
      exclude: ['App.vue', 'main.ts'],
      insertTypesEntry: false
    })
  ],
  build: {
    copyPublicDir: false,
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Vue3Layer',
      fileName: format => (format === 'es' ? 'vue3-layer.js' : 'vue3-layer.umd.cjs')
    },
    rollupOptions: {
      external: ['vue', 'layui'],
      output: {
        globals: {
          vue: 'Vue',
          layui: 'layui'
        }
      }
    }
  }
})
