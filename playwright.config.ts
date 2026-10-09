import { defineConfig, devices } from '@playwright/test';

const port = 4398;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${port}`,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Desktop Chrome'], viewport: { width: 390, height: 844 }, hasTouch: true } },
  ],
  webServer: {
    command: `pnpm build && pnpm preview --port ${port} --ignore-lock`,
    url: `http://localhost:${port}/fr/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
