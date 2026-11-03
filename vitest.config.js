import { transformWithOxc } from 'vite';
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [
    {
      name: 'jsx-in-data-module',
      enforce: 'pre',
      async transform(code, id) {
        if (id.endsWith('/data.js') || id.endsWith('/app/page.js')) {
          return transformWithOxc(code, id.replace(/\.js$/, '.jsx'), {
            jsx: {
              runtime: 'automatic',
            },
          });
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./components/__tests__/setup.js'],
  },
});
