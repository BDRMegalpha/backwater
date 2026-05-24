import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'node:child_process'

function safeExec(cmd, fallback = 'unknown') {
  try { return execSync(cmd, { encoding: 'utf8' }).trim() || fallback }
  catch { return fallback }
}

const BUILD_SHA = safeExec('git rev-parse --short HEAD')
const BUILD_AT = new Date().toISOString()

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_BUILD_SHA': JSON.stringify(BUILD_SHA),
    'import.meta.env.VITE_BUILD_AT':  JSON.stringify(BUILD_AT),
  },
})
