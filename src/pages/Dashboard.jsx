import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './dashboard.css';

export default function Dashboard() {
  const { user, logout, updatePassword, verifyEmail } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    try {
      await updatePassword(passwordData.newPassword);
      setPasswordSuccess('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
    } catch (error) {
      setPasswordError(getPasswordErrorMessage(error.code));
    }
  };

  const handleEmailVerification = async () => {
    try {
      await verifyEmail();
      setEmailMessage('Verification email sent! Please check your inbox.');
    } catch (error) {
      setEmailMessage('Failed to send verification email. Please try again.');
    }
  };

  const getPasswordErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/requires-recent-login':
        return 'Please sign out and sign in again before changing your password.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      default:
        return 'Failed to update password. Please try again.';
    }
  };

  const sections = [
    { id: 'profile', label: 'Profile' },
    { id: 'settings', label: 'Settings' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
    { id: 'billing', label: 'Billing' },
    { id: 'integrations', label: 'Integrations' },
  ];

  return (
    <div className="dash-root">
      <header className="dash-topbar">
        <button className="menu-btn" onClick={() => setDrawerOpen((v) => !v)} aria-label="Toggle menu">☰</button>
        <div className="dash-title">Dashboard</div>
        <div className="avatar-wrap" ref={menuRef}>
          <button className="avatar" onClick={() => setMenuOpen((v) => !v)} aria-haspopup="menu" aria-expanded={menuOpen}>
            {user?.name?.[0] || 'U'}
          </button>
          {menuOpen && (
            <div className="profile-menu" role="menu">
              <div className="profile-row">
                <div className="avatar small">{user?.name?.[0] || 'U'}</div>
                <div className="identity">
                  <div className="name">{user?.name || 'User'}</div>
                  <div className="email">{user?.email}</div>
                </div>
              </div>
              <button className="menu-item" role="menuitem" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <aside className={`dash-sidebar ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)}>
        <nav className="nav-list" onClick={(e) => e.stopPropagation()}>
          <div className="nav-header">Hello, {user?.displayName || user?.email || 'User'}</div>
          {sections.map((s) => (
            <button 
              key={s.id} 
              className={`nav-item ${activeSection === s.id ? 'active' : ''}`}
              onClick={() => setActiveSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="dash-content">
        {activeSection === 'profile' && (
          <section className="card">
            <h2>Profile</h2>
            <div className="profile-info">
              <div className="info-item">
                <label>Name:</label>
                <span>{user?.displayName || 'Not set'}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{user?.email}</span>
              </div>
              <div className="info-item">
                <label>Email Verified:</label>
                <span className={user?.emailVerified ? 'verified' : 'unverified'}>
                  {user?.emailVerified ? '✓ Verified' : '✗ Unverified'}
                </span>
              </div>
              {!user?.emailVerified && (
                <div className="verification-section">
                  <p>Your email is not verified. Please verify your email to access all features.</p>
                  <button className="primary" onClick={handleEmailVerification}>
                    Send Verification Email
                  </button>
                  {emailMessage && (
                    <div className={`message ${emailMessage.includes('sent') ? 'success' : 'error'}`}>
                      {emailMessage}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {activeSection === 'security' && (
          <section className="card">
            <h2>Security</h2>
            <div className="security-section">
              <h3>Change Password</h3>
              {!showPasswordForm ? (
                <button className="primary" onClick={() => setShowPasswordForm(true)}>
                  Change Password
                </button>
              ) : (
                <form onSubmit={handlePasswordChange} className="password-form">
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      placeholder="Enter new password"
                      minLength={6}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      placeholder="Confirm new password"
                      minLength={6}
                      required
                    />
                  </div>
                  {passwordError && (
                    <div className="error-message">{passwordError}</div>
                  )}
                  {passwordSuccess && (
                    <div className="success-message">{passwordSuccess}</div>
                  )}
                  <div className="form-actions">
                    <button type="submit" className="primary">Update Password</button>
                    <button 
                      type="button" 
                      className="secondary" 
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({currentPassword: '', newPassword: '', confirmPassword: ''});
                        setPasswordError('');
                        setPasswordSuccess('');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </section>
        )}

        {activeSection !== 'profile' && activeSection !== 'security' && (
          <section className="card">
            <h2>{sections.find(s => s.id === activeSection)?.label}</h2>
            <p>Placeholder content for {sections.find(s => s.id === activeSection)?.label}.</p>
          </section>
        )}
      </main>
    </div>
  );
}


