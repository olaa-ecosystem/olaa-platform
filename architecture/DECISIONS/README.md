# Architecture Decision Records

Mỗi quyết định kiến trúc quan trọng có một file `ADR-NNNN-<slug>.md`. Không sửa nội dung một ADR đã Accepted; muốn đổi thì viết ADR mới với trạng thái Supersedes và cập nhật ADR cũ thành Superseded.

| ADR | Tiêu đề | Trạng thái | Ngày |
|---|---|---|---|
| [ADR-0001](ADR-0001-four-repository-model.md) | Mô hình 4 repository thay cho monorepo | Accepted | 2026-11-18 |
| [ADR-0002](ADR-0002-product-naming.md) | Thương hiệu Olaa và tên sản phẩm | Accepted | 2026-11-18 |
| [ADR-0003](ADR-0003-web-client-platform.md) | Web responsive là nền tảng client của cả ba app | Accepted | 2026-11-19 |
| [ADR-0004](ADR-0004-firebase-backend.md) | Firebase làm backend và auth provider | Accepted | 2026-11-19 |
| [ADR-0005](ADR-0005-vietnam-payment-gateway.md) | Thu phí thuê bao qua cổng thanh toán Việt Nam | Accepted (chưa chọn cổng cụ thể) | 2026-11-19 |

## Mẫu

```markdown
# ADR-NNNN: <Tiêu đề>

- **Trạng thái:** Proposed | Accepted | Superseded by ADR-XXXX | Rejected
- **Ngày:** YYYY-MM-DD
- **Người quyết định:**
- **Nhánh ảnh hưởng:**

## Bối cảnh
## Quyết định
## Lựa chọn đã cân nhắc
## Hệ quả
```
