import { useState, useEffect } from 'react';
import profilePic from '../assets/profile.jpg';

export default function StudentPortal({ onBackToHome }) {
  // State for active tab navigation (default: 'dashboard', matching User Flow diagram)
  const [activeTab, setActiveTab] = useState('dashboard');

  // State for student course assignments
  const [assignments, setAssignments] = useState([
    { id: 1, subject: 'CS3301 - Full Stack', title: 'Lab Assignment 2: React State', status: 'Pending', dueDate: 'Sept 15, 2026' },
    { id: 2, subject: 'CS3302 - DBMS', title: 'ER Diagram Project Report', status: 'Submitted', dueDate: 'Sept 01, 2026' },
    { id: 3, subject: 'CS3303 - Operating Systems', title: 'Process Scheduling Simulation', status: 'Pending', dueDate: 'Sept 30, 2026' }
  ]);

  // Fetch live assignments from REST API on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/assignments')
      .then((res) => {
        if (!res.ok) throw new Error('API server unavailable');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAssignments(data.map((item) => ({
            id: item.id,
            subject: item.subject || 'CS3301 - Full Stack',
            title: item.title,
            status: item.status || 'Pending',
            dueDate: item.dueDate || 'Sept 30, 2026'
          })));
        }
      })
      .catch(() => {
        // Graceful fallback to default state if backend server isn't running
      });
  }, []);

  const notices = [
    { id: 1, title: 'Mid-Term Exam Schedule Released', date: 'Sept 10, 2026', dept: 'SOCSE' },
    { id: 2, title: 'Hackathon Registration Open', date: 'Sept 20, 2026', dept: 'RVU Tech Club' },
    { id: 3, title: 'Library Book Return Due Date Extended', date: 'Sept 22, 2026', dept: 'Central Library' }
  ];

  const events = [
    { id: 1, title: 'RVU National Hackathon 2026', date: 'Sept 25, 2026', venue: 'Main Auditorium', category: 'Hackathon' },
    { id: 2, title: 'Industry Keynote: Next-Gen Web & Cloud Systems', date: 'Oct 03, 2026', venue: 'Seminar Hall 1', category: 'Guest Lecture' },
    { id: 3, title: 'RV University Annual Sports & Tech Fest', date: 'Oct 15, 2026', venue: 'Sports Ground', category: 'Campus Fest' }
  ];

  // State for Attendance
  const [attendanceCount, setAttendanceCount] = useState(24);
  const totalLectures = 28;

  // State for Profile info (Update Profile)
  const [profileData, setProfileData] = useState({
    name: 'Abhimanyu Kotari',
    usn: '1RUA24SCS0002',
    batch: '2024',
    course: 'B.Sc (Hons.) Computer Science',
    email: 'abhimanyukotari4@gmail.com',
    phone: '+91 98765 43210',
    address: 'Bengaluru, Karnataka, India'
  });
  const [profileSaved, setProfileSaved] = useState(false);

  // Event handler to toggle assignment status between Pending and Submitted
  const handleAssignmentSubmit = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/assignments/${id}/submit`, { method: 'PUT' });
    } catch {
      // Local fallback
    }
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, status: assignment.status === 'Pending' ? 'Submitted' : 'Pending' }
          : assignment
      )
    );
  };


  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    alert('Student profile details updated successfully!');
    setTimeout(() => setProfileSaved(false), 3000);
  };

  return (
    <div style={styles.container}>
      {/* Top Header Navigation */}
      <header style={styles.header}>
        <div>
          <h2 style={{ margin: 0, color: '#F2A900' }}>👨‍🎓 Student Portal View</h2>
          <span style={{ fontSize: '13px', color: '#e0e0e0' }}>
            Welcome, {profileData.name} ({profileData.usn})
          </span>
        </div>
        <button onClick={onBackToHome} style={styles.backBtn}>
          ← Back to Main Campus View
        </button>
      </header>

      {/* Portal Tab Navigation (Matches User Flow: Dashboard, View Notices, View Events, Submit Assignments, View Attendance, Update Profile) */}
      <div style={styles.tabContainer}>
        {[
          { key: 'dashboard', label: 'Dashboard' },
          { key: 'notices', label: 'View Notices' },
          { key: 'events', label: 'View Events' },
          { key: 'assignments', label: 'Submit Assignments' },
          { key: 'attendance', label: 'View Attendance' },
          { key: 'profile', label: 'Update Profile' }
        ].map((tab) => (
          <button
            key={tab.key}
            style={activeTab === tab.key ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Feature Content Area */}
      <div style={styles.contentCard}>
        {/* 1. DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <h3 style={styles.sectionHeading}>🎓 Student Academic Dashboard</h3>
            <p style={styles.subText}>
              B.Sc (Hons.) Computer Science • Batch 2024 • RV University
            </p>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>
                  {Math.round((attendanceCount / totalLectures) * 100)}%
                </span>
                <span style={styles.statLabel}>Attendance ({attendanceCount}/{totalLectures})</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>
                  {assignments.filter((a) => a.status === 'Pending').length}
                </span>
                <span style={styles.statLabel}>Pending Assignments</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>{notices.length}</span>
                <span style={styles.statLabel}>Active Notices</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statNumber}>{events.length}</span>
                <span style={styles.statLabel}>Upcoming Events</span>
              </div>
            </div>

            <div style={{ marginTop: '25px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button style={styles.actionBtn} onClick={() => setActiveTab('assignments')}>
                View Assignments ({assignments.filter((a) => a.status === 'Pending').length} Pending)
              </button>
              <button style={{ ...styles.actionBtn, backgroundColor: '#107c41' }} onClick={() => setActiveTab('attendance')}>
                Check Attendance
              </button>
              <button style={{ ...styles.actionBtn, backgroundColor: '#6a1b9a' }} onClick={() => setActiveTab('profile')}>
                View My Profile
              </button>
            </div>
          </div>
        )}

        {/* 2. VIEW NOTICES */}
        {activeTab === 'notices' && (
          <div>
            <h3 style={styles.sectionHeading}>📢 View Campus Notices</h3>
            <p style={styles.subText}>Official notifications from RV University and SOCSE</p>
            <ul style={styles.list}>
              {notices.map((item) => (
                <li key={item.id} style={styles.listItem}>
                  <div>
                    <strong>{item.title}</strong>
                    <p style={styles.subText}>{item.dept} • {item.date}</p>
                  </div>
                  <button
                    style={styles.smallBtn}
                    onClick={() => alert(`Notice: ${item.title}\nDepartment: ${item.dept}\nDate: ${item.date}`)}
                  >
                    View Details
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 3. VIEW EVENTS */}
        {activeTab === 'events' && (
          <div>
            <h3 style={styles.sectionHeading}>📅 View Upcoming Campus Events</h3>
            <p style={styles.subText}>Stay updated with university events, hackathons, and guest lectures</p>
            <ul style={styles.list}>
              {events.map((ev) => (
                <li key={ev.id} style={styles.listItem}>
                  <div>
                    <strong>{ev.title}</strong>
                    <p style={styles.subText}>Venue: {ev.venue} • Date: {ev.date}</p>
                  </div>
                  <span style={styles.badgeCategory}>{ev.category}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 4. SUBMIT ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div>
            <h3 style={styles.sectionHeading}>📝 Submit Assignments</h3>
            <p style={styles.subText}>Coursework tasks, laboratory assignments, and project submissions</p>
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

        {/* 5. VIEW ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div>
            <h3 style={styles.sectionHeading}>📊 View Attendance</h3>
            <p style={styles.subText}>Real-time lecture presence and academic attendance analytics</p>
            
            <div style={styles.attendanceBox}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#0A2240' }}>
                    Overall Attendance: {Math.round((attendanceCount / totalLectures) * 100)}%
                  </h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '13px' }}>
                    Attended {attendanceCount} out of {totalLectures} conducted lectures.
                  </p>
                </div>
                <button
                  onClick={() => setAttendanceCount((prev) => Math.min(prev + 1, totalLectures))}
                  style={{ ...styles.actionBtn, backgroundColor: '#107c41' }}
                >
                  Mark Present (+1)
                </button>
              </div>

              {/* Progress bar */}
              <div style={styles.progressBarTrack}>
                <div
                  style={{
                    ...styles.progressBarFill,
                    width: `${(attendanceCount / totalLectures) * 100}%`
                  }}
                />
              </div>
            </div>

            <h4 style={{ marginTop: '20px', color: '#0A2240' }}>Subject-wise Breakdown:</h4>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <span>CS3301 - Full Stack Development</span>
                <span style={styles.badgeSuccess}>90% (18/20)</span>
              </li>
              <li style={styles.listItem}>
                <span>CS3302 - Database Management Systems</span>
                <span style={styles.badgeSuccess}>85% (17/20)</span>
              </li>
              <li style={styles.listItem}>
                <span>CS3303 - Operating Systems</span>
                <span style={styles.badgePending}>80% (16/20)</span>
              </li>
            </ul>
          </div>
        )}

        {/* 6. UPDATE PROFILE */}
        {activeTab === 'profile' && (
          <div>
            <h3 style={styles.sectionHeading}>👤 Update Profile</h3>
            <p style={styles.subText}>Personal and academic details verified by RV University registrar</p>

            <div style={styles.profileCard}>
              <img
                src={profilePic}
                alt="Student Profile"
                style={styles.profileImage}
              />
              <div style={styles.profileDetails}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '20px', color: '#0A2240' }}>
                  {profileData.name}
                </h4>
                <div style={styles.profileGrid}>
                  <p style={styles.profileItem}>
                    <span style={styles.profileLabel}>USN:</span> <strong>{profileData.usn}</strong>
                  </p>
                  <p style={styles.profileItem}>
                    <span style={styles.profileLabel}>Batch:</span> <strong>{profileData.batch}</strong>
                  </p>
                  <p style={styles.profileItem}>
                    <span style={styles.profileLabel}>Course:</span> <strong>{profileData.course}</strong>
                  </p>
                  <p style={styles.profileItem}>
                    <span style={styles.profileLabel}>School:</span> School of Computer Science & Engineering
                  </p>
                  <p style={styles.profileItem}>
                    <span style={styles.profileLabel}>Institution:</span> RV University, Bengaluru
                  </p>
                  <p style={styles.profileItem}>
                    <span style={styles.profileLabel}>Status:</span> <span style={styles.badgeSuccess}>Enrolled / Active</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Editable Profile Information */}
            <h4 style={{ marginTop: '25px', color: '#0A2240' }}>Edit Contact Information:</h4>
            <form onSubmit={handleProfileUpdate} style={{ marginTop: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                <div>
                  <label style={styles.fieldLabel}>Email Address</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    style={styles.input}
                    required
                  />
                </div>
                <div>
                  <label style={styles.fieldLabel}>Phone Number</label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={styles.fieldLabel}>Residential Address</label>
                  <input
                    type="text"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button type="submit" style={styles.actionBtn}>
                  Save & Update Profile
                </button>
                {profileSaved && (
                  <span style={{ color: '#155724', fontWeight: 'bold', fontSize: '13px' }}>
                    ✓ Profile updated successfully!
                  </span>
                )}
              </div>
            </form>
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
  actionBtn: { backgroundColor: '#0A2240', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' },
  smallBtn: { backgroundColor: '#0A2240', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
  badgeSuccess: { backgroundColor: '#28a745', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  badgePending: { backgroundColor: '#ffc107', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  badgeCategory: { backgroundColor: '#e2e8f0', color: '#0A2240', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' },
  attendanceBox: { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginTop: '10px' },
  progressBarTrack: { width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '5px', overflow: 'hidden', marginTop: '12px' },
  progressBarFill: { height: '100%', backgroundColor: '#107c41', transition: 'width 0.3s ease' },
  profileCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  profileImage: {
    width: '120px',
    height: '145px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '3px solid #0A2240',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  profileDetails: {
    flex: 1,
    minWidth: '240px'
  },
  profileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '10px',
    marginTop: '6px'
  },
  profileItem: {
    margin: 0,
    fontSize: '13px',
    color: '#333'
  },
  profileLabel: {
    color: '#64748b',
    fontWeight: '600',
    marginRight: '6px'
  },
  fieldLabel: {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '4px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '13px',
    boxSizing: 'border-box'
  }
};