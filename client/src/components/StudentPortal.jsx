import { useState } from 'react';

export default function StudentPortal({ onBackToHome }) {
  // State for active tab navigation (default: 'notices')
  const [activeTab, setActiveTab] = useState('notices');

  // State for student course assignments
  const [assignments, setAssignments] = useState([
    { id: 1, subject: 'CS3301 - Full Stack', title: 'Lab Assignment 2: React State', status: 'Pending', dueDate: 'Sept 15, 2026' },
    { id: 2, subject: 'CS3302 - DBMS', title: 'ER Diagram Project Report', status: 'Submitted', dueDate: 'Sept 01, 2026' }
  ]);

  const notices = [
    { id: 1, title: 'Mid-Term Exam Schedule Released', date: 'Sept 10, 2026', dept: 'SOCSE' },
    { id: 2, title: 'Hackathon Registration Open', date: 'Sept 20, 2026', dept: 'RVU Tech Club' }
  ];

  // Event handler to toggle assignment status between Pending and Submitted
  const handleAssignmentSubmit = (id) => {
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, status: assignment.status === 'Pending' ? 'Submitted' : 'Pending' }
          : assignment
      )
    );
  };

  return (
    <div style={styles.container}>
      {/* Top Header Navigation */}
      <header style={styles.header}>
        <div>
          <h2 style={{ margin: 0, color: '#F2A900' }}>👨‍🎓 Student Portal View</h2>
          <span style={{ fontSize: '13px', color: '#e0e0e0' }}>Welcome, RVU Student</span>
        </div>
        <button onClick={onBackToHome} style={styles.backBtn}>
          ← Back to Main Campus View
        </button>
      </header>

      {/* Portal Tab Navigation */}
      <div style={styles.tabContainer}>
        {/* Tab navigation buttons with dynamic active tab styling */}
        <button
          style={activeTab === 'notices' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('notices')}
        >
          Notices & Events
        </button>
        <button
          style={activeTab === 'assignments' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('assignments')}
        >
          Assignments
        </button>
        <button
          style={activeTab === 'attendance' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('attendance')}
        >
          Track Attendance
        </button>
        <button
          style={activeTab === 'profile' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>

      {/* Main Feature Content Area */}
      <div style={styles.contentCard}>
        {/* SECTION 1: NOTICES */}
        {activeTab === 'notices' && (
          <div>
            <h3>📢 Campus Notices & Events</h3>
            <ul style={styles.list}>
              {notices.map((item) => (
                <li key={item.id} style={styles.listItem}>
                  <div>
                    <strong>{item.title}</strong>
                    <p style={styles.subText}>{item.dept} • {item.date}</p>
                  </div>
                  <button style={styles.actionBtn}>View Details</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SECTION 2: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div>
            <h3>📝 Course Assignments</h3>
            <ul style={styles.list}>
              {assignments.map((assignment) => (
                <li key={assignment.id} style={styles.listItem}>
                  <div>
                    <strong>{assignment.title}</strong>
                    <p style={styles.subText}>
                      {assignment.subject} • Due: {assignment.dueDate}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={
                        assignment.status === 'Submitted'
                          ? styles.badgeSuccess
                          : styles.badgePending
                      }
                    >
                      {assignment.status}
                    </span>
                    <button
                      onClick={() => handleAssignmentSubmit(assignment.id)}
                      style={styles.actionBtn}
                    >
                      {assignment.status === 'Pending' ? 'Submit' : 'Undo'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* SECTION 3: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div>
            <h3>📊 Track Attendance</h3>
            <p style={styles.subText}>Overall Semester Attendance: 85%</p>
          </div>
        )}

        {/* SECTION 4: PROFILE */}
        {activeTab === 'profile' && (
          <div>
            <h3>👤 Student Profile</h3>
            <p style={styles.subText}>Name: RVU Student • Program: B.Tech CSE</p>
          </div>
        )}
      </div>
    </div>
  );
}

// RV University Styling Palette (Unchanged)
const styles = {
  container: { maxWidth: '850px', margin: '30px auto', fontFamily: 'Arial, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0A2240', padding: '15px 20px', borderRadius: '8px 8px 0 0', color: '#fff' },
  backBtn: { backgroundColor: '#F2A900', border: 'none', padding: '8px 14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', color: '#0A2240' },
  tabContainer: { display: 'flex', backgroundColor: '#e0e0e0', borderBottom: '2px solid #0A2240' },
  tab: { flex: 1, padding: '12px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold', color: '#333' },
  activeTab: { flex: 1, padding: '12px', border: 'none', backgroundColor: '#ffffff', color: '#0A2240', fontWeight: 'bold', borderTop: '3px solid #0A2240', cursor: 'pointer' },
  contentCard: { backgroundColor: '#ffffff', padding: '25px', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  list: { listStyle: 'none', padding: 0 },
  listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #eee' },
  subText: { margin: '4px 0 0 0', fontSize: '12px', color: '#666' },
  actionBtn: { backgroundColor: '#0A2240', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  badgeSuccess: { backgroundColor: '#28a745', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  badgePending: { backgroundColor: '#ffc107', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }
};