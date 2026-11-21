# OLAA ECOSYSTEM — PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Version:** 1.0  
**Date:** 20 November 2026  
**Status:** Draft for product/architecture alignment  
**Scope:** `olaa-language` · `olaa-habits` · `olaa-takenote` · `olaa-platform`

> This PRD defines the target product, not the verified current implementation. Before coding, perform a source-level feature audit and mark each requirement Implemented / Partial / UI-only / Not implemented / Blocked / Deferred.

---

## 0. How to use this document

- **CORE / P0:** minimum capabilities for a usable product or foundational safety.
- **P1:** high-value next stage after core workflows are stable.
- **P2 / FUTURE:** advanced capabilities; must not block MVP.
- **INSPIRATION:** patterns adapted from well-known products, not copied UI, branding, content, or implementation.
- Each feature must have an owner, acceptance criteria, tests, and dependencies before implementation.

---

# 1. Executive summary

OLAA is a personal learning and growth ecosystem composed of three specialized user-facing apps and one shared platform.

- **OLAA Language — Learn:** structured language acquisition, lessons, practice, retention, feedback.
- **OLAA Habits — Grow:** habits, routines, goals, consistency, reflection and personal progress.
- **OLAA TakeNote — Create/Remember:** notebook, typed notes, handwriting, canvas, PDF and knowledge retrieval.
- **OLAA Platform — Connect/Protect/Operate:** identity, shared contracts, security, integrations, infrastructure, sync, observability and SaaS capabilities.

The apps must feel connected without becoming a monolith. Each product owns its business logic and data. Platform provides common services and governed integration.

### Product thesis
A user should be able to learn something, practice it, turn it into personal knowledge, and sustain that behavior over time—with reliable data and minimal friction.

### North-star outcome
Increase meaningful, repeatable learning and personal-growth sessions that users complete and can review over time—not merely screen time, streaks or vanity engagement.

---

# 2. Product vision and principles

1. **Specialized apps, shared foundation:** each app owns its domain; Platform owns cross-cutting capabilities.
2. **User outcome before feature volume:** prioritize flows that help users accomplish a real goal.
3. **Offline-tolerant:** capture and core actions should work offline where feasible.
4. **Privacy-first:** collect only necessary data; user content is private by default and exportable.
5. **Accessible and calm:** keyboard, touch, stylus, scalable text, visible focus and reduced motion.
6. **Humane progress:** missed days should not erase long-term progress or shame users.
7. **Interoperability:** export, stable identifiers, explicit links and versioned contracts.
8. **AI is optional and reviewable:** suggestions should be scoped, transparent and non-destructive.
9. **Device-aware experience:** mobile quick actions, tablet workspace, desktop productivity.
10. **Architecture is governed:** important decisions have ADRs, owners, compatibility and migration plans.

---

# 3. Personas and jobs-to-be-done

| Persona | Need | Primary apps |
|---|---|---|
| Self-directed learner | Build language skill through structured learning, practice, feedback and review | Language, TakeNote, Habits |
| Knowledge builder | Capture ideas, annotate source material, organize and retrieve knowledge | TakeNote |
| Consistency seeker | Turn intentions into repeatable behavior and recover from lapses | Habits |
| Cross-device user | Move between phone, tablet and desktop with reliable data | All / Platform |
| Power user | Customize workflow, use AI assistance, connect apps and export data | All / Platform |

---

# 4. Ecosystem ownership and boundaries

| Repository | Owns | Must not own |
|---|---|---|
| Language | Courses, curriculum, lessons, exercises, answers, learner progress, vocabulary learning state, assessment | Habit schedules/check-ins; note editor internals; platform identity |
| Habits | Habits, schedules, check-ins, routines, goals, milestones, habit analytics | Curriculum correctness; note editor; identity |
| TakeNote | Notebooks, pages, blocks, canvas objects, strokes, attachments, annotations, note search | Curriculum; habit completion rules; identity |
| Platform | Identity, sessions, permissions, shared contracts, integration, billing/entitlements, infrastructure policies, operational services | App-specific business logic/content |

**Rule:** one authoritative owner per domain entity. Apps must not directly mutate another app’s database.

---

# 5. Global experience requirements

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| UX-001 | Consistent account/profile/preferences and app switching | CORE | User can access enabled OLAA apps without duplicate accounts |
| UX-002 | Phone, tablet and desktop responsive layouts | CORE | Primary flows work at supported breakpoints; tablet note workspace is optimized |
| UX-003 | Light/dark/system theme | CORE | Preference persists and follows OS when selected |
| UX-004 | Accessibility baseline | CORE | Keyboard navigation, semantic labels, visible focus, scalable text and reduced-motion |
| UX-005 | Global search entry point | P1 | Results can identify source app and open target; permissions are respected |
| UX-006 | Universal capture | P1 | Quick capture creates a note/reminder in a clearly selected owning app |
| UX-007 | Unified notification preferences | P1 | Category/app settings, quiet hours and snooze are centrally manageable |
| UX-008 | Cross-app deep links | P1 | Link opens target object or a graceful fallback |

---

# 6. OLAA Language PRD

**Goal:** deliver structured language learning that teaches skills and measures retention, not just completion.

## 6.1 Modules and requirements

| Module | Requirements | Priority |
|---|---|---|
| Curriculum | Course → level → unit → lesson; prerequisites; progress map; checkpoints; diagnostic/placement entry | CORE |
| Lesson player | Objective, content blocks, examples, practice, recap, next step; resume state | CORE |
| Exercise engine | Typed contracts, validation, feedback, retry, error categories, accessibility | CORE |
| Vocabulary | Word/phrase, meaning, example, audio, context, personal difficulty and learning state | CORE |
| Grammar | Explanation, examples, guided practice, common errors and review links | CORE |
| Listening | Audio, replay, speed controls, comprehension, transcript reveal policy | CORE |
| Reading | Passage, contextual vocabulary, comprehension, optional annotation | CORE |
| Speaking | Prompt, recording/replay, pronunciation feedback when supported, self-rating | P1 |
| Writing | Prompt, draft, rubric, feedback and revision history | P1 |
| Practice hub | Due review, weak areas, quick/mixed practice | CORE |
| Progress | Lesson progress, mastery estimate, time-on-task, accuracy, skill trends | CORE |
| Motivation | XP/points, milestones, daily goal and streak; humane recovery | CORE |
| Personalization | Adjust difficulty/review from performance; learner can override | P1 |
| Offline | Cache current lesson and queue progress writes safely | P1 |
| Content quality | Schema validation, answer-key validation, audio metadata and automated curriculum checks | CORE |

## 6.2 Recommended lesson anatomy

1. Objective and estimated duration.
2. Warm-up/retrieval prompt.
3. New concept or vocabulary in context.
4. Model examples.
5. Guided practice.
6. Independent practice with varied exercise types.
7. Feedback explaining why an answer is right/wrong.
8. Recap and takeaway.
9. Review items added to learner schedule.
10. Optional note link and study-habit event.

## 6.3 Exercise requirements

- Common exercise contract: prompt, stimulus, answer model, validation, feedback and metadata.
- Core types: multiple choice, image choice, sentence construction, typed answer, listening, matching.
- Feedback should teach context/rule, not only reveal correctness.
- Track mistakes by skill/item/error category.
- Retry and hint policy configurable per lesson.
- Drag/tile interaction has keyboard/screen-reader alternatives.
- P1/P2 types: cloze, dictation, ordering, pronunciation, free response.

## 6.4 Retention and review engine

- Create review items from errors, new vocabulary and difficult concepts.
- Scheduling algorithm behind a versioned interface; algorithm can change without rewriting learner data.
- Review queue supports due, overdue, quick, mixed and item-specific feedback.
- Track recall outcome and optionally confidence.
- Streak is not the sole mastery metric.

## 6.5 Inspired patterns

- **Structured learning path and bite-sized progression:** adapt with flexible route, diagnostic entry and review paths rather than unnecessary lock-in.
- **Retrieval practice:** schedule review from recall and difficulty; make the queue explainable.
- **Immediate feedback and exercise variety:** feedback should explain context.
- **Motivation:** reward meaningful learning and consistency; permit recovery and accessibility settings.

---

# 7. OLAA Habits PRD

**Goal:** help users turn intentions into sustainable behaviors, measure consistency and recover from missed days.

## 7.1 Domain model

| Entity | Key fields/behavior |
|---|---|
| Habit | ID, title, description, category, type (binary/quantity/duration), unit, target, status, optional linked goal |
| Schedule | Frequency (daily, selected weekdays, X/week, custom), timezone, start/end, flexible window |
| Check-in | Date/time, completion state, value, note, source, edit history |
| Routine | Name, ordered steps, schedule, completion summary |
| Goal | Outcome, target, deadline, measurement, linked habits, status |
| Milestone | Threshold, achieved date, celebration |
| Reminder | Local time, channel, quiet hours, snooze, delivery preference |

## 7.2 Core features

| Feature | Requirement | Priority |
|---|---|---|
| Habit creation | Create/edit/archive; type, frequency, target, schedule, optional reminder | CORE |
| Daily check-in | Complete, partial, skip, missed; quick action, undo/edit with history | CORE |
| Calendar | Day/week/month views; tap to inspect/edit check-ins | CORE |
| Flexible schedules | Daily, weekdays, selected days, X times/week, custom cadence | CORE |
| Streaks | Calculate according to schedule; preserve history when schedule changes | CORE |
| Consistency | Completion rate separate from streak | CORE |
| Goals | Measurable goal, deadline, progress, linked habits and milestones | CORE/P1 |
| Routines | Ordered actions, start/complete, pause, skip step, summary | P1 |
| Analytics | Weekly/monthly trend, habit-level completion and patterns | P1 |
| Reminders | Per-habit reminder, snooze, quiet hours, preferences | P1 |
| Context | Optional reflection/mood/energy; privacy-conscious | P1 |
| Widgets/quick actions | Quick check-in from supported surfaces | P2 |
| Insights | Explain patterns and offer suggestions; no automatic changes without consent | P2 |

## 7.3 Humane tracking

- A missed day is data, not failure.
- Offer recovery: resume, reduce target temporarily, change schedule or pause.
- Show completion rate, scheduled opportunities and consistency—not only longest streak.
- Schedule changes must not rewrite historical check-ins.
- Support vacation, illness, rest day and paused states where appropriate.

## 7.4 Habit types

| Type | Example | Tracking |
|---|---|---|
| Binary | Read 10 minutes | Done / not done / skipped |
| Quantity | Drink 6 glasses | Numeric value and unit |
| Duration | Study English 30 minutes | Minutes; optional timer |
| Weekly frequency | Exercise 3 times/week | Quota progress |
| Routine | Morning routine | Ordered step completion |

## 7.5 Inspired patterns

- Calendar heatmap and streaks, but no streak-only gamification.
- Flexible weekly quotas instead of requiring every day.
- Widgets/quick check-in to reduce friction.
- Analytics with transparent calculations.
- Reminders with quiet hours, snooze and notification-fatigue controls.

---

# 8. OLAA TakeNote PRD

**Goal:** provide an iPad-first knowledge workspace supporting typed notes, handwriting, freeform thinking, documents and retrieval.

## 8.1 Information architecture

| Entity | Definition |
|---|---|
| Workspace | Personal workspace and settings |
| Notebook | Collection with cover, description and optional template |
| Section/Folder | Optional organization layer |
| Page | Note/document with title, content, metadata, version and links |
| Block | Text, heading, checklist, table, image, link, code, callout, embed |
| Canvas | Freeform surface with objects, positions, connectors and zoom |
| Ink stroke | Stroke points, pressure/tilt when available, tool properties and grouping |
| Attachment | Image/audio/PDF/file with metadata and storage reference |
| Annotation | PDF/page-targeted highlight, ink, text note or bookmark |
| Tag | User labels and filters |
| Link | Internal page, lesson, habit/goal or external URL |

## 8.2 Core features

| Feature | Requirement | Priority |
|---|---|---|
| Notebook & page | Create, rename, move, archive, favorite, duplicate, template and organize | CORE |
| Rich-text editor | Paragraph, headings, lists, checklist, quote, code, table, image, link, callout | CORE |
| Autosave | Save locally immediately where feasible; show save/sync state; recover interrupted drafts | CORE |
| Search | Titles and text; filter by notebook/tag/date/type | CORE |
| Tags | Create, apply, filter, rename and merge | CORE |
| Attachments | Add/preview supported images/files; lifecycle and deletion controls | CORE |
| Canvas | Pan/zoom; text/image/sticky/shape/connector/ink; select/move/resize/group | P1 |
| Handwriting | Pen, highlighter, eraser, lasso, undo/redo, stroke selection | P1 |
| PDF | Import, navigate, annotate, highlight, bookmark, export annotated copy | P1 |
| Templates | Blank, study, meeting, journal, language notes, mind-map starter | P1 |
| Version/history | Restore prior version or recover deleted content within defined retention | P1 |
| Cross-links | Link pages, lessons and app objects; backlinks/related items | P1 |
| OCR/ink search | Index supported images/PDF/handwriting; disclose language limitations | P2 |
| Audio notes | Record/attach audio, playback, timestamps; transcription only with supported consent | P2 |
| AI assistant | Summarize, explain, organize, draft or tag selected content; preview/undo | P2 |

## 8.3 iPad/Pencil requirements

- Tablet-first workspace with tool palette, page navigation and split view.
- Low-latency ink; pressure/tilt only when platform/hardware supports it.
- Palm rejection and stylus/touch distinction.
- Undo/redo for text and ink; predictable lasso and selection.
- Zoom writing; avoid accidental page movement while drawing.
- Autosave and crash recovery.
- Keyboard shortcuts and external keyboard support.
- Export/share without losing original.
- Accessibility alternatives for handwriting-only content where feasible.

## 8.4 Canvas object requirements

| Object | Minimum behavior |
|---|---|
| Text | Edit, style, resize, move, select |
| Sticky note | Style, text, resize, move, group |
| Shape | Basic shapes, fill/outline, resize/rotate |
| Connector | Connect objects; endpoints update when moved |
| Image | Insert, crop, resize, rotate and move |
| Ink | Draw, erase, select, group and transform where supported |
| Group | Move/resize set of objects |
| Viewport | Pan/zoom; persist view without altering content |

## 8.5 Inspired patterns

- **Composable pages/templates/databases:** adapt flexible content blocks without turning TakeNote into a full clone of Notion.
- **Notebook, handwriting and PDF annotation:** tablet-first, low-latency writing and exportable notes.
- **Backlinks/connected knowledge:** link pages and learning items without requiring a graph UI.
- **Search, tags and history:** retrieval/recovery before advanced AI.

---

# 9. OLAA Platform PRD

**Goal:** standardize and operate shared capabilities without centralizing app-specific business logic.

## 9.1 Capability catalog

| Capability | Scope | Priority |
|---|---|---|
| Identity | Account, authentication, sessions, profile, recovery and device/session management | P0 |
| Authorization | Role/permission model, ownership checks, app scopes and service authorization | P0 |
| Shared contracts | API schemas, event envelopes, errors, identifiers, versioning | P0 |
| Data policy | Ownership, retention, export/delete, migration, backup rules | P0 |
| Integration registry | App registry, capabilities, deep links, contract compatibility and status | P0 |
| Security baseline | Secrets, encryption, validation, rate limits, threat model, audit policy | P0 |
| Sync infrastructure | Retry, idempotency, conflict policy, offline queues and status | P1 |
| Notifications | Push/in-app/email adapters, preferences, quiet hours, deduplication | P1 |
| Billing/entitlements | Plans, subscriptions, feature flags, limits, entitlement checks | P1 |
| Observability | Logs, metrics, tracing, errors, health checks, alerts | P1 |
| Storage | Uploads, attachments, signed access, lifecycle, quotas | P1 |
| Search infrastructure | Index adapters/federated contracts; app remains owner of data | P1/P2 |
| Admin | Support/admin operations, user lifecycle and audit-safe actions | P2 |
| AI gateway | Provider abstraction, budget, safety, consent, prompt versioning and logging policy | P2 |
| Feature flags | Controlled rollout, environment config and kill switches | P1 |
| Analytics events | Common event schema, consent, metrics and dashboards | P1 |

## 9.2 Platform governance

- App domains own data and business rules.
- Shared APIs are explicit and versioned.
- Apps consume shared packages/contracts rather than copy implementations.
- Avoid cross-repository direct database access.
- Prefer modular services; do not introduce microservices without an operational reason.
- Shared capabilities have owner, docs, tests, compatibility and deprecation policy.

## 9.3 Suggested shared contracts

| Contract | Required behavior |
|---|---|
| User/account reference | Stable ID; no duplicate identity authority in app |
| Event envelope | Event ID, type, version, timestamp, actor, source app, payload schema |
| API errors | Stable code, message, retryable flag, correlation ID; no secret leakage |
| Deep link | App, object type/ID, route version and fallback |
| Sync mutation | Mutation ID/idempotency key, timestamps and conflict metadata |
| Entitlement | Feature key, scope, plan/limit, expiry/status; server enforcement |

---

# 10. Cross-app integration

| ID | Integration | Requirements | Priority |
|---|---|---|---|
| INT-001 | Language → Habits | Learning activity may contribute to a linked study habit; prevent double count; user can unlink/disable | P1 |
| INT-002 | Language → TakeNote | Save lesson/vocabulary/grammar link; source attribution and update behavior defined | P1 |
| INT-003 | TakeNote → Language | Page links to lesson/course; deep link or fallback | P1 |
| INT-004 | Habits → TakeNote | Habit/goal may link to reflection; no auto-note without preference | P2 |
| INT-005 | Unified profile | Shared account/profile/preferences, app settings separated | P0 |
| INT-006 | Global navigation | Switch apps and preserve origin context where supported | P1 |
| INT-007 | Notifications | Central preferences; typed app events; user controls delivery | P1 |
| INT-008 | Global search | Federated contracts, source permissions enforced | P2 |
| INT-009 | Activity summary | Opt-in summary; do not expose raw cross-app content by default | P2 |
| INT-010 | Universal capture | Quick capture routes to selected owner app/domain | P2 |

### Example study flow

1. User starts study from Language or Habits.
2. Language records lesson/exercise events and owns learning progress.
3. If a study habit is linked, Habits receives an integration event and applies the user's completion rule.
4. User creates a TakeNote page linked to lesson; only selected content is copied or referenced.
5. Platform routes events, validates contracts, retries idempotently and records operational telemetry.

**Important:** cross-app events do not replace domain ownership. Language remains source of truth for learning progress; Habits remains source of truth for habit check-ins.

---

# 11. Data, sync, offline and lifecycle

| Requirement | Policy |
|---|---|
| Stable IDs | Stable identifiers; never rely on display names or array positions |
| Ownership | One authoritative owner per entity |
| Sync | Visible states: local, pending, synced, conflict, error |
| Idempotency | Retries must not duplicate check-ins, notes, billing or events |
| Conflict policy | Defined per entity; last-write-wins only where acceptable; preserve versions or resolve otherwise |
| Offline | Local capture and queued changes for appropriate features; limitations disclosed |
| Migration | Schema versioning and compatibility tests |
| Backup | Frequency, retention, restore procedure and recovery objectives documented |
| Deletion | Undo/soft-delete where useful; hard-delete and retention policy explicit |
| Export | User export of notes and learning/habit data in documented formats when feasible |
| Privacy | Minimize analytics/AI payloads; consent and retention controls |

---

# 12. Security and privacy

| ID | Requirement | Priority |
|---|---|---|
| SEC-001 | Secure authentication and recovery flow | P0 |
| SEC-002 | Verify object ownership/permissions on every request; UI hiding is not authorization | P0 |
| SEC-003 | Secrets never in source, logs or client bundle; use environment/secret manager | P0 |
| SEC-004 | Transport security and encryption at rest configured for production | P0 |
| SEC-005 | Input validation and common web/API threat protections | P0 |
| SEC-006 | Rate limits/abuse controls for auth, AI, uploads and public endpoints | P1 |
| SEC-007 | Security/admin logs without sensitive payload leakage | P1 |
| SEC-008 | Dependency and vulnerability scanning in CI | P1 |
| SEC-009 | Threat model includes cross-app exposure, sync conflicts, malicious files and account compromise | P1 |
| SEC-010 | AI actions are scoped, previewed and confirmed when destructive or externally visible | P2 |

### Privacy defaults

- Notes, learning history, habits and reflections are private by default.
- Analytics collect minimum necessary data and disclose purpose.
- AI processing discloses what content is sent to providers; consent controls apply where appropriate.
- Export and account-deletion pathways are clear.
- Notification previews do not expose note content or sensitive progress by default.

---

# 13. AI strategy

| App | Use cases | Guardrails |
|---|---|---|
| Language | Explain mistakes, examples, writing/speaking feedback, adaptive practice, role-play | Ground in lesson objectives; label generated content; report errors |
| Habits | Suggest schedule changes, summarize trends, achievable next steps | No shaming; no automatic changes; explain/dismiss |
| TakeNote | Summarize selected page, rewrite, extract action items, tag, ask selected notes | Scoped selection, source links where possible, preview/undo |
| Platform | Provider routing, quotas, safety, usage, prompt/version policy | Least privilege, minimal content logs, enforce limits |

AI is P2 unless a validated workflow proves it is essential. Do not make AI a prerequisite for core app use.

---

# 14. Monetization (future-ready)

Design entitlement contracts early; postpone billing until core value is validated.

| Plan concept | Potential value | Guardrail |
|---|---|---|
| Free | Useful core learning, habits and notes | Genuinely usable; no dark patterns |
| Personal/Plus | Advanced analytics, more storage, premium content, advanced note features, AI allowance | Transparent limits and renewal |
| Family/Group | Shared plan, optional shared goals/learning spaces | Separate ownership/privacy; personal notes private by default |
| Education/Organization | Admin, seats, shared content, reporting and policies | Consent, access boundaries, export |

- Entitlements are server-validated through a shared contract.
- Do not hardcode plan checks separately in apps.
- AI/storage usage limits are visible.
- Security, privacy and export must not be compromised by subscription tier.

---

# 15. Analytics and success metrics

| Product | Primary metrics | Guardrails |
|---|---|---|
| Language | Meaningful learning sessions/week, review completion, retention/mastery progression | Skill accuracy, lesson abandonment, content errors, accessibility |
| Habits | Scheduled opportunities completed, weekly consistency, goal progress | Reminder opt-out, fatigue, recovery, check-in friction |
| TakeNote | Notes created/edited, retrieval/search success, weekly active note sessions | Autosave failures, content loss, sync conflicts, export success, editor latency |
| Platform | Cross-app activation, sync success, integration use, account completion | API errors, auth failures, crashes, latency, restore success, incidents |

Measurement principles:
- Define event schema and formulas before dashboards.
- Optimize user outcomes, not compulsive engagement.
- Do not use streak, session duration or notification opens as sole success.
- Respect privacy and consent; do not collect note contents for analytics.

---

# 16. Non-functional requirements

| Category | Requirement |
|---|---|
| Reliability | No silent data loss; recoverable drafts; documented incident/restore process |
| Performance | Primary navigation/common actions responsive; measured budgets defined per platform |
| Autosave | Visible save state, unsaved indicator and crash recovery |
| Accessibility | Keyboard, touch, screen-reader labels, contrast, reduced motion, scalable text |
| Compatibility | Supported OS/browser/device matrix documented and smoke-tested |
| Security | Threat model, secure storage, ownership authorization, vulnerability checks |
| Maintainability | Type checking, lint, tests, modular boundaries, ADRs, API versioning |
| Observability | Structured logs, error tracking, metrics, health checks, correlation IDs |
| Scalability | Growth without premature microservice complexity |
| Portability | Export formats and stable IDs reduce lock-in |

---

# 17. Quality gates / Definition of Done

| Gate | Required before merge/release |
|---|---|
| Code | Lint, format, type-check, build; no unresolved critical errors |
| Tests | Unit tests for logic; integration/contract tests for boundaries; smoke/E2E for primary flows |
| Security | Secrets scan, dependency scan, authorization review for sensitive changes |
| UX | Responsive, accessibility, empty/loading/error/offline states |
| Data | Migration tested; recovery implications documented |
| Docs | README/module docs/ADR/API contracts updated |
| Release | Version, changelog, rollout, rollback and monitoring owner |

### Minimum acceptance scenarios

- User creates/recovers account and accesses enabled apps without duplicate identity.
- Language lesson progress persists across reload and temporary network failure.
- Review queue returns due items and records recall without duplicate writes.
- Habit check-in respects schedule/timezone; edits do not corrupt historical dates.
- Missed-day recovery does not erase history.
- TakeNote autosaves and recovers interrupted edits.
- Canvas preserves objects and viewport across reopening.
- PDF annotation export retains original and expected annotations.
- Cross-app links open correct object or fallback.
- Unauthorized users cannot access another user's data.
- Sync retry is idempotent and conflicts behave deterministically.
- Export and deletion workflows are documented and tested.

---

# 18. Roadmap

| Phase | Outcome | Deliverables | Exit criteria |
|---|---|---|---|
| 0 — Foundation audit | Know what exists/missing | Repo inventory, module map, ownership, architecture, risk report | Source-level status verified |
| 1 — Platform baseline | Safe development base | Identity strategy, contracts, security, CI, environments, migration, observability minimum | Contracts versioned, primary builds/tests, ownership rules |
| 2 — Language stabilization | Reliable learning MVP | Content validation, exercise tests, progress/review, accessibility | Lesson/review E2E; automated content checks |
| 3 — Habits MVP | Daily tracking usable | CRUD, flexible schedule, check-in, calendar, consistency, basic goal | Schedule edge cases tested |
| 4 — TakeNote MVP | Reliable notebook | Notebook/pages, rich text, autosave, search, tags, attachments, tablet UX | No data-loss tests fail; search/export work |
| 5 — Integration | Connected journey | Deep links, lesson-to-note, study habit linking, shared navigation/settings | Contracts tested; links can be disabled |
| 6 — Advanced | Differentiation | Canvas/PDF depth, AI, analytics, adaptive learning, widgets | Core stable, flags and telemetry available |
| 7 — SaaS readiness | Monetization/operations | Billing, entitlements, admin, support, compliance, scale tests | Runbooks, billing tests, incident/rollback readiness |

---

# 19. Feature priority summary

### P0 / CORE
Identity strategy, ownership, contracts, security baseline, CI; Language core; Habits CRUD/check-in/schedule/calendar; TakeNote notebook/page/editor/autosave/search; export basics.

### P1
Offline/sync, goals/routines, review/adaptive learning, PDF annotation, handwriting/canvas, shared notifications, deep links, unified navigation, analytics, version history, feature flags.

### P2 / FUTURE
AI tutor/coach, OCR and handwriting search, advanced canvas, audio transcription, widgets, federated search, family/org workspaces, advanced billing/admin, automation agents.

---

# 20. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Foundation overengineering | Slow delivery and complexity | Build shared capability only when demanded; modular monolith where appropriate |
| App boundaries blur | Duplicated logic and inconsistent data | Ownership, contracts, tests and architecture checks |
| Sync underestimated | Lost/duplicated data | Design early; idempotency; conflict tests; visible sync state |
| TakeNote editor scope expands | Long delivery and unstable editor | Stage editor; isolate models; recovery/performance tests |
| Habits gamification becomes punitive | User abandonment | Consistency, flexible schedules, recovery, optional streaks |
| AI costs/privacy | Trust and financial risk | Consent, budgets, quotas, scoped context, minimal logs |
| Cross-app dependency too tight | Releases blocked | Versioned contracts, capability discovery, graceful fallback |
| PRD diverges from code | Confusion for developers/agents | Status matrix and update docs/contracts |

---

# 21. Repository artifacts expected

| Repository | Artifacts |
|---|---|
| `olaa-language` | Module map, curriculum schema, exercise contract, progress/review model, content QA rules, metrics, test fixtures |
| `olaa-habits` | Habit model, schedule/timezone rules, check-in state machine, routine/goal models, analytics definitions, edge-case tests |
| `olaa-takenote` | Notebook/page/block schema, editor state, canvas model, ink storage, attachment lifecycle, autosave/recovery, PDF annotation model |
| `olaa-platform` | Architecture map, ADR index, identity/security baseline, contracts, API conventions, integration registry, CI/release, observability, lifecycle |

---

# 22. Next execution steps

1. Run a source-level feature audit against this PRD.
2. Mark each requirement: **Implemented / Partial / UI-only / Not implemented / Blocked / Deferred**.
3. Produce a gap report per repo with evidence (file path, test, API or component).
4. Convert P0 items into issues with owner, dependency, acceptance criteria and test plan.
5. Freeze foundation decisions only after identifying what exists and what would be costly to change.
6. Implement vertical slices; do not build every shared service before validating user workflows.
7. Update PRD and repository docs whenever requirements or architecture change.

---

# Appendix A — Product inspiration and adaptation

| Reference | Patterns considered | OLAA adaptation |
|---|---|---|
| Duolingo and established learning products | Structured path, bite-sized lessons, retrieval, feedback, motivation, skill progression | Flexible path, review queue, varied exercise, feedback and humane progression |
| Notion | Block-based docs, databases, templates, search, backlinks, history, automation, AI | Composable note content, retrieval, templates, links and optional AI; not a full clone |
| Goodnotes / Apple Notes / OneNote patterns | Handwriting, notebooks, PDF markup, images, sketch, search, stylus-first workflows | Tablet-first notebook, Pencil, PDF and canvas capabilities staged by complexity |
| Habit tracker category | Flexible schedules, reminders, streaks, calendar, goals, consistency, insights | Non-punitive tracking, recovery and consistency beyond streaks |

# Appendix B — Sources

These sources are feature-pattern references. OLAA should not copy proprietary UI, branding, content or implementation.

- **Notion Product Features:** https://www.notion.com/product/features  
  Docs, databases, search, backlinks, dashboards, history, AI and automation patterns.
- **Notion App Store:** https://apps.apple.com/us/app/notion-notes-tasks-ai/id1232780281  
  Notes, tasks, templates, search, imports, AI and cross-device usage.
- **Apple Apps in Business guide:** https://www.apple.com/vn/business/site/docs/resources/Apps_in_Business_Getting_Started_Guide.pdf  
  Examples of note-taking, handwriting, PDF annotation, audio and sketch patterns.
- **NoteApps comparison — researchers:** https://noteapps.info/showdown/best-note-taking-apps-for-researchers  
  Broad feature comparison across note and knowledge-management products.

# Appendix C — Feature audit template

| Requirement ID | Status | Evidence | Owner | Next action |
|---|---|---|---|---|
| Example: TN-CORE-003 Autosave | Not audited | File/test/API path | TBD | Verify local persistence, recovery and sync |
|  |  |  |  |  |
|  |  |  |  |  |

Status values: Implemented · Partial · UI-only · Not implemented · Blocked · Deferred.

---

**End of PRD v1.0**
