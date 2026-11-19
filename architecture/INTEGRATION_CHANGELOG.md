# Integration Changelog

Ghi mọi thay đổi ảnh hưởng tới liên kết giữa các nhánh hoặc giữa các repository: contract mới hoặc đổi, package Shared Core phát hành, đổi tên, đổi owner, thêm hoặc bỏ phụ thuộc.

Mỗi mục gồm: ngày, nhánh hoặc repository nguồn, nhánh bị ảnh hưởng, loại (`contract`, `package`, `dependency`, `rename`, `ownership`, `breaking`), mô tả, ADR hoặc PR, và việc consumer cần làm.

## 2026-11-19

| Nguồn | Ảnh hưởng | Loại | Mô tả | Tham chiếu | Việc cần làm |
|---|---|---|---|---|---|
| 01 Olaa Language (`olaa-language`) | 00, 04, 05, 06, 07 | dependency | MVP của `olaa-language` (commit `46e5f58`) chạy độc lập: không dùng contract hay package nào từ `olaa-platform`, tự giữ nội dung khóa học, design token và mascot, lưu tiến độ trong `localStorage` (khóa `olaa-language/state`, `STATE_VERSION` 1). Các phụ thuộc của nhánh 01 trong `DEPENDENCY_MAP.md` vẫn PENDING | `01-olaa-language/CHANGELOG.md` | Khi định nghĩa contract OLAA ID (00), đồng bộ tiến độ (05) và nội dung (06): tính đến dữ liệu `localStorage` đang có và cần đường chuyển đổi; 04 Design System nên đối chiếu token hiện có trong `olaa-language` |

## 2026-11-18

| Nguồn | Ảnh hưởng | Loại | Mô tả | Tham chiếu | Việc cần làm |
|---|---|---|---|---|---|
| 12 Documentation | Tất cả | dependency | Tạo `architecture/` với 22 nhánh, Module Registry (229 module) và Dependency Map ban đầu từ tài liệu gốc | ADR-0001 | Không |
| 13 GitHub Governance | 01, 02, 03 | rename | Mô hình 4 repository; `olaa-platform` chứa kiến trúc và phần dùng chung | ADR-0001 | Repository app trỏ "OLAA ID/API/Contracts" về `olaa-platform` |
| 00, 01, 02, 03 | Tất cả | rename | Thương hiệu Olaa; Olaa Language, Olaa Habits, Olaa TakeNote; `olaa-habitstracker` → `olaa-habits`, `olaa-note` → `olaa-takenote` | ADR-0002 | Đổi tên repository trên GitHub; cập nhật remote cục bộ; sửa tiêu đề tài liệu trong 3 repository app |
