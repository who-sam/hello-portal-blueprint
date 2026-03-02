
# Kernel Platform - Comprehensive Bug Fix & Enhancement Plan

This is a large-scale effort covering bug fixes, missing features, responsiveness, loading states, and visual consistency. Due to the scope (~30+ files affected), the work is organized into 5 implementation phases.

---

## Phase 1: Critical Bug Fixes

### 1A. Auth & Role Fixes
**Files**: `AuthPage.tsx`, `RoleContext.tsx`, `DashboardLayout.tsx`, `FloatingNavbar.tsx`, `AppSidebar.tsx`

- **Login skips role**: Add role selection to the login flow. When user clicks "Log in" from the role-selection screen, show role cards first (reuse existing UI), then show the login form with the selected role. Store role on login just like signup.
- **Route guards**: In `DashboardLayout.tsx`, check if `localStorage` has `kernel-role` set. If not, redirect to `/auth` using `<Navigate to="/auth" />`.
- **Logout - Navbar**: Update the "Log out" dropdown item to clear `localStorage.removeItem("kernel-role")` before navigating to `/`.
- **Logout - Sidebar**: Add `onClick` handler to the sidebar logout button: clear role from localStorage, navigate to `/`.

### 1B. Exam Timer Auto-Submit
**File**: `ExamTaking.tsx`

- When `timeLeft` reaches 0, auto-trigger submission: set `submitDialogOpen(false)`, show a toast "Time's up! Your exam has been submitted.", and navigate to `/dashboard/results`.

### 1C. Theme Toggle Fix
**Files**: `AppSidebar.tsx`, `Settings.tsx`, `main.tsx` or a new `ThemeContext.tsx`

- Use the already-installed `next-themes` library. Wrap the app with `<ThemeProvider>` in `main.tsx` (attribute="class", defaultTheme="dark", storageKey="kernel-theme").
- In `AppSidebar.tsx`, replace local `useState` + DOM manipulation with `useTheme()` from next-themes.
- In `Settings.tsx` appearance tab, replace `document.documentElement.classList.contains("dark")` with `useTheme()`.

### 1D. Leaderboard Filters
**File**: `Leaderboard.tsx`

- Add `class` field and `weekScore`/`monthScore` fields to mock data entries.
- Filter entries based on selected class and time period. When "This Week" is selected, sort by `weekScore`; "This Month" by `monthScore`; "All Time" by `score`.

### 1E. Notifications Fixes
**File**: `Notifications.tsx`

- Mark notification as read before navigating (call state update then navigate).
- Add "Submissions" tab to the filter tabs list.

### 1F. Teacher Dashboard Route Fix
**File**: `TeacherDashboard.tsx`

- Change "Question Bank" quick action route from `/dashboard/results` to `/dashboard/exam-builder`.

---

## Phase 2: Non-Functional Buttons

### 2A. Dashboard
**File**: `Dashboard.tsx`
- "Start Practice Exam" button: add `onClick={() => navigate("/dashboard/start")}`.

### 2B. Upcoming Exams
**File**: `UpcomingExams.tsx`
- "Prepare" button: navigate to `/dashboard/start` (practice page).

### 2C. Practice Page
**File**: `Practice.tsx`
- "Quick Random Quiz": navigate to `/dashboard/exam/random` (exam taking with random ID).
- "Start Practice" / "Continue": navigate to `/dashboard/exam/{exam.id}`.

### 2D. Exam Builder
**File**: `ExamBuilder.tsx`
- "Save Exam": validate title + at least 1 question exist, show error toast if not, success toast + console.log exam data if valid.
- Add confirmation dialog before deleting a question (using AlertDialog).

### 2E. Auth Page
**File**: `AuthPage.tsx`
- "Forgot Password?": toggle to a simple forgot-password form (email input + "Send Reset Link" button that shows a toast).
- Social login buttons: show toast "Coming soon".
- Terms/Privacy links: open simple dialog modals with placeholder text.
- Add loading spinner on submit buttons during form submission (use `isSubmitting` from react-hook-form).

### 2F. Help Page
**File**: `Help.tsx`
- "Contact Support": `window.location.href = "mailto:support@kernel.dev"`.
- Resource cards: wrap in anchor tags pointing to `#` with descriptive placeholder.

### 2G. Code Editor
**File**: `CodeEditor.tsx`
- Like/Dislike/Bookmark/Share: add toggle state with active styling.
- Remove unused `ChevronDown` import.

### 2H. Team Page
**File**: `Team.tsx`
- "Message" button: navigate to `/dashboard/messages` (future: pre-select member).

### 2I. Teacher Dashboard
**File**: `TeacherDashboard.tsx`
- "More" button on exam rows: replace with `DropdownMenu` containing View, Edit, Delete, View Results options (with toasts for now).

### 2J. Profile Submissions
**File**: `Profile.tsx`
- Make submission rows clickable: navigate to `/dashboard/exam/{id}/review`.

### 2K. Results - Exam Review Access
**File**: `Results.tsx`
- Add "View Detailed Review" button inside the result dialog that navigates to `/dashboard/exam/{id}/review`.

---

## Phase 3: Missing Pages & Features

### 3A. Search Icon Fix
**File**: `FloatingNavbar.tsx`
- Replace `Search` icon with `Code2` icon for the editor link, or change the search button to open a simple search dialog overlay (command palette style using the existing `cmdk` dependency).

### 3B. Messages Enhancements
**File**: `Messages.tsx`
- Add "New Message" button that opens a compose form.
- Add reply textarea when viewing a message.
- Show empty state when search returns no results.

### 3C. Code Editor Improvements
**File**: `CodeEditor.tsx`
- Add a problem list (array of 5 problems) with a dropdown/select to switch between them.
- Replace plain text description rendering with simple markdown-like rendering (parse backticks/bold manually or add lightweight rendering).
- "Editorial" tab: add placeholder step-by-step solution content.
- "Solutions" tab: add placeholder community solution cards.
- Language change: preserve code per language using a `Record<string, string>` state.
- Keyboard shortcuts: add `useEffect` for Ctrl+Enter (Run) and Ctrl+Shift+Enter (Submit).

### 3D. Exam Taking Enhancements
**File**: `ExamTaking.tsx`
- Add sidebar toggle button.
- Add "visited but unanswered" status to question navigator (track visited questions in state).

---

## Phase 4: Mobile Responsiveness

**Files**: `DashboardLayout.tsx`, `FloatingNavbar.tsx`, `AppSidebar.tsx`, `ExamTaking.tsx`, `CodeEditor.tsx`, `ExamBuilder.tsx`

- Create a mobile nav context or use the existing `useIsMobile` hook.
- Add hamburger menu button in navbar visible at `< 768px`.
- Hide sidebar on mobile; show as a slide-out Sheet (from shadcn) when hamburger is tapped.
- Collapse navbar tabs into the hamburger menu on mobile; keep logo + bell + profile visible.
- ExamTaking: stack sidebar above question area on mobile; hide sidebar by default.
- CodeEditor: switch ResizablePanelGroup to vertical on mobile.
- ExamBuilder: switch to vertical layout on mobile.

---

## Phase 5: Polish & Consistency

### 5A. Loading, Error, Empty States
- Create reusable `<PageSkeleton />`, `<EmptyState />`, and `<ErrorState />` components.
- Add empty states to: UpcomingExams, Results, Messages, Notifications, Practice, Team.
- Skeleton states: wrap each page's content area with a simulated loading skeleton (1-second delay toggle for demo purposes since there's no real data fetching).

### 5B. Visual Consistency
- **Headings**: Standardize all pages to `text-3xl font-bold` (fix TeacherDashboard, ExamBuilder, Leaderboard, Notifications).
- **Card styling**: Add `bg-card/80 backdrop-blur-md border-border/50` to all cards missing it (Results summary cards, Help cards, etc.).
- **Chart colors**: Replace all hardcoded HSL values in `PerformanceChart.tsx` and `TeacherDashboard.tsx` with CSS custom property references using `var(--border)`, `var(--muted-foreground)`, `var(--primary)`.
- **Monaco theme**: In `CodingEditor.tsx`, `CodeEditor.tsx`, `ExamTaking.tsx`, `ExamReview.tsx` -- use `useTheme()` to dynamically set Monaco theme to `"vs-dark"` or `"light"`.

### 5C. User Context
- Create `UserContext.tsx` storing `name` and `email` (set during auth signup/login form).
- Replace all hardcoded user references: "Good morning, John" (Dashboard), "Welcome back, Dr. Smith" (TeacherDashboard), "John Doe" / "john@kernel.dev" (FloatingNavbar, Profile, Settings).

### 5D. Notification Badge
**File**: `FloatingNavbar.tsx`
- Replace hardcoded "2" badge with a dynamic count from notification mock data (or a shared notification context).

### 5E. HTML Metadata
**File**: `index.html`
- Title: "Kernel -- Exam Platform"
- Description: "Kernel is a modern exam platform for teachers and students."
- Remove Lovable OG image URLs, update author.

### 5F. Navigation Consistency
**Files**: `AppSidebar.tsx`, `FloatingNavbar.tsx`

Student sidebar should include: Dashboard, Profile, Leaderboard, Code Editor, Upcoming Exams, Results, Practice, Messages, Help (bottom), Logout (bottom).
Teacher sidebar should include: Dashboard, Exam Builder, Upcoming Exams, Results, Team, Messages, Help (bottom), Logout (bottom).

Ensure navbar tabs match sidebar access for each role.

### 5G. NotFound Page
**File**: `NotFound.tsx`
- Replace `<a href="/">` with `<Link to="/">`.
- Add Kernel logo and match app styling.

### 5H. Aria Labels
- Add `aria-label` to all icon-only buttons across: FloatingNavbar, AppSidebar, CodeEditor, ExamTaking, Messages, Team.

---

## Summary

| Phase | Files Modified | Key Changes |
|-------|---------------|-------------|
| 1 | ~8 files | Auth/role bugs, timer, theme, leaderboard filters, notifications |
| 2 | ~10 files | Wire up all non-functional buttons |
| 3 | ~4 files | Search overlay, messages compose/reply, code editor problems, exam sidebar toggle |
| 4 | ~6 files | Mobile hamburger menu, responsive layouts |
| 5 | ~15 files | Loading/empty states, visual consistency, user context, metadata, aria labels |

New files to create:
- `src/contexts/UserContext.tsx` -- user name/email context
- `src/components/PageSkeleton.tsx` -- reusable skeleton loader
- `src/components/EmptyState.tsx` -- reusable empty state
- `src/components/ErrorState.tsx` -- reusable error state

Total estimated: ~25-30 files modified/created across all phases.
