import React, { useState } from "react";
import {
  HeartPulse,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

import "./Auth.css";

function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  const { signin, signup } = useAuth();

  const [mode, setMode] = useState("signin");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const redirectTo = location.state?.from || "/profile";

  // ================================
  // FORM SUBMIT
  // ================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // SIGN UP VALIDATION
    if (mode === "signup" && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    let result;

    // SIGN UP
    if (mode === "signup") {
      result = signup({
        name,
        email,
        password,
      });
    }

    // SIGN IN
    else {
      result = signin({
        email,
        password,
      });
    }

    // ERROR
    if (!result.success) {
      setError(result.message);
      return;
    }

    // SUCCESS
    navigate(redirectTo, {
      replace: true,
    });
  };


  // ================================
  // SWITCH SIGN IN / SIGN UP
  // ================================

  const switchMode = () => {
    setError("");

    setName("");
    setEmail("");
    setPassword("");

    setShowPassword(false);

    setMode(
      mode === "signin"
        ? "signup"
        : "signin"
    );
  };


  return (
    <div className="auth-page">

      <div className="auth-card">


        {/* ==================================
            LEFT BRAND SECTION
        ================================== */}

        <div className="auth-brand-section">

          <div className="auth-brand-content">

            <div className="auth-logo">
              <HeartPulse size={34} />
            </div>

            <h1>
              AI HealthMate
            </h1>

            <p>
              Smart Healthcare
            </p>


            <div className="auth-brand-heart">

              <HeartPulse size={18} />

              <span>
                Your health,
                <br />
                organized.
              </span>

            </div>


            <div className="auth-brand-description">

              <p>
                Manage your health information,
                medical reports and healthcare
                tools from one simple platform.
              </p>

            </div>

          </div>

        </div>


        {/* ==================================
            RIGHT FORM SECTION
        ================================== */}

        <div className="auth-form-section">


          {/* HEADING */}

          <div className="auth-heading">

            <div className="auth-small-title">

              {mode === "signin"
                ? "WELCOME BACK"
                : "GET STARTED"}

            </div>


            <h2>

              {mode === "signin"
                ? "Sign in to your account"
                : "Create your account"}

            </h2>


            <p>

              {mode === "signin"
                ? "Access your personal healthcare dashboard."
                : "Create your AI HealthMate healthcare account."}

            </p>

          </div>


          {/* ==================================
              FORM
          ================================== */}

          <form onSubmit={handleSubmit}>


            {/* NAME */}

            {mode === "signup" && (

              <div className="auth-field">

                <label>
                  Full Name
                </label>

                <div className="auth-input">

                  <User size={17} />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                </div>

              </div>

            )}


            {/* EMAIL */}

            <div className="auth-field">

              <label>
                Email Address
              </label>

              <div className="auth-input">

                <Mail size={17} />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="auth-field">

              <label>
                Password
              </label>

              <div className="auth-input">

                <Lock size={17} />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />


                <button
                  type="button"
                  className="auth-eye"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label="Toggle password visibility"
                >

                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}

                </button>

              </div>

            </div>


            {/* PASSWORD INFO */}

            {mode === "signup" && (

              <div className="auth-password-info">

                Password must contain at least
                6 characters.

              </div>

            )}


            {/* ERROR */}

            {error && (

              <div className="auth-error">

                {error}

              </div>

            )}


            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="auth-submit"
            >

              <span>

                {mode === "signin"
                  ? "Sign In"
                  : "Create Account"}

              </span>

              <ArrowRight size={16} />

            </button>

          </form>


          {/* ==================================
              SWITCH
          ================================== */}

          <div className="auth-switch">

            <span>

              {mode === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}

            </span>


            <button
              type="button"
              onClick={switchMode}
            >

              {mode === "signin"
                ? "Sign Up"
                : "Sign In"}

            </button>

          </div>


          {/* ==================================
              SECURITY
          ================================== */}

          <div className="auth-security">

            <div className="auth-security-icon">

              <ShieldCheck size={16} />

            </div>

            <div>

              <strong>
                HealthMate Security
              </strong>

              <span>
                Your healthcare experience is designed
                with privacy and responsible use in mind.
              </span>

            </div>

          </div>


          {/* ==================================
              BACK HOME
          ================================== */}

          <button
            type="button"
            className="auth-home"
            onClick={() => navigate("/")}
          >

            ← Back to Home

          </button>


        </div>

      </div>

    </div>
  );
}

export default Auth;