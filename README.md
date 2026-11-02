# 🎓 Campus Connect Portal

> **RV University**  
> *Repository:* [MedhaSrinath/Campus-connect](https://github.com/MedhaSrinath/Campus-connect)

---

## 📌 Project Overview

**Campus Connect** is an integrated academic management portal designed to connect students, faculty, and administrators onto a single digital platform. The project provides a modern web interface for viewing university highlights, accessing dedicated role portals, managing schedules and notices in real time, and tracking academic attendance.

---

## 🚀 Key Features

### 1. Modern Responsive Landing Page (`client/index.html`)
- **Semantic HTML5 Structure**: Structured with `<header>`, `<nav>`, `<section>`, `<article>`, and `<footer>` elements.
- **Layouts with CSS Grid & Flexbox**:
  - Flexbox-driven navigation header, brand badges, and action buttons.
  - Responsive multi-column CSS Grid for user portals (`Student Portal`, `Faculty Portal`, `Admin Portal`).
- **Campus Life Carousel**: Interactive image carousel showcasing RV University campus infrastructure and digital learning with smooth navigation controls and indicator dots.
- **Micro-Interactions**: Hover elevation effects (`transform: translateY(-8px)` and drop-shadows) on portal cards and buttons.
- **Mobile Responsiveness**: Adaptive media queries ensuring an optimal experience on mobile, tablet, and desktop screens.

### 2. Student Authentication System (`client/login.html`)
- Dedicated RV University branded login & registration portal.
- Tab-switching interface between **Student Login** and **Student Registration**.
- Interactive notifications upon successful registration and login.
- Direct redirection to student dashboard features.

### 3. Student Performance & Attendance Portal (`client/attendance.html`)
- **Student Profile Summary**: Structured rendering of student academic details and enrollment status.
- **Batch Grade Evaluator**: Automated mark processing and grade calculation.
- **Interactive Attendance Tracker**: Real-time counter functionality for tracking lecture presence.
- **Announcement Dialogs**: Interactive notification and prompt boxes.

### 4. Interactive Notice & Task Board (`client/experiment3.html`)
- **Real-Time Input Reflection**: Live preview responding instantly to user typing without page refresh.
- **Dynamic Content Management**: Add announcements and tasks dynamically to the active list.
- **Task Actions**: Remove items and toggle completed status.
- **Dark Mode Toggle**: Instant theme switching between light and dark modes.

### 5. Study & Task Planner (`client/experiment4.html`)
- **State-Driven Architecture**: User interface automatically updates to reflect application state changes.
- **Task Filtering & Priorities**: Filter tasks by status (`All`, `Pending`, `Completed`) with priority tags (`High`, `Medium`, `Low`).
- **Local Persistence**: Automatically saves tasks to `localStorage` so data remains available across browser sessions.

### 6. Backend API Server (`server/`)
- Built with **Node.js** and **Express**.
- Modular routing architecture with authentication endpoints.
- MongoDB and Mongoose integration for data persistence.
- CORS-enabled for secure communication with the frontend client.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+), React 19, Vite |
| **Backend** | Node.js, Express.js, CORS, Dotenv |
| **Database & Auth** | MongoDB, Mongoose, JWT, bcryptjs |
| **Version Control** | Git, GitHub |

---

## 📂 Project Structure

```text
Campus_Connect/
├── README.md                      # Project documentation
├── package.json                   # Root project configuration
├── client/                        # Client-side web application
│   ├── index.html                 # Main Campus Connect portal landing page
│   ├── login.html                 # Student login & registration portal
│   ├── attendance.html            # Student performance & attendance dashboard
│   ├── experiment3.html           # Interactive notice & task board
│   ├── experiment3.js             # External script for notice board
│   ├── experiment4.html           # State-driven task & study planner
│   ├── experiment4.js             # State management & render engine for task planner
│   ├── package.json               # Client dependencies
│   ├── src/
│   │   ├── style.css              # Main external stylesheet
│   │   ├── main.jsx               # React entry point
│   │   ├── App.jsx                # Core application component
│   │   ├── assets/                # Images & media assets
│   │   └── components/
│   │       ├── AuthModule.jsx     # Authentication component
│   │       ├── StudentPortal.jsx  # Student dashboard view (User Flow)
│   │       └── FacultyPortal.jsx  # Faculty dashboard view (User Flow)
│   └── public/                    # Static assets & icons
└── server/                        # Backend REST API
    ├── package.json               # Server dependencies
    ├── test_api.js                # Automated CRUD & DB test suite
    ├── postman_collection.json    # Postman test collection
    └── src/
        ├── app.js                 # Express server configuration
        ├── config/
        │   └── db.js              # MongoDB connection handler (Mongoose)
        ├── models/
        │   ├── Assignment.js      # Assignment Mongoose schema & model
        │   └── User.js            # User data model
        └── routes/
            └── authRoutes.js      # Authentication endpoints
```

---

## 💻 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/MedhaSrinath/Campus-connect.git
cd Campus-connect
```

### 2. Run the Frontend
You can open any of the HTML pages directly in your browser or with VS Code **Live Server**:
- **Home Page**: `client/index.html`
- **Login Portal**: `client/login.html`
- **Notice Board**: `client/experiment3.html`
- **Task Planner**: `client/experiment4.html`

Alternatively, run the development server:
```bash
cd client
npm install
npm run dev
```

### 3. Run the Backend Server (with MongoDB)
Make sure your local MongoDB service is running (default port `27017`), then start the Express server:
```bash
cd server
npm install
node src/app.js
```
The server will connect to MongoDB (`mongodb://localhost:27017/campus_connect`), auto-seed initial assignments if the database collection is empty, and listen on `http://localhost:5000`.

### 4. Test the RESTful API & Database Operations (Labs 6 & 7)
Run the automated test suite verifying all 4 CRUD operations, validation middlewares, and persistent MongoDB storage:
```bash
cd server
npm test
```
Or import `server/postman_collection.json` directly into Postman to test each endpoint interactively.

### 5. Inspect Data in MongoDB Compass
1. Open **MongoDB Compass**.
2. Connect to `mongodb://localhost:27017`.
3. In the left database list, open **`campus_connect`**.
4. Select the **`assignments`** collection to view real-time documents inserted, updated, and deleted by the app.

## 📝 License

This project is licensed under the **ISC License**.
