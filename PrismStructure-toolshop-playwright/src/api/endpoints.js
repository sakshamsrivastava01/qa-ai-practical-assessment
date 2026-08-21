// src/api/endpoints.js
// Single source of truth for Toolshop API paths.
// Source: https://api.practicesoftwaretesting.com/api/documentation (Toolshop API v5.0.0)

module.exports = {
  users: {
    register: '/users/register',
    login: '/users/login',
    me: '/users/me',
  },
  products: {
    base: '/products',
    search: '/products/search',
    byId: (id) => `/products/${id}`,
  },
  carts: {
    base: '/carts',
    byId: (cartId) => `/carts/${cartId}`,
    item: (cartId) => `/carts/${cartId}`, // POST adds/updates an item
    quantity: (cartId) => `/carts/${cartId}/product/quantity`,
    product: (cartId, productId) => `/carts/${cartId}/product/${productId}`,
  },
  invoices: {
    base: '/invoices',
    byId: (invoiceId) => `/invoices/${invoiceId}`,
    search: '/invoices/search',
  },
};
