# AI Prompts – Requirements and Planning

(Prompts and responses used for understanding the Toolshop flow, identifying
risks, and drafting the test plan. Each entry is from a separate, focused
Cursor chat.)

---

### Entry 1
- **Prompt:** "Given these two ACs for the Toolshop app [pasted AC1 + AC2 from
  the assessment brief], break each into explicit sub-flows: happy path,
  negative path, and edge cases. Don't write test cases yet, just the list of
  scenarios."
- **AI Response (short summary):** Produced a bullet list separating
  registration/login/profile sub-flows for AC1 and browse/cart/checkout/
  invoice sub-flows for AC2, flagging "duplicate email on register" and
  "invalid credentials on login" as negative cases, and "out-of-stock
  product" and "empty cart checkout" as edge cases.
- **Validation Notes:** Cross-checked each sub-flow against the live app by
  navigating it manually; removed "empty cart checkout" as a redundant edge
  case since the UI already disables checkout with an empty cart (not
  interesting to test). Kept the rest, which became the basis for
  `docs/requirement-risk-analysis.md`.

### Entry 2
- **Prompt:** "For the invoice status field, the API enum is
  AWAITING_FULFILLMENT, ON_HOLD, AWAITING_SHIPMENT, SHIPPED, COMPLETED.
  What's a reasonable state-machine test scope for a Core submission that
  only touches customer-facing flows (no admin)?"
- **AI Response (short summary):** Suggested asserting only the initial
  status on invoice creation as part of Core, and treating full transition
  coverage (via admin PUT /invoices/{id}/status) as a Stretch item, since
  admin-role flows are outside the two chosen ACs.
- **Validation Notes:** Agreed and documented this scoping decision explicitly
  in the risk analysis (R-item) so it reads as a deliberate scope decision,
  not a gap.

### Entry 3
- **Prompt:** "Propose a UI vs API test split and a smoke vs regression split
  for AC1 and AC2, keeping total automated cases per type between 5 and 8."
- **AI Response (short summary):** Initial proposal had 9 UI and 11 API
  cases (too many), tagging roughly half as @smoke.
- **Validation Notes:** Manually trimmed to 8 UI / 8 API by removing
  lower-value duplicate negative cases (e.g. one login-negative case is
  enough at each layer) and moving "sign out" and "remove item" checks to the
  manual suite instead of automating them, since they added coverage but not
  much automation risk-reduction for the effort.
