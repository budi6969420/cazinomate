import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'ng serve', // Start Angular automatically
    port: 4200,
    timeout: 120 * 1000, // 2 minutes to allow startup
    reuseExistingServer: true, // Don't restart if already running
  },
  use: {
    browserName: 'chromium',
    headless: true,
    baseURL: 'http://localhost:4200',
  },
});
