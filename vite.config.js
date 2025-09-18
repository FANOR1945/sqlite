import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // escucha en todas las interfaces
    port: 5173,
    allowedHosts: [
      '5173.homidominio.ddns.net',
      'homidominio.ddns.net',
      'gain-daniel-ron-rna.trycloudflare.com',
      'http://localhost:8080/proxy/5173/',
      'localhost',
    ],
  },
});
