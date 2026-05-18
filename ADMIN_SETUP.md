# KEMRI Admin System Documentation

## Overview
This document describes the new admin authentication system and dashboard that has been implemented for the KEMRI project.

## Components Added

### Backend (Node.js/Express)

#### 1. Admin Model (`Backend/Models/adminLogon.js`)
- Defines the MongoDB schema for admin users
- Fields: `username`, `password` (hashed), `email`, `createdAt`

#### 2. Admin Controller (`Backend/Controllers/adminLogon.js`)
- `registerAdmin()` - Creates a new admin account (with password hashing)
- `loginAdmin()` - Authenticates admin and returns JWT token

#### 3. Admin Routes (`Backend/routes/adminLogon.js`)
- `POST /adminLogon/login` - Admin login endpoint
- `POST /adminLogon/register` - Admin registration endpoint

#### 4. Auth Middleware (`Backend/Middleware/authMiddleware.js`)
- Validates JWT tokens for protected routes
- Can be used to protect questionnaire management endpoints

#### 5. Server Configuration (`Backend/server.js`)
- Added MongoDB connection
- Integrated admin routes
- Updated CORS configuration

### Frontend (React)

#### 1. Admin Login Page (`src/Pages/AdminLogin.jsx`)
- Responsive login form
- Username and password authentication
- Stores JWT token in localStorage
- Error handling and loading states

#### 2. Admin Dashboard (`src/Pages/AdminDashboard.jsx`)
- Displays questionnaire statistics
- Lists all questionnaire responses
- View detailed response information
- Delete responses
- Refresh data functionality
- Auto-persists admin session

#### 3. Updated App (`src/App.jsx`)
- Implements page navigation between Form, Login, and Dashboard
- Session persistence (checks for existing token on load)
- Admin logout functionality

## Installation & Setup

### Backend Setup

1. Install dependencies:
```bash
cd Backend
npm install
```

2. Create a `.env` file in the Backend folder (use `.env.example` as template):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kemri_admin
JWT_SECRET=your-secret-key-change-this-in-production
CORS_ORIGIN=http://localhost:5173
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=kemri_db
DB_PORT=3306
```

3. Make sure MongoDB is running locally or update `MONGODB_URI` to your MongoDB instance

4. Start the backend server:
```bash
npm start
```

### Frontend Setup

1. Install dependencies (if needed):
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. The app will be available at `http://localhost:5173`

## API Endpoints

### Admin Authentication
- **POST** `/adminLogon/login`
  - Request: `{ username: string, password: string }`
  - Response: `{ message: string, token: string, admin: { id, username, email } }`

- **POST** `/adminLogon/register`
  - Request: `{ username: string, password: string, email: string }`
  - Response: `{ message: string }`

### Questionnaires (Protected Routes)
- **GET** `/api/questionnaires` - Get all questionnaire responses
- **GET** `/api/questionnaire/:id` - Get specific questionnaire
- **PUT** `/api/questionnaire/:id` - Update questionnaire
- **DELETE** `/api/questionnaire/:id` - Delete questionnaire

## Usage Guide

### First Time Setup

1. **Create Admin Account** (Optional - can be done via backend directly):
   - Call `POST /adminLogon/register` with credentials

2. **Login to Admin Dashboard**:
   - Click "Admin Login" button on the form page
   - Enter username and password
   - Upon successful login, you'll be redirected to the dashboard

### Admin Dashboard Features

- **Statistics**: View total questionnaires, pending count, and completed count
- **Response List**: Browse all submitted questionnaire responses
- **Response Details**: Click any questionnaire to view full details
- **Delete Response**: Remove unwanted responses
- **Refresh Data**: Manually refresh the questionnaire list
- **Logout**: Securely logout from admin account

## Security Features

✅ Password hashing using bcryptjs
✅ JWT token-based authentication
✅ Token stored securely in localStorage
✅ Authorization header support
✅ CORS protection
✅ Input validation

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/kemri_admin |
| JWT_SECRET | Secret for JWT signing | your-secret-key-change-this-in-production |
| CORS_ORIGIN | Allowed CORS origins | http://localhost:5173 |
| DB_HOST | MySQL host | localhost |
| DB_USER | MySQL user | root |
| DB_PASSWORD | MySQL password | - |
| DB_NAME | MySQL database | kemri_db |
| DB_PORT | MySQL port | 3306 |

## Database Setup

### MongoDB
MongoDB is used for storing admin credentials. No manual setup needed if running locally.

### MySQL
Existing MySQL database is used for questionnaire data.

## Troubleshooting

### Login fails
- Check that MongoDB is running
- Verify username and password are correct
- Check browser console for error messages

### Can't access dashboard
- Verify JWT token is stored in localStorage
- Check that backend server is running
- Check CORS settings in server.js

### MongoDB connection error
- Ensure MongoDB is running on port 27017
- Check MONGODB_URI in .env file
- If using remote MongoDB, update connection string

## Next Steps / Enhancements

Potential improvements for future development:

1. **Multi-factor Authentication (MFA)**
2. **Admin Role Management** (Super Admin, Manager, Viewer)
3. **Audit Logging** - Track all admin actions
4. **Advanced Filters** - Filter questionnaires by date, status, etc.
5. **Export to CSV/PDF** - Export questionnaire data
6. **Admin Management** - Create/edit/delete admin accounts
7. **Email Notifications** - Notify on new submissions
8. **Data Analytics** - Advanced charts and statistics
9. **Form Builder** - Dynamic form creation
10. **API Key Management** - For third-party integrations

## Support

For issues or questions, please check:
1. Browser console for error messages
2. Server logs in terminal
3. MongoDB connection status
4. Environment variables configuration
