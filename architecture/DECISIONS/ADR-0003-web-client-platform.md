# ADR-0003: Web responsive là nền tảng client của cả ba app

- **Trạng thái:** Accepted
- **Ngày:** 2026-11-19
- **Người quyết định:** chủ dự án
- **Nhánh ảnh hưởng:** 00, 01, 02, 03, 04, 09

## Bối cảnh

Bảng "Quyết định đang chặn" trong `IMPLEMENTATION_STATUS.md` để ngỏ hai mục: nền tảng client chính, và framework frontend cùng công cụ build. `olaa-language` đã có MVP web: React 18, Vite 5, TypeScript strict, pnpm (ADR-001 trong repository đó). `olaa-habits` và `olaa-takenote` mới có khung. Module 03.05 apple-pencil đang ghi "PencilKit/native", tức app iPad gốc. Dự án chỉ có một người làm.

## Quyết định

- Cả ba app (Language, Habits, TakeNote) là web responsive, chạy trên trình duyệt của điện thoại, iPad và máy tính.
- Frontend dùng chung một stack: React 18, Vite 5, TypeScript strict, pnpm, Vitest, ESLint, Prettier. Đây là stack Language đang dùng.
- Viết tay trong TakeNote dùng Pointer Events trên Safari: chỉ nhận nét khi `pointerType = "pen"`, đọc lực nhấn và độ nghiêng, dùng `getCoalescedEvents()` và vẽ bằng canvas. Không dùng PencilKit.
- Không làm app iOS/Android gốc và không làm PWA đầy đủ trong MVP. Habits có manifest PWA tối thiểu để nhận thông báo đẩy trên iOS.

## Lựa chọn đã cân nhắc

1. **App iPad gốc cho TakeNote (Swift + PencilKit).** Viết tay tốt nhất, nhưng một người phải duy trì thêm một codebase và một ngôn ngữ khác. Không chọn.
2. **Cross-platform (React Native hoặc Capacitor) kèm module viết tay gốc.** Phương án dung hòa nhưng phức tạp nhất khi build và phát hành. Không chọn.
3. **Web responsive cho cả ba app.** Một stack, dùng lại code và cách làm của Language. Chọn.

## Hệ quả

- Hai mục "Nền tảng client chính" và "Framework frontend" trong `IMPLEMENTATION_STATUS.md` được chốt. Phần backend được chốt ở ADR-0004.
- Rủi ro chính: viết tay trên Safari kém mượt hơn GoodNotes và Notability. TakeNote phải thử trên iPad thật ở đầu M2. Nếu không đạt NFR-03-001 thì viết ADR mới để xem lại quyết định này.
- Thông báo đẩy trên iOS/iPadOS chỉ chạy khi người dùng thêm web vào màn hình chính (iOS 16.4+).
- Mô tả module 03.05 apple-pencil đổi từ "PencilKit/native" sang Pointer Events trên web.
- Ba app chạy trên ba origin khác nhau, nên không chia sẻ được dữ liệu trong trình duyệt. Mọi trao đổi giữa các app đi qua backend (ADR-0004).
