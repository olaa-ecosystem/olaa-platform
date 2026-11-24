# 03 — OLAA TAKENOTE

Ứng dụng ghi chú ưu tiên iPad, hỗ trợ ghi tay bằng Apple Pencil, văn bản, tài liệu và tổ chức tri thức.

> Mã nguồn của nhánh này nằm ở repository `olaa-takenote`. Thư mục này chỉ giữ đặc tả, liên kết và trạng thái; không chứa mã nguồn.

## 1. Mục tiêu
Ứng dụng ghi chú ưu tiên iPad, hỗ trợ ghi tay bằng Apple Pencil, văn bản, tài liệu và tổ chức tri thức.

## 2. Phạm vi
Notes, pages, blocks, ink metadata and note versions.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 03.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 03.01 | [notebook-management](modules/03.01-notebook-management.md) | Notebooks, folders, collections, notebook metadata và lifecycle. | NOT STARTED |
| 03.02 | [note-management](modules/03.02-note-management.md) | Create/edit/duplicate/archive notes, note metadata, templates và note lifecycle. | NOT STARTED |
| 03.03 | [rich-text-editor](modules/03.03-rich-text-editor.md) | Text blocks, formatting, lists, tables, links, embeds và editor commands. | NOT STARTED |
| 03.04 | [digital-canvas](modules/03.04-digital-canvas.md) | Infinite/fixed canvas, pages, layers, shapes, selection, zoom, pan và object transforms. | NOT STARTED |
| 03.05 | [apple-pencil](modules/03.05-apple-pencil.md) | Ink strokes, pressure, tilt, palm rejection, eraser, PencilKit/native input integration và latency. | NOT STARTED |
| 03.06 | [inking-tools](modules/03.06-inking-tools.md) | Pen, pencil, highlighter, color palette, stroke width, lasso, ruler và tool presets. | NOT STARTED |
| 03.07 | [page-management](modules/03.07-page-management.md) | Page sizes, page templates, reorder, duplicate, thumbnails và page navigation. | NOT STARTED |
| 03.08 | [document-annotation](modules/03.08-document-annotation.md) | PDF import, PDF rendering, markup, highlights, signatures và export. | NOT STARTED |
| 03.09 | [attachments](modules/03.09-attachments.md) | Images, audio, files, scans, embedded media và attachment metadata. | NOT STARTED |
| 03.10 | [organization](modules/03.10-organization.md) | Tags, backlinks, internal links, favorites, pinning và cross-note references. | NOT STARTED |
| 03.11 | [search](modules/03.11-search.md) | Title/body search, tags, OCR text, handwriting indexing và filters. | NOT STARTED |
| 03.12 | [history-recovery](modules/03.12-history-recovery.md) | Autosave, undo/redo, version history, recovery snapshots và conflict warnings. | NOT STARTED |
| 03.13 | [export-sharing](modules/03.13-export-sharing.md) | PDF/image export, share sheets, collaboration-ready sharing permissions và export presets. | NOT STARTED |
| 03.14 | [offline-sync](modules/03.14-offline-sync.md) | Offline-first editing, local cache, sync queue, conflict detection và retry. | NOT STARTED |
| 03.15 | [takenote-settings](modules/03.15-takenote-settings.md) | Canvas defaults, pen defaults, page defaults, backup, sync và accessibility. | NOT STARTED |

## 4. Folder structure
```text
03-olaa-takenote/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
repository `olaa-takenote`

Chưa có mã nguồn sản phẩm.

Bản mẫu giao diện iPad (không phải mã sản phẩm, không tính vào trạng thái module): [`prototypes/takenote-ipad-home/`](../../prototypes/takenote-ipad-home/README.md), kèm [đánh giá](../../prototypes/takenote-ipad-home/REVIEW.md). Bản mẫu này là đầu vào cho đặc tả 03.04, 03.05, 03.06 (ADR-0003, Proposed).

## 6. Dependencies
- [00 Olaa Platform](../00-olaa-platform/README.md) — interface: chưa định nghĩa
- [04 Shared Core](../04-shared-core/README.md) — interface: chưa định nghĩa
- [05 Backend Services](../05-backend-services/README.md) — interface: chưa định nghĩa
- [07 Database Architecture](../07-database-architecture/README.md) — interface: chưa định nghĩa
- [21 Search & Media Processing](../21-search-media-processing/README.md) — interface: chưa định nghĩa

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

Owner đề xuất: TakeNote domain.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
