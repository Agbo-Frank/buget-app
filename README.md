# Personal Budget Management System

Welcome to the Personal Budget Management System! This application allows users to manage their income and expenses efficiently. With a user-friendly interface and robust backend, it's designed to make budgeting simple and effective.

## Prerequisites

To run this project, you must have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

## Project Structure

The project is divided into two main folders:
- `backend`: Contains the backend APIs.
- `frontend`: Contains the user interface.

## Backend

This folder contains all the backend code and APIs for the project.

### Setup

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Run database migrations:
   ```sh
   npm run migrate
   ```
3. Seed the database with initial data:
   ```sh
   npm run seed
   ```
4. Start the server:
   ```sh
   npm start
   ```
### Seed Data
The seed data includes:
- A default admin user with the following credentials:
  - Email: `admin@gmail.com`
  - Password: `123456`
- Other seeded users also have the password: `123456`. some might require activation from the admin

## Frontend

This folder contains the user interface code for the project.
### Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Start the frontend application:
   ```sh
   npm start
   ```
### Deployment
You can access the deployed project [here](https://buget-app.vercel.app/login).
