# project-info.md

**Application Under Test:** PracticeSoftwareTesting Toolshop – Checkout & Application Flow
**Assessment Start Date:** 2026-08-21 | **Submission Date:** 2026-08-28

## Project Summary
This project tests the Toolshop e-commerce demo application end-to-end: user
registration/login, browsing and cart management, Cash-on-Delivery checkout,
and invoice generation — on both the web UI (`practicesoftwaretesting.com`)
and the REST API (`api.practicesoftwaretesting.com`). The main focus is a
traceable path from two acceptance criteria (auth, and purchase-to-invoice)
through manual test cases, UI automation, and API automation, with full AI
prompt history captured alongside.

## Tools Used
- **Browser:** Chromium (via Playwright)
- **UI + API automation:** Playwright Test (JavaScript), Prism-style folder structure
- **API exploration:** Swagger UI at `api.practicesoftwaretesting.com/api/documentation`
- **Test data:** `@faker-js/faker`
- **AI tools:** Cursor (Auto / Composer for planning & docs, Sonnet 4.6 for code + debugging), Claude (repo scaffolding and review)
- **Version control:** Git + GitHub (public repo)
- **Reporting:** Playwright HTML/JSON/JUnit reporters

## Setup Summary

### 1. How I provide project and system-under-test context to the tool
I open each Cursor session with a short, focused brief: the SUT URL(s), the
specific acceptance criterion in scope, the relevant Swagger endpoint(s) or
`data-test` selectors already confirmed by hand, and the exact deliverable
(e.g. "one page object" or "one spec file"). I do not paste the whole
assessment doc into every chat — only the slice relevant to that task ("Caveman"
style, one task per chat) — and I link back to `docs/requirement-risk-analysis.md`
as the shared source of truth so every chat is grounded in the same scope.

### 2. How I use AI for requirement analysis
I gave the AI the two high-level ACs from the brief and asked it to break each
into explicit sub-flows (happy path, negative path, edge case) and open
questions (e.g. "what happens on duplicate email?", "is COD the only guest
payment option?"). I then verified the answers myself against the live app and
Swagger docs before trusting them — AI output here is a first draft of
scope, not the final scope.

### 3. How I use AI for test planning and strategy
For each AC I asked AI to propose a UI vs API split and a smoke vs regression
split, then I adjusted the proposal against the assessment's explicit 5-8
tests-per-type cap and the "Core over Stretch" guidance — trimming
lower-value duplicate coverage (e.g. one negative-login case per layer instead
of three) rather than letting the model maximize test count.

### 4. How I use AI for manual test case design
I asked AI to draft manual cases in the required CSV columns from the same AC
list, explicitly asking for a mix of positive, negative, and edge cases. I
then reviewed each row for: real preconditions, data that matches the actual
app (e.g. real field names), and removed any case that only duplicated an
already-automated scenario with no added value.

### 5. How I use AI for automation design
I asked AI to propose a Page Object Model structure (Prism-style: `src/pages`,
`src/api`, `src/utils`, `tests/ui`, `tests/api`) before writing any spec, and
to use `data-test` attributes as the locator strategy (most stable for this
app). Cursor's Sonnet model was used specifically for page objects, spec
files, `playwright.config.js`, and the API client, per the model-routing
strategy in the assessment's Quick Tips.

### 6. How I validate and refine AI-generated test cases and scripts
I run `npx playwright test --list` after every generation pass to catch
syntax/import errors immediately, then execute the relevant `@smoke` subset
locally and read the trace/HTML report rather than trusting a "should work"
claim. Any locator AI invents that isn't confirmed against the real DOM (via
browser inspection or the app's own markup conventions) is flagged and
corrected before merging.

### 7. How I use AI for test data generation, environment assumptions, and API payloads
I use `@faker-js/faker` (AI-suggested, human-approved) to generate unique
users per run so tests are re-runnable without manual cleanup, and I based the
invoice request payload directly on the example in the assessment brief
rather than letting AI guess the schema. I assume: the deployed environment
resets/tolerates repeated test data, seeded accounts
(`customer@practicesoftwaretesting.com` / `welcome01`) remain valid, and
Cash-on-Delivery does not require a real payment gateway.

### 8. How I use AI for debugging failing tests and interpreting logs
When a test fails, I share only the failing assertion, the relevant trace
step, and the actual vs expected values — not the whole log — and ask AI for
likely root causes ranked by probability (bad selector, timing, real app
behaviour). I confirm the top hypothesis against the trace viewer myself
before changing code, since AI debugging suggestions can be plausible but
wrong when it hasn't seen the actual DOM/network state.

### 9. What information I avoid sharing unnecessarily with AI tools
I don't share real personal data, production credentials, or any account
beyond the public seeded demo users. I avoid pasting entire log files or full
`.env` contents, and I keep prompts scoped to the SUT's public demo
environment only.

### 10. How I would reuse this QA workflow in a real project
The same shape applies with real tickets in place of the AC brief: AI drafts
the requirement breakdown and test list from the ticket, I validate scope
against the actual system and stakeholders, AI accelerates page-object and
spec boilerplate while I own selector correctness and assertions, and every
AI session gets logged the same way (prompt, response summary, validation
notes) so the workflow stays auditable and repeatable across the team.

## Notes on scope
Per the assessment's Core-first guidance, this submission keeps automated
coverage to 8 UI + 8 API cases (5-8 per type) and treats a smaller,
well-documented Core as the primary deliverable; Stretch ideas are listed in
`readme.md` under "Possible Extensions" rather than built out, to keep the
lifecycle artifacts (requirements, prompts, execution evidence) the main
focus of the effort.
