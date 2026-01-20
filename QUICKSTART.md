# Quick Start Guide

## Step 1: Install Dependencies

Run these commands in 3 different terminal windows:

### Backend
```bash
cd backend
npm install
```

### Admin Frontend
```bash
cd admin-frontend
npm install
```

### User Frontend
```bash
cd user-frontend
npm install
```

## Step 2: Set up MongoDB

Make sure MongoDB is running:
- **Local**: Start MongoDB service or run `mongod`
- **Cloud**: Use MongoDB Atlas (update MONGODB_URI in backend/.env)

## Step 3: Create Admin Account

```bash
cd backend
node seed.js
```

This creates a default admin account with:
- Username: `admin`
- Password: `admin123`

Change password in production!

## Step 4: Start All Services

Open 3 terminals and run:

**Terminal 1:**
```bash
cd backend
npm start
```

**Terminal 2:**
```bash
cd admin-frontend
npm start
```

**Terminal 3:**
```bash
cd user-frontend
npm start
```

## Step 5: Access Applications

- **Admin Panel**: http://localhost:3000 (or http://localhost:3001 if port 3000 is busy)
  - Login with admin/admin123
  - Add food items
  - Manage orders

- **User App**: http://localhost:3000 (different port if needed)
  - Browse items
  - Add to cart
  - Place orders
  - Track delivery

## Environment Variables

Create `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/home_food
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

## File Upload Setup

Backend automatically creates `/uploads` folder for images. Ensure you have write permissions.

## Common Issues

1. **Port 3000 already in use**:
   - Admin: Will automatically use port 3001
   - User: You can specify port: `PORT=3002 npm start`

2. **MongoDB connection error**:
   - Check if MongoDB is running
   - Verify MONGODB_URI in .env

3. **CORS errors**:
   - Backend CORS is configured for all origins
   - Check API_URL in frontend files

4. **Image upload fails**:
   - Check `/uploads` folder exists
   - Check file permissions

## Database

The app will automatically create these collections:
- `admins` - Admin accounts
- `items` - Food items
- `orders` - Customer orders

No manual setup needed!

## Next Steps

1. Create admin account and login
2. Add some food items to the menu
3. Go to user app and place test orders
4. Track orders in admin panel

Enjoy!
