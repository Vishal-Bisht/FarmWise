import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase';

// Google Authentication with Popup (primary method)
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  
  // Add custom parameters to prevent issues
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    // If popup fails, try redirect as fallback
    if (error.code === 'auth/popup-blocked' || error.code === 'auth/popup-closed-by-user') {
      throw new Error('FALLBACK_TO_REDIRECT');
    }
    throw error;
  }
};

// Google Authentication with Redirect (fallback method)
export const doSignInWithGoogleRedirect = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  
  await signInWithRedirect(auth, provider);
};

// Get redirect result
export const getGoogleRedirectResult = async () => {
  return await getRedirectResult(auth);
};

// Phone Authentication
export const setupRecaptcha = (containerId) => {
  // Clear any existing recaptcha in the container
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
  }

  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: (response) => {
      console.log('Recaptcha resolved');
    },
    'expired-callback': () => {
      console.log('Recaptcha expired');
    },
    'error-callback': (error) => {
      console.log('Recaptcha error:', error);
    }
  });
};

export const doSignInWithPhone = async (phoneNumber, recaptchaVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};

// Clean up RecaptchaVerifier
export const clearRecaptcha = (recaptchaVerifier) => {
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear();
    } catch (error) {
      console.log('Error clearing recaptcha:', error);
    }
  }
};

// Sign Out
export const doSignOut = () => {
  return signOut(auth);
};

// Update User Profile
export const doUpdateProfile = async (user, profile) => {
  return updateProfile(user, profile);
};
