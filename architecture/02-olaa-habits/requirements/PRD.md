# PRD — 02 OLAA HABITS

| | |
|---|---|
| Trạng thái | DRAFT — chờ chủ dự án duyệt |
| Phiên bản | 0.1 |
| Ngày | 2026-11-19 |
| Người phụ trách | Chủ dự án (một người) |
| Repository mã nguồn | `olaa-habits` |
| Nguồn | Phỏng vấn chủ dự án, 6 câu (2026-11-19) |

Các con số mục tiêu và các mục ghi "đề xuất" là đề xuất của người soạn, chưa được chủ dự án chốt.

---

## 1. Bối cảnh và vấn đề

Học sinh, sinh viên đặt mục tiêu học nhưng thường bỏ sau 1–2 tuần. Lý do là app thói quen không biết họ thật sự đã học hay chưa. Họ phải tự đánh dấu bằng tay, vừa phiền vừa dễ đánh dấu cho có.

Olaa Habits giải quyết vấn đề này bằng cách **tự động ghi nhận thói quen học tập từ hoạt động thật trong Olaa Language và Olaa TakeNote**, kèm các cơ chế giữ người dùng qua giai đoạn dễ bỏ cuộc.

## 2. Người dùng mục tiêu

- **Ai:** học sinh, sinh viên 15–25 tuổi, cùng tập người dùng với Language và TakeNote.
- **Thiết bị:** web responsive trên điện thoại, iPad, máy tính.
- **Ngôn ngữ giao diện:** tiếng Việt.

## 3. Mục tiêu và chỉ số thành công

| Chỉ số | Định nghĩa | Mục tiêu (đề xuất) |
|---|---|---|
| Giữ chân sau tuần 2 | % người dùng mới còn hoạt động trong khoảng ngày 14–21 | Cao hơn ít nhất 10 điểm phần trăm so với người dùng Language không dùng Habits |
| Tỷ lệ ghi nhận tự động | % lượt hoàn thành thói quen học tập được ghi tự động | ≥ 80% |

## 4. Phạm vi

### Trong phạm vi MVP

- Thói quen học tập tự động ghi nhận từ Language (học tập là trọng tâm).
- Thói quen tự do, đánh dấu bằng tay.
- Lịch lặp: hằng ngày, các ngày trong tuần, N lần mỗi tuần.
- Chuỗi (streak) và đóng băng chuỗi.
- Nhắc nhở thông minh.
- Phần thưởng và huy hiệu.
- Đăng nhập Olaa ID, đồng bộ, gói thuê bao Olaa chung.

### Để sau MVP

- Ngày nghỉ tự động, tự hạ mục tiêu, tính theo tuần (các phương án không chọn ở câu 4).
- Routine nhiều bước (module 02.06), mục tiêu dài hạn và cột mốc (02.05), phân tích nâng cao (02.11).
- Tín hiệu tự động từ thời gian sửa ghi chú trong TakeNote.

### Ngoài phạm vi

- Soạn nội dung bài học, sổ ghi chú, canvas viết tay, PDF (thuộc Language và TakeNote).

## 5. Yêu cầu chức năng

Ưu tiên: P0 là lõi, làm trước (M2); P1 cũng bắt buộc trước khi ra mắt (M3); P2 làm sau ra mắt.

### 5.1 Thói quen

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-02-001 | 02.01 habit-management | Tạo, sửa, lưu trữ thói quen tự do (tên, biểu tượng, màu) | P0 | Lưu trữ không xóa lịch sử; khôi phục được |
| REQ-02-002 | 02.02 scheduling | Lịch lặp: hằng ngày, chọn ngày trong tuần, N lần mỗi tuần | P0 | Ngày bắt đầu tuần và múi giờ theo cài đặt; mặc định Asia/Ho_Chi_Minh, tuần bắt đầu thứ Hai |
| REQ-02-003 | 02.03 habit-tracking | Đánh dấu hoàn thành bằng tay cho thói quen tự do; sửa được trong 2 ngày gần nhất | P0 | Một chạm để đánh dấu; có hoàn tác |
| REQ-02-004 | 02.01 habit-management | Mẫu thói quen học tập dựng sẵn, người dùng chọn tín hiệu và đặt N | P1 | Thói quen học tập hiển thị trên cùng, có nhãn "tự động" |

### 5.2 Tự động ghi nhận từ Language

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-02-010 | 02.03 habit-tracking | Đạt mục tiêu ngày trong Language thì thói quen hoàn thành | P1 | Ghi nhận trong ≤ 1 phút sau khi nhận event |
| REQ-02-011 | 02.03 habit-tracking | Hoàn thành ≥ N bài mới trong ngày | P1 | Chỉ tính bài mới, không tính bài làm lại |
| REQ-02-012 | 02.03 habit-tracking | Luyện nói ≥ N câu trong ngày | P1 | Dựa trên event chấm phát âm của Language |
| REQ-02-013 | 02.03 habit-tracking | Tạo ≥ N flashcard từ ghi chú TakeNote | P1 | Dựa trên event Language phát khi tạo thẻ có nguồn TakeNote |
| REQ-02-014 | 02.03 habit-tracking | Thói quen tự động không cho đánh dấu tay | P1 | Nút đánh dấu bị ẩn; có liên kết "Học ngay" mở Language |
| REQ-02-015 | 02.03 habit-tracking | Event đến trễ hoặc trùng vẫn tính đúng ngày, không tính hai lần | P1 | Dùng `event_id` để chống trùng; tính theo ngày ở múi giờ của người dùng |

### 5.3 Chuỗi và chống bỏ cuộc

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-02-020 | 02.04 streaks | Chuỗi hiện tại và chuỗi dài nhất cho từng thói quen | P0 | Với lịch "N lần mỗi tuần", chuỗi tính theo tuần |
| REQ-02-021 | 02.04 streaks | Đóng băng chuỗi: báo trước ngày bận, chuỗi giữ nguyên | P0 | Đề xuất 2 lượt mỗi tháng; chỉ đặt được cho hôm nay hoặc các ngày sau; ngày đóng băng hiện khác màu trên lịch |
| REQ-02-022 | 02.08 reminders | Nhắc nhở vào giờ người dùng chọn | P1 | Không gửi nếu thói quen hôm đó đã hoàn thành |
| REQ-02-023 | 02.08 reminders | Nhắc nhở thông minh: gợi ý giờ nhắc theo giờ người dùng hay học | P1 | Cần ít nhất 7 ngày dữ liệu |
| REQ-02-024 | 02.10 gamification | Huy hiệu cho các mốc: chuỗi 7, 30, 100 ngày; lần đầu đóng băng thành công; tuần hoàn thành đủ | P0 | Huy hiệu không mất khi chuỗi bị đứt |
| REQ-02-025 | 02.07 calendar | Lịch tháng hiển thị ngày hoàn thành, ngày lỡ, ngày đóng băng | P0 | Xem được từng thói quen hoặc tất cả |

### 5.4 Tài khoản và thuê bao

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-02-030 | — (nhánh 00/05) | Đăng nhập Olaa ID, dùng chung với Language và TakeNote | P1 | Event từ Language gắn đúng người dùng |
| REQ-02-031 | 02.03 habit-tracking | Đồng bộ thói quen và lịch sử giữa các thiết bị | P1 | Đổi thiết bị vẫn thấy đủ thói quen và lịch sử |
| REQ-02-032 | — (nhánh 14) | Nằm trong gói thuê bao Olaa chung | P1 | Đọc quyền truy cập qua `billing.entitlement.get` |

## 6. Yêu cầu phi chức năng

| Mã | Yêu cầu |
|---|---|
| NFR-02-001 | Responsive cho điện thoại, iPad, máy tính; đánh dấu thói quen trong ≤ 2 chạm từ màn hình chính |
| NFR-02-002 | Mọi tính toán ngày và chuỗi theo múi giờ của người dùng, đúng khi đổi múi giờ hoặc đi du lịch |
| NFR-02-003 | Thông báo đẩy trên iOS/iPadOS chỉ hoạt động khi web được thêm vào màn hình chính (iOS 16.4+). Cần manifest PWA tối thiểu; email làm kênh nhắc dự phòng |
| NFR-02-004 | Xử lý event idempotent: cùng `event_id` chỉ ghi nhận một lần |
| NFR-02-005 | Dữ liệu thói quen là dữ liệu riêng tư; analytics chỉ đếm sự kiện ẩn danh |

## 7. Tích hợp với hệ sinh thái Olaa

| Phụ thuộc | Nhánh | Dùng cho | Trạng thái nhánh (2026-11-18) |
|---|---|---|---|
| Olaa ID / Auth | 00, 05, 08 | REQ-02-030 | NOT STARTED; auth provider chưa chốt |
| Backend đồng bộ và event bus | 05, 07 | REQ-02-010 đến 015, REQ-02-031 | NOT STARTED |
| Thông báo đẩy và email | 05 | REQ-02-022, 023 | NOT STARTED |
| Thuê bao | 14 | REQ-02-032 | NOT STARTED |
| Analytics | 17 | Mục 3 | NOT STARTED |
| Olaa Language | 01 | REQ-02-010 đến 013 | Event `PENDING` |
| Contract và event | 20 | REQ-02-010 đến 013 | NOT STARTED |

Event tối thiểu Habits tiêu thụ (chờ nhánh 20). Mọi event có `event_id`, `user_id`, `occurred_at`, `timezone`:

- `language.daily_goal.completed`: `course_id`, `date`, `xp`, `minutes`. Đã có trong PRD nhánh 01.
- `language.lesson.completed`: `course_id`, `lesson_id`, `is_new`, `date`.
- `language.speaking.attempted`: `course_id`, `count`, `date`.
- `language.flashcard.created`: `course_id`, `source_app`, `source_ref`, `date`.

## 8. Lộ trình phát hành

**Quyết định của chủ dự án (2026-11-19):** chỉ ra mắt khi các tính năng đã đầy đủ. Không có bản beta công khai thiếu tính năng. Mốc 12/2026 không còn áp dụng; ngày ra mắt chưa chốt.

Ba app ra mắt cùng lúc. Trước đó là các mốc xây dựng nội bộ, không công khai:

| Mốc | Nội dung | Điều kiện xong |
|---|---|---|
| M1 — Nền tảng chung | Firebase (ADR-0004): Olaa ID bằng Firebase Authentication, đồng bộ bằng Firestore, event qua `events/` và Cloud Functions, Cloud Storage, Google Analytics; thuê bao qua cổng thanh toán Việt Nam (ADR-0005) | Một tài khoản đăng nhập được vào cả ba app; event đi được từ app này sang app khác |
| M2 — Lõi từng app | Toàn bộ yêu cầu P0 của ba app | Đạt acceptance criteria của mọi P0 |
| M3 — Tích hợp | Toàn bộ yêu cầu P1: Language ↔ TakeNote, Language → Habits, chấm phát âm, nhắc nhở, thuê bao | Contract test giữa các app đạt |
| M4 — Nội dung và kiểm thử | Nội dung Language đủ phạm vi MVP; kiểm thử nội bộ trên iPad, điện thoại, máy tính | Đủ nội dung; không còn lỗi mất dữ liệu hoặc lỗi chặn |
| Ra mắt | Mở công khai cả ba app và gói thuê bao chung | M1–M4 xong |

P2 làm sau ra mắt.

## 9. Rủi ro và câu hỏi còn mở

### Rủi ro

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Một người làm ba app và nền tảng chung | Cao | Habits là app nhỏ nhất, làm sau cùng trong M2; dùng chung design system với Language |
| Thông báo đẩy trên iOS cần "Thêm vào màn hình chính", nhiều người không làm | Trung bình | Hướng dẫn trong app; email dự phòng |
| Event trễ hoặc mất làm chuỗi đứt sai, gây mất niềm tin | Trung bình | Event idempotent; cho phép tính lại chuỗi khi event đến trễ trong 48 giờ |

### Câu hỏi còn mở

1. Mỗi tháng được bao nhiêu lượt đóng băng chuỗi? Đề xuất 2.
2. Chuỗi của Habits và day streak đang có trong Language là một hay hai? Đề xuất: Language giữ streak học của mình; Habits hiển thị chuỗi theo từng thói quen. Không gộp, để tránh hai app ghi đè dữ liệu của nhau.
3. Người chưa trả phí dùng Habits đến đâu?
