

## Plan: Question Bank + Exam Builder Integration, Light Mode Fix, Grading UX Overhaul

### 1. Fix Light Mode Background Pattern

The `DashboardLayout` uses `bg-pattern` with `opacity-[0.07]` — this is too subtle. The light mode pattern CSS exists but isn't visible enough.

**File: `src/index.css`**
- Increase the light mode pattern dot opacity from `0.25` to `0.5` and gradient opacity
- **File: `src/components/DashboardLayout.tsx`**
- Increase `opacity-[0.07]` to `opacity-[0.15]` for the pattern layer so it's actually visible in light mode

### 2. Add "Import from Question Bank" to Exam Builder

**File: `src/pages/ExamBuilder.tsx`**
- Add a new `Dialog` for browsing the question bank (triggered from QuestionList or QuestionTypeDialog)
- Show questions filtered by the currently selected `assignedCourse`
- Allow selecting multiple questions and importing them into the exam's question list
- Add a "From Bank" option alongside "Add" in the question list header

**File: `src/components/exam-builder/QuestionList.tsx`**
- Add a second button "Import" or split the "Add" button into "New" and "From Bank"

### 3. Improve Question Bank Flow

**File: `src/pages/QuestionBank.tsx`**
- Improve the "Add Question" dialog to support full question editing per type (MCQ with options, Written with rubric, Coding with starter code) instead of just text + points
- Add inline editing capability — clicking a question opens an edit dialog, not just a read-only view
- Add bulk selection with checkboxes for batch delete
- Add tag management (click to filter by tag)

### 4. Overhaul Written Grading UX

**File: `src/pages/GradeWritten.tsx`**
Current issues: all questions stacked vertically makes it hard to focus; navigation is clunky.

Redesign to a split-panel layout:
- **Left panel**: Student list with status indicators (graded/pending), clickable to switch
- **Right panel**: Show one question at a time with:
  - Question text + rubric displayed prominently at top
  - Student answer in a readable card
  - Points slider (not just number input) with quick-grade buttons (Full marks, Half, Zero)
  - Feedback textarea
  - Prev/Next question navigation within the student
- Add keyboard shortcuts: arrow keys for navigation, number keys for quick scoring
- Show overall progress bar and auto-advance to next ungraded student

### 5. Files Changed Summary

| File | Change |
|------|--------|
| `src/index.css` | Increase light mode pattern visibility |
| `src/components/DashboardLayout.tsx` | Bump pattern opacity |
| `src/pages/ExamBuilder.tsx` | Add "Import from Bank" dialog with course-filtered question browsing |
| `src/components/exam-builder/QuestionList.tsx` | Add "From Bank" button |
| `src/pages/QuestionBank.tsx` | Richer add/edit dialogs with per-type fields, tag filtering, bulk actions |
| `src/pages/GradeWritten.tsx` | Full rewrite — split-panel layout, one-question-at-a-time grading, quick-grade buttons, keyboard nav |

