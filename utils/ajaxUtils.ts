import * as dotenv from 'dotenv';
dotenv.config();

export interface AjaxOptions {
  method: string;
  headers?: { [key: string]: string };
  body?: string;
}

export function fetchData<T>(endpoint: string, options: AjaxOptions): Promise<T> {
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
