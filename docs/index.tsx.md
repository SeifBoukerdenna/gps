# index.tsx

## Overview

The `index.tsx` file represents the main page of the Next.js application. It integrates various components to create the home page, including the map, dynamic form renderer, loading spinner, and search bar components.

## Components

### `Home`

- **Overview:** The `Home` function component is the main page component. It incorporates different components based on the application's requirements.

- **Dependencies:**
  - `useLoadScript`: Hook from `@react-google-maps/api` for loading Google Maps.
  - `MapProvider`: Context provider for managing map-related state.
  - `LoadingSpinner`: Component for displaying a loading spinner.
  - `DynamicFormRenderer`: Component for rendering dynamic forms (commented out).
  - `Map`: Component for displaying the map (commented out).
  - `SearchBarDeparture`: Component for the departure search bar (commented out).
  - `Parent`: Testing component (commented out).

- **Usage:**
  - Loads the Google Maps script.
  - Renders loading spinner while the script is loading.
  - Wraps the application in the `MapProvider`.
  - Conditionally includes or excludes various components.

- **Notes:**
  - Adjust the components included based on the desired layout and functionality.
  - Google Maps API key is obtained from the environment variable.
  - Components are commented out based on specific requirements or testing purposes.

