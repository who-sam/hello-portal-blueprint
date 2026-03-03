
# Fix 18 Remaining Bugs in Kernel Platform

## 1. Chart Colors - PerformanceChart.tsx + TeacherDashboard.tsx

**PerformanceChart.tsx**: Lines 40 and 47/53 use `var(--border)` and `var(--muted-foreground)` without `hsl()` wrapper for the CartesianGrid `stroke` and XAxis/YAxis `tick.fill`. The Tooltip and Bar already use `hsl(var(...))` correctly. Fix lines 40, 47, 53.

**TeacherDashboard.tsx**: Lines 210-211 have the same issue - `stroke="var(--border)"` and `fill: "var(--muted-foreground)"` without `hsl()` wrappers.

## 2. Search Dialog Filter - FloatingNavbar.tsx

Add `searchQuery` state. Bind input onChange. Filter `searchItems` by query. Show "No results" when empty.

## 3. Shared Notification Context

Create `src/contexts/NotificationContext.tsx` with the mock notifications data, unread count, `markAllRead()`, and `markAsRead(id)`. Consume it in both `FloatingNavbar.tsx` (for badge) and `Notifications.tsx` (for the list). Remove the hardcoded `MOCK_NOTIFICATIONS` from FloatingNavbar.

## 4. Flagged Questions Count - ExamTaking.tsx

Change `getStatus` (line 123-131): check answered status first, then check flagged. If both answered and flagged, return `"answered-flagged"`. Update `answeredCount` (line 133) to count both `"answered"` and `"answered-flagged"`. Update the sidebar button styling to handle the new status.

## 5. Settings Password - Settings.tsx

Add `currentPassword` and `newPassword` state. Bind to inputs. Create `handlePasswordUpdate` that validates both fields filled, new password >= 8 chars, shows toast, clears fields.

## 6. Settings Notification Persistence - Settings.tsx

Change "Save Preferences" button to call a dedicated handler that saves to `localStorage` under `kernel-notification-prefs` and shows a specific toast. Load initial state from localStorage.

## 7. Help Resource Links - Help.tsx

Change the `<a>` tags to `<button>` elements with `onClick` that opens placeholder URLs via `window.open` or shows a toast.

## 8. Messages Compose Dialog - Messages.tsx

Add `composeTo`, `composeSubject`, `composeBody` state. Bind inputs. On Send, add message to list, clear fields, close dialog.

## 9. Code Editor Per-Problem Like/Dislike/Bookmark - CodeEditor.tsx

Change `liked`, `disliked`, `bookmarked` from single booleans to `Record<number, boolean>` keyed by problem ID.

## 10. Code Editor Editorial Per-Problem - CodeEditor.tsx

Add an `editorials` object mapping problem ID to editorial content. Render the matching editorial.

## 11. Code Editor Solutions Clickable - CodeEditor.tsx

Add `onClick` to solution items that expands them or shows a dialog with sample code.

## 12. Profile Role Badge - Profile.tsx

Import `useRole` and display actual role instead of hardcoded "Student".

## 13. Teacher Dashboard Delete Exam - TeacherDashboard.tsx

Convert `activeExams` to `useState`. On delete, filter the array.

## 14. Teacher "View" Label - TeacherDashboard.tsx

Change "View" to "Preview as Student" or navigate to `/dashboard/exam/${id}/review`.

## 15. Logout Context Reset - AppSidebar.tsx + FloatingNavbar.tsx

Import `useRole` and `useUser` in both logout handlers. Call `setRole("student")` and `setUser("", "")` before navigating.

## 16. Flash of Dark Theme - index.html

Remove `class="dark"` from the `<html>` tag. `next-themes` handles it.

## 17. Remove "Remember Me" Checkbox - AuthPage.tsx

Remove the `rememberMe` state and the checkbox UI since it's not implemented.

## 18. Redirect Authenticated Users - Index.tsx

Check `localStorage.getItem("kernel-role")` and redirect to `/dashboard` if it exists.

---

## Files Modified

| File | Changes |
|------|---------|
| `src/components/dashboard/PerformanceChart.tsx` | Wrap var() with hsl() on lines 40, 47, 53 |
| `src/pages/TeacherDashboard.tsx` | Fix chart colors, convert activeExams to state, change View label, delete removes from list |
| `src/components/FloatingNavbar.tsx` | Add search filter, use NotificationContext, reset context on logout |
| `src/contexts/NotificationContext.tsx` | **NEW** - shared notification state |
| `src/pages/Notifications.tsx` | Use NotificationContext instead of local state |
| `src/pages/ExamTaking.tsx` | Fix getStatus priority, count answered-flagged |
| `src/pages/Settings.tsx` | Add password state/validation, persist notification prefs |
| `src/pages/Help.tsx` | Fix resource links |
| `src/pages/Messages.tsx` | Wire compose dialog inputs |
| `src/pages/CodeEditor.tsx` | Per-problem like/dislike/bookmark, per-problem editorial, clickable solutions |
| `src/pages/Profile.tsx` | Dynamic role badge |
| `src/components/AppSidebar.tsx` | Reset context on logout |
| `index.html` | Remove class="dark" |
| `src/pages/AuthPage.tsx` | Remove remember me checkbox |
| `src/pages/Index.tsx` | Redirect authenticated users |
| `src/App.tsx` | Wrap with NotificationProvider |
| `src/main.tsx` | No changes needed (ThemeProvider already present) |

Total: 1 new file, ~15 files edited.
