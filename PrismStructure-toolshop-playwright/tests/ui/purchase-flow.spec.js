// tests/ui/purchase-flow.spec.js
// AC2: End-to-End Purchase Flow
// Browse -> add multiple items (incl. quantity update) -> checkout via Cash on
// Delivery -> confirm twice (documented app quirk) -> verify invoice under
// "My Invoices".
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/pages/LoginPage');
const { HomePage } = require('../../src/pages/HomePage');
const { ProductPage } = require('../../src/pages/ProductPage');
const { CartPage } = require('../../src/pages/CartPage');
const { CheckoutPage } = require('../../src/pages/CheckoutPage');
const { InvoicesPage } = require('../../src/pages/InvoicesPage');
const { newUser } = require('../../src/utils/dataGenerator');
const seeded = require('../../test-data/users.json');

test.describe('AC2 - End-to-End Purchase Flow @ui', () => {
  test('TC-UI-07 user can browse, add multiple items and update quantity in cart @smoke @regression', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    const firstProductName = await homePage.productCards.first().innerText();
    await homePage.productCards.first().click();
    await productPage.addToCart();

    await homePage.open();
    const secondProductName = await homePage.productCards.nth(1).innerText();
    await homePage.productCards.nth(1).click();
    await productPage.setQuantity(2);
    await productPage.addToCart();

    await homePage.openCart();
    await expect(cartPage.rowQuantityInput(secondProductName)).toHaveValue('2');
    await expect(cartPage.rowByProductName(firstProductName)).toBeVisible();
  });

  test('TC-UI-08 user can complete checkout via Cash on Delivery and view invoice @smoke @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const invoicesPage = new InvoicesPage(page);
    const { email, password } = seeded.seededUsers.customer2;
    const billingAddress = newUser().address;

    await homePage.open();
    await homePage.productCards.first().click();
    await productPage.addToCart();

    await homePage.openCart();
    await cartPage.proceedToCheckout();

    await loginPage.login(email, password);
    await checkoutPage.loginProceedBtn.click();
    await checkoutPage.fillAddress(billingAddress);
    await checkoutPage.selectPaymentMethod('Cash on Delivery');

    // Documented quirk: confirm must be pressed twice for the invoice to
    // actually be generated on the deployed environment.
    await checkoutPage.confirmOrderTwice();

    await expect(checkoutPage.orderConfirmation).toBeVisible();
    const invoiceNumber = await checkoutPage.getInvoiceNumber();

    await invoicesPage.open();
    await invoicesPage.searchInvoice(invoiceNumber);
    await expect(invoicesPage.rowByInvoiceNumber(invoiceNumber)).toBeVisible();
  });

  test('TC-UI-09 user can remove an item from the cart before checkout @regression', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await homePage.open();
    const productName = await homePage.productCards.first().innerText();
    await homePage.productCards.first().click();
    await productPage.addToCart();

    await homePage.openCart();
    await cartPage.removeButton(productName).click();

    await expect(cartPage.emptyCartMessage).toBeVisible();
  });
});
