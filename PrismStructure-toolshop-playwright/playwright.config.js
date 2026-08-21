// playwright.config.js
// Prism Structure - Toolshop QA Automation
// Central config for UI + API projects, reporting and environment.

const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

const UI_BASE_URL = process.env.UI_BASE_URL || 'https://practicesoftwaretesting.com';
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.practicesoftwaretesting.com';

module.exports = defineConfig({
  testDir: './tests',
  timeout: 45 * 1000,
  expect: { timeout: 8 * 1000 },
  fullyParallel: false, // API tests share cart/invoice state - keep deterministic
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'execution-evidence/html-report', open: 'never' }],
    ['json', { outputFile: 'execution-evidence/results.json' }],
    ['junit', { outputFile: 'execution-evidence/junit-results.xml' }],
  ],

  use: {
    baseURL: UI_BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10 * 1000,
  },

  projects: [
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: UI_BASE_URL },
    },
    {
      name: 'api',
      testDir: './tests/api',
      use: { baseURL: API_BASE_URL },
    },
  ],
});
