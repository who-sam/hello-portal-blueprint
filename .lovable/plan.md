

## Plan: Save Exam Builder Questions to Question Bank

### What
Add a "Save to Bank" button in each question editor (MCQ, Written, Coding) within the Exam Builder, allowing teachers to save the currently edited question to the Question Bank for reuse.

### How

**1. Add "Save to Bank" button to each editor component**

Files: `src/components/exam-builder/MCQEditor.tsx`, `WrittenEditor.tsx`, `CodingEditor.tsx`

- Add an optional `onSaveToBank` callback prop to each editor's `Props` interface
- Render a "Save to Bank" button (with a `Library` or `BookmarkPlus` icon) in the editor toolbar/header area
- The button calls `onSaveToBank(question)` when clicked

**2. Handle the save logic in ExamBuilder**

File: `src/pages/ExamBuilder.tsx`

- Add a `handleSaveToBank` function that:
  - Validates the question has text filled in
  - Validates a course is assigned (needed to categorize in the bank)
  - Shows a small confirmation dialog or toast asking for optional tags
  - Saves the question data to the mock bank array (or localStorage to persist across pages)
  - Shows a success toast: "Question saved to bank"
- Pass `onSaveToBank` to each editor component

**3. Shared storage for Question Bank data**

Currently both `QuestionBank.tsx` and `ExamBuilder.tsx` use separate hardcoded mock arrays. To make "Save to Bank" actually work across pages:

- Create a simple shared store using `localStorage` with a key like `apex-question-bank`
- Create a small utility file `src/lib/questionBankStore.ts` with `getQuestions()`, `addQuestion()`, `deleteQuestion()`, `updateQuestion()` functions
- Update `QuestionBank.tsx` to read/write from this store instead of local state
- Update `ExamBuilder.tsx` bank import dialog to read from the same store

### Technical Details

| File | Change |
|------|--------|
| `src/lib/questionBankStore.ts` | New — localStorage-backed CRUD for bank questions |
| `src/components/exam-builder/MCQEditor.tsx` | Add `onSaveToBank` prop + button |
| `src/components/exam-builder/WrittenEditor.tsx` | Add `onSaveToBank` prop + button |
| `src/components/exam-builder/CodingEditor.tsx` | Add `onSaveToBank` prop + button |
| `src/pages/ExamBuilder.tsx` | Add save-to-bank handler, pass to editors, update import to use shared store |
| `src/pages/QuestionBank.tsx` | Migrate to shared store |

