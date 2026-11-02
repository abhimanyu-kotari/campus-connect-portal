import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Assignment from './models/Assignment.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// =============================================================
// 1. MIDDLEWARE CONFIGURATION
// =============================================================

// Middleware 1: Body parser to parse incoming JSON payloads
app.use(express.json());

// Middleware 2: CORS to allow cross-origin requests from React client
app.use(cors());

// Middleware 3: Custom Request Logger Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Auto-seed initial assignments if database collection is empty
const seedInitialData = async () => {
  try {
    const count = await Assignment.countDocuments();
    if (count === 0) {
      await Assignment.insertMany([
        {
          subject: 'CS3301 - Full Stack',
          title: 'Lab 2: React Routing',
          dueDate: 'Sept 15, 2026',
          status: 'Pending'
        },
        {
          subject: 'CS3302 - DBMS',
          title: 'ER Diagram Report',
          dueDate: 'Sept 20, 2026',
          status: 'Submitted'
        }
      ]);
      console.log('✓ Seeded initial assignments into MongoDB');
    }
  } catch (err) {
    console.error('Initial data seeding failed:', err.message);
  }
};

mongoose.connection.once('open', () => {
  seedInitialData();
});

// =============================================================
// 2. RESTful API ROUTES (MongoDB Database Operations)
// =============================================================

// Root Health & Endpoint Directory
app.get('/', (req, res) => {
  res.json({
    status: 'Online',
    project: 'Campus Connect Full Stack Application (MongoDB + Express + React)',
    course: 'CS3301 - Full Stack Development (Lab 7)',
    database: 'MongoDB (Mongoose ODM)',
    dbStatus: mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting...',
    endpoints: {
      getAll: 'GET /api/assignments',
      getOne: 'GET /api/assignments/:id',
      create: 'POST /api/assignments',
      update: 'PUT /api/assignments/:id',
      submit: 'PUT /api/assignments/:id/submit',
      delete: 'DELETE /api/assignments/:id'
    }
  });
});

// ROUTE 1 [READ ALL]: Fetch all assignments from MongoDB
app.get('/api/assignments', async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status: new RegExp(`^${status}$`, 'i') } : {};
    const assignments = await Assignment.find(filter).sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (err) {
    next(err);
  }
});

// ROUTE 2 [READ ONE]: Fetch a single assignment by its ID from MongoDB
app.get('/api/assignments/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: `Assignment with ID "${id}" is not a valid identifier`
      });
    }

    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: `Assignment with ID "${id}" not found in database`
      });
    }

    res.status(200).json(assignment);
  } catch (err) {
    next(err);
  }
});

// ROUTE 3 [CREATE]: Store a new assignment in MongoDB
app.post('/api/assignments', async (req, res, next) => {
  try {
    const { title, subject, dueDate, status } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Field "title" is required and cannot be empty'
      });
    }

    const newAssignment = await Assignment.create({
      subject: subject && subject.trim() !== '' ? subject.trim() : 'CS3301 - Full Stack',
      title: title.trim(),
      dueDate: dueDate || 'Next Week',
      status: status || 'Pending'
    });

    res.status(201).json(newAssignment);
  } catch (err) {
    next(err);
  }
});

// ROUTE 4 [UPDATE]: Update an existing assignment in MongoDB
app.put('/api/assignments/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: `Assignment with ID "${id}" not found`
      });
    }

    const updated = await Assignment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        error: `Assignment with ID "${id}" not found`
      });
    }

    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

// ROUTE 5 [SUBMIT / TOGGLE]: Submit an assignment in MongoDB
app.put('/api/assignments/:id/submit', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: `Assignment with ID "${id}" not found`
      });
    }

    const assignment = await Assignment.findById(id);
    if (!assignment) {
      return res.status(404).json({
        success: false,
        error: `Assignment with ID "${id}" not found`
      });
    }

    // Toggle status: if Pending -> Submitted; if Submitted -> Pending (allows undo)
    assignment.status = assignment.status === 'Pending' ? 'Submitted' : 'Pending';
    await assignment.save();

    res.status(200).json(assignment);
  } catch (err) {
    next(err);
  }
});

// ROUTE 6 [DELETE]: Remove an assignment from MongoDB
app.delete('/api/assignments/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        error: `Assignment with ID "${id}" not found`
      });
    }

    const deleted = await Assignment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: `Assignment with ID "${id}" not found`
      });
    }

    res.status(200).json({
      success: true,
      message: `Assignment "${deleted.title}" deleted from MongoDB successfully`,
      deleted
    });
  } catch (err) {
    next(err);
  }
});

// =============================================================
// 3. ERROR & 404 MIDDLEWARE
// =============================================================

// Middleware 4: 404 Route Not Found handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl} - Route not found on Campus Connect API`
  });
});

// Middleware 5: Centralized Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Error Middleware]:', err.message);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: messages.join(', ')
    });
  }

  if (err.name === 'CastError') {
    return res.status(404).json({
      success: false,
      error: `Resource with identifier "${err.value}" not found`
    });
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// =============================================================
// 4. START SERVER
// =============================================================
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
  console.log(`MongoDB operations available at http://localhost:${PORT}/api/assignments`);
});
