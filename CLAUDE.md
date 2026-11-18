# CLAUDE.md — olaa-platform

Hướng dẫn cho Claude Code khi làm việc trong repository này.

## Repository này là gì

Repository trung tâm của hệ sinh thái Olaa (4 repository, ADR-0001). Chứa kiến trúc 22 nhánh và, khi triển khai, phần dùng chung: contracts, shared packages, backend, database, hạ tầng. Ba app nằm ở repository riêng: `olaa-language` (01), `olaa-habits` (02), `olaa-takenote` (03).

## Đọc trước khi làm bất cứ việc gì

1. `architecture/OLAA_MASTER_ARCHITECTURE.md` — nguồn kiến trúc chuẩn.
2. `architecture/MODULE_REGISTRY.md` và `architecture/DEPENDENCY_MAP.md`.
3. `architecture/IMPLEMENTATION_STATUS.md` — trạng thái thật, không giả định việc cũ đã xong.
4. `architecture/<NN-nhánh>/README.md` của nhánh được giao.

## Quy tắc làm việc

- **Một nhánh một lần.** Chỉ làm nhánh được giao. Không xây nhánh khác. Nếu thiếu dependency: dùng contract có sẵn; nếu chưa có, đề xuất interface tối thiểu và ghi `PENDING` trong `DEPENDENCY_MAP.md`.
- **Không đổi 22 nhánh.** Không xóa, đổi tên, gộp nhánh hay đổi mã module đã cấp. Chức năng mới phải được xếp vào một nhánh.
- **Kiến trúc tách khỏi mã nguồn.** `architecture/` chỉ chứa tài liệu. Mã nguồn ở `apps/`, `packages/`, `services/`, `database/`, `contracts/`, `infrastructure/`, hoặc ở repository app. Không có hai bản mã giống nhau.
- **Không tạo đồ giả.** Không tạo service, database, thư mục hay file rỗng chỉ để đánh dấu tiến độ.
- **Ranh giới module.** Không truy cập database hay mã nội bộ của module khác. Giao tiếp qua contract, Shared Core package, hoặc domain event.
- **Trạng thái trung thực.** Không đánh dấu IMPLEMENTED hay TESTED khi chưa có mã chạy được và chưa thực sự chạy kiểm tra.
- **Thay đổi kiến trúc cần ADR** trong `architecture/DECISIONS/`.

## Quy trình mỗi task

1. Context review → 2. Branch audit → 3. Kế hoạch (phạm vi, file dự kiến, acceptance criteria; chờ duyệt nếu thay đổi lớn) → 4. Triển khai → 5. Chạy kiểm tra → 6. Integration check → 7. Cập nhật tài liệu (README nhánh, đặc tả module, Registry, Dependency Map, Status, Integration Changelog, ADR) → 8. Báo cáo.

## Git

- Kiểm tra `git status` và branch hiện tại trước khi sửa.
- Làm trên branch `<loại>/<slug>` theo `CONTRIBUTING.md`, không commit thẳng vào `main`.
- Không force push, không xóa lịch sử, không đổi remote, không commit secret.
- Chỉ push hoặc mở PR khi chủ dự án yêu cầu.

## Lệnh

```bash
python3 scripts/check_architecture.py   # bắt buộc chạy sau khi sửa architecture/
```

## Không được làm khi chưa có xác nhận

Xóa chức năng hoặc dữ liệu, đổi schema theo cách phá tương thích, đổi API đang dùng, đổi tên hàng loạt, thay công nghệ hiện có, destructive migration.
