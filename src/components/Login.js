
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { FaEye, FaGoogle, FaLinkedin, FaUser, FaLock } from "react-icons/fa";
import { auth, db } from "../services/firebase";
import loginImage from "../assets/loginimage.png";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      // ✅ Firebase login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Fetch role from Realtime Database
      const snapshot = await get(ref(db, "users/" + user.uid));
      if (!snapshot.exists()) throw new Error("User not found in database");

      const userData = snapshot.val();
      localStorage.setItem("role", userData.role);

      // ✅ Redirect based on role
      window.location.href = userData.role === "admin" ? "/admin" : "/customer";
    } catch (err) {
      alert("❌ Login failed! " + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg"></div>

      <div className="login-card" style={{ backgroundImage: `url(${loginImage})` }}>
        <div className="login-overlay">
          <h2>GeoLoyaltyAI</h2>

          {/* Email */}
          <div className="input-group">
            <FaUser className="input-icon" />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <FaLock className="input-icon" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
            <FaEye className="eye-icon" onClick={() => setShowPassword(!showPassword)} />
          </div>

          <p className="forgot-link" onClick={() => alert("Reset password flow")}>
            Forgot Password?
          </p>

          {/* Login Button */}
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          {/* Social Buttons */}
          <div className="social-login">
            <button className="google-btn"><FaGoogle /> Google</button>
            <button className="linkedin-btn"><FaLinkedin /> LinkedIn</button>
          </div>

          <p className="register-link" onClick={() => window.location.href="/register"}>
            Don't have an account? Register
          </p>
        </div>
      </div>
    </div>
  );
}
