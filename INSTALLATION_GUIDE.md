# Package Installation & Port Configuration

## Backend Dependencies (Node.js)

```bash
cd backend
npm install
```

**Installed Packages:**
- express@^4.18.2 - Web server framework
- mongoose@^7.0.0 - MongoDB object modeling
- dotenv@^16.0.3 - Environment variable management
- jsonwebtoken@^9.0.0 - JWT authentication
- bcryptjs@^2.4.3 - Password hashing
- cors@^2.8.5 - Cross-origin resource sharing
- multer@^1.4.5 - File upload handling
- express-validator@^7.0.0 - Input validation
- nodemon@^2.0.20 (dev) - Auto-reload during development

**Ports:**
- Backend API: `http://localhost:5000` (configurable in .env)

---

## Admin Frontend Dependencies (React)

```bash
cd admin-frontend
npm install
```

**Installed Packages:**
- react@^18.2.0 - UI library
- react-dom@^18.2.0 - React DOM
- react-router-dom@^6.8.0 - Client-side routing
- axios@^1.3.0 - HTTP client
- react-scripts@5.0.1 - Build and development tools

**Ports:**
- Admin App: `http://localhost:3000` (default)
- Falls back to `http://localhost:3001` if 3000 is busy

---

## User Frontend Dependencies (React)

```bash
cd user-frontend
npm install
```

**Installed Packages:**
- react@^18.2.0 - UI library
- react-dom@^18.2.0 - React DOM
- react-router-dom@^6.8.0 - Client-side routing
- axios@^1.3.0 - HTTP client
- react-scripts@5.0.1 - Build and development tools

**Ports:**
- User App: `http://localhost:3000` (or 3002+ if ports busy)

---

## Startup Checklist

### Before Running Apps

1. **MongoDB Running**
   - Local: `mongod` or MongoDB service should be running
   - Cloud: MongoDB Atlas connection string in .env

2. **Backend Environment**
   ```
   cd backend
   # Check if .env exists with:
   # MONGODB_URI=mongodb://localhost:27017/home_food
   # PORT=5000
   # JWT_SECRET=your_secret
   ```

3. **Create Default Admin (First time only)**
   ```
   cd backend
   node seed.js
   ```

### Running Services

**Service 1: Backend (Terminal 1)**
```bash
cd backend
npm install  # First time only
npm start
# Server running on http://localhost:5000
```

**Service 2: Admin Frontend (Terminal 2)**
```bash
cd admin-frontend
npm install  # First time only
npm start
# App running on http://localhost:3000
```

**Service 3: User Frontend (Terminal 3)**
```bash
cd user-frontend
npm install  # First time only
npm start
# App running on http://localhost:3000 or 3001
```

---

## Port Management

### Default Ports
- Backend: 5000
- Admin Frontend: 3000
- User Frontend: 3000 or 3001

### If Ports Are Busy

**Backend - Edit `backend/.env`:**
```
PORT=5001
```

**Frontend - Set environment variable:**
```bash
# Windows (PowerShell)
$env:PORT=3002; npm start

# Mac/Linux
PORT=3002 npm start
```

---

## Verification Commands

After installation, verify everything works:

**Check Backend:**
```bash
curl http://localhost:5000/api/items
# Should return empty array or existing items
```

**Check Admin Frontend:**
- Navigate to `http://localhost:3000`
- You should see login page

**Check User Frontend:**
- Navigate to `http://localhost:3001` (or applicable port)
- You should see home food app

---

## Network Information

All services communicate via HTTP:
- Admin Frontend → Backend: `http://localhost:5000`
- User Frontend → Backend: `http://localhost:5000`
- Database: `mongodb://localhost:27017` (or MongoDB Atlas)

**Proxy Configuration:**
Both React apps have `"proxy": "http://localhost:5000"` in package.json
This ensures API requests are forwarded to the backend.

---

## Installation Sizes (Approximate)

- Backend node_modules: ~300 MB
- Admin Frontend node_modules: ~400 MB
- User Frontend node_modules: ~400 MB
- **Total: ~1.1 GB**

Clean up unused packages with `npm prune` after installation.

---

## Troubleshooting Installation

### "npm not found"
- Install Node.js from https://nodejs.org
- Verify: `node --version` and `npm --version`

### "Port already in use"
- Change PORT in .env or use different port
- Or kill the process using the port

### "Module not found"
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`

### "MongoDB connection failed"
- Start MongoDB: `mongod`
- Or update connection string in .env

### "EACCES permission denied"
- Try: `npm install --no-optional`
- Or use: `sudo npm install` (not recommended)

---

## Development Commands

### Backend
```bash
npm start     # Production mode
npm run dev   # Development with auto-reload
```

### Frontend
```bash
npm start     # Development server with hot reload
npm build     # Build for production
npm test      # Run tests
```

---

## Production Build

```bash
# Backend - Already production-ready
# Just ensure NODE_ENV=production and proper .env

# Admin Frontend
cd admin-frontend
npm run build
# Creates optimized build in /build folder

# User Frontend
cd user-frontend
npm run build
# Creates optimized build in /build folder
```

---

## Next Steps After Installation

1. ✅ Install all dependencies
2. ✅ Start all three services
3. ✅ Open admin panel: http://localhost:3000
4. ✅ Login with admin/admin123
5. ✅ Add some food items
6. ✅ Open user app in another tab
7. ✅ Place test order
8. ✅ Track order status

Enjoy your Home Food Delivery App! 🚀
