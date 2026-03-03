

# Fix 13 Remaining Bugs in Kernel Platform

## 1. Logout Race Condition (RoleContext.tsx, AppSidebar.tsx, FloatingNavbar.tsx, DashboardLayout.tsx)

**Problem**: `setRole("student")` writes back to localStorage, undoing the `removeItem` call.

**Fix**:
- `RoleContext.tsx`: Change state type to `UserRole | null`. Add `clearRole()` that sets state to `null` and removes localStorage key. Export it. Remove unused `useEffect` import (issue 13).
- `AppSidebar.tsx` + `FloatingNavbar.tsx`: Replace `setRole("student")` with `clearRole()` in logout handlers.
- `DashboardLayout.tsx`: Update guard to check `if (!hasRole || hasRole === "")`.

## 2. Crash on Logout - Initials (FloatingNavbar.tsx)

**Problem**: `name.split(" ").map(n => n[0].toUpperCase())` crashes when name is empty string.

**Fix**: Change to `const initials = name ? name.split(" ").filter(Boolean).map(n => n[0]?.toUpperCase() || "").join("").slice(0, 2) : "";`

## 3. Code Editor Editorials for Problems 4 and 5 (CodeEditor.tsx)

**Fix**:
- Problem 4: Change from "Binary Search" to "One-Pass Min Tracking" with steps: track minimum price, compute profit at each step, update max profit.
- Problem 5: Change from "Sliding Window" to "Hash Set" with steps: iterate array, check if element in set, return true if found, add to set.

## 4. Code Editor Solutions Per-Problem (CodeEditor.tsx)

**Problem**: Solutions tab always shows Two Sum solutions.

**Fix**: Create a `SOLUTIONS` record keyed by problem ID with 2-3 solutions per problem. Render `SOLUTIONS[problem.id]` instead of the hardcoded array.

## 5. Compose Message Sender (Messages.tsx)

**Problem**: `from: composeTo` makes the recipient appear as sender.

**Fix**: Import `useUser`, set `from` to current user's name, and `initials` from user name.

## 6. ExamTaking Ignores :id (ExamTaking.tsx)

**Fix**: Create 3 mock exam datasets keyed by ID (e.g., `"1"`, `"mid-ds"`, `"random"`). Call `useParams()` to get `id`. Look up the matching exam. Show "Exam not found" if no match.

## 7. ExamReview Ignores :id (ExamReview.tsx)

**Fix**: Create 2-3 mock review datasets. Look up by `id` from `useParams()`. Show "Review not found" if no match.

## 8. Exam Warning Banner Light Mode (ExamTaking.tsx)

**Fix**: Change `text-amber-300` to `text-amber-600 dark:text-amber-300` on line 162.

## 9. Quick Random Quiz (Practice.tsx)

**Fix**: Change the button's onClick to randomly pick from the available exam IDs instead of always navigating to `/dashboard/exam/random`.

## 10. Leaderboard isCurrentUser Dynamic (Leaderboard.tsx)

**Fix**: Import `useUser`, compare `entry.studentName === name` to set `isCurrentUser` dynamically. Remove hardcoded `isCurrentUser: true` from data.

## 11. Leaderboard Separate Time Filters (Leaderboard.tsx)

**Fix**: Replace single `timeFilter` state with `classTimeFilter` and `globalTimeFilter`. Each tab's filter buttons and `filterAndSort` calls use their own state variable.

## 12. Notification Timestamps Dynamic (NotificationContext.tsx, types/exam.ts)

**Fix**: 
- Add `date: Date` field to `AppNotification` type (keep `timestamp` as computed).
- In `NotificationContext.tsx`, store actual `Date` objects and compute relative timestamps using `formatDistanceToNow` from date-fns.
- Update `Notifications.tsx` to display the formatted timestamp.

## 13. Remove Unused Import (RoleContext.tsx)

Already covered in fix 1 -- remove `useEffect` from the import.

---

## Files Modified

| File | Changes |
|------|---------|
| `src/contexts/RoleContext.tsx` | Add `clearRole`, change type to nullable, remove unused `useEffect` |
| `src/components/AppSidebar.tsx` | Use `clearRole()` in logout |
| `src/components/FloatingNavbar.tsx` | Use `clearRole()` in logout, guard initials computation |
| `src/components/DashboardLayout.tsx` | Update route guard check |
| `src/pages/CodeEditor.tsx` | Fix editorials 4+5, add per-problem solutions |
| `src/pages/Messages.tsx` | Fix compose sender to use current user |
| `src/pages/ExamTaking.tsx` | Use `useParams`, multiple mock exams, fix amber text |
| `src/pages/ExamReview.tsx` | Use `useParams` to select mock review |
| `src/pages/Practice.tsx` | Randomize quiz ID |
| `src/pages/Leaderboard.tsx` | Dynamic `isCurrentUser`, separate time filters per tab |
| `src/contexts/NotificationContext.tsx` | Use `Date` objects + `formatDistanceToNow` |
| `src/types/exam.ts` | Add optional `date` field to `AppNotification` |
| `src/pages/Notifications.tsx` | Display computed timestamp from context |

Total: ~13 files edited, 0 new files.

