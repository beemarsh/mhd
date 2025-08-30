import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const passwordsMatch = password && confirm && password === confirm;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    console.log('Create account', { name, email });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="app-icon">✨</div>
          <h1>Create account</h1>
          <p className="subtitle">Join to get started</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ada Lovelace"
            required
            autoComplete="name"
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />

          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="new-password"
              minLength={8}
            />
            <button
              type="button"
              className="link small"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <label htmlFor="confirm">Confirm password</label>
          <input
            id="confirm"
            type={showPassword ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="new-password"
            minLength={8}
          />
          {!passwordsMatch && confirm && (
            <div className="error">Passwords do not match</div>
          )}

          <button className="primary" type="submit" disabled={!passwordsMatch}>
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <Link className="link" to="/">Already have an account? Sign in</Link>
        </div>
      </div>
    </div>
  );
}


