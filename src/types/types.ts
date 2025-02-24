// src/types/types.ts
export interface CarType {
  model: string;
  fuelConsumption: number; // L/100km
}

export interface UserSettings {
  car: CarType;
  homeAddress: string;
  favoriteAddresses: string[];
  fuelPrice: number;
  darkMode: boolean;
}

export interface RouteInfoType {
  distance: number;
  duration: string;
  fuelCost: number;
  route: google.maps.DirectionsResult;
}
