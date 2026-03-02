
# Phase 1: Core Pages — Auth, Teacher Dashboard, Exam Builder, Student Exam Taking

This phase adds the foundational pages to turn Kernel from a coding-only tool into a multi-type exam portal. We'll build 4 major features across ~10 new/modified files.

---

## Overview

| Page | Route | Description |
|------|-------|-------------|
| Auth Page (redesign) | `/auth` | Role-based signup/login with teacher/student split |
| Teacher Dashboard | `/dashboard/teacher` | Teacher home with stats, active exams, activity feed |
| Exam Builder | `/dashboard/exam-builder` | Create exams with MCQ, written, and coding questions |
| Student Exam Taking | `/dashboard/exam/:id` | Multi-type exam interface with timer and auto-save |

---

## 1. Auth Page Redesign (`src/pages/AuthPage.tsx`)

Replace the current signup-only form with a full auth flow:

- **Role selection screen**: Two large glassmorphic cards side by side -- "I'm a Teacher" (GraduationCap icon) and "I'm a Student" (BookOpen icon) with taglines and "Get Started" buttons
- Selecting a role transitions to the **signup form** (Name, Email, Password, Confirm Password) with Zod validation and inline errors
- **Login form** toggle: Email, Password, "Forgot Password?" link, "Remember me" checkbox
- Animated transition between Login/Signup using state toggle
- Social login row (Google, GitHub) kept as outline buttons
- Background keeps the existing auth-bg wallpaper with dark overlay and glassmorphic centered card

## 2. Teacher Dashboard (`src/pages/TeacherDashboard.tsx`)

A dedicated teacher home page:

- **Welcome header** with teacher name and formatted date
- **4 stat cards**: Total Students, Active Exams, Classes, Average Score -- each with icon, value, and trend indicator (arrow + percentage)
- **Quick Actions row**: 4 clickable cards -- "Create Exam", "Create Class", "View Results", "Question Bank" -- each navigating to the relevant route
- **Active Exams widget** (left ~60%): Table of current exams with columns: Name, Class, Students Started, Time Remaining, Status badge, Actions
- **Recent Activity feed** (right ~40%): Timeline-style list of events with avatars and timestamps
- **Class Performance chart**: Recharts bar chart comparing average scores across classes

All cards use `bg-card/80 backdrop-blur-md border-border/50` styling.

## 3. Exam Builder (`src/pages/ExamBuilder.tsx`)

Multi-question-type exam creation interface:

- **Exam header form**: Title, Description (textarea), Duration, Start/End time, Passing Score, toggles for Shuffle Questions and Show Results After
- **Split layout** using react-resizable-panels:
  - **Left panel (30%)**: Question list with type icons (Code/CheckSquare/FileText), click to select, "+ Add Question" button that opens a type selector dialog
  - **Right panel (70%)**: Question editor that changes based on type

- **Type selector dialog** (when adding a question):
  - Coding Problem (Code icon)
  - Multiple Choice (CheckSquare icon)
  - Written/Short Answer (FileText icon)

- **MCQ Editor**: Question text, points, options A-D with correct answer radio, "Add Option" button, difficulty selector, explanation field
- **Written Editor**: Question text, points, max word count, rubric textarea, "Require manual grading" toggle, difficulty selector
- **Coding Editor**: Reuses existing Monaco editor pattern -- problem title, description, starter code, test cases table, language tabs, time/memory limits

Supporting components created in `src/components/exam-builder/`:
- `QuestionTypeDialog.tsx`
- `MCQEditor.tsx`
- `WrittenEditor.tsx`
- `CodingEditor.tsx`
- `QuestionList.tsx`

## 4. Student Exam Taking (`src/pages/ExamTaking.tsx`)

Multi-type exam interface for students:

- **Pre-exam screen**: Exam title, description, question breakdown ("5 MCQ, 3 Written, 2 Coding"), rules, disclaimer, large "Start Exam" button
- **Exam interface** (after starting):
  - **Top bar**: Exam title, countdown timer (turns red under 5 min), "Submit Exam" button
  - **Left sidebar** (collapsible): Question navigation grid with color-coded status (gray=unvisited, blue=answered, orange=flagged, green=submitted)
  - **Main area**: Renders different UIs per question type:
    - MCQ: Radio/checkbox options, "Flag for Review", "Clear Selection"
    - Written: Large textarea with word count and max indicator
    - Coding: Split-pane with Monaco editor (reusing existing pattern)
  - Navigation: "Previous" / "Next" buttons
  - Auto-save indicator ("Saved" toast every 30s)
  - Submit confirmation dialog with answer summary
  - `beforeunload` browser warning

## 5. Routing and Navigation Updates

- **`src/App.tsx`**: Add routes for `/auth`, `/dashboard/teacher`, `/dashboard/exam-builder`, `/dashboard/exam/:id`
- **`src/components/FloatingNavbar.tsx`**: Add "Exam Builder" to teacher nav (conditionally, or as new tab)
- **`src/components/AppSidebar.tsx`**: Add exam builder icon to sidebar

## 6. Shared Types (`src/types/exam.ts`)

Create TypeScript interfaces used across all new pages:

```text
Question (base) -> MCQQuestion, WrittenQuestion, CodingQuestion
Exam (title, description, duration, questions, settings)
ExamSubmission, StudentAnswer
TestCase, ExamResult
```

---

## Technical Notes

- All forms use `react-hook-form` + `zod` for validation
- All data is mock/placeholder arrays (ready to swap with API calls later)
- Existing design tokens, glassmorphic card patterns, and component library are reused throughout
- Monaco Editor reused from existing CodeEditor page for coding questions
- Recharts reused for teacher dashboard charts
- No backend/database changes in this phase -- purely frontend
- Estimated: ~10 new files, ~3 modified files
