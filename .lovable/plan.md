

## Plan: Login Page Theme Toggle + Edit Functionality for Courses, Exams & Question Bank

### 1. Theme toggle on the login page

**File:** `src/features/auth/pages/AuthPage.tsx`

- Add a small Sun/Moon icon button in the top-right corner of the auth page (positioned absolute)
- Use `useTheme` from `next-themes` to toggle between light and dark
- Style it as a subtle ghost button so it doesn't distract from the auth form

### 2. Edit course name

**File:** `src/features/courses/pages/Courses.tsx`

- Wire up the existing "Edit" dropdown menu item on course cards (currently it does nothing)
- Open a dialog pre-filled with the course name, allow the teacher to rename it and save
- Also allow changing the cover photo from within the edit dialog

### 3. Edit exam details (title, description, questions)

**File:** `src/features/courses/pages/CourseDetail.tsx`

- Add an "Edit" option in the exam dropdown/actions on the teacher's course detail view
- Clicking "Edit" navigates to the Exam Builder with the exam data pre-loaded (via route state or URL param)

**File:** `src/features/exams/pages/ExamBuilder.tsx`

- Accept optional initial exam data from route location state
- Pre-populate title, description, course, duration, questions, and other settings when editing
- Change the "Save Exam" button text to "Update Exam" when in edit mode

### 4. Edit questions in the Question Bank

**File:** `src/features/exams/pages/QuestionBank.tsx`

- The edit functionality already exists (`openEdit` function and `editingId` state are implemented)
- Verify the edit button in the table row actions calls `openEdit(q)` correctly and that the dialog pre-fills all fields
- If the edit pencil icon in the table is not wired up, connect it

### Technical Details

| File | Change |
|------|--------|
| `src/features/auth/pages/AuthPage.tsx` | Add theme toggle button (Sun/Moon) using `useTheme` |
| `src/features/courses/pages/Courses.tsx` | Add edit course dialog, wire up Edit dropdown item |
| `src/features/courses/pages/CourseDetail.tsx` | Add Edit action on exams that navigates to ExamBuilder with state |
| `src/features/exams/pages/ExamBuilder.tsx` | Accept and pre-populate from route state for edit mode |
| `src/features/exams/pages/QuestionBank.tsx` | Verify/fix edit wiring in table actions |

