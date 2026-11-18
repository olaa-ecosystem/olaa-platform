# 11 — DEVELOPER EXPERIENCE

Chuẩn hóa cách phát triển để người vận hành và Claude Code có thể hiểu, sửa và mở rộng hệ thống an toàn.

## 1. Mục tiêu
Chuẩn hóa cách phát triển để người vận hành và Claude Code có thể hiểu, sửa và mở rộng hệ thống an toàn.

## 2. Phạm vi
Developer workflows, Claude Code rules and tooling.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 11.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 11.01 | [local-development](modules/11.01-local-development.md) | Setup guide, prerequisites, environment bootstrap và seed data. | NOT STARTED |
| 11.02 | [cli-scripts](modules/11.02-cli-scripts.md) | Development commands, generators, migration scripts và maintenance utilities. | NOT STARTED |
| 11.03 | [code-quality](modules/11.03-code-quality.md) | Formatting, linting, type checking, naming, module boundaries và code review standards. | NOT STARTED |
| 11.04 | [debugging](modules/11.04-debugging.md) | Debug configurations, local logs, tracing, fixtures và troubleshooting. | NOT STARTED |
| 11.05 | [developer-environments](modules/11.05-developer-environments.md) | Dev containers, reproducible setup và isolated test environments. | NOT STARTED |
| 11.06 | [claude-code-workflows](modules/11.06-claude-code-workflows.md) | CLAUDE.md, project instructions, task templates, context boundaries và agent workflows. | NOT STARTED |
| 11.07 | [ai-coding-guardrails](modules/11.07-ai-coding-guardrails.md) | No destructive changes without approval, test-before-merge, source-of-truth rules và change summaries. | NOT STARTED |
| 11.08 | [onboarding](modules/11.08-onboarding.md) | Repository tour, architecture map, first task guide và contributor setup. | NOT STARTED |

## 4. Folder structure
```text
11-developer-experience/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `scripts/`; `CLAUDE.md` ở cả 4 repository

Chưa có mã nguồn.

## 6. Dependencies
- [13 Github & Source Governance](../13-github-source-governance/README.md) — interface: chưa định nghĩa
- [12 Documentation & Architecture](../12-documentation-architecture/README.md) — interface: chưa định nghĩa
- [09 Devops & Infrastructure](../09-devops-infrastructure/README.md) — interface: chưa định nghĩa

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

Owner đề xuất: Repository maintainer.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
