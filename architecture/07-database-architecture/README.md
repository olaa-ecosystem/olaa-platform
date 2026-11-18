# 07 — DATABASE ARCHITECTURE

Quản trị schema, ownership, migration, tenancy, backup và tính toàn vẹn dữ liệu.

## 1. Mục tiêu
Quản trị schema, ownership, migration, tenancy, backup và tính toàn vẹn dữ liệu.

## 2. Phạm vi
Schema/migrations/backup; domain teams own their data definitions.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 07.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 07.01 | [database-strategy](modules/07.01-database-strategy.md) | Logical topology, database selection, environment separation và data access principles. | NOT STARTED |
| 07.02 | [domain-ownership](modules/07.02-domain-ownership.md) | Identity, platform, Language, Habits, TakeNote, billing, integration và analytics ownership. | NOT STARTED |
| 07.03 | [schemas](modules/07.03-schemas.md) | Domain schemas, naming conventions, constraints, relationships và lifecycle fields. | NOT STARTED |
| 07.04 | [tenancy-model](modules/07.04-tenancy-model.md) | Personal workspace, organization tenant, user ownership, tenant ownership và public data boundaries. | NOT STARTED |
| 07.05 | [migrations](modules/07.05-migrations.md) | Versioned migrations, forward/backward strategy, review, deployment order và rollback planning. | NOT STARTED |
| 07.06 | [indexing-performance](modules/07.06-indexing-performance.md) | Indexes, query plans, pagination, partitioning criteria và performance budgets. | NOT STARTED |
| 07.07 | [data-access](modules/07.07-data-access.md) | Repository/data access layer, transactions, connection pooling và access boundaries. | NOT STARTED |
| 07.08 | [sync-data](modules/07.08-sync-data.md) | Change logs, version columns, idempotency keys, sync cursors và conflict metadata. | NOT STARTED |
| 07.09 | [object-storage](modules/07.09-object-storage.md) | Object keys, metadata, lifecycle, signed URLs và media retention. | NOT STARTED |
| 07.10 | [backup-recovery](modules/07.10-backup-recovery.md) | Backup policy, point-in-time recovery, restore drills và recovery objectives. | NOT STARTED |
| 07.11 | [data-quality](modules/07.11-data-quality.md) | Constraints, deduplication, integrity checks, reconciliation và data repair. | NOT STARTED |
| 07.12 | [retention-deletion](modules/07.12-retention-deletion.md) | Retention schedules, user export, deletion workflows, legal holds và auditability. | NOT STARTED |

## 4. Folder structure
```text
07-database-architecture/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `database/`

Chưa có mã nguồn.

## 6. Dependencies
- [08 Security](../08-security/README.md) — interface: chưa định nghĩa
- Phụ thuộc xuyên suốt: All domain owners

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

Owner đề xuất: Data/platform engineering.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
