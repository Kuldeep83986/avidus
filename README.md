# Avidus — Role-Based Task Management Application

A full-stack task management app with role-based access control, admin dashboard, and activity logging.

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, JWT
- **Frontend**: React.js (Vite), React Router, Axios
- **Database**: MongoDB Atlas

---

## User Credentials

### Admin Account

| Name  | Email              | Password  | Role  |
|-------|--------------------|-----------|-------|
| Admin | admin@gmail.com    | admin123  | Admin |

### User Accounts

| Name          | Email             | Password  | Role | Status   |
|---------------|-------------------|-----------|------|----------|
| Rahul Sharma  | rahul@gmail.com   | rahul123  | User | Active   |
| Priya Singh   | priya@gmail.com   | priya123  | User | Active   |
| Amit Kumar    | amit@gmail.com    | amit123   | User | Active   |
| Neha Gupta    | neha@gmail.com    | neha123   | User | Inactive |

---

## Features

### Authentication
- User registration and login with JWT
- Password hashing with bcrypt
- Protected routes using middleware

### User Permissions
- Create own tasks
- View own tasks only
- Update own tasks
- Delete own tasks

### Admin Permissions
- View all users
- Delete users
- Update user status (Active/Inactive)
- View all tasks from all users
- Delete any task
- View activity logs

### Activity Logging
- Tracks login activity
- Tracks task creation
- Tracks task updates
- Tracks task deletion

### Admin Dashboard
- Total users count
- Total tasks count
- Completed tasks count
- Pending tasks count
- Task completion progress bar

---

## Project Structure

```
avidus/
├── backend/
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User schema (roles + status)
│   │   ├── Task.js              # Task schema
│   │   └── ActivityLog.js       # Activity log schema
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT token verification
│   │   └── adminMiddleware.js   # Admin role check
│   ├── controllers/
│   │   ├── authController.js    # Register & Login
│   │   ├── taskController.js    # User task CRUD
│   │   ├── adminController.js   # Admin operations
│   │   └── activityController.js# Activity logs
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   └── logActivity.js       # Activity logging helper
│   ├── server.js                # Entry point
│   ├── .env                     # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Auth state management
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Role-aware navigation
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx        # User task dashboard
│   │   │   ├── AdminDashboard.jsx   # Admin analytics
│   │   │   ├── UserManagement.jsx   # Manage users
│   │   │   ├── TaskMonitoring.jsx   # View all tasks
│   │   │   └── ActivityLogs.jsx     # Activity history
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## API Endpoints

### Auth Routes (Public)

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| POST   | /api/auth/register   | Register new user    |
| POST   | /api/auth/login      | Login user           |
| GET    | /api/auth/me         | Get current user     |

### Task Routes (Protected)

| Method | Endpoint           | Description        |
|--------|--------------------|--------------------|
| GET    | /api/tasks         | Get own tasks      |
| POST   | /api/tasks         | Create task        |
| PUT    | /api/tasks/:id     | Update own task    |
| DELETE | /api/tasks/:id     | Delete own task    |

### Admin Routes (Admin Only)

| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| GET    | /api/admin/stats       | Dashboard analytics  |
| GET    | /api/admin/users       | View all users       |
| PUT    | /api/admin/users/:id   | Update user status   |
| DELETE | /api/admin/users/:id   | Delete user          |
| GET    | /api/admin/tasks       | View all tasks       |
| DELETE | /api/admin/tasks/:id   | Delete any task      |
| GET    | /api/admin/activities  | View activity logs   |

---

## How to Run

### 1. Clone the repository

```bash
git clone <repository-url>
cd avidus
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Open the app

Go to `http://localhost:5173` in your browser.

---

## Screenshots

- **Login Page** — Clean sign-in form
- **User Dashboard** — Create, view, edit, delete tasks
- **Admin Dashboard** — Analytics with stats cards and progress bar
- **User Management** — View, activate/deactivate, delete users
- **Task Monitoring** — View and delete all user tasks
- **Activity Logs** — Track all user activities

---

## Environment Variables

| Variable    | Description                  |
|-------------|------------------------------|
| PORT        | Backend server port (5000)   |
| MONGO_URI   | MongoDB connection string    |
| JWT_SECRET  | Secret key for JWT tokens    |
