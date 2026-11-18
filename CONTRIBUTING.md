# Contributing

Quy ước chung cho cả 4 repository Olaa (nhánh 13 — GitHub & Source Governance).

## Branch

| Branch | Dùng cho |
|---|---|
| `main` | Luôn ở trạng thái phát hành được. Được bảo vệ; chỉ nhận thay đổi qua PR. |
| `feat/<slug>` | Chức năng mới |
| `fix/<slug>` | Sửa lỗi |
| `docs/<slug>` | Tài liệu |
| `chore/<slug>` | Bảo trì, cấu hình |
| `refactor/<slug>` | Tái cấu trúc không đổi hành vi |
| `hotfix/<slug>` | Sửa khẩn cấp trên bản đã phát hành |

Chưa dùng `develop` khi dự án còn một người phát triển. Nếu thêm, ghi ADR.

## Commit

Theo Conventional Commits, scope là mã nhánh hoặc tên module:

```
<type>(<scope>): <mô tả ngắn>

feat(01.11): add spaced repetition scheduler
docs(architecture): add dependency map for branch 05
fix(02.04): correct streak reset across timezones
```

`type`: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`, `build`, `perf`. Thay đổi phá tương thích thêm `!` sau scope và mục `BREAKING CHANGE:` trong thân commit.

## Pull request

- Một PR một mục đích, gắn với một nhánh kiến trúc.
- Điền đủ template: phạm vi, nhánh ảnh hưởng, bằng chứng kiểm tra, tài liệu đã cập nhật.
- CI phải đạt trước khi merge.
- Thay đổi ảnh hưởng nhiều repository: ghi `architecture/INTEGRATION_CHANGELOG.md` và merge theo thứ tự contract → provider → consumer.

## Release

- Tag theo SemVer `vMAJOR.MINOR.PATCH` cho từng repository; package Shared Core có phiên bản riêng.
- Cập nhật `CHANGELOG.md` trước khi tag.
- Chính sách phiên bản chi tiết được chốt trước bản phát hành đầu tiên (nhánh 09.06).
