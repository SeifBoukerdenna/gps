type TransportationMode = 'driving' | 'transit' | 'walking';

interface RouteInfo {
  duration: string;
  distance: string;
  steps: string[];
}

export const calculateRoutes = async (
  origin: google.maps.LatLngLiteral,
  destination: google.maps.LatLngLiteral,
  mode: google.maps.TravelMode
): Promise<RouteInfo[] | null> => {
  const directionsService = new google.maps.DirectionsService();

  const request: google.maps.DirectionsRequest = {
    origin,
    destination,
    travelMode: mode as google.maps.TravelMode,
    provideRouteAlternatives: true,
  };


  return new Promise((resolve, reject) => {
    directionsService.route(request, (result, status) => {
      if (status === 'OK' && result) {
        const routesInfo: RouteInfo[] = result.routes.map((route) => {
          return {
            duration: route.legs[0].duration?.text || '',
            distance: route.legs[0].distance?.text || '',
            steps: route.legs[0].steps.map((step) => step.instructions || ''),
          };
        });

        console.log('Routes Information:', routesInfo);
        resolve(routesInfo);
      } else {
        console.error(`Error fetching directions: ${status}`);
        resolve(null);
      }
    });
  });
};
