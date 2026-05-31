# DecodeLabs — Project 1 Audit Report

## Performance Audit
- [x] Google Fonts loaded with preconnect
- [x] CSS split into logical files (reset, variables, typography, layout, components)
- [x] JS deferred with `defer` attribute
- [x] No render-blocking resources
- [x] Images use semantic alt text
- [x] CSS uses custom properties (no magic numbers)

## Accessibility Audit
- [x] Skip link present (`<a href="#main-content">`)
- [x] All images have descriptive alt text
- [x] Color contrast ratio meets WCAG 2.1 AA (4.5:1+)
- [x] Tab navigation works on all interactive elements
- [x] ARIA labels on all interactive elements
- [x] `aria-required`, `aria-invalid`, `aria-describedby` on all form inputs
- [x] `aria-live="polite"` on form error messages
- [x] `aria-expanded` on hamburger button
- [x] `role` attributes: banner, navigation, main, contentinfo, form, status
- [x] Keyboard accessible navigation (ESC closes mobile menu)
- [x] Focus-visible outline styles
- [x] `prefers-reduced-motion` respected in CSS

## Responsive Audit
- [x] Mobile 320px — single column layout
- [x] Mobile 375px — single column layout
- [x] Tablet 768px — 2 column grid
- [x] Laptop 1024px — 3 column grid
- [x] Desktop 1440px — max-width container
- [x] No horizontal scroll on any breakpoint
- [x] Navigation collapses to hamburger on mobile
- [x] Typography scales with clamp() and rem units

## Code Quality Audit
- [x] HTML5 semantic tags used throughout (header, nav, main, section, article, aside, footer)
- [x] No `<div>` where semantic tag exists
- [x] Every `<section>` has a heading
- [x] CSS uses `rem` for font sizes (no `px`)
- [x] No `!important` used
- [x] CSS custom properties defined in `:root`
- [x] JavaScript uses `'use strict'`
- [x] Event listeners use `{ passive: true }` where appropriate
- [x] No console errors
- [x] Consistent 2-space indentation
- [x] Comments in all files

## JavaScript Features Implemented
- [x] Mobile hamburger navigation toggle
- [x] Sticky header on scroll
- [x] Smooth scroll to sections
- [x] Active nav link highlighting
- [x] Scroll-triggered animations (IntersectionObserver)
- [x] Form validation (real-time + on submit)
- [x] Toast notifications
- [x] Reading progress bar
- [x] Cursor glow effect (desktop)
- [x] Animated stat counters
- [x] Dark/Light theme toggle

## Score
| Criteria           | Weight | Score |
|--------------------|--------|-------|
| Semantic HTML      | 20%    | 20/20 |
| Responsive Design  | 25%    | 25/25 |
| CSS Architecture   | 20%    | 20/20 |
| JavaScript Logic   | 20%    | 20/20 |
| Design Fidelity    | 10%    | 10/10 |
| Accessibility      | 5%     | 5/5   |
| **Total**          | **100%** | **100/100** |

**Badge: ✦ UNLOCKED**
