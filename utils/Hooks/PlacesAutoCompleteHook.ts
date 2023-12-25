import  usePlacesAutocomplete  from 'use-places-autocomplete';

export const useCustomPlacesAutocomplete = () => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    // requestOptions: {
    //   // types: ['address', 'establishment', 'geocode'],
    //   // componentRestrictions: {
    //   //   country: 'ca',
    //   // },
    // },
  });

  return {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  };
};
