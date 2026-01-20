# API Testing Guide

## Testing the Home Food Delivery API

Use this guide to test all API endpoints using Postman, cURL, or Insomnia.

---

## 🔑 Authentication Setup

### 1. Admin Login (Get JWT Token)

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin"
}
```

**Save the token** - You'll need it for protected endpoints!

### 2. Register New Admin

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "username": "newadmin",
  "password": "newpassword",
  "email": "admin2@homefood.com"
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username":"newadmin",
    "password":"newpassword",
    "email":"admin2@homefood.com"
  }'
```

---

## 📦 Items Endpoints

### 3. Get All Items (PUBLIC)

**Endpoint:** `GET /api/items`

**cURL:**
```bash
curl http://localhost:5000/api/items
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Mutton Biryani",
    "description": "Fragrant basmati rice with tender mutton",
    "category": "Biryani",
    "price": 200,
    "image": "/uploads/1234567890.jpg",
    "inStock": true,
    "createdAt": "2024-01-16T10:00:00.000Z",
    "updatedAt": "2024-01-16T10:00:00.000Z"
  }
]
```

### 4. Get Single Item (PUBLIC)

**Endpoint:** `GET /api/items/:id`

**cURL:**
```bash
curl http://localhost:5000/api/items/507f1f77bcf86cd799439011
```

### 5. Add New Item (PROTECTED)

**Endpoint:** `POST /api/items`

**Headers Required:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: multipart/form-data
```

**Form Data:**
```
name: "Butter Chicken"
description: "Creamy tomato-based curry with tender chicken"
category: "Curry"
price: 150
image: <file>
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=Butter Chicken" \
  -F "description=Creamy tomato-based curry" \
  -F "category=Curry" \
  -F "price=150" \
  -F "image=@path/to/image.jpg"
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Butter Chicken",
  "description": "Creamy tomato-based curry with tender chicken",
  "category": "Curry",
  "price": 150,
  "image": "/uploads/1234567891.jpg",
  "inStock": true,
  "createdAt": "2024-01-16T11:00:00.000Z",
  "updatedAt": "2024-01-16T11:00:00.000Z"
}
```

### 6. Update Item (PROTECTED)

**Endpoint:** `PUT /api/items/:id`

**cURL:**
```bash
curl -X PUT http://localhost:5000/api/items/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "name=Butter Chicken" \
  -F "price=160" \
  -F "image=@path/to/new_image.jpg"
```

### 7. Delete Item (PROTECTED)

**Endpoint:** `DELETE /api/items/:id`

**cURL:**
```bash
curl -X DELETE http://localhost:5000/api/items/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "message": "Item deleted successfully"
}
```

### 8. Toggle Stock Status (PROTECTED)

**Endpoint:** `PATCH /api/items/:id/stock`

**cURL:**
```bash
curl -X PATCH http://localhost:5000/api/items/507f1f77bcf86cd799439012/stock \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Butter Chicken",
  "inStock": false,
  "updatedAt": "2024-01-16T11:30:00.000Z"
}
```

---

## 📋 Orders Endpoints

### 9. Create Order (PUBLIC)

**Endpoint:** `POST /api/orders`

**Request Body:**
```json
{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+91-9876543210",
  "customerAddress": "123 Main Street, Mumbai",
  "specialNotes": "No onions please",
  "items": [
    {
      "itemId": "507f1f77bcf86cd799439011",
      "name": "Mutton Biryani",
      "price": 200,
      "quantity": 2
    },
    {
      "itemId": "507f1f77bcf86cd799439012",
      "name": "Naan",
      "price": 50,
      "quantity": 1
    }
  ]
}
```

**cURL:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+91-9876543210",
    "customerAddress": "123 Main Street, Mumbai",
    "specialNotes": "No onions please",
    "items": [
      {
        "itemId": "507f1f77bcf86cd799439011",
        "name": "Mutton Biryani",
        "price": 200,
        "quantity": 2
      }
    ]
  }'
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+91-9876543210",
  "customerAddress": "123 Main Street, Mumbai",
  "items": [
    {
      "_id": "507f1f77bcf86cd799439021",
      "itemId": "507f1f77bcf86cd799439011",
      "name": "Mutton Biryani",
      "price": 200,
      "quantity": 2
    }
  ],
  "totalPrice": 400,
  "status": "Pending",
  "specialNotes": "No onions please",
  "createdAt": "2024-01-16T12:00:00.000Z",
  "updatedAt": "2024-01-16T12:00:00.000Z"
}
```

### 10. Get Order Details (PUBLIC)

**Endpoint:** `GET /api/orders/:id`

**cURL:**
```bash
curl http://localhost:5000/api/orders/507f1f77bcf86cd799439020
```

### 11. Get All Orders (PROTECTED)

**Endpoint:** `GET /api/orders`

**cURL:**
```bash
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "+91-9876543210",
    "customerAddress": "123 Main Street, Mumbai",
    "items": [...],
    "totalPrice": 400,
    "status": "Pending",
    "createdAt": "2024-01-16T12:00:00.000Z"
  }
]
```

### 12. Update Order Status (PROTECTED)

**Endpoint:** `PATCH /api/orders/:id/status`

**Request Body:**
```json
{
  "status": "Confirmed"
}
```

**Valid Statuses:**
- Pending
- Confirmed
- Preparing
- Ready
- Out for Delivery
- Delivered
- Cancelled

**cURL:**
```bash
curl -X PATCH http://localhost:5000/api/orders/507f1f77bcf86cd799439020/status \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "Confirmed"}'
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "customerName": "John Doe",
  "status": "Confirmed",
  "updatedAt": "2024-01-16T12:15:00.000Z"
}
```

---

## ✅ Test Checklist

### Public API Tests
- [ ] GET /api/items - Returns all items
- [ ] GET /api/items/:id - Returns single item
- [ ] POST /api/orders - Create order successfully
- [ ] GET /api/orders/:id - Get order details

### Admin Authentication Tests
- [ ] POST /api/auth/login - Login successful
- [ ] Receive JWT token in response
- [ ] Token works for protected endpoints
- [ ] Invalid credentials return 401

### Protected Item Tests (with valid token)
- [ ] POST /api/items - Add item
- [ ] PUT /api/items/:id - Update item
- [ ] PATCH /api/items/:id/stock - Toggle stock
- [ ] DELETE /api/items/:id - Delete item

### Protected Order Tests (with valid token)
- [ ] GET /api/orders - Get all orders
- [ ] PATCH /api/orders/:id/status - Update status

### Error Handling Tests
- [ ] POST /api/items without token - Returns 401
- [ ] POST /api/orders with invalid data - Returns 400
- [ ] GET /api/items/:id with invalid ID - Returns 404
- [ ] Update order with invalid status - Returns 400

---

## 🔍 Using Postman

### Import Environment Variables

1. Create variables in Postman:
   - `baseUrl` = `http://localhost:5000`
   - `token` = (empty initially)

2. After login, set token:
   ```
   {{baseUrl}}/api/auth/login
   ```

3. Copy token from response and set in variable

4. Use in headers:
   ```
   Authorization: Bearer {{token}}
   ```

---

## 🛠️ Common Issues & Solutions

### "401 Unauthorized"
- You forgot to add JWT token
- Token has expired
- Token is invalid
- **Solution:** Login again and get new token

### "400 Bad Request"
- Missing required fields
- Invalid data format
- Invalid enum value
- **Solution:** Check request format matches documentation

### "404 Not Found"
- Item/Order ID doesn't exist
- Endpoint URL is wrong
- **Solution:** Verify ID exists in database

### "CORS Error"
- Frontend domain not allowed
- Backend CORS not configured
- **Solution:** Check backend CORS settings

### "Image Upload Failed"
- File type not allowed (only images)
- File too large
- /uploads folder doesn't exist
- **Solution:** Ensure file is image and size is reasonable

---

## 📊 Sample Test Data

### Sample Items to Add
```json
{
  "name": "Mutton Biryani",
  "description": "Fragrant basmati rice with tender mutton pieces",
  "category": "Biryani",
  "price": 200
}

{
  "name": "Butter Chicken",
  "description": "Creamy tomato-based curry with tender chicken",
  "category": "Curry",
  "price": 150
}

{
  "name": "Naan",
  "description": "Traditional Indian flatbread",
  "category": "Bread",
  "price": 50
}

{
  "name": "Gulab Jamun",
  "description": "Sweet milk solids in sugar syrup",
  "category": "Dessert",
  "price": 80
}

{
  "name": "Mango Lassi",
  "description": "Traditional mango yogurt drink",
  "category": "Drinks",
  "price": 60
}
```

### Sample Order to Create
```json
{
  "customerName": "Jane Smith",
  "customerEmail": "jane@example.com",
  "customerPhone": "+91-9876543211",
  "customerAddress": "456 Oak Avenue, Mumbai",
  "items": [
    {
      "itemId": "REPLACE_WITH_ACTUAL_ID",
      "name": "Mutton Biryani",
      "price": 200,
      "quantity": 1
    },
    {
      "itemId": "REPLACE_WITH_ANOTHER_ID",
      "name": "Naan",
      "price": 50,
      "quantity": 2
    }
  ]
}
```

---

## 🎯 Complete Test Flow

1. **Setup:**
   - Start backend: `npm start` in /backend
   - Note: Port 5000

2. **Login:**
   - POST /api/auth/login with admin/admin123
   - Save the JWT token

3. **Add Items:**
   - POST /api/items (use token)
   - Add 3-5 sample items

4. **Create Order:**
   - POST /api/orders (public, no token)
   - Use items you just added

5. **View Orders:**
   - GET /api/orders (use token)
   - See all orders

6. **Update Status:**
   - PATCH /api/orders/:id/status (use token)
   - Change status through different states

7. **Check User App:**
   - Open user frontend
   - See items you added
   - Place test order
   - Track it

---

## 📱 Using REST Client in VS Code

Create a `.http` file in backend directory:

```http
### Admin Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

### Get All Items
GET http://localhost:5000/api/items

### Create Order
POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+91-9876543210",
  "customerAddress": "123 Main St",
  "items": [
    {
      "itemId": "ITEM_ID_HERE",
      "name": "Item Name",
      "price": 200,
      "quantity": 1
    }
  ]
}
```

Install "REST Client" extension in VS Code and click "Send Request"

---

Happy testing! 🚀
