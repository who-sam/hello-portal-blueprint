

## Revamp Auth Flow: Login + Signup with Role Selection

### Overview
Replace the current login-only auth page with a standard login/signup flow. Add Google & GitHub social login buttons (mock). During signup, users choose their role (Student or Teacher). Remove the FirstTimeSetup page (National ID verification flow). Update all related references.

### Changes

**1. Rewrite `src/pages/AuthPage.tsx`**
- Add `mode` state: `"login" | "signup" | "forgot"`
- **Login tab**: email + password + "Log In" button (keep existing design/layout)
- **Signup tab**: first name, middle name, last name, email, password, confirm password, role selector (Student/Teacher toggle or radio) + "Create Account" button
- **Social login**: Add "Continue with Google" and "Continue with GitHub" buttons with icons (mock — sets role to student by default, navigates to dashboard)
- **Forgot password**: Keep existing flow
- Divider between form login and social buttons ("or continue with")
- Keep the split layout (form left, hero image right)

**2. Remove `src/pages/FirstTimeSetup.tsx`**
- Delete the file
- Remove the `/setup` route from `App.tsx`
- Remove the "First time here? Set up your account" link from AuthPage (replace with "Don't have an account? Sign up" toggling to signup mode)

**3. Update `src/App.tsx`**
- Remove `FirstTimeSetup` import and `/setup` route

**4. Update `src/pages/Index.tsx`**
- No changes needed (already redirects to auth)

**5. Update `src/contexts/RoleContext.tsx`**
- No changes (already supports student/teacher)

**6. Update `src/components/DashboardLayout.tsx`**
- No changes (already checks localStorage for role)

### Files Changed
- `src/pages/AuthPage.tsx` — full rewrite with login/signup/social
- `src/pages/FirstTimeSetup.tsx` — delete
- `src/App.tsx` — remove `/setup` route

