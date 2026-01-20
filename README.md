# Home Food Delivery App

A complete full-stack application for a home food delivery service with separate admin and user interfaces.

## Project Structure

```
home_food/
├── backend/                 # Express.js API server
├── admin-frontend/          # Admin React app
└── user-frontend/           # User React app
```

## Features

### Admin Panel
- **User Authentication**: Secure login system
- **Item Management**: 
  - Add new food items with images
  - Edit existing items
  - Delete items
  - Toggle stock status (in stock/out of stock)
- **Order Management**:
  - View all orders
  - Update order status
  - Track delivery progress

### User App
- **Browse Items**: 
  - View all available items
  - Filter by category
  - Search items
  - View item details
- **Shopping Cart**: 
  - Add items to cart
  - Adjust quantities
  - Remove items
- **Checkout**:
  - Enter delivery information
  - Add special notes
  - Place order
- **Order Tracking**:
  - Real-time order status updates
  - Delivery timeline visualization

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for database
- **JWT** for authentication
- **Multer** for file uploads
- **Bcryptjs** for password hashing

### Frontend
- **React 18**
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** for styling

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with configuration:
```
MONGODB_URI=mongodb://localhost:27017/home_food
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

4. Create initial admin (optional, as per .env):
```bash
node seed.js  # You can create this to seed initial admin
```

5. Start the server:
```bash
npm start     # Production
npm run dev   # Development with nodemon
```

The server will run on `http://localhost:5000`

### Admin Frontend Setup

1. Navigate to admin-frontend directory:
```bash
cd admin-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123`

### User Frontend Setup

1. Navigate to user-frontend directory:
```bash
cd user-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000` (if admin frontend is not running, otherwise use a different port)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Create admin account

### Items (Public)
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get single item

### Items (Admin Only)
- `POST /api/items` - Add new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `PATCH /api/items/:id/stock` - Toggle stock status

### Orders (Public)
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details

### Orders (Admin Only)
- `GET /api/orders` - Get all orders
- `PATCH /api/orders/:id/status` - Update order status

## Item Schema

Each item contains:
- **name** (string) - Item name
- **description** (string) - Item description
- **category** (enum) - Category: Biryani, Curry, Bread, Rice, Dessert, Drinks, Other
- **price** (number) - Price in currency
- **image** (string) - Image URL
- **inStock** (boolean) - Availability status
- **createdAt** (date) - Creation timestamp
- **updatedAt** (date) - Last update timestamp

## Order Schema

Each order contains:
- **customerName** (string) - Customer's full name
- **customerEmail** (string) - Customer's email
- **customerPhone** (string) - Customer's phone
- **customerAddress** (string) - Delivery address
- **items** (array) - Array of ordered items with quantity
- **totalPrice** (number) - Total order amount
- **status** (enum) - Order status
- **specialNotes** (string) - Special delivery notes
- **createdAt** (date) - Order timestamp
- **updatedAt** (date) - Last status update

## Order Status Flow

1. **Pending** - Order received
2. **Confirmed** - Order confirmed by admin
3. **Preparing** - Food being prepared
4. **Ready** - Ready for delivery
5. **Out for Delivery** - On the way
6. **Delivered** - Successfully delivered
7. **Cancelled** - Order cancelled

## Security Features

- **JWT Authentication**: Secure admin access with JWT tokens
- **Password Hashing**: Bcryptjs for secure password storage
- **Protected Routes**: Admin endpoints require valid token
- **CORS**: Cross-origin requests handled safely
- **Input Validation**: Express-validator for request validation

## Running Everything

Open 3 terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Admin Frontend:**
```bash
cd admin-frontend
npm install
npm start
```

**Terminal 3 - User Frontend:**
```bash
cd user-frontend
npm install
npm start
```

## Database Setup

Make sure MongoDB is running:

**Windows:**
```bash
mongod
```

Or use MongoDB Atlas (cloud) in the connection string.

## Troubleshooting

1. **Port already in use**: Change port in `.env` or kill the process
2. **MongoDB connection fails**: Ensure MongoDB is running
3. **CORS errors**: Check proxy setting in frontend package.json
4. **Image upload fails**: Ensure `/uploads` directory exists in backend

## Future Enhancements

- Payment gateway integration
- Email notifications
- SMS alerts for order status
- Admin dashboard analytics
- User reviews and ratings
- Promotional codes and discounts
- Multiple language support
- Mobile app version

## License

This project is open-source and available under the MIT License.
