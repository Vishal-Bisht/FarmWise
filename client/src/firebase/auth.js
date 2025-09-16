import {
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase';

// Google Authentication
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  
  const result = await signInWithPopup(auth, provider);
  return result;
};

// Phone Authentication
export const setupRecaptcha = (containerId) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: (response) => {
      console.log('Recaptcha resolved');
    },
    'expired-callback': () => {
      console.log('Recaptcha expired');
    }
  });
};

export const doSignInWithPhone = async (phoneNumber, recaptchaVerifier) => {
  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};

// Sign Out
export const doSignOut = () => {
  return signOut(auth);
};

// Update User Profile
export const doUpdateProfile = async (user, profile) => {
  return updateProfile(user, profile);
};
