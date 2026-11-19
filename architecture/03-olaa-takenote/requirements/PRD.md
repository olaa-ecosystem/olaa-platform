# PRD — 03 OLAA TAKENOTE

| | |
|---|---|
| Trạng thái | DRAFT — chờ chủ dự án duyệt |
| Phiên bản | 0.1 |
| Ngày | 2026-11-19 |
| Người phụ trách | Chủ dự án (một người) |
| Repository mã nguồn | `olaa-takenote` |
| Nguồn | Phỏng vấn chủ dự án, 8 câu (2026-11-19) |

Các con số mục tiêu và các mục ghi "đề xuất" là đề xuất của người soạn, chưa được chủ dự án chốt.

---

## 1. Bối cảnh và vấn đề

Học sinh, sinh viên học trên iPad gặp hai vấn đề:

1. **Phải dùng hai app.** Một app để viết tay, một app khác để gõ, nên ghi chú của một buổi học bị chia ra hai nơi.
2. **Ghi chú không nối với việc học.** Từ vựng hay ngữ pháp ghi lại không quay về được bài học, và cũng không biến thành bài ôn.

OLAA Takenote giải quyết hai vấn đề này bằng hai cách: cho gõ và viết tay trên cùng một trang, và nối hai chiều với OLAA Language.

## 2. Người dùng mục tiêu

- **Ai:** học sinh, sinh viên 15–25 tuổi.
- **Thiết bị chính:** iPad có Apple Pencil, dùng qua Safari. Máy tính và điện thoại dùng được nhưng không phải trọng tâm.
- **Ngôn ngữ giao diện:** tiếng Việt.

## 3. Mục tiêu và chỉ số thành công

| Chỉ số | Định nghĩa | Mục tiêu (đề xuất) |
|---|---|---|
| Trang kết hợp | % trang được sửa trong tuần có cả chữ gõ và nét viết tay | ≥ 30% |
| Kết nối với Language | Số ghi chú hoặc flashcard nối giữa Takenote và Language, tính trên mỗi người dùng hoạt động mỗi tuần | ≥ 3 |
| Dùng chéo | % người dùng Language có dùng Takenote, và ngược lại | Chốt sau 4 tuần có dữ liệu nền |

## 4. Phạm vi

### Trong phạm vi MVP

- Sổ tay và trang.
- Gõ và viết tay trên cùng một trang. Gõ ở mức cơ bản; bộ công cụ viết tay tối thiểu.
- Nhập PDF hoặc slide, viết và đánh dấu lên trên.
- Gắn ảnh và file.
- Xuất PDF và chia sẻ.
- Tự lưu, hoàn tác và làm lại.
- Đăng nhập OLAA ID, đồng bộ lên cloud.
- Nối hai chiều với OLAA Language.
- Nằm trong gói thuê bao Olaa chung.

### Để sau MVP

- Thẻ (tag), liên kết giữa ghi chú, backlink (module 03.10).
- Tìm kiếm, nhận dạng chữ viết tay và OCR (module 03.11).
- Lịch sử phiên bản (module 03.12). MVP chỉ có tự lưu và undo/redo.
- Bảng và định dạng văn bản nâng cao.
- Thước, lasso, chữ ký trên PDF.
- Cộng tác nhiều người trên cùng một ghi chú.

### Ngoài phạm vi

- App iPad gốc (Swift + PencilKit).
- Curriculum, chấm bài ngôn ngữ, theo dõi thói quen. Các phần này thuộc Language và Habits.

### Thay đổi so với tài liệu hiện có

| Tài liệu | Hiện tại | Theo PRD |
|---|---|---|
| `architecture/03-olaa-takenote/modules/03.05-apple-pencil.md` | "PencilKit/native input integration" | Viết tay trên web bằng Pointer Events; cần ADR nền tảng |
| `olaa-takenote/docs/product/UX_PRINCIPLES.md` | Máy tính và iPad trước | iPad là thiết bị chính, có Apple Pencil |

## 5. Yêu cầu chức năng

Ưu tiên: P0 bắt buộc cho lần ra mắt đầu, P1 cần cho MVP đầy đủ, P2 làm sau.

### 5.1 Sổ tay và trang

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-03-001 | 03.01 notebook-management | Tạo, đổi tên, xóa sổ tay; có bìa và màu | P0 | Xóa sổ tay phải xác nhận; sổ đã xóa khôi phục được trong 30 ngày (đề xuất) |
| REQ-03-002 | 03.07 page-management | Thêm, xóa, sắp xếp, nhân bản trang; có ảnh thu nhỏ của trang | P0 | Kéo thả để đổi thứ tự trên iPad |
| REQ-03-003 | 03.07 page-management | Mẫu trang: trắng, kẻ dòng, ô vuông, chấm | P0 | Chọn được khi tạo trang |

### 5.2 Gõ và viết tay trên một trang

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-03-010 | 03.04 digital-canvas | Một trang chứa cả khối chữ gõ và nét viết tay, đặt tự do | P0 | Thêm khối chữ ở bất kỳ vị trí nào; viết tay đè lên hoặc cạnh khối chữ; xuất PDF giữ đúng vị trí |
| REQ-03-011 | 03.03 rich-text-editor | Gõ cơ bản: đậm, nghiêng, tiêu đề, danh sách | P0 | Dùng được với bàn phím rời của iPad và bàn phím ảo |
| REQ-03-012 | 03.06 inking-tools | Bút, bút dạ quang, tẩy; chọn màu và độ dày nét | P0 | Có tối thiểu 3 độ dày và 8 màu cho mỗi bút |
| REQ-03-013 | 03.05 apple-pencil | Nhận lực nhấn; chống chạm lòng bàn tay | P0 | Chỉ vẽ khi `pointerType = "pen"`; ngón tay dùng để cuộn và thu phóng |
| REQ-03-014 | 03.04 digital-canvas | Thu phóng và cuộn trang | P0 | Chụm hai ngón để thu phóng, nét vẽ vẫn sắc |
| REQ-03-015 | 03.12 history-recovery | Tự lưu, hoàn tác và làm lại | P0 | Không mất nét nào khi đóng tab; có undo/redo cho cả chữ và nét |

### 5.3 PDF và tệp đính kèm

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-03-020 | 03.08 document-annotation | Nhập PDF; mỗi trang PDF thành một trang ghi chú để viết lên | P0 | Mở được PDF 100 trang trên iPad mà không treo (đề xuất) |
| REQ-03-021 | 03.08 document-annotation | Đánh dấu và viết tay lên PDF | P0 | Nét viết nằm trên lớp riêng, không sửa file PDF gốc |
| REQ-03-022 | 03.09 attachments | Gắn ảnh (từ thư viện ảnh hoặc chụp) và file khác vào trang | P0 | Ảnh thay đổi được kích thước và vị trí; file khác hiện dạng thẻ có thể mở |
| REQ-03-023 | 03.13 export-sharing | Xuất sổ tay hoặc trang ra PDF | P0 | PDF xuất ra giữ đúng chữ, nét viết, ảnh và trang PDF gốc |
| REQ-03-024 | 03.13 export-sharing | Chia sẻ file PDF đã xuất | P0 | Dùng Web Share API trên iPad, có phương án tải file thay thế |

### 5.4 Nối với OLAA Language

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-03-030 | 03.02 note-management | Nhận ghi chú gửi từ Language (từ vựng, ngữ pháp, câu ví dụ) vào một sổ tay riêng | P1 | Ghi chú tạo từ Language có liên kết nguồn; cùng contract với REQ-01-042 |
| REQ-03-031 | 03.03 rich-text-editor | Tô chọn chữ đã gõ, tạo flashcard trong Language | P1 | Takenote gửi yêu cầu qua contract; Language tạo thẻ và quản lý lịch SRS. Chữ viết tay chưa hỗ trợ (cần OCR) |
| REQ-03-032 | 03.10 organization | Ghi chú gắn với bài hoặc unit Language; mở được bài từ ghi chú | P1 | Language truy vấn được danh sách ghi chú theo bài |

### 5.5 Tài khoản và thuê bao

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-03-040 | — (nhánh 00/05) | Đăng nhập OLAA ID | P1 | Dùng chung tài khoản với Language |
| REQ-03-041 | 03.12 history-recovery | Đồng bộ ghi chú và file lên cloud | P1 | Mở trên thiết bị khác thấy đúng nội dung. Khi sửa xung đột trên hai thiết bị: giữ cả hai bản và báo cho người dùng |
| REQ-03-042 | — (nhánh 14) | Nằm trong gói thuê bao Olaa chung | P1 | Đọc quyền truy cập qua `billing.entitlement.get` |

## 6. Yêu cầu phi chức năng

| Mã | Yêu cầu |
|---|---|
| NFR-03-001 | Độ trễ nét bút: nét hiện ra theo kịp đầu bút ở mức người dùng không thấy giật, đo trên iPad đời 2020 trở lên. Đề xuất mục tiêu ≤ 1 khung hình phía app (khoảng 16 ms), dùng `getCoalescedEvents()` và vẽ bằng canvas |
| NFR-03-002 | Không mất dữ liệu: mỗi thay đổi lưu xuống IndexedDB trong ≤ 1 giây; xin quyền lưu trữ bền vững (`navigator.storage.persist()`) |
| NFR-03-003 | Vẫn mở và sửa được khi mất mạng ngắn; tự đồng bộ khi có mạng lại |
| NFR-03-004 | Giao diện tối ưu cho iPad ngang và dọc; vùng chạm ≥ 44 px |
| NFR-03-005 | Nội dung ghi chú là dữ liệu riêng tư: mã hóa khi truyền và khi lưu trên cloud; không dùng cho analytics, chỉ đếm sự kiện ẩn danh |
| NFR-03-006 | Thư viện mã nguồn mở phải có giấy phép cho phép dùng thương mại (ứng viên: pdf.js Apache 2.0 để hiển thị PDF, pdf-lib MIT để xuất PDF) |

## 7. Tích hợp với hệ sinh thái Olaa

| Phụ thuộc | Nhánh | Dùng cho | Trạng thái nhánh (2026-11-18) |
|---|---|---|---|
| OLAA ID / Auth | 00, 05, 08 | REQ-03-040 | NOT STARTED; auth provider chưa chốt |
| Backend đồng bộ | 05, 07 | REQ-03-041 | NOT STARTED |
| Kho lưu file PDF và ảnh | 21 | REQ-03-020, 022, 041 | NOT STARTED |
| Thuê bao | 14 | REQ-03-042 | NOT STARTED |
| Analytics | 17 | Mục 3 | NOT STARTED |
| OLAA Language | 01 | REQ-03-030, 031, 032 | Contract `PENDING` |
| Contract và event | 20 | REQ-03-030, 031, 032 | NOT STARTED |

Contract tối thiểu đề xuất (chờ nhánh 20):

- `takenote.note.create_from_source` (command, Language → Takenote): `user_id`, `source_app`, `source_ref`, `title`, `body`, `tags`. Dùng chung với PRD Language.
- `language.flashcard.create_from_source` (command, Takenote → Language): `user_id`, `course_id`, `front`, `back`, `source_app = "takenote"`, `source_ref`.
- `takenote.notes.list_by_source` (query, Language → Takenote): `user_id`, `source_app`, `source_ref` → danh sách `note_id`, `title`, `updated_at`.
- `billing.entitlement.get` (query): dùng chung với Language.

Quyết định cần ADR: nền tảng client của Takenote là web (đang nằm trong "Quyết định đang chặn" của `IMPLEMENTATION_STATUS.md`).

## 8. Lộ trình phát hành

Ràng buộc thực tế: còn khoảng 6 tuần đến 12/2026; một người làm cùng lúc cả Language và Takenote; Takenote chưa có mã tính năng nào; mọi nhánh nền tảng đều NOT STARTED. **Đề xuất (chờ duyệt):**

| Đợt | Thời điểm | Nội dung |
|---|---|---|
| R1 — Beta công khai | 12/2026 | Toàn bộ P0: sổ tay và trang, gõ và viết tay trên một trang, nhập PDF, ảnh và file, xuất PDF, tự lưu, undo/redo. Lưu trên thiết bị, kèm nút sao lưu và khôi phục bằng file để giảm rủi ro mất dữ liệu. Miễn phí |
| R2 | Q1/2027 | OLAA ID, đồng bộ cloud, kho lưu file, gói thuê bao chung |
| R3 | Q2/2027 | Nối hai chiều với Language (REQ-03-030 đến 032) |
| R4 trở đi | Từ Q3/2027 | Tìm kiếm, nhận dạng chữ viết tay, thẻ và liên kết, lịch sử phiên bản |

Lý do: R1 kiểm chứng vấn đề 1 ("phải dùng hai app") mà không cần backend. Vấn đề 2 ("nối với việc học") cần tài khoản chung giữa hai app. Hai app chạy trên hai tên miền khác nhau, nên khi chưa có backend thì không thể chia sẻ dữ liệu cục bộ.

## 9. Rủi ro và câu hỏi còn mở

### Rủi ro

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Viết tay trên Safari kém mượt hơn GoodNotes và Notability | Cao | Thử nghiệm sớm trên iPad thật trong tuần đầu; nếu không đạt NFR-03-001 thì xem lại quyết định nền tảng |
| Safari có thể xóa dữ liệu của trang web không được dùng một thời gian, nên R1 lưu cục bộ có thể mất ghi chú | Cao | Xin lưu trữ bền vững; hướng dẫn "Thêm vào màn hình chính"; có nút sao lưu ra file; đưa đồng bộ cloud vào R2 |
| Một người làm hai app trong 6 tuần | Cao | Chia đợt như mục 8; dùng thư viện có sẵn cho PDF |
| PDF lớn làm iPad hết bộ nhớ | Trung bình | Chỉ hiển thị các trang đang nhìn thấy; giới hạn kích thước file nhập (đề xuất 100 MB) |
| Chi phí lưu trữ cloud tăng theo dung lượng PDF và ảnh | Trung bình | Đặt giới hạn dung lượng cho mỗi gói |

### Câu hỏi còn mở

1. Duyệt lộ trình phát hành ở mục 8, hay giữ toàn bộ MVP vào 12/2026?
2. Người chưa trả phí được dùng Takenote đến đâu? Giới hạn dung lượng cho người có gói là bao nhiêu?
3. Có cần nhận dạng chữ viết tay để tạo flashcard từ chữ viết tay không, và vào đợt nào?
4. Sổ tay đã xóa giữ trong 30 ngày, có đồng ý không?
5. Ghi ADR chốt "web" cho nền tảng client của Takenote, có đồng ý không?
