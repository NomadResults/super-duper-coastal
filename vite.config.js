import { existsSync } from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `vite preview` falls back to /index.html for extensionless URLs before
// checking for a prerendered <route>/index.html, which breaks local testing
// of the prerendered pages (Vercel resolves these correctly in production).
function prerenderedPreview() {
  return {
    name: 'prerendered-preview',
    configurePreviewServer(server) {
      const outDir = path.resolve(server.config.root, server.config.build.outDir)
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0]
        if (url !== '/' && !path.extname(url)) {
          const clean = url.replace(/\/$/, '')
          if (existsSync(path.join(outDir, clean, 'index.html'))) {
            req.url = `${clean}/index.html`
          }
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderedPreview()],
})
