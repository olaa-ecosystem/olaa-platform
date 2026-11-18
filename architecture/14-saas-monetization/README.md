# 14 — SAAS & MONETIZATION

Quản lý gói dịch vụ, thanh toán, quyền lợi và đo lường sử dụng thương mại.

## 1. Mục tiêu
Quản lý gói dịch vụ, thanh toán, quyền lợi và đo lường sử dụng thương mại.

## 2. Phạm vi
Plans, subscriptions, billing and entitlements.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 14.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 14.01 | [product-plans](modules/14.01-product-plans.md) | Free/paid tiers, plan definitions, plan lifecycle và plan comparison. | NOT STARTED |
| 14.02 | [pricing](modules/14.02-pricing.md) | Pricing rules, regional pricing, taxes and display policy. | NOT STARTED |
| 14.03 | [subscriptions](modules/14.03-subscriptions.md) | Subscribe, upgrade, downgrade, pause, cancel và renewal lifecycle. | NOT STARTED |
| 14.04 | [billing-payments](modules/14.04-billing-payments.md) | Payment provider integration, payment intents, payment status và reconciliation. | NOT STARTED |
| 14.05 | [invoices-refunds](modules/14.05-invoices-refunds.md) | Invoices, receipts, refunds, disputes và billing history. | NOT STARTED |
| 14.06 | [entitlements](modules/14.06-entitlements.md) | Feature access, quotas, limits, add-ons và entitlement evaluation. | NOT STARTED |
| 14.07 | [usage-metering](modules/14.07-usage-metering.md) | Usage counters, quota windows, overage rules và usage reporting. | NOT STARTED |
| 14.08 | [trials-promotions](modules/14.08-trials-promotions.md) | Trials, coupons, campaigns, grace periods và promotional eligibility. | NOT STARTED |
| 14.09 | [revenue-analytics](modules/14.09-revenue-analytics.md) | MRR/ARR, churn, conversion, retention và revenue reporting. | NOT STARTED |

## 4. Folder structure
```text
14-saas-monetization/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `services/billing/`

Chưa có mã nguồn.

## 6. Dependencies
- [00 Olaa Platform](../00-olaa-platform/README.md) — interface: chưa định nghĩa
- [05 Backend Services](../05-backend-services/README.md) — interface: chưa định nghĩa
- [16 Integrations](../16-integrations/README.md) — interface: chưa định nghĩa
- [15 Admin & Customer Support](../15-admin-customer-support/README.md) — interface: chưa định nghĩa

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

Owner đề xuất: Commerce/billing domain.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
