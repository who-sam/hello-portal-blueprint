

# Remove Sidebar, Keep Navbar as Primary Navigation

## What changes

1. **Remove `AppSidebar` usage** from `DashboardLayout.tsx` — delete the desktop sidebar render and the mobile Sheet/drawer
2. **Move mobile nav into the navbar** — when on mobile, the hamburger menu opens a dropdown/sheet with the nav tabs instead of the sidebar
3. **Update `DashboardLayout` main content** — remove the `ml-20` left margin (desktop) since there's no sidebar; content goes full-width under the navbar
4. **Update `FloatingNavbar`** — on mobile, the hamburger opens a sheet/dropdown containing the nav tabs (currently hidden on mobile)
5. **Keep `AppSidebar.tsx` file** but it will no longer be imported (can be deleted later)

## Files modified

- `src/components/DashboardLayout.tsx` — remove sidebar imports, Sheet, and left margin
- `src/components/FloatingNavbar.tsx` — add mobile nav sheet with the nav tabs when hamburger is clicked

## Layout after

```text
Desktop:
┌─────────────────────────────────────────────┐
│  Logo  │  Overview Exams Practice ...  │ 🔔 │
├─────────────────────────────────────────────┤
│                                             │
│              Page Content                   │
│              (full width)                   │
│                                             │
└─────────────────────────────────────────────┘

Mobile:
┌──────────────────────┐
│  ☰  Logo      🔔 👤  │
├──────────────────────┤
│                      │
│    Page Content      │
│                      │
└──────────────────────┘
  ☰ opens sheet with nav tabs + theme toggle + logout
```

