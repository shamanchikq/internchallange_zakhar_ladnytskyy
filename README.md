# Employee Management API

A simple RESTful API to manage employee data using Node.js and Express. This application reads data from a CSV file, loads it into memory, and provides CRUD operations through a RESTful API.

## Table of Contents
1. [Setup Instructions](#setup-instructions)
2. [API Endpoints](#api-endpoints)
3. [Data Validation](#data-validation)
4. [Running Tests](#running-tests)
5. [Additional Features](#additional-features)
6. [Development Dependencies](#development-dependencies)

## Setup Instructions

Follow these steps to set up and run the project:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shamanchikq/internchallange_zakhar_ladnytskyy.git
   cd internchallange_zakhar_ladnytskyy
   ```

2. **Install Dependencies**:
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

3. **Start the Server**:
   To start the server, run:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`.

4. **Run the Application**:
   Use tools like Postman to interact with the API.

## API Endpoints

The following endpoints are available for managing employee data:

- **GET /employees**: Retrieve a list of all employees.
  - Example request: `GET http://localhost:5000/employees`
  
- **GET /employees/:id**: Retrieve details of a specific employee by their ID.
  - Example request: `GET http://localhost:5000/employees/1`
  
- **POST /employees**: Add a new employee.
  - Example request: 
    ```json
    POST http://localhost:5000/employees
    {
      "id": "4",
      "name": "Alice Brown",
      "email": "alice.brown@example.com",
      "position": "Designer",
      "salary": 65000
    }
    ```

- **PUT /employees/:id**: Update an existing employee by ID.
  - Example request: 
    ```json
    PUT http://localhost:5000/employees/4
    {
      "id": "4",
      "name": "Alice Brown",
      "email": "alice.brown@company.com",
      "position": "Lead Designer",
      "salary": 70000
    }
    ```

- **DELETE /employees/:id**: Delete an employee by their ID.
  - Example request: `DELETE http://localhost:5000/employees/4`

## Data Validation

The API performs the following data validation before processing requests:

- `name`: Must not be empty.
- `email`: Must be in a valid email format.
- `position`: Must not be empty.
- `salary`: Must be a positive number.

If validation fails, the API will return a `400 Bad Request` status with an appropriate error message.

## Running Tests

The project includes unit tests for the validation middleware using Jest and Supertest. To run the tests, execute:

```bash
npm test
```

## Development Dependencies

The following commands were used to set up development dependencies:

1. **Install Jest**:
   ```bash
   npm install --save-dev jest
   ```
   Jest is a JavaScript testing framework used for writing and running tests.

2. **Install Jest and Supertest**:
   ```bash
   npm install jest supertest --save-dev
   ```
   Supertest is used for testing HTTP endpoints. This command installs both Jest and Supertest as development dependencies.

3. **Install Babel for Jest Support**:
   ```bash
   npm install --save-dev @babel/preset-env @babel/preset-modules babel-jest
   ```

## Additional Features
- **In-memory data management**: Data is stored in memory and is loaded from `data.csv` when the server starts.
- **Unit tests**: Jest and Supertest are used to test validation and API endpoints.
- **Environment-based configuration**: The server listens on a port only if `NODE_ENV` is not set to `test`.
