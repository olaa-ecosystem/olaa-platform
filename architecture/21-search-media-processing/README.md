# 21 — SEARCH & MEDIA PROCESSING

Tìm kiếm toàn hệ sinh thái và xử lý tệp, hình ảnh, âm thanh, PDF, OCR và chữ viết tay.

## 1. Mục tiêu
Tìm kiếm toàn hệ sinh thái và xử lý tệp, hình ảnh, âm thanh, PDF, OCR và chữ viết tay.

## 2. Phạm vi
Indexing and media processing pipelines.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 21.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 21.01 | [search-architecture](modules/21.01-search-architecture.md) | Global search, domain search, indexing pipeline, ranking and permissions filtering. | NOT STARTED |
| 21.02 | [full-text-search](modules/21.02-full-text-search.md) | Indexing titles, descriptions and permitted text content. | NOT STARTED |
| 21.03 | [handwriting-recognition](modules/21.03-handwriting-recognition.md) | Handwriting recognition pipeline, language support, confidence and correction UX. | NOT STARTED |
| 21.04 | [ocr](modules/21.04-ocr.md) | OCR for images/PDF, text extraction, language detection and confidence handling. | NOT STARTED |
| 21.05 | [image-processing](modules/21.05-image-processing.md) | Validation, resizing, thumbnails, metadata stripping and format conversion. | NOT STARTED |
| 21.06 | [audio-processing](modules/21.06-audio-processing.md) | Audio validation, transcoding, waveform/metadata and speech-related processing. | NOT STARTED |
| 21.07 | [video-processing](modules/21.07-video-processing.md) | Video validation, transcoding, thumbnails and playback delivery if needed. | NOT STARTED |
| 21.08 | [pdf-processing](modules/21.08-pdf-processing.md) | PDF validation, rendering, page extraction, annotation layer and export. | NOT STARTED |
| 21.09 | [file-security](modules/21.09-file-security.md) | MIME validation, size limits, malware scanning and safe download policies. | NOT STARTED |
| 21.10 | [media-lifecycle](modules/21.10-media-lifecycle.md) | Upload states, processing jobs, storage lifecycle, retention and deletion. | NOT STARTED |

## 4. Folder structure
```text
21-search-media-processing/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `services/media/`; vị trí search service chưa chốt

Chưa có mã nguồn.

## 6. Dependencies
- [03 Olaa Takenote](../03-olaa-takenote/README.md) — interface: chưa định nghĩa
- [01 Olaa Language](../01-olaa-language/README.md) — interface: chưa định nghĩa
- [05 Backend Services](../05-backend-services/README.md) — interface: chưa định nghĩa
- [04 Shared Core](../04-shared-core/README.md) — interface: chưa định nghĩa
- [19 Privacy & Data Governance](../19-privacy-data-governance/README.md) — interface: chưa định nghĩa

Chi tiết: `architecture/DEPENDENCY_MAP.md`.

## 7. API contracts
Chưa có contract. Contract dùng chung sẽ nằm trong `olaa-platform/contracts/` (nhánh 20). Xem `api-contracts/README.md`.

## 8. Database ownership
Chưa có schema. Xem `database/README.md`.

## 9. Security requirements
Áp dụng baseline của nhánh 08 và quy tắc privacy của nhánh 19. Yêu cầu riêng của nhánh: Chưa xác định — điền khi nhánh được triển khai.

## 10. Testing strategy
Theo chiến lược của nhánh 10. Kế hoạch riêng: `tests/README.md`.

## 11. Implementation status
| Hạng mục | Trạng thái |
|---|---|
| Tài liệu kiến trúc | SCAFFOLDED |
| Mã nguồn | NOT STARTED |

Owner đề xuất: Search/media owner.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
