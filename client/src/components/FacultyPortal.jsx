import { useState } from 'react';

export default function FacultyPortal({ onBackToHome }) {
  // State for active tab navigation (matches User Flow diagram)
  const [activeTab, setActiveTab] = useState('dashboard');

  // State for Notices
  const [notices, setNotices] = useState([
    { id: 1, title: 'Mid-Term Exam Schedule Released', dept: 'SOCSE', date: 'Sept 10, 2026', priority: 'High' },
    { id: 2, title: 'Hackathon Registration Open', dept: 'RVU Tech Club', date: 'Sept 20, 2026', priority: 'Normal' }
  ]);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeDept, setNewNoticeDept] = useState('SOCSE');

  // State for Assignments
  const [assignments, setAssignments] = useState([
    { id: 1, code: 'CS3301', title: 'Lab Assignment 2: React State', dueDate: 'Sept 15, 2026', submissions: 38 },
    { id: 2, code: 'CS3302', title: 'ER Diagram Project Report', dueDate: 'Sept 20, 2026', submissions: 42 }
  ]);
  const [newAssignCode, setNewAssignCode] = useState('CS3301');
  const [newAssignTitle, setNewAssignTitle] = useState('');
  const [newAssignDue, setNewAssignDue] = useState('');

  // State for Attendance
  const [studentsAttendance, setStudentsAttendance] = useState([
    { usn: '1RUA24SCS0002', name: 'Abhimanyu Kotari', present: true },
    { usn: '1RUA24SCS0001', name: 'Likhith N.', present: true },
    { usn: '1RUA24SCS0003', name: 'Maya Sharma', present: false },
    { usn: '1RUA24SCS0004', name: 'Rohan Verma', present: true },
    { usn: '1RUA24SCS0005', name: 'Priya Nair', present: true }
  ]);
  const [attendanceSaved, setAttendanceSaved] = useState(false);

  // State for Submissions
  const [submissions, setSubmissions] = useState([
    { id: 1, student: 'Abhimanyu Kotari', usn: '1RUA24SCS0002', assignment: 'Lab Assignment 2: React State', date: 'Sept 14, 2026', grade: 'Pending' },
    { id: 2, student: 'Likhith N.', usn: '1RUA24SCS0001', assignment: 'Lab Assignment 2: React State', date: 'Sept 14, 2026', grade: 'A (92/100)' },
    { id: 3, student: 'Maya Sharma', usn: '1RUA24SCS0003', assignment: 'ER Diagram Project Report', date: 'Sept 13, 2026', grade: 'B+ (84/100)' }
  ]);

  const events = [
    { id: 1, title: 'Annual RVU Hackathon 2026', date: 'Sept 25, 2026', venue: 'Auditorium 2' },
    { id: 2, title: 'Faculty Development Program on Cloud Native Web Apps', date: 'Oct 02, 2026', venue: 'Seminar Hall B' }
  ];

  // Event Handlers
  const handlePostNotice = (e) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;
    const item = {
      id: Date.now(),
      title: newNoticeTitle.trim(),
      dept: newNoticeDept,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      priority: 'Normal'
    };
    setNotices([item, ...notices]);
    setNewNoticeTitle('');
    alert('Notice published to Campus Connect notice board!');
  };

  const handlePostAssignment = (e) => {
    e.preventDefault();
    if (!newAssignTitle.trim()) return;
    const item = {
      id: Date.now(),
      code: newAssignCode,
      title: newAssignTitle.trim(),
      dueDate: newAssignDue || 'Next Week',
      submissions: 0
    };
    setAssignments([item, ...assignments]);
    setNewAssignTitle('');
    setNewAssignDue('');
    alert(`New Assignment posted for ${newAssignCode}!`);
  };

  const toggleStudentAttendance = (usn) => {
    setStudentsAttendance((prev) =>
      prev.map((s) => (s.usn === usn ? { ...s, present: !s.present } : s))
    );
    setAttendanceSaved(false);
  };

  const saveAttendance = () => {
    setAttendanceSaved(true);
    alert('Attendance marked and recorded for the session!');
  };

  const gradeSubmission = (id) => {
    const grade = prompt('Enter grade (e.g., A, B+, 95/100):', 'A');
    if (grade) {
      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, grade } : sub))
      );
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div>
          <h2 style={{ margin: 0, color: '#F2A900' }}>👨‍🏫 Faculty Portal View</h2>
          <span style={{ fontSize: '13px', color: '#e0e0e0' }}>Welcome, Prof. Dr. K. Raman (SOCSE)</span>
        </div>
        <button onClick={onBackToHome} style={styles.backBtn}>
          ← Back to Main Campus View
        </button>
      </header>

      {/* Tabs matching User Flow */}
      <div style={styles.tabContainer}>
        {['dashboard', 'notices', 'assignments', 'attendance', 'events', 'submissions'].map((tabKey) => {
          const tabLabels = {
            dashboard: 'Dashboard',
            notices: 'Post Notices',
            assignments: 'Post Assignments',
            attendance: 'Mark Attendance',
            events: 'View Events',
            submissions: 'View Submissions'
          };
          return (
            <button
              key={tabKey}
              style={activeTab === tabKey ? styles.activeTab : styles.tab}
              onClick={() => setActiveTab(tabKey)}
            >
              {tabLabels[tabKey]}
            </button>
          );
        })}
      </div>

      {/* Content Card */}
      <div style={styles.contentCard}>
        {/* 1. DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <h3 style={styles.sectionHeading}>📊 Faculty Dashboard Overview</h3>
            <p style={styles.subText}>Academic session 2026-2027 • School of Computer Science & Engineering</p>
            
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>3</span>
                <span style={styles.statLabel}>Active Courses</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>{notices.length}</span>
                <span style={styles.statLabel}>Notices Posted</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>{assignments.length}</span>
                <span style={styles.statLabel}>Course Assignments</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>
                  {studentsAttendance.filter((s) => s.present).length} / {studentsAttendance.length}
                </span>
                <span style={styles.statLabel}>Today's Attendance</span>
              </div>
            </div>

            <div style={{ marginTop: '25px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button style={styles.actionBtn} onClick={() => setActiveTab('notices')}>+ Create Notice</button>
              <button style={styles.actionBtn} onClick={() => setActiveTab('assignments')}>+ Post Assignment</button>
              <button style={{ ...styles.actionBtn, backgroundColor: '#107c41' }} onClick={() => setActiveTab('attendance')}>Mark Attendance</button>
            </div>
          </div>
        )}

        {/* 2. POST NOTICES */}
        {activeTab === 'notices' && (
          <div>
            <h3 style={styles.sectionHeading}>📢 Post Notices</h3>
            <form onSubmit={handlePostNotice} style={styles.form}>
              <div style={styles.formRow}>
                <input
                  type="text"
                  placeholder="Notice Title (e.g., Lab Record Submission Reminder)..."
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  style={styles.input}
                  required
                />
                <select
                  value={newNoticeDept}
                  onChange={(e) => setNewNoticeDept(e.target.value)}
                  style={styles.select}
                >
                  <option value="SOCSE">SOCSE</option>
                  <option value="CS3301 Lab">CS3301 Lab</option>
                  <option value="RVU Tech Club">RVU Tech Club</option>
                </select>
                <button type="submit" style={styles.actionBtn}>Publish Notice</button>
              </div>
            </form>

            <h4 style={{ marginTop: '20px', color: '#0A2240' }}>Published Campus Notices:</h4>
            <ul style={styles.list}>
              {notices.map((n) => (
                <li key={n.id} style={styles.listItem}>
                  <div>
                    <strong>{n.title}</strong>
                    <p style={styles.subText}>{n.dept} • {n.date}</p>
                  </div>
                  <span style={styles.badgeSuccess}>Live</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 3. POST ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div>
            <h3 style={styles.sectionHeading}>📝 Post Coursework Assignments</h3>
            <form onSubmit={handlePostAssignment} style={styles.form}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                <select
                  value={newAssignCode}
                  onChange={(e) => setNewAssignCode(e.target.value)}
                  style={styles.select}
                >
                  <option value="CS3301">CS3301 - Full Stack</option>
                  <option value="CS3302">CS3302 - DBMS</option>
                  <option value="CS3303">CS3303 - Operating Systems</option>
                </select>
                <input
                  type="text"
                  placeholder="Assignment Title..."
                  value={newAssignTitle}
                  onChange={(e) => setNewAssignTitle(e.target.value)}
                  style={styles.input}
                  required
                />
                <input
                  type="text"
                  placeholder="Due Date (e.g. Sept 28, 2026)"
                  value={newAssignDue}
                  onChange={(e) => setNewAssignDue(e.target.value)}
                  style={styles.input}
                />
                <button type="submit" style={styles.actionBtn}>Post Assignment</button>
              </div>
            </form>

            <h4 style={{ marginTop: '25px', color: '#0A2240' }}>Active Assignments:</h4>
            <ul style={styles.list}>
              {assignments.map((a) => (
                <li key={a.id} style={styles.listItem}>
                  <div>
                    <strong>{a.title}</strong>
                    <p style={styles.subText}>{a.code} • Due: {a.dueDate}</p>
                  </div>
                  <span style={styles.badgePending}>{a.submissions} Submissions</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 4. MARK ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div>
            <h3 style={styles.sectionHeading}>📋 Mark Attendance</h3>
            <p style={styles.subText}>Course: CS3301 - Full Stack Web Development (B.Sc Hons. CS 2024)</p>
            
            <div style={{ marginTop: '15px', overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHead}>
                    <th style={styles.th}>USN</th>
                    <th style={styles.th}>Student Name</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsAttendance.map((s) => (
                    <tr key={s.usn} style={styles.tr}>
                      <td style={styles.td}><strong>{s.usn}</strong></td>
                      <td style={styles.td}>{s.name}</td>
                      <td style={styles.td}>
                        <span style={s.present ? styles.badgeSuccess : styles.badgeAbsent}>
                          {s.present ? 'Present' : 'Absent'}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <button
                          type="button"
                          onClick={() => toggleStudentAttendance(s.usn)}
                          style={{
                            ...styles.smallBtn,
                            backgroundColor: s.present ? '#ef4444' : '#107c41'
                          }}
                        >
                          Mark {s.present ? 'Absent' : 'Present'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={saveAttendance} style={{ ...styles.actionBtn, backgroundColor: '#107c41' }}>
                Save & Submit Attendance
              </button>
              {attendanceSaved && (
                <span style={{ color: '#155724', fontWeight: 'bold', fontSize: '13px' }}>
                  ✓ Attendance successfully recorded!
                </span>
              )}
            </div>
          </div>
        )}

        {/* 5. VIEW EVENTS */}
        {activeTab === 'events' && (
          <div>
            <h3 style={styles.sectionHeading}>📅 Campus & Academic Events</h3>
            <ul style={styles.list}>
              {events.map((ev) => (
                <li key={ev.id} style={styles.listItem}>
                  <div>
                    <strong>{ev.title}</strong>
                    <p style={styles.subText}>Venue: {ev.venue} • Date: {ev.date}</p>
                  </div>
                  <span style={styles.badgeSuccess}>Scheduled</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 6. VIEW SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div>
            <h3 style={styles.sectionHeading}>📥 View Student Submissions</h3>
            <p style={styles.subText}>Review and grade student assignment submissions</p>

            <div style={{ marginTop: '15px', overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHead}>
                    <th style={styles.th}>USN</th>
                    <th style={styles.th}>Student Name</th>
                    <th style={styles.th}>Assignment</th>
                    <th style={styles.th}>Submission Date</th>
                    <th style={styles.th}>Grade</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub.id} style={styles.tr}>
                      <td style={styles.td}><strong>{sub.usn}</strong></td>
                      <td style={styles.td}>{sub.student}</td>
                      <td style={styles.td}>{sub.assignment}</td>
                      <td style={styles.td}>{sub.date}</td>
                      <td style={styles.td}>
                        <span style={sub.grade === 'Pending' ? styles.badgePending : styles.badgeSuccess}>
                          {sub.grade}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <button onClick={() => gradeSubmission(sub.id)} style={styles.smallBtn}>
                          {sub.grade === 'Pending' ? 'Grade' : 'Edit Grade'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '900px', margin: '30px auto', fontFamily: 'Arial, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0A2240', padding: '15px 20px', borderRadius: '8px 8px 0 0', color: '#fff' },
  backBtn: { backgroundColor: '#F2A900', border: 'none', padding: '8px 14px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', color: '#0A2240' },
  tabContainer: { display: 'flex', backgroundColor: '#e2e8f0', borderBottom: '2px solid #0A2240', flexWrap: 'wrap' },
  tab: { flex: 1, minWidth: '130px', padding: '12px 10px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600', color: '#333', fontSize: '13px' },
  activeTab: { flex: 1, minWidth: '130px', padding: '12px 10px', border: 'none', backgroundColor: '#ffffff', color: '#0A2240', fontWeight: 'bold', borderTop: '3px solid #0A2240', cursor: 'pointer', fontSize: '13px' },
  contentCard: { backgroundColor: '#ffffff', padding: '25px', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textAlign: 'left' },
  sectionHeading: { margin: '0 0 6px 0', color: '#0A2240' },
  subText: { margin: '0 0 16px 0', fontSize: '13px', color: '#666' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '15px', marginTop: '15px' },
  statCard: { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '18px', borderRadius: '8px', textAlign: 'center' },
  statNumber: { display: 'block', fontSize: '26px', fontWeight: 'bold', color: '#0A2240' },
  statLabel: { fontSize: '12px', color: '#64748b' },
  list: { listStyle: 'none', padding: 0, margin: '15px 0 0 0' },
  listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #eee' },
  form: { marginTop: '10px' },
  formRow: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  input: { flex: 1, minWidth: '200px', padding: '10px 12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px' },
  select: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px', backgroundColor: 'white' },
  actionBtn: { backgroundColor: '#0A2240', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' },
  smallBtn: { backgroundColor: '#0A2240', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  badgeSuccess: { backgroundColor: '#28a745', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  badgePending: { backgroundColor: '#ffc107', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  badgeAbsent: { backgroundColor: '#dc3545', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  tableHead: { backgroundColor: '#f1f5f9', borderBottom: '2px solid #cbd5e1' },
  th: { padding: '10px 12px', textAlign: 'left', fontSize: '13px', color: '#0A2240' },
  tr: { borderBottom: '1px solid #e2e8f0' },
  td: { padding: '10px 12px', fontSize: '13px' }
};
