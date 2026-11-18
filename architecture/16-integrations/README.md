# 16 — INTEGRATIONS

Kết nối nhà cung cấp bên ngoài qua adapter có kiểm soát, không để vendor lock-in lan vào domain.

## 1. Mục tiêu
Kết nối nhà cung cấp bên ngoài qua adapter có kiểm soát, không để vendor lock-in lan vào domain.

## 2. Phạm vi
External provider adapters, webhooks and retries.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 16.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 16.01 | [integration-architecture](modules/16.01-integration-architecture.md) | Provider abstraction, adapter boundaries, capability mapping và provider registry. | NOT STARTED |
| 16.02 | [authentication-providers](modules/16.02-authentication-providers.md) | OAuth/OIDC providers, redirect handling và token lifecycle. | NOT STARTED |
| 16.03 | [payment-providers](modules/16.03-payment-providers.md) | Payment gateways, webhooks, reconciliation và provider failover considerations. | NOT STARTED |
| 16.04 | [email-push-providers](modules/16.04-email-push-providers.md) | Transactional email, push delivery, templates và delivery status. | NOT STARTED |
| 16.05 | [storage-providers](modules/16.05-storage-providers.md) | Object storage, signed access, upload callbacks và provider abstraction. | NOT STARTED |
| 16.06 | [calendar-providers](modules/16.06-calendar-providers.md) | Calendar read/write scopes, event mapping và sync rules. | NOT STARTED |
| 16.07 | [ai-providers](modules/16.07-ai-providers.md) | Model providers, routing, cost controls, privacy constraints và fallbacks. | NOT STARTED |
| 16.08 | [webhooks](modules/16.08-webhooks.md) | Signature verification, replay protection, idempotency và event delivery. | NOT STARTED |
| 16.09 | [integration-operations](modules/16.09-integration-operations.md) | Retries, circuit breakers, rate limits, provider health và failure queues. | NOT STARTED |

## 4. Folder structure
```text
16-integrations/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `services/integrations/`

Chưa có mã nguồn.

## 6. Dependencies
- [05 Backend Services](../05-backend-services/README.md) — interface: chưa định nghĩa
- [08 Security](../08-security/README.md) — interface: chưa định nghĩa
- [20 Api & Integration Contracts](../20-api-integration-contracts/README.md) — interface: chưa định nghĩa

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

Owner đề xuất: Integration owner.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
