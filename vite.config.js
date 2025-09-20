import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002, // Puerto de tu servidor
    host: '0.0.0.0', // Para escuchar en todas las interfaces de red
    allowedHosts: [
      '5173.homidominio.ddns.net',
      'homidominio.ddns.net',
      'rapidly-unique-fonts-substitute.trycloudflare.com',
      'localhost',
    ],
  },
});
