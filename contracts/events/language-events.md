# Event contract: Olaa Language → other apps

| | |
|---|---|
| Trạng thái | PROPOSED (chờ nhánh 20 duyệt) |
| Producer | 01 Olaa Language |
| Consumer | 02 Olaa Habits (REQ-02-010, REQ-02-011, REQ-02-015) |
| Kênh | Firestore collection `events/` trong project `olaa-ecosystem` (ADR-0004) |
| Luật truy cập | `infrastructure/firebase/firestore.rules`, mục `events` |

## Document

Mỗi event là một document bất biến trong `events/{eventId}`:

| Trường | Kiểu | Ý nghĩa |
|---|---|---|
| `type` | string | Một trong các loại ở bảng dưới |
| `userId` | string | Firebase Auth uid của người học |
| `date` | string `YYYY-MM-DD` | Ngày theo giờ địa phương của người học khi sự việc xảy ra |
| `occurredAt` | int (ms) | Thời điểm tạo event |
| `source` | string | Luôn là `"language"` |
| `payload` | map | Dữ liệu riêng của từng loại |

`eventId` được tạo theo quy tắc cố định bên dưới, nên gửi lại cùng một event không tạo bản sao: lần ghi thứ hai bị luật từ chối (event bất biến) và producer bỏ qua lỗi đó.

## Loại event

| `type` | Khi nào | `payload` | `eventId` |
|---|---|---|---|
| `language.daily_goal.completed` | XP trong ngày vượt mục tiêu ngày lần đầu | `courseId`, `xp`, `goalXp` | `{uid}_language.daily_goal.completed_{date}` |
| `language.lesson.completed` | Hoàn thành một bài lần đầu (bài mới, không tính học lại) | `courseId`, `lessonId` | `{uid}_language.lesson.completed_{courseId}_{lessonId}` |

Chưa có (PRD 02, P1 sau): `language.speaking.attempted`, `language.flashcard.created`.

## Quy tắc cho consumer

- Chỉ đọc event của chính người dùng (`userId == auth.uid`).
- Tính theo `date`, không theo `occurredAt`.
- Không ghi, sửa hay xoá event.
- Event có thể đến trễ (người học offline). Consumer phải tính lại kết quả khi event mới đến.
