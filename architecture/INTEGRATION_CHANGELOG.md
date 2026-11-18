# Integration Changelog

Ghi mọi thay đổi ảnh hưởng tới liên kết giữa các nhánh hoặc giữa các repository: contract mới hoặc đổi, package Shared Core phát hành, đổi tên, đổi owner, thêm hoặc bỏ phụ thuộc.

Mỗi mục gồm: ngày, nhánh hoặc repository nguồn, nhánh bị ảnh hưởng, loại (`contract`, `package`, `dependency`, `rename`, `ownership`, `breaking`), mô tả, ADR hoặc PR, và việc consumer cần làm.

## 2026-11-18

| Nguồn | Ảnh hưởng | Loại | Mô tả | Tham chiếu | Việc cần làm |
|---|---|---|---|---|---|
| 12 Documentation | Tất cả | dependency | Tạo `architecture/` với 22 nhánh, Module Registry (229 module) và Dependency Map ban đầu từ tài liệu gốc | ADR-0001 | Không |
| 13 GitHub Governance | 01, 02, 03 | rename | Mô hình 4 repository; `olaa-platform` chứa kiến trúc và phần dùng chung | ADR-0001 | Repository app trỏ "OLAA ID/API/Contracts" về `olaa-platform` |
| 00, 01, 02, 03 | Tất cả | rename | Thương hiệu Olaa; Olaa Language, Olaa Habits, Olaa TakeNote; `olaa-habitstracker` → `olaa-habits`, `olaa-note` → `olaa-takenote` | ADR-0002 | Đổi tên repository trên GitHub; cập nhật remote cục bộ; sửa tiêu đề tài liệu trong 3 repository app |
