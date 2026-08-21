// src/pages/ProductPage.js
const { BasePage } = require('./BasePage');

class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.productName = page.locator('[data-test="product-name"]');
    this.productPrice = page.locator('[data-test="unit-price"]');
    this.quantityInput = page.locator('[data-test="quantity"]');
    this.decreaseQtyBtn = page.locator('[data-test="decrease-quantity"]');
    this.increaseQtyBtn = page.locator('[data-test="increase-quantity"]');
    this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
    this.outOfStockBtn = page.locator('[data-test="out-of-stock"]');
  }

  async setQuantity(qty) {
    await this.quantityInput.fill(String(qty));
  }

  async addToCart() {
    await this.addToCartBtn.click();
  }
}

module.exports = { ProductPage };
