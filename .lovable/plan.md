

## Plan: Student Grades — Empty States, Fail Alert, and Full-Mark Celebration

### Overview
Three enhancements to the student Grades tab in `CourseDetail.tsx`:
1. **Unannounced grades** — show a friendly empty state when the teacher hasn't published grades yet
2. **Failed course alert** — a prominent but clean warning when average is below passing (60%)
3. **Full-mark confetti** — a minimal particle burst when the student opens grades and has a perfect 100% on any assessment

### Technical Details

**File: `src/features/courses/pages/CourseDetail.tsx`**

**1. Add a `gradesAnnounced` flag to the student view**
- Add a mock boolean (e.g. `const studentGradesAnnounced = true`) to simulate the teacher's publish state.
- When `false`, replace the entire Grades tab content with an empty state: a locked/clock icon, "Grades not yet available" title, and "Your instructor hasn't published grades for this course yet. Check back later." description. Use the existing `EmptyState` component or inline a similar pattern.

**2. Failed course warning (avg < 60%)**
- After the grades table, if `overallAvg < 60`, render an `Alert` (destructive variant) with an `AlertCircle` icon: title "Course At Risk", description "Your current average is below the passing threshold. Consider reviewing past material or reaching out to your instructor."
- Styled with `border-destructive/50` to keep it visible but not overwhelming.

**3. Full-mark confetti (score === 100%)**
- Install `canvas-confetti` (lightweight, ~6KB, no React wrapper needed).
- On mount of the Grades tab, check if any grade has `score === total` (100%). If so, fire a single short confetti burst using `confetti()` with minimal particle count (~80) and a short duration. Runs once via a `useEffect` + ref guard so it doesn't replay on re-renders.
- This keeps it minimal — no persistent animations, just a one-time celebration.

**File: `src/components/EmptyState.tsx`** — no changes needed, reuse as-is.

### What the student sees

```text
Grades not announced:
┌─────────────────────────────────────┐
│        🔒  (Lock icon)              │
│   Grades Not Yet Available          │
│   Your instructor hasn't published  │
│   grades for this course yet.       │
└─────────────────────────────────────┘

Failed course (avg < 60%):
┌─ Alert ─────────────────────────────┐
│ ⚠ Course At Risk                    │
│ Your average is below passing...    │
└─────────────────────────────────────┘

Full mark: brief confetti burst on page load
```

