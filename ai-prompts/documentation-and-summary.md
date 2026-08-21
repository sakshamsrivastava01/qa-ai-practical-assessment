# AI Prompts – Documentation and Summary

(Prompts used for writing README, reports, etc.)

---

### Entry 1
- **Prompt:** "Write a README section explaining how to install, run smoke
  vs regression, and where reports land, for a Playwright project with
  ui-chromium and api projects."
- **AI Response Summary:** Drafted setup steps (`npm install`,
  `npx playwright install`), run commands per npm script, and pointed to
  `execution-evidence/html-report`.
- **Edits You Made:** Added the explicit note about the sandbox network
  restriction hit during this build, so a reader isn't confused about why the
  repo doesn't ship a "Passed" report by default, and added the seeded test
  account table for convenience.
- **Reason for Edits:** Transparency and accuracy — the assessment values
  genuine execution evidence, so the README needed to be honest about what
  was and wasn't run in this environment, plus give a one-command path to
  generate real evidence.

### Entry 2
- **Prompt:** "Summarize project-info.md's 'Setup Summary' answers down to
  one sentence each so I can sanity-check nothing is generic AI filler before
  submitting."
- **AI Response Summary:** Returned condensed one-liners for all 10 points.
- **Edits You Made:** Rewrote two answers (context-sharing and debugging)
  that were still fairly generic, replacing them with the specific practices
  actually used in this repo (Caveman-style single-task chats; sharing only
  the failing assertion + trace step, not full logs).
- **Reason for Edits:** Clarity and correctness — the goal of this document is
  to show real practice, not a generic "best practices" essay.
