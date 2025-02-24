// src/types/types.ts
import { FuelType } from "../utils/emissionsUtils";

export interface CarType {
  model: string;
  fuelConsumption: number; // L/100km
  fuelType: FuelType;
}

export interface UserSettings {
  car: CarType;
  homeAddress: string;
  favoriteAddresses: string[];
  fuelPrice: number;
  darkMode: boolean;
  showEmissions: boolean; // Whether to show emissions data
}

export interface RouteInfoType {
  distance: number;
  duration: string;
  fuelCost: number;
  co2Emissions: number; // kg of CO2
  emissionRating: string; // A+ to F rating
  treeEquivalent: number; // Number of trees to offset
  route: google.maps.DirectionsResult;
}
