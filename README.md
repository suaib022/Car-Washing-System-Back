# Car-Washing-System-Back

## Introduction

A backend system for managing car washing services, providing APIs for booking, scheduling, and managing car wash operations.

## Project Description

The Car-Washing-System-Back project is designed to streamline the management of car washing services. It offers a robust backend solution with APIs that handle bookings, schedules, and other operational tasks. The goal is to provide an efficient and scalable system that can be integrated with various frontend applications to deliver a seamless user experience.

## Features

- API for booking car wash services.
- Scheduling system for managing appointments.
- User authentication and authorization.
- Integration with payment gateways.
- Admin dashboard for managing services and users.

## Technology Stack

- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for authentication.
- **ESLint**: Linting tool for code quality.
- **Prettier**: Code formatter.

## Installation Guideline

Instructions on how to install, configure, and get the project running locally.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4 or higher)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/suaib022/Car-Washing-System-Back.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Car-Washing-System-Back
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the necessary configuration variables:
   ```bash
   NODE_ENV=development
   DATABASE_URL=your_mongodb_url
   PORT=3000
   BCRYPT_SALT_ROUND=10
   JWT_ACCESS_TOKEN_SECRET=your_jwt_access_token_secret
   JWT_ACCESS_EXPIRES_IN=1h
   AAMARPAY_STORE_ID=your_aamarpay_store_id
   AAMARPAY_SIGNATURE_KEY=your_aamarpay_signature_key
   AAMARPAY_PAYMENT_URL=your_aamarpay_payment_url
   AAMARPAY_PAYMENT_CONFIRMATION_URL=your_aamarpay_payment_confirmation_url
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add necessary configuration variables in the `.env` file.
   Example:
   ```bash
   NODE_ENV=development
   DATABASE_URL=your_mongodb_url
   PORT=3000
   BCRYPT_SALT_ROUND=10
   JWT_ACCESS_TOKEN_SECRET=your_jwt_access_token_secret
   JWT_ACCESS_EXPIRES_IN=1h
   AAMARPAY_STORE_ID=your_aamarpay_store_id
   AAMARPAY_SIGNATURE_KEY=your_aamarpay_signature_key
   AAMARPAY_PAYMENT_URL=your_aamarpay_payment_url
   AAMARPAY_PAYMENT_CONFIRMATION_URL=your_aamarpay_payment_confirmation_url
   ```
3. Ensure MongoDB is running and accessible.

## Usage

To use the project, follow these steps:

1. Ensure the server is running by executing:
   ```bash
   npm run dev
   ```
2. Use a tool like Postman to interact with the APIs.
3. Example API endpoints:
   - `POST /api/bookings`: Create a new booking.
   - `GET /api/bookings`: Retrieve all bookings.
   - `GET /api/bookings/:slotId`: Retrieve a single booking by slot ID.
   - `POST /api/bookings/:slotId`: Pay for a booking.
   - `POST /api/bookings/payment/confirmation`: Confirm a payment.
   - `POST /api/reviews`: Add a new review.
   - `GET /api/reviews`: Retrieve all reviews.
   - `POST /api/services`: Create a new service.
   - `GET /api/services`: Retrieve all services.
   - `GET /api/services/:id`: Retrieve a single service by ID.
   - `PUT /api/services/:id`: Update a service.
   - `PATCH /api/services/:id`: Soft delete a service.
   - `DELETE /api/services/:id`: Permanently delete a service.
   - `POST /api/slots`: Create a new slot.
   - `GET /api/slots`: Retrieve all slots.
   - `GET /api/slots/:slotId`: Retrieve a single slot by slot ID.
   - `PUT /api/slots/:slotId`: Update a slot.
   - `POST /api/auth/signup`: User signup.
   - `POST /api/auth/login`: User login.
   - `PUT /api/auth/updateUser/:userId`: Update user information.
   - `GET /api/auth/users`: Retrieve all users.
   - `GET /api/auth/users/:userEmail`: Retrieve a single user by email.
