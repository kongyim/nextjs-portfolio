import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './tests', use: { baseURL: 'http://127.0.0.1:3100', headless: true, launchOptions: { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } }, webServer: { command: 'node scripts/serve.mjs', port: 3100, reuseExistingServer: false } });
