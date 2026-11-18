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
| 01.01 | [learning-foundation](modules/01.01-learning-foundation.md) | Learning session, learning objectives, study plans, learner profile và learning preferences. | NOT STARTED |
| 01.02 | [curriculum](modules/01.02-curriculum.md) | CEFR/level mapping, course, unit, lesson, prerequisite, lesson sequencing, curriculum versioning và release. | NOT STARTED |
| 01.03 | [vocabulary](modules/01.03-vocabulary.md) | Word entries, meanings, examples, collocations, pronunciation, word lists và vocabulary mastery. | NOT STARTED |
| 01.04 | [grammar](modules/01.04-grammar.md) | Grammar topics, explanations, patterns, examples, difficulty levels và prerequisite relationships. | NOT STARTED |
| 01.05 | [listening](modules/01.05-listening.md) | Audio lessons, transcripts, comprehension tasks, playback controls, speed và listening progress. | NOT STARTED |
| 01.06 | [speaking](modules/01.06-speaking.md) | Pronunciation practice, recording, speech evaluation, speaking prompts và feedback. | NOT STARTED |
| 01.07 | [reading](modules/01.07-reading.md) | Reading passages, graded texts, comprehension, annotations và reading progress. | NOT STARTED |
| 01.08 | [writing](modules/01.08-writing.md) | Writing prompts, drafts, corrections, rubrics, feedback và writing history. | NOT STARTED |
| 01.09 | [exercises](modules/01.09-exercises.md) | Exercise types, question bank, answer validation, hints, attempts và scoring. | NOT STARTED |
| 01.10 | [assessment](modules/01.10-assessment.md) | Placement tests, quizzes, exams, skill assessments, score reports và retake policies. | NOT STARTED |
| 01.11 | [flashcards](modules/01.11-flashcards.md) | Card decks, review queue, spaced repetition, recall rating và due scheduling. | NOT STARTED |
| 01.12 | [learning-progress](modules/01.12-learning-progress.md) | Lesson completion, skill progress, mastery, time-on-task và learning history. | NOT STARTED |
| 01.13 | [learning-intelligence](modules/01.13-learning-intelligence.md) | Adaptive recommendations, weak-area detection, revision suggestions và learning insights. | NOT STARTED |
| 01.14 | [language-settings](modules/01.14-language-settings.md) | Language preferences, study reminders, audio preferences, accessibility và learning settings. | NOT STARTED |

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

Chưa có mã nguồn.

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
| Mã nguồn | NOT STARTED |

Owner đề xuất: Language domain.

## 12. Next steps
1. Viết yêu cầu trong `requirements/`.
2. Hoàn thiện đặc tả các module ưu tiên trong `modules/`.
3. Đề xuất interface tối thiểu với các nhánh phụ thuộc và ghi vào `DEPENDENCY_MAP.md`.
