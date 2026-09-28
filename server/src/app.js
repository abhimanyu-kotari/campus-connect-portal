import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

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

// =============================================================
// 2. IN-MEMORY DATABASE (Resource: Assignments)
// =============================================================
let assignments = [
  {
    id: 1,
    subject: 'CS3301 - Full Stack',
    title: 'Lab 2: React Routing',
    dueDate: 'Sept 15, 2026',
    status: 'Pending'
  },
  {
    id: 2,
    subject: 'CS3302 - DBMS',
    title: 'ER Diagram Report',
    dueDate: 'Sept 20, 2026',
    status: 'Submitted'
  }
];

// Helper to auto-increment IDs safely
let nextId = 3;

// =============================================================
// 3. RESTful API ROUTES (Full CRUD)
// =============================================================

// Root Health & Endpoint Directory
app.get('/', (req, res) => {
  res.json({
    project: 'Campus Connect RESTful API Server',
    course: 'CS3301 - Full Stack Development (Lab 6)',
    status: 'Server Running',
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

// ROUTE 1 [READ ALL]: Fetch all assignments (with optional ?status= filter)
app.get('/api/assignments', (req, res) => {
  const { status } = req.query;
  if (status) {
    const filtered = assignments.filter(
      (a) => a.status.toLowerCase() === status.toLowerCase()
    );
    return res.status(200).json(filtered);
  }
  res.status(200).json(assignments);
});

// ROUTE 2 [READ ONE]: Fetch a single assignment by its ID
app.get('/api/assignments/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) {
    return res.status(404).json({
      success: false,
      error: `Assignment with ID ${id} not found`
    });
  }

  res.status(200).json(assignment);
});

// ROUTE 3 [CREATE]: Create a new assignment (Faculty View)
app.post('/api/assignments', (req, res) => {
  const { title, subject, dueDate } = req.body;

  // Input Validation
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Field "title" is required and cannot be empty'
    });
  }

  const newAssignment = {
    id: nextId++,
    subject: subject && subject.trim() !== '' ? subject.trim() : 'CS3301 - Full Stack',
    title: title.trim(),
    dueDate: dueDate || 'Next Week',
    status: 'Pending'
  };

  assignments.push(newAssignment);
  res.status(201).json(newAssignment);
});

// ROUTE 4 [UPDATE]: Update an existing assignment by its ID
app.put('/api/assignments/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const assignmentIndex = assignments.findIndex((a) => a.id === id);

  if (assignmentIndex === -1) {
    return res.status(404).json({
      success: false,
      error: `Assignment with ID ${id} not found`
    });
  }

  const { title, subject, status, dueDate } = req.body;

  // Update fields if provided
  if (title !== undefined) assignments[assignmentIndex].title = title;
  if (subject !== undefined) assignments[assignmentIndex].subject = subject;
  if (status !== undefined) assignments[assignmentIndex].status = status;
  if (dueDate !== undefined) assignments[assignmentIndex].dueDate = dueDate;

  res.status(200).json(assignments[assignmentIndex]);
});

// ROUTE 5 [SUBMIT / TOGGLE]: Student submission endpoint
app.put('/api/assignments/:id/submit', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) {
    return res.status(404).json({
      success: false,
      error: `Assignment with ID ${id} not found`
    });
  }

  assignment.status = 'Submitted';
  res.status(200).json(assignment);
});

// ROUTE 6 [DELETE]: Remove an assignment by its ID
app.delete('/api/assignments/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const assignmentIndex = assignments.findIndex((a) => a.id === id);

  if (assignmentIndex === -1) {
    return res.status(404).json({
      success: false,
      error: `Assignment with ID ${id} not found`
    });
  }

  const deletedAssignment = assignments.splice(assignmentIndex, 1)[0];
  res.status(200).json({
    success: true,
    message: `Assignment with ID ${id} deleted successfully`,
    deleted: deletedAssignment
  });
});

// =============================================================
// 4. ERROR & 404 MIDDLEWARE
// =============================================================

// Middleware 4: 404 Not Found handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl} - Route not found on Campus Connect API`
  });
});

// Middleware 5: Global Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Error Middleware Caught]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// =============================================================
// 5. START SERVER
// =============================================================
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
  console.log(`CRUD endpoints available at http://localhost:${PORT}/api/assignments`);
});