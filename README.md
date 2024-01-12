# Express-Prisma-Postgres-Boilerplate

## Overview

A boilerplate for building a backend project using Express, Prisma, and PostgreSQL. This boilerplate includes user registration and login functionality, along with essential middleware for handling HTTP exceptions, authorization, and schema validation.

## Features

- **User Registration:** Endpoint for user registration with name, gender, country, dateofbirth email and password.
- **User Login:** Endpoint for user login with email and password.
- **HTTP Exception Handling:** Middleware for handling HTTP exceptions and providing consistent error responses.
- **Authorization Middleware:** Middleware for user authentication and authorization.
- **Schema Validation Middleware:** Middleware for validating request payloads against predefined schemas.

## Technologies Used

- **Node.js:** Server-side JavaScript runtime.
- **Express.js:** Web application framework for Node.js.
- **Prisma:** Database toolkit for interfacing with the database.
- **[Database System]:**  PostgreSQL for data storage.
- **[Authentication Library]:** jsonwebtoken for user authentication.
- **[Other Libraries/Tools]:**  zod , bcrypt,dotenv etc...

## Prerequisites

 Make sure you have the following installed on your system:

 - Node.js (v14.17.4 or later)
 - PostgreSQL (v13.3 or later)


## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone [repository_url]

2. **Install Dependencies:**

   ```javascript
   cd boilerplate
   npm install
    ```
3. **Set up the database:**
   - Create a PostgreSQL database.
   - Update the database connection details in the .env file.

4. **Run migrations:**
     ``` npx prisma migrate dev```

5. **Start the Server:**
  ``` bash npm start```
   

 # Usage

 ## User Registration
  Endpoint: `POST /api/auth/register` 
  
  Request Body :    
  ```bash 
  {
  "email": "user@example.com",
   "name": "User",
   "gender": "female",
  "country": "Nepal",
  "dateofbirth":"2012-2-12",
  "password": "password123"
 }
   ```

## User Login
  Endpoint: `POST /api/auth/login` 

  
  Request Body :  
  ```bash
 {
  "email": "user@example.com",
  "password": "password123"
 }
```


