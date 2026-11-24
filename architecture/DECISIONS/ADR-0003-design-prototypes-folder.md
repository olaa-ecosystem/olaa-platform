# ADR-0003: Thư mục `prototypes/` cho bản mẫu giao diện

- **Trạng thái:** Proposed
- **Ngày:** 2026-11-24
- **Người quyết định:** chủ dự án (chờ duyệt)
- **Nhánh ảnh hưởng:** 03, 10, 12, 13

## Bối cảnh

Đã có một bản mẫu giao diện iPad cho Olaa TakeNote (HTML, CSS, JavaScript thuần, chạy trong trình duyệt), làm qua 14 vòng góp ý. Theo ADR-0001, mã của app nằm ở repository `olaa-takenote`, nhưng phiên làm việc này chưa được cấp quyền vào repository đó. Bản mẫu không phải mã sản phẩm: không backend, không lưu dữ liệu, không thuộc module nào ở trạng thái IMPLEMENTED.

## Quyết định

- Thêm thư mục gốc `prototypes/` trong `olaa-platform` cho bản mẫu giao diện và tương tác. Mỗi bản mẫu một thư mục `prototypes/<app>-<chủ đề>/`, có README (trạng thái), SECURITY.md và REVIEW.md.
- Bản mẫu không được tính là mã nguồn của module. Trạng thái module giữ NOT STARTED cho đến khi có mã sản phẩm trong repository app.
- Bản mẫu không được import vào `apps/`, `packages/` hay `services/`.
- Khi repository `olaa-takenote` sẵn sàng, chuyển `prototypes/takenote-ipad-home/` sang đó (giữ lịch sử bằng `git subtree split` hoặc chép kèm liên kết commit) và xóa khỏi đây trong cùng một PR.

## Lựa chọn đã cân nhắc

- Đặt thẳng vào `olaa-takenote`: đúng ADR-0001, nhưng chưa có quyền truy cập. Vẫn là đích cuối.
- Đặt trong `architecture/03-olaa-takenote/`: vi phạm quy tắc "architecture/ chỉ chứa tài liệu".
- Không lưu vào Git: mất lịch sử và không kiểm thử được.

## Hệ quả

- `README.md` gốc liệt kê `prototypes/`.
- `architecture/03-olaa-takenote/README.md` liên kết tới bản mẫu và ghi rõ đó không phải mã nguồn của nhánh.
- Bản mẫu có kiểm thử Playwright riêng; CI (nhánh 10) có thể chạy khi được thiết lập.
