# Integration Changelog

Ghi mọi thay đổi ảnh hưởng tới liên kết giữa các nhánh hoặc giữa các repository: contract mới hoặc đổi, package Shared Core phát hành, đổi tên, đổi owner, thêm hoặc bỏ phụ thuộc.

Mỗi mục gồm: ngày, nhánh hoặc repository nguồn, nhánh bị ảnh hưởng, loại (`contract`, `package`, `dependency`, `rename`, `ownership`, `breaking`), mô tả, ADR hoặc PR, và việc consumer cần làm.

## 2026-11-18

| Nguồn | Ảnh hưởng | Loại | Mô tả | Tham chiếu | Việc cần làm |
|---|---|---|---|---|---|
| 12 Documentation | Tất cả | dependency | Tạo `architecture/` với 22 nhánh, Module Registry (229 module) và Dependency Map ban đầu từ tài liệu gốc | ADR-0001 | Không |
| 13 GitHub Governance | 01, 02, 03 | rename | Mô hình 4 repository; `olaa-platform` chứa kiến trúc và phần dùng chung | ADR-0001 | Repository app trỏ "OLAA ID/API/Contracts" về `olaa-platform` |
| 00, 01, 02, 03 | Tất cả | rename | Thương hiệu Olaa; Olaa Language, Olaa Habits, Olaa TakeNote; `olaa-habitstracker` → `olaa-habits`, `olaa-note` → `olaa-takenote` | ADR-0002 | Đổi tên repository trên GitHub; cập nhật remote cục bộ; sửa tiêu đề tài liệu trong 3 repository app |

## 2026-11-19

| Nguồn | Ảnh hưởng | Loại | Mô tả | Tham chiếu | Việc cần làm |
|---|---|---|---|---|---|
| 01, 02, 03 | 05, 14, 17, 20, 21 | dependency | Bản nháp PRD của ba app; đề xuất contract và event `PENDING` giữa Language, TakeNote, Habits và billing | `01-olaa-language/requirements/PRD.md`, `02-olaa-habits/requirements/PRD.md`, `03-olaa-takenote/requirements/PRD.md` | Nhánh 20 định nghĩa schema |
| 00 | 01, 02, 03, 04, 09 | dependency | Cả ba app là web responsive, dùng chung stack React + Vite + TypeScript | ADR-0003 | `olaa-habits`, `olaa-takenote` dùng stack của `olaa-language` |
| 05 | Tất cả | dependency | Firebase làm backend và auth provider; event giữa các app đi qua Firestore `events/` và Cloud Functions | ADR-0004 | Mỗi app truy cập Firebase qua lớp adapter, chỉ trong vùng dữ liệu của mình |
| 14 | 01, 02, 03 | dependency | Thu phí qua cổng thanh toán Việt Nam; app đọc quyền truy cập qua `billing.entitlement.get` | ADR-0005 | Chọn cổng cụ thể trong ADR sau |
