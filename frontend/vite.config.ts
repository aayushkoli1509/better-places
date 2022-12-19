import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      {
        find: '@types',
        replacement: path.resolve(__dirname, 'src/types')
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/hooks')
      },
      {
        find: '@context',
        replacement: path.resolve(__dirname, 'src/context')
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/styles')
      }
    ]
  }
});
