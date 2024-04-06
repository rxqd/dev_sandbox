import { defineConfig } from 'vite';
import path from 'path';

import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    host: '0.0.0.0',
    port: 8910
  },
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'), 
        },
      },
})