# DirectionPanel

## Overview

The `DirectionPanel` component serves as a user interface panel for handling directions and search functionality within a map-based application. It allows users to enter departure and destination addresses, swap them, set a course, and locate their current position. Additionally, it provides the ability to dismiss and expand the panel.

## Features

- **Search Inputs:**
  - Two input fields for entering departure and destination addresses.
  - Autocomplete suggestions provided during address input (Not destination yet).

- **Actions:**
  - Swap Button: Swaps the departure and destination addresses (Not yet Implemanted).
  - Set Course Button: Initiates the process of setting a course or direction.
  - Get Location Button: Retrieves and sets the user's current geolocation as the departure address.

- **Dismiss and Expand:**
  - Dismiss Button: Temporarily hides the panel.
  - Expand Button: Expands the panel if dismissed.

## Styles

- **`panel`:**
  - Main styling for the direction panel.
- **`dismissed`:**
  - Additional styling when the panel is dismissed.
- **`button`:**
  - Shared styling for buttons within the panel.
- **`dismissButton`:**
  - Styling specific to the dismiss button.
- **`expandButton`:**
  - Styling specific to the expand button.
- **`swapButton`:**
  - Styling specific to the swap button.
- **`setCourseButton`:**
  - Styling specific to the set course button.
- **`getUserLocation`:**
  - Styling specific to the get user location button.
- **`searchFormContainer`:**
  - Styling for the container that holds the search input and suggestions.

## Functionality

- **Autocomplete Suggestions:**
  - Suggestions are provided for both departure and destination addresses.
  - Suggestions are cleared when an address is selected.

- **Geolocation:**
  - The "Get Location" button retrieves the user's current geolocation and sets it as the departure address.

- **Swapping Addresses:**
  - The "Swap" button swaps the departure and destination addresses (Not yet Implemanted).

- **Dismissing and Expanding:**
  - The panel can be temporarily dismissed to provide more map visibility.
  - The dismissed panel can be expanded back into view.

## Integration

- Import the `DirectionPanel` component into your application.
- Integrate it within your map-based UI for handling directions and user inputs.

### Note:

- The `useCustomPlacesAutocomplete` hook is utilized to handle autocomplete suggestions.
- The `react-draggable` library is used to enable draggable behavior for the panel.
- The `@reach/combobox` components are employed for accessible autocomplete suggestions.
- Feel free to customize the styles based on your application's design requirements.
