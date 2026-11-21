# PRD các nút trong ứng dụng — Olaa web

| | |
|---|---|
| Phiên bản | 0.1 (bản nháp để chủ dự án duyệt) |
| Ngày | 2026-11-20 |
| Phạm vi | Trang giới thiệu Olaa, Olaa Language, Olaa Habits, Olaa TakeNote |
| Đi kèm | `UIUX_PRD_v0.1.md` (màu, font, chuyển động, mật độ) |
| Trạng thái | DRAFT |

Tài liệu liệt kê mọi nút người dùng bấm được: nút nằm ở màn hình nào, vùng nào trên màn hình, thuộc loại nào. Danh sách lập từ mã nguồn hiện tại của ba app, cộng các nút mới hoặc bị bỏ theo quyết định trong `UIUX_PRD_v0.1.md`.

Cột **Trạng thái**: **Có** = đã có trong app · **Mới** = cần thêm · **Sửa** = có nhưng cần đổi · **Bỏ** = gỡ khỏi app.

## 1. Quy ước chung cho nút

### 1.1 Loại nút

| Loại | Dùng khi | Hình dạng | Màu (chế độ sáng) |
|---|---|---|---|
| **Chính** | Hành động chính của màn hình; tối đa **một** nút chính mỗi vùng | Nền đặc, bo góc, chữ in đậm | Nền Vàng Olaa `#F5B900`, chữ đen `#151515` (10.3:1); giống nhau ở cả 3 app |
| **Phụ** | Hành động thay thế bên cạnh nút chính | Viền 2px, nền trắng | Viền và chữ đen `#151515` |
| **Chữ** | Hành động nhẹ: Quay lại, Quên mật khẩu, Huỷ | Chỉ có chữ | Chữ Vàng đậm `#7A5800` (6.5:1 trên nền trắng) |
| **Biểu tượng** | Thao tác lặp lại nhiều: hoàn tác, chèn ảnh, nghe | Hình vuông/tròn ≥ 44×44px, biểu tượng SVG trong bộ Olaa (mục 9) | Biểu tượng đen; khi đang bật: nền Vàng kem `#FFEDA8` |
| **Nguy hiểm** | Xoá, đặt lại dữ liệu | Như nút Chữ hoặc Phụ, luôn có hộp xác nhận | Chữ đen, biểu tượng `delete`, hộp xác nhận; không có màu đỏ (chỉ dùng bảng vàng – đen – trắng) |
| **Lựa chọn** (chip) | Chọn một trong vài giá trị: ngôn ngữ, mục tiêu XP, giao diện | Viên thuốc bo tròn | Đang chọn: nền Vàng Olaa, chữ đen; chưa chọn: nền trắng, viền Vàng kem |

### 1.2 Quy tắc vị trí

- **Thanh điều hướng**: điện thoại ở đáy màn hình, tối đa 5 mục; iPad và máy tính ở cột trái.
- **Nút chính của màn hình**: điện thoại đặt ở đáy, rộng hết màn hình, nằm trong tầm ngón cái; máy tính đặt cuối nội dung, căn phải hoặc rộng theo cột.
- **Nút quay lại / đóng**: góc trên bên trái (quay lại) hoặc trên bên phải (đóng một phiên toàn màn hình như bài học, ôn tập).
- **Nút nguy hiểm**: luôn ở cuối trang Cài đặt, tách khỏi các nút khác, có hộp xác nhận ghi rõ hậu quả.
- **Thanh công cụ** (TakeNote): trên cùng, dưới tiêu đề sổ; trên iPad cố định khi cuộn.

### 1.3 Trạng thái mọi nút phải có

Bình thường · Di chuột (máy tính) · Đang nhấn (đổi màu, không làm xô lệch bố cục) · Focus bàn phím (viền rõ) · Vô hiệu (mờ, không bấm được, có lý do khi cần) · Đang xử lý (vòng quay, chặn bấm hai lần).

Nút chỉ có biểu tượng luôn có tên cho trình đọc màn hình (`aria-label`) và chú thích khi di chuột.

## 2. Nút dùng chung cho cả ba app

| Vùng | Nút | Loại | Trạng thái | Ghi chú |
|---|---|---|---|---|
| Cài đặt / Tài khoản | Tiếp tục với Google | Chính | Có | |
| Cài đặt / Tài khoản | Đăng nhập bằng email | Phụ | Có | |
| Cài đặt / Tài khoản | Tạo tài khoản | Chữ → Phụ | Có | Đổi form sang chế độ tạo tài khoản |
| Cài đặt / Tài khoản | Quên mật khẩu? | Chữ | Có | Gửi email đặt lại |
| Cài đặt / Tài khoản | Gửi liên kết đặt lại | Phụ | Có | |
| Cài đặt / Tài khoản | Đăng xuất | Phụ | Có | |
| Cài đặt | Ngôn ngữ giao diện: Tiếng Việt / English | Lựa chọn | Có | Cũng có ở màn chào |
| Cài đặt | Giao diện: Sáng / Tối / Theo thiết bị | Lựa chọn | **Mới** | Câu 6 trong PRD UI/UX |
| Cài đặt | Tải dữ liệu của tôi (JSON) | Phụ | Có (Language, Habits) · **Mới** (TakeNote) | |
| Cài đặt (cuối trang) | Xoá toàn bộ dữ liệu | Nguy hiểm | Có | Hộp xác nhận: Xoá hết / Huỷ |
| Thanh trên cùng | Chuyển app (Language · Habits · TakeNote) | Biểu tượng | **Mới** | Mở danh sách ba app, giữ đăng nhập Olaa ID |
| Mọi hộp xác nhận | Xác nhận / Huỷ | Nguy hiểm hoặc Chính / Chữ | Có | Huỷ được focus trước |

## 3. Trang giới thiệu Olaa (mới)

| Vùng | Nút | Loại | Trạng thái |
|---|---|---|---|
| Đầu trang | Đăng nhập | Chữ | Mới |
| Đầu trang | Tiếng Việt / English | Lựa chọn | Mới |
| Phần mở đầu (hero) | Bắt đầu miễn phí | Chính | Mới |
| Phần mở đầu | Xem ba app | Phụ (cuộn xuống) | Mới |
| Thẻ từng app | Mở Olaa Language / Habits / TakeNote | Phụ, màu nhận diện của app | Mới |
| Cuối trang | Bắt đầu miễn phí (nhắc lại) | Chính | Mới |
| Chân trang | Điều khoản · Quyền riêng tư · Liên hệ | Chữ | Mới |

## 4. Olaa Language

### 4.1 Thanh điều hướng

| Nút | Trạng thái | Ghi chú |
|---|---|---|
| Học · Lộ trình · Chủ đề · Luyện tập · Thẻ từ · Hồ sơ | Có | Giữ 6 mục (câu 7.1) |

### 4.2 Màn chào và bắt đầu

| Màn hình | Vùng | Nút | Loại | Trạng thái |
|---|---|---|---|---|
| Chào | Giữa | Tiếng Việt / English | Lựa chọn | Có |
| Chào | Đáy | Bắt đầu | Chính | Có |
| Chào | Dưới nút chính | Khối đăng nhập Olaa ID (mục 2) | | Có |
| Chọn khoá học | Danh sách | Thẻ khoá học (chọn một) | Lựa chọn dạng thẻ | Sửa: thêm khoá tiếng Tây Ban Nha và tiếng Trung |
| Chọn bạn học | Lưới | 10 linh vật | | **Bỏ** (câu 4: bỏ linh vật) |
| Mục tiêu ngày | Danh sách | Thong thả / Đều đặn / Nghiêm túc / Tăng tốc | Lựa chọn dạng thẻ | Có |
| Mỗi bước | Đáy | Tiếp tục / Bắt đầu học | Chính | Có |
| Mỗi bước | Trên cùng trái | Quay lại | Chữ | Có |

### 4.3 Lộ trình, cấp độ, bài

| Màn hình | Vùng | Nút | Loại | Trạng thái |
|---|---|---|---|---|
| Lộ trình | Trên cùng | Tiếng Anh / Tây Ban Nha / Trung | Lựa chọn | Có |
| Lộ trình | Thẻ "từ cần ôn hôm nay" | Ôn ngay | Phụ | Có (cả thẻ bấm được) |
| Lộ trình | Thẻ từng cấp | Học / Xem lại | Chính | Có |
| Lộ trình | Thẻ từng cấp | Kiểm tra cấp độ / Kiểm tra để vượt cấp | Phụ | Có |
| Cấp độ | Trên cùng trái | ← tên ngôn ngữ | Chữ | Có |
| Cấp độ | Danh sách | Mỗi bài (bấm để mở) | Hàng bấm được | Có |
| Cấp độ | Đáy | Làm bài kiểm tra cấp | Chính | Có |
| Giới thiệu bài | Trên cùng phải | Đóng (×) | Biểu tượng | Có |
| Giới thiệu bài | Chữ Hán, từ vựng | Nghe (loa) | Biểu tượng | Có |
| Giới thiệu bài | Đáy | Bắt đầu luyện tập | Chính | Có |
| Xong bài | Thẻ tóm tắt | Thử thách thêm | Phụ | Có |
| Xong bài | Thẻ tóm tắt | Bài tiếp | Phụ | Có |
| Xong bài | Đáy | Tiếp tục | Chính | Có |

### 4.4 Khi làm bài (dùng cho bài học, luyện tập, kiểm tra, chủ đề)

| Vùng | Nút | Loại | Trạng thái | Ghi chú |
|---|---|---|---|---|
| Trên cùng trái | Thoát | Biểu tượng | Có | Mở hộp: Học tiếp / Kết thúc |
| Đề bài | Nghe · Nghe chậm | Biểu tượng | Có | |
| Đề bài | Xem / Ẩn bản dịch (bài đọc) | Chữ | Có | |
| Đáp án | Các lựa chọn 1–4 | Lựa chọn dạng thẻ | Có | Phím số 1–4 trên bàn phím |
| Đáp án | Thẻ từ (ghép câu), chạm để bỏ | Lựa chọn | Có | |
| Đáp án | Tôi đã nói to câu này | Lựa chọn | Có | |
| Đáp án | Không nghe được lúc này | Chữ | Có | Tạm tắt bài nghe 1 giờ |
| Đáy (trái) | Bỏ qua | Phụ | Có | |
| Đáy (phải) | Kiểm tra → Tiếp tục | Chính | Có | Màu đổi theo đúng/sai, kèm dấu ✓ / ✗ và chữ |
| Bài kiểm tra cấp độ | Bắt đầu · Để sau | Chính · Chữ | Có | |

### 4.5 Luyện tập, thẻ từ, chủ đề, hồ sơ

| Màn hình | Vùng | Nút | Loại | Trạng thái |
|---|---|---|---|---|
| Luyện tập | Thẻ | Sửa lỗi · Thẻ từ · Luyện nhanh | Thẻ bấm được | Có |
| Thẻ từ | Giữa | Thẻ (chạm để lật) | Thẻ bấm được | Có |
| Thẻ từ | Đáy | Xem đáp án → Chưa nhớ · Nhớ · Dễ | Chính → ba nút Phụ | Có |
| Chủ đề | Danh sách | Mỗi chủ đề | Hàng bấm được | Có |
| Chủ đề | Trên cùng | Tiếng Anh / Tây Ban Nha / Trung | Lựa chọn | Có |
| Chủ đề | Đầu nội dung | Luyện tập chủ đề này | Chính | Có |
| Chủ đề | Từ vựng, mẫu câu | Nghe | Biểu tượng | Có |
| Hồ sơ | Bạn học | Chọn linh vật | | **Bỏ** |
| Hồ sơ / Cài đặt | Mục tiêu ngày (10/20/30/50 XP) | Lựa chọn | Có |
| Hồ sơ / Cài đặt | Khoá học | Lựa chọn | Có |
| Hồ sơ / Cài đặt | Âm thanh hiệu ứng | Công tắc | Có |

## 5. Olaa Habits

### 5.1 Thanh điều hướng

Hôm nay · Lịch · Thói quen · Tôi — **Có**, 4 mục.

### 5.2 Các màn hình

| Màn hình | Vùng | Nút | Loại | Trạng thái |
|---|---|---|---|---|
| Chào | Giữa | Tiếng Việt / English | Lựa chọn | Có |
| Chào | Đáy | Bắt đầu | Chính | Có |
| Chọn thói quen mẫu | Danh sách | Mỗi thói quen mẫu (chọn nhiều) | Lựa chọn dạng thẻ | Có |
| Chọn thói quen mẫu | Đáy | Tạo N thói quen | Chính | Có |
| Hôm nay | Mỗi thói quen | Đánh dấu xong / +1 lượng | Biểu tượng lớn (tròn) | Có |
| Hôm nay | Mỗi thói quen | Tuỳ chọn (⋯) | Biểu tượng | Sửa: đổi "⋯" sang biểu tượng SVG |
| Hôm nay | Tuỳ chọn mở ra | Lưu số lượng · Bỏ qua hôm nay · Lưu ghi chú · Tạm dừng thói quen này | Phụ / Chữ | Có |
| Hôm nay | Thói quen tự động | Học ngay (mở Olaa Language) · Đăng nhập để tự ghi nhận | Chữ | Có |
| Hôm nay | Thẻ đóng băng | Đóng băng hôm nay · Bỏ đóng băng | Phụ | Có |
| Hôm nay | Thói quen tạm dừng | Tiếp tục | Phụ | Có |
| Hôm nay | Đầu trang, góc trên phải | Thêm thói quen (+) | Biểu tượng tròn nền đen | Sửa (câu 7.2) |
| Lịch | Trên cùng | Chọn thói quen (danh sách thả) | Lựa chọn | Có |
| Lịch | Trên cùng | Tháng trước · Tháng sau | Biểu tượng | Có |
| Lịch | Lưới | Mỗi ngày (mở chi tiết ngày) | Ô bấm được | Có |
| Lịch | Chi tiết ngày | Đánh dấu · Bỏ qua · Đóng băng ngày này · Bỏ đóng băng | Lựa chọn / Phụ | Có |
| Thói quen | Đầu trang, góc trên phải | Thêm thói quen (+) | Biểu tượng tròn nền đen | Sửa (câu 7.2) |
| Thói quen | Mỗi hàng | Sửa | Hàng bấm được | Có |
| Thói quen | Đã lưu trữ | Khôi phục | Phụ | Có |
| Tạo / sửa thói quen | Form | Cách đo · Biểu tượng · Màu · Lặp lại · Ngày trong tuần · Bớt / Thêm một lần · Tự đánh dấu / Tự động | Lựa chọn | Có |
| Tạo / sửa thói quen | Đáy | Lưu / Tạo thói quen · Huỷ | Chính · Chữ | Có |
| Sửa thói quen | Cuối trang | Tạm dừng / Tiếp tục thói quen · Lưu trữ thói quen | Phụ · Nguy hiểm | Có |
| Tôi | | Các nút ở mục 2 | | Có |

## 6. Olaa TakeNote

### 6.1 Thư viện (màn hình chính)

| Vùng | Nút | Loại | Trạng thái |
|---|---|---|---|
| Trên cùng | Sổ tay mới | Chính | Có |
| Trên cùng | Nhập PDF | Phụ | Có |
| Trên cùng | Ô tìm kiếm | Ô nhập | Có |
| Mỗi sổ tay | Mở (bấm vào bìa) | Thẻ bấm được | Có |
| Mỗi sổ tay | Yêu thích · Lưu trữ · Xoá | Biểu tượng | Có |
| Cuối trang | Đã lưu trữ · Thùng rác | Chữ | Có |
| Trên cùng phải | Cài đặt (ngôn ngữ, giao diện, tải dữ liệu) | Biểu tượng | **Mới** (TakeNote chưa có trang cài đặt) |
| Hộp tạo sổ | Tên · Màu · Loại giấy · Tạo sổ tay · Huỷ | Ô nhập / Lựa chọn / Chính / Chữ | Có |
| Thùng rác | Khôi phục · Xoá hẳn | Phụ · Nguy hiểm | Có |
| Đã lưu trữ | Bỏ lưu trữ | Phụ | Có |
| Tìm kiếm | Mọi thẻ / #thẻ · Đổi tên thẻ | Lựa chọn · Chữ | Có |

### 6.2 Trong một sổ tay (ưu tiên iPad)

| Vùng | Nút | Loại | Trạng thái |
|---|---|---|---|
| Đầu trang trái | Về thư viện | Biểu tượng | Có |
| Đầu trang | Tên sổ (sửa tại chỗ) | Ô nhập | Có |
| Đầu trang phải | Trạng thái lưu · Danh sách trang · Xuất PDF | Nhãn · Biểu tượng · Phụ | Có |
| Thanh công cụ trái | Bút · Dạ quang · Tẩy · Chữ · Chọn | Lựa chọn (biểu tượng) | Có |
| Thanh công cụ (khi chọn bút) | Màu mực · Độ dày | Lựa chọn | Có |
| Thanh công cụ (khi chọn chữ) | In đậm · In nghiêng · Tiêu đề · Danh sách · Danh sách số · Việc cần làm · Trích dẫn · Code · Liên kết | Biểu tượng | Có |
| Thanh công cụ (khi chọn mục) | Mở tệp · Xoá mục đã chọn | Phụ · Nguy hiểm | Có |
| Thanh công cụ phải | Hoàn tác · Làm lại · Chèn ảnh · Đính kèm tệp · Chèn trang PDF · Vẽ bằng ngón tay · Thu phóng | Biểu tượng / Lựa chọn | Có |
| Cột trang (trái) | Ảnh thu nhỏ từng trang · Thêm trang | Thẻ bấm được · Phụ | Có |
| Thanh trang (đáy) | Trang trước · Trang sau · Trang mới · Loại giấy · Nhân bản · Lên trước · Ra sau · Xuất trang này · Xoá trang | Biểu tượng / Lựa chọn / Nguy hiểm | Có |
| Dưới trang | Thẻ của trang (thêm / bỏ) · Chuyển sang sổ khác | Ô nhập · Lựa chọn | Có |
| Thông báo khôi phục | Khôi phục · Bỏ | Phụ · Chữ | Có |

## 7. Câu hỏi cho chủ dự án

| # | Câu hỏi | Gợi ý |
|---|---|---|
| 7.1 | Thanh điều hướng Language đang có 6 mục. Gộp "Học" (khoá cũ) vào "Lộ trình" để còn 5? | Gộp |
| 7.2 | Nút "Thêm thói quen" trên điện thoại: nút tròn nổi ở góc dưới phải, hay nút thường ở cuối danh sách? | Nút nổi |
| 7.3 | Có thêm nút "Chuyển app" trên thanh trên cùng để đi giữa ba app không? | Có |
| 7.4 | Thanh công cụ TakeNote trên iPad: nằm trên cùng (hiện tại) hay thanh nổi có thể kéo đi? | Đã trả lời: B |
| 7.5 | Nút nào bạn thấy thừa, hoặc còn thiếu nút nào bạn cần? | Chủ dự án tự trả lời |

## 8. Câu trả lời của chủ dự án

| # | Trả lời | Ngày |
|---|---|---|
| 7.1 | C: giữ đủ 6 mục trên thanh điều hướng Language (Học · Lộ trình · Chủ đề · Luyện tập · Thẻ từ · Hồ sơ). Yêu cầu kèm theo: trên điện thoại 320–375px, 6 nhãn phải đọc được không cắt chữ (nhãn ngắn, chữ 10–11px, vùng chạm mỗi mục vẫn ≥ 44px chiều cao) | 2026-11-20 |
| 7.2 | Nút tròn "+" ở góc trên bên phải phần đầu trang Hôm nay và Thói quen (theo ảnh tham khảo chủ dự án gửi: nút tròn nền đen, biểu tượng + trắng, cạnh nút chuông), không dùng nút nổi ở góc dưới | 2026-11-20 |
| 7.3 | Có. Bộ chuyển app gồm 3 nút liền nhau ở góc trên cùng bên phải, thứ tự cố định: Olaa Language → Olaa Note (TakeNote) → Olaa Habits. App đang mở hiện dạng viên thuốc (biểu tượng + tên app); 2 app còn lại là nút tròn chỉ có biểu tượng. Chuyển app có hiệu ứng chuyển cảnh | 2026-11-20 |

### Bộ chuyển app (từ câu 7.3)

| | Mô tả |
|---|---|
| Vị trí | Góc trên cùng bên phải, ở mọi màn hình chính của cả 3 app (không hiện trong phiên toàn màn hình như đang làm bài, đang vẽ) |
| Thứ tự | Language · Note · Habits, giống nhau ở cả 3 app |
| App đang mở | Viên thuốc: biểu tượng + tên ("Language", "Note", "Habits"), nền Vàng Olaa, chữ đen (cả 3 app cùng màu; phân biệt app bằng biểu tượng và tên) |
| App khác | Nút tròn ≥ 44px, chỉ có biểu tượng đen, nền Vàng kem `#FFEDA8`; tên app đọc cho trình đọc màn hình ("Mở Olaa Habits") |
| Khi bấm app khác | 1) Viên thuốc hiện tại thu lại thành tròn, nút vừa bấm giãn ra thành viên thuốc (khoảng 300ms). 2) Nội dung trang mờ dần và trượt nhẹ. 3) Chuyển sang app kia; app kia mở với nội dung hiện dần lên. Tắt hiệu ứng khi thiết bị bật "giảm chuyển động" |
| Đăng nhập | Giữ Olaa ID khi chuyển; nếu chưa đăng nhập ở app kia thì app kia hỏi đăng nhập |
| Lưu ý kỹ thuật | Ba app đang ở ba địa chỉ web khác nhau, nên hiệu ứng gồm hai nửa: nửa "rời đi" trong app cũ và nửa "đến" trong app mới. Muốn liền mạch hoàn toàn và giữ đăng nhập chắc chắn, ba app nên ở chung một địa chỉ (ví dụ olaa.web.app/language, /note, /habits) — cần ADR riêng |
| 7.3b | C: bỏ nút chuông. Dòng trên cùng bên phải chỉ có bộ chuyển app và nút "+" (ở màn hình có thêm mới). Thứ tự từ trái sang: nút "+", rồi bộ chuyển app. Ước lượng ở màn 320px: viên thuốc ~110px + 2 nút tròn 88px + nút "+" 44px + khoảng cách ~24px ≈ 266px, vừa trong 288px (đã trừ lề 16px mỗi bên); kiểm tra lại khi làm | 2026-11-20 |
| 7.4 | B: thanh công cụ TakeNote là viên thuốc đen nổi (giống thanh điều hướng của ảnh mẫu), kéo được đến cạnh trên, dưới, trái hoặc phải. Yêu cầu kèm theo: tự bám vào cạnh gần nhất khi thả; nhớ vị trí cho từng thiết bị; khi đặt ở cạnh trái/phải thì xếp dọc; có tay nắm để kéo, không kéo khi đang vẽ; không che phần trang đang viết (trang tự chừa lề phía có thanh); vẫn dùng được bằng bàn phím | 2026-11-20 |

## 9. Bộ biểu tượng Olaa (2026-11-21)

Chủ dự án gửi bộ 20 biểu tượng chức năng và biểu tượng app; thay cho Phosphor (PRD UI/UX, câu 5b, 5c). File ở `packages/design-system/`.

### 9.1 Gắn biểu tượng vào nút (đề xuất, chủ dự án sửa nếu cần)

| Biểu tượng | Dùng ở |
|---|---|
| `language` | Bộ chuyển app: Olaa Language · Lựa chọn ngôn ngữ giao diện và ngôn ngữ học |
| `note` | Bộ chuyển app: Olaa Note · Thanh điều hướng TakeNote: Thư viện |
| `habits` | Bộ chuyển app: Olaa Habits · Thanh điều hướng Habits: Hôm nay |
| `lessons` | Thanh điều hướng Language: Học · Giới thiệu bài |
| `progress` | Thanh điều hướng Language: Lộ trình · Thẻ tóm tắt tiến độ |
| `collections` | Thanh điều hướng Language: Chủ đề · Habits: Thói quen · TakeNote: Danh sách trang |
| `goals` | Thanh điều hướng Language: Luyện tập · Mục tiêu ngày |
| `vocabulary` | Thanh điều hướng Language: Thẻ từ |
| `profile` | Thanh điều hướng: Hồ sơ (Language), Tôi (Habits) · Khối tài khoản Olaa ID |
| `calendar` | Thanh điều hướng Habits: Lịch |
| `listening` | Nút Nghe, Nghe chậm · Không nghe được lúc này |
| `speaking` | Tôi đã nói to câu này |
| `achievement` | Màn xong bài, kết quả kiểm tra cấp độ, chuỗi ngày |
| `edit` | Sửa thói quen · Đổi tên sổ, đổi tên thẻ |
| `bookmark` | Yêu thích sổ tay |
| `delete` | Mọi nút Nguy hiểm: xoá sổ, xoá trang, xoá mục, thùng rác, xoá toàn bộ dữ liệu |
| `search` | Ô tìm kiếm TakeNote |
| `settings` | Cài đặt (TakeNote, và mục cài đặt trong Hồ sơ / Tôi) |
| `more` | Tuỳ chọn (⋯) của mỗi thói quen, mỗi sổ tay |
| `notifications` | Chưa dùng: nút chuông đã bỏ (câu 7.3b). Giữ trong bộ để dùng khi có nhắc nhở |

### 9.2 Biểu tượng nút cần mà bộ 20 chưa có

| Nhóm | Biểu tượng thiếu | Nút dùng |
|---|---|---|
| Cơ bản | Thêm (+) · Đóng (×) · Quay lại (←) · Trước / Sau (‹ ›) | Thêm thói quen, đóng bài học, quay lại, đổi tháng, đổi trang |
| Đúng / sai | Dấu ✓ · Dấu ✗ | Kết quả bài làm (bắt buộc, vì màu đúng/sai cùng tông tím) |
| Habits | Đóng băng (bông tuyết) · Tạm dừng · Tiếp tục | Thẻ đóng băng, tạm dừng thói quen |
| TakeNote | Bút · Dạ quang · Tẩy · Chữ · Chọn · Hoàn tác · Làm lại · Chèn ảnh · Đính kèm · PDF · Thu phóng · Lưu trữ · định dạng chữ (đậm, nghiêng, danh sách…) | Thanh công cụ nổi, thư viện |
| Chung | Sáng / Tối (mặt trời, mặt trăng) · Tải xuống · Đăng xuất | Cài đặt |

| # | Câu hỏi | Gợi ý |
|---|---|---|
| 9.a | Các biểu tượng ở mục 9.2: bạn gửi thêm, hay để tôi vẽ theo cùng phong cách (nét đặc, góc bo tròn)? | Tôi vẽ nhóm Cơ bản, Đúng/sai, Chung; bạn gửi nhóm TakeNote |
