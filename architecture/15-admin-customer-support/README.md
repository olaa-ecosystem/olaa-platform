# 15 — ADMIN & CUSTOMER SUPPORT

Giao diện nội bộ và quy trình vận hành; không phải app sản phẩm thứ tư cho người dùng cuối.

## 1. Mục tiêu
Giao diện nội bộ và quy trình vận hành; không phải app sản phẩm thứ tư cho người dùng cuối.

## 2. Phạm vi
Internal console and support operations.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 15.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 15.01 | [admin-console](modules/15.01-admin-console.md) | Internal admin shell, secure access, navigation và operational dashboards. | NOT STARTED |
| 15.02 | [user-tenant-admin](modules/15.02-user-tenant-admin.md) | User lookup, tenant management, membership và account support actions. | NOT STARTED |
| 15.03 | [roles-permissions](modules/15.03-roles-permissions.md) | Admin roles, privileged actions, approval gates và separation of duties. | NOT STARTED |
| 15.04 | [content-admin](modules/15.04-content-admin.md) | Content review, publishing, corrections và content quality operations. | NOT STARTED |
| 15.05 | [subscription-admin](modules/15.05-subscription-admin.md) | Subscription lookup, billing support, entitlement inspection và refunds workflow. | NOT STARTED |
| 15.06 | [support-tickets](modules/15.06-support-tickets.md) | Ticket intake, assignment, status, SLA tracking và customer communication. | NOT STARTED |
| 15.07 | [feedback-announcements](modules/15.07-feedback-announcements.md) | Feedback collection, product announcements, service notices và release communication. | NOT STARTED |
| 15.08 | [moderation](modules/15.08-moderation.md) | Abuse reports, content moderation, enforcement và appeals where applicable. | NOT STARTED |
| 15.09 | [audit-viewer](modules/15.09-audit-viewer.md) | Admin action history, security events và compliance evidence. | NOT STARTED |
| 15.10 | [internal-operations](modules/15.10-internal-operations.md) | Operational checklists, escalation paths và support knowledge base. | NOT STARTED |

## 4. Folder structure
```text
15-admin-customer-support/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `apps/admin-console/`

Chưa có mã nguồn.

## 6. Dependencies
- [00 Olaa Platform](../00-olaa-platform/README.md) — interface: chưa định nghĩa
- [14 Saas & Monetization](../14-saas-monetization/README.md) — interface: chưa định nghĩa
- [08 Security](../08-security/README.md) — interface: chưa định nghĩa
- [17 Data & Product Analytics](../17-data-product-analytics/README.md) — interface: chưa định nghĩa

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

Owner đề xuất: Operations/support owner.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
