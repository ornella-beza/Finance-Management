import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    loader: 'js',
    include: /\.js$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'js'
      }
    }
  }
});
