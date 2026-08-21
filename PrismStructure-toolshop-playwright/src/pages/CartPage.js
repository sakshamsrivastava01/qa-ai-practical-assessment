// src/pages/CartPage.js
const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartRows = page.locator('[data-test="product-line"], table.table tbody tr');
    this.proceedToCheckoutBtn = page.locator('[data-test="proceed-1"]');
    this.cartTotal = page.locator('[data-test="cart-total"]');
    this.emptyCartMessage = page.getByText(/cart is empty/i);
  }

  rowQuantityInput(productName) {
    return this.page
      .locator('tr', { hasText: productName })
      .locator('[data-test="quantity"]');
  }

  removeButton(productName) {
    return this.page.locator('tr', { hasText: productName }).locator('[data-test="remove"]');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }
}

module.exports = { CartPage };
