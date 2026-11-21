# Module Registry

Danh sách chuẩn của mọi module trong hệ sinh thái Olaa và vị trí mã nguồn canonical. Nguồn: `OLAA_MASTER_ARCHITECTURE.md`, mục 4.

**Quy tắc**
- Mỗi module có đúng một dòng và một file đặc tả.
- Thêm module mới: xác định nhánh, cấp ID tiếp theo trong nhánh, thêm dòng ở đây, tạo đặc tả, ghi `INTEGRATION_CHANGELOG.md` nếu ảnh hưởng nhánh khác.
- Không đổi ID đã cấp. Module bị bỏ giữ dòng với trạng thái `RETIRED` và ADR liên quan.
- Trạng thái dùng thang trong `IMPLEMENTATION_STATUS.md`.

Tổng: 229 module trong 22 nhánh.

| Module ID | Tên | Nhánh | Source code location | Owner | Trạng thái | Đặc tả |
|---|---|---|---|---|---|---|
| 00.01 | platform-core | 00 | `olaa-platform`: `apps/platform-shell/`, `services/platform/`, `services/identity/` | Platform team / platform domain | NOT STARTED | [spec](00-olaa-platform/modules/00.01-platform-core.md) |
| 00.02 | application-management | 00 | `olaa-platform`: `apps/platform-shell/`, `services/platform/`, `services/identity/` | Platform team / platform domain | NOT STARTED | [spec](00-olaa-platform/modules/00.02-application-management.md) |
| 00.03 | identity-management | 00 | `olaa-platform`: `apps/platform-shell/`, `services/platform/`, `services/identity/` | Platform team / platform domain | NOT STARTED | [spec](00-olaa-platform/modules/00.03-identity-management.md) |
| 00.04 | user-workspace | 00 | `olaa-platform`: `apps/platform-shell/`, `services/platform/`, `services/identity/` | Platform team / platform domain | NOT STARTED | [spec](00-olaa-platform/modules/00.04-user-workspace.md) |
| 00.05 | tenant-management | 00 | `olaa-platform`: `apps/platform-shell/`, `services/platform/`, `services/identity/` | Platform team / platform domain | NOT STARTED | [spec](00-olaa-platform/modules/00.05-tenant-management.md) |
| 00.06 | platform-experience | 00 | `olaa-platform`: `apps/platform-shell/`, `services/platform/`, `services/identity/` | Platform team / platform domain | NOT STARTED | [spec](00-olaa-platform/modules/00.06-platform-experience.md) |
| 00.07 | platform-configuration | 00 | `olaa-platform`: `apps/platform-shell/`, `services/platform/`, `services/identity/` | Platform team / platform domain | NOT STARTED | [spec](00-olaa-platform/modules/00.07-platform-configuration.md) |
| 01.01 | learning-foundation | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.01-learning-foundation.md) |
| 01.02 | curriculum | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.02-curriculum.md) |
| 01.03 | vocabulary | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.03-vocabulary.md) |
| 01.04 | grammar | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.04-grammar.md) |
| 01.05 | listening | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.05-listening.md) |
| 01.06 | speaking | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.06-speaking.md) |
| 01.07 | reading | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.07-reading.md) |
| 01.08 | writing | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.08-writing.md) |
| 01.09 | exercises | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.09-exercises.md) |
| 01.10 | assessment | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.10-assessment.md) |
| 01.11 | flashcards | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.11-flashcards.md) |
| 01.12 | learning-progress | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.12-learning-progress.md) |
| 01.13 | learning-intelligence | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.13-learning-intelligence.md) |
| 01.14 | language-settings | 01 | repository `olaa-language` (đường dẫn trong repo chưa chốt) | Language domain | NOT STARTED | [spec](01-olaa-language/modules/01.14-language-settings.md) |
| 02.01 | habit-management | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.01-habit-management.md) |
| 02.02 | scheduling | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.02-scheduling.md) |
| 02.03 | habit-tracking | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.03-habit-tracking.md) |
| 02.04 | streaks | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.04-streaks.md) |
| 02.05 | goals | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.05-goals.md) |
| 02.06 | routines | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.06-routines.md) |
| 02.07 | calendar | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.07-calendar.md) |
| 02.08 | reminders | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.08-reminders.md) |
| 02.09 | statistics | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.09-statistics.md) |
| 02.10 | gamification | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.10-gamification.md) |
| 02.11 | insights | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.11-insights.md) |
| 02.12 | habits-settings | 02 | repository `olaa-habits` (đường dẫn trong repo chưa chốt) | Habits domain | NOT STARTED | [spec](02-olaa-habits/modules/02.12-habits-settings.md) |
| 03.01 | notebook-management | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.01-notebook-management.md) |
| 03.02 | note-management | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.02-note-management.md) |
| 03.03 | rich-text-editor | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.03-rich-text-editor.md) |
| 03.04 | digital-canvas | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.04-digital-canvas.md) |
| 03.05 | apple-pencil | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.05-apple-pencil.md) |
| 03.06 | inking-tools | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.06-inking-tools.md) |
| 03.07 | page-management | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.07-page-management.md) |
| 03.08 | document-annotation | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.08-document-annotation.md) |
| 03.09 | attachments | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.09-attachments.md) |
| 03.10 | organization | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.10-organization.md) |
| 03.11 | search | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.11-search.md) |
| 03.12 | history-recovery | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.12-history-recovery.md) |
| 03.13 | export-sharing | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.13-export-sharing.md) |
| 03.14 | offline-sync | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.14-offline-sync.md) |
| 03.15 | takenote-settings | 03 | repository `olaa-takenote` (đường dẫn trong repo chưa chốt) | TakeNote domain | NOT STARTED | [spec](03-olaa-takenote/modules/03.15-takenote-settings.md) |
| 04.01 | design-system | 04 | `olaa-platform/packages/design-system/` | Platform engineering | IN PROGRESS | [spec](04-shared-core/modules/04.01-design-system.md) |
| 04.02 | shared-ui | 04 | `olaa-platform/packages/shared-ui/` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.02-shared-ui.md) |
| 04.03 | authentication | 04 | `olaa-platform/packages/authentication/` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.03-authentication.md) |
| 04.04 | authorization | 04 | `olaa-platform/packages/authorization/` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.04-authorization.md) |
| 04.05 | user-management | 04 | `olaa-platform/packages/sdk/ (đề xuất)` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.05-user-management.md) |
| 04.06 | api-client | 04 | `olaa-platform/packages/api-client/` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.06-api-client.md) |
| 04.07 | storage | 04 | `olaa-platform/packages/storage/` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.07-storage.md) |
| 04.08 | event-system | 04 | `olaa-platform/packages/event-bus/` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.08-event-system.md) |
| 04.09 | notifications | 04 | `olaa-platform/packages/sdk/ (đề xuất)` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.09-notifications.md) |
| 04.10 | localization | 04 | `olaa-platform/packages/localization/` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.10-localization.md) |
| 04.11 | accessibility | 04 | `olaa-platform/packages/accessibility/` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.11-accessibility.md) |
| 04.12 | device-management | 04 | `olaa-platform/packages/device-management/` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.12-device-management.md) |
| 04.13 | utilities | 04 | `olaa-platform/packages/utilities/` | Platform engineering | NOT STARTED | [spec](04-shared-core/modules/04.13-utilities.md) |
| 05.01 | api-gateway | 05 | `olaa-platform/services/api-gateway/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.01-api-gateway.md) |
| 05.02 | identity-service | 05 | `olaa-platform/services/identity/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.02-identity-service.md) |
| 05.03 | platform-service | 05 | `olaa-platform/services/platform/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.03-platform-service.md) |
| 05.04 | language-service | 05 | `olaa-platform/services/language/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.04-language-service.md) |
| 05.05 | habits-service | 05 | `olaa-platform/services/habits/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.05-habits-service.md) |
| 05.06 | notes-service | 05 | `olaa-platform/services/notes/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.06-notes-service.md) |
| 05.07 | sync-service | 05 | `olaa-platform/services/sync/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.07-sync-service.md) |
| 05.08 | billing-service | 05 | `olaa-platform/services/billing/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.08-billing-service.md) |
| 05.09 | notification-service | 05 | `olaa-platform/services/notifications/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.09-notification-service.md) |
| 05.10 | integration-service | 05 | `olaa-platform/services/integrations/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.10-integration-service.md) |
| 05.11 | analytics-service | 05 | `olaa-platform/services/analytics/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.11-analytics-service.md) |
| 05.12 | media-service | 05 | `olaa-platform/services/media/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.12-media-service.md) |
| 05.13 | ai-service | 05 | `olaa-platform/services/ai/ (tùy chọn)` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.13-ai-service.md) |
| 05.14 | background-jobs | 05 | `olaa-platform/services/background-jobs/` | Backend/domain owners | NOT STARTED | [spec](05-backend-services/modules/05.14-background-jobs.md) |
| 06.01 | content-architecture | 06 | `olaa-platform`: `content/` | Learning/content operations | NOT STARTED | [spec](06-content-management/modules/06.01-content-architecture.md) |
| 06.02 | taxonomy | 06 | `olaa-platform`: `content/` | Learning/content operations | NOT STARTED | [spec](06-content-management/modules/06.02-taxonomy.md) |
| 06.03 | authoring | 06 | `olaa-platform`: `content/` | Learning/content operations | NOT STARTED | [spec](06-content-management/modules/06.03-authoring.md) |
| 06.04 | content-library | 06 | `olaa-platform`: `content/` | Learning/content operations | NOT STARTED | [spec](06-content-management/modules/06.04-content-library.md) |
| 06.05 | versioning | 06 | `olaa-platform`: `content/` | Learning/content operations | NOT STARTED | [spec](06-content-management/modules/06.05-versioning.md) |
| 06.06 | validation | 06 | `olaa-platform`: `content/` | Learning/content operations | NOT STARTED | [spec](06-content-management/modules/06.06-validation.md) |
| 06.07 | review-approval | 06 | `olaa-platform`: `content/` | Learning/content operations | NOT STARTED | [spec](06-content-management/modules/06.07-review-approval.md) |
| 06.08 | publishing | 06 | `olaa-platform`: `content/` | Learning/content operations | NOT STARTED | [spec](06-content-management/modules/06.08-publishing.md) |
| 06.09 | localization | 06 | `olaa-platform`: `content/` | Learning/content operations | NOT STARTED | [spec](06-content-management/modules/06.09-localization.md) |
| 06.10 | import-export | 06 | `olaa-platform`: `content/` | Learning/content operations | NOT STARTED | [spec](06-content-management/modules/06.10-import-export.md) |
| 07.01 | database-strategy | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.01-database-strategy.md) |
| 07.02 | domain-ownership | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.02-domain-ownership.md) |
| 07.03 | schemas | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.03-schemas.md) |
| 07.04 | tenancy-model | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.04-tenancy-model.md) |
| 07.05 | migrations | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.05-migrations.md) |
| 07.06 | indexing-performance | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.06-indexing-performance.md) |
| 07.07 | data-access | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.07-data-access.md) |
| 07.08 | sync-data | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.08-sync-data.md) |
| 07.09 | object-storage | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.09-object-storage.md) |
| 07.10 | backup-recovery | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.10-backup-recovery.md) |
| 07.11 | data-quality | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.11-data-quality.md) |
| 07.12 | retention-deletion | 07 | `olaa-platform`: `database/` | Data/platform engineering | NOT STARTED | [spec](07-database-architecture/modules/07.12-retention-deletion.md) |
| 08.01 | security-architecture | 08 | `olaa-platform`: `architecture/08-security/` (chính sách); kiểm soát nằm trong từng service và CI | Security owner (initially designated maintainer) | NOT STARTED | [spec](08-security/modules/08.01-security-architecture.md) |
| 08.02 | authentication-security | 08 | `olaa-platform`: `architecture/08-security/` (chính sách); kiểm soát nằm trong từng service và CI | Security owner (initially designated maintainer) | NOT STARTED | [spec](08-security/modules/08.02-authentication-security.md) |
| 08.03 | authorization | 08 | `olaa-platform`: `architecture/08-security/` (chính sách); kiểm soát nằm trong từng service và CI | Security owner (initially designated maintainer) | NOT STARTED | [spec](08-security/modules/08.03-authorization.md) |
| 08.04 | tenant-isolation | 08 | `olaa-platform`: `architecture/08-security/` (chính sách); kiểm soát nằm trong từng service và CI | Security owner (initially designated maintainer) | NOT STARTED | [spec](08-security/modules/08.04-tenant-isolation.md) |
| 08.05 | application-security | 08 | `olaa-platform`: `architecture/08-security/` (chính sách); kiểm soát nằm trong từng service và CI | Security owner (initially designated maintainer) | NOT STARTED | [spec](08-security/modules/08.05-application-security.md) |
| 08.06 | api-security | 08 | `olaa-platform`: `architecture/08-security/` (chính sách); kiểm soát nằm trong từng service và CI | Security owner (initially designated maintainer) | NOT STARTED | [spec](08-security/modules/08.06-api-security.md) |
| 08.07 | data-security | 08 | `olaa-platform`: `architecture/08-security/` (chính sách); kiểm soát nằm trong từng service và CI | Security owner (initially designated maintainer) | NOT STARTED | [spec](08-security/modules/08.07-data-security.md) |
| 08.08 | secrets-management | 08 | `olaa-platform`: `architecture/08-security/` (chính sách); kiểm soát nằm trong từng service và CI | Security owner (initially designated maintainer) | NOT STARTED | [spec](08-security/modules/08.08-secrets-management.md) |
| 08.09 | security-monitoring | 08 | `olaa-platform`: `architecture/08-security/` (chính sách); kiểm soát nằm trong từng service và CI | Security owner (initially designated maintainer) | NOT STARTED | [spec](08-security/modules/08.09-security-monitoring.md) |
| 08.10 | security-testing | 08 | `olaa-platform`: `architecture/08-security/` (chính sách); kiểm soát nằm trong từng service và CI | Security owner (initially designated maintainer) | NOT STARTED | [spec](08-security/modules/08.10-security-testing.md) |
| 08.11 | incident-response | 08 | `olaa-platform`: `architecture/08-security/` (chính sách); kiểm soát nằm trong từng service và CI | Security owner (initially designated maintainer) | NOT STARTED | [spec](08-security/modules/08.11-incident-response.md) |
| 09.01 | environments | 09 | `olaa-platform`: `infrastructure/`, `.github/workflows/` | Platform/operations | NOT STARTED | [spec](09-devops-infrastructure/modules/09.01-environments.md) |
| 09.02 | infrastructure-as-code | 09 | `olaa-platform`: `infrastructure/`, `.github/workflows/` | Platform/operations | NOT STARTED | [spec](09-devops-infrastructure/modules/09.02-infrastructure-as-code.md) |
| 09.03 | containers-runtime | 09 | `olaa-platform`: `infrastructure/`, `.github/workflows/` | Platform/operations | NOT STARTED | [spec](09-devops-infrastructure/modules/09.03-containers-runtime.md) |
| 09.04 | ci-cd | 09 | `olaa-platform`: `infrastructure/`, `.github/workflows/` | Platform/operations | NOT STARTED | [spec](09-devops-infrastructure/modules/09.04-ci-cd.md) |
| 09.05 | deployment | 09 | `olaa-platform`: `infrastructure/`, `.github/workflows/` | Platform/operations | NOT STARTED | [spec](09-devops-infrastructure/modules/09.05-deployment.md) |
| 09.06 | release-management | 09 | `olaa-platform`: `infrastructure/`, `.github/workflows/` | Platform/operations | NOT STARTED | [spec](09-devops-infrastructure/modules/09.06-release-management.md) |
| 09.07 | cloud-infrastructure | 09 | `olaa-platform`: `infrastructure/`, `.github/workflows/` | Platform/operations | NOT STARTED | [spec](09-devops-infrastructure/modules/09.07-cloud-infrastructure.md) |
| 09.08 | scaling | 09 | `olaa-platform`: `infrastructure/`, `.github/workflows/` | Platform/operations | NOT STARTED | [spec](09-devops-infrastructure/modules/09.08-scaling.md) |
| 09.09 | cost-management | 09 | `olaa-platform`: `infrastructure/`, `.github/workflows/` | Platform/operations | NOT STARTED | [spec](09-devops-infrastructure/modules/09.09-cost-management.md) |
| 10.01 | test-strategy | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.01-test-strategy.md) |
| 10.02 | unit-tests | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.02-unit-tests.md) |
| 10.03 | integration-tests | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.03-integration-tests.md) |
| 10.04 | end-to-end | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.04-end-to-end.md) |
| 10.05 | regression | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.05-regression.md) |
| 10.06 | performance-load | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.06-performance-load.md) |
| 10.07 | security-privacy-tests | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.07-security-privacy-tests.md) |
| 10.08 | accessibility | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.08-accessibility.md) |
| 10.09 | cross-device | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.09-cross-device.md) |
| 10.10 | offline-sync-tests | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.10-offline-sync-tests.md) |
| 10.11 | data-integrity | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.11-data-integrity.md) |
| 10.12 | user-acceptance | 10 | Test nằm trong từng repository; chiến lược và quality gates ở đây | Quality owner + domain contributors | NOT STARTED | [spec](10-quality-assurance/modules/10.12-user-acceptance.md) |
| 11.01 | local-development | 11 | `olaa-platform`: `scripts/`; `CLAUDE.md` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](11-developer-experience/modules/11.01-local-development.md) |
| 11.02 | cli-scripts | 11 | `olaa-platform`: `scripts/`; `CLAUDE.md` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](11-developer-experience/modules/11.02-cli-scripts.md) |
| 11.03 | code-quality | 11 | `olaa-platform`: `scripts/`; `CLAUDE.md` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](11-developer-experience/modules/11.03-code-quality.md) |
| 11.04 | debugging | 11 | `olaa-platform`: `scripts/`; `CLAUDE.md` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](11-developer-experience/modules/11.04-debugging.md) |
| 11.05 | developer-environments | 11 | `olaa-platform`: `scripts/`; `CLAUDE.md` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](11-developer-experience/modules/11.05-developer-environments.md) |
| 11.06 | claude-code-workflows | 11 | `olaa-platform`: `scripts/`; `CLAUDE.md` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](11-developer-experience/modules/11.06-claude-code-workflows.md) |
| 11.07 | ai-coding-guardrails | 11 | `olaa-platform`: `scripts/`; `CLAUDE.md` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](11-developer-experience/modules/11.07-ai-coding-guardrails.md) |
| 11.08 | onboarding | 11 | `olaa-platform`: `scripts/`; `CLAUDE.md` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](11-developer-experience/modules/11.08-onboarding.md) |
| 12.01 | master-architecture | 12 | `olaa-platform`: `architecture/` | Architecture owner + domain owners | NOT STARTED | [spec](12-documentation-architecture/modules/12.01-master-architecture.md) |
| 12.02 | technical-specifications | 12 | `olaa-platform`: `architecture/` | Architecture owner + domain owners | NOT STARTED | [spec](12-documentation-architecture/modules/12.02-technical-specifications.md) |
| 12.03 | adr | 12 | `olaa-platform`: `architecture/` | Architecture owner + domain owners | NOT STARTED | [spec](12-documentation-architecture/modules/12.03-adr.md) |
| 12.04 | diagrams | 12 | `olaa-platform`: `architecture/` | Architecture owner + domain owners | NOT STARTED | [spec](12-documentation-architecture/modules/12.04-diagrams.md) |
| 12.05 | api-database-docs | 12 | `olaa-platform`: `architecture/` | Architecture owner + domain owners | NOT STARTED | [spec](12-documentation-architecture/modules/12.05-api-database-docs.md) |
| 12.06 | developer-guides | 12 | `olaa-platform`: `architecture/` | Architecture owner + domain owners | NOT STARTED | [spec](12-documentation-architecture/modules/12.06-developer-guides.md) |
| 12.07 | operations-runbooks | 12 | `olaa-platform`: `architecture/` | Architecture owner + domain owners | NOT STARTED | [spec](12-documentation-architecture/modules/12.07-operations-runbooks.md) |
| 12.08 | user-documentation | 12 | `olaa-platform`: `architecture/` | Architecture owner + domain owners | NOT STARTED | [spec](12-documentation-architecture/modules/12.08-user-documentation.md) |
| 12.09 | changelog | 12 | `olaa-platform`: `architecture/` | Architecture owner + domain owners | NOT STARTED | [spec](12-documentation-architecture/modules/12.09-changelog.md) |
| 13.01 | repository-structure | 13 | `.github/` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](13-github-source-governance/modules/13.01-repository-structure.md) |
| 13.02 | branch-strategy | 13 | `.github/` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](13-github-source-governance/modules/13.02-branch-strategy.md) |
| 13.03 | commit-conventions | 13 | `.github/` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](13-github-source-governance/modules/13.03-commit-conventions.md) |
| 13.04 | pull-requests | 13 | `.github/` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](13-github-source-governance/modules/13.04-pull-requests.md) |
| 13.05 | code-ownership | 13 | `.github/` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](13-github-source-governance/modules/13.05-code-ownership.md) |
| 13.06 | version-control | 13 | `.github/` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](13-github-source-governance/modules/13.06-version-control.md) |
| 13.07 | dependency-governance | 13 | `.github/` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](13-github-source-governance/modules/13.07-dependency-governance.md) |
| 13.08 | repository-audits | 13 | `.github/` ở cả 4 repository | Repository maintainer | NOT STARTED | [spec](13-github-source-governance/modules/13.08-repository-audits.md) |
| 14.01 | product-plans | 14 | `olaa-platform`: `services/billing/` | Commerce/billing domain | NOT STARTED | [spec](14-saas-monetization/modules/14.01-product-plans.md) |
| 14.02 | pricing | 14 | `olaa-platform`: `services/billing/` | Commerce/billing domain | NOT STARTED | [spec](14-saas-monetization/modules/14.02-pricing.md) |
| 14.03 | subscriptions | 14 | `olaa-platform`: `services/billing/` | Commerce/billing domain | NOT STARTED | [spec](14-saas-monetization/modules/14.03-subscriptions.md) |
| 14.04 | billing-payments | 14 | `olaa-platform`: `services/billing/` | Commerce/billing domain | NOT STARTED | [spec](14-saas-monetization/modules/14.04-billing-payments.md) |
| 14.05 | invoices-refunds | 14 | `olaa-platform`: `services/billing/` | Commerce/billing domain | NOT STARTED | [spec](14-saas-monetization/modules/14.05-invoices-refunds.md) |
| 14.06 | entitlements | 14 | `olaa-platform`: `services/billing/` | Commerce/billing domain | NOT STARTED | [spec](14-saas-monetization/modules/14.06-entitlements.md) |
| 14.07 | usage-metering | 14 | `olaa-platform`: `services/billing/` | Commerce/billing domain | NOT STARTED | [spec](14-saas-monetization/modules/14.07-usage-metering.md) |
| 14.08 | trials-promotions | 14 | `olaa-platform`: `services/billing/` | Commerce/billing domain | NOT STARTED | [spec](14-saas-monetization/modules/14.08-trials-promotions.md) |
| 14.09 | revenue-analytics | 14 | `olaa-platform`: `services/billing/` | Commerce/billing domain | NOT STARTED | [spec](14-saas-monetization/modules/14.09-revenue-analytics.md) |
| 15.01 | admin-console | 15 | `olaa-platform`: `apps/admin-console/` | Operations/support owner | NOT STARTED | [spec](15-admin-customer-support/modules/15.01-admin-console.md) |
| 15.02 | user-tenant-admin | 15 | `olaa-platform`: `apps/admin-console/` | Operations/support owner | NOT STARTED | [spec](15-admin-customer-support/modules/15.02-user-tenant-admin.md) |
| 15.03 | roles-permissions | 15 | `olaa-platform`: `apps/admin-console/` | Operations/support owner | NOT STARTED | [spec](15-admin-customer-support/modules/15.03-roles-permissions.md) |
| 15.04 | content-admin | 15 | `olaa-platform`: `apps/admin-console/` | Operations/support owner | NOT STARTED | [spec](15-admin-customer-support/modules/15.04-content-admin.md) |
| 15.05 | subscription-admin | 15 | `olaa-platform`: `apps/admin-console/` | Operations/support owner | NOT STARTED | [spec](15-admin-customer-support/modules/15.05-subscription-admin.md) |
| 15.06 | support-tickets | 15 | `olaa-platform`: `apps/admin-console/` | Operations/support owner | NOT STARTED | [spec](15-admin-customer-support/modules/15.06-support-tickets.md) |
| 15.07 | feedback-announcements | 15 | `olaa-platform`: `apps/admin-console/` | Operations/support owner | NOT STARTED | [spec](15-admin-customer-support/modules/15.07-feedback-announcements.md) |
| 15.08 | moderation | 15 | `olaa-platform`: `apps/admin-console/` | Operations/support owner | NOT STARTED | [spec](15-admin-customer-support/modules/15.08-moderation.md) |
| 15.09 | audit-viewer | 15 | `olaa-platform`: `apps/admin-console/` | Operations/support owner | NOT STARTED | [spec](15-admin-customer-support/modules/15.09-audit-viewer.md) |
| 15.10 | internal-operations | 15 | `olaa-platform`: `apps/admin-console/` | Operations/support owner | NOT STARTED | [spec](15-admin-customer-support/modules/15.10-internal-operations.md) |
| 16.01 | integration-architecture | 16 | `olaa-platform`: `services/integrations/` | Integration owner | NOT STARTED | [spec](16-integrations/modules/16.01-integration-architecture.md) |
| 16.02 | authentication-providers | 16 | `olaa-platform`: `services/integrations/` | Integration owner | NOT STARTED | [spec](16-integrations/modules/16.02-authentication-providers.md) |
| 16.03 | payment-providers | 16 | `olaa-platform`: `services/integrations/` | Integration owner | NOT STARTED | [spec](16-integrations/modules/16.03-payment-providers.md) |
| 16.04 | email-push-providers | 16 | `olaa-platform`: `services/integrations/` | Integration owner | NOT STARTED | [spec](16-integrations/modules/16.04-email-push-providers.md) |
| 16.05 | storage-providers | 16 | `olaa-platform`: `services/integrations/` | Integration owner | NOT STARTED | [spec](16-integrations/modules/16.05-storage-providers.md) |
| 16.06 | calendar-providers | 16 | `olaa-platform`: `services/integrations/` | Integration owner | NOT STARTED | [spec](16-integrations/modules/16.06-calendar-providers.md) |
| 16.07 | ai-providers | 16 | `olaa-platform`: `services/integrations/` | Integration owner | NOT STARTED | [spec](16-integrations/modules/16.07-ai-providers.md) |
| 16.08 | webhooks | 16 | `olaa-platform`: `services/integrations/` | Integration owner | NOT STARTED | [spec](16-integrations/modules/16.08-webhooks.md) |
| 16.09 | integration-operations | 16 | `olaa-platform`: `services/integrations/` | Integration owner | NOT STARTED | [spec](16-integrations/modules/16.09-integration-operations.md) |
| 17.01 | event-tracking | 17 | `olaa-platform`: `services/analytics/` | Product/data owner | NOT STARTED | [spec](17-data-product-analytics/modules/17.01-event-tracking.md) |
| 17.02 | product-analytics | 17 | `olaa-platform`: `services/analytics/` | Product/data owner | NOT STARTED | [spec](17-data-product-analytics/modules/17.02-product-analytics.md) |
| 17.03 | language-analytics | 17 | `olaa-platform`: `services/analytics/` | Product/data owner | NOT STARTED | [spec](17-data-product-analytics/modules/17.03-language-analytics.md) |
| 17.04 | habits-analytics | 17 | `olaa-platform`: `services/analytics/` | Product/data owner | NOT STARTED | [spec](17-data-product-analytics/modules/17.04-habits-analytics.md) |
| 17.05 | takenote-analytics | 17 | `olaa-platform`: `services/analytics/` | Product/data owner | NOT STARTED | [spec](17-data-product-analytics/modules/17.05-takenote-analytics.md) |
| 17.06 | business-analytics | 17 | `olaa-platform`: `services/analytics/` | Product/data owner | NOT STARTED | [spec](17-data-product-analytics/modules/17.06-business-analytics.md) |
| 17.07 | dashboards | 17 | `olaa-platform`: `services/analytics/` | Product/data owner | NOT STARTED | [spec](17-data-product-analytics/modules/17.07-dashboards.md) |
| 17.08 | aggregation-export | 17 | `olaa-platform`: `services/analytics/` | Product/data owner | NOT STARTED | [spec](17-data-product-analytics/modules/17.08-aggregation-export.md) |
| 17.09 | analytics-governance | 17 | `olaa-platform`: `services/analytics/` | Product/data owner | NOT STARTED | [spec](17-data-product-analytics/modules/17.09-analytics-governance.md) |
| 18.01 | logging | 18 | `olaa-platform`: `infrastructure/observability/` (đề xuất) | SRE/operations owner | NOT STARTED | [spec](18-observability-reliability/modules/18.01-logging.md) |
| 18.02 | metrics | 18 | `olaa-platform`: `infrastructure/observability/` (đề xuất) | SRE/operations owner | NOT STARTED | [spec](18-observability-reliability/modules/18.02-metrics.md) |
| 18.03 | distributed-tracing | 18 | `olaa-platform`: `infrastructure/observability/` (đề xuất) | SRE/operations owner | NOT STARTED | [spec](18-observability-reliability/modules/18.03-distributed-tracing.md) |
| 18.04 | error-monitoring | 18 | `olaa-platform`: `infrastructure/observability/` (đề xuất) | SRE/operations owner | NOT STARTED | [spec](18-observability-reliability/modules/18.04-error-monitoring.md) |
| 18.05 | performance-monitoring | 18 | `olaa-platform`: `infrastructure/observability/` (đề xuất) | SRE/operations owner | NOT STARTED | [spec](18-observability-reliability/modules/18.05-performance-monitoring.md) |
| 18.06 | uptime-health | 18 | `olaa-platform`: `infrastructure/observability/` (đề xuất) | SRE/operations owner | NOT STARTED | [spec](18-observability-reliability/modules/18.06-uptime-health.md) |
| 18.07 | alerting | 18 | `olaa-platform`: `infrastructure/observability/` (đề xuất) | SRE/operations owner | NOT STARTED | [spec](18-observability-reliability/modules/18.07-alerting.md) |
| 18.08 | incidents | 18 | `olaa-platform`: `infrastructure/observability/` (đề xuất) | SRE/operations owner | NOT STARTED | [spec](18-observability-reliability/modules/18.08-incidents.md) |
| 18.09 | slis-slos | 18 | `olaa-platform`: `infrastructure/observability/` (đề xuất) | SRE/operations owner | NOT STARTED | [spec](18-observability-reliability/modules/18.09-slis-slos.md) |
| 18.10 | capacity | 18 | `olaa-platform`: `infrastructure/observability/` (đề xuất) | SRE/operations owner | NOT STARTED | [spec](18-observability-reliability/modules/18.10-capacity.md) |
| 19.01 | data-classification | 19 | `olaa-platform`: `architecture/19-privacy-data-governance/` (chính sách); thực thi trong service | Privacy/data governance owner | NOT STARTED | [spec](19-privacy-data-governance/modules/19.01-data-classification.md) |
| 19.02 | data-ownership | 19 | `olaa-platform`: `architecture/19-privacy-data-governance/` (chính sách); thực thi trong service | Privacy/data governance owner | NOT STARTED | [spec](19-privacy-data-governance/modules/19.02-data-ownership.md) |
| 19.03 | access-policy | 19 | `olaa-platform`: `architecture/19-privacy-data-governance/` (chính sách); thực thi trong service | Privacy/data governance owner | NOT STARTED | [spec](19-privacy-data-governance/modules/19.03-access-policy.md) |
| 19.04 | consent-preferences | 19 | `olaa-platform`: `architecture/19-privacy-data-governance/` (chính sách); thực thi trong service | Privacy/data governance owner | NOT STARTED | [spec](19-privacy-data-governance/modules/19.04-consent-preferences.md) |
| 19.05 | retention | 19 | `olaa-platform`: `architecture/19-privacy-data-governance/` (chính sách); thực thi trong service | Privacy/data governance owner | NOT STARTED | [spec](19-privacy-data-governance/modules/19.05-retention.md) |
| 19.06 | export-deletion | 19 | `olaa-platform`: `architecture/19-privacy-data-governance/` (chính sách); thực thi trong service | Privacy/data governance owner | NOT STARTED | [spec](19-privacy-data-governance/modules/19.06-export-deletion.md) |
| 19.07 | privacy-by-design | 19 | `olaa-platform`: `architecture/19-privacy-data-governance/` (chính sách); thực thi trong service | Privacy/data governance owner | NOT STARTED | [spec](19-privacy-data-governance/modules/19.07-privacy-by-design.md) |
| 19.08 | legal-compliance | 19 | `olaa-platform`: `architecture/19-privacy-data-governance/` (chính sách); thực thi trong service | Privacy/data governance owner | NOT STARTED | [spec](19-privacy-data-governance/modules/19.08-legal-compliance.md) |
| 19.09 | governance-audit | 19 | `olaa-platform`: `architecture/19-privacy-data-governance/` (chính sách); thực thi trong service | Privacy/data governance owner | NOT STARTED | [spec](19-privacy-data-governance/modules/19.09-governance-audit.md) |
| 20.01 | api-standards | 20 | `olaa-platform`: `contracts/`, `packages/shared-types/` | Architecture/API owner | NOT STARTED | [spec](20-api-integration-contracts/modules/20.01-api-standards.md) |
| 20.02 | request-response-schemas | 20 | `olaa-platform`: `contracts/`, `packages/shared-types/` | Architecture/API owner | NOT STARTED | [spec](20-api-integration-contracts/modules/20.02-request-response-schemas.md) |
| 20.03 | error-contracts | 20 | `olaa-platform`: `contracts/`, `packages/shared-types/` | Architecture/API owner | NOT STARTED | [spec](20-api-integration-contracts/modules/20.03-error-contracts.md) |
| 20.04 | event-contracts | 20 | `olaa-platform`: `contracts/`, `packages/shared-types/` | Architecture/API owner | NOT STARTED | [spec](20-api-integration-contracts/modules/20.04-event-contracts.md) |
| 20.05 | shared-types | 20 | `olaa-platform`: `contracts/`, `packages/shared-types/` | Architecture/API owner | NOT STARTED | [spec](20-api-integration-contracts/modules/20.05-shared-types.md) |
| 20.06 | api-versioning | 20 | `olaa-platform`: `contracts/`, `packages/shared-types/` | Architecture/API owner | NOT STARTED | [spec](20-api-integration-contracts/modules/20.06-api-versioning.md) |
| 20.07 | contract-testing | 20 | `olaa-platform`: `contracts/`, `packages/shared-types/` | Architecture/API owner | NOT STARTED | [spec](20-api-integration-contracts/modules/20.07-contract-testing.md) |
| 20.08 | sdk-contracts | 20 | `olaa-platform`: `contracts/`, `packages/shared-types/` | Architecture/API owner | NOT STARTED | [spec](20-api-integration-contracts/modules/20.08-sdk-contracts.md) |
| 20.09 | partner-integration-specs | 20 | `olaa-platform`: `contracts/`, `packages/shared-types/` | Architecture/API owner | NOT STARTED | [spec](20-api-integration-contracts/modules/20.09-partner-integration-specs.md) |
| 21.01 | search-architecture | 21 | `olaa-platform`: `services/media/`; vị trí search service chưa chốt | Search/media owner | NOT STARTED | [spec](21-search-media-processing/modules/21.01-search-architecture.md) |
| 21.02 | full-text-search | 21 | `olaa-platform`: `services/media/`; vị trí search service chưa chốt | Search/media owner | NOT STARTED | [spec](21-search-media-processing/modules/21.02-full-text-search.md) |
| 21.03 | handwriting-recognition | 21 | `olaa-platform`: `services/media/`; vị trí search service chưa chốt | Search/media owner | NOT STARTED | [spec](21-search-media-processing/modules/21.03-handwriting-recognition.md) |
| 21.04 | ocr | 21 | `olaa-platform`: `services/media/`; vị trí search service chưa chốt | Search/media owner | NOT STARTED | [spec](21-search-media-processing/modules/21.04-ocr.md) |
| 21.05 | image-processing | 21 | `olaa-platform`: `services/media/`; vị trí search service chưa chốt | Search/media owner | NOT STARTED | [spec](21-search-media-processing/modules/21.05-image-processing.md) |
| 21.06 | audio-processing | 21 | `olaa-platform`: `services/media/`; vị trí search service chưa chốt | Search/media owner | NOT STARTED | [spec](21-search-media-processing/modules/21.06-audio-processing.md) |
| 21.07 | video-processing | 21 | `olaa-platform`: `services/media/`; vị trí search service chưa chốt | Search/media owner | NOT STARTED | [spec](21-search-media-processing/modules/21.07-video-processing.md) |
| 21.08 | pdf-processing | 21 | `olaa-platform`: `services/media/`; vị trí search service chưa chốt | Search/media owner | NOT STARTED | [spec](21-search-media-processing/modules/21.08-pdf-processing.md) |
| 21.09 | file-security | 21 | `olaa-platform`: `services/media/`; vị trí search service chưa chốt | Search/media owner | NOT STARTED | [spec](21-search-media-processing/modules/21.09-file-security.md) |
| 21.10 | media-lifecycle | 21 | `olaa-platform`: `services/media/`; vị trí search service chưa chốt | Search/media owner | NOT STARTED | [spec](21-search-media-processing/modules/21.10-media-lifecycle.md) |
