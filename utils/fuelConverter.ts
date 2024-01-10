// fuelConverter.ts

interface FuelEfficiency {
    mpg: number;
    lPer100km: number;
  }

  // Convert MPG to L/100km
  export const mpgToLPer100km = (mpg: number): number => {
    if (mpg <= 0) {
      throw new Error('MPG must be greater than zero.');
    }
    const litersPerGallon = 4.54609; // UK gallon to liter conversion factor
    const kilometersPerMile = 1.60934;
    return 100 / (mpg * kilometersPerMile / litersPerGallon);
  };

  // Convert L/100km to MPG
  export const lPer100kmToMpg = (lPer100km: number): number => {
    if (lPer100km <= 0) {
      throw new Error('Liters per 100 km must be greater than zero.');
    }
    const litersPerGallon = 3.78541;
    const kilometersPerMile = 1.60934;
    return 100 / (lPer100km / (litersPerGallon * kilometersPerMile));
  };

