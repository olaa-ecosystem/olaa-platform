# ADR-0005: Thu phí thuê bao qua cổng thanh toán Việt Nam

- **Trạng thái:** Accepted (chưa chọn cổng cụ thể)
- **Ngày:** 2026-11-19
- **Người quyết định:** chủ dự án
- **Nhánh ảnh hưởng:** 05, 08, 14, 15, 19

## Bối cảnh

Ba PRD chọn một gói thuê bao Olaa chung, trả theo tháng hoặc năm. Người dùng là học sinh, sinh viên Việt Nam 15–25 tuổi. Theo hiểu biết hiện tại, Stripe chưa nhận doanh nghiệp đăng ký tại Việt Nam.

## Quyết định

- Thu phí qua cổng thanh toán Việt Nam. Ứng viên: VNPay, MoMo, ZaloPay, PayOS.
- Webhook (IPN) của cổng được xử lý trong Cloud Functions (ADR-0004). Cloud Function kiểm tra chữ ký rồi ghi quyền truy cập vào `billing/entitlements/{user_id}`.
- Các app chỉ đọc quyền truy cập qua contract `billing.entitlement.get`, không tự xử lý thanh toán.
- Cổng cụ thể được chọn trong một ADR sau, theo các tiêu chí:
  1. Có thanh toán định kỳ hoặc lưu token thẻ/ví để gia hạn tự động không.
  2. Phí giao dịch.
  3. Điều kiện mở tài khoản merchant: hộ kinh doanh hay doanh nghiệp, giấy tờ cần có.
  4. Webhook và môi trường sandbox để thử nghiệm.

## Lựa chọn đã cân nhắc

1. **Cổng Việt Nam.** Người dùng quen dùng (QR, ví, thẻ ATM). Chọn.
2. **Dịch vụ bán hộ quốc tế (Paddle, Lemon Squeezy).** Lo thuế và gia hạn tự động, nhưng chưa rõ có nhận người bán Việt Nam và thẻ nội địa không. Không chọn.

## Hệ quả

- Nếu cổng được chọn không gia hạn tự động được, gói thuê bao thành "trả trước theo kỳ": app nhắc người dùng trước ngày hết hạn và họ tự thanh toán lại. Nhánh 14 phải hỗ trợ trường hợp này.
- Chủ dự án cần có đăng ký kinh doanh trước khi mở tài khoản merchant. Việc này thuộc mốc M1 và có thể mất nhiều thời gian nhất trong M1.
- Thông tin thanh toán không lưu trong Firestore. Chỉ lưu mã giao dịch, gói, ngày hết hạn (nhánh 19).
