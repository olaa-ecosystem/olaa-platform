# 20 — API & INTEGRATION CONTRACTS

Định nghĩa các giao kèo ổn định giữa app, backend, packages và đối tác.

## 1. Mục tiêu
Định nghĩa các giao kèo ổn định giữa app, backend, packages và đối tác.

## 2. Phạm vi
Canonical external interfaces and compatibility rules.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 20.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 20.01 | [api-standards](modules/20.01-api-standards.md) | REST conventions, naming, pagination, filtering, auth and rate-limit headers. | NOT STARTED |
| 20.02 | [request-response-schemas](modules/20.02-request-response-schemas.md) | Typed request/response schemas, validation and examples. | NOT STARTED |
| 20.03 | [error-contracts](modules/20.03-error-contracts.md) | Stable error codes, error envelope, retryability and user-safe messages. | NOT STARTED |
| 20.04 | [event-contracts](modules/20.04-event-contracts.md) | Domain event names, payload schemas, versioning and delivery guarantees. | NOT STARTED |
| 20.05 | [shared-types](modules/20.05-shared-types.md) | Code-level shared types generated or maintained from canonical contracts. | NOT STARTED |
| 20.06 | [api-versioning](modules/20.06-api-versioning.md) | Compatibility policy, deprecation windows and migration guidance. | NOT STARTED |
| 20.07 | [contract-testing](modules/20.07-contract-testing.md) | Consumer/provider tests, schema checks and compatibility gates. | NOT STARTED |
| 20.08 | [sdk-contracts](modules/20.08-sdk-contracts.md) | Client SDK behavior, auth integration, retries and error normalization. | NOT STARTED |
| 20.09 | [partner-integration-specs](modules/20.09-partner-integration-specs.md) | External integration specs, webhook payloads and security requirements. | NOT STARTED |

## 4. Folder structure
```text
20-api-integration-contracts/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `contracts/`, `packages/shared-types/`

Chưa có mã nguồn.

## 6. Dependencies
- Không có.
- Phụ thuộc xuyên suốt: All app and service owners

Chi tiết: `architecture/DEPENDENCY_MAP.md`.

## 7. API contracts
Chưa có contract. Contract dùng chung sẽ nằm trong `olaa-platform/contracts/` (nhánh 20). Xem `api-contracts/README.md`.

## 8. Database ownership
Nhánh này không sở hữu dữ liệu nghiệp vụ. Xem `database/README.md`.

## 9. Security requirements
Áp dụng baseline của nhánh 08 và quy tắc privacy của nhánh 19. Yêu cầu riêng của nhánh: Chưa xác định — điền khi nhánh được triển khai.

## 10. Testing strategy
Theo chiến lược của nhánh 10. Kế hoạch riêng: `tests/README.md`.

## 11. Implementation status
| Hạng mục | Trạng thái |
|---|---|
| Tài liệu kiến trúc | SCAFFOLDED |
| Mã nguồn | NOT STARTED |

Owner đề xuất: Architecture/API owner.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
