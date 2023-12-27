# Map.tsx

## Overview

The `Map.tsx` file contains a React component responsible for rendering and interacting with the Google Map in the application. It utilizes the Google Maps API and a custom context for managing map-related state.

## Components

### `Map`

- **Overview:** The `Map` component renders the Google Map using the `GoogleMap` component from the `@react-google-maps/api` library. It handles map-related events, such as clicks, and updates the map state through the map context.

- **Properties:**
  - `center`: Current center coordinates of the map.
  - `destination`: Coordinates of the destination on the map.
  - `setDestination`: Setter function for updating the destination coordinates.
  - `setDestinationName`: Setter function for updating the destination name.

- **Hooks:**
  - `useMapContext`: Custom hook for accessing map-related context values.
  - `useCustomPlacesAutocomplete`: Custom hook for handling custom places autocomplete functionality.

- **Map Interaction:**
  - Clicking on the map triggers the `handleMapClick` function, which updates the destination coordinates and name based on the clicked location.
  - The map is initialized with specified options, such as a custom map style.

- **Markers:**
  - A marker is displayed on the map at the destination coordinates if a destination is set.

- **Notes:**
  - The map is wrapped in a `div` with a specified container style.
  - The map uses a dark mode map style defined in `GoogleMapIds['darkMode']`.
  - The map supports custom places autocomplete, and suggestions are managed through the `useCustomPlacesAutocomplete` hook.

### Hooks

#### `useCustomPlacesAutocomplete`

- **Overview:** A custom hook for handling places autocomplete functionality. It provides values and functions necessary for implementing a custom autocomplete feature.

- **Properties:**
  - `ready`: Boolean indicating whether the autocomplete service is ready.
  - `value`: Current input value.
  - `setValue`: Setter function for updating the input value.
  - `suggestions`: Object containing autocomplete suggestions.
    - `status`: Status of the suggestions (e.g., 'OK').
    - `data`: Array of suggestion data.

  - `clearSuggestions`: Function for clearing autocomplete suggestions.

## Styles

- **Overview:** The component uses a separate CSS module (`Map.module.css`) for styling. Styling details are encapsulated within this module.

- **Note:** The styling details are not covered in this documentation, and you may refer to the `Map.module.css` file for specific styling information.
