# PRD giao diện và trải nghiệm (UI/UX) — Olaa web

| | |
|---|---|
| Phiên bản | 0.1 (bản nháp để hỏi lại chủ dự án) |
| Ngày | 2026-11-20 |
| Phạm vi | Ba web app: Olaa Language, Olaa Habits, Olaa TakeNote |
| Trạng thái | DRAFT: các mục "Câu hỏi" chưa có câu trả lời |
| Công cụ tham khảo | Skill "UI UX Pro Max" (chủ dự án cung cấp): tra cứu phong cách, màu, chữ, quy tắc UX từ dữ liệu offline |

Tài liệu này không thay đổi 22 nhánh kiến trúc. Nó gom các quyết định về giao diện đang để ngỏ, để chủ dự án trả lời từng câu. Câu trả lời sẽ thành phiên bản 1.0 và một design system dùng chung cho cả ba app.

## 1. Những gì đã biết

| Chủ đề | Hiện trạng | Nguồn |
|---|---|---|
| Người dùng | Người Việt, học sinh và sinh viên 15–25 tuổi, học nghiêm túc; TakeNote dùng nhiều trên iPad | PRD từng app, phỏng vấn |
| Nền tảng | Web (React + Vite), chạy trên điện thoại, iPad và máy tính | ADR-0003 |
| Ngôn ngữ giao diện | Tiếng Việt mặc định, có English (đang làm) | Yêu cầu 2026-11-20 |
| Font | San Francisco trên thiết bị Apple; Inter (đóng gói trong app) trên Windows, Android | Yêu cầu 2026-11-20; giấy phép SF không cho nhúng vào web |
| Màu hiện tại | Xanh dương `#2d80bb` chính, cam `#e87e2d` nhấn, nền kem `#fdf7ec`; có chế độ tối theo hệ thống | `src/styles/global.css` ba app |
| Nhân vật | 10 linh vật (gấu, mèo, cá voi…) trong Language | `components/mascots` |
| Biểu tượng | Biểu tượng SVG tự vẽ cho điều hướng; emoji cho biểu tượng thói quen và bài học | Mã nguồn |

## 2. Gợi ý từ skill (chưa phải quyết định)

Skill được chạy hai lần với hai cách mô tả sản phẩm. Kết quả khác nhau rõ, và đó chính là câu hỏi lớn nhất cho chủ dự án (câu 1).

| | Hướng A: "app học ngôn ngữ vui" | Hướng B: "app học tập và năng suất" |
|---|---|---|
| Phong cách | Claymorphism: khối mềm, viền dày, bóng đôi, bo 16–24px | Flat Design: phẳng, không bóng, đường nét sạch |
| Màu | Chàm `#4F46E5` + xanh lá tiến độ `#16A34A`, nền `#EEF2FF` | Xanh ngọc `#0D9488` + cam hành động `#EA580C`, nền `#F0FDFA` |
| Chữ skill đề xuất | Baloo 2 + Comic Neue (dành cho trẻ em) | Plus Jakarta Sans |
| Hợp với | Language, Habits (chuỗi ngày, huy hiệu) | TakeNote, Habits |
| Cần tránh | Thiết kế nhàm, thiếu động lực | Onboarding dài, chậm |

Skill gợi ý thêm theo loại sản phẩm:
- **App học ngôn ngữ**: màu vui + thanh tiến độ rõ; trang giới thiệu dạng "tính năng + bằng chứng xã hội".
- **App theo dõi thói quen**: cam ấm cho chuỗi ngày, xanh lá cho tiến độ.
- **App ghi chú trên iPad**: dữ liệu của skill không có mục này; dùng nguyên tắc chung (tập trung vào nội dung, ít khung viền).

Quy tắc UX skill coi là bắt buộc, áp dụng dù chọn hướng nào:
- Chữ thường tương phản ít nhất 4.5:1 ở cả chế độ sáng và tối.
- Vùng chạm tối thiểu 44×44 px; nút có trạng thái nhấn rõ, không làm xô lệch bố cục.
- Không dùng emoji làm biểu tượng điều hướng hay điều khiển; dùng một bộ SVG thống nhất (skill đề xuất Phosphor).
- Tôn trọng "giảm chuyển động" của hệ điều hành; onboarding luôn có nút Bỏ qua và Quay lại.
- Thiết kế cho điện thoại trước, kiểm tra ở 375, 768, 1024, 1440 px.

Điểm vướng với hiện trạng:
- Font skill đề xuất (Baloo 2, Plus Jakarta Sans) khác lựa chọn SF/Inter của chủ dự án. Bản này giữ SF/Inter.
- Biểu tượng thói quen và bài học đang là emoji; theo skill nên đổi sang SVG.

## 3. Câu hỏi cho chủ dự án

Mỗi câu có lựa chọn gợi ý; chủ dự án trả lời bằng chữ cái hoặc ý riêng.

| # | Câu hỏi | Lựa chọn | Gợi ý |
|---|---|---|---|
| 1 | Cảm giác chung của cả ba app? | A. Vui, nhiều màu, có linh vật (hướng A) · B. Gọn, tập trung, chuyên nghiệp (hướng B) · C. Language vui, Habits và TakeNote gọn | C |
| 2 | Ba app dùng chung một bộ màu hay mỗi app một màu riêng trên nền chung? | A. Một bộ chung · B. Nền chung, mỗi app một màu nhận diện | B |
| 3 | Màu thương hiệu Olaa chính là màu nào? | A. Giữ xanh `#2d80bb` · B. Chàm (hướng A) · C. Xanh ngọc (hướng B) · D. Màu bạn chọn | A |
| 4 | Linh vật trong Language: giữ, giảm hay bỏ? | A. Giữ như hiện tại · B. Chỉ ở màn chào, kết quả, ôn tập · C. Bỏ | B |
| 5 | Biểu tượng thói quen và bài học: emoji hay SVG? | A. Giữ emoji · B. Đổi sang bộ SVG Phosphor | B |
| 6 | Chế độ tối? | A. Theo hệ thống (hiện tại) · B. Thêm nút chọn Sáng / Tối / Theo hệ thống | B |
| 7 | Mức chuyển động và hiệu ứng? | A. Tối thiểu · B. Vừa phải (khen thưởng khi xong bài) · C. Nhiều | B |
| 8 | Mật độ thông tin? | A. Thoáng · B. Vừa · C. Dày như bảng điều khiển | A cho Language, B cho Habits và TakeNote |
| 9 | Có cần trang giới thiệu (landing page) chung cho Olaa trước khi vào app không? | A. Có, một trang chung · B. Mỗi app một trang · C. Chưa cần | A |
| 10 | Thiết bị ưu tiên khi thiết kế? | A. Điện thoại · B. iPad · C. Máy tính | A cho Language và Habits, B cho TakeNote |
| 11 | Có app hoặc website nào bạn thích về giao diện để tham khảo không? | Tự trả lời (tên hoặc ảnh chụp) | — |
| 12 | Có điều gì bạn không muốn thấy trong giao diện? | Tự trả lời | — |

## 4. Sau khi có câu trả lời

1. Cập nhật tài liệu này lên 1.0, ghi câu trả lời và lý do.
2. Tạo design system dùng chung (màu, chữ, khoảng cách, bo góc, bóng, chuyển động) dưới dạng biến CSS trong `packages/` theo ADR mới, thay cho bộ biến đang lặp lại ở ba app.
3. Áp dụng cho từng app theo thứ tự ưu tiên của chủ dự án, kiểm tra theo danh sách quy tắc ở mục 2.

## 5. Câu trả lời của chủ dự án

| # | Trả lời | Ngày |
|---|---|---|
| 1 | C: Language vui, có linh vật; Habits và TakeNote gọn, tập trung; chung màu và font Olaa | 2026-11-20 |
| 2 | B: nền, chữ, viền và màu trạng thái chung; mỗi app một màu nhận diện (Language xanh dương, Habits xanh lá, TakeNote cam) | 2026-11-20 |
| 3 | Bảng màu riêng của chủ dự án, dùng làm chuẩn cho cả 3 app: Violet Blue `#484AAA`, Tropical Indigo `#9791F1`, Pale Purple `#F7EBF9`, Pale Lavender `#DDC2F2`, Medium Orchid `#9847B4` | 2026-11-20 |

### Đề xuất vai trò cho bảng màu (chờ chủ dự án xác nhận)

Đo độ tương phản theo WCAG; chữ thường cần ít nhất 4.5:1.

| Màu | Vai trò đề xuất | Tương phản đo được |
|---|---|---|
| Violet Blue `#484AAA` | Màu thương hiệu Olaa; nút chính, liên kết, viền focus; màu nhận diện Language | Chữ trắng trên nền này 7.4:1; trên nền Pale Purple 6.4:1 |
| Medium Orchid `#9847B4` | Màu nhận diện Habits; điểm nhấn thứ hai (chuỗi ngày, huy hiệu) | Chữ trắng 5.4:1 |
| Tropical Indigo `#9791F1` | Màu nhận diện TakeNote; thanh tiến độ, hình minh hoạ, ô được chọn; màu chính ở chế độ tối | Chữ trắng chỉ 2.8:1, nên nút màu này dùng chữ đậm `#2B2A3A` (5.1:1); không dùng làm màu chữ trên nền sáng |
| Pale Purple `#F7EBF9` | Nền trang ở chế độ sáng | Chữ `#2B2A3A` 12.2:1 |
| Pale Lavender `#DDC2F2` | Viền thẻ, chip, trạng thái được chọn, nền phụ | Không dùng chữ màu Tropical Indigo trên nền này (1.7:1) |

Màu báo đúng/sai (xanh lá, đỏ) và màu chữ tối không nằm trong bảng; đề xuất giữ màu hiện tại cho các vai trò này để người dùng vẫn nhận ra đúng/sai bằng màu quen thuộc.

| 3b | C: dùng vai trò màu như bảng trên, và không thêm màu ngoài bảng, kể cả cho đúng/sai | 2026-11-20 |

Hệ quả (yêu cầu thiết kế): đúng = Violet Blue `#484AAA`, sai = Medium Orchid `#9847B4`. Hai màu này cùng tông tím, người mù màu hoặc nhìn nhanh khó phân biệt, nên trạng thái đúng/sai **không được chỉ dựa vào màu**: luôn kèm biểu tượng (dấu ✓ / ✗ dạng SVG), chữ ("Chính xác" / "Chưa đúng") và âm thanh khi bật. Chữ tối dùng màu đậm nhất có thể suy ra từ bảng (Violet Blue pha tối) thay cho `#2B2A3A`; sẽ đo lại tương phản khi làm design system.
| 4 | C (chọn lại, thay cho B): bỏ hoàn toàn linh vật ở cả 3 app. Câu 1 vẫn giữ: Language vui hơn hai app kia, nhưng tạo cảm giác vui bằng màu, chuyển động và lời khen, không bằng linh vật | 2026-11-20 |
| 5 | B: biểu tượng SVG một bộ (Phosphor) thay cho emoji ở thói quen, bài học và điều hướng; tô theo bảng 5 màu | 2026-11-20 |
| 6 | B: nút chọn Sáng / Tối / Theo thiết bị trong cài đặt, mặc định Theo thiết bị; màu chính ở chế độ tối là Tropical Indigo | 2026-11-20 |
| 7 | C: nhiều chuyển động (chuyển trang, thành phần trượt vào khi cuộn, hiệu ứng khen thưởng); luôn tắt khi thiết bị bật "giảm chuyển động" | 2026-11-20 |
| 7b | Thêm đen `#000000` và trắng `#FFFFFF` vào bảng màu chuẩn (bảng có 7 màu) | 2026-11-20 |

Hệ quả của 7b: chữ chính dùng đen trên nền sáng (đen trên Pale Purple 18.2:1), thay cho màu chữ tối suy ra ở câu 3b. Nút Tropical Indigo dùng chữ đen (7.6:1). Ở chế độ tối, nền đen, chữ trắng; Tropical Indigo và Pale Lavender đọc rõ trên nền đen, còn Violet Blue (2.8:1) và Medium Orchid (3.9:1) chỉ dùng cho mảng màu lớn hoặc nút có chữ trắng, không dùng làm màu chữ trên nền đen.
| 8 | B: mật độ vừa phải cho cả 3 app | 2026-11-20 |
| 9 | A: một trang giới thiệu chung cho Olaa (giới thiệu 3 app, đăng nhập Olaa ID, nút mở từng app); cần site Firebase hoặc tên miền mới | 2026-11-20 |
| 10 | D: Language và Habits ưu tiên điện thoại; TakeNote ưu tiên iPad; vẫn chạy tốt trên mọi thiết bị | 2026-11-20 |
| 11 | A: lấy phong cách của ảnh tham khảo chủ dự án gửi (app quản lý công việc, 3 màn hình điện thoại) làm mẫu cho cả 3 app, đổi màu theo bảng 7 màu | 2026-11-20 |

### Phong cách mẫu (từ câu 11)

| Thành phần | Theo ảnh mẫu | Áp dụng cho Olaa |
|---|---|---|
| Thẻ nội dung | Khối màu đặc, bo góc rất tròn (~28px), nút mũi tên tròn trắng ở góc trên phải, nhãn viên thuốc viền mờ ở góc dưới | Thẻ bài học, thẻ thói quen, bìa sổ tay; màu khối: đen, Tropical Indigo, Pale Lavender, Violet Blue, Medium Orchid |
| Bộ lọc / trạng thái | Viên thuốc, số đếm trong vòng tròn trắng; đang chọn: nền màu đặc | Lọc trạng thái thói quen, cấp độ, thẻ ghi chú; tab Ngày / Tuần / Tháng |
| Thanh điều hướng đáy | Viên thuốc đen nổi trên nền, biểu tượng trắng, mục đang chọn là vòng tròn trắng biểu tượng đen, chấm nhỏ báo mới | Cả 3 app trên điện thoại; Language 6 mục cần thử ở màn 320px |
| Nút biểu tượng | Tròn: "+" nền đen, chuông nền Pale Lavender có chấm báo, bút nền đen | Nút thêm, thông báo, sửa |
| Lịch | Lưới ô tròn; ngày được đánh dấu tô màu đặc theo trạng thái | Lịch Habits: đen = xong, Tropical Indigo = một phần, Pale Lavender = đóng băng (luôn kèm biểu tượng, không chỉ màu) |
| Biểu đồ | Cột bo tròn, xếp chồng nhiều màu, vạch chéo | Tiến độ tuần (XP, thói quen) |
| Chữ | To, nét mảnh ở tiêu đề, nhiều khoảng trống | SF / Inter, tiêu đề 28–32px nét thường, nội dung 15–17px |
| Nền | Trắng / xám rất nhạt | Pale Purple ở chế độ sáng, đen ở chế độ tối |
| 12 | Không có yêu cầu loại trừ thêm | 2026-11-20 |
