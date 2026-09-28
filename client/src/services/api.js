const API_BASE_URL = 'http://localhost:5000/api';

export async function getAssignments() {
  try {
    const res = await fetch(`${API_BASE_URL}/assignments`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.warn('Backend server not reachable, using local state:', err.message);
    return null;
  }
}

export async function addAssignment(assignmentData) {
  try {
    const res = await fetch(`${API_BASE_URL}/assignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assignmentData)
    });
    if (!res.ok) throw new Error('Failed to create assignment');
    return await res.json();
  } catch (err) {
    console.warn('Backend server not reachable, returning simulated object:', err.message);
    return null;
  }
}

export async function submitAssignment(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/assignments/${id}/submit`, {
      method: 'PUT'
    });
    if (!res.ok) throw new Error('Failed to submit assignment');
    return await res.json();
  } catch (err) {
    console.warn('Backend server not reachable, fallback to local toggle:', err.message);
    return null;
  }
}
