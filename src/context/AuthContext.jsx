// import { createContext, useContext, useEffect, useState } from 'react';

// const AuthContext = createContext();

// // Helper to get backend URL
// const getBackendUrl = () => {
//   // Use environment variable or fallback to Vercel deployment
//   const apiUrl = import.meta && import.meta.env && import.meta.env.VITE_API_URL
//     ? import.meta.env.VITE_API_URL
//     : 'https://quickart-backend-peach.vercel.app';

//   return apiUrl;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     try {
//       const apiUrl = getBackendUrl();

//       const response = await fetch(`${apiUrl}/api/me`, {
//         credentials: 'include'
//       });

//       if (response && response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//       } else {
//       }
//     } catch (err) {
//       console.error('Auth check failed:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const apiUrl = getBackendUrl();

//       const response = await fetch(`${apiUrl}/api/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ email, password }),
//       });

//       if (response && response.ok) {
//         const userData = await response.json();
//         setUser(userData);
//         return { success: true, user: userData };
//       } else if (response) {
//         const error = await response.json();
//         return { success: false, error: error.error };
//       } else {
//         return { success: false, error: 'Network error' };
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       return { success: false, error: 'Network error' };
//     }
//   };

//   const register = async (firstName, lastName, email, password) => {
//     try {
//       const apiUrl = getBackendUrl();

//       const response = await fetch(`${apiUrl}/api/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ firstName, lastName, email, password, role: 'user' }),
//       });

//       if (response && response.ok) {
//         // Don't automatically log in the user after signup
//         // Just return success without setting user state
//         return { success: true };
//       } else if (response) {
//         const error = await response.json();
//         return { success: false, error: error.error };
//       } else {
//         return { success: false, error: 'Network error' };
//       }
//     } catch (err) {
//       console.error('Register error:', err);
//       return { success: false, error: 'Network error' };
//     }
//   };

//   const updateUser = async (userData) => {
//     try {
//       const apiUrl = getBackendUrl();

//       const response = await fetch(`${apiUrl}/api/me`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify(userData),
//       });

//       if (response && response.ok) {
//         const updatedUser = await response.json();
//         setUser(updatedUser);
//         return { success: true, user: updatedUser };
//       } else if (response) {
//         const error = await response.json();
//         return { success: false, error: error.error };
//       } else {
//         return { success: false, error: 'Network error' };
//       }
//     } catch (err) {
//       console.error('Update error:', err);
//       return { success: false, error: 'Network error' };
//     }
//   };

//   const logout = async () => {
//     try {
//       const apiUrl = getBackendUrl();
//       await fetch(`${apiUrl}/api/logout`, {
//         method: 'POST',
//         credentials: 'include'
//       });
//     } catch (err) {
//       console.error('Logout failed:', err);
//     } finally {
//       setUser(null);
//       localStorage.removeItem('cart'); // Clear cart on logout
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, register, updateUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

 // Login function
  // const login = async (email, password) => {
  //   try {
  //     await signInWithEmailAndPassword(auth, email, password);
  //     return { success: true };
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     return { success: false, error: err.message };
  //   }
  // };


// 🔧 Updated AuthContext.jsx using Firebase Auth + Firestore
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateEmail,
  sendPasswordResetEmail, // ✅ added
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userRef = doc(db, "users", firebaseUser.uid);
          try {
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
              setUser({ uid: firebaseUser.uid, ...userDoc.data() });
            } else {
              setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
            }
          } catch (fetchErr) {
            console.error("Failed to fetch user doc:", fetchErr);
            setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("onAuthStateChanged handler error:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Signup function
  const register = async (firstName, lastName, email, password) => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCred.user.uid), {
        firstName,
        lastName,
        email,
        role: "user",
        createdAt: new Date(),
      });

      return { success: true };
    } catch (err) {
      return handleAuthError(err);
    }
  };

  // ✅ Login function
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (err) {
      return handleAuthError(err);
    }
  };

  // ✅ NEW: Forgot Password function
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err) {
      return handleAuthError(err);
    }
  };

  // ✅ Update user
  const updateUser = async (updatedData) => {
    try {
      const userRef = doc(db, "users", user.uid);
      if (updatedData.email && updatedData.email !== user.email) {
        await updateEmail(auth.currentUser, updatedData.email);
      }
      await updateDoc(userRef, updatedData);
      setUser((prev) => ({ ...prev, ...updatedData }));
      return { success: true };
    } catch (err) {
      return handleAuthError(err);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ✅ Centralized error handler
const handleAuthError = (err) => {
  let message = "Something went wrong. Please try again.";

  if (err.code) {
    switch (err.code) {
      case "auth/user-not-found":
        message = "No account found with this email.";
        break;
      case "auth/wrong-password":
        message = "Incorrect password. Please try again.";
        break;
      case "auth/invalid-credential":
        message = "Invalid email or password. Please check and try again.";
        break;
      case "auth/invalid-email":
        message = "Please enter a valid email address.";
        break;
      case "auth/email-already-in-use":
        message = "This email is already registered.";
        break;
      case "auth/weak-password":
        message = "Password should be at least 6 characters.";
        break;
      default:
        console.error("Unhandled Firebase error:", err);
        message = err.message; // fallback: show firebase message if not handled
    }
  } else {
    console.error("Unexpected error format:", err);
  }

    return { success: false, error: message };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        resetPassword, // ✅ Added to context
        updateUser,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
