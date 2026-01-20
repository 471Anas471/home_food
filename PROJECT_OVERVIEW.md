# Home Food Delivery App - Complete Overview

## Project Summary

A complete full-stack home food delivery application with:
- ✅ Admin panel for managing food items and orders
- ✅ User-facing app for browsing, ordering, and tracking
- ✅ Secure authentication system
- ✅ Real-time order tracking
- ✅ Image upload for food items

---

## 📁 Project Structure

### Backend (`/backend`)
```
backend/
├── models/
│   ├── Item.js          # Food item schema
│   ├── Order.js         # Order schema
│   └── Admin.js         # Admin user schema
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── items.js         # Item management endpoints
│   └── orders.js        # Order management endpoints
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── server.js            # Express app initialization
├── seed.js              # Initial data seeding
├── package.json         # Dependencies
└── .env                 # Environment variables
```

### Admin Frontend (`/admin-frontend`)
```
admin-frontend/
├── src/
│   ├── components/
│   │   ├── Login.js               # Admin login page
│   │   ├── Dashboard.js           # Admin dashboard
│   │   ├── ItemsManagement.js     # Add/edit/delete items
│   │   ├── OrdersManagement.js    # View and manage orders
│   │   ├── Navbar.js              # Navigation bar
│   │   └── ProtectedRoute.js      # Route protection
│   ├── api.js                     # API client
│   ├── App.js                     # Main app component
│   ├── index.js                   # React entry point
│   └── index.css                  # Global styles
├── public/
│   └── index.html
└── package.json
```

### User Frontend (`/user-frontend`)
```
user-frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js              # Header with branding
│   │   ├── ItemBrowser.js         # Browse & filter items
│   │   ├── Cart.js                # Shopping cart & checkout
│   │   └── OrderTracker.js        # Order status tracking
│   ├── api.js                     # API client
│   ├── App.js                     # Main app component
│   ├── index.js                   # React entry point
│   ├── App.css                    # Layout styles
│   └── index.css                  # Global styles
├── public/
│   └── index.html
└── package.json
```

---

## 🔐 Authentication & Security

### Admin Login
- JWT-based authentication
- Secure password hashing with bcryptjs
- Token expires after 24 hours
- Protected routes check for valid token

### User Area
- No authentication required
- Orders created with customer information
- Can track orders using Order ID

---

## 📦 Database Schema

### Admin
```javascript
{
  _id: ObjectId,
  username: String (unique),
  password: String (hashed),
  email: String (unique),
  createdAt: Date
}
```

### Item
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  category: String (enum),
  price: Number,
  image: String (file path),
  inStock: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  customerAddress: String,
  items: [
    {
      itemId: ObjectId,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalPrice: Number,
  status: String (enum),
  specialNotes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints Reference

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | No | Admin login |
| POST | `/api/auth/register` | No | Create admin account |

### Items
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/items` | No | Get all items |
| GET | `/api/items/:id` | No | Get single item |
| POST | `/api/items` | Yes | Add new item |
| PUT | `/api/items/:id` | Yes | Update item |
| DELETE | `/api/items/:id` | Yes | Delete item |
| PATCH | `/api/items/:id/stock` | Yes | Toggle stock status |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | No | Create order |
| GET | `/api/orders/:id` | No | Get order details |
| GET | `/api/orders` | Yes | Get all orders (admin) |
| PATCH | `/api/orders/:id/status` | Yes | Update order status |

---

## 🚀 Installation & Running

### Prerequisites
- Node.js v14+
- MongoDB (local or cloud)
- npm or yarn

### Quick Setup (3 terminals)

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Admin:**
```bash
cd admin-frontend
npm install
npm start
```

**Terminal 3 - User:**
```bash
cd user-frontend
npm install
npm start
```

### Initial Setup
```bash
cd backend
node seed.js  # Create default admin account
```

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

---

## 💻 Admin Features

### Dashboard
- Overview of app features
- Quick links to items and orders management

### Items Management
- ✅ Add new food items with images
- ✅ Edit existing items
- ✅ Delete items
- ✅ Toggle stock status (in stock/out of stock)
- ✅ Filter and view all items
- Categories: Biryani, Curry, Bread, Rice, Dessert, Drinks, Other

### Orders Management
- ✅ View all orders with customer details
- ✅ See items in each order
- ✅ Track order status visually
- ✅ Update order status
- ✅ View special delivery notes
- Status options: Pending, Confirmed, Preparing, Ready, Out for Delivery, Delivered, Cancelled

---

## 🛒 User Features

### Browse Items
- ✅ View all available food items
- ✅ Filter by category
- ✅ Search by item name
- ✅ View item details (name, description, price)
- ✅ See item images
- ✅ Only shows in-stock items

### Shopping Cart
- ✅ Add items to cart
- ✅ Adjust quantities
- ✅ Remove items
- ✅ View cart total
- ✅ Item count badge

### Checkout
- ✅ Enter delivery information
- ✅ Add special delivery notes
- ✅ Order summary review
- ✅ Place order

### Order Tracking
- ✅ Real-time order status
- ✅ Visual progress timeline
- ✅ View order details
- ✅ Track delivery progress
- ✅ See all ordered items

---

## 🎨 UI/UX Features

### Admin Panel
- Clean, professional interface
- Responsive grid layout
- Easy navigation with top navbar
- Status color coding
- Modal-like forms
- Color-coded order statuses

### User App
- Modern, user-friendly design
- Responsive layout (works on mobile)
- Left: Item browser
- Right: Shopping cart
- Gradient header
- Smooth transitions
- Order tracking modal

---

## 📝 Environment Configuration

### Backend `.env`
```
MONGODB_URI=mongodb://localhost:27017/home_food
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

### Frontend Configuration
- API URL: `http://localhost:5000/api`
- Proxy in package.json handles requests

---

## 🔄 Workflow

### Admin Workflow
1. Login with credentials
2. Go to Items → Add new food items
3. Upload images and set prices
4. Return to admin panel
5. Go to Orders → View incoming orders
6. Update order status as it progresses
7. Manage stock by toggling availability

### User Workflow
1. Open user app
2. Browse available items
3. Filter by category or search
4. Click "Add to Cart" on items
5. Adjust quantities in cart
6. Click "Proceed to Checkout"
7. Enter delivery details
8. Place order
9. View real-time order status

---

## 🛡️ Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- Protected admin routes
- Input validation with express-validator
- CORS properly configured
- File upload validation
- Secure password storage

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running
- Check connection string in .env
- Try MongoDB Atlas for cloud option

### Port Already in Use
- Change PORT in .env for backend
- Use different port for frontend: `PORT=3001 npm start`

### CORS Errors
- Ensure backend is running
- Check API_URL matches backend port
- Backend has CORS enabled

### Image Upload Not Working
- Check `/uploads` folder exists
- Ensure write permissions
- Check file size and format

### Admin Login Failed
- Run `node seed.js` to create admin
- Check username/password
- Verify JWT_SECRET in .env

---

## 📦 Dependencies

### Backend
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- multer: File uploads
- cors: Cross-origin requests
- dotenv: Environment variables
- express-validator: Input validation

### Frontend
- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- react-scripts: Build tools

---

## 🚀 Production Deployment

### Before Production
1. Change JWT_SECRET to strong value
2. Change default admin password
3. Use MongoDB Atlas instead of local
4. Set proper CORS origins
5. Use environment-specific .env files
6. Enable HTTPS
7. Set NODE_ENV=production

### Deployment Platforms
- Backend: Heroku, Railway, Render, Vercel
- Frontend: Vercel, Netlify, GitHub Pages
- Database: MongoDB Atlas

---

## 🎓 Learning Points

This project demonstrates:
- Full-stack MERN architecture
- JWT authentication
- Protected routes
- File uploads
- REST API design
- Database modeling
- React hooks and state management
- Component-based UI
- CORS and middleware
- Form handling and validation

---

## 📞 Support & Help

For issues:
1. Check QUICKSTART.md for quick setup
2. Review README.md for detailed docs
3. Check MongoDB connection
4. Verify all services are running
5. Check browser console for errors
6. Check terminal output for backend errors

---

## 📜 License

This project is open-source and can be used for learning and development purposes.

Happy coding! 🎉
