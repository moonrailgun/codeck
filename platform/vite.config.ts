import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {},
  },
  build: {
    outDir: '../website/static/playground',
  },
  clearScreen: false,
  base: './',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }], // 设置别名
  },
});
