import { defineConfig } from 'vite'
import { resolve } from 'path'
import { readdirSync, readFileSync, writeFileSync } from 'fs'

const pageFiles = readdirSync(new URL('.', import.meta.url))
  .filter(file => file.endsWith('.html'))
  .reduce((pages, file) => {
    const name = file === 'index.html' ? 'index' : file.replace('.html', '')
    pages[name] = resolve(new URL(file, import.meta.url).pathname)
    return pages
  }, {})

// Plugin to inject environment variables into config.js
const injectEnvPlugin = {
  name: 'inject-env',
  apply: 'build',
  async generateBundle() {
    const configPath = resolve(new URL('.', import.meta.url).pathname, 'config.js')
    let configContent = readFileSync(configPath, 'utf-8')
    
    // Replace placeholders with environment variables
    configContent = configContent
      .replace(/__VITE_FIREBASE_API_KEY__/g, process.env.VITE_FIREBASE_API_KEY || '')
      .replace(/__VITE_FIREBASE_AUTH_DOMAIN__/g, process.env.VITE_FIREBASE_AUTH_DOMAIN || '')
      .replace(/__VITE_FIREBASE_DATABASE_URL__/g, process.env.VITE_FIREBASE_DATABASE_URL || '')
      .replace(/__VITE_FIREBASE_PROJECT_ID__/g, process.env.VITE_FIREBASE_PROJECT_ID || '')
      .replace(/__VITE_FIREBASE_STORAGE_BUCKET__/g, process.env.VITE_FIREBASE_STORAGE_BUCKET || '')
      .replace(/__VITE_FIREBASE_MESSAGING_SENDER_ID__/g, process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '')
      .replace(/__VITE_FIREBASE_APP_ID__/g, process.env.VITE_FIREBASE_APP_ID || '')
      .replace(/__VITE_FIREBASE_MEASUREMENT_ID__/g, process.env.VITE_FIREBASE_MEASUREMENT_ID || '')
      .replace(/__VITE_GEMINI_API_KEY__/g, process.env.VITE_GEMINI_API_KEY || '')
    
    // Emit the config file to the dist folder
    this.emitFile({
      type: 'asset',
      fileName: 'config.js',
      source: configContent
    })
  }
}

export default defineConfig({
  root: '.',
  plugins: [injectEnvPlugin],
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
