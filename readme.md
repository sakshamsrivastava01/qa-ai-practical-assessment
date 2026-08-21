# QA AI Practical Assessment — Toolshop

AI-assisted QA project testing the [Toolshop](https://practicesoftwaretesting.com)
demo e-commerce application: manual test cases, Playwright UI automation, and
Playwright API automation, covering two acceptance criteria:

- **AC1 — User Registration & Login**
- **AC2 — End-to-End Purchase Flow** (browse → cart → Cash-on-Delivery checkout → invoice)

## Project Information

- **Framework:** Playwright Test (JavaScript), Prism-style structure — see
  `PrismStructure-toolshop-playwright/`
- **SUT (UI):** https://practicesoftwaretesting.com
- **SUT (API):** https://api.practicesoftwaretesting.com (Swagger docs at `/api/documentation`)
- **Seeded accounts:**

  | Role | Email | Password |
  |------|-------|----------|
  | Admin | admin@practicesoftwaretesting.com | welcome01 |
  | Customer 1 | customer@practicesoftwaretesting.com | welcome01 |
  | Customer 2 | customer2@practicesoftwaretesting.com | welcome01 |

- **Test data:** static seeded users in `test-data/users.json`; dynamic,
  unique users/invoices generated per run via `src/utils/dataGenerator.js`
  (`@faker-js/faker`), so the suite is safely re-runnable.

## Repository Structure

```
qa-ai-practical-assessment/
├── FunctionalTestCase.csv              # Manual test suite
├── project-info.md                     # Part A — AI Workflow Foundation
├── readme.md                           # This file
├── docs/
│   └── requirement-risk-analysis.md    # Requirement breakdown + risk register
├── ai-prompts/                         # Full AI prompt history (Part A/B evidence)
│   ├── requirements-and-planning.md
│   ├── test-design.md
│   ├── test-data.md
│   ├── automation-and-debugging.md
│   └── documentation-and-summary.md
├── .cursor/
│   ├── rules/qa-playwright.mdc         # Project conventions for Cursor
│   └── skills/                         # Caveman prompting, chat-summarization
└── PrismStructure-toolshop-playwright/ # Playwright UI + API automation
    ├── playwright.config.js
    ├── package.json
    ├── .env.example
    ├── src/
    │   ├── pages/                      # Page Object Model (UI)
    │   ├── api/                        # ApiClient + endpoint map
    │   └── utils/                      # Faker-based test data generators
    ├── tests/
    │   ├── ui/                         # auth.spec.js, purchase-flow.spec.js
    │   └── api/                        # auth.spec.js, cart-invoice.spec.js
    ├── test-data/users.json            # Seeded accounts + invalid-login cases
    └── execution-evidence/             # Reports land here (see status note inside)
```

## Setup

```bash
cd PrismStructure-toolshop-playwright
cp .env.example .env          # optional — defaults already point at the live SUT
npm install
npx playwright install --with-deps chromium
```

## Running Tests

| Command | Scope |
|---|---|
| `npm run test:smoke` | All `@smoke` cases (UI + API) — fast confidence check |
| `npm run test:regression` | All `@regression` cases (UI + API) |
| `npm test` | Full suite (UI + API) |
| `npm run test:ui` | UI only, all tags |
| `npm run test:ui:smoke` / `test:ui:regression` | UI only, by tag |
| `npm run test:api` | API only, all tags |
| `npm run test:api:smoke` / `test:api:regression` | API only, by tag |
| `npm run test:headed` | UI suite with a visible browser (debugging) |
| `npm run report` | Opens the last HTML report |

Verify the suite structurally without running it (no network needed):
```bash
npx playwright test --list
```

## Where Reports Are Generated

All reports write to `PrismStructure-toolshop-playwright/execution-evidence/`:
- `html-report/index.html` — interactive report with traces/screenshots/video on failure
- `results.json` — machine-readable results
- `junit-results.xml` — JUnit XML for CI

> **Status note:** this repo was scaffolded in a sandboxed build environment
> with no network access to the live SUT, so the suite has been verified
> structurally (`--list`, 16/16 tests register correctly) but not yet
> executed live. See `PrismStructure-toolshop-playwright/execution-evidence/README.md`
> for full details and the exact commands to produce real, committed
> execution evidence.

## Test Case Traceability

- Manual cases: `FunctionalTestCase.csv` (`TC-M-01`…`TC-M-08`)
- UI automation: `TC-UI-01`…`TC-UI-09` (8 active cases) in `tests/ui/*.spec.js`
- API automation: `TC-API-01`…`TC-API-11` (8 active cases) in `tests/api/*.spec.js`
- Each case maps to AC1 or AC2 via `docs/requirement-risk-analysis.md`

## Possible Extensions (Stretch — not built, for scope transparency)
- Admin-role invoice status transition matrix (`PUT /invoices/{id}/status`)
- Guest checkout invoice flow (`POST /invoices/guest`)
- Cross-browser matrix (Firefox/WebKit) in CI
- Visual regression on the product listing page

## AI-Assisted Workflow
See `project-info.md` for how AI tools were used across the QA lifecycle, and
`ai-prompts/` for the full, timestamped prompt history behind this repo.
