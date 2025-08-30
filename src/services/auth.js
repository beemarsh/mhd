// Simple placeholder auth using localStorage

const AUTH_KEY = 'mhd_auth_user';

export function loginPlaceholder(email) {
  const user = { id: 'u_1', name: 'John Doe', email };
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export function logoutPlaceholder() {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}


