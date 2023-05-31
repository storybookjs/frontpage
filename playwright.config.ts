/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'src/e2e-tests',
  use: {
    baseURL: 'http://localhost:8000',
  },
});
