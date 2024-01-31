// CreateRoute.ts


export interface RouteInfo {
  duration: string;
  distance: string;
  steps: string[];
}

export const calculateRoutes = async (
  origin: google.maps.LatLngLiteral,
  destination: google.maps.LatLngLiteral,
  mode: google.maps.TravelMode
): Promise<{ routesInfo: RouteInfo[]; result: google.maps.DirectionsResult[] } | null> => {
  return new Promise((resolve) => {
    try {
      const directionsService = new google.maps.DirectionsService();

      const request: google.maps.DirectionsRequest = {
        origin,
        destination,
        travelMode: mode,
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.METRIC,
      };


      directionsService.route(request, (result, status) => {
        if (status === 'OK' && result) {
          const routesInfo: RouteInfo[] = result.routes.map((route) => ({
            duration: route.legs[0].duration?.text || '',
            distance: route.legs[0].distance?.text || '',
            steps: route.legs[0].steps.map((step) => step.instructions || ''),
          }));

          // Ensure result is an array
          const resultArray: google.maps.DirectionsResult[] = Array.isArray(result)
            ? result
            : [result];


          resolve({ routesInfo, result: resultArray });
        } else {
          console.error(`Error fetching directions: ${status}`);
          resolve(null);
        }
      });
    } catch (error) {
      console.error('Error calculating routes:', error);
      resolve(null);
    }
  });
};
