import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@shared', replacement: path.resolve(__dirname, 'src/shared') },
      { find: '@user', replacement: path.resolve(__dirname, 'src/user') },
      { find: '@places', replacement: path.resolve(__dirname, 'src/places') }
    ]
  }
});
