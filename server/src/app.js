import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON and allow React requests
app.use(express.json());
app.use(cors());

// Mock Data (In-Memory Database)
let assignments = [
  { id: 1, subject: 'CS3301 - Full Stack', title: 'Lab 2: React Routing', status: 'Pending' },
  { id: 2, subject: 'CS3302 - DBMS', title: 'ER Diagram Report', status: 'Submitted' }
];

// -------------------------------------------------------------
// RESTful API Routes
// -------------------------------------------------------------

// Root API Status Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Campus Connect REST API Server is running',
    version: '1.0.0',
    endpoints: {
      getAllAssignments: 'GET /api/assignments',
      createAssignment: 'POST /api/assignments',
      submitAssignment: 'PUT /api/assignments/:id/submit'
    }
  });
});

// 1. GET: Fetch all assignments
app.get('/api/assignments', (req, res) => {
  res.json(assignments);
});

// 2. POST: Create a new assignment (Faculty View)
app.post('/api/assignments', (req, res) => {
  const newAssignment = {
    id: assignments.length + 1,
    subject: req.body.subject || 'CS3301 - Full Stack',
    title: req.body.title,
    status: 'Pending'
  };
  assignments.push(newAssignment);
  res.status(201).json(newAssignment);
});

// 3. PUT: Submit an assignment (Student View)
app.put('/api/assignments/:id/submit', (req, res) => {
  const id = parseInt(req.params.id);
  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  assignment.status = 'Submitted';
  res.json(assignment);
});

// Optional toggle route for frontend undo / submit convenience
app.put('/api/assignments/:id/toggle', (req, res) => {
  const id = parseInt(req.params.id);
  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  assignment.status = assignment.status === 'Pending' ? 'Submitted' : 'Pending';
  res.json(assignment);
});

// Start the Node.js HTTP Server
app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});