import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
              <button className="menu-item" role="menuitem" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <aside className={`dash-sidebar ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)}>
        <nav className="nav-list" onClick={(e) => e.stopPropagation()}>
          <div className="nav-header">Hello, {user?.name || 'User'}</div>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="nav-item">{s.label}</a>
          ))}
        </nav>
      </aside>

      <main className="dash-content">
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="card">
            <h2>{s.label}</h2>
            <p>Placeholder content for {s.label}.</p>
          </section>
        ))}
      </main>
    </div>
  );
}


