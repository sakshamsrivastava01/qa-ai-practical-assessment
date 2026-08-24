// src/utils/dataGenerator.js
// Generates realistic, unique test data using @faker-js/faker so UI and API
// tests never collide on a previously-registered email address.

const { faker } = require('@faker-js/faker');

function uniqueEmail() {
  return `qa.${Date.now()}.${faker.string.alphanumeric(6).toLowerCase()}@mailinator.com`;
}

function newUser(overrides = {}) {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      country: 'Germany',
      postal_code: faker.location.zipCode('#####'),
      house_number: faker.string.numeric({ length: { min: 1, max: 3 } }),
    },
    phone: faker.string.numeric(10),
    dob: '1996-05-14',
    password: `Qa!7${faker.string.alphanumeric(16)}`,
    email: uniqueEmail(),
    ...overrides,
  };
}

function billingDetails(overrides = {}) {
  return {
    billing_street: 'Test Street 1',
    billing_city: 'Heidenheim an der Brenz',
    billing_state: 'Rheinland-Pfalz',
    billing_country: 'DE',
    billing_postal_code: '10115',
    payment_method: 'cash-on-delivery',
    payment_details: {},
    ...overrides,
  };
}

module.exports = { uniqueEmail, newUser, billingDetails };
