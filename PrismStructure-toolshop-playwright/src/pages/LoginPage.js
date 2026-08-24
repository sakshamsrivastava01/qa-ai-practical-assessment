// src/pages/LoginPage.js
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.submitBtn = page.locator('[data-test="login-submit"]');
    this.error = page.locator('[data-test="login-error"]');
  }

  async open() {
    await this.goto('/auth/login');
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.submitBtn.click();
  }

  async establishSession(token) {
    await this.page.addInitScript((authToken) => {
      window.localStorage.setItem('auth-token', authToken);
    }, token);
  }
}

module.exports = { LoginPage };
