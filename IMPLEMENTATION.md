# Implementation Overview

## Problem Statement
Build a Carbon Footprint Tracker web application where users can:
- Track personal carbon emissions across 4 categories (Transport, Energy, Food, Waste)
- View data in visual format (charts, tables, KPIs)
- Manage records with full CRUD operations
- Understand environmental impact of daily activities

Requirements: Responsive, user-friendly, data-driven, production-ready

---

## My Understanding & Approach

As a frontend developer, I built this using **Angular 18** with modern best practices:

### Architecture Decisions
1. **Standalone Components** - Cleaner, modular code without NgModule boilerplate
2. **RxJS State Management** - Centralized data flow using BehaviorSubject
3. **Reactive Patterns** - Components subscribe to observables for real-time updates
4. **SSR Compatible** - Platform detection for browser APIs (localStorage, Chart.js)
5. **localStorage Persistence** - Data survives browser refresh

---

## What I Implemented

### Core Features
- **Dashboard**: KPI cards (total, monthly avg, highest, trend) + monthly chart + top 5 emissions
- **Add Form**: Category, activity, amount, date with real-time CO₂ calculation
- **Table**: Sortable, filterable, searchable with edit/delete
- **Chart**: Monthly trend visualization using Chart.js
- **Navigation**: Responsive header with hamburger menu for mobile
- **State Management**: Centralized RxJS service with localStorage sync
- **Mobile Responsive**: Works on all devices with proper breakpoints
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation

### Technical Implementation
- **State Service**: EmissionsStateService manages all data with computed observables
- **Reactive Forms**: Form validation with real-time feedback
- **Chart Integration**: Chart.js with SSR compatibility checks
- **Responsive Design**: CSS Flexbox/Grid with mobile-first approach
- **Toast Notifications**: User feedback on actions
- **Type Safety**: Full TypeScript typing throughout

---

## Key Challenges & Solutions

1. **SSR Compatibility** - Added platform detection to prevent localStorage/Chart.js errors on server
2. **Mobile Responsiveness** - Implemented hamburger menu and flexible layouts
3. **State Management** - Built efficient RxJS system without external libraries
4. **Bundle Size** - Optimized styles to stay within budget
5. **Type Safety** - Ensured full TypeScript typing for better code quality

---

## Why This Approach?

- **Scalable**: Standalone components and RxJS make it easy to add features
- **Maintainable**: Centralized state management reduces bugs
- **User-Friendly**: Real-time feedback and responsive design
- **Production-Ready**: SSR support, error handling, accessibility
- **Modern**: Uses latest Angular 18 patterns and best practices

---

## Result

A fully functional, responsive Carbon Footprint Tracker deployed on Vercel with:
-  All 8 features working
-  Mobile-friendly interface
-  Real-time data updates
-  Data persistence
-  Professional UI/UX
-  Production-ready code

Live Demo: https://carbon-footprint-sustainability.vercel.app/

