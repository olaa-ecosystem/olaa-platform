# Firebase — cấu hình dùng chung

Cấu hình cho Firebase project chung `olaa-ecosystem` (ADR-0004). Mỗi app tự deploy phần hosting của mình từ repository app; thư mục này chỉ giữ phần dùng chung.

| File | Nội dung |
|---|---|
| `firestore.rules` | Luật bảo mật Firestore. Mỗi app một vùng dữ liệu; người dùng chỉ đọc và ghi document của chính mình |
| `firebase.json`, `.firebaserc` | Trỏ Firebase CLI tới project `olaa-ecosystem` |

## Vùng dữ liệu

| Đường dẫn | App | Nội dung |
|---|---|---|
| `language/{uid}` | 01 Olaa Language | Tiến độ học, lưu dạng JSON trong `stateJson` |

Thêm vùng mới (`habits/…`, `takenote/…`, `events/…`) khi app tương ứng bắt đầu dùng Firebase.

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
