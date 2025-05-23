import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'ng serve',
    port: 4200,
    timeout: 120 * 1000,
    reuseExistingServer: true,
  },
  use: {
    browserName: 'chromium',
    headless: true,
    baseURL: 'http://localhost:4200',
  },
});
