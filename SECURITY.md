# Security Policy

## Báo cáo lỗ hổng

Không báo lỗ hổng qua issue công khai. Dùng GitHub Private Vulnerability Reporting của repository này (tab **Security → Report a vulnerability**) sau khi tính năng được bật.

## Nguyên tắc

- Không commit credential, token, private key hay dữ liệu thật. `.env.example` chỉ chứa tên biến.
- Mọi request phía server phải được xác thực và phân quyền; ẩn nút ở client không phải kiểm soát bảo mật.
- Dữ liệu và file nhập từ client là không tin cậy.
- Không ghi secret hay dữ liệu cá nhân nhạy cảm vào log hoặc analytics.

Baseline đầy đủ: `architecture/08-security/` và `architecture/19-privacy-data-governance/`.
