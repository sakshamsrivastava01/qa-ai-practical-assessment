# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api\auth.spec.js >> API AC1 - Authentication & Cart Creation @api >> TC-API-06 authenticated user can create a new cart @smoke @regression
- Location: tests\api\auth.spec.js:42:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 500
```

# Test source

```ts
  1  | // tests/api/auth.spec.js
  2  | // AC1 (API): User Authentication & Cart Creation
  3  | // Register -> login -> obtain bearer token -> create a new cart.
  4  | const { test, expect } = require('@playwright/test');
  5  | const { ApiClient } = require('../../src/api/ApiClient');
  6  | const { newUser } = require('../../src/utils/dataGenerator');
  7  | const seeded = require('../../test-data/users.json');
  8  | 
  9  | test.describe('API AC1 - Authentication & Cart Creation @api', () => {
  10 |   test('TC-API-01 new user can register successfully @smoke @regression', async ({ request }) => {
  11 |     const client = new ApiClient(request);
  12 |     const user = newUser();
  13 | 
  14 |     const res = await client.register(user);
  15 | 
  16 |     expect(res.status()).toBe(201);
  17 |     const body = await res.json();
  18 |     expect(body).toHaveProperty('id');
  19 |     expect(body.email).toBe(user.email);
  20 |   });
  21 | 
  22 |   test('TC-API-03 valid credentials return a bearer token @smoke @regression', async ({ request }) => {
  23 |     const client = new ApiClient(request);
  24 |     const { email, password } = seeded.seededUsers.customer1;
  25 | 
  26 |     const res = await client.login(email, password);
  27 | 
  28 |     expect(res.status()).toBe(200);
  29 |     const body = await res.json();
  30 |     expect(body.access_token).toBeTruthy();
  31 |     expect(body.token_type).toBe('bearer');
  32 |   });
  33 | 
  34 |   test('TC-API-04 login is rejected for invalid credentials @smoke @regression', async ({ request }) => {
  35 |     const client = new ApiClient(request);
  36 | 
  37 |     const res = await client.login('customer@practicesoftwaretesting.com', 'wrongPass123');
  38 | 
  39 |     expect(res.status()).toBe(401);
  40 |   });
  41 | 
  42 |   test('TC-API-06 authenticated user can create a new cart @smoke @regression', async ({ request }) => {
  43 |     const client = new ApiClient(request);
  44 |     const { email, password } = seeded.seededUsers.customer1;
  45 |     await client.login(email, password);
  46 | 
  47 |     const res = await client.createCart();
  48 | 
> 49 |     expect(res.status()).toBe(201);
     |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  50 |     const body = await res.json();
  51 |     expect(body).toHaveProperty('id');
  52 |   });
  53 | });
  54 | 
```