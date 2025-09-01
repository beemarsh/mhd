import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updatePassword,
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Email/Password Authentication
export async function loginWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

export async function createAccountWithEmail(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Send email verification
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}

// Google Authentication
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
}

// Logout
export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
}

// Auth State Listener
export function onAuthStateChange(callback) {
  return onAuthStateChanged(auth, callback);
}

// Password Management
export async function changePassword(newPassword) {
  try {
    const user = auth.currentUser;
    if (user) {
      await updatePassword(user, newPassword);
    } else {
      throw new Error('No user is currently signed in');
    }
  } catch (error) {
    throw error;
  }
}

export async function sendPasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
}

// Email Verification
export async function sendEmailVerificationToUser() {
  try {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
    } else {
      throw new Error('No user is currently signed in');
    }
  } catch (error) {
    throw error;
  }
}

// Get current user
export function getCurrentUser() {
  return auth.currentUser;
}


