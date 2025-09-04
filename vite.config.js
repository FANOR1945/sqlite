import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '5173.homidominio.ddns.net', // Agrega tu host aquí
      'homidominio.ddns.net',
      'retail-trained-seventh-sound.trycloudflare.com',      // También podrías necesitar el dominio sin el puerto
      'localhost',                 // Para mantener el acceso local
    ]
  }
})