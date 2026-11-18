# 02 — OLAA HABITS

Ứng dụng hình thành thói quen, quản lý mục tiêu và theo dõi tiến trình cá nhân.

> Mã nguồn của nhánh này nằm ở repository `olaa-habits`. Thư mục này chỉ giữ đặc tả, liên kết và trạng thái; không chứa mã nguồn.

## 1. Mục tiêu
Ứng dụng hình thành thói quen, quản lý mục tiêu và theo dõi tiến trình cá nhân.

## 2. Phạm vi
Habit schedules, check-ins, goals and habit calculations.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 02.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 02.01 | [habit-management](modules/02.01-habit-management.md) | Create/edit/archive habits, categories, descriptions, icons và habit lifecycle. | NOT STARTED |
| 02.02 | [scheduling](modules/02.02-scheduling.md) | Daily/weekly/custom schedules, frequency, start dates, end dates và timezone rules. | NOT STARTED |
| 02.03 | [habit-tracking](modules/02.03-habit-tracking.md) | Check-ins, completion status, partial progress, notes, evidence và correction history. | NOT STARTED |
| 02.04 | [streaks](modules/02.04-streaks.md) | Current/best streak, grace days, missed-day rules và streak calculation. | NOT STARTED |
| 02.05 | [goals](modules/02.05-goals.md) | Outcome goals, milestones, target values, deadlines và progress measurement. | NOT STARTED |
| 02.06 | [routines](modules/02.06-routines.md) | Morning/evening routines, ordered steps, templates và routine execution. | NOT STARTED |
| 02.07 | [calendar](modules/02.07-calendar.md) | Calendar views, daily summaries, planned activities và habit history. | NOT STARTED |
| 02.08 | [reminders](modules/02.08-reminders.md) | Local/push/email reminders, quiet hours, snooze và delivery preferences. | NOT STARTED |
| 02.09 | [statistics](modules/02.09-statistics.md) | Completion rates, consistency, trends, period comparisons và charts. | NOT STARTED |
| 02.10 | [gamification](modules/02.10-gamification.md) | Points, badges, levels, achievements và opt-in reward mechanics. | NOT STARTED |
| 02.11 | [insights](modules/02.11-insights.md) | Pattern detection, habit correlations, friction signals và actionable suggestions. | NOT STARTED |
| 02.12 | [habits-settings](modules/02.12-habits-settings.md) | Tracking preferences, week start, timezone, privacy và notification settings. | NOT STARTED |

## 4. Folder structure
```text
02-olaa-habits/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
repository `olaa-habits`

Chưa có mã nguồn.

## 6. Dependencies
- [00 Olaa Platform](../00-olaa-platform/README.md) — interface: chưa định nghĩa
- [04 Shared Core](../04-shared-core/README.md) — interface: chưa định nghĩa
- [05 Backend Services](../05-backend-services/README.md) — interface: chưa định nghĩa
- [07 Database Architecture](../07-database-architecture/README.md) — interface: chưa định nghĩa

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

Owner đề xuất: Habits domain.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
