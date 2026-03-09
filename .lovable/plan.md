
# Fix 6 Remaining Issues

## 1. Practice Exam Cards - Match Labels to Mock Exams (Practice.tsx)

The practice cards have IDs 1-6 but only 3 mock exams exist ("1" = JS Fundamentals, "mid-ds" = Data Structures, "algo-final" = Algorithms). The ID_ALIASES map cards 2-6 to these three exams, but the card labels don't match. 

**Fix**: Update the practice card names/descriptions to match the actual exams they open:
- Card 1 (ID "1"): Keep "JavaScript Fundamentals" (matches)
- Card 2 (ID "2" -> "mid-ds"): Rename to "Data Structures" with matching description
- Card 3 (ID "3" -> "algo-final"): Rename to "Algorithms & Graphs" with matching description
- Card 4 (ID "4" -> "1"): Rename to "JS Basics Review" (second pass at JS Fundamentals)
- Card 5 (ID "5" -> "mid-ds"): Rename to "Data Structures II" (second pass)
- Card 6 (ID "6" -> "algo-final"): Rename to "Algorithms Challenge" (second pass)

Also update categories accordingly.

## 2. Composed Messages Appear as Received (Messages.tsx)

Sent messages get added to the inbox with `from: userName`, making them look like received messages from yourself.

**Fix**: Don't add composed messages to the inbox. Instead, just show a toast "Message sent to {composeTo}" and close the dialog. The inbox should only show received messages.

## 3. Teacher "Preview as Student" Missing for quiz-alg and final-oop (ExamReview.tsx + ExamTaking.tsx)

Teacher dashboard has exam IDs "quiz-alg" and "final-oop" but neither `MOCK_REVIEWS` nor `MOCK_EXAMS` / `ID_ALIASES` include them.

**Fix**:
- In `ExamReview.tsx`: Add "quiz-alg" and "final-oop" to the `resolveReview` aliases (map "quiz-alg" -> "algo-final" and "final-oop" -> "1")
- In `ExamTaking.tsx`: Add "quiz-alg" and "final-oop" to `ID_ALIASES` (same mappings)

## 4. Timer Text Invisible in Light Mode (ExamTaking.tsx)

Line 314: `text-red-400` has poor contrast on light backgrounds when timer < 5 min.

**Fix**: Change `text-red-400` to `text-destructive` which adapts to both themes.

## 5. UserContext Defaults to "John Doe" (UserContext.tsx)

After logout clears localStorage, re-mounting defaults back to "John Doe".

**Fix**: Change fallbacks from `|| "John Doe"` and `|| "john@kernel.dev"` to `|| ""`.

## 6. FloatingNavbar Calls useUser() Twice (FloatingNavbar.tsx)

Two separate `useUser()` calls on lines 43-44.

**Fix**: Combine into `const { name, email, setUser } = useUser();`

---

## Technical Details

| File | Changes |
|------|---------|
| `src/pages/Practice.tsx` | Update card names/descriptions to match aliased exams |
| `src/pages/Messages.tsx` | Remove adding sent message to inbox, just toast |
| `src/pages/ExamReview.tsx` | Add "quiz-alg" and "final-oop" aliases |
| `src/pages/ExamTaking.tsx` | Add "quiz-alg"/"final-oop" to ID_ALIASES, fix timer color |
| `src/contexts/UserContext.tsx` | Change fallbacks to empty strings |
| `src/components/FloatingNavbar.tsx` | Merge duplicate useUser() calls |

Total: 6 files edited.
