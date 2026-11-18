# 00 — OLAA PLATFORM

Lớp điều phối trung tâm; khởi tạo ứng dụng, định tuyến, tài khoản, workspace và trải nghiệm thống nhất.

## 1. Mục tiêu
Lớp điều phối trung tâm; khởi tạo ứng dụng, định tuyến, tài khoản, workspace và trải nghiệm thống nhất.

## 2. Phạm vi
Global shell, app registry, workspace and tenant context.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 00.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 00.01 | [platform-core](modules/00.01-platform-core.md) | App bootstrap, lifecycle, runtime configuration, environment, global state, feature flags và app shell. | NOT STARTED |
| 00.02 | [application-management](modules/00.02-application-management.md) | App registry, module registration, navigation, routing, deep links, app permissions và khả năng bật/tắt module. | NOT STARTED |
| 00.03 | [identity-management](modules/00.03-identity-management.md) | Đăng ký, đăng nhập, đăng xuất, khôi phục tài khoản, session, device sessions và account lifecycle. | NOT STARTED |
| 00.04 | [user-workspace](modules/00.04-user-workspace.md) | Dashboard, hồ sơ, cài đặt, preferences, personalization và workspace cá nhân. | NOT STARTED |
| 00.05 | [tenant-management](modules/00.05-tenant-management.md) | Personal workspace, organization workspace, membership, invitations, role assignment và workspace switching. | NOT STARTED |
| 00.06 | [platform-experience](modules/00.06-platform-experience.md) | Onboarding, global navigation, notification center, help, empty states, error pages và responsive shell. | NOT STARTED |
| 00.07 | [platform-configuration](modules/00.07-platform-configuration.md) | Environment config, remote config, feature flags, app version compatibility và capability detection. | NOT STARTED |

## 4. Folder structure
```text
00-olaa-platform/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `apps/platform-shell/`, `services/platform/`, `services/identity/`

Chưa có mã nguồn.

## 6. Dependencies
- [04 Shared Core](../04-shared-core/README.md) — interface: chưa định nghĩa
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

Owner đề xuất: Platform team / platform domain.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
