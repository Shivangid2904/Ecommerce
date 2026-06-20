# Ecommerce Backend REST API

This is a complete backend-only E-commerce REST API built with Node.js, Express.js, MongoDB, and Mongoose.

## Tech Stack
- Node.js & Express.js for the server
- MongoDB & Mongoose for the database and object modeling
- bcryptjs for password hashing
- dotenv for environment variables
- nodemon for development server reloads

## Installation

1. Open the backend folder:
   ```bash
   cd Ecommerce-Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory with:
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/ecommerce_db
NODE_ENV=development
```

## Run Locally

Start the server in development mode:
```bash
npm run dev
```

Start in production mode:
```bash
npm start
```

By default the API will be available at `http://localhost:5001`.

## Project Structure

```
Ecommerce-Backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validateRequest.js
│   ├── models/
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── orderRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## API Endpoints

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Products
- `POST /api/products` - Create a product
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Orders
- `POST /api/orders` - Create an order
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update an order
- `DELETE /api/orders/:id` - Delete an order

## Sample Requests

### Create User

Request:
```json
POST /api/users
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

Response:
```json
HTTP/1.1 201 Created
{
  "id": "651d0d1f23fa2b1a0b345678",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "createdAt": "2026-06-19T08:45:12.000Z"
}
```

### Create Product

Request:
```json
POST /api/products
{
  "name": "Basic T-Shirt",
  "description": "Comfortable cotton tee",
  "price": 19.99,
  "stock": 100,
  "category": "Apparel"
}
```

Response:
```json
HTTP/1.1 201 Created
{
  "_id": "651d0d1f23fa2b1a0b345679",
  "name": "Basic T-Shirt",
  "description": "Comfortable cotton tee",
  "price": 19.99,
  "stock": 100,
  "category": "Apparel",
  "createdAt": "2026-06-19T08:45:12.000Z"
}
```

### Create Order

Request:
```json
POST /api/orders
{
  "userId": "651d0d1f23fa2b1a0b345678",
  "products": [
    {
      "productId": "651d0d1f23fa2b1a0b345679",
      "quantity": 2
    }
  ],
  "totalAmount": 39.98,
  "status": "Pending"
}
```

Response:
```json
HTTP/1.1 201 Created
{
  "_id": "651d0d1f23fa2b1a0b345680",
  "userId": "651d0d1f23fa2b1a0b345678",
  "products": [
    {
      "productId": "651d0d1f23fa2b1a0b345679",
      "quantity": 2
    }
  ],
  "totalAmount": 39.98,
  "status": "Pending",
  "createdAt": "2026-06-19T08:45:12.000Z"
}
```

## Postman Collection

A Postman collection file has been added to the project as `Ecommerce-Backend.postman_collection.json`.
