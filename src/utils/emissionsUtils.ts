// src/utils/emissionsUtils.ts

// Average CO2 emissions per fuel type in kg/liter
export const EMISSIONS_PER_LITER = {
  gasoline: 2.31, // kg CO2 per liter
  diesel: 2.68, // kg CO2 per liter
  hybrid: 1.7, // kg CO2 per liter (approximate for hybrid vehicles)
  electric: 0, // Zero direct emissions
};

export type FuelType = keyof typeof EMISSIONS_PER_LITER;

/**
 * Calculate CO2 emissions for a given distance, fuel consumption, and fuel type
 * @param distanceInMeters - Distance in meters
 * @param fuelConsumption - Fuel consumption in L/100km
 * @param fuelType - Type of fuel (gasoline, diesel, hybrid, electric)
 * @returns CO2 emissions in kilograms
 */
export const calculateCO2Emissions = (
  distanceInMeters: number,
  fuelConsumption: number,
  fuelType: FuelType
): number => {
  // Convert distance to kilometers
  const distanceInKm = distanceInMeters / 1000;

  // Calculate fuel used in liters
  const fuelUsed = (distanceInKm * fuelConsumption) / 100;

  // Calculate CO2 emissions in kg
  const co2Emissions = fuelUsed * EMISSIONS_PER_LITER[fuelType];

  return parseFloat(co2Emissions.toFixed(2));
};

/**
 * Calculate tree equivalent for CO2 emissions
 * An average tree absorbs about 22kg of CO2 per year
 * @param co2Emissions - CO2 emissions in kilograms
 * @returns Number of trees needed to absorb the emissions in one year
 */
export const calculateTreeEquivalent = (co2Emissions: number): number => {
  const treesPerYear = co2Emissions / 22;
  return parseFloat(treesPerYear.toFixed(1));
};

/**
 * Get environmental impact rating based on CO2 emissions
 * @param co2Emissions - CO2 emissions in kilograms
 * @returns A rating from A+ to F
 */
export const getEnvironmentalImpactRating = (co2Emissions: number): string => {
  if (co2Emissions === 0) return "A+";
  if (co2Emissions < 2) return "A";
  if (co2Emissions < 5) return "B";
  if (co2Emissions < 10) return "C";
  if (co2Emissions < 15) return "D";
  if (co2Emissions < 25) return "E";
  return "F";
};

/**
 * Get color for environmental impact rating
 * @param rating - Environmental impact rating
 * @returns Color code for the rating
 */
export const getRatingColor = (rating: string): string => {
  switch (rating) {
    case "A+":
      return "#1eb53a"; // Bright green
    case "A":
      return "#4caf50"; // Green
    case "B":
      return "#8bc34a"; // Light green
    case "C":
      return "#ffeb3b"; // Yellow
    case "D":
      return "#ff9800"; // Orange
    case "E":
      return "#ff5722"; // Dark orange
    case "F":
      return "#f44336"; // Red
    default:
      return "#4caf50";
  }
};
