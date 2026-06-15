# Ecommerce Backend REST API

This is a complete backend-only E-commerce REST API built with Node.js, Express.js, MongoDB, and Mongoose.

## Tech Stack
- **Node.js** & **Express.js** for the server framework.
- **MongoDB** & **Mongoose** for the database and object modeling.
- **bcryptjs** for password hashing.
- **jsonwebtoken** for authentication.
- **dotenv** for environment variables.

## Installation

1. Clone the repository and navigate into the folder:
   ```bash
   cd Ecommerce-Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:
```
PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
```
*Note: Make sure your MongoDB service is running or use a MongoDB Atlas URI.*

## How to Run Locally

Start the server in development mode using nodemon:
```bash
npm run dev
```

Or start it in production mode:
```bash
npm start
```
The server will run on `http://localhost:5000`.

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user and get token

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create a product (Protected)
- `PUT /api/products/:id` - Update a product (Protected)
- `DELETE /api/products/:id` - Delete a product (Protected)
