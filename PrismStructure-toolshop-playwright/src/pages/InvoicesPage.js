// src/pages/InvoicesPage.js
const { BasePage } = require('./BasePage');

class InvoicesPage extends BasePage {
  constructor(page) {
    super(page);
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchBtn = page.locator('[data-test="search-submit"]');
    this.invoiceRows = page.locator('table tbody tr');
  }

  async open() {
    await this.goto('/account/invoices');
  }

  rowByInvoiceNumber(invoiceNumber) {
    return this.page.locator('tr', { hasText: invoiceNumber });
  }

  async searchInvoice(term) {
    await this.searchInput.fill(term);
    await this.searchBtn.click();
  }
}

module.exports = { InvoicesPage };
