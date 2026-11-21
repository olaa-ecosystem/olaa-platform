# Firebase — cấu hình dùng chung

Cấu hình cho Firebase project chung `olaa-ecosystem` (ADR-0004). Mỗi app tự deploy phần hosting của mình từ repository app; thư mục này chỉ giữ phần dùng chung.

| File | Nội dung |
|---|---|
| `firestore.rules` | Luật bảo mật Firestore. Mỗi app một vùng dữ liệu; người dùng chỉ đọc và ghi document của chính mình |
| `firebase.json`, `.firebaserc` | Trỏ Firebase CLI tới project `olaa-ecosystem`; cổng emulator |
| `test/rules.test.cjs`, `package.json` | Test luật trên emulator |

## Vùng dữ liệu

| Đường dẫn | App | Nội dung |
|---|---|---|
| `language/{uid}` | 01 Olaa Language | Tiến độ học, lưu dạng JSON trong `stateJson` |
| `events/{eventId}` | 01 → 02 | Event giữa các app, bất biến; xem `contracts/events/language-events.md` |
| `habits/{uid}` | 02 Olaa Habits | Thói quen, lượt hoàn thành, ngày đóng băng, huy hiệu; JSON trong `stateJson` |

Thêm vùng mới (`takenote/…`) khi app tương ứng bắt đầu dùng Firebase.

## Kiểm thử luật

Chạy trên Firestore emulator, không đụng vào project thật. Cần Node 20+ và Java 11+.

```bash
cd infrastructure/firebase && npm install && npm test
```

`test/rules.test.cjs` kiểm tra quyền của `language/`, `habits/`, `events/` với đúng dạng dữ liệu mà các app ghi.

## Deploy luật

Cách 1 — dán vào console: Firebase console → Firestore Database → Rules → dán nội dung `firestore.rules` → Publish.

Cách 2 — dùng Firebase CLI:

```bash
npm install -g firebase-tools
```

```bash
firebase login
```

```bash
cd infrastructure/firebase && firebase deploy --only firestore:rules
```
