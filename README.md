
# GPS React App with Google Maps Integration

## Introduction

This repository contains a GPS application built with React and integrated with Google Maps. The app allows users to search for schools, visualize their location on the map, and calculate distances from randomly generated houses.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

### Installation

1. Clone the repository:

``` bash
git clone https://github.com/elmelz6472/gps.git
```

2. Navigate to the project directory:

``` bash
cd gps
```

3. Install dependencies:

``` bash
npm install
```

### Running the App

Run the development server:

``` bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000/) to view the app.

## Screenshots

<!-- Add screenshots here -->

Base page

![Landing page](pictures/base-min.png)

Clusters with markers and Locations

![App page](pictures/app-min.png)

Directions (only drive)

![Direction](pictures/drive-min.png)

## Project Structure

- Most files are for typescript/next/configs, actual source code is located in the components directory and pages directory

- `components/distance.tsx`: Displays distance information.

- `components/map.tsx`: Main map component.

- `components/places.tsx`: Handles school search functionality.

- `googleMapIds.json`: Lists of different google map ids for hot reloading.

## Environment variables

- Create a .env.local file at the root base of the project and assign your api key to `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="XXXXXXXXXXXXXXXXXX"`

- Optionally use your own map for styling through `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID="XXXXXXX`

## TODOs

- Implement multiple modes of transit.

- Better maps.

- Lots more features.

- Improve UI/UX.

- Add tests for components.

- Enhance error handling.

- Optimize code for production.
