// src/pages/RegisterPage.js
// Toolshop registration form. Selectors follow the app's `data-test` attribute
// convention, which is the most stable locator strategy for this SUT.
const { BasePage } = require('./BasePage');

class RegisterPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.dob = page.locator('[data-test="dob"]');
    this.street = page.locator('[data-test="street"]');
    this.postcode = page.locator('[data-test="postal_code"]');
    this.city = page.locator('[data-test="city"]');
    this.state = page.locator('[data-test="state"]');
    this.country = page.locator('[data-test="country"]');
    this.phone = page.locator('[data-test="phone"]');
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.submitBtn = page.locator('[data-test="register-submit"]');
    this.errors = page.locator('.invalid-feedback, .alert-danger');
  }

  async open() {
    await this.goto('/auth/register');
  }

  async register(user) {
    await this.firstName.fill(user.first_name);
    await this.lastName.fill(user.last_name);
    await this.dob.fill(user.dob);
    await this.street.fill(user.address.street);
    await this.postcode.fill(user.address.postal_code);
    await this.city.fill(user.address.city);
    await this.state.fill(user.address.state);
    await this.country.selectOption({ label: user.address.country }).catch(() =>
      this.country.fill(user.address.country)
    );
    await this.phone.fill(user.phone);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.submitBtn.click();
  }
}

module.exports = { RegisterPage };
