import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

const cachedChromium = '/Users/jeffry/Library/Caches/ms-playwright/chromium-1248/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  timeout: 30_000,
  expect: { timeout: 8_000 },
  reporter: [['list']],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:4321',
    browserName: 'chromium',
    launchOptions: existsSync(cachedChromium) ? { executablePath: cachedChromium } : {},
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', grep: /@desktop/, use: { viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' } },
    { name: 'mobile-reduced-motion', grep: /@mobile/, use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium', viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' } },
    { name: 'no-javascript', grep: /@nojs/, use: { viewport: { width: 1280, height: 900 }, javaScriptEnabled: false } },
  ],
});
