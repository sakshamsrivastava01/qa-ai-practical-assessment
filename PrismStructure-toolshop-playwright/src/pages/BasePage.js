// src/pages/BasePage.js
class BasePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async toastMessage() {
    return this.page.locator('.toast-message, .Toastify__toast-body').first();
  }
}

module.exports = { BasePage };
