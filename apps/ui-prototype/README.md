# Olaa UI prototype

Trang demo tĩnh (một file HTML, không cần build) cho giao diện mới của ba app: Olaa Language, Olaa Note (TakeNote) và Olaa Habits. Dựng theo câu trả lời của chủ dự án trong:

- `architecture/PRD/UIUX_PRD_v0.1.md`: bảng 7 màu, font, chế độ sáng/tối, chuyển động, phong cách mẫu.
- `architecture/PRD/UI_BUTTONS_PRD_v0.1.md`: vị trí các nút, bộ chuyển app, nút "+", thanh công cụ nổi của Note.

## Xem

Mở `index.html` bằng trình duyệt, hoặc chạy:

```bash
python3 -m http.server -d apps/ui-prototype 8000
```

rồi mở http://localhost:8000.

## Phạm vi

- Là bản mẫu để duyệt giao diện, **không** phải mã của app: dữ liệu là ví dụ, không đăng nhập, không lưu lên tài khoản. Chỉ ghi nhớ lựa chọn ngôn ngữ, giao diện và vị trí thanh công cụ trong trình duyệt.
- Khi giao diện được duyệt, design system sẽ được tách thành package dùng chung (`packages/`) theo một ADR, rồi áp dụng vào từng repository app. Lúc đó trang này được thay hoặc xoá, để không tồn tại hai bản mã giống nhau.
- Font: San Francisco trên thiết bị Apple; nơi khác dùng Inter (tải từ Google Fonts trong bản mẫu này; app thật đóng gói Inter).
