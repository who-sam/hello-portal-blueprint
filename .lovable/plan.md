

# Redesign Auth Page - Split Layout

Rebuild the AuthPage to match the uploaded reference design: a horizontal split-card layout with the form on the left and a hero image on the right.

## Layout

```text
┌─────────────────────────────────────────────────┐
│  ┌──────────────────┬──────────────────────┐    │
│  │  </> Kernel       │                      │    │
│  │                   │                      │    │
│  │  Welcome back     │   auth-hero.jpg      │    │
│  │  Log in to Kernel │   (rounded right)    │    │
│  │                   │                      │    │
│  │  [ Email       ]  │                      │    │
│  │  [ Password    ]  │                      │    │
│  │  [ Log in btn  ]  │                      │    │
│  │                   │                      │    │
│  │  Don't have an    │                      │    │
│  │  account? Sign up │                      │    │
│  └──────────────────┴──────────────────────┘    │
└─────────────────────────────────────────────────┘
```

## Changes (AuthPage.tsx only)

- Replace the current centered single-card layout with a `max-w-4xl` split container using `grid grid-cols-1 md:grid-cols-2`
- Left side: dark background (`bg-card`), contains logo, heading, form fields, and sign up/login toggle
- Right side: `auth-hero.jpg` displayed with `object-cover`, rounded on the right corners, hidden on mobile
- Keep all existing auth modes (select, login-role, signup, login, forgot) and their logic intact
- Move the Kernel logo from above the card to inside the left panel (top-left)
- Remove the Terms/Privacy footer text from below the card (keep the dialogs)
- Use the existing `auth-bg.jpg` as the full-page background with dark overlay (same as now)

No new files. Only `AuthPage.tsx` is modified. All role selection, form validation, and mock auth logic stays the same.

