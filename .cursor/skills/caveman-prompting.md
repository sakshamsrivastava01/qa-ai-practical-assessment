# Skill: Caveman Prompting (token-efficient QA sessions)

**What:** Keep prompts short and focused on one task per chat. No long story
in every message — restate only what's needed for that task.

**Why:** Less context per request → lower token usage, faster responses, and
each chat maps cleanly onto one `ai-prompts/*.md` entry, which is easier to
review and easier to keep honest (a small, scoped prompt is easy to compare
against its actual output).

**How to use in this repo:**
1. Start a new chat per deliverable (one page object, one spec file, one doc
   section) — don't mix "generate the page object" with "now also write the
   README" in the same thread.
2. Paste only the slice of context that task needs (a Swagger snippet, one
   AC, one failing trace), not the whole assessment brief.
3. After the session, summarize it into the matching `ai-prompts/` file
   (see `summarize-chat.md`).
4. Use the model-routing table from the assessment brief: lighter/Auto model
   for planning and docs, Sonnet for code generation and debugging.
