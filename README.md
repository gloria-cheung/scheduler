# Interview Scheduler

Interview Scheduler is a simple, SPA that allows users to book an interview with LHL mentors that are available for the day.

## Final Product

### Demo Video

!["demo video"](./docs/scheduler.gif)

### Create New Appointment

!["create new appointment"](./docs/create_appointment.png)

### Monday fully booked

!["monday full"](./docs/no_spots_left.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Test Framework

```sh
npm run cypress
```

## API server/\*Database Setup

For full functionality both must run concurrently: the client and the API server applications.

- Start by forking and cloning the scheduler-api server [here](https://github.com/lighthouse-labs/scheduler-api)
- Follow the steps outlined in README to install and setup the database
- Navigate to the root directory and install dependencies with `npm install`
- Once you have the database setup and the scheduler-api server running, run the following command from the root directory of the project `npm start`

## Project Stack

- Front-End: React, Axios, JSX, HTML, SASS, JavaScript

- Back-End: Express, Node.js, PostgreSQL

- Testing: Storybook, Webpack Dev Server, Jest, Testing Library and Cypress

## Dependencies

- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
