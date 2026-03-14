import React, { useCallback, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthContext";

let authRuntimePromise;

const loadAuthRuntime = async () => {
  if (!authRuntimePromise) {
    authRuntimePromise = Promise.all([
      import("../firebase/firebase.config"),
      import("firebase/auth"),
    ]).then(([firebaseConfigModule, firebaseAuthModule]) => ({
      auth: firebaseConfigModule.auth,
      ...firebaseAuthModule,
    }));
  }

  return authRuntimePromise;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);
  const unsubscribeRef = useRef(() => { });
  const authInitPromiseRef = useRef(null);

  const ensureAuthInitialized = useCallback(async () => {
    if (authInitPromiseRef.current) {
      return authInitPromiseRef.current;
    }

    setAuthLoading(true);

    authInitPromiseRef.current = loadAuthRuntime()
      .then(({ auth, onAuthStateChanged }) =>
        new Promise((resolve, reject) => {
          unsubscribeRef.current = onAuthStateChanged(
            auth,
            (currentUser) => {
              setUser(currentUser);
              setAuthLoading(false);
              setAuthInitialized(true);
              resolve(currentUser);
            },
            (error) => {
              console.error("Failed to restore Firebase auth state:", error);
              setAuthLoading(false);
              setAuthInitialized(true);
              reject(error);
            }
          );
        })
      )
      .catch((error) => {
        console.error("Failed to initialize Firebase auth:", error);
        setAuthLoading(false);
        setAuthInitialized(true);
        throw error;
      });

    return authInitPromiseRef.current;
  }, []);

  const registerUser = async (email, password) => {
    setLoading(true);
    const { auth, createUserWithEmailAndPassword } = await loadAuthRuntime();
    const result = await createUserWithEmailAndPassword(auth, email, password);
    setUser(result.user);
    return result;
  };

  const updateUser = async (updateData) => {
    const { auth, updateProfile } = await loadAuthRuntime();
    return updateProfile(auth.currentUser, updateData);
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    const { auth, signInWithEmailAndPassword } = await loadAuthRuntime();
    const result = await signInWithEmailAndPassword(auth, email, password);
    setUser(result.user);
    return result;
  };

  const googleLogin = async () => {
    setLoading(true);
    const { auth, GoogleAuthProvider, signInWithPopup } = await loadAuthRuntime();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    return result;
  };

  const logoutUser = async () => {
    const { auth, signOut } = await loadAuthRuntime();
    return signOut(auth)
      .then(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    let idleCallbackId;
    let timeoutId;
    const currentPath = window.location.pathname;
    const shouldInitializeImmediately = /^\/(login|register|dashboard)(\/|$)/.test(currentPath);

    if (shouldInitializeImmediately) {
      ensureAuthInitialized().catch(() => { });
    } else if ("requestIdleCallback" in window) {
      idleCallbackId = window.requestIdleCallback(() => {
        ensureAuthInitialized().catch(() => { });
      }, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(() => {
        ensureAuthInitialized().catch(() => { });
      }, 1500);
    }

    return () => {
      unsubscribeRef.current();

      if (idleCallbackId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [ensureAuthInitialized]);

  const userInfo = {
    user,
    setUser,
    loading,
    authLoading,
    authInitialized,
    setLoading,
    ensureAuthInitialized,
    registerUser,
    updateUser,
    loginUser,
    googleLogin,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;