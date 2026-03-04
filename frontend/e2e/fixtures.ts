import { test as base, expect, type Page } from '@playwright/test';

/**
 * Dedicated E2E test-user credentials.
 * No real backend user is required — all auth is mocked.
 */
export const E2E_USER = {
  email: 'e2e@tenndalux.com',
  password: 'e2e123456',
  firstName: 'Test',
  lastName: 'User',
  fullName: 'Test User',
};

const FAKE_TOKEN = 'fake-e2e-jwt-token-for-testing';

/**
 * Mock the login API endpoint so it returns a fake token without hitting the backend.
 */
export async function mockLoginApi(page: Page) {
  await page.route('**/api/auth/login/', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        tokens: { access: FAKE_TOKEN, refresh: 'fake-e2e-refresh-token' },
        user: {
          id: 999,
          email: E2E_USER.email,
          first_name: E2E_USER.firstName,
          last_name: E2E_USER.lastName,
          role: 'customer',
        },
      }),
    });
  });
}

/**
 * Mock the captcha site-key endpoint to return 404, disabling captcha in E2E tests.
 */
export async function mockCaptchaSiteKey(page: Page) {
  await page.route('**/api/google-captcha/site-key/', async (route) => {
    await route.fulfill({ status: 404, body: '' });
  });
}

/**
 * Mock the auth profile endpoint for hydration.
 */
export async function mockAuthProfile(page: Page) {
  await page.route('**/api/auth/profile/', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: { id: 999, email: E2E_USER.email, role: 'customer' },
      }),
    });
  });
}

/**
 * Setup default API mocks for common endpoints.
 */
export async function setupDefaultApiMocks(page: Page) {
  await mockCaptchaSiteKey(page);
  await mockAuthProfile(page);
}

/**
 * Inject auth cookies directly — for tests that need an authenticated state.
 */
export async function mockLoginAsTestUser(page: Page) {
  await mockLoginApi(page);
  await setupDefaultApiMocks(page);
  await page.context().addCookies([
    { name: 'app_token', value: FAKE_TOKEN, domain: 'localhost', path: '/' },
  ]);
  await page.goto('/dashboard');
}

export const test = base;
export { expect };
