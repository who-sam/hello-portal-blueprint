

## Fix: Login redirect broken due to mismatched localStorage key

### Problem
`DashboardLayout.tsx` line 5 checks `localStorage.getItem("kernel-role")` but the `RoleContext` stores the role under `"apex-role"`. After login sets `apex-role`, the dashboard layout guard doesn't find `kernel-role` and redirects back to `/auth` — creating an infinite loop.

### Fix

**File:** `src/components/layout/DashboardLayout.tsx`

- Change line 5 from `localStorage.getItem("kernel-role")` to `localStorage.getItem("apex-role")` to match the key used in `RoleContext`.

This is a one-line fix.

