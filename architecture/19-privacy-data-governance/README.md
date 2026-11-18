# 19 — PRIVACY & DATA GOVERNANCE

Quy định dữ liệu được thu thập, sử dụng, chia sẻ, lưu trữ, xuất và xóa.

## 1. Mục tiêu
Quy định dữ liệu được thu thập, sử dụng, chia sẻ, lưu trữ, xuất và xóa.

## 2. Phạm vi
Data lifecycle, consent, retention and deletion.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 19.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 19.01 | [data-classification](modules/19.01-data-classification.md) | Public, internal, confidential and sensitive data categories. | NOT STARTED |
| 19.02 | [data-ownership](modules/19.02-data-ownership.md) | User-owned, tenant-owned, platform-owned and public content ownership. | NOT STARTED |
| 19.03 | [access-policy](modules/19.03-access-policy.md) | Purpose limitation, least privilege, internal access and audit requirements. | NOT STARTED |
| 19.04 | [consent-preferences](modules/19.04-consent-preferences.md) | Consent records, privacy settings, communication preferences và withdrawal. | NOT STARTED |
| 19.05 | [retention](modules/19.05-retention.md) | Retention schedules by data category and legal/business requirements. | NOT STARTED |
| 19.06 | [export-deletion](modules/19.06-export-deletion.md) | User data export, account deletion, erasure propagation and verification. | NOT STARTED |
| 19.07 | [privacy-by-design](modules/19.07-privacy-by-design.md) | Data minimization, privacy impact reviews and default-private note content. | NOT STARTED |
| 19.08 | [legal-compliance](modules/19.08-legal-compliance.md) | Privacy notices, terms, cookies where relevant and jurisdictional review. | NOT STARTED |
| 19.09 | [governance-audit](modules/19.09-governance-audit.md) | Policy ownership, review cadence, evidence and compliance tracking. | NOT STARTED |

## 4. Folder structure
```text
19-privacy-data-governance/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
`olaa-platform`: `architecture/19-privacy-data-governance/` (chính sách); thực thi trong service

Chưa có mã nguồn.

## 6. Dependencies
- [08 Security](../08-security/README.md) — interface: chưa định nghĩa
- Phụ thuộc xuyên suốt: All domains, Legal

Chi tiết: `architecture/DEPENDENCY_MAP.md`.

## 7. API contracts
Chưa có contract. Contract dùng chung sẽ nằm trong `olaa-platform/contracts/` (nhánh 20). Xem `api-contracts/README.md`.

## 8. Database ownership
Nhánh này không sở hữu dữ liệu nghiệp vụ. Xem `database/README.md`.

## 9. Security requirements
Áp dụng baseline của nhánh 08 và quy tắc privacy của nhánh 19. Yêu cầu riêng của nhánh: Chưa xác định — điền khi nhánh được triển khai.

## 10. Testing strategy
Theo chiến lược của nhánh 10. Kế hoạch riêng: `tests/README.md`.

## 11. Implementation status
| Hạng mục | Trạng thái |
|---|---|
| Tài liệu kiến trúc | SCAFFOLDED |
| Mã nguồn | NOT STARTED |

Owner đề xuất: Privacy/data governance owner.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
