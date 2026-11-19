# PRD — 01 OLAA LANGUAGE

| | |
|---|---|
| Trạng thái | DRAFT — chờ chủ dự án duyệt |
| Phiên bản | 0.1 |
| Ngày | 2026-11-19 |
| Người phụ trách | Chủ dự án (một người) |
| Repository mã nguồn | `olaa-language` |
| Nguồn | Phỏng vấn chủ dự án, 14 câu (2026-11-19) |

Các con số mục tiêu và các mục ghi "đề xuất" là đề xuất của người soạn, chưa được chủ dự án chốt.

---

## 1. Bối cảnh và vấn đề

Người học ngoại ngữ nghiêm túc bỏ cuộc vì hai lý do:

1. **Bài học không liền mạch.** Các bài rời rạc. Kiến thức cũ không được dùng lại, nên người học quên và không thấy mình đang tiến lên.
2. **Độ khó tăng quá nhanh.** Người học bị kẹt ở một mức và không lên được trình độ cao hơn.

OLAA Language giải quyết hai vấn đề này bằng một lộ trình có ôn tập lồng ghép, độ khó tự điều chỉnh và bài kiểm tra cuối mỗi cấp độ.

## 2. Người dùng mục tiêu

- **Ai:** người Việt học ngoại ngữ nghiêm túc, muốn đi từ con số 0 đến trình độ vững.
- **Ngôn ngữ nguồn:** chỉ tiếng Việt. Giao diện, giải thích và bản dịch đều bằng tiếng Việt.
- **Ngôn ngữ đích:** tiếng Anh, tiếng Tây Ban Nha, tiếng Trung.
- **Thiết bị:** máy tính, iPad, điện thoại, qua trình duyệt web.

## 3. Mục tiêu và chỉ số thành công

### Mục tiêu sản phẩm (dài hạn)

| Khóa | Trình độ đích | Khung |
|---|---|---|
| Việt → Anh | A0 → C1 | CEFR |
| Việt → Tây Ban Nha | A0 → C1 | CEFR |
| Việt → Trung | Tương đương C1 | HSK 3.0, hiển thị kèm CEFR tương đương |

### Phạm vi nội dung chủ dự án chọn cho MVP

| Khóa | Phạm vi |
|---|---|
| Việt → Anh | A0 → C1 |
| Việt → Trung | HSK 1 → HSK 3 (HSK 3.0) |
| Việt → Tây Ban Nha | A0 → B1 |

Toàn bộ phạm vi này phải xong trước khi ra mắt (xem mục 8).

### Chỉ số thành công

| Chỉ số | Định nghĩa | Mục tiêu (đề xuất) |
|---|---|---|
| Tỷ lệ qua kiểm tra cấp độ | % người làm bài kiểm tra cấp độ và đạt trong tối đa 2 lần | ≥ 70% |
| Giữ chân D7 / D30 | % người dùng mới quay lại học vào ngày 7 / ngày 30 | Chốt sau 4 tuần có dữ liệu nền |
| Tỷ lệ nhớ khi ôn | % câu ôn tập lồng ghép được trả lời đúng ngay lần đầu | ≥ 80% |

## 4. Phạm vi

### Trong phạm vi

- Ba khóa học: Việt→Anh, Việt→Tây Ban Nha, Việt→Trung.
- Lộ trình theo cấp độ, có ôn tập lồng ghép và bài kiểm tra lên cấp.
- Độ khó tự điều chỉnh, bước học nhỏ, giải thích ngữ pháp bằng tiếng Việt, gợi ý khi làm bài.
- Chấm phát âm chi tiết, bao gồm thanh điệu tiếng Trung.
- Tiếng Trung: giản thể và phồn thể, pinyin, bài tập viết theo thứ tự nét.
- Đăng nhập OLAA ID, đồng bộ tiến độ giữa các thiết bị.
- Tích hợp OLAA Takenote và OLAA Habits.
- Thuê bao trả phí.

### Ngoài phạm vi MVP

- App iOS/Android gốc.
- PWA và học offline.
- Hội thoại tự do với AI.
- Ngôn ngữ nguồn khác tiếng Việt. Khóa "tiếng Việt cho người nói tiếng Anh" hiện có trong `olaa-language` sẽ bị gỡ, nhưng chỉ sau khi chủ dự án xác nhận.
- Khung vẽ viết tay tự do. Bài tập viết theo thứ tự nét có hướng dẫn và chấm từng nét, nên không thuộc mục này.

### Thay đổi so với tài liệu hiện có của `olaa-language`

| Tài liệu | Hiện tại | Theo PRD |
|---|---|---|
| `docs/product/UX_PRINCIPLES.md` | Máy tính và iPad trước, điện thoại sau | Responsive cho cả ba loại thiết bị ngay từ MVP |
| `docs/product/SCOPE.md` | Không nói về viết chữ Hán | Bổ sung bài tập viết theo thứ tự nét (mở rộng phạm vi, cần duyệt theo mục Change control) |
| README, mục Status | Có cơ chế tim (hearts) | Bỏ cơ chế tim |
| README, mục Status | Lưu tiến độ cục bộ, chưa đăng nhập | Đăng nhập OLAA ID và đồng bộ |

## 5. Yêu cầu chức năng

Mã yêu cầu theo dạng `REQ-01-NNN`, gắn với module con của nhánh 01. Ưu tiên: P0 là lõi, làm trước (M2); P1 cũng bắt buộc trước khi ra mắt (M3); P2 làm sau ra mắt.

### 5.1 Lộ trình liền mạch

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-01-001 | 01.02 curriculum | Mỗi khóa có lộ trình gồm cấp độ → unit → bài, mở khóa theo thứ tự | P0 | Bài N+1 bị khóa đến khi bài N hoàn thành; cấp độ sau bị khóa đến khi qua bài kiểm tra cấp độ trước |
| REQ-01-002 | 01.13 learning-intelligence | Ôn tập lồng ghép: mỗi bài mới trộn câu ôn từ và ngữ pháp đã học, ưu tiên mục người học hay sai và mục đến hạn SRS | P0 | Mỗi bài có từ 20% đến 40% câu ôn (tỷ lệ đề xuất); mục sai trong 7 ngày gần nhất được ưu tiên trước |
| REQ-01-003 | 01.11 flashcards | Lịch ôn SRS dùng chung cho ôn lồng ghép và trang ôn riêng | P0 | Một mục từ vựng chỉ có một lịch ôn, dù được ôn ở đâu |
| REQ-01-004 | 01.10 assessment | Bài kiểm tra cuối mỗi cấp độ; phải đạt mới lên cấp | P0 | Ngưỡng đạt đề xuất là 70%. Trượt thì app chỉ ra kỹ năng yếu và tạo bài luyện cho phần đó. Làm lại không giới hạn số lần |
| REQ-01-005 | 01.10 assessment | Bài kiểm tra xếp lớp cho người đã có nền tảng | P1 | Người học có thể bỏ qua các cấp đã vững nếu đạt bài xếp lớp |

### 5.2 Độ khó vừa sức

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-01-010 | 01.13 learning-intelligence | Độ khó tự điều chỉnh theo kết quả | P0 | Sai ≥ 3 câu cùng một điểm kiến thức trong một bài thì chèn thêm bài luyện ở mức đó; đúng ≥ 90% trong 3 bài liên tiếp thì giảm số câu luyện |
| REQ-01-011 | 01.02 curriculum | Bước học nhỏ | P0 | Mỗi bài có tối đa 7 từ mới và 1 điểm ngữ pháp mới (con số đề xuất) |
| REQ-01-012 | 01.04 grammar | Giải thích ngữ pháp bằng tiếng Việt, có so sánh với tiếng Việt | P0 | Mỗi điểm ngữ pháp có phần giải thích bằng tiếng Việt, xem được trước và trong bài |
| REQ-01-013 | 01.09 exercises | Gợi ý khi làm bài: xem nghĩa từ, nghe chậm, giải thích đáp án sai | P0 | Mỗi câu sai hiển thị đáp án đúng kèm lý do |
| REQ-01-014 | 01.12 learning-progress | Bỏ cơ chế tim | P0 | Không còn cơ chế nào chặn người học vì trả lời sai |

### 5.3 Kỹ năng

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-01-020 | 01.06 speaking | Chấm phát âm chi tiết cho cả 3 ngôn ngữ | P1 | Chấm theo từng âm hoặc từ và chỉ ra chỗ sai; tiếng Trung chấm cả thanh điệu |
| REQ-01-021 | 01.05 listening | Nghe với tốc độ thường và chậm | P0 | Mọi câu có audio đều phát được ở hai tốc độ |
| REQ-01-022 | 01.07 reading / 01.08 writing | Đọc hiểu và viết theo cấp độ | P1 | Từ cấp B1 trở lên có bài đọc dài và bài viết có rubric chấm |

### 5.4 Tiếng Trung

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-01-030 | 01.02 curriculum | Theo HSK 3.0, hiển thị kèm mức CEFR tương đương | P0 | Mỗi cấp độ ghi rõ bậc HSK 3.0 |
| REQ-01-031 | 01.14 language-settings | Người học chọn giản thể hoặc phồn thể, đổi được bất cứ lúc nào | P0 | Mọi nội dung tiếng Trung hiển thị đúng loại chữ đã chọn; tiến độ không mất khi đổi |
| REQ-01-032 | 01.03 vocabulary | Pinyin luôn hiển thị, có dấu thanh | P0 | Mọi chữ Hán trong bài có pinyin đi kèm |
| REQ-01-033 | 01.08 writing | Bài tập viết theo thứ tự nét | P0 | Người học viết từng nét. Sai thứ tự hoặc hướng nét thì app báo, và có chế độ xem mẫu |

### 5.5 Tài khoản, tích hợp, thuê bao

| Mã | Module | Yêu cầu | Ưu tiên | Acceptance criteria |
|---|---|---|---|---|
| REQ-01-040 | 01.01 learning-foundation | Đăng nhập OLAA ID | P1 | Học được trên thiết bị mới sau khi đăng nhập |
| REQ-01-041 | 01.12 learning-progress | Đồng bộ tiến độ giữa các thiết bị | P1 | Tiến độ trên thiết bị B khớp với thiết bị A sau khi đồng bộ; xử lý được xung đột khi học offline ngắn |
| REQ-01-042 | 01.03 vocabulary | Lưu từ, điểm ngữ pháp hoặc ghi chú sang OLAA Takenote | P1 | Chỉ gửi qua contract hoặc domain event; Language không ghi trực tiếp vào dữ liệu của Takenote |
| REQ-01-043 | 01.12 learning-progress | Báo hoàn thành mục tiêu ngày sang OLAA Habits | P1 | Phát domain event khi đạt mục tiêu ngày; Habits tự đánh dấu thói quen |
| REQ-01-044 | — (nhánh 14) | Thuê bao theo tháng hoặc năm, là một gói Olaa chung cho Language, Takenote và Habits | P1 | Gói, giá và dùng thử do nhánh 14 quản lý; Language chỉ đọc quyền truy cập qua contract |
| REQ-01-045 | 01.11 flashcards | Nhận yêu cầu tạo flashcard từ OLAA Takenote | P1 | Thẻ tạo từ Takenote vào chung lịch SRS và có liên kết quay về ghi chú nguồn |
| REQ-01-046 | 01.02 curriculum | Nút "Ghi chú của bài này" mở danh sách ghi chú Takenote gắn với bài | P1 | Lấy danh sách qua `takenote.notes.list_by_source` |

## 6. Yêu cầu phi chức năng

| Mã | Yêu cầu |
|---|---|
| NFR-01-001 | Responsive cho máy tính, iPad và điện thoại; không cuộn ngang ở chiều rộng 360 px |
| NFR-01-002 | Nội dung bài học tách khỏi mã nguồn, soạn và sửa được mà không phải deploy lại app |
| NFR-01-003 | Mọi nội dung lấy từ nguồn mở phải ghi rõ nguồn và giấy phép, và giấy phép phải cho phép dùng thương mại (xem mục 9) |
| NFR-01-004 | Đo được các chỉ số ở mục 3: ghi sự kiện bắt đầu bài, hoàn thành bài, kiểm tra cấp độ, kết quả câu ôn. Nhánh 17 phụ trách |
| NFR-01-005 | Chấm phát âm: xin quyền micro và giải thích rõ cho người học. Không lưu file ghi âm sau khi chấm, trừ khi người học đồng ý |
| NFR-01-006 | Khóa API của dịch vụ bên ngoài, như dịch vụ chấm phát âm, không được nằm trong mã phía client |
| NFR-01-007 | Giữ các chuẩn accessibility hiện có: phím tắt, nhãn, focus, giảm chuyển động, sáng/tối |

## 7. Tích hợp với hệ sinh thái Olaa

| Phụ thuộc | Nhánh | Dùng cho | Trạng thái nhánh (2026-11-18) | Ảnh hưởng |
|---|---|---|---|---|
| OLAA ID / Auth | 00, 05, 08 | REQ-01-040 | NOT STARTED; auth provider chưa chốt | Chặn đăng nhập |
| Backend đồng bộ | 05, 07 | REQ-01-041 | NOT STARTED | Chặn đồng bộ |
| Content Management | 06 | NFR-01-002 | NOT STARTED | Chặn việc soạn nội dung ngoài code |
| Thuê bao | 14 | REQ-01-044 | NOT STARTED | Chặn thu phí |
| Analytics | 17 | NFR-01-004 | NOT STARTED | Chặn đo chỉ số |
| OLAA Takenote | 03 | REQ-01-042 | NOT STARTED | Contract `PENDING` |
| OLAA Habits | 02 | REQ-01-043 | NOT STARTED | Contract `PENDING` |
| Contract và event | 20 | REQ-01-042, 043 | NOT STARTED | Contract `PENDING` |

Contract tối thiểu đề xuất (chờ nhánh 20):

- `language.daily_goal.completed` (event): `user_id`, `course_id`, `date`, `xp`, `minutes`.
- `takenote.note.create_from_source` (command): `user_id`, `source_app = "language"`, `source_ref`, `title`, `body`, `tags`.
- `billing.entitlement.get` (query): `user_id` → danh sách khóa học được truy cập, ngày hết hạn.
- `language.flashcard.create_from_source` (command, Takenote → Language): xem PRD nhánh 03.
- `language.lesson.completed`, `language.speaking.attempted`, `language.flashcard.created` (event, Language → Habits): xem PRD nhánh 02.
- `takenote.notes.list_by_source` (query, Language → Takenote): xem PRD nhánh 03.

## 8. Lộ trình phát hành

**Quyết định của chủ dự án (2026-11-19):** chỉ ra mắt khi các tính năng đã đầy đủ. Không có bản beta công khai thiếu tính năng. Mốc 12/2026 không còn áp dụng; ngày ra mắt chưa chốt.

Ba app ra mắt cùng lúc. Trước đó là các mốc xây dựng nội bộ, không công khai:

| Mốc | Nội dung | Điều kiện xong |
|---|---|---|
| M1 — Nền tảng chung | ADR nền tảng client và auth provider; OLAA ID, backend đồng bộ, event bus, kho lưu file, thuê bao, analytics ở `olaa-platform` | Một tài khoản đăng nhập được vào cả ba app; event đi được từ app này sang app khác |
| M2 — Lõi từng app | Toàn bộ yêu cầu P0 của ba app | Đạt acceptance criteria của mọi P0 |
| M3 — Tích hợp | Toàn bộ yêu cầu P1: Language ↔ Takenote, Language → Habits, chấm phát âm, nhắc nhở, thuê bao | Contract test giữa các app đạt |
| M4 — Nội dung và kiểm thử | Nội dung Language đủ phạm vi MVP; kiểm thử nội bộ trên iPad, điện thoại, máy tính | Đủ nội dung; không còn lỗi mất dữ liệu hoặc lỗi chặn |
| Ra mắt | Mở công khai cả ba app và gói thuê bao chung | M1–M4 xong |

P2 làm sau ra mắt.

Mốc dài nhất của Language là M4. Phạm vi nội dung MVP là Anh A0–C1, Tây Ban Nha A0–B1, Trung HSK 1–3, và mọi nội dung tiếng Trung có cả giản thể lẫn phồn thể. Với một người làm, phần nội dung sẽ quyết định ngày ra mắt nhiều hơn phần code. Đề xuất: đo tốc độ soạn nội dung thực tế sau 2 tuần đầu của M4, rồi ước tính ngày ra mắt.

## 9. Rủi ro và câu hỏi còn mở

### Rủi ro

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Khối lượng nội dung quá lớn cho một người: riêng A0–C1 tiếng Anh đã là cả một chương trình. Vì chỉ ra mắt khi đủ, ngày ra mắt có thể lùi xa | Cao | Đo tốc độ soạn thực tế ở đầu M4 để ước tính ngày ra mắt; ưu tiên tái sử dụng dữ liệu mở có cấu trúc |
| Giấy phép nguồn mở: nhiều nguồn là CC BY-NC (cấm dùng thương mại), không dùng được với gói thuê bao | Cao | Ghi nguồn và giấy phép cho từng mục nội dung; loại bỏ nguồn NC/ND |
| Hai dạng chữ Hán làm gấp đôi việc duyệt nội dung tiếng Trung | Trung bình | Soạn ở giản thể, chuyển tự động sang phồn thể (ví dụ dùng OpenCC), rồi duyệt lại các chỗ chuyển không chắc chắn |
| Chi phí chấm phát âm tính theo lượt, làm giảm biên lợi nhuận của gói thuê bao | Trung bình | Chọn nhà cung cấp qua ADR, có ước tính chi phí cho mỗi người dùng mỗi tháng |
| Toàn bộ nhánh nền tảng đều NOT STARTED | Cao | Làm M1 trước; chốt ADR nền tảng và auth provider ngay đầu M1 |
| Không có người duyệt chuyên môn cho từng ngôn ngữ | Trung bình | Đối chiếu với danh sách từ chuẩn (CEFR, HSK 3.0) và nguồn có kiểm duyệt |

### Nguồn mở ứng viên (cần xác minh giấy phép trước khi dùng)

| Nguồn | Dùng cho | Giấy phép (theo hiểu biết hiện tại, cần kiểm tra lại) |
|---|---|---|
| Tatoeba | Câu ví dụ và bản dịch | CC BY 2.0 FR; audio có giấy phép riêng cho từng file |
| CC-CEDICT | Từ điển Trung | CC BY-SA 4.0 (share-alike) |
| Wiktionary | Nghĩa, phát âm | CC BY-SA |
| Hanzi Writer + Make Me a Hanzi | Dữ liệu thứ tự nét | Thư viện MIT; dữ liệu nét có giấy phép riêng |
| OpenCC | Chuyển giản thể ↔ phồn thể | Apache 2.0 |

### Câu hỏi còn mở

1. Ở câu 7 chủ dự án chọn "tự biên soạn + mua bản quyền", nhưng ở câu 14 lại nói nội dung lấy từ nguồn mở. PRD này ghi nội dung dùng nguồn mở trước, mua bản quyền khi cần. Có đúng không?
2. Có dùng thử miễn phí không, và giá bao nhiêu? Đã chốt là gói Olaa chung cho cả hệ sinh thái (phỏng vấn Takenote, câu 6).
3. Có xác nhận gỡ khóa "tiếng Việt cho người nói tiếng Anh" hiện có không?
4. Có duyệt ngưỡng đạt kiểm tra cấp độ 70% và giới hạn 7 từ mới mỗi bài không?
5. Chọn nhà cung cấp chấm phát âm nào? Cần ADR.
