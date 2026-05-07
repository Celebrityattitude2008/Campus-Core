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

function buildConfigContent() {
  return `
// Configuration loaded from environment variables

const firebaseConfig = {
  apiKey: "${process.env.VITE_FIREBASE_API_KEY || ''}",
  authDomain: "${process.env.VITE_FIREBASE_AUTH_DOMAIN || ''}",
  databaseURL: "${process.env.VITE_FIREBASE_DATABASE_URL || ''}",
  projectId: "${process.env.VITE_FIREBASE_PROJECT_ID || ''}",
  storageBucket: "${process.env.VITE_FIREBASE_STORAGE_BUCKET || ''}",
  messagingSenderId: "${process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || ''}",
  appId: "${process.env.VITE_FIREBASE_APP_ID || ''}",
  measurementId: "${process.env.VITE_FIREBASE_MEASUREMENT_ID || ''}"
};

const geminiApiKey = "${process.env.VITE_GEMINI_API_KEY || ''}";

window.firebaseConfig = firebaseConfig;
window.geminiApiKey = geminiApiKey;
`
}

const injectEnvPlugin = {
  name: 'inject-env',
  apply: 'build',
  async generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'config.js',
      source: buildConfigContent()
    })
  }
}

export default defineConfig({
  root: '.',
  plugins: [injectEnvPlugin],
  server: {
    port: 5000,
    host: '0.0.0.0',
    allowedHosts: true,
    strictPort: false
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: pageFiles
    }
  }
})
