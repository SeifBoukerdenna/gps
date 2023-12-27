# SearchForm

## Overview

The `SearchForm` component provides a search input field with autocomplete suggestions for users to enter destination addresses. It is designed to be used in a map-based application where users can search for and select their destination.

## Features

- **Search Input:**
  - Single input field for entering destination addresses.
  - Autocomplete suggestions provided during address input.

- **Autocomplete Suggestions:**
  - Suggestions are displayed in a popover below the input field.
  - Suggestions are cleared when an address is selected.

- **Geocoding:**
  - Utilizes the `use-places-autocomplete` library for geocoding functionality.
  - Converts selected addresses to geographical coordinates (latitude and longitude).

- **Draggable Behavior:**
  - Incorporated `react-draggable` for draggable behavior, allowing the form to be moved within the UI.

- **Integration with Map Context:**
  - Integrates with the map context to update the center and destination based on user input.


## Functionality

- **Autocomplete Suggestions:**
  - Suggestions are provided as users type in the destination input field.
  - Suggestions are selected by clicking or using keyboard navigation.

- **Geocoding:**
  - Selected addresses trigger geocoding to obtain geographical coordinates.

- **Updating Map Context:**
  - Updates the map context with the selected destination and its coordinates.

- **Draggable Behavior:**
  - Allows users to drag the search form within the UI.

## Integration

- Import the `SearchForm` component into your application.
- Integrate it within your map-based UI to enable destination search functionality.

### Note:

- The `useCustomPlacesAutocomplete` hook is utilized to handle autocomplete suggestions.
- The `react-draggable` library is used to enable draggable behavior for the search form.
- The `@reach/combobox` components are employed for accessible autocomplete suggestions.
- Customize the styles based on your application's design requirements.
