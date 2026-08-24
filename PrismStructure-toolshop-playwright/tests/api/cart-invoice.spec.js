// tests/api/cart-invoice.spec.js
// AC2 (API): Product Selection & Invoice Generation
// Retrieve products -> add to cart -> verify cart contents -> generate an
// invoice with customer + order details (Cash on Delivery), per the payload
// documented in the assessment brief.
const { test, expect } = require('@playwright/test');
const { ApiClient } = require('../../src/api/ApiClient');
const { billingDetails } = require('../../src/utils/dataGenerator');
const seeded = require('../../test-data/users.json');

test.describe('API AC2 - Product Selection & Invoice Generation @api', () => {
  let client;
  let cartId;
  let productId;

  test.beforeEach(async ({ request }) => {
    client = new ApiClient(request);
    const { email, password } = seeded.seededUsers.customer2;
    await client.login(email, password);

    const productsRes = await client.getProducts({ page: 1 });
    const products = (await productsRes.json()).data;
    productId = products[0].id;

    const cartRes = await client.createCart();
    cartId = (await cartRes.json()).id;
  });

  test('TC-API-07 authenticated user can retrieve the product catalog @smoke @regression', async () => {
    const res = await client.getProducts({ page: 1 });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body.data)).toBeTruthy();
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('TC-API-08 user can add a product to the cart and verify contents @smoke @regression', async () => {
    const addRes = await client.addItemToCart(cartId, productId, 1);
    expect(addRes.status()).toBe(200);

    const cartRes = await client.getCart(cartId);
    expect(cartRes.status()).toBe(200);
    const cart = await cartRes.json();
    const line = cart.cart_items.find((i) => i.product_id === productId);
    expect(line).toBeTruthy();
    expect(line.quantity).toBe(1);
  });

  test('TC-API-10 user can generate an invoice with Cash on Delivery @smoke @regression', async () => {
    await client.addItemToCart(cartId, productId, 2);

    const payload = billingDetails({ cart_id: cartId });
    const res = await client.createInvoice(payload);

    expect(res.status()).toBe(200);
    const invoice = await res.json();
    expect(invoice).toHaveProperty('invoice_number');
    expect(invoice.status).toBeTruthy();

    const fetchRes = await client.getInvoice(invoice.id);
    expect(fetchRes.status()).toBe(200);
  });

  test('TC-API-11 invoice generation fails when cart_id is missing (negative) @regression', async () => {
    const payload = billingDetails({ cart_id: undefined });
    delete payload.cart_id;

    const res = await client.createInvoice(payload);

    expect(res.status()).toBe(422);
  });
});
