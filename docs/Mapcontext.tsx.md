# MapContext.tsx

## Overview

The `MapContext.tsx` file defines a React context for managing map-related state throughout the application. It includes a provider and a hook for accessing the context values.

## Components

### `MapContext`

- **Overview:** The `MapContext` is a React context that holds various state values related to the map, such as the center, destination, initial search, and departure address.

- **Properties:**
  - `center`: Current center coordinates of the map.
  - `setCenter`: Setter function for updating the center coordinates.
  - `destination`: Coordinates of the destination on the map.
  - `setDestination`: Setter function for updating the destination coordinates.
  - `destinationName`: Name of the destination.
  - `setDestinationName`: Setter function for updating the destination name.
  - `initialSearch`: Boolean indicating whether an initial search has been performed.
  - `setInitialSearch`: Setter function for updating the initial search status.
  - `departureAddressName`: Name of the departure address.
  - `setDepartureAddressName`: Setter function for updating the departure address name.
  - `departureAddress`: Coordinates of the departure address on the map.
  - `setDepartureAddress`: Setter function for updating the departure address coordinates.

### `useMapContext`

- **Overview:** The `useMapContext` hook is a custom hook for consuming the values from the `MapContext` context.

- **Usage:** Call this hook in functional components to access the map-related state.

### `MapProvider`

- **Overview:** The `MapProvider` component is a provider that wraps the application with the `MapContext` context. It initializes default values and handles saving and retrieving the user's location in local storage.

- **Properties:**
  - `children`: React children to be wrapped by the provider.

- **Notes:**
  - The default location is set to a latitude of -34.397 and a longitude of 150.644.
  - User location is saved and retrieved from local storage.
