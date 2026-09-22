import React, { useState, useEffect } from 'react';

export default function AuthModule({ activeTab, setActiveTab, initialMode = 'login', onSelectRole }) {
  const [internalMode, setInternalMode] = useState(
    activeTab ? activeTab === 'login' : initialMode === 'login'
  );
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' | 'faculty'

  useEffect(() => {
    if (activeTab) {
      setInternalMode(activeTab === 'login');
    }
  }, [activeTab]);

  const isLogin = activeTab !== undefined ? activeTab === 'login' : internalMode;

  const setLoginMode = (login) => {
    setInternalMode(login);
    if (setActiveTab) {
      setActiveTab(login ? 'login' : 'register');
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      alert(`Logging in as ${selectedRole === 'student' ? 'Student' : 'Faculty Member'}: ${formData.email}`);
      if (selectedRole === 'faculty') {
        window.location.hash = '#faculty';
      } else {
        window.location.hash = '#student';
      }
    } else {
      alert(`New ${selectedRole === 'student' ? 'Student' : 'Faculty'} Registered: ${formData.name}`);
      setLoginMode(true);
    }
  };

  return (
    <div style={styles.cardContainer}>
      <div style={styles.header}>
        <h1 style={styles.title}>RV UNIVERSITY</h1>
        <p style={styles.subtitle}>Excellence in Education</p>
      </div>

      <h2 style={styles.formTitle}>
        {isLogin ? 'Portal Authentication' : 'Create New Account'}
      </h2>

      {/* Role Selection (Step 3 in User Flow) */}
      <div style={{ marginBottom: '16px' }}>
        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '8px' }}>
          SELECT ROLE:
        </span>
        <div style={styles.roleContainer}>
          <button
            type="button"
            style={selectedRole === 'student' ? styles.roleBtnActive : styles.roleBtn}
            onClick={() => setSelectedRole('student')}
          >
            👨‍🎓 Student
          </button>
          <button
            type="button"
            style={selectedRole === 'faculty' ? styles.roleBtnActive : styles.roleBtn}
            onClick={() => setSelectedRole('faculty')}
          >
            👨‍🏫 Faculty
          </button>
        </div>
      </div>

      <div style={styles.tabContainer}>
        <button
          type="button"
          style={isLogin ? styles.activeTab : styles.inactiveTab}
          onClick={() => setLoginMode(true)}
        >
          Login
        </button>

        <button
          type="button"
          style={!isLogin ? styles.activeTab : styles.inactiveTab}
          onClick={() => setLoginMode(false)}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder={selectedRole === 'student' ? 'Full Name (e.g. Abhimanyu Kotari)' : 'Full Name (e.g. Dr. Raman)'}
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder={selectedRole === 'student' ? 'RVU Student Email (e.g. student@rvu.edu.in)' : 'RVU Faculty Email (e.g. faculty@rvu.edu.in)'}
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.submitBtn}>
          {isLogin ? `Sign In as ${selectedRole === 'student' ? 'Student' : 'Faculty'}` : 'Register Account'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  cardContainer: {
    maxWidth: '420px',
    margin: '30px auto',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif'
  },

  header: {
    backgroundColor: '#0A2240',
    padding: '16px',
    borderRadius: '6px',
    marginBottom: '20px'
  },

  title: {
    color: '#F2A900',
    margin: 0,
    fontSize: '22px',
    letterSpacing: '1px'
  },

  subtitle: {
    color: '#ffffff',
    margin: '4px 0 0 0',
    fontSize: '12px'
  },

  formTitle: {
    color: '#0A2240',
    fontSize: '18px',
    marginBottom: '15px'
  },

  roleContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center'
  },

  roleBtn: {
    flex: 1,
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    color: '#475569',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '13px',
    transition: 'all 0.2s'
  },

  roleBtnActive: {
    flex: 1,
    padding: '10px',
    borderRadius: '6px',
    border: '2px solid #0A2240',
    backgroundColor: '#0A2240',
    color: '#F2A900',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '13px'
  },

  tabContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px'
  },

  activeTab: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#0A2240',
    color: '#F2A900',
    border: 'none',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer'
  },

  inactiveTab: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#e0e0e0',
    color: '#333333',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },

  input: {
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #cccccc',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },

  submitBtn: {
    padding: '12px',
    backgroundColor: '#F2A900',
    color: '#0A2240',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer'
  }
};