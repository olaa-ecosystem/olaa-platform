# 18 — OBSERVABILITY & RELIABILITY

Theo dõi sức khỏe kỹ thuật, độ tin cậy và chất lượng dịch vụ theo thời gian.

## 1. Mục tiêu
Theo dõi sức khỏe kỹ thuật, độ tin cậy và chất lượng dịch vụ theo thời gian.

## 2. Phạm vi
Technical health, reliability and incidents.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 18.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 18.01 | [logging](modules/18.01-logging.md) | Structured logs, correlation IDs, redaction và retention. | NOT STARTED |
| 18.02 | [metrics](modules/18.02-metrics.md) | Service, infrastructure, application and business-operational metrics. | NOT STARTED |
| 18.03 | [distributed-tracing](modules/18.03-distributed-tracing.md) | Trace context, span conventions và cross-service diagnosis. | NOT STARTED |
| 18.04 | [error-monitoring](modules/18.04-error-monitoring.md) | Exception capture, grouping, release tracking và regression alerts. | NOT STARTED |
| 18.05 | [performance-monitoring](modules/18.05-performance-monitoring.md) | Frontend performance, API latency, database performance và sync latency. | NOT STARTED |
| 18.06 | [uptime-health](modules/18.06-uptime-health.md) | Health/readiness checks, synthetic checks và availability reporting. | NOT STARTED |
| 18.07 | [alerting](modules/18.07-alerting.md) | Alert thresholds, routing, escalation và noise reduction. | NOT STARTED |
| 18.08 | [incidents](modules/18.08-incidents.md) | Incident lifecycle, on-call procedures, communication và postmortems. | NOT STARTED |
| 18.09 | [slis-slos](modules/18.09-slis-slos.md) | Service indicators, objectives, error budgets và reliability reviews. | NOT STARTED |
| 18.10 | [capacity](modules/18.10-capacity.md) | Capacity trends, saturation, scaling triggers và resilience testing. | NOT STARTED |

## 4. Folder structure
```text
18-observability-reliability/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `infrastructure/observability/` (đề xuất)

Chưa có mã nguồn.

## 6. Dependencies
- [05 Backend Services](../05-backend-services/README.md) — interface: chưa định nghĩa
- [09 Devops & Infrastructure](../09-devops-infrastructure/README.md) — interface: chưa định nghĩa
- [08 Security](../08-security/README.md) — interface: chưa định nghĩa

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

Owner đề xuất: SRE/operations owner.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
