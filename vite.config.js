import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync } from 'fs'

const pageFiles = readdirSync(new URL('.', import.meta.url))
  .filter(file => file.endsWith('.html'))
  .reduce((pages, file) => {
    const name = file === 'index.html' ? 'index' : file.replace('.html', '')
    pages[name] = resolve(new URL(file, import.meta.url).pathname)
    return pages
  }, {})

export default defineConfig({
  root: '.',
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    strictPort: false
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: pageFiles
    }
  }
})
