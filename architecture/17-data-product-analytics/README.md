# 17 — DATA & PRODUCT ANALYTICS

Đo lường hành vi và hiệu quả sản phẩm; tách biệt với monitoring kỹ thuật.

## 1. Mục tiêu
Đo lường hành vi và hiệu quả sản phẩm; tách biệt với monitoring kỹ thuật.

## 2. Phạm vi
Product/business measurement with privacy controls.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 17.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 17.01 | [event-tracking](modules/17.01-event-tracking.md) | Event taxonomy, naming, schemas, consent and collection rules. | NOT STARTED |
| 17.02 | [product-analytics](modules/17.02-product-analytics.md) | Activation, engagement, retention, funnels và feature adoption. | NOT STARTED |
| 17.03 | [language-analytics](modules/17.03-language-analytics.md) | Learning activity, skill progress, lesson completion và content effectiveness. | NOT STARTED |
| 17.04 | [habits-analytics](modules/17.04-habits-analytics.md) | Habit consistency, completion trends, goal progress và routine usage. | NOT STARTED |
| 17.05 | [takenote-analytics](modules/17.05-takenote-analytics.md) | Notebook activity, note creation, editing patterns và feature adoption; tránh thu thập nội dung riêng tư. | NOT STARTED |
| 17.06 | [business-analytics](modules/17.06-business-analytics.md) | Plans, conversion, subscription lifecycle, churn và revenue. | NOT STARTED |
| 17.07 | [dashboards](modules/17.07-dashboards.md) | Product, learning, habits, notes và business dashboards. | NOT STARTED |
| 17.08 | [aggregation-export](modules/17.08-aggregation-export.md) | Aggregations, scheduled reports, export và data access controls. | NOT STARTED |
| 17.09 | [analytics-governance](modules/17.09-analytics-governance.md) | Event documentation, retention, consent, minimization và access policy. | NOT STARTED |

## 4. Folder structure
```text
17-data-product-analytics/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `services/analytics/`

Chưa có mã nguồn.

## 6. Dependencies
- [19 Privacy & Data Governance](../19-privacy-data-governance/README.md) — interface: chưa định nghĩa
- Phụ thuộc xuyên suốt: All product domains

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

Owner đề xuất: Product/data owner.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
