# ADR-0002: Thương hiệu Olaa và tên sản phẩm

- **Trạng thái:** Accepted
- **Ngày:** 2026-11-18
- **Người quyết định:** chủ dự án
- **Nhánh ảnh hưởng:** 00, 01, 02, 03, 05, 07, 17

## Bối cảnh

Tài liệu gốc dùng thương hiệu AtoZ (AtoZ English, AtoZ Habits, AtoZ TakeNote). Repository trên GitHub dùng OLAA nhưng tên app không thống nhất: "OLAA Language", "OLAA Habit", "OLAA Note". Master prompt dùng "Olaa English".

## Quyết định

| Nhánh | Tên sản phẩm | Repository | Thư mục kiến trúc |
|---|---|---|---|
| 00 | Olaa Platform | `olaa-platform` | `00-olaa-platform` |
| 01 | Olaa Language | `olaa-language` | `01-olaa-language` |
| 02 | Olaa Habits | `olaa-habits` | `02-olaa-habits` |
| 03 | Olaa TakeNote | `olaa-takenote` | `03-olaa-takenote` |

Quy ước viết:
- Tên hiển thị: "Olaa" (không viết "OLAA" hay "olaa" trong văn bản).
- Tên kỹ thuật (repository, thư mục, package, service): lowercase-kebab-case, tiền tố `olaa-`.
- Đổi theo tên app: module `01.14 english-settings` → `language-settings`; `05.04 english-service` → `language-service`; `17.03 english-analytics` → `language-analytics`; `services/english/` → `services/language/`. Mã module không đổi.
- Nhánh 01 vẫn bao gồm học tiếng Anh; "Language" phản ánh phạm vi nhiều ngôn ngữ.

## Hệ quả

- `OLAA_MASTER_ARCHITECTURE.md` thay thế `ATOZ_MASTER_ARCHITECTURE.md` làm nguồn chuẩn. Bản AtoZ được giữ để đối chiếu, không xóa.
- Hai repository cần đổi tên trên GitHub: `olaa-habitstracker` → `olaa-habits`, `olaa-note` → `olaa-takenote`. GitHub chuyển hướng URL cũ, nhưng remote ở máy cục bộ nên được cập nhật.
- Tiêu đề và nội dung trong ba repository app cần sửa theo tên mới.
- Master prompt (mục 3, 4, 5) cần đổi "Olaa English" → "Olaa Language" và `01-olaa-english` → `01-olaa-language`.
