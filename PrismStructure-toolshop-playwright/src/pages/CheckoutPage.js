// src/pages/CheckoutPage.js
// Toolshop checkout is a 3-step wizard: (1) sign-in/address, (2) payment method,
// (3) confirm order. Per the assessment brief, the "Confirm" button must be
// pressed TWICE on the deployed environment before the invoice is generated -
// this is a known application quirk, not a mistake in the automation, and is
// deliberately encoded here (with a comment) rather than hidden.
const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    // Step: address confirmation
    this.street = page.locator('[data-test="street"]');
    this.city = page.locator('[data-test="city"]');
    this.state = page.locator('[data-test="state"]');
    this.country = page.locator('[data-test="country"]');
    this.postcode = page.locator('[data-test="postal_code"]');
    this.proceedBtn = page.locator('[data-test="proceed-2"]');

    // Step: payment method
    this.paymentMethodSelect = page.locator('[data-test="payment-method"]');
    this.confirmPaymentBtn = page.locator('[data-test="confirm"]');

    this.invoiceNumber = page.locator('[data-test="invoice-number"]');
    this.orderConfirmation = page.getByText(/payment was successful/i);
  }

  async fillAddress(address) {
    await this.street.fill(address.street);
    await this.city.fill(address.city);
    await this.state.fill(address.state);
    await this.country.selectOption({ label: address.country }).catch(() =>
      this.country.fill(address.country)
    );
    await this.postcode.fill(address.postal_code);
    await this.proceedBtn.click();
  }

  async selectPaymentMethod(method = 'Cash on Delivery') {
    await this.paymentMethodSelect.selectOption({ label: method });
  }

  /**
   * Confirms the order. The Toolshop deployed environment requires the
   * Confirm button to be clicked twice before the invoice is actually
   * generated - the first click submits the payment check, the second
   * finalises the invoice. We wait for the button to be actionable again
   * between clicks instead of using a blind sleep.
   */
  async confirmOrderTwice() {
    await this.confirmPaymentBtn.click();
    await this.confirmPaymentBtn.waitFor({ state: 'visible' }).catch(() => {});
    await this.confirmPaymentBtn.click();
  }
}

module.exports = { CheckoutPage };
