# Execution Evidence — Status

**Structural validation:** ✅ Done. All 16 automated cases (8 UI + 8 API) are
confirmed to parse and register correctly with Playwright:

```
$ npx playwright test --list
Total: 16 tests in 4 files
```

**Live execution against the deployed SUT:** ⏳ Not yet run *from this
build environment*. The sandbox this project was scaffolded in only allows
outbound network access to package registries (npm, GitHub) — it cannot
reach `practicesoftwaretesting.com` or `api.practicesoftwaretesting.com`
(confirmed: `HTTP 403 host_not_allowed`). Rather than fabricate a "Passed"
report for tests that were never actually executed, this folder ships empty
and is populated by running the suite from a machine/CI job with normal
internet access.

## How to generate real execution evidence

```bash
cd PrismStructure-toolshop-playwright
npm install
npx playwright install --with-deps chromium

npm run test:smoke        # fast confidence check
npm run test:regression   # full regression pass
npm test                  # everything (UI + API)

npm run report             # opens the HTML report in this folder
```

This produces, in this folder:
- `html-report/` — interactive HTML report (traces, screenshots, video on failure)
- `results.json` — machine-readable results
- `junit-results.xml` — JUnit XML (for CI dashboards)

Commit the generated `html-report/`, `results.json`, and
`junit-results.xml` alongside a couple of representative screenshots once a
real run is complete, so the repository shows genuine, reproducible evidence
rather than a claimed status.
