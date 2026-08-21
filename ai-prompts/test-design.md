# AI Prompts – Test Design

(Prompts used to generate or refine test scenarios and test cases for UI + API.)

---

### Entry 1
- **Prompt:** "Draft manual functional test cases for AC1 (registration +
  login) in this CSV format: [pasted column headers]. Include at least one
  positive, one negative, and one edge case."
- **AI Response Summary:** Generated 5 rows covering valid registration,
  duplicate email, wrong password, unregistered email, and sign-out.
- **Validation Notes:** Merged the "wrong password" and "unregistered email"
  negative rows into a single representative negative-login case
  (`TC-M-03`) to avoid redundant manual cases that don't add new risk
  coverage beyond what's already automated at `TC-UI-04` / `TC-API-04`.

### Entry 2
- **Prompt:** "Same for AC2 (cart + checkout + invoice) — include an
  out-of-stock case and a search-no-results case."
- **AI Response Summary:** Generated rows for add-to-cart-with-quantity,
  checkout via COD, cart total on item removal, out-of-stock, and search.
- **Validation Notes:** Kept all five as-is after confirming preconditions
  were realistic (e.g. that the catalog does contain at least one
  out-of-stock item to reference); adjusted wording of the COD case to
  explicitly call out the double-confirm step so a manual tester doesn't
  mistake it for a stuck UI.

### Entry 3
- **Prompt:** "List the `data-test` attributes you'd expect on a typical
  Toolshop registration form based on common patterns for this app, so I can
  scaffold a Page Object before I've opened dev tools for every field."
- **AI Response Summary:** Suggested attribute names like
  `first-name`, `last-name`, `dob`, `street`, `postal_code`, `city`, `state`,
  `country`, `phone`, `email`, `password`, `register-submit`.
- **Validation Notes:** Treated as a first draft only — flagged in
  `automation-and-debugging.md` as "to confirm on first real run" since AI
  cannot see the live DOM. This is exactly the kind of AI output that must be
  verified, not trusted, before being relied on in assertions.
