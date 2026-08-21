# Requirement & Risk Analysis — Toolshop Checkout & Application Flow

## 1. Scope
Two acceptance criteria drive this submission, tested at both the UI and API
layer:

- **AC1 — User Registration & Login:** register with valid details, log in
  with those credentials, verify profile information.
- **AC2 — End-to-End Purchase Flow:** browse products, add multiple items
  (including quantity update), checkout via Cash on Delivery, view the
  generated invoice under My Invoices.

## 2. Requirement Breakdown

| AC | Sub-flow | Layer(s) |
|----|----------|----------|
| AC1 | Register with valid data | UI, API |
| AC1 | Register with a duplicate/already-used email (negative) | UI |
| AC1 | Login with valid credentials | UI, API |
| AC1 | Login with invalid credentials (wrong password / unregistered email) | UI, API |
| AC1 | View & verify profile data matches registration | UI |
| AC1 | Sign out clears session | Manual |
| AC2 | Browse/search products | UI, API |
| AC2 | Add single item to cart | UI, API |
| AC2 | Add multiple items + update quantity | UI, API |
| AC2 | Remove item from cart | UI, Manual |
| AC2 | Checkout — address step | UI |
| AC2 | Checkout — Cash on Delivery + double-confirm | UI, Manual |
| AC2 | Invoice generated with correct billing/cart data | UI, API |
| AC2 | Invoice generation rejected on missing required field (negative) | API |
| AC2 | Out-of-stock product cannot be purchased | Manual |

## 3. State Machine — Invoice Status
Based on the API's documented enum for invoice status:

`AWAITING_FULFILLMENT → ON_HOLD → AWAITING_SHIPMENT → SHIPPED → COMPLETED`

Valid transitions are tested implicitly (an invoice is created and its
initial status is asserted); full transition-matrix coverage (e.g. admin
moving an invoice through every status) is called out as a Stretch item since
it requires admin-role API calls outside the two chosen ACs.

## 4. Risk Analysis

| # | Risk | Likelihood | Impact | Mitigation / Test Coverage |
|---|------|-----------|--------|------------------------------|
| R1 | Double "Confirm" click required for invoice generation is a documented quirk, not a bug — automation could mistake it for flakiness and mask a real regression if the app is later fixed to need only one click | Medium | High | Behaviour isolated in one method (`confirmOrderTwice`) with a comment explaining why, so a future single-click fix is a one-line change, not a hunt through every spec |
| R2 | Test data collisions (duplicate emails) across parallel/re-runs | Medium | Medium | Faker-generated unique email per run (timestamp + random suffix); `fullyParallel: false` for API project to avoid cart/session cross-talk |
| R3 | UI locators drift if the app markup changes | Medium | Medium | `data-test` attributes used exclusively (most stable strategy for this SUT) instead of text/CSS class selectors |
| R4 | API field names not 100% confirmed for every schema (documentation truncated during initial review) | Medium | Medium | First live run treated as a validation pass — see `ai-prompts/automation-and-debugging.md`; assertions kept on the fields explicitly documented in the assessment brief (e.g. invoice payload) |
| R5 | Seeded demo accounts could be modified/rate-limited by concurrent users of the shared public demo environment | Low | Medium | Primary flows use freshly generated users where possible; seeded accounts used only for login-focused cases |
| R6 | Payment/COD flow has no real gateway — can't verify payment failure handling | Low | Low | Explicitly out of scope; noted as a Stretch item |

## 5. Traceability
Each automated case ID (`TC-UI-##`, `TC-API-##`) and manual case ID
(`TC-M-##`) maps to exactly one row in the breakdown table above; the mapping
is also visible directly in the `AC Reference` column of
`FunctionalTestCase.csv` and the `describe` block titles in each spec file.
