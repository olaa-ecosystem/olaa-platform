# ADR-0001: Mô hình 4 repository thay cho monorepo

- **Trạng thái:** Accepted
- **Ngày:** 2026-11-18
- **Người quyết định:** chủ dự án
- **Nhánh ảnh hưởng:** 00, 01, 02, 03, 04, 11, 12, 13, 20

## Bối cảnh

`ATOZ_MASTER_ARCHITECTURE.md` và master prompt đề xuất một monorepo duy nhất. Trên GitHub organization `olaa-ecosystem` đã có ba repository app riêng (`olaa-language`, `olaa-habitstracker`, `olaa-note`) với bộ tài liệu khung giống nhau. Các tài liệu này tham chiếu tới "OLAA ID", "OLAA API/Core" và "OLAA Contracts" nhưng chưa có nơi nào chứa chúng. Kiến trúc 22 nhánh, Shared Core, contracts và backend cũng chưa có chỗ đặt.

## Quyết định

Giữ ba repository app và thêm một repository chung:

| Repository | Vai trò |
|---|---|
| `olaa-platform` | `architecture/` cho cả 22 nhánh, ADR, contracts, shared packages, backend, database, hạ tầng, platform shell, admin console |
| `olaa-language` | Ứng dụng Olaa Language (nhánh 01) |
| `olaa-habits` | Ứng dụng Olaa Habits (nhánh 02), đổi tên từ `olaa-habitstracker` |
| `olaa-takenote` | Ứng dụng Olaa TakeNote (nhánh 03), đổi tên từ `olaa-note` |

`olaa-platform/architecture/` là nơi duy nhất quản lý registry, dependency map, trạng thái và ADR. Thư mục kiến trúc của nhánh 01–03 chỉ giữ đặc tả và liên kết; mã nguồn nằm trong repository app.

## Lựa chọn đã cân nhắc

1. **Monorepo duy nhất** (theo tài liệu gốc). Đồng bộ Shared Core và contracts dễ nhất, một lần review cho thay đổi xuyên nhánh. Không chọn vì chủ dự án muốn giữ ba app quản lý và phát hành riêng.
2. **Ba repository app, không có repository chung.** Không chọn vì mỗi app sẽ tự xây lại auth, design system và API client, vi phạm nguyên tắc Shared Core.
3. **Năm repository (tách `olaa-architecture` và `olaa-core`).** Ranh giới rõ hơn nhưng thêm chi phí đồng bộ khi dự án còn nhỏ.

## Hệ quả

- Shared Core phải được phát hành dưới dạng package có phiên bản để repository app tiêu thụ. Cách phát hành chưa chốt (ghi trong `IMPLEMENTATION_STATUS.md`).
- Contract dùng chung phải có phiên bản; app chỉ dùng phiên bản đã phát hành, không sao chép schema.
- Thay đổi xuyên repository không thể gói trong một PR. Phải ghi vào `INTEGRATION_CHANGELOG.md` và làm theo thứ tự: contract → provider → consumer.
- Mỗi repository cần CI, CLAUDE.md và quy ước Git riêng nhưng thống nhất.
- Master prompt mục 8 ("Tổ chức dự án theo mô hình Monorepo") cần được cập nhật theo ADR này.
