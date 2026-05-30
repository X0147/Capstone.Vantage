# Capstone.Vantage

Welcome to the **Capstone.Vantage** flight booking and telemetry matrix platform. This premium front-end application offers a seamless and highly aesthetic experience for finding and tracking flights in raw real-time.

## New Routes & Features

- **/** (Search Page): The core landing matrix with hero headers, promotional destinations, cryptographic features grid, and full modular footer.
- **/search-results**: Advanced flight filtering algorithms and price analysis.
- **/trips**: Track upcoming and historic itineraries.
- **/profile/edit**: Manage user identifier details and secure node preferences.
- **/tickets**: Vault for smart cryptographic boarding passes.
- **/manage-booking**: PNR retrieval and passenger details management.
- **/tracker**: ADS-B real-time satellite radar visualization.
- **/dashboard**: Frequent flyer miles and centralized user metrics.
- **/track**: Secure ticket tracking module using PNR, Last Name, and Email validation with mock backend integration (`trackService`).

## Component Architecture

Key UI components have been abstracted for modularity and high reusability:

- **HeroHeader** & **PromoCard**: For the premium search funnel.
- **LoyaltyBanner**: Showcasing Vantage Gold Privileges.
- **TechFeaturesGrid**: Highlighting platform capabilities (Vault, Airspace Radar, Smart Tickets).
- **StructuredFooter**: Comprehensive site-wide modern footer.
- **AccessibleButton**: Ensuring standard WCAG AA compliance across interactive elements.

## Styling & Design System

The platform leverages a robust dark-mode CSS variables framework defined in `src/index.css`.

- **Technologies:** React, TailwindCSS, Framer Motion, Lucide-React.
- **Color Palette:** Deep HSL gradients and glassmorphic translucent panels (using `.premium-glass`).

## GitHub Actions CI/CD Pipeline

The `.github/workflows/ci.yml` file dictates the end-to-end integration:

1. **Linting** to ensure code quality.
2. **Testing** with Vitest for integration functionality matrices.
3. **Building** using Vite.
4. **Deploying** directly to GitHub Pages using modern Actions capabilities (bypassing legacy gh-pages branch mutations).

## Local Development

Run the following commands to initialize the node environment:

```bash
npm install
npm run dev
```

To run tests:

```bash
npm run test
```

To build locally:

```bash
npm run build
```
