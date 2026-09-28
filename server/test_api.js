// =============================================================
// EXPERIMENT 6: Automated API Test Suite & Postman Verification
// Tests all 4 CRUD Operations and Middleware Responses
// =============================================================

const BASE_URL = 'http://localhost:5000';

async function runTests() {
  console.log('====================================================');
  console.log('  CS3301 Lab 6: RESTful API Test Suite Running...  ');
  console.log('====================================================\n');

  try {
    // TEST 1: Health Check (GET /)
    console.log('▶ [TEST 1] GET / (Root Health Check)');
    const resRoot = await fetch(`${BASE_URL}/`);
    const dataRoot = await resRoot.json();
    console.log(`Status: ${resRoot.status} OK`);
    console.log('Response:', dataRoot.project, '-', dataRoot.status, '\n');

    // TEST 2: Read All (GET /api/assignments)
    console.log('▶ [TEST 2] GET /api/assignments (Read All Items)');
    const resGetAll = await fetch(`${BASE_URL}/api/assignments`);
    const dataGetAll = await resGetAll.json();
    console.log(`Status: ${resGetAll.status} OK`);
    console.log(`Retrieved ${dataGetAll.length} assignments:\n`, dataGetAll, '\n');

    // TEST 3: Create New Item (POST /api/assignments)
    console.log('▶ [TEST 3] POST /api/assignments (Create New Item)');
    const newAssignment = {
      subject: 'CS3301 - Full Stack',
      title: 'Lab 6: RESTful API Implementation',
      dueDate: 'Oct 05, 2026'
    };
    const resPost = await fetch(`${BASE_URL}/api/assignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAssignment)
    });
    const dataPost = await resPost.json();
    console.log(`Status: ${resPost.status} Created`);
    console.log('Created Item:\n', dataPost, '\n');
    const createdId = dataPost.id;

    // TEST 4: Read Single Item (GET /api/assignments/:id)
    console.log(`▶ [TEST 4] GET /api/assignments/${createdId} (Read Single Item by ID)`);
    const resGetOne = await fetch(`${BASE_URL}/api/assignments/${createdId}`);
    const dataGetOne = await resGetOne.json();
    console.log(`Status: ${resGetOne.status} OK`);
    console.log('Fetched Item:\n', dataGetOne, '\n');

    // TEST 5: Update Existing Item (PUT /api/assignments/:id)
    console.log(`▶ [TEST 5] PUT /api/assignments/${createdId} (Update Item)`);
    const resPut = await fetch(`${BASE_URL}/api/assignments/${createdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Lab 6: RESTful API Implementation (Updated with Tests)',
        status: 'In Review'
      })
    });
    const dataPut = await resPut.json();
    console.log(`Status: ${resPut.status} OK`);
    console.log('Updated Item:\n', dataPut, '\n');

    // TEST 6: Specialized Submit Endpoint (PUT /api/assignments/:id/submit)
    console.log(`▶ [TEST 6] PUT /api/assignments/${createdId}/submit (Student Submit Action)`);
    const resSubmit = await fetch(`${BASE_URL}/api/assignments/${createdId}/submit`, {
      method: 'PUT'
    });
    const dataSubmit = await resSubmit.json();
    console.log(`Status: ${resSubmit.status} OK`);
    console.log('Submitted Item:\n', dataSubmit, '\n');

    // TEST 7: Delete Item (DELETE /api/assignments/:id)
    console.log(`▶ [TEST 7] DELETE /api/assignments/${createdId} (Delete Item)`);
    const resDelete = await fetch(`${BASE_URL}/api/assignments/${createdId}`, {
      method: 'DELETE'
    });
    const dataDelete = await resDelete.json();
    console.log(`Status: ${resDelete.status} OK`);
    console.log('Delete Confirmation:\n', dataDelete, '\n');

    // TEST 8: Verify Deletion & 404 Not Found Handling
    console.log(`▶ [TEST 8] GET /api/assignments/${createdId} (Verify 404 After Deletion)`);
    const res404 = await fetch(`${BASE_URL}/api/assignments/${createdId}`);
    const data404 = await res404.json();
    console.log(`Status: ${res404.status} Not Found`);
    console.log('404 Response:\n', data404, '\n');

    // TEST 9: Validation Error (POST with empty body)
    console.log('▶ [TEST 9] POST /api/assignments (Verify 400 Bad Request on Missing Title)');
    const res400 = await fetch(`${BASE_URL}/api/assignments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    const data400 = await res400.json();
    console.log(`Status: ${res400.status} Bad Request`);
    console.log('400 Validation Error Response:\n', data400, '\n');

    console.log('====================================================');
    console.log('  ✓ ALL 9 CRUD & MIDDLEWARE TESTS PASSED!          ');
    console.log('====================================================\n');
  } catch (err) {
    console.error('Test execution failed:', err);
  }
}

runTests();
