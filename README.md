# Arthimetic calculator

create a simple web application that allows users to input an arithmetic
expression, sends this expression to a Python backend API for computation, and then displays
the result on the UI.

## Technologies in use

###### Front End : ReactJs.

###### Back End : Django rest Framework.

###### Database : SQLite.

###### Api testing : Django Unit Test.

## Installation:

### GitHub

- Clone the github repo using command git clone <url>

### Frontend

To start frontend change directory to frontend in terminal and run the following commands

### `npm install`

This command is used to install all required node dependencies in the project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Backend

To start backend change director to backend in terminal and run the follwing commands.

- Install all the requirements using pip install -r requirements.txt .
- Run the migrations commands
  - python manage.py makemigrations.
  - python manage.py migrate.
- Run the server using python manage.py runserver
