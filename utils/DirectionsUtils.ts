import { useEffect, useState, useRef } from 'react';

const useDirections = (map: google.maps.Map | null, origin: any, destination: any) => {
    const directionsService = useRef<google.maps.DirectionsService | null>(null);
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(
        null
    );

    useEffect(() => {
        if (!directionsService.current || !map || !origin || !destination) {
            return;
        }

        directionsService.current.route(
            {
                origin,
                destination,
                travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === 'OK') {
                    setDirections(result);
                } else {
                    console.error('Error fetching directions:', status);
                }
            }
        );
    }, [map, origin, destination]);

    return directions;
};

export default useDirections;
