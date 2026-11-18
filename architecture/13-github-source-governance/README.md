# 13 — GITHUB & SOURCE GOVERNANCE

Quản lý repository, quyền thay đổi, review, lịch sử và chất lượng mã nguồn.

## 1. Mục tiêu
Quản lý repository, quyền thay đổi, review, lịch sử và chất lượng mã nguồn.

## 2. Phạm vi
Source control, review and repository policy.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 13.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 13.01 | [repository-structure](modules/13.01-repository-structure.md) | Repository layout (4 repositories), app/package/service boundaries và ownership. | NOT STARTED |
| 13.02 | [branch-strategy](modules/13.02-branch-strategy.md) | Main/develop/feature/hotfix strategy phù hợp quy mô nhóm. | NOT STARTED |
| 13.03 | [commit-conventions](modules/13.03-commit-conventions.md) | Commit format, scopes, semantic intent và traceability. | NOT STARTED |
| 13.04 | [pull-requests](modules/13.04-pull-requests.md) | PR template, change description, test evidence và reviewer requirements. | NOT STARTED |
| 13.05 | [code-ownership](modules/13.05-code-ownership.md) | CODEOWNERS, protected branches, required checks và approval rules. | NOT STARTED |
| 13.06 | [version-control](modules/13.06-version-control.md) | Tags, releases, changelog, revert strategy và repository hygiene. | NOT STARTED |
| 13.07 | [dependency-governance](modules/13.07-dependency-governance.md) | Dependency updates, license review, vulnerability policy và lockfile discipline. | NOT STARTED |
| 13.08 | [repository-audits](modules/13.08-repository-audits.md) | Periodic structure audits, stale code detection, secret scans và governance reports. | NOT STARTED |

## 4. Folder structure
```text
13-github-source-governance/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`.github/` ở cả 4 repository

Chưa có mã nguồn.

## 6. Dependencies
- [11 Developer Experience](../11-developer-experience/README.md) — interface: chưa định nghĩa
- [10 Quality Assurance](../10-quality-assurance/README.md) — interface: chưa định nghĩa
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

Owner đề xuất: Repository maintainer.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
