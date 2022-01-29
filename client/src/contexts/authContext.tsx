import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@firebase/auth-types';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

type AuthContent = {
  currentUser: User | null,
  loginWithGoogle: any,
  signup: any,
  login: any,
  signout: any,
  resetPassword: any
};

const provider = new GoogleAuthProvider();

const AuthContext = createContext({} as AuthContent);

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = (email: string, password:string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const loginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  }

  const login = (email: string, password:string) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signout = () => {
    return signOut(auth);
  }

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loginWithGoogle,
    signup,
    login,
    signout,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
