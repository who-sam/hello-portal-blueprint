
# Phase 2: Student Experience — Profile, Leaderboard, Exam Review, Notifications

This phase adds 4 student-facing pages plus navigation updates to complete the student experience.

---

## Overview

| Page | Route | Description |
|------|-------|-------------|
| Student Profile | `/dashboard/profile` | Detailed profile with stats, submissions, achievements |
| Leaderboard | `/dashboard/leaderboard` | Class and global rankings with medals |
| Exam Review | `/dashboard/exam/:id/review` | Post-exam review with correct/incorrect answers |
| Notifications | `/dashboard/notifications` | Filterable notification feed |

---

## 1. Student Profile Page (`src/pages/Profile.tsx`)

A dedicated profile page (separate from Settings):

- **Profile header card**: Large avatar with initials fallback, name, "Student" role badge, email, "Member since" date, bio text, "Edit Profile" button linking to Settings
- **Stats row**: 4 glassmorphic cards -- Exams Taken, Average Score, Total Submissions, Current Streak (with flame icon)
- **Tabs**: Overview | Submissions | Achievements

**Overview tab**:
- Performance line chart (Recharts) showing score trend over last 6 months
- Skill breakdown by topic (horizontal progress bars: Arrays 85%, Strings 72%, etc.)
- Recent activity timeline (5 items with timestamps)
- Classes enrolled list (badge-style chips)

**Submissions tab**:
- Filterable table: Exam Name, Score, Language, Date, Status badge
- Click row to expand inline and see question-level breakdown

**Achievements tab** (gamification):
- Grid of badge cards -- earned ones are full color, locked ones are grayed with a lock icon
- Examples: "First Submit", "Perfect Score", "10 Exams Completed", "Speed Demon", "Polyglot"
- Each badge: icon, name, description, earned date or progress bar toward unlock

## 2. Leaderboard Page (`src/pages/Leaderboard.tsx`)

- **Tabs**: Class Leaderboard | Global Leaderboard
- **Class leaderboard**: Dropdown select to pick a class, then ranked table
- **Top 3 podium**: 3 larger cards with gold/silver/bronze medal icons, avatar, name, score
- **Ranked table below**: Rank #, Avatar, Name, Score, Exams Completed, Streak, Trend arrow
- **Current user's row** highlighted with a subtle primary border and "You" badge
- **Time filter**: This Week | This Month | All Time (as a tab sub-group or segmented control)
- **Global leaderboard**: Same layout but across all classes

## 3. Exam Review Page (`src/pages/ExamReview.tsx`)

Read-only post-exam review (after results are released):

- **Summary card at top**: Total score (large), time taken, rank in class, comparison bar to class average, pass/fail badge
- **Question-by-question review** (scrollable list):
  - **MCQ**: Question text, all options displayed, student's selection highlighted (green if correct, red if wrong), correct answer shown in green, explanation text below
  - **Written**: Student's response displayed, teacher feedback card alongside, score out of max
  - **Coding**: Read-only Monaco editor showing submitted code, test results table (passed/failed with checkmarks/X), score
- Each question shows points earned vs total in a top-right badge
- "Back to Results" button at top and bottom
- Everything is read-only -- no editing

## 4. Notifications Page (`src/pages/Notifications.tsx`)

- **Header**: "Notifications" title with "Mark all as read" ghost button
- **Filter tabs**: All | Exams | Classes | Results | System
- **Notification cards** in a vertical list:
  - Left: Colored icon based on type (Clock amber for exam reminders, CheckCircle green for results, Megaphone blue for announcements, UserPlus purple for class joins, Send green for submissions)
  - Center: Title (bold if unread), description, relative timestamp ("2 hours ago")
  - Right: Unread dot indicator
  - Click navigates to relevant page (e.g., clicking a result notification goes to `/dashboard/results`)
- **Empty state**: Bell icon with "No notifications yet" message
- Mock data: 8-10 sample notifications of different types

## 5. Navigation and Routing Updates

- **`src/App.tsx`**: Add 3 new routes under `/dashboard`:
  - `profile` -> Profile
  - `leaderboard` -> Leaderboard
  - `exam/:id/review` -> ExamReview
  - `notifications` -> Notifications

- **`src/components/AppSidebar.tsx`**: Add User icon for Profile and Trophy icon for Leaderboard to the main nav group

- **`src/components/FloatingNavbar.tsx`**: Update the Bell icon button to navigate to `/dashboard/notifications` (it currently goes to `/dashboard/messages`), add unread count badge on the bell

- **Profile dropdown** in FloatingNavbar: Make the "Profile" menu item navigate to `/dashboard/profile` instead of `/dashboard/settings`

## 6. Shared Types Updates (`src/types/exam.ts`)

Add new interfaces:

```text
Achievement { id, name, description, icon, earnedAt?, progress?, maxProgress, unlocked }
Notification { id, type, title, description, timestamp, read, linkTo }
LeaderboardEntry { rank, studentName, avatar, score, examsCompleted, streak, trend }
```

---

## Technical Notes

- All data is mock/placeholder arrays (no backend)
- Reuses existing glassmorphic card patterns (`bg-card/80 backdrop-blur-md border-border/50`)
- Recharts reused for profile performance chart
- Monaco Editor reused in read-only mode for exam review coding questions
- shadcn Tabs, Table, Badge, Avatar, Progress components used throughout
- Estimated: 4 new page files, 1 new types addition, 3 modified files (App.tsx, AppSidebar, FloatingNavbar)
