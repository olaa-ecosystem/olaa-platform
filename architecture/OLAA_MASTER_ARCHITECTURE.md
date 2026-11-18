# OLAA MASTER ARCHITECTURE

> Tài liệu kiến trúc gốc cho Olaa Ecosystem — Olaa Language, Olaa Habits và Olaa TakeNote.

**Trạng thái:** Architecture baseline / bộ khung định hướng. **Phạm vi:** thiết kế kiến trúc, chưa phải đặc tả triển khai hoàn chỉnh. **Nguyên tắc:** audit và bảo toàn chức năng/dữ liệu hiện có trước khi refactor.

**Nguồn gốc:** chuyển từ `ATOZ_MASTER_ARCHITECTURE.md` (2026-11-17). Thay đổi so với bản AtoZ: đổi thương hiệu AtoZ → Olaa (ADR-0002), đổi tên app English → Language, và thay mô hình monorepo bằng mô hình 4 repository (ADR-0001). Hệ thống 22 nhánh, mã số 00–21 và phạm vi nghiệp vụ được giữ nguyên.

## 1. Mục tiêu và mô hình sản phẩm

- **Olaa Language:** học ngoại ngữ.
- **Olaa Habits:** xây dựng và theo dõi thói quen.
- **Olaa TakeNote:** ghi chú, viết tay và tài liệu; ưu tiên iPad/Apple Pencil.
- **Olaa Platform:** lớp nền tảng hợp nhất đăng nhập, workspace, điều hướng, cài đặt và quyền truy cập.

Ba app là ba module sản phẩm riêng biệt nhưng chạy trong một hệ sinh thái thống nhất. `admin-console` chỉ dành cho vận hành nội bộ, không phải app sản phẩm thứ tư.

## 2. Kiến trúc nguyên tắc

- Ba sản phẩm người dùng cuối là Olaa Language, Olaa Habits và Olaa TakeNote. Mỗi app có repository, module, route, UI và domain logic riêng.

- Người dùng cảm nhận đây là một hệ sinh thái thống nhất thông qua Olaa Platform, identity, workspace, navigation và Shared Core.

- 22 nhánh là 22 miền trách nhiệm logic, không đồng nghĩa với 22 repository, 22 database hay 22 microservices.

- Mã nguồn được chia thành 4 repository (ADR-0001). Backend khởi đầu là modular monolith trong `olaa-platform`. Chỉ tách service độc lập khi có nhu cầu scale, deploy, team ownership hoặc isolation rõ ràng.

- Backend là lớp duy nhất truy cập trực tiếp database chính. Frontend gọi API; không nhúng credential database vào client.

- Database ownership theo domain. Ban đầu có thể dùng một PostgreSQL cluster với schema/domain boundaries; không cần tạo database vật lý riêng cho từng app.

- TakeNote ưu tiên offline-first cho thao tác ghi chú. Bản đầu nên có autosave, versioning, conflict detection và recovery; chỉ cân nhắc CRDT khi có collaboration đồng thời thực sự.

- Quyền truy cập phải được kiểm tra ở backend. UI gating chỉ hỗ trợ trải nghiệm, không phải ranh giới bảo mật.

- Product analytics không thay thế observability. Nội dung ghi chú riêng tư không được thu thập làm analytics mặc định.

- Security, privacy, QA và documentation là yêu cầu xuyên suốt mọi giai đoạn, không phải các bước chỉ làm ở cuối.

## 3. Cấu trúc repository

Olaa dùng 4 repository trong GitHub organization `olaa-ecosystem` (ADR-0001):

| Repository | Vai trò | Nhánh sở hữu mã nguồn |
|---|---|---|
| `olaa-platform` | Kiến trúc 22 nhánh, ADR, contracts, shared packages, backend, database, hạ tầng, platform shell, admin console | 00, 04–21 |
| `olaa-language` | Ứng dụng Olaa Language | 01 |
| `olaa-habits` | Ứng dụng Olaa Habits | 02 |
| `olaa-takenote` | Ứng dụng Olaa TakeNote | 03 |

Tài liệu kiến trúc của cả 22 nhánh nằm trong `olaa-platform/architecture/`. Với nhánh 01–03, thư mục kiến trúc chỉ giữ đặc tả và liên kết; mã nguồn nằm ở repository app tương ứng. Không có bản sao mã nguồn giữa các repository.

### 3.1 `olaa-platform` (cấu trúc mục tiêu)

```text
olaa-platform/
├── architecture/                 # 22 nhánh, registry, dependency map, ADR
│   ├── 00-olaa-platform/ … 21-search-media-processing/
│   ├── DECISIONS/
│   ├── MODULE_REGISTRY.md
│   ├── DEPENDENCY_MAP.md
│   ├── IMPLEMENTATION_STATUS.md
│   └── INTEGRATION_CHANGELOG.md
├── apps/
│   ├── platform-shell/           # app shell, unified workspace and navigation
│   └── admin-console/            # internal operations only
├── packages/                     # shared core, consumed by the three app repos
│   ├── design-system/
│   ├── shared-ui/
│   ├── shared-types/
│   ├── api-client/
│   ├── sdk/
│   ├── authentication/
│   ├── authorization/
│   ├── event-bus/
│   ├── storage/
│   ├── localization/
│   ├── accessibility/
│   ├── device-management/
│   └── utilities/
├── services/
│   ├── api-gateway/
│   ├── identity/
│   ├── platform/
│   ├── language/
│   ├── habits/
│   ├── notes/
│   ├── sync/
│   ├── billing/
│   ├── notifications/
│   ├── integrations/
│   ├── analytics/
│   ├── media/
│   ├── ai/                       # optional; add when justified
│   └── background-jobs/
├── contracts/                    # canonical API/event contracts
├── content/
├── database/
├── infrastructure/
├── scripts/
├── .github/
├── CLAUDE.md
├── README.md
└── .env.example
```

Các thư mục ngoài `architecture/` chỉ được tạo khi nhánh tương ứng bắt đầu triển khai. Không tạo thư mục rỗng hay service giả.

### 3.2 Repository app (`olaa-language`, `olaa-habits`, `olaa-takenote`)

Mỗi repository app chứa mã nguồn, test và tài liệu sản phẩm của riêng app đó, cùng `CLAUDE.md` trỏ về `olaa-platform/architecture/`. App dùng Shared Core qua package đã phát hành và gọi backend qua contract trong `olaa-platform/contracts/`; không import mã nội bộ của app khác.

### 3.3 Quyết định còn mở

- Cách phát hành shared packages cho các repository app (GitHub Packages, npm registry riêng, hay git dependency).
- Backend của Language/Habits/TakeNote nằm trong `olaa-platform/services/` hay trong repository app.
- Cơ chế đồng bộ phiên bản contract giữa các repository.

## 4. Danh mục 22 nhánh và nhánh con

### 00 — OLAA PLATFORM
Lớp điều phối trung tâm; khởi tạo ứng dụng, định tuyến, tài khoản, workspace và trải nghiệm thống nhất.

- **00.01 platform-core** — App bootstrap, lifecycle, runtime configuration, environment, global state, feature flags và app shell.

- **00.02 application-management** — App registry, module registration, navigation, routing, deep links, app permissions và khả năng bật/tắt module.

- **00.03 identity-management** — Đăng ký, đăng nhập, đăng xuất, khôi phục tài khoản, session, device sessions và account lifecycle.

- **00.04 user-workspace** — Dashboard, hồ sơ, cài đặt, preferences, personalization và workspace cá nhân.

- **00.05 tenant-management** — Personal workspace, organization workspace, membership, invitations, role assignment và workspace switching.

- **00.06 platform-experience** — Onboarding, global navigation, notification center, help, empty states, error pages và responsive shell.

- **00.07 platform-configuration** — Environment config, remote config, feature flags, app version compatibility và capability detection.

### 01 — OLAA LANGUAGE
Ứng dụng học ngoại ngữ độc lập, dùng chung nền tảng tài khoản, dữ liệu người dùng và design system.

- **01.01 learning-foundation** — Learning session, learning objectives, study plans, learner profile và learning preferences.

- **01.02 curriculum** — CEFR/level mapping, course, unit, lesson, prerequisite, lesson sequencing, curriculum versioning và release.

- **01.03 vocabulary** — Word entries, meanings, examples, collocations, pronunciation, word lists và vocabulary mastery.

- **01.04 grammar** — Grammar topics, explanations, patterns, examples, difficulty levels và prerequisite relationships.

- **01.05 listening** — Audio lessons, transcripts, comprehension tasks, playback controls, speed và listening progress.

- **01.06 speaking** — Pronunciation practice, recording, speech evaluation, speaking prompts và feedback.

- **01.07 reading** — Reading passages, graded texts, comprehension, annotations và reading progress.

- **01.08 writing** — Writing prompts, drafts, corrections, rubrics, feedback và writing history.

- **01.09 exercises** — Exercise types, question bank, answer validation, hints, attempts và scoring.

- **01.10 assessment** — Placement tests, quizzes, exams, skill assessments, score reports và retake policies.

- **01.11 flashcards** — Card decks, review queue, spaced repetition, recall rating và due scheduling.

- **01.12 learning-progress** — Lesson completion, skill progress, mastery, time-on-task và learning history.

- **01.13 learning-intelligence** — Adaptive recommendations, weak-area detection, revision suggestions và learning insights.

- **01.14 language-settings** — Language preferences, study reminders, audio preferences, accessibility và learning settings.

### 02 — OLAA HABITS
Ứng dụng hình thành thói quen, quản lý mục tiêu và theo dõi tiến trình cá nhân.

- **02.01 habit-management** — Create/edit/archive habits, categories, descriptions, icons và habit lifecycle.

- **02.02 scheduling** — Daily/weekly/custom schedules, frequency, start dates, end dates và timezone rules.

- **02.03 habit-tracking** — Check-ins, completion status, partial progress, notes, evidence và correction history.

- **02.04 streaks** — Current/best streak, grace days, missed-day rules và streak calculation.

- **02.05 goals** — Outcome goals, milestones, target values, deadlines và progress measurement.

- **02.06 routines** — Morning/evening routines, ordered steps, templates và routine execution.

- **02.07 calendar** — Calendar views, daily summaries, planned activities và habit history.

- **02.08 reminders** — Local/push/email reminders, quiet hours, snooze và delivery preferences.

- **02.09 statistics** — Completion rates, consistency, trends, period comparisons và charts.

- **02.10 gamification** — Points, badges, levels, achievements và opt-in reward mechanics.

- **02.11 insights** — Pattern detection, habit correlations, friction signals và actionable suggestions.

- **02.12 habits-settings** — Tracking preferences, week start, timezone, privacy và notification settings.

### 03 — OLAA TAKENOTE
Ứng dụng ghi chú ưu tiên iPad, hỗ trợ ghi tay bằng Apple Pencil, văn bản, tài liệu và tổ chức tri thức.

- **03.01 notebook-management** — Notebooks, folders, collections, notebook metadata và lifecycle.

- **03.02 note-management** — Create/edit/duplicate/archive notes, note metadata, templates và note lifecycle.

- **03.03 rich-text-editor** — Text blocks, formatting, lists, tables, links, embeds và editor commands.

- **03.04 digital-canvas** — Infinite/fixed canvas, pages, layers, shapes, selection, zoom, pan và object transforms.

- **03.05 apple-pencil** — Ink strokes, pressure, tilt, palm rejection, eraser, PencilKit/native input integration và latency.

- **03.06 inking-tools** — Pen, pencil, highlighter, color palette, stroke width, lasso, ruler và tool presets.

- **03.07 page-management** — Page sizes, page templates, reorder, duplicate, thumbnails và page navigation.

- **03.08 document-annotation** — PDF import, PDF rendering, markup, highlights, signatures và export.

- **03.09 attachments** — Images, audio, files, scans, embedded media và attachment metadata.

- **03.10 organization** — Tags, backlinks, internal links, favorites, pinning và cross-note references.

- **03.11 search** — Title/body search, tags, OCR text, handwriting indexing và filters.

- **03.12 history-recovery** — Autosave, undo/redo, version history, recovery snapshots và conflict warnings.

- **03.13 export-sharing** — PDF/image export, share sheets, collaboration-ready sharing permissions và export presets.

- **03.14 offline-sync** — Offline-first editing, local cache, sync queue, conflict detection và retry.

- **03.15 takenote-settings** — Canvas defaults, pen defaults, page defaults, backup, sync và accessibility.

### 04 — SHARED CORE
Các năng lực dùng chung được đóng gói thành thư viện/module; không để ba ứng dụng tự xây lại cùng một chức năng.

- **04.01 design-system** — Tokens, typography, color, spacing, themes, component states và design governance.

- **04.02 shared-ui** — Navigation components, forms, dialogs, tables, calendars, editors' primitives và reusable patterns.

- **04.03 authentication** — Client auth flows, token lifecycle, secure session handling và identity SDK.

- **04.04 authorization** — Permission model, role checks, policy evaluation và client-side capability gating.

- **04.05 user-management** — Profile primitives, preferences, account settings và user data access.

- **04.06 api-client** — Typed API client, request middleware, retries, error normalization và caching.

- **04.07 storage** — Local storage abstractions, secure storage, file upload/download và cache policies.

- **04.08 event-system** — Typed domain events, event dispatch, subscriptions và cross-module communication.

- **04.09 notifications** — Notification models, templates, preferences, in-app and push abstractions.

- **04.10 localization** — Locale management, translation resources, formatting và language fallback.

- **04.11 accessibility** — Keyboard navigation, screen reader semantics, contrast, scalable text và reduced motion.

- **04.12 device-management** — Device capability detection, platform adaptation, device sessions và app capability registry.

- **04.13 utilities** — Date/time, validation, formatting, identifiers, error helpers và common primitives.

### 05 — BACKEND SERVICES
Backend xử lý nghiệp vụ và dữ liệu; giai đoạn đầu ưu tiên modular monolith với ranh giới domain rõ ràng.

- **05.01 api-gateway** — API entry point, routing, rate limiting, request validation và API version dispatch.

- **05.02 identity-service** — Authentication, sessions, account recovery và identity lifecycle.

- **05.03 platform-service** — User workspace, tenant, membership, preferences và platform configuration.

- **05.04 language-service** — Curriculum, lessons, exercises, attempts, progress và learning recommendations.

- **05.05 habits-service** — Habits, schedules, check-ins, goals, routines và habit analytics.

- **05.06 notes-service** — Notebooks, notes, pages, blocks, ink metadata, attachments và note versions.

- **05.07 sync-service** — Sync protocol, change tracking, conflict detection, idempotency và device sync state.

- **05.08 billing-service** — Plans, subscriptions, invoices, payment state và entitlement source of truth.

- **05.09 notification-service** — Notification orchestration, templates, delivery providers và retry policies.

- **05.10 integration-service** — Provider adapters, OAuth connections, webhooks và integration lifecycle.

- **05.11 analytics-service** — Product events, aggregation, reporting APIs và analytics pipelines.

- **05.12 media-service** — Upload authorization, file processing, metadata, thumbnails và media lifecycle.

- **05.13 ai-service** — Optional AI capabilities, model/provider abstraction, safety, usage limits và evaluation.

- **05.14 background-jobs** — Scheduled jobs, queues, retries, dead-letter handling và job observability.

### 06 — CONTENT MANAGEMENT
Quản lý nội dung học tập có cấu trúc, kiểm duyệt, phiên bản và phát hành độc lập với code ứng dụng.

- **06.01 content-architecture** — Content schemas, content types, identifiers, relationships và schema evolution.

- **06.02 taxonomy** — Levels, skills, topics, tags, categories và controlled vocabularies.

- **06.03 authoring** — Authoring workflows, drafts, reusable blocks và editorial tools.

- **06.04 content-library** — Central content repository, assets, metadata và content discovery.

- **06.05 versioning** — Content versions, change history, compatibility và rollback.

- **06.06 validation** — Schema validation, link checks, sequence checks, completeness và quality rules.

- **06.07 review-approval** — Editorial review, approval states, reviewer assignment và audit trail.

- **06.08 publishing** — Release channels, scheduling, publish/unpublish và delivery manifests.

- **06.09 localization** — Translation workflow, locale completeness và terminology management.

- **06.10 import-export** — Bulk import/export, format mapping, migration và content portability.

### 07 — DATABASE ARCHITECTURE
Quản trị schema, ownership, migration, tenancy, backup và tính toàn vẹn dữ liệu.

- **07.01 database-strategy** — Logical topology, database selection, environment separation và data access principles.

- **07.02 domain-ownership** — Identity, platform, Language, Habits, TakeNote, billing, integration và analytics ownership.

- **07.03 schemas** — Domain schemas, naming conventions, constraints, relationships và lifecycle fields.

- **07.04 tenancy-model** — Personal workspace, organization tenant, user ownership, tenant ownership và public data boundaries.

- **07.05 migrations** — Versioned migrations, forward/backward strategy, review, deployment order và rollback planning.

- **07.06 indexing-performance** — Indexes, query plans, pagination, partitioning criteria và performance budgets.

- **07.07 data-access** — Repository/data access layer, transactions, connection pooling và access boundaries.

- **07.08 sync-data** — Change logs, version columns, idempotency keys, sync cursors và conflict metadata.

- **07.09 object-storage** — Object keys, metadata, lifecycle, signed URLs và media retention.

- **07.10 backup-recovery** — Backup policy, point-in-time recovery, restore drills và recovery objectives.

- **07.11 data-quality** — Constraints, deduplication, integrity checks, reconciliation và data repair.

- **07.12 retention-deletion** — Retention schedules, user export, deletion workflows, legal holds và auditability.

### 08 — SECURITY
Bảo vệ tài khoản, dữ liệu, tenant, API và hạ tầng theo threat model; security là yêu cầu xuyên suốt.

- **08.01 security-architecture** — Security principles, trust boundaries, threat modeling và security architecture review.

- **08.02 authentication-security** — MFA strategy, password/session controls, token rotation và account protection.

- **08.03 authorization** — RBAC/ABAC policies, least privilege, permission checks và policy tests.

- **08.04 tenant-isolation** — Tenant context validation, row-level security where appropriate và fail-closed behavior.

- **08.05 application-security** — Input validation, output encoding, CSRF, XSS, SSRF và secure defaults.

- **08.06 api-security** — Rate limits, scopes, API keys, OAuth scopes, abuse prevention và schema validation.

- **08.07 data-security** — Encryption in transit/at rest, sensitive data handling, key management và access logging.

- **08.08 secrets-management** — Secret storage, rotation, environment separation và secret scanning.

- **08.09 security-monitoring** — Audit events, suspicious activity detection, alerting và incident evidence.

- **08.10 security-testing** — SAST, DAST, dependency scanning, container scanning, penetration testing và remediation.

- **08.11 incident-response** — Incident severity, containment, communication, recovery và post-incident review.

### 09 — DEVOPS & INFRASTRUCTURE
Tự động hóa môi trường, build, test, deploy, release và vận hành hạ tầng.

- **09.01 environments** — Local, development, staging, production và preview environments.

- **09.02 infrastructure-as-code** — Repeatable infrastructure definitions, review, state management và drift detection.

- **09.03 containers-runtime** — Build images, runtime configuration, health checks và resource limits.

- **09.04 ci-cd** — Lint, typecheck, tests, build, security gates và deployment pipelines.

- **09.05 deployment** — Deployment strategies, migrations, rollback và release verification.

- **09.06 release-management** — Versioning, changelog, release notes, feature rollout và app store/web release coordination.

- **09.07 cloud-infrastructure** — Compute, network, database, object storage, CDN và managed services.

- **09.08 scaling** — Capacity planning, autoscaling, caching và load distribution.

- **09.09 cost-management** — Budgets, usage tracking, cost alerts và resource optimization.

### 10 — QUALITY ASSURANCE
Đảm bảo chức năng, dữ liệu, trải nghiệm và tương thích thiết bị trước và sau phát hành.

- **10.01 test-strategy** — Test pyramid, risk-based testing, coverage expectations và quality gates.

- **10.02 unit-tests** — Domain logic, utilities, calculations và isolated components.

- **10.03 integration-tests** — Database, API, queues, storage, auth và provider integrations.

- **10.04 end-to-end** — Critical user journeys across Platform, Language, Habits và TakeNote.

- **10.05 regression** — Regression suites, release checks và defect prevention.

- **10.06 performance-load** — Latency, throughput, load, stress, memory và rendering performance.

- **10.07 security-privacy-tests** — Authorization, tenant isolation, privacy workflows và security regressions.

- **10.08 accessibility** — Keyboard, screen reader, contrast, text scaling và motion preferences.

- **10.09 cross-device** — Desktop, mobile, iPad, browser engines, touch, stylus và responsive layouts.

- **10.10 offline-sync-tests** — Offline editing, reconnect, duplicate delivery, conflicts và data recovery.

- **10.11 data-integrity** — Migration tests, backup restore, import/export và consistency checks.

- **10.12 user-acceptance** — Acceptance criteria, pilot feedback, sign-off và release readiness.

### 11 — DEVELOPER EXPERIENCE
Chuẩn hóa cách phát triển để người vận hành và Claude Code có thể hiểu, sửa và mở rộng hệ thống an toàn.

- **11.01 local-development** — Setup guide, prerequisites, environment bootstrap và seed data.

- **11.02 cli-scripts** — Development commands, generators, migration scripts và maintenance utilities.

- **11.03 code-quality** — Formatting, linting, type checking, naming, module boundaries và code review standards.

- **11.04 debugging** — Debug configurations, local logs, tracing, fixtures và troubleshooting.

- **11.05 developer-environments** — Dev containers, reproducible setup và isolated test environments.

- **11.06 claude-code-workflows** — CLAUDE.md, project instructions, task templates, context boundaries và agent workflows.

- **11.07 ai-coding-guardrails** — No destructive changes without approval, test-before-merge, source-of-truth rules và change summaries.

- **11.08 onboarding** — Repository tour, architecture map, first task guide và contributor setup.

### 12 — DOCUMENTATION & ARCHITECTURE
Nguồn tài liệu chuẩn của hệ thống, giúp con người và công cụ AI cùng hiểu đúng thiết kế.

- **12.01 master-architecture** — System context, module map, ownership, dependencies và architecture principles.

- **12.02 technical-specifications** — Module requirements, workflows, edge cases và non-functional requirements.

- **12.03 adr** — Architecture Decision Records, alternatives, rationale, consequences và status.

- **12.04 diagrams** — System context, containers, components, data flows, sequence và deployment diagrams.

- **12.05 api-database-docs** — API references, schema references, event contracts và migration guides.

- **12.06 developer-guides** — Setup, coding, testing, contribution và release guides.

- **12.07 operations-runbooks** — Deployment, backup, restore, incident, monitoring và maintenance runbooks.

- **12.08 user-documentation** — Help center, feature guides, onboarding instructions và FAQs.

- **12.09 changelog** — Product changes, breaking changes, migration notices và release history.

### 13 — GITHUB & SOURCE GOVERNANCE
Quản lý repository, quyền thay đổi, review, lịch sử và chất lượng mã nguồn.

- **13.01 repository-structure** — Repository layout (4 repositories), app/package/service boundaries và ownership.

- **13.02 branch-strategy** — Main/develop/feature/hotfix strategy phù hợp quy mô nhóm.

- **13.03 commit-conventions** — Commit format, scopes, semantic intent và traceability.

- **13.04 pull-requests** — PR template, change description, test evidence và reviewer requirements.

- **13.05 code-ownership** — CODEOWNERS, protected branches, required checks và approval rules.

- **13.06 version-control** — Tags, releases, changelog, revert strategy và repository hygiene.

- **13.07 dependency-governance** — Dependency updates, license review, vulnerability policy và lockfile discipline.

- **13.08 repository-audits** — Periodic structure audits, stale code detection, secret scans và governance reports.

### 14 — SAAS & MONETIZATION
Quản lý gói dịch vụ, thanh toán, quyền lợi và đo lường sử dụng thương mại.

- **14.01 product-plans** — Free/paid tiers, plan definitions, plan lifecycle và plan comparison.

- **14.02 pricing** — Pricing rules, regional pricing, taxes and display policy.

- **14.03 subscriptions** — Subscribe, upgrade, downgrade, pause, cancel và renewal lifecycle.

- **14.04 billing-payments** — Payment provider integration, payment intents, payment status và reconciliation.

- **14.05 invoices-refunds** — Invoices, receipts, refunds, disputes và billing history.

- **14.06 entitlements** — Feature access, quotas, limits, add-ons và entitlement evaluation.

- **14.07 usage-metering** — Usage counters, quota windows, overage rules và usage reporting.

- **14.08 trials-promotions** — Trials, coupons, campaigns, grace periods và promotional eligibility.

- **14.09 revenue-analytics** — MRR/ARR, churn, conversion, retention và revenue reporting.

### 15 — ADMIN & CUSTOMER SUPPORT
Giao diện nội bộ và quy trình vận hành; không phải app sản phẩm thứ tư cho người dùng cuối.

- **15.01 admin-console** — Internal admin shell, secure access, navigation và operational dashboards.

- **15.02 user-tenant-admin** — User lookup, tenant management, membership và account support actions.

- **15.03 roles-permissions** — Admin roles, privileged actions, approval gates và separation of duties.

- **15.04 content-admin** — Content review, publishing, corrections và content quality operations.

- **15.05 subscription-admin** — Subscription lookup, billing support, entitlement inspection và refunds workflow.

- **15.06 support-tickets** — Ticket intake, assignment, status, SLA tracking và customer communication.

- **15.07 feedback-announcements** — Feedback collection, product announcements, service notices và release communication.

- **15.08 moderation** — Abuse reports, content moderation, enforcement và appeals where applicable.

- **15.09 audit-viewer** — Admin action history, security events và compliance evidence.

- **15.10 internal-operations** — Operational checklists, escalation paths và support knowledge base.

### 16 — INTEGRATIONS
Kết nối nhà cung cấp bên ngoài qua adapter có kiểm soát, không để vendor lock-in lan vào domain.

- **16.01 integration-architecture** — Provider abstraction, adapter boundaries, capability mapping và provider registry.

- **16.02 authentication-providers** — OAuth/OIDC providers, redirect handling và token lifecycle.

- **16.03 payment-providers** — Payment gateways, webhooks, reconciliation và provider failover considerations.

- **16.04 email-push-providers** — Transactional email, push delivery, templates và delivery status.

- **16.05 storage-providers** — Object storage, signed access, upload callbacks và provider abstraction.

- **16.06 calendar-providers** — Calendar read/write scopes, event mapping và sync rules.

- **16.07 ai-providers** — Model providers, routing, cost controls, privacy constraints và fallbacks.

- **16.08 webhooks** — Signature verification, replay protection, idempotency và event delivery.

- **16.09 integration-operations** — Retries, circuit breakers, rate limits, provider health và failure queues.

### 17 — DATA & PRODUCT ANALYTICS
Đo lường hành vi và hiệu quả sản phẩm; tách biệt với monitoring kỹ thuật.

- **17.01 event-tracking** — Event taxonomy, naming, schemas, consent and collection rules.

- **17.02 product-analytics** — Activation, engagement, retention, funnels và feature adoption.

- **17.03 language-analytics** — Learning activity, skill progress, lesson completion và content effectiveness.

- **17.04 habits-analytics** — Habit consistency, completion trends, goal progress và routine usage.

- **17.05 takenote-analytics** — Notebook activity, note creation, editing patterns và feature adoption; tránh thu thập nội dung riêng tư.

- **17.06 business-analytics** — Plans, conversion, subscription lifecycle, churn và revenue.

- **17.07 dashboards** — Product, learning, habits, notes và business dashboards.

- **17.08 aggregation-export** — Aggregations, scheduled reports, export và data access controls.

- **17.09 analytics-governance** — Event documentation, retention, consent, minimization và access policy.

### 18 — OBSERVABILITY & RELIABILITY
Theo dõi sức khỏe kỹ thuật, độ tin cậy và chất lượng dịch vụ theo thời gian.

- **18.01 logging** — Structured logs, correlation IDs, redaction và retention.

- **18.02 metrics** — Service, infrastructure, application and business-operational metrics.

- **18.03 distributed-tracing** — Trace context, span conventions và cross-service diagnosis.

- **18.04 error-monitoring** — Exception capture, grouping, release tracking và regression alerts.

- **18.05 performance-monitoring** — Frontend performance, API latency, database performance và sync latency.

- **18.06 uptime-health** — Health/readiness checks, synthetic checks và availability reporting.

- **18.07 alerting** — Alert thresholds, routing, escalation và noise reduction.

- **18.08 incidents** — Incident lifecycle, on-call procedures, communication và postmortems.

- **18.09 slis-slos** — Service indicators, objectives, error budgets và reliability reviews.

- **18.10 capacity** — Capacity trends, saturation, scaling triggers và resilience testing.

### 19 — PRIVACY & DATA GOVERNANCE
Quy định dữ liệu được thu thập, sử dụng, chia sẻ, lưu trữ, xuất và xóa.

- **19.01 data-classification** — Public, internal, confidential and sensitive data categories.

- **19.02 data-ownership** — User-owned, tenant-owned, platform-owned and public content ownership.

- **19.03 access-policy** — Purpose limitation, least privilege, internal access and audit requirements.

- **19.04 consent-preferences** — Consent records, privacy settings, communication preferences và withdrawal.

- **19.05 retention** — Retention schedules by data category and legal/business requirements.

- **19.06 export-deletion** — User data export, account deletion, erasure propagation and verification.

- **19.07 privacy-by-design** — Data minimization, privacy impact reviews and default-private note content.

- **19.08 legal-compliance** — Privacy notices, terms, cookies where relevant and jurisdictional review.

- **19.09 governance-audit** — Policy ownership, review cadence, evidence and compliance tracking.

### 20 — API & INTEGRATION CONTRACTS
Định nghĩa các giao kèo ổn định giữa app, backend, packages và đối tác.

- **20.01 api-standards** — REST conventions, naming, pagination, filtering, auth and rate-limit headers.

- **20.02 request-response-schemas** — Typed request/response schemas, validation and examples.

- **20.03 error-contracts** — Stable error codes, error envelope, retryability and user-safe messages.

- **20.04 event-contracts** — Domain event names, payload schemas, versioning and delivery guarantees.

- **20.05 shared-types** — Code-level shared types generated or maintained from canonical contracts.

- **20.06 api-versioning** — Compatibility policy, deprecation windows and migration guidance.

- **20.07 contract-testing** — Consumer/provider tests, schema checks and compatibility gates.

- **20.08 sdk-contracts** — Client SDK behavior, auth integration, retries and error normalization.

- **20.09 partner-integration-specs** — External integration specs, webhook payloads and security requirements.

### 21 — SEARCH & MEDIA PROCESSING
Tìm kiếm toàn hệ sinh thái và xử lý tệp, hình ảnh, âm thanh, PDF, OCR và chữ viết tay.

- **21.01 search-architecture** — Global search, domain search, indexing pipeline, ranking and permissions filtering.

- **21.02 full-text-search** — Indexing titles, descriptions and permitted text content.

- **21.03 handwriting-recognition** — Handwriting recognition pipeline, language support, confidence and correction UX.

- **21.04 ocr** — OCR for images/PDF, text extraction, language detection and confidence handling.

- **21.05 image-processing** — Validation, resizing, thumbnails, metadata stripping and format conversion.

- **21.06 audio-processing** — Audio validation, transcoding, waveform/metadata and speech-related processing.

- **21.07 video-processing** — Video validation, transcoding, thumbnails and playback delivery if needed.

- **21.08 pdf-processing** — PDF validation, rendering, page extraction, annotation layer and export.

- **21.09 file-security** — MIME validation, size limits, malware scanning and safe download policies.

- **21.10 media-lifecycle** — Upload states, processing jobs, storage lifecycle, retention and deletion.

## 5. Ownership và ranh giới trách nhiệm

| Nhánh | Owner đề xuất | Phụ thuộc chính | Ranh giới sở hữu |
|---|---|---|---|
| 00 Platform | Platform team / platform domain | Identity, Shared Core, Contracts | Global shell, app registry, workspace and tenant context. |
| 01 Language | Language domain | Platform, Shared Core, Content, Backend, Database | Curriculum and learner progress; owns Language business rules. |
| 02 Habits | Habits domain | Platform, Shared Core, Backend, Database, Notifications | Habit schedules, check-ins, goals and habit calculations. |
| 03 TakeNote | TakeNote domain | Platform, Shared Core, Backend, Database, Sync, Media, Search | Notes, pages, blocks, ink metadata and note versions. |
| 04 Shared Core | Platform engineering | Platform, Contracts | Reusable libraries; must not own product-specific business rules. |
| 05 Backend | Backend/domain owners | Contracts, Database, Security, Integrations | Server-side business logic and API implementation. |
| 06 Content | Learning/content operations | Language, Contracts, Database, QA | Learning content lifecycle; not general application source code. |
| 07 Database | Data/platform engineering | All domain owners, Security | Schema/migrations/backup; domain teams own their data definitions. |
| 08 Security | Security owner (initially designated maintainer) | All branches | Cross-cutting controls, policies, threat model and security gates. |
| 09 DevOps | Platform/operations | Backend, QA, Security, Observability | Build/deploy/runtime infrastructure. |
| 10 QA | Quality owner + domain contributors | All apps/services | Test strategy and release quality gates. |
| 11 Developer Experience | Repository maintainer | GitHub, Docs, CI/CD | Developer workflows, Claude Code rules and tooling. |
| 12 Documentation | Architecture owner + domain owners | All branches | Canonical architecture, ADRs and operational documentation. |
| 13 GitHub Governance | Repository maintainer | Developer Experience, QA, Security | Source control, review and repository policy. |
| 14 SaaS | Commerce/billing domain | Platform, Backend, Integrations, Admin | Plans, subscriptions, billing and entitlements. |
| 15 Admin | Operations/support owner | Platform, SaaS, Security, Analytics | Internal console and support operations. |
| 16 Integrations | Integration owner | Backend, Security, Contracts | External provider adapters, webhooks and retries. |
| 17 Analytics | Product/data owner | All product domains, Privacy | Product/business measurement with privacy controls. |
| 18 Observability | SRE/operations owner | Backend, DevOps, Security | Technical health, reliability and incidents. |
| 19 Privacy | Privacy/data governance owner | All domains, Security, Legal | Data lifecycle, consent, retention and deletion. |
| 20 Contracts | Architecture/API owner | All app and service owners | Canonical external interfaces and compatibility rules. |
| 21 Search & Media | Search/media owner | TakeNote, Language, Backend, Storage, Privacy | Indexing and media processing pipelines. |

## 6. Quy tắc database và dữ liệu

- Khuyến nghị PostgreSQL làm relational source of truth ban đầu; IndexedDB/local database cho offline client; S3-compatible object storage cho file lớn, ảnh, PDF và tài sản canvas.

- Bắt đầu với một PostgreSQL cluster/database và schema/domain boundaries; chưa cần database vật lý riêng cho từng app.

- Mỗi domain sở hữu logic và schema của dữ liệu nghiệp vụ mình; migrations phải được review, version hóa và chạy qua pipeline.

- Phân biệt dữ liệu thuộc user, tenant/organization, platform và public content. Không thêm `tenant_id` máy móc vào mọi bảng.

- Tenant context phải được xác thực ở backend; nếu dùng PostgreSQL RLS, thiết lập context an toàn theo transaction và mặc định fail closed.

- Frontend không kết nối trực tiếp database chính. Mọi truy cập đi qua API/service được xác thực và phân quyền.

- Thiết kế export, deletion, retention, backup, point-in-time recovery và restore drill từ đầu.

## 7. API, event và contract ownership

- `olaa-platform/contracts/` là nguồn chuẩn cho API/event contracts được chia sẻ giữa các app, backend và đối tác.

- `olaa-platform/packages/shared-types/` chứa types dùng trong code; nên sinh từ schema chuẩn hoặc đồng bộ qua kiểm định, không trở thành nguồn schema cạnh tranh.

- `olaa-platform/database/` sở hữu migrations và schema triển khai; không sao chép migration vào `contracts/`.

- Repository app không tự định nghĩa lại contract dùng chung; chỉ tiêu thụ phiên bản đã phát hành.

- Mọi API cần request/response schema, error contract, auth requirements, versioning và compatibility policy.

- Event cần tên ổn định, schema có version, idempotency/delivery semantics và quy định retry.

## 8. Security, privacy và quality gates

- Server-side authorization là bắt buộc; ẩn nút ở frontend không phải kiểm soát bảo mật.

- Áp dụng least privilege, secrets management, encryption, audit log, rate limiting, dependency scanning và secure defaults.

- Tách product analytics khỏi technical observability. Không gửi nội dung note, bản viết tay hoặc tài liệu riêng tư vào analytics mặc định.

- CI tối thiểu cho mỗi repository: format/lint, typecheck, unit tests, integration tests cần thiết, build và dependency/security checks.

- Release gate: regression các luồng trọng yếu, tenant isolation, backup/restore evidence, accessibility và cross-device checks.

## 9. Roadmap triển khai

### Phase 0 — Audit & baseline
Inventory existing Olaa Language source, data, routes, features, dependencies and build process. Record current behavior before refactoring.
**Đầu ra:** No feature removal; baseline build and regression checklist.

### Phase 1 — Repository foundation
Set up the four repositories, package manager, TypeScript/build conventions, platform shell, shared core packages, CLAUDE.md, CI checks and architecture docs.
**Đầu ra:** All three app shells start; shared navigation and lint/typecheck/build work.

### Phase 2 — Contracts & data foundation
Define domain ownership, API schemas, error/event contracts, PostgreSQL schema boundaries, migrations, auth/tenant model and data lifecycle.
**Đầu ra:** Typed API contracts, migration workflow, tenant authorization tests.

### Phase 3 — Backend & security baseline
Implement modular backend domains, identity, platform, core APIs, secrets, authorization, audit events, rate limits and backup.
**Đầu ra:** Secure end-to-end flow from login to app data; tested restore procedure.

### Phase 4 — Product modules
Refactor Olaa Language into its domain; implement Habits; implement TakeNote core editor/notebooks/pages and iPad input strategy.
**Đầu ra:** Three independently navigable apps sharing one account/workspace.

### Phase 5 — Sync, media & content
Add offline sync, conflict handling, attachments/PDF, content publishing/validation, search and OCR only where justified.
**Đầu ra:** Offline and recovery test suites pass; content release workflow operational.

### Phase 6 — SaaS & operations
Add plans, subscriptions, entitlements, admin console, support workflows, analytics, observability and incident runbooks.
**Đầu ra:** Production release gates, billing tests and operational dashboards.

### Phase 7 — Hardening & scale
Load/performance tests, threat review, accessibility, cross-device QA, restore drills, cost review and architecture reassessment.
**Đầu ra:** Release readiness review and documented SLOs/risks.

## 10. Nguyên tắc làm việc với Claude Code

1. Đọc `CLAUDE.md`, README và tài liệu kiến trúc trước khi sửa code.

2. Audit source hiện có trước khi refactor; lập inventory routes, components, data models, API calls, features và dependencies.

3. Không xóa, đổi tên hoặc di chuyển file/dữ liệu đang dùng nếu chưa có impact analysis, migration plan và xác nhận.

4. Mỗi task phải nêu phạm vi, file dự kiến sửa, rủi ro, acceptance criteria và test plan.

5. Thay đổi phải theo domain ownership; không để app truy cập trực tiếp database hoặc lách API contracts.

6. Sau mỗi thay đổi: chạy test phù hợp, báo cáo file thay đổi, behavior giữ nguyên/thay đổi, migration và việc còn tồn đọng.

7. Khi chưa rõ yêu cầu, ưu tiên giữ nguyên behavior và hỏi trước các thay đổi phá vỡ tương thích.

8. Thay đổi ảnh hưởng nhiều repository phải ghi vào `architecture/INTEGRATION_CHANGELOG.md` trong `olaa-platform`.

## 11. Quyết định kiến trúc cần chốt trước khi code production

- Nền tảng client chính: web responsive, native iPad/iOS hay cross-platform; đặc biệt ảnh hưởng Apple Pencil.

- Framework frontend/backend và công cụ build cho từng repository.

- Cách phát hành shared packages và đồng bộ phiên bản contract giữa 4 repository.

- Auth provider, payment provider, email/push provider và cloud/object storage provider.

- Mức độ hỗ trợ organization/teams ở phiên bản đầu hay chỉ personal workspace.

- Offline scope cho từng app và quy tắc conflict resolution của TakeNote.

- Data residency, retention, privacy/legal requirements và SLO mục tiêu.

## 12. Trạng thái tài liệu

Tài liệu này là baseline kiến trúc đề xuất dựa trên phạm vi Olaa đã xác định trong dự án. Các quyết định công nghệ chưa được người dùng chốt được ghi là khuyến nghị/điểm cần quyết định, không được coi là lựa chọn đã phê duyệt. Mọi thay đổi kiến trúc quan trọng cần ADR và cập nhật tài liệu này.

### Lịch sử thay đổi

| Ngày | Thay đổi | ADR |
|---|---|---|
| 2026-11-17 | Bản gốc `ATOZ_MASTER_ARCHITECTURE.md` | — |
| 2026-11-18 | Đổi thương hiệu sang Olaa; English → Language; mô hình 4 repository thay cho monorepo | ADR-0001, ADR-0002 |
