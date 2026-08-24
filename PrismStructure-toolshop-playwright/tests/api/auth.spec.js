// tests/api/auth.spec.js
// AC1 (API): User Authentication & Cart Creation
// Register -> login -> obtain bearer token -> create a new cart.
const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../src/api/ApiClient');
const { newUser } = require('../../src/utils/dataGenerator');
const seeded = require('../../test-data/users.json');

test.describe('API AC1 - Authentication & Cart Creation @api', () => {
  test('TC-API-01 new user can register successfully @smoke @regression', async ({ request }) => {
    const client = new ApiClient(request);
    const user = newUser();

    const res = await client.register(user);

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(body.email).toBe(user.email);
  });

  test('TC-API-03 valid credentials return a bearer token @smoke @regression', async ({ request }) => {
    const client = new ApiClient(request);
    const { email, password } = seeded.seededUsers.customer2;

    const res = await client.login(email, password);

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.access_token).toBeTruthy();
    expect(body.token_type).toBe('bearer');
  });

  test('TC-API-04 login is rejected for invalid credentials @smoke @regression', async ({ request }) => {
    const client = new ApiClient(request);
    const user = newUser();
    await client.register(user);

    const res = await client.login(user.email, 'WrongPassword123');

    expect(res.status()).toBe(401);
  });

  test('TC-API-06 authenticated user can create a new cart @smoke @regression', async ({ request }) => {
    const client = new ApiClient(request);
    const { email, password } = seeded.seededUsers.customer2;
    await client.login(email, password);

    const res = await client.createCart();

    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty('id');
  });
});
