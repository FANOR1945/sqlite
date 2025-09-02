import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto hace que Vite escuche en 0.0.0.0
    port: 5173, // Puedes especificar el puerto
    strictPort: false,
    allowedHosts: [
      '5173.homidominio.ddns.net',
      'homidominio.ddns.net',
      'restaurant-logical-tremendous-foundations.trycloudflare.com',
      'localhost',
    ]
  }
})
