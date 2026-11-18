# 05 — BACKEND SERVICES

Backend xử lý nghiệp vụ và dữ liệu; giai đoạn đầu ưu tiên modular monolith với ranh giới domain rõ ràng.

## 1. Mục tiêu
Backend xử lý nghiệp vụ và dữ liệu; giai đoạn đầu ưu tiên modular monolith với ranh giới domain rõ ràng.

## 2. Phạm vi
Server-side business logic and API implementation.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 05.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 05.01 | [api-gateway](modules/05.01-api-gateway.md) | API entry point, routing, rate limiting, request validation và API version dispatch. | NOT STARTED |
| 05.02 | [identity-service](modules/05.02-identity-service.md) | Authentication, sessions, account recovery và identity lifecycle. | NOT STARTED |
| 05.03 | [platform-service](modules/05.03-platform-service.md) | User workspace, tenant, membership, preferences và platform configuration. | NOT STARTED |
| 05.04 | [language-service](modules/05.04-language-service.md) | Curriculum, lessons, exercises, attempts, progress và learning recommendations. | NOT STARTED |
| 05.05 | [habits-service](modules/05.05-habits-service.md) | Habits, schedules, check-ins, goals, routines và habit analytics. | NOT STARTED |
| 05.06 | [notes-service](modules/05.06-notes-service.md) | Notebooks, notes, pages, blocks, ink metadata, attachments và note versions. | NOT STARTED |
| 05.07 | [sync-service](modules/05.07-sync-service.md) | Sync protocol, change tracking, conflict detection, idempotency và device sync state. | NOT STARTED |
| 05.08 | [billing-service](modules/05.08-billing-service.md) | Plans, subscriptions, invoices, payment state và entitlement source of truth. | NOT STARTED |
| 05.09 | [notification-service](modules/05.09-notification-service.md) | Notification orchestration, templates, delivery providers và retry policies. | NOT STARTED |
| 05.10 | [integration-service](modules/05.10-integration-service.md) | Provider adapters, OAuth connections, webhooks và integration lifecycle. | NOT STARTED |
| 05.11 | [analytics-service](modules/05.11-analytics-service.md) | Product events, aggregation, reporting APIs và analytics pipelines. | NOT STARTED |
| 05.12 | [media-service](modules/05.12-media-service.md) | Upload authorization, file processing, metadata, thumbnails và media lifecycle. | NOT STARTED |
| 05.13 | [ai-service](modules/05.13-ai-service.md) | Optional AI capabilities, model/provider abstraction, safety, usage limits và evaluation. | NOT STARTED |
| 05.14 | [background-jobs](modules/05.14-background-jobs.md) | Scheduled jobs, queues, retries, dead-letter handling và job observability. | NOT STARTED |

## 4. Folder structure
```text
05-backend-services/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `services/`

Chưa có mã nguồn.

## 6. Dependencies
- [20 Api & Integration Contracts](../20-api-integration-contracts/README.md) — interface: chưa định nghĩa
- [07 Database Architecture](../07-database-architecture/README.md) — interface: chưa định nghĩa
- [08 Security](../08-security/README.md) — interface: chưa định nghĩa
- [16 Integrations](../16-integrations/README.md) — interface: chưa định nghĩa

Chi tiết: `architecture/DEPENDENCY_MAP.md`.

## 7. API contracts
Chưa có contract. Contract dùng chung sẽ nằm trong `olaa-platform/contracts/` (nhánh 20). Xem `api-contracts/README.md`.

## 8. Database ownership
Chưa có schema. Xem `database/README.md`.

## 9. Security requirements
Áp dụng baseline của nhánh 08 và quy tắc privacy của nhánh 19. Yêu cầu riêng của nhánh: Chưa xác định — điền khi nhánh được triển khai.

## 10. Testing strategy
Theo chiến lược của nhánh 10. Kế hoạch riêng: `tests/README.md`.

## 11. Implementation status
| Hạng mục | Trạng thái |
|---|---|
| Tài liệu kiến trúc | SCAFFOLDED |
| Mã nguồn | NOT STARTED |

Owner đề xuất: Backend/domain owners.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
