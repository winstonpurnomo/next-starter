import tailwindCss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsConfigPaths(), tailwindCss(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    browser: {
      enabled: true,
      provider: 'playwright',
      // https://vitest.dev/guide/browser/playwright
      instances: [{ browser: 'chromium' }],
    },
    css: true,
  },
});
