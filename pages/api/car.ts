import * as dotenv from 'dotenv';
dotenv.config();


interface AjaxOptions {
    method: string;
    headers?: { [key: string]: string };
    body?: string;
  }

  function fetchData<T>(endpoint: string, options: AjaxOptions): Promise<T> {
    console.log(process.env.NEXT_CAR_API_KEY as string)
    return fetch(endpoint, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json() as Promise<T>;
      })
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }

  // Example usage:
  const model = 'camry';
  const apiKey = process.env.NEXT_CAR_API_KEY || '';


  const endpoint = `https://api.api-ninjas.com/v1/cars?model=${model}`;
  const options: AjaxOptions = {
    method: 'GET',
    headers: {
      'X-Api-Key': apiKey,
      'Content-Type': 'application/json',
    },
  };

  fetchData<any>(endpoint, options)
    .then(result => {
      console.log(result);
    });
