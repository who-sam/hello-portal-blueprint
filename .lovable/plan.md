

## Fix Exams Page: Calendar Layout + Filters

### Problem
The calendar card uses `xl:grid-cols-3` (1/3 of page width) but the calendar component itself is small (~280px), leaving a huge empty card. The exam list has no filters.

### Plan

**1. Fix calendar layout**
- Change grid from `xl:grid-cols-3` to `xl:grid-cols-[380px_minmax(0,1fr)]` so the calendar column is fixed-width and snug
- Add `self-start` to the calendar card so it doesn't stretch vertically
- Add mini stats below calendar: total exams, upcoming count, completed count

**2. Add status to mock data**
- Add `status` field: `"upcoming"`, `"completed"`, `"missed"` and `score` for completed exams
- Update visual treatment per status (green check + score for completed, red badge for missed, dimmed for past)

**3. Add filter toolbar to exam schedule**
- Status toggle chips: All / Upcoming / Completed / Missed
- Difficulty toggle chips: All / Easy / Medium / Hard
- Search input to filter by exam name
- Combined AND filtering with empty state when no results

**4. Status-aware exam cards**
- Completed: green checkmark + score, no "Prepare" button
- Missed: red "Missed" badge, dimmed card
- Upcoming: current "Prepare" button

### Files Changed
- `src/pages/UpcomingExams.tsx` — layout fix, mock data update, filters, status indicators

