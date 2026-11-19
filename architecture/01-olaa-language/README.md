# 01 — OLAA LANGUAGE

Ứng dụng học ngoại ngữ độc lập, dùng chung nền tảng tài khoản, dữ liệu người dùng và design system.

> Mã nguồn của nhánh này nằm ở repository `olaa-language`. Thư mục này chỉ giữ đặc tả, liên kết và trạng thái; không chứa mã nguồn.

## 1. Mục tiêu
Ứng dụng học ngoại ngữ độc lập, dùng chung nền tảng tài khoản, dữ liệu người dùng và design system.

## 2. Phạm vi
Curriculum and learner progress; owns Language business rules.

Toàn bộ phạm vi chi tiết: `architecture/OLAA_MASTER_ARCHITECTURE.md`, mục 4, nhánh 01.

## 3. Các module con
| ID | Module | Mô tả | Trạng thái |
|---|---|---|---|
| 01.01 | [learning-foundation](modules/01.01-learning-foundation.md) | Learning session, learning objectives, study plans, learner profile và learning preferences. | TESTED (một phần) |
| 01.02 | [curriculum](modules/01.02-curriculum.md) | CEFR/level mapping, course, unit, lesson, prerequisite, lesson sequencing, curriculum versioning và release. | TESTED (một phần) |
| 01.03 | [vocabulary](modules/01.03-vocabulary.md) | Word entries, meanings, examples, collocations, pronunciation, word lists và vocabulary mastery. | IMPLEMENTED (một phần) |
| 01.04 | [grammar](modules/01.04-grammar.md) | Grammar topics, explanations, patterns, examples, difficulty levels và prerequisite relationships. | NOT STARTED |
| 01.05 | [listening](modules/01.05-listening.md) | Audio lessons, transcripts, comprehension tasks, playback controls, speed và listening progress. | IMPLEMENTED (một phần) |
| 01.06 | [speaking](modules/01.06-speaking.md) | Pronunciation practice, recording, speech evaluation, speaking prompts và feedback. | NOT STARTED |
| 01.07 | [reading](modules/01.07-reading.md) | Reading passages, graded texts, comprehension, annotations và reading progress. | NOT STARTED |
| 01.08 | [writing](modules/01.08-writing.md) | Writing prompts, drafts, corrections, rubrics, feedback và writing history. | NOT STARTED |
| 01.09 | [exercises](modules/01.09-exercises.md) | Exercise types, question bank, answer validation, hints, attempts và scoring. | TESTED |
| 01.10 | [assessment](modules/01.10-assessment.md) | Placement tests, quizzes, exams, skill assessments, score reports và retake policies. | NOT STARTED |
| 01.11 | [flashcards](modules/01.11-flashcards.md) | Card decks, review queue, spaced repetition, recall rating và due scheduling. | TESTED |
| 01.12 | [learning-progress](modules/01.12-learning-progress.md) | Lesson completion, skill progress, mastery, time-on-task và learning history. | TESTED (một phần) |
| 01.13 | [learning-intelligence](modules/01.13-learning-intelligence.md) | Adaptive recommendations, weak-area detection, revision suggestions và learning insights. | TESTED (một phần) |
| 01.14 | [language-settings](modules/01.14-language-settings.md) | Language preferences, study reminders, audio preferences, accessibility và learning settings. | IMPLEMENTED (một phần) |

## 4. Folder structure
```text
01-olaa-language/
├── README.md          # tài liệu này
├── CHANGELOG.md       # thay đổi của nhánh
├── requirements/      # yêu cầu chức năng và phi chức năng
├── modules/           # đặc tả từng module con
├── api-contracts/     # contract nhánh cung cấp hoặc tiêu thụ
├── database/          # dữ liệu nhánh sở hữu
└── tests/             # chiến lược và kế hoạch kiểm thử
```

## 5. Source code location
repository `olaa-language`

MVP web app (React 18 + Vite + TypeScript, pnpm) đã có, chạy độc lập trong trình duyệt. Mã tính năng nằm trong `src/features/` (`curriculum`, `exercises`, `lesson-player`, `flashcards-srs`, `learning-progress`, `revision-mistakes`, `onboarding`), trạng thái ở `src/stores/`. Tiến độ người học chỉ lưu trong `localStorage` (khóa `olaa-language/state`); chưa có OLAA ID, đồng bộ hay backend. Ứng dụng chưa dùng contract hay package nào từ `olaa-platform`.

Đối chiếu từng module: mục 3 và mục 11.

## 6. Dependencies
- [00 Olaa Platform](../00-olaa-platform/README.md) — interface: chưa định nghĩa
- [04 Shared Core](../04-shared-core/README.md) — interface: chưa định nghĩa
- [06 Content Management](../06-content-management/README.md) — interface: chưa định nghĩa
- [05 Backend Services](../05-backend-services/README.md) — interface: chưa định nghĩa
- [07 Database Architecture](../07-database-architecture/README.md) — interface: chưa định nghĩa

Chi tiết: `architecture/DEPENDENCY_MAP.md`.

## 7. API contracts
Chưa có contract. Contract dùng chung sẽ nằm trong `olaa-platform/contracts/` (nhánh 20). Xem `api-contracts/README.md`.

## 8. Database ownership
Chưa có schema. Xem `database/README.md`.

## 9. Security requirements
Áp dụng baseline của nhánh 08 và quy tắc privacy của nhánh 19. Yêu cầu riêng của nhánh: Chưa xác định — điền khi nhánh được triển khai.

## 10. Testing strategy
Theo chiến lược của nhánh 10. Kế hoạch riêng: `tests/README.md`.

## 11. Implementation status
| Hạng mục | Trạng thái |
|---|---|
| Tài liệu kiến trúc | SCAFFOLDED |
| Mã nguồn | IMPLEMENTED (MVP, một phần) — 9/14 module có mã |

Bằng chứng (2026-11-19, `olaa-language` commit `46e5f58`): `pnpm install --frozen-lockfile`, `pnpm test` (10 file, 69 test), `pnpm lint`, `pnpm typecheck`, `pnpm build` đều chạy và đạt.

Cách đọc trạng thái module:
- `TESTED`: có mã chạy được và có test riêng cho logic của module, đã chạy và đạt.
- `IMPLEMENTED`: có mã chạy được nhưng chưa có test riêng cho module.
- `(một phần)`: mã chỉ phủ một phần phạm vi trong đặc tả; phần còn thiếu ghi ở mục "Hiện trạng triển khai" của đặc tả module.
- Không module nào ở mức `INTEGRATED` (chưa có contract nào với nhánh khác) hay `RELEASED` (chưa có tag hay bản deploy).

| Trạng thái | Module |
|---|---|
| TESTED | 01.09 exercises, 01.11 flashcards |
| TESTED (một phần) | 01.01 learning-foundation, 01.02 curriculum, 01.12 learning-progress, 01.13 learning-intelligence |
| IMPLEMENTED (một phần) | 01.03 vocabulary, 01.05 listening, 01.14 language-settings |
| NOT STARTED | 01.04 grammar, 01.06 speaking, 01.07 reading, 01.08 writing, 01.10 assessment |

Mức nhánh để `IMPLEMENTED`, không phải `TESTED`, vì 5 module chưa có mã và 3 module có mã chưa có test riêng.

Owner đề xuất: Language domain.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`, xuất phát từ phạm vi MVP đã có.
2. Điền các trường Input/Output/Database ownership của 9 module đã có mã theo hành vi thực tế.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc (00 OLAA ID, 05 đồng bộ tiến độ, 06 nội dung) và ghi vào `DEPENDENCY_MAP.md`; cần kế hoạch chuyển dữ liệu từ `localStorage` (`STATE_VERSION` 1).
4. Thêm test riêng cho 01.03, 01.05 (phát âm thanh) và 01.14.
