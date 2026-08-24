// tests/ui/auth.spec.js
// AC1: User Registration & Login
// Covers: successful registration, successful login with registered
// credentials, profile verification, and negative login attempts.
const { test, expect, request: apiRequest } = require('@playwright/test');
const { ApiClient } = require('../../src/api/ApiClient');
const { RegisterPage } = require('../../src/pages/RegisterPage');
const { LoginPage } = require('../../src/pages/LoginPage');
const { HomePage } = require('../../src/pages/HomePage');
const { newUser } = require('../../src/utils/dataGenerator');
const seeded = require('../../test-data/users.json');

test.describe('AC1 - User Registration & Login @ui', () => {
  test('TC-UI-01 new user can register with valid details @smoke @regression', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = newUser();

    await registerPage.open();
    await registerPage.register(user);

    // Toolshop signals successful registration by redirecting to the login page.
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('TC-UI-02 registration fails with duplicate / already-used email @regression', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = newUser({ email: seeded.seededUsers.customer1.email });

    await registerPage.open();
    await registerPage.register(user);

    await expect(registerPage.errors.first()).toBeVisible();
  });

  test('TC-UI-03 registered user can log in with valid credentials @smoke @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const { email, password } = seeded.seededUsers.customer2;

    await loginPage.open();
    await loginPage.login(email, password);

    await expect(page).toHaveURL(/\/account\/?$/);
  });

  test('TC-UI-04 login fails with an incorrect password @smoke @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = newUser();
    const apiContext = await apiRequest.newContext({
      baseURL: process.env.API_BASE_URL || 'https://api.practicesoftwaretesting.com',
    });
    const client = new ApiClient(apiContext);

    const registration = await client.register(user);
    expect(registration.status()).toBe(201);
    await apiContext.dispose();

    await loginPage.open();
    await loginPage.login(user.email, 'WrongPassword123');

    await expect(loginPage.error).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('TC-UI-05 logged-in user can view and verify their profile information @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const { email, password } = seeded.seededUsers.customer2;

    await loginPage.open();
    await loginPage.login(email, password);
    await homePage.accountMenu.click();
    await homePage.myProfileLink.click();

    await expect(page).toHaveURL(/\/account\/profile/);
    await expect(page.locator('[data-test="email"]')).toHaveValue(email);
  });

  // TC-UI-06 (sign-out) is covered as a manual test case in
  // FunctionalTestCase.csv rather than automated, to stay within the
  // 5-8 automated-cases-per-type limit set for this assessment.
});
