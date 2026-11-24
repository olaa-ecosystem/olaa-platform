# Olaa Platform

Repository trung tâm của hệ sinh thái Olaa: kiến trúc 22 nhánh, quyết định kiến trúc, và (khi triển khai) contracts, shared packages, backend, database và hạ tầng dùng chung cho ba ứng dụng.

## Hệ sinh thái

| Repository | Sản phẩm | Nhánh |
|---|---|---|
| [`olaa-platform`](https://github.com/olaa-ecosystem/olaa-platform) | Olaa Platform và phần dùng chung | 00, 04–21 |
| [`olaa-language`](https://github.com/olaa-ecosystem/olaa-language) | Olaa Language, học ngoại ngữ | 01 |
| [`olaa-habits`](https://github.com/olaa-ecosystem/olaa-habits) | Olaa Habits, theo dõi thói quen | 02 |
| [`olaa-takenote`](https://github.com/olaa-ecosystem/olaa-takenote) | Olaa TakeNote, ghi chú và viết tay trên iPad | 03 |

Lý do chọn 4 repository: [ADR-0001](architecture/DECISIONS/ADR-0001-four-repository-model.md).

## Trạng thái

Giai đoạn nền tảng. Repository mới có tài liệu kiến trúc; chưa có mã nguồn, service hay database. Trạng thái từng nhánh: [`architecture/IMPLEMENTATION_STATUS.md`](architecture/IMPLEMENTATION_STATUS.md).

## Cấu trúc hiện tại

```text
olaa-platform/
├── architecture/
│   ├── OLAA_MASTER_ARCHITECTURE.md   # nguồn kiến trúc chuẩn
│   ├── 00-olaa-platform/ … 21-search-media-processing/
│   ├── DECISIONS/                    # ADR
│   ├── MODULE_REGISTRY.md
│   ├── DEPENDENCY_MAP.md
│   ├── IMPLEMENTATION_STATUS.md
│   └── INTEGRATION_CHANGELOG.md
├── prototypes/
│   └── takenote-ipad-home/           # bản mẫu giao diện iPad, không phải mã sản phẩm (ADR-0003)
├── scripts/
│   └── check_architecture.py         # kiểm tra cấu trúc tài liệu, chạy trong CI
├── .github/
├── CLAUDE.md
├── CONTRIBUTING.md
└── SECURITY.md
```

Cấu trúc đích (thêm `apps/`, `packages/`, `services/`, `contracts/`, `database/`, `infrastructure/` khi từng nhánh bắt đầu): `OLAA_MASTER_ARCHITECTURE.md`, mục 3.1.

## Bắt đầu

1. Đọc [`architecture/OLAA_MASTER_ARCHITECTURE.md`](architecture/OLAA_MASTER_ARCHITECTURE.md).
2. Đọc [`CLAUDE.md`](CLAUDE.md) trước khi dùng Claude Code.
3. Xem [`architecture/README.md`](architecture/README.md) để biết cách tổ chức 22 nhánh.
4. Quy ước branch, commit, PR: [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Kiểm tra cục bộ

```bash
python3 scripts/check_architecture.py
```

Không cần cài thêm gói nào.
