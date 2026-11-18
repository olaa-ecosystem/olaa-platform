# 04 — SHARED CORE

Các năng lực dùng chung được đóng gói thành thư viện/module; không để ba ứng dụng tự xây lại cùng một chức năng.

## 1. Mục tiêu
Các năng lực dùng chung được đóng gói thành thư viện/module; không để ba ứng dụng tự xây lại cùng một chức năng.

## 2. Phạm vi
Reusable libraries; must not own product-specific business rules.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 04.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 04.01 | [design-system](modules/04.01-design-system.md) | Tokens, typography, color, spacing, themes, component states và design governance. | NOT STARTED |
| 04.02 | [shared-ui](modules/04.02-shared-ui.md) | Navigation components, forms, dialogs, tables, calendars, editors' primitives và reusable patterns. | NOT STARTED |
| 04.03 | [authentication](modules/04.03-authentication.md) | Client auth flows, token lifecycle, secure session handling và identity SDK. | NOT STARTED |
| 04.04 | [authorization](modules/04.04-authorization.md) | Permission model, role checks, policy evaluation và client-side capability gating. | NOT STARTED |
| 04.05 | [user-management](modules/04.05-user-management.md) | Profile primitives, preferences, account settings và user data access. | NOT STARTED |
| 04.06 | [api-client](modules/04.06-api-client.md) | Typed API client, request middleware, retries, error normalization và caching. | NOT STARTED |
| 04.07 | [storage](modules/04.07-storage.md) | Local storage abstractions, secure storage, file upload/download và cache policies. | NOT STARTED |
| 04.08 | [event-system](modules/04.08-event-system.md) | Typed domain events, event dispatch, subscriptions và cross-module communication. | NOT STARTED |
| 04.09 | [notifications](modules/04.09-notifications.md) | Notification models, templates, preferences, in-app and push abstractions. | NOT STARTED |
| 04.10 | [localization](modules/04.10-localization.md) | Locale management, translation resources, formatting và language fallback. | NOT STARTED |
| 04.11 | [accessibility](modules/04.11-accessibility.md) | Keyboard navigation, screen reader semantics, contrast, scalable text và reduced motion. | NOT STARTED |
| 04.12 | [device-management](modules/04.12-device-management.md) | Device capability detection, platform adaptation, device sessions và app capability registry. | NOT STARTED |
| 04.13 | [utilities](modules/04.13-utilities.md) | Date/time, validation, formatting, identifiers, error helpers và common primitives. | NOT STARTED |

## 4. Folder structure
```text
04-shared-core/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `packages/`

Chưa có mã nguồn.

## 6. Dependencies
- [00 Olaa Platform](../00-olaa-platform/README.md) — interface: chưa định nghĩa
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

Owner đề xuất: Platform engineering.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
