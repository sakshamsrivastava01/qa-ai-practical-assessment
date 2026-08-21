# AI Prompts – Test Data

(Prompts used to generate test data for UI + API.)

---

### Entry 1
- **Prompt:** "Write a small faker-based helper that generates a unique
  Toolshop registration user object every call, so parallel/re-runs never hit
  a duplicate-email error. Fields: first_name, last_name, address
  (street/city/state/country/postal_code), phone, dob, email, password."
- **AI Response Summary:** Produced `newUser()` using `@faker-js/faker`, with
  a timestamp + random-suffix email generator.
- **Validation Notes:** Fixed `dob` to a static valid value instead of a
  fully random date, since the registration form likely enforces a minimum
  age / valid date range and a random faker DOB could occasionally violate
  that — safer to keep this one field deterministic.

### Entry 2
- **Prompt:** "Build a billing/payload helper matching this exact invoice
  request body [pasted the example JSON from the assessment brief], with
  overridable fields for cart_id."
- **AI Response Summary:** Produced `billingDetails()` matching the given
  schema (billing_street, billing_city, billing_state, billing_country,
  billing_postal_code, payment_method, cart_id, payment_details).
- **Validation Notes:** Kept the payload shape identical to the brief's
  example rather than letting AI invent extra fields, so the negative test
  (`TC-API-11`, missing cart_id) is testing a real required field, not a
  fabricated one.

### Entry 3
- **Prompt:** "What default/seeded accounts does the Toolshop demo app
  document for testing without registering a new user each time?"
- **AI Response Summary:** Referenced the publicly documented seeded users:
  admin, customer (user 1), and customer2 (user 2), all with password
  `welcome01`.
- **Validation Notes:** Used these only for login-focused cases where
  identity doesn't need to be fresh; kept them out of destructive flows
  (e.g. never used for the checkout tests that create invoices) to avoid
  polluting a shared account other test-takers may also be using.
