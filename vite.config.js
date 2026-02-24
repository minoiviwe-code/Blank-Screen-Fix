import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  server: {
    port: 9000,
    strictPort: true,
    host: true, // Needed for Cloud Workstation mapping
    allowedHosts: ['all'], 
    hmr: {
      clientPort: 443, // Forces HMR to use the secure proxy port
    },
  },
});
