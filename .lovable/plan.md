
# Role-Based Dashboard Separation

## Problem
Currently, both teacher and student pages share the same sidebar and navbar, mixing items like "Exam Builder" (teacher-only) with "Leaderboard" (student-only). There's no role awareness anywhere in the app.

## Solution
Create a simple role context that stores the user's role (selected during auth), then make the sidebar, navbar, and routing role-aware so teachers and students each see only their relevant navigation and pages.

---

## Changes

### 1. Create Role Context (`src/contexts/RoleContext.tsx`)
- A React context providing `role` ("teacher" | "student") and `setRole` function
- Persists role to `localStorage` so it survives page refreshes
- Defaults to "student" if not set

### 2. Update Auth Page (`src/pages/AuthPage.tsx`)
- When user selects "I'm a Teacher" or "I'm a Student" and submits signup/login, call `setRole()` from context
- After successful auth, navigate to `/dashboard` (the role context determines what they see)

### 3. Update AppSidebar (`src/components/AppSidebar.tsx`)
- Read `role` from context
- **Teacher sidebar items**: Dashboard, Exam Builder, Results, Messages, Team, Settings
- **Student sidebar items**: Dashboard, Profile, Leaderboard, Code Editor, Upcoming, Results, Messages
- Shared items (Help, Logout, Theme toggle) stay the same for both

### 4. Update FloatingNavbar (`src/components/FloatingNavbar.tsx`)
- Read `role` from context
- **Teacher nav tabs**: Overview, Exams, Exam Builder, Results, Settings
- **Student nav tabs**: Overview, Exams, Results, Practice, Settings

### 5. Update DashboardLayout (`src/components/DashboardLayout.tsx`)
- Wrap content with `RoleProvider` (or wrap at App level)

### 6. Update App.tsx routing
- Wrap the `DashboardLayout` route with `RoleProvider`
- All routes remain accessible (no hard blocking), but navigation only shows role-appropriate links
- The `/dashboard` index route renders `Dashboard` for students or `TeacherDashboard` for teachers automatically

### 7. Dashboard Index Route
- Create a small wrapper component or use conditional rendering: if role is "teacher", render `TeacherDashboard`; if "student", render `Dashboard` (the student dashboard)
- This means `/dashboard` always shows the right home page for the logged-in role

---

## File Summary

| File | Action |
|------|--------|
| `src/contexts/RoleContext.tsx` | Create - role context with localStorage persistence |
| `src/pages/AuthPage.tsx` | Edit - call setRole on auth, navigate to /dashboard |
| `src/components/AppSidebar.tsx` | Edit - conditional nav items based on role |
| `src/components/FloatingNavbar.tsx` | Edit - conditional nav tabs based on role |
| `src/components/DashboardLayout.tsx` | Edit - minor update for role provider |
| `src/App.tsx` | Edit - wrap with RoleProvider, update index route |
| `src/pages/DashboardIndex.tsx` | Create - small wrapper that renders teacher or student dashboard based on role |
