# DynamicFormRenderer

## Overview

The `DynamicFormRenderer` component acts as a conditional renderer, determining which form (either `SearchForm` or `DirectionPanel`) to display based on the current state of the application.

## Functionality

- **Context Dependency:**
  - Utilizes the `useMapContext` hook to access the application state, particularly the `destination` property.
- **Conditional Rendering:**
  - Determines whether to render the `DirectionPanel` or the `SearchForm` based on the presence or absence of a destination.
- **Dynamic Form Switching:**
  - Switches between the two forms dynamically as the user interacts with the application.

## Use Case

- **Initial State:**
  - Renders the `SearchForm` when there is no specific destination set.
- **Destination Set:**
  - Renders the `DirectionPanel` once a destination (marker) has been set on the map.

## Relationship with Other Components

- Acts as a bridge between the `SearchForm` and `DirectionPanel` components.
- Is typically used in the main application layout to ensure that the appropriate form is displayed based on the current state.

### Note:

- The `DynamicFormRenderer` allows for a seamless transition between searching for a location and interacting with directions, providing a fluid user experience.
- The exact implementation details may vary based on the specific requirements and structure of the application.
