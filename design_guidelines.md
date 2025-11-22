# VisaHub Design Guidelines

## Design Approach

**Hybrid System Approach**: Material Design foundation enhanced with Linear-inspired aesthetics and Stripe's professional restraint. The platform must balance government-grade trustworthiness with modern SaaS innovation.

**Primary References**:
- **Linear**: Clean typography hierarchy, subtle animations, precise spacing
- **Stripe**: Professional restraint, clear information architecture, trust-building design
- **Material Design**: Component structure, elevation system, form patterns
- **Notion**: Content organization, multi-step workflows

## Core Design Principles

1. **Trust Through Clarity**: Every element must reinforce reliability and accuracy
2. **Progressive Disclosure**: Complex workflows broken into digestible steps
3. **Status Transparency**: Always visible progress indicators and timelines
4. **Professional Elevation**: Modern aesthetics without sacrificing seriousness

## Typography System

**Font Family**: Inter (primary), fallback to system fonts

**Hierarchy**:
- Display/Hero: 3.5rem (56px), font-weight 700, line-height 1.1
- H1: 2.5rem (40px), font-weight 700, line-height 1.2
- H2: 2rem (32px), font-weight 600, line-height 1.3
- H3: 1.5rem (24px), font-weight 600, line-height 1.4
- Body Large: 1.125rem (18px), font-weight 400, line-height 1.6
- Body: 1rem (16px), font-weight 400, line-height 1.5
- Small: 0.875rem (14px), font-weight 400, line-height 1.5
- Caption: 0.75rem (12px), font-weight 500, line-height 1.4, uppercase tracking

**Emphasis**: Use font-weight 500-600 for emphasis, not color variations in body text

## Layout System

**Spacing Scale**: Tailwind units of 1, 2, 3, 4, 6, 8, 12, 16, 20, 24
- **Micro spacing**: 1, 2, 3 (tight groupings, form fields)
- **Component spacing**: 4, 6, 8 (cards, list items, button padding)
- **Section spacing**: 12, 16, 20, 24 (page sections, major divisions)

**Grid System**:
- Container: max-w-7xl for application screens, max-w-6xl for content
- Multi-column: Use 12-column grid for dashboards, 8-column for forms
- Card grids: 3 columns (lg), 2 columns (md), 1 column (mobile)

**Elevation Levels** (Material Design inspired):
- Level 0: Flat surface (no shadow)
- Level 1: Cards, panels (subtle shadow)
- Level 2: Dropdowns, popovers
- Level 3: Modals, dialogs
- Level 4: Notifications, alerts (highest)

## Component Library

### Navigation
**Top Navigation**: Sticky header with logo left, main nav center, user menu right. Height: 16 units (64px). Include country selector icon and notification bell.

**Sidebar Navigation** (Dashboard): 64 units wide (256px), collapsible to icon-only on mobile. Clear section groupings with dividers.

### Visa Wizard
**Multi-step Progress Bar**: Horizontal stepper showing 5-7 steps with numbers, titles, and completion indicators. Current step highlighted, completed steps with checkmarks.

**Step Cards**: Each wizard step in centered card (max-w-2xl), single focused question per screen. Large, friendly form inputs with helper text below.

**Navigation**: "Back" and "Continue" buttons bottom-right, "Save & Exit" link top-right.

### Dashboard Components
**Status Cards**: Display application status with prominent icon, status label, progress percentage, and next action button. Use card elevation level 1.

**Timeline Component**: Vertical timeline showing completed/upcoming milestones with dates, connecting lines, and status icons (checkmark, clock, alert).

**Document Checklist**: List items with document name, upload status indicator, action buttons. Use green checkmark for uploaded, yellow warning for missing, red error for rejected.

**Countdown Timers**: Prominent display of days remaining with circular progress visualization.

### Forms
**Input Fields**: Height 12 units (48px), rounded corners (rounded-lg), clear labels above, helper text below, error states with icons.

**File Upload**: Drag-and-drop zone with dashed border, upload icon, file type indicators. Show thumbnail previews for uploaded documents.

**Buttons**:
- Primary: Height 12 units, px-6 padding, rounded-lg
- Secondary: Same size, outline style
- When on images: Add backdrop-blur-md with semi-transparent background

### Business Portal
**Employee Management Table**: Sortable columns, status badges, action dropdown per row. Include bulk actions toolbar.

**Team Analytics**: KPI cards showing pending applications, approval rates, average processing time. Use data visualization (simple bar charts, progress rings).

### Expert Review Interface
**Split View**: Document preview left (60%), expert comments right (40%). Inline annotation tools. Comment threads with timestamps.

## Landing/Marketing Pages

**Hero Section**: Full viewport height with gradient background. Large hero image (right 50%) showing diverse professionals using the platform. Headline left with primary CTA and trust indicator ("Trusted by 50,000+ global travelers").

**Features Section**: 3-column grid of feature cards with icons, each showcasing core capabilities (Visa Wizard, Auto-Fill, Tracking).

**How It Works**: Horizontal 4-step process with numbers, icons, descriptions. Use connecting lines between steps.

**Pricing Section**: Side-by-side plan comparison (4 columns: Free, Pro, Premium, Business). Highlight most popular plan.

**Social Proof**: 3-column testimonial grid with user photos, quotes, role/location labels.

**CTA Section**: Centered with compelling copy, primary button, and supporting text about free trial.

**Footer**: Multi-column layout with navigation links, trust badges, social icons, newsletter signup.

## Interaction Patterns

**Micro-interactions**: Subtle scale on button hover (scale-105), smooth transitions (duration-200), success checkmark animations

**Loading States**: Skeleton screens for dashboards, spinner for quick actions, progress bars for uploads

**Validation Feedback**: Inline validation with icon indicators, shake animation for errors, smooth success transitions

**Animations**: Use sparingly - smooth page transitions, subtle card hover lifts, progress indicator animations. Avoid distracting effects.

## Images

**Hero Section**: Large image (1200x800px) showing professionals working on laptops with visa documents, diverse group in modern office setting. Position right side, 50% width on desktop.

**Feature Icons**: Use Heroicons throughout for consistency. Custom visa/passport/document illustrations for key features.

**Trust Building**: Embassy/government building photos, team photos for "About" section, customer success photos for testimonials.

**Empty States**: Custom illustrations for "No applications yet", "Upload your first document" scenarios - friendly but professional.

## Accessibility
- Minimum touch target: 44x44px
- Form labels always visible and associated
- ARIA labels for icon-only buttons
- Keyboard navigation with visible focus states
- Color contrast ratios meeting WCAG AA standards