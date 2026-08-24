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
