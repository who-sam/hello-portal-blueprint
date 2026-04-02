

## Plan: Reorganize Project into Feature-Based Module Architecture

### Problem
Currently all 27 pages sit flat in `src/pages/` and components are loosely grouped. As the project grows, this makes files hard to find and related code scattered.

### Proposed Structure

```text
src/
├── app/                          # App shell
│   ├── App.tsx
│   ├── App.css
│   └── routes.tsx                # All route definitions extracted
│
├── features/                     # Feature modules
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── AuthPage.tsx
│   │   │   └── Unauthorized.tsx
│   │   └── components/           # (future auth components)
│   │
│   ├── dashboard/
│   │   ├── pages/
│   │   │   ├── DashboardIndex.tsx
│   │   │   ├── Dashboard.tsx          # student
│   │   │   └── TeacherDashboard.tsx
│   │   └── components/
│   │       ├── PerformanceChart.tsx
│   │       ├── RecentResults.tsx
│   │       ├── SkillBreakdown.tsx
│   │       ├── StatsCards.tsx
│   │       └── UpcomingExams.tsx
│   │
│   ├── exams/
│   │   ├── pages/
│   │   │   ├── ExamBuilder.tsx
│   │   │   ├── ExamTaking.tsx
│   │   │   ├── ExamReview.tsx
│   │   │   ├── UpcomingExams.tsx
│   │   │   └── QuestionBank.tsx
│   │   ├── components/
│   │   │   ├── MCQEditor.tsx
│   │   │   ├── WrittenEditor.tsx
│   │   │   ├── CodingEditor.tsx
│   │   │   ├── QuestionList.tsx
│   │   │   └── QuestionTypeDialog.tsx
│   │   └── lib/
│   │       └── questionBankStore.ts
│   │
│   ├── grading/
│   │   └── pages/
│   │       └── GradeWritten.tsx
│   │
│   ├── courses/
│   │   └── pages/
│   │       ├── Courses.tsx
│   │       └── CourseDetail.tsx
│   │
│   ├── results/
│   │   └── pages/
│   │       ├── Results.tsx
│   │       ├── Results.student.tsx
│   │       ├── TeacherResults.tsx
│   │       └── Leaderboard.tsx
│   │
│   ├── playground/
│   │   └── pages/
│   │       └── CodeEditor.tsx
│   │
│   ├── settings/
│   │   └── pages/
│   │       ├── Settings.tsx
│   │       └── Profile.tsx
│   │
│   └── social/
│       └── pages/
│           ├── Messages.tsx
│           ├── Notifications.tsx
│           ├── Help.tsx
│           ├── Team.tsx
│           └── Practice.tsx
│
├── components/                   # Shared / layout components
│   ├── ui/                       # shadcn (unchanged)
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── FloatingNavbar.tsx
│   │   └── AppSidebar.tsx
│   ├── ApexLogo.tsx
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── NavLink.tsx
│   └── PageSkeleton.tsx
│
├── contexts/                     # (unchanged)
├── hooks/                        # (unchanged)
├── lib/
│   └── utils.ts
├── types/
│   └── exam.ts
├── index.css
├── main.tsx
└── vite-env.d.ts
```

### What Changes

| Action | Count | Details |
|--------|-------|---------|
| Move pages into feature modules | 27 files | Each page moves to `features/<module>/pages/` |
| Move dashboard components | 5 files | Into `features/dashboard/components/` |
| Move exam-builder components | 5 files | Into `features/exams/components/` |
| Move questionBankStore | 1 file | Into `features/exams/lib/` |
| Move layout components | 3 files | Into `components/layout/` |
| Extract routes | 1 new file | `src/app/routes.tsx` — all `<Route>` definitions |
| Update imports | ~40 files | All cross-references updated to new paths |

### What Does NOT Change
- `src/components/ui/` stays exactly where it is
- `src/contexts/`, `src/hooks/`, `src/types/` stay flat (small enough)
- No logic changes, no renames, no refactors — purely structural moves
- `@/` path alias continues to point to `src/`

### Technical Notes
- All imports use `@/features/...`, `@/components/...` etc. via the existing `@/` alias
- The `routes.tsx` extraction keeps `App.tsx` clean and makes it easy to see all routes at a glance
- Each feature module is self-contained: its pages, its components, its lib utilities

