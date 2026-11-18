# 06 — CONTENT MANAGEMENT

Quản lý nội dung học tập có cấu trúc, kiểm duyệt, phiên bản và phát hành độc lập với code ứng dụng.

## 1. Mục tiêu
Quản lý nội dung học tập có cấu trúc, kiểm duyệt, phiên bản và phát hành độc lập với code ứng dụng.

## 2. Phạm vi
Learning content lifecycle; not general application source code.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 06.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 06.01 | [content-architecture](modules/06.01-content-architecture.md) | Content schemas, content types, identifiers, relationships và schema evolution. | NOT STARTED |
| 06.02 | [taxonomy](modules/06.02-taxonomy.md) | Levels, skills, topics, tags, categories và controlled vocabularies. | NOT STARTED |
| 06.03 | [authoring](modules/06.03-authoring.md) | Authoring workflows, drafts, reusable blocks và editorial tools. | NOT STARTED |
| 06.04 | [content-library](modules/06.04-content-library.md) | Central content repository, assets, metadata và content discovery. | NOT STARTED |
| 06.05 | [versioning](modules/06.05-versioning.md) | Content versions, change history, compatibility và rollback. | NOT STARTED |
| 06.06 | [validation](modules/06.06-validation.md) | Schema validation, link checks, sequence checks, completeness và quality rules. | NOT STARTED |
| 06.07 | [review-approval](modules/06.07-review-approval.md) | Editorial review, approval states, reviewer assignment và audit trail. | NOT STARTED |
| 06.08 | [publishing](modules/06.08-publishing.md) | Release channels, scheduling, publish/unpublish và delivery manifests. | NOT STARTED |
| 06.09 | [localization](modules/06.09-localization.md) | Translation workflow, locale completeness và terminology management. | NOT STARTED |
| 06.10 | [import-export](modules/06.10-import-export.md) | Bulk import/export, format mapping, migration và content portability. | NOT STARTED |

## 4. Folder structure
```text
06-content-management/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `content/`

Chưa có mã nguồn.

## 6. Dependencies
- [01 Olaa Language](../01-olaa-language/README.md) — interface: chưa định nghĩa
- [20 Api & Integration Contracts](../20-api-integration-contracts/README.md) — interface: chưa định nghĩa
- [07 Database Architecture](../07-database-architecture/README.md) — interface: chưa định nghĩa
- [10 Quality Assurance](../10-quality-assurance/README.md) — interface: chưa định nghĩa

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

Owner đề xuất: Learning/content operations.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
