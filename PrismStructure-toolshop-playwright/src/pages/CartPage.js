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

  rowByProductName(productName) {
    const escapedName = productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return this.page.locator('tr').filter({
      has: this.page.locator('[data-test="product-title"]', {
        hasText: new RegExp(`^${escapedName}\\s*$`),
      }),
    });
  }

  rowQuantityInput(productName) {
    return this.rowByProductName(productName).locator('[data-test="product-quantity"]');
  }

  removeButton(productName) {
    // The live cart's remove anchor has no data-test attribute.
    return this.rowByProductName(productName).locator('a');
  }

  async removeProduct(productName) {
    await Promise.all([
      this.page.waitForResponse((response) => {
        const path = new URL(response.url()).pathname;
        return response.request().method() === 'DELETE'
          && /\/carts\/[^/]+\/product\/[^/]+$/.test(path)
          && response.ok();
      }),
      this.removeButton(productName).click(),
    ]);
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutBtn.click();
  }
}

module.exports = { CartPage };
