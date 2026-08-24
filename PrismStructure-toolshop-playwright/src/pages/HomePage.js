// src/pages/HomePage.js
const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchBtn = page.locator('[data-test="search-submit"]');
    this.searchResetBtn = page.locator('[data-test="search-reset"]');
    this.productCards = page.locator('[data-test="product-name"]');
    this.cartIcon = page.locator('[data-test="nav-cart"]');
    this.accountMenu = page.locator('[data-test="nav-menu"]');
    this.signOutLink = page.locator('[data-test="nav-sign-out"]');
    this.myInvoicesLink = page.locator('[data-test="nav-my-invoices"]');
    this.myProfileLink = page.locator('[data-test="nav-my-profile"]');
  }

  async open() {
    await this.goto('/');
  }

  async searchProduct(term) {
    await this.searchInput.fill(term);
    await this.searchBtn.click();
  }

  async openProductByName(name) {
    await this.page.locator('[data-test="product-name"]', { hasText: name }).first().click();
  }

  async openCart() {
    await this.cartIcon.click();
  }
}

module.exports = { HomePage };
