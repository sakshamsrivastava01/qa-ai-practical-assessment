# AI Prompts – Automation and Debugging

(Prompts used for automation structure, assertions, and analyzing failures/logs.)

---

### Entry 1
- **Prompt:** "Scaffold a Prism-style Playwright structure: src/pages,
  src/api, src/utils, tests/ui, tests/api, plus a playwright.config.js with
  separate ui-chromium and api projects and HTML+JSON+JUnit reporters writing
  to execution-evidence/."
- **AI Response Summary:** Generated the folder layout and a config with two
  `projects` (one per layer), each pointed at its own `baseURL`.
- **Validation Notes:** Confirmed with `npx playwright test --list` that both
  projects pick up the right spec files from `testDir`, and that base URLs
  don't leak between UI and API projects.

### Entry 2
- **Prompt:** "Write an ApiClient class wrapping Playwright's request
  context for register/login/products/carts/invoices, storing the bearer
  token after login and attaching it to subsequent calls."
- **AI Response Summary:** Produced `ApiClient` with a `token` field set in
  `login()` and an `authHeaders()` helper used by every authenticated method.
- **Validation Notes:** Confirmed the token field name assumption
  (`access_token`) against the Swagger schema description before relying on
  it in assertions, and left a comment flagging it as the first thing to
  re-check on the first real execution against the live API, since exact
  response field names are the most likely source of first-run failures for
  AI-generated API clients.

### Entry 3
- **Prompt:** "The brief says the deployed Toolshop checkout needs 'Confirm'
  pressed twice before the invoice is actually generated. How should I model
  that in a Page Object so it's clearly intentional and not read as a bug or
  flaky retry?"
- **AI Response Summary:** Suggested a dedicated `confirmOrderTwice()` method
  with an inline comment explaining the quirk, rather than a generic retry
  wrapper, so the intent is visible in code review and the behaviour is
  isolated to one place if the app is later fixed.
- **Debugging Outcome:** Adopted as-is — this is exactly the kind of
  "encode the known quirk, don't hide it" pattern the assessment's own
  hint calls out, and keeping it isolated means a future single-click fix on
  the app only requires touching one method.

### Entry 4 — Environment limitation encountered during this exercise
- **Prompt:** "I'm running Playwright inside a sandboxed environment whose
  outbound network is restricted to package registries only —
  practicesoftwaretesting.com and its API are not reachable from here. What's
  the right way to document that instead of faking execution evidence?"
- **AI Response Summary:** Recommended: (1) verify all specs statically with
  `--list` so structural/syntax correctness is confirmed, (2) clearly label
  any execution report as "not yet run against the live SUT", (3) give exact
  commands so the real run happens locally/in CI where network access is
  available, and never fabricate a "Passed" report for tests that weren't
  actually executed.
- **Debugging Outcome:** Followed exactly this approach — see
  `execution-evidence/README.md` for the honest status and the commands to
  produce real evidence.

### Entry 5
- Prompt: Run TC-UI-01 against the live application, inspect the real form, and fix only the broken registration locator or logic.
- AI Response Summary: Found a newly required house-number field, a rejected static password, and an assertion for a success banner the live application does not render.
- Debugging Outcome: Added the `data-test="house_number"` locator and generated value, generated a unique policy-compliant password, and asserted the actual successful redirect to `/auth/login`; the isolated test then passed.

### Entry 6
- Prompt: Run TC-UI-03 against the live application, compare the account selectors, and fix only the failing login assertion.
- AI Response Summary: Confirmed `data-test="nav-menu"` is the visible dropdown button and `nav-my-account` is a hidden child; Cloudflare then intercepted the redirected account page before Angular rendered either element.
- Debugging Outcome: Corrected `HomePage.accountMenu` to `nav-menu` and verified successful login with the precise `/account` redirect; the isolated test passed.

### Entry 7
- Prompt: Run TC-UI-07 against the live application, inspect the product and cart elements, and fix only the broken cart flow.
- AI Response Summary: Found an unnecessary authenticated redirect, the live `product-quantity` and `product-title` selectors, an add-item navigation race, and ambiguous substring matching for Pliers.
- Debugging Outcome: Scoped login away from public cart tests, waited for cart persistence, and matched exact product rows and quantities using the live selectors; the isolated test passed.

### Entry 8
- Prompt: Run TC-UI-08 against the live application, inspect each checkout step, and fix only the broken checkout and invoice logic.
- AI Response Summary: Found protected pre-checkout login navigation, new address steps and `house_number`, stale payment selectors, asynchronous address overwrites, and a nonexistent invoice search form.
- Debugging Outcome: Signed in inside checkout, followed `proceed-2` and `proceed-3`, serialized address updates, used `finish` and the payment success signal for double confirmation, then verified the invoice in the live table; the isolated test passed.

### Entry 9
- Prompt: Run TC-API-01 against the live API and fix only the registration data or API logic causing the 422 response.
- AI Response Summary: Confirmed the API case used the same generated user whose static password the live breach check rejected in the UI flow.
- Debugging Outcome: The separately committed unique policy-compliant password generator fixed the shared payload; the isolated API registration test passed without changing ApiClient.

### Entry 10
- Prompt: Run TC-API-10 against the live API, inspect the real validation response, and fix only the invoice payload and assertions.
- AI Response Summary: Found incoherent Faker address fields, a locked shared account, and a live creation contract of 201 with `id` and `invoice_number` but no `status`.
- Debugging Outcome: Used the second seeded customer, postcode-coherent billing data, and the observed response contract; the isolated invoice test passed and its persisted invoice was fetched successfully.

### Entry 11
- Prompt: Re-run TC-UI-03 after the full smoke run exposed the shared account lock.
- AI Response Summary: Confirmed the primary seeded account remained on the login page while the second seeded customer was available.
- Debugging Outcome: Isolated valid UI login on the second seeded customer; the specific test passed.

### Entry 12
- Prompt: Re-run TC-API-03 after the live API returned 423 for the shared account.
- AI Response Summary: Confirmed the failure was mutable account lock state rather than token parsing or ApiClient logic.
- Debugging Outcome: Isolated valid API login on the second seeded customer; the specific test passed with a bearer token.

### Entry 13
- Prompt: Re-run TC-API-04 without allowing the negative case to lock a shared seeded account.
- AI Response Summary: Suggested registering a generated user before submitting one incorrect password.
- Debugging Outcome: The negative API login now uses its own generated account, returns 401, and passes in isolation.

### Entry 14
- Prompt: Re-run TC-UI-04 without shared-account lockout or an extra Cloudflare-challenged registration redirect.
- AI Response Summary: Seeded a generated user through ApiClient, then exercised only the live login form with the incorrect password.
- Debugging Outcome: The live UI displayed `data-test="login-error"` and the isolated test passed.

### Entry 15
- Prompt: Run TC-UI-05 from the regression suite and inspect the live profile navigation failure.
- AI Response Summary: Confirmed `nav-menu` and `nav-my-profile` were correct, but Cloudflare intercepted the full account redirect performed by UI login.
- Debugging Outcome: Established the session through ApiClient and then used the live header controls for client-side profile navigation; the isolated profile test passed.

### Entry 16
- Prompt: Run TC-UI-09 from the regression suite and compare the cart removal locator with the live row.
- AI Response Summary: Found that the live remove anchor has no `data-test="remove"` attribute; the row still exposes an exact `product-title`.
- Debugging Outcome: Located the sole anchor inside the exact product row and waited for its DELETE response in `CartPage.removeProduct()`; the isolated test passed.
