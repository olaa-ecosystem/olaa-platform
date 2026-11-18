# Architecture

Tài liệu kiến trúc của toàn hệ sinh thái Olaa. Thư mục này không chứa mã nguồn.

## File quản lý

| File | Dùng để |
|---|---|
| [OLAA_MASTER_ARCHITECTURE.md](OLAA_MASTER_ARCHITECTURE.md) | Nguồn kiến trúc chuẩn: 22 nhánh, nhánh con, ownership, quy tắc |
| [MODULE_REGISTRY.md](MODULE_REGISTRY.md) | Mọi module, owner và vị trí mã nguồn canonical |
| [DEPENDENCY_MAP.md](DEPENDENCY_MAP.md) | Nhánh nào phụ thuộc nhánh nào, qua interface nào |
| [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) | Trạng thái thực tế từng nhánh |
| [INTEGRATION_CHANGELOG.md](INTEGRATION_CHANGELOG.md) | Thay đổi ảnh hưởng nhiều nhánh hoặc repository |
| [DECISIONS/](DECISIONS/README.md) | Architecture Decision Records |

## Cấu trúc mỗi nhánh

```text
NN-<slug>/
├── README.md        # 12 mục: mục tiêu → next steps
├── CHANGELOG.md
├── requirements/    # REQ-NN-xxx
├── modules/         # một file đặc tả cho mỗi module con NN.MM
├── api-contracts/   # chỉ mục contract (schema thật ở contracts/)
├── database/        # inventory dữ liệu (migration thật ở database/)
└── tests/           # kế hoạch kiểm thử (test thật nằm cạnh mã nguồn)
```

## 22 nhánh

| Mã | Nhánh | Repository mã nguồn |
|---|---|---|
| 00 | [Olaa Platform](00-olaa-platform/README.md) | `olaa-platform` |
| 01 | [Olaa Language](01-olaa-language/README.md) | `olaa-language` |
| 02 | [Olaa Habits](02-olaa-habits/README.md) | `olaa-habits` |
| 03 | [Olaa TakeNote](03-olaa-takenote/README.md) | `olaa-takenote` |
| 04 | [Shared Core](04-shared-core/README.md) | `olaa-platform` |
| 05 | [Backend Services](05-backend-services/README.md) | `olaa-platform` |
| 06 | [Content Management](06-content-management/README.md) | `olaa-platform` |
| 07 | [Database Architecture](07-database-architecture/README.md) | `olaa-platform` |
| 08 | [Security](08-security/README.md) | xuyên suốt |
| 09 | [DevOps & Infrastructure](09-devops-infrastructure/README.md) | `olaa-platform` |
| 10 | [Quality Assurance](10-quality-assurance/README.md) | xuyên suốt |
| 11 | [Developer Experience](11-developer-experience/README.md) | xuyên suốt |
| 12 | [Documentation & Architecture](12-documentation-architecture/README.md) | `olaa-platform` |
| 13 | [GitHub & Source Governance](13-github-source-governance/README.md) | xuyên suốt |
| 14 | [SaaS & Monetization](14-saas-monetization/README.md) | `olaa-platform` |
| 15 | [Admin & Customer Support](15-admin-customer-support/README.md) | `olaa-platform` |
| 16 | [Integrations](16-integrations/README.md) | `olaa-platform` |
| 17 | [Data & Product Analytics](17-data-product-analytics/README.md) | `olaa-platform` |
| 18 | [Observability & Reliability](18-observability-reliability/README.md) | `olaa-platform` |
| 19 | [Privacy & Data Governance](19-privacy-data-governance/README.md) | xuyên suốt |
| 20 | [API & Integration Contracts](20-api-integration-contracts/README.md) | `olaa-platform` |
| 21 | [Search & Media Processing](21-search-media-processing/README.md) | `olaa-platform` |
