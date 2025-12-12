# Carbon Footprint Tracker

A professional Angular 18 application for tracking and analyzing personal carbon emissions across different categories (Transport, Energy, Food, Waste). Built with modern Angular patterns, responsive design, and comprehensive state management.

![Carbon Footprint Tracker](logo.png)

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI 18.x

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd carbon-footprint-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`. The application will automatically reload when you modify source files.

4. **Build for production**
   ```bash
   npm run build
   ```
   Build artifacts will be stored in the `dist/` directory.

5. **Run unit tests**
   ```bash
   npm test
   ```
   Tests are executed via Karma and Chrome headless browser.

---

## Implemented Features

### 1. **Dashboard Page** 
- Display key performance indicators (KPIs):
  - Total emissions (kg CO₂)
  - Monthly average emissions
  - Highest emission source
  - Trend analysis (increasing/decreasing)
- Responsive grid layout (4 cards on desktop, 2 on tablet, 1 on mobile)
- Real-time data updates from state management

### 2. **Add Emission Form**
- Form with fields for:
  - Category selection (Transport, Energy, Food, Waste)
  - Activity description
  - Amount and unit (km, kWh, kg)
  - Date picker
  - Optional notes
- Real-time CO₂ calculation preview
- Form validation with error messages
- Success toast notification on submission
- Responsive 2-column layout (desktop) / 1-column (mobile)

### 3. **Emissions Table** 
- Display all recorded emissions in a sortable table
- Columns: Category, Activity, Amount, Date, CO₂ (kg), Actions
- Features:
  - Sort by date or CO₂ amount (ascending/descending)
  - Filter by category
  - Search by activity name
  - Inline edit functionality with modal
  - Delete emissions with confirmation
  - Responsive table with horizontal scroll on mobile

### 4. **Emissions Chart*
- Monthly trend visualization using Chart.js
- Line chart showing CO₂ emissions over time
- Responsive design with proper SSR compatibility
- Interactive chart with hover tooltips

### 5. **Navigation & Layout** 
- Sticky header with brand logo and navigation links
- Responsive navigation (hamburger menu on mobile)
- Consistent styling across all pages
- Professional color scheme with green theme

### 6. **State Management**
- Centralized state using RxJS BehaviorSubject
- localStorage persistence for data retention
- SSR-compatible with platform detection
- Observable-based reactive architecture

### 7. **Additional Features**
- Toast notification system for user feedback
- Dark/Light theme support via CSS variables
- Professional UI with hover effects and animations
- Accessibility considerations (semantic HTML, ARIA labels)
- Production-ready build with SSR support

---

## Assumptions Made

1. **CO₂ Conversion Factors**: The following conversion factors are used for calculations:
   - Transport: 0.15 kg CO₂ per km
   - Energy: 0.4 kg CO₂ per kWh
   - Food: 2.0 kg CO₂ per kg
   - Waste: 1.5 kg CO₂ per kg
   - These are simplified demo values and can be refined with real-world data

2. **Data Persistence**: The application uses browser localStorage for data persistence. Data is only stored locally and not synced to a backend server.

3. **Mock Data**: The application initializes with sample emissions data for demonstration purposes. This data is loaded on first run if localStorage is empty.

4. **Date Format**: All dates are stored in ISO format (YYYY-MM-DD) and displayed in medium date format (e.g., "Dec 12, 2025").

5. **Browser Compatibility**: The application is optimized for modern browsers (Chrome, Firefox, Safari, Edge) with ES2020+ support.

6. **SSR Compatibility**: The application includes Server-Side Rendering (SSR) support with proper platform detection for browser-only APIs (localStorage, Chart.js).

7. **Responsive Breakpoints**:
   - Mobile: < 640px
   - Tablet: 640px - 1024px
   - Desktop: > 1024px

---

##  Time Spent on Assignment : 10 hours



