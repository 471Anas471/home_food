# ⚡ Quick Reference Card

## 🚀 Start the App (3 Terminals)

```bash
# Terminal 1
cd backend && npm install && npm start

# Terminal 2
cd admin-frontend && npm install && npm start

# Terminal 3
cd user-frontend && npm install && npm start
```

---

## 📍 Access Points

| Component | URL | Login |
|-----------|-----|-------|
| **Admin Panel** | http://localhost:3000 | admin/admin123 |
| **User App** | http://localhost:3001 | No login |
| **Backend API** | http://localhost:5000 | JWT auth |

---

## 🗂️ Key Files

```
Backend:
├── server.js           ← Start here
├── models/             ← Database schemas
├── routes/             ← API endpoints
└── seed.js             ← Create admin: node seed.js

Admin Frontend:
├── App.js              ← Main component
├── components/
│   ├── Login.js        ← Admin login
│   ├── Dashboard.js    ← Admin dashboard
│   ├── ItemsManagement.js    ← Add/Edit/Delete items
│   └── OrdersManagement.js   ← View/Update orders
└── api.js              ← API calls

User Frontend:
├── App.js              ← Main component
├── components/
│   ├── ItemBrowser.js  ← Browse items
│   ├── Cart.js         ← Shopping cart
│   └── OrderTracker.js ← Track orders
└── api.js              ← API calls
```

---

## 🔗 API Endpoints

### Public (No Auth)
```
GET    /api/items              → Get all items
GET    /api/items/:id          → Get single item
POST   /api/orders             → Create order
GET    /api/orders/:id         → Get order status
POST   /api/auth/login         → Admin login
```

### Protected (Need JWT Token)
```
POST   /api/items              → Add item
PUT    /api/items/:id          → Update item
DELETE /api/items/:id          → Delete item
PATCH  /api/items/:id/stock    → Toggle stock
GET    /api/orders             → Get all orders
PATCH  /api/orders/:id/status  → Update status
```

---

## 📋 Admin Tasks

1. **Login**: admin / admin123
2. **Add Items**: Dashboard → Items → Add Item
3. **View Orders**: Dashboard → Orders
4. **Update Status**: Click status dropdown
5. **Manage Stock**: Click ✓/✗ button on item

---

## 🛒 User Tasks

1. **Browse**: See all items
2. **Search**: Use search input
3. **Filter**: Click category buttons
4. **Add to Cart**: Click "Add to Cart"
5. **Checkout**: Enter address & place order
6. **Track**: View order status in modal

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 busy | User app uses 3001 |
| MongoDB error | Run `mongod` first |
| Login fails | Run `node seed.js` |
| Can't upload image | Check file type & size |
| CORS error | Check API URL in code |

---

## 📚 Documentation Map

```
START HERE ───→ QUICKSTART.md (5 min)
               ↓
         Ready to use? YES → Start terminal 1-3
                       NO ↓
                   INSTALLATION_GUIDE.md
                       ↓
              Want to understand? 
                    ↙  ↓  ↖
         VISUAL_GUIDE  PROJECT  COMPLETE
                      OVERVIEW  SUMMARY
                       ↓
                 API_TESTING_GUIDE
                  (if testing APIs)
```

---

## 🔑 Default Credentials

```
Admin Username: admin
Admin Password: admin123

⚠️ Change these in production!
```

---

## 📦 Node Versions

```
Tested with: Node v14+
NPM: v6+
MongoDB: v4.4+

Check: node --version
       npm --version
       mongod --version
```

---

## 💾 Database

```
Name: home_food
Collections:
  - admins
  - items
  - orders

Connection: mongodb://localhost:27017
Or use MongoDB Atlas for cloud
```

---

## 🎯 Category Options

```
• Biryani
• Curry
• Bread
• Rice
• Dessert
• Drinks
• Other
```

---

## 📊 Order Status Flow

```
Pending → Confirmed → Preparing → Ready → 
Out for Delivery → Delivered / Cancelled
```

---

## ✨ Item Properties

```
Required:
✓ name          (string)
✓ description   (string)
✓ category      (enum)
✓ price         (number)

Optional:
◇ image         (file)
◇ inStock       (boolean, default: true)
```

---

## 🛠️ Useful Commands

```bash
# Backend
npm start          # Run server
npm run dev        # Dev with auto-reload
node seed.js       # Create default admin

# Frontend
npm start          # Dev server
npm build          # Production build
npm test           # Run tests

# Database
mongod             # Start MongoDB
mongo              # MongoDB shell
```

---

## 🔍 Check Everything Works

```bash
# Check backend
curl http://localhost:5000/api/items

# Check admin
open http://localhost:3000

# Check user app
open http://localhost:3001
```

---

## 📱 Responsive Breakpoints

```
Mobile:   < 768px   (single column)
Tablet:   768-1024px (2 columns)
Desktop:  > 1024px   (multi-column)
```

---

## 🚀 Deploy Checklist

- [ ] Change admin password
- [ ] Change JWT_SECRET
- [ ] Use MongoDB Atlas
- [ ] Set CORS origins
- [ ] Enable HTTPS
- [ ] Test on production URL

---

## 📞 Quick Help

**"How do I start?"**
→ npm install in all 3 folders, then npm start

**"How do I login?"**
→ admin / admin123 (CHANGE IN PRODUCTION!)

**"How do I add items?"**
→ Login → Items → Add Item button

**"How do I track orders?"**
→ Place order → Click tracker button

**"API not working?"**
→ Check JWT token in headers for protected routes

---

## 🎉 Ready to Go!

Open **QUICKSTART.md** and follow the 4 steps.

You'll be running in **5 minutes**! ⚡

---

**Version:** 1.0
**Created:** January 16, 2026
**Status:** ✅ Production Ready
