import axios from 'axios';



const convertCoordinatesToAddress = async (coords: google.maps.LatLngLiteral | null): Promise<string> => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyDsPIUYokmkqE_gJRfHzsYDcyM3ib679bw`
    );

    const formattedAddress = response.data.results[0]?.formatted_address || 'Address not found';
    console.log(formattedAddress);
    return formattedAddress;
  } catch (error) {
    console.error('Error fetching place details:', error);
    throw error;
  }
};

export default convertCoordinatesToAddress;
