"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
function fetchData(endpoint, options) {
    console.log(process.env.NEXT_CAR_API_KEY);
    return fetch(endpoint, options)
        .then(function (response) {
        if (!response.ok) {
            throw new Error("HTTP error! Status: ".concat(response.status));
        }
        return response.json();
    })
        .catch(function (error) {
        console.error('Error:', error);
        throw error;
    });
}
// Example usage:
var model = 'camry';
var apiKey = process.env.NEXT_CAR_API_KEY || '';
var endpoint = "https://api.api-ninjas.com/v1/cars?model=".concat(model);
var options = {
    method: 'GET',
    headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
    },
};
fetchData(endpoint, options)
    .then(function (result) {
    console.log(result);
});
