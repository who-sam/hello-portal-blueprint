

## Final Touches Before Backend Implementation

After reviewing the entire project, here is a prioritized list of issues and improvements to address before moving to backend integration.

---

### 1. Broken/Missing Routes

The sidebar (`AppSidebar.tsx`) references several routes that do not exist in `routes.tsx`:

| Sidebar Link | URL | Status |
|---|---|---|
| Leaderboard | `/dashboard/leaderboard` | No route defined |
| Practice | `/dashboard/start` | No route defined |
| Team | `/dashboard/team` | No route defined |
| Messages | `/dashboard/messages` | No route defined |
| Upcoming Exams | `/dashboard/upcoming` | No route (exams is at `/dashboard/exams`) |
| Code Editor | `/dashboard/editor` | No route (playground is at `/dashboard/playground`) |
| Help | `/dashboard/help` | No route defined |
| Notifications | No route | Page exists but no route |

The pages for these features already exist (`Leaderboard.tsx`, `Practice.tsx`, `Team.tsx`, `Messages.tsx`, `Help.tsx`, `Notifications.tsx`) but are simply not wired up in the router.

**Fix**: Add the missing routes in `routes.tsx` and align sidebar URLs to match.

---

### 2. Navbar Profile Photo Missing

The `FloatingNavbar.tsx` avatar shows initials only — it does not use the `profilePhoto` from `UserContext` even though the feature was just added.

**Fix**: Import `AvatarImage` and render `profilePhoto` in the navbar avatar.

---

### 3. Sidebar Link Mismatches (AppSidebar vs FloatingNavbar)

`AppSidebar.tsx` has a completely different set of nav links than `FloatingNavbar.tsx`. Some point to wrong URLs. Since `DashboardLayout` only renders `FloatingNavbar`, the `AppSidebar` is effectively unused but could confuse future development.

**Fix**: Either remove `AppSidebar.tsx` entirely or sync its links with the actual routes.

---

### 4. Notification Bell Not Linked

The navbar imports the notification bell icon and `unreadCount` but never renders it — there is no bell button in the navbar UI.

**Fix**: Add a notification bell icon button in the navbar that navigates to `/dashboard/notifications`.

---

### 5. Settings Page Missing from Navbar

The Settings page exists and has a route, but it is not in either `teacherNavTabs` or `studentNavTabs` in the navbar. It is only accessible from the user dropdown menu.

**Fix**: This is acceptable UX, but consider adding it to the search palette if not already there.

---

### 6. Mobile Responsiveness Quick Check

The `DashboardLayout` has no left padding for sidebar (since sidebar is unused). The floating navbar handles mobile via hamburger menu — but the mobile sheet only shows the same `navTabs` which are missing the above broken routes.

**Fix**: Once routes are fixed, the mobile sheet will automatically pick up the correct links.

---

### Summary of Recommended Changes

1. **Add 7 missing routes** to `routes.tsx` (leaderboard, practice, team, messages, help, notifications, and fix upcoming/editor aliases)
2. **Fix sidebar URLs** in `AppSidebar.tsx` or remove the file
3. **Show profile photo in navbar** avatar
4. **Add notification bell** to the floating navbar
5. **Clean up unused imports** (Bell, Clock in FloatingNavbar are imported but Bell is never used)

### Technical Details

**File changes:**

- `src/app/routes.tsx` — add Route entries for Leaderboard, Practice, Team, Messages, Help, Notifications
- `src/components/layout/FloatingNavbar.tsx` — render `profilePhoto` in avatar, add notification bell button, add missing pages to search palette
- `src/components/layout/AppSidebar.tsx` — fix URLs to match actual routes, or delete if unused
- Minor cleanup of unused imports across layout files

