# MUI Migration Guide

## Overview

Wellness Warriors has been updated to use Material-UI (MUI) components for a modern, professional look. The following components have been migrated:

✅ **Completed:**
- Theme provider setup (`lib/theme.tsx`)
- Layout with MUI theme (`app/layout.tsx`)
- Home screen (`components/home-screen.tsx`)
- Exercises screen (`components/exercises-screen.tsx`)
- Bottom navigation (`components/bottom-nav.tsx`)

⚠️ **Remaining:**
- Recording screen (still uses Tailwind, can be updated if needed)
- Other screens (plan, community, profile, etc.)

## Installation

### Step 1: Install MUI Dependencies

Run this command in your terminal:

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```

Or if you're using yarn:

```bash
yarn add @mui/material @mui/icons-material @emotion/react @emotion/styled
```

### Step 2: Verify Installation

Check that the packages are installed:

```bash
npm list @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## Key Features

### Modern Theme

The application uses a custom MUI theme with:
- Modern color palette (blue, purple gradients)
- Rounded corners (12-16px border radius)
- Smooth shadows and hover effects
- Responsive typography

### Component Updates

**Home Screen:**
- Gradient background
- Card-based navigation with icons
- Smooth animations
- Modern button styles

**Exercises Screen:**
- Color-coded exercise cards
- Tip cards with icons
- Improved spacing and layout

**Bottom Navigation:**
- Material Design bottom navigation
- Smooth active state transitions
- Modern icon animations

## Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Secondary**: Purple (#8b5cf6)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

### Typography
- Sans-serif font stack
- Responsive font sizes
- Clear hierarchy (h1-h6)

### Components
- **Buttons**: Rounded, with hover shadows
- **Cards**: Elevated with hover effects
- **Paper**: Clean white backgrounds
- **Chips**: Colored badges for categories

## Customization

To customize the theme, edit `lib/theme.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb", // Change primary color
    },
    // ... other palette options
  },
  // ... other theme options
});
```

## Migration Status

| Component | Status | Notes |
|-----------|--------|-------|
| Theme Provider | ✅ Complete | Modern theme configured |
| Layout | ✅ Complete | MUI theme integrated |
| Home Screen | ✅ Complete | Full MUI migration |
| Exercises Screen | ✅ Complete | Full MUI migration |
| Bottom Nav | ✅ Complete | MUI BottomNavigation |
| Recording Screen | ⚠️ Pending | Uses Tailwind (can update) |
| Other Screens | ⚠️ Pending | Plan, Community, Profile, etc. |

## Next Steps

To complete the migration:

1. **Update remaining screens** to use MUI components
2. **Replace Tailwind classes** with MUI `sx` prop or `styled` components
3. **Update recording screen** UI elements (video functionality remains the same)
4. **Test all screens** for consistency

## Troubleshooting

### MUI Icons Not Showing

If icons aren't displaying:
1. Ensure `@mui/icons-material` is installed
2. Check imports (should be `from "@mui/icons-material"`)
3. Verify font loading

### Theme Not Applied

If theme isn't working:
1. Check `AppThemeProvider` is wrapping the app
2. Verify `CssBaseline` is imported
3. Check browser console for errors

### Styling Conflicts

If you see styling conflicts:
1. MUI uses emotion for styling (doesn't conflict with Tailwind)
2. You can use both, but prefer MUI `sx` prop for consistency
3. Check for CSS specificity issues

## Benefits

✅ **Professional Look**: Material Design principles
✅ **Accessibility**: Built-in ARIA attributes
✅ **Responsive**: Mobile-first design
✅ **Customizable**: Easy theme customization
✅ **Modern**: Latest design patterns

---

**Note**: After installing dependencies, restart your development server:

```bash
npm run dev
```

