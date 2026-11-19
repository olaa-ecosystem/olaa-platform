# Changelog — 01 OLAA LANGUAGE

Định dạng: mỗi mục ghi ngày, loại thay đổi và ADR liên quan nếu có.

## Unreleased

### 2026-11-19
- Đồng bộ trạng thái với mã nguồn thực tế của repository `olaa-language` (commit `46e5f58`, MVP web React + Vite + TypeScript). Đã chạy `pnpm install --frozen-lockfile`, `pnpm test` (10 file, 69 test), `pnpm lint`, `pnpm typecheck`, `pnpm build`: tất cả đạt.
- Mã nguồn nhánh: NOT STARTED → IMPLEMENTED (MVP, một phần).
- Trạng thái module: 01.09, 01.11 → TESTED; 01.01, 01.02, 01.12, 01.13 → TESTED (một phần); 01.03, 01.05, 01.14 → IMPLEMENTED (một phần); 01.04, 01.06, 01.07, 01.08, 01.10 giữ NOT STARTED (đã rà soát, chưa có mã).
- Thêm mục "Hiện trạng triển khai" vào đặc tả 14 module; ghi đường dẫn mã thật vào Source code location và `MODULE_REGISTRY.md`.
- Không đổi kiến trúc, không cần ADR.

### 2026-11-18
- Tạo thư mục kiến trúc nhánh 01: README, đặc tả 14 module con ở mức khung (ADR-0001).
