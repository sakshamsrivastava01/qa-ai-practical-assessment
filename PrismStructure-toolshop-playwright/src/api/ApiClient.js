// src/api/ApiClient.js
// Thin wrapper around Playwright's APIRequestContext so specs read like
// business steps ("register", "login", "createCart") instead of raw fetch calls.

const ENDPOINTS = require('./endpoints');

class ApiClient {
  /**
   * @param {import('@playwright/test').APIRequestContext} request
   */
  constructor(request) {
    this.request = request;
    this.token = null;
  }

  authHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async register(user) {
    return this.request.post(ENDPOINTS.users.register, { data: user });
  }

  async login(email, password) {
    const res = await this.request.post(ENDPOINTS.users.login, {
      data: { email, password },
    });
    if (res.ok()) {
      const body = await res.json();
      this.token = body.access_token;
    }
    return res;
  }

  async me() {
    return this.request.get(ENDPOINTS.users.me, { headers: this.authHeaders() });
  }

  async getProducts(params = {}) {
    return this.request.get(ENDPOINTS.products.base, { params, headers: this.authHeaders() });
  }

  async searchProducts(q) {
    return this.request.get(ENDPOINTS.products.search, { params: { q }, headers: this.authHeaders() });
  }

  async createCart() {
    return this.request.post(ENDPOINTS.carts.base, { headers: this.authHeaders() });
  }

  async addItemToCart(cartId, productId, quantity = 1) {
    return this.request.post(ENDPOINTS.carts.item(cartId), {
      data: { product_id: productId, quantity },
      headers: this.authHeaders(),
    });
  }

  async updateCartQuantity(cartId, productId, quantity) {
    return this.request.put(ENDPOINTS.carts.quantity(cartId), {
      data: { product_id: productId, quantity },
      headers: this.authHeaders(),
    });
  }

  async getCart(cartId) {
    return this.request.get(ENDPOINTS.carts.byId(cartId), { headers: this.authHeaders() });
  }

  async removeCartItem(cartId, productId) {
    return this.request.delete(ENDPOINTS.carts.product(cartId, productId), {
      headers: this.authHeaders(),
    });
  }

  async createInvoice(payload) {
    return this.request.post(ENDPOINTS.invoices.base, {
      data: payload,
      headers: this.authHeaders(),
    });
  }

  async getInvoices(page = 1) {
    return this.request.get(ENDPOINTS.invoices.base, {
      params: { page },
      headers: this.authHeaders(),
    });
  }

  async getInvoice(invoiceId) {
    return this.request.get(ENDPOINTS.invoices.byId(invoiceId), { headers: this.authHeaders() });
  }
}

module.exports = { ApiClient };
