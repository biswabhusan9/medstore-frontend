// import { useState } from "react";
// import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../firebase/config";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);

//     if (!email) {
//       setError("Please enter your email address.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await sendPasswordResetEmail(auth, email);
//       setMessage("✅ Password reset link sent! Check your email.");
//       setTimeout(() => navigate("/login"), 3000); // redirect after 3 sec
//     } catch (err) {
//       console.error("Password reset error:", err);
//       if (err.code === "auth/user-not-found") {
//         setError("No user found with this email.");
//       } else if (err.code === "auth/invalid-email") {
//         setError("Please enter a valid email address.");
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[80vh] px-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
//         <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
//         <p className="text-gray-500 text-center mb-6">
//           Enter your registered email and we will send you a reset link.
//         </p>

//         {/* Error or success messages */}
//         {error && (
//           <p className="text-red-500 text-center font-medium animate-bounce mb-4">
//             {error}
//           </p>
//         )}
//         {message && (
//           <p className="text-green-600 text-center font-medium animate-bounce mb-4">
//             {message}
//           </p>
//         )}

//         <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
//           <input
//             type="email"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send Reset Link"}
//           </button>
//         </form>

//         <p
//           className="text-sm text-center text-red-500 mt-4 cursor-pointer hover:underline"
//           onClick={() => navigate("/login")}
//         >
//           ← Back to Login
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Debug logs to check what’s happening
      console.log("📨 Attempting password reset for:", email);

      await sendPasswordResetEmail(auth, email);

      console.log("✅ Reset email successfully triggered for:", email);

      setMessage("✅ Password reset link sent! Check your email.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      console.error("❌ Password reset error:", err.code, err.message);

      if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your registered email and we will send you a reset link.
        </p>

        {/* Error or success messages */}
        {error && (
          <p className="text-red-500 text-center font-medium animate-bounce mb-4">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-600 text-center font-medium animate-bounce mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p
          className="text-sm text-center text-red-500 mt-4 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          ← Back to Login
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
