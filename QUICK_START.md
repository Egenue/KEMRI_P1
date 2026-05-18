# Quick Start Guide - Admin System Testing

## Prerequisites
- Node.js installed
- MongoDB running locally on port 27017 (or accessible via network)
- Terminal/Command Prompt access

## Step 1: Backend Setup

```bash
# Navigate to Backend directory
cd Backend

# Install dependencies
npm install

# Create .env file with necessary configuration
# Copy .env.example as reference
```

Create `.env` file in `Backend/` folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kemri_admin
JWT_SECRET=test-secret-key-change-in-production
CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173
DB_HOST=your_mysql_host
DB_PORT=3306
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
```

## Step 2: Start Backend Server

```bash
# From Backend directory
npm start
```

You should see:
```
✅ Connected to MongoDB
🚀 Server on port 5000
```

## Step 3: Frontend Setup (New Terminal)

```bash
# Navigate to root directory
cd ..

# Start frontend development server
npm run dev
```

You should see Vite starting on `http://localhost:5173`

## Step 4: Create First Admin Account

### Option A: Using curl/Postman
```bash
curl -X POST http://localhost:5000/adminLogon/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password123",
    "email": "admin@kemri.org"
  }'
```

### Option B: Database Direct Entry (MongoDB)
Use MongoDB Compass or mongo CLI:
```javascript
db.adminlogons.insertOne({
  username: "admin",
  password: "$2a$10$...", // bcrypt hash of "password123"
  email: "admin@kemri.org",
  createdAt: new Date()
})
```

## Step 5: Test Admin Login

1. Open browser and navigate to `http://localhost:5173`
2. You'll see the form page with an "Admin Login" button
3. Click "Admin Login" button
4. Enter credentials:
   - Username: `admin`
   - Password: `password123`
5. You should be redirected to the admin dashboard
6. The dashboard will show questionnaire statistics and responses

## Features to Test

### Dashboard Features
✅ View total questionnaires count
✅ View pending and completed counts
✅ Click on a questionnaire to see details
✅ Delete a questionnaire response
✅ Click "Refresh" to reload data
✅ Click "Logout" to return to form

### Form Features
✅ Fill out and submit the questionnaire form
✅ Check dashboard to see new responses

## Troubleshooting

### "Connection refused on port 5000"
- Check if backend is running: `npm start` in Backend folder

### "MongoDB connection error"
- Check if MongoDB is running
- For local: `mongod` command
- Update MONGODB_URI in .env if using remote

### "Cannot find module 'bcryptjs'"
- Run `npm install` in Backend folder again
- Check package.json includes all dependencies

### "CORS Error"
- Verify CORS_ORIGIN in .env includes `http://localhost:5173`
- Restart backend server after changing .env

### Login shows "Invalid credentials"
- Verify username and password match what was registered
- Check MongoDB has the admin user

## Running Both Services Together

Use the root package.json script:
```bash
npm run dev:all
```

This runs Vite and backend server concurrently.

## Development Notes

- Frontend auto-reloads on file changes
- Backend requires restart on file changes (nodemon handles this)
- Admin token is stored in browser localStorage
- Clear localStorage to force re-login: F12 → Application → Local Storage → Clear

## Next: Deployment

Once tested locally, consider:
1. Deploy backend to production server (Railway, Heroku, AWS, etc.)
2. Update API URLs in frontend code
3. Change JWT_SECRET to a strong value
4. Set up MongoDB Atlas or production MongoDB instance
5. Configure environment variables on hosting platform
