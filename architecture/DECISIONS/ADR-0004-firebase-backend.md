# ADR-0004: Firebase làm backend và auth provider

- **Trạng thái:** Accepted
- **Ngày:** 2026-11-19
- **Người quyết định:** chủ dự án
- **Nhánh ảnh hưởng:** 00, 01, 02, 03, 05, 07, 08, 09, 16, 17, 18, 20, 21

## Bối cảnh

Mốc M1 trong PRD của ba app cần sáu phần dùng chung: Olaa ID (đăng nhập), đồng bộ dữ liệu, truyền sự kiện giữa các app, kho lưu file, thuê bao, analytics. Mọi nhánh nền tảng đều NOT STARTED, auth provider chưa chốt, và dự án chỉ có một người. Tự xây và vận hành máy chủ không khả thi.

## Quyết định

Dùng một Firebase project chung cho cả hệ sinh thái, đặt ở region `asia-southeast1` (Singapore):

| Phần | Dịch vụ Firebase |
|---|---|
| Olaa ID | Firebase Authentication: email, Google, Apple |
| Đồng bộ dữ liệu | Cloud Firestore, bật lưu offline trên web |
| Truyền sự kiện | Collection `events` trong Firestore và Cloud Functions xử lý khi có sự kiện mới |
| Kho lưu file | Cloud Storage for Firebase |
| Thông báo đẩy | Firebase Cloud Messaging |
| Analytics | Google Analytics for Firebase |
| Xử lý phía server (webhook thanh toán, chấm phát âm, quyền truy cập) | Cloud Functions, viết bằng TypeScript |

Ranh giới module giữ như sau:

- Mỗi app chỉ đọc và ghi trong vùng dữ liệu của mình: `language/…`, `habits/…`, `takenote/…`. Security Rules chặn truy cập chéo.
- Trao đổi giữa các app chỉ qua contract đã duyệt: event trong `events/`, hoặc Cloud Function được gọi như một API.
- Code của mỗi app truy cập Firebase qua một lớp adapter (Language đã có `src/services/`), không gọi Firebase rải rác trong UI.

## Lựa chọn đã cân nhắc

1. **Supabase** (Postgres, Auth, Storage). Dùng SQL chuẩn nên dễ chuyển nhà cung cấp hơn. Không chọn: chủ dự án ưu tiên Firebase.
2. **Firebase.** Đủ các phần cần cho M1, gửi thông báo đẩy tốt, lưu offline trên web có sẵn. Chọn.
3. **Tự xây máy chủ.** Không khả thi với một người.

## Hệ quả

- Mục "Auth provider" và phần backend của mục "Framework frontend/backend" trong `IMPLEMENTATION_STATUS.md` được chốt.
- Cloud Functions cần gói trả theo mức dùng (Blaze). Phải gắn thẻ thanh toán và đặt cảnh báo ngân sách ngay khi tạo project.
- Firestore tính tiền theo số lượt đọc và ghi. Không ghi từng nét bút của TakeNote thành một document; gộp nét của một trang thành một document, hoặc lưu thành file trong Cloud Storage.
- Firestore là cơ sở dữ liệu NoSQL độc quyền, khó chuyển đi. Lớp adapter trong mỗi app giới hạn phạm vi phải sửa nếu sau này đổi nhà cung cấp.
- Đăng nhập được giữ riêng cho từng origin. Người dùng đăng nhập một lần ở mỗi app, nhưng dùng cùng một tài khoản.
- Khóa của dịch vụ bên ngoài (chấm phát âm, cổng thanh toán) chỉ nằm trong Cloud Functions, không nằm ở client (NFR-01-006).
- Nhánh 20 định nghĩa schema của các event trong `events/` (đang `PENDING` trong PRD 01, 02, 03).
- Thanh toán: xem ADR-0005.
