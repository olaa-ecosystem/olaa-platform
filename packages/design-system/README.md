# design-system (module 04.01)

Tài sản thiết kế dùng chung cho Olaa Language, Olaa Habits và Olaa TakeNote. Hiện có bộ biểu tượng chức năng và biểu tượng app. Chưa có token màu, kiểu chữ hay component; các phần đó làm khi import giao diện mới.

## Biểu tượng chức năng — `icons/`

20 biểu tượng nét đặc, mỗi file một SVG vuông. Biểu tượng dùng `fill="currentColor"` nên lấy màu của chữ xung quanh: đặt `color` theo bảng màu (Violet Blue, Black, White…) thay vì sửa file.

| File | Chức năng |
|---|---|
| `lessons.svg` | Bài học, lộ trình |
| `vocabulary.svg` | Từ vựng, thẻ từ |
| `listening.svg` | Nghe |
| `speaking.svg` | Nói |
| `language.svg` | Ngôn ngữ (ngôn ngữ học, ngôn ngữ giao diện) |
| `calendar.svg` | Lịch |
| `progress.svg` | Tiến độ |
| `habits.svg` | Thói quen |
| `achievement.svg` | Thành tích |
| `goals.svg` | Mục tiêu |
| `note.svg` | Ghi chú, sổ tay |
| `edit.svg` | Sửa |
| `collections.svg` | Bộ sưu tập, danh sách trang |
| `bookmark.svg` | Đánh dấu, yêu thích |
| `delete.svg` | Xoá, thùng rác |
| `search.svg` | Tìm kiếm |
| `notifications.svg` | Thông báo |
| `settings.svg` | Cài đặt |
| `profile.svg` | Hồ sơ, tài khoản |
| `more.svg` | Thêm tuỳ chọn (⋯) |

Dùng trong React (Vite):

```tsx
import SearchIcon from '@olaa/design-system/icons/search.svg?raw';
<span className="icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: SearchIcon }} />
```

Nút chỉ có biểu tượng phải có `aria-label` (PRD nút, mục 1.3).

## Biểu tượng app — `app-icon/`

Tấm vé vàng trên nền bo góc, hai bản sáng và tối.

| File | Dùng cho |
|---|---|
| `olaa-app-icon-light.svg`, `olaa-app-icon-dark.svg` | Biểu tượng bo góc 104/448 (nền trắng / nền #151515) |
| `olaa-app-icon-*-square.svg` | Nền vuông tràn viền cho iOS và Android tự cắt góc; vé thu nhỏ 86% để nằm trong vùng an toàn |
| `png/favicon-16.png`, `png/favicon-32.png` | Favicon trình duyệt |
| `png/apple-touch-icon-180.png` | Màn hình chính iPhone, iPad |
| `png/icon-192.png`, `png/icon-512.png` | Web app manifest (`purpose: any`) |
| `png/icon-maskable-512.png` | Web app manifest (`purpose: maskable`) |
| `png/icon-dark-192.png`, `png/icon-dark-512.png` | Bản tối, khi cần |

Màu vàng của vé (#FFD84D → #F5B900) nằm ngoài bảng 7 màu. Chỉ dùng cho biểu tượng app, không dùng trong giao diện.

## Nguồn — `source/`

Hai file gốc chủ dự án gửi ngày 2026-11-21. Khi bảng biểu tượng gốc thay đổi, tạo lại `icons/` bằng:

```bash
python3 scripts/split_icon_sheet.py packages/design-system/source/olaa-icons-sheet.svg packages/design-system/icons
```

Biểu tượng app được dựng tay từ `source/olaa-app-icon-sheet.svg` (bỏ bóng đổ, tách bản sáng/tối). PNG được xuất từ SVG bằng Chromium.
