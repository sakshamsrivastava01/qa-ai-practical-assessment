// src/pages/InvoicesPage.js
const { BasePage } = require('./BasePage');

class InvoicesPage extends BasePage {
  constructor(page) {
    super(page);
    this.invoiceRows = page.locator('table tbody tr');
  }

  async open() {
    await this.goto('/account/invoices');
  }

  rowByInvoiceNumber(invoiceNumber) {
    return this.page.locator('tr', { hasText: invoiceNumber });
  }
}

module.exports = { InvoicesPage };
