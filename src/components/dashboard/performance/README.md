# Dashboard Performance Components

This directory contains components used for the Dashboard page performance metrics:

## Components

- `PerformanceStats.tsx` - A card displaying key performance metrics including:
  - Cases Closed (with total)
  - Conversion Rate
  - Average Ticket Size

- `RevenueChart.tsx` - A line chart component that shows revenue trends comparing current year vs previous year, with options to view data monthly or quarterly.

## Implementation Details

- These components integrate with the existing design system using Card components
- They maintain the teal color theme established in the UCP design
- The RevenueChart uses Recharts for data visualization
- All components are responsive and adapt to different screen sizes 