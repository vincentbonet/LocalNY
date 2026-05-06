# LocalNY

A web app for tracking every level of New York State politics — from your NYC Council member to your U.S. Senator — all from a single address lookup.

## Features

- **Address lookup** — enter any NY address and instantly see every elected official representing you, grouped by government level (Federal, State, City, County)
- **Interactive district map** — visualize all NY congressional districts colored by incumbent party; click any district to see candidates and race details
- **2026 midterm tracker** — browse upcoming House races across New York with candidate and incumbent info
- **Multi-level coverage** — Federal, Statewide, NY State Legislature, NYC Council, Metro (MTA), and County officials

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **React Router** for client-side routing
- **TanStack Query** for data fetching and caching
- **Leaflet** / **react-leaflet** for interactive maps
- **Axios** for HTTP requests

## APIs Used

| API | Purpose |
|-----|---------|
| [OpenStates API](https://v3.openstates.org) | State legislator lookup by coordinates |
| [Nominatim (OpenStreetMap)](https://nominatim.openstreetmap.org) | Address geocoding |
| [NYC Geoclient API](https://api.nyc.gov) | NYC Council district lookup by address |
| [U.S. Census Bureau Geocoder](https://geocoding.geo.census.gov) | Congressional district lookup by coordinates |
