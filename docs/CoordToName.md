# CoordToName

## Overview

The `CoordToName.ts` file contains a function for converting geographical coordinates (latitude and longitude) into a human-readable address using the Google Maps Geocoding API. This functionality is encapsulated in the `convertCoordinatesToAddress` function.

## Function

### `convertCoordinatesToAddress`

This function takes a `google.maps.LatLngLiteral` object representing the coordinates and returns a `Promise<string>` representing the formatted address. It utilizes the Google Maps Geocoding API to perform a reverse geocoding lookup.

#### Parameters

- `coords`: A `google.maps.LatLngLiteral` object containing latitude and longitude.

#### Returns

- A `Promise<string>` representing the formatted address corresponding to the provided coordinates.

#### Example

```typescript
import convertCoordinatesToAddress from './CoordToName';

const coordinates = { lat: 40.7128, lng: -74.0060 };
const address = await convertCoordinatesToAddress(coordinates);
console.log(address); // Output: 'New York, NY, USA'
