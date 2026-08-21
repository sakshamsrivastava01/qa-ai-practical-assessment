# Skill: Summarize Chat → ai-prompts/*.md

**What:** After a focused Cursor session, compress the conversation into the
`Prompt / AI Response Summary / Validation Notes` format used across
`ai-prompts/`.

**Why:** Long chats aren't reviewable evidence by themselves; a clean summary
is. It also frees the context window to start the next focused session
without losing what was learned.

**Format per entry:**
```
### Entry N
- Prompt: <what was actually asked>
- AI Response Summary: <what the model produced, 1-3 sentences>
- Validation Notes: <what you checked, changed, or rejected, and why>
```

**Routing:**
- Requirements/planning chat → `ai-prompts/requirements-and-planning.md`
- Test design chat → `ai-prompts/test-design.md`
- Test data / faker / payload chat → `ai-prompts/test-data.md`
- Automation structure / debugging chat → `ai-prompts/automation-and-debugging.md`
- README / report writing chat → `ai-prompts/documentation-and-summary.md`
