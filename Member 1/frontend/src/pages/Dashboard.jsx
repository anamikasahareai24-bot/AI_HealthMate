import React from "react";
import {
  HeartHandshake,
  LockKeyhole,
  UserRound,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  FileHeart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  const userName = user?.name || "User";

  const healthSections = [
    {
      title: "Health Profile",
      description:
        "Manage your personal details, medical history and health information.",
      icon: UserRound,
      link: "/health-profile",
      className: "profile-card",
    },
    {
      title: "My Health",
      description:
        "View and manage your personal health information in one place.",
      icon: HeartHandshake,
      link: "/my-health",
      className: "health-card",
    },
    {
      title: "Medical Vault",
      description:
        "Keep your important medical reports and documents organized.",
      icon: FileHeart,
      link: "/medical-vault",
      className: "vault-card",
    },
  ];

  return (
    <div className="dashboard-page">

      {/* ================= HEADER ================= */}
      <section className="dashboard-header">
        <div className="welcome-area">
          <div className="user-avatar">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="dashboard-label">AI HEALTHMATE</p>

            <h1>Welcome back, {userName}</h1>

            <p className="welcome-text">
              Your personal healthcare companion is ready to help you.
            </p>
          </div>
        </div>

        <Link to="/profile" className="profile-btn">
          <UserRound size={18} />
          My Profile
        </Link>
      </section>
      {/* ================= MY HEALTH ================= */}
      <section className="dashboard-section">

        <div className="section-heading">
          <div>
            <span className="section-kicker">YOUR HEALTH</span>

            <h2>My Health</h2>

            <p>
              Manage your health information and important medical records.
            </p>
          </div>
        </div>

        <div className="health-grid">

          {healthSections.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                to={item.link}
                key={item.title}
                className={`health-card ${item.className}`}
              >
                <div className="health-icon">
                  <Icon size={24} />
                </div>

                <div className="health-card-content">
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>

                <div className="card-arrow">
                  <ChevronRight size={18} />
                </div>
              </Link>
            );
          })}

        </div>
      </section>

      {/* ================= SECURITY + ABOUT ================= */}
      <section className="dashboard-bottom">

        {/* Security */}
        <div className="info-card security-card">

          <div className="info-icon security-icon">
            <LockKeyhole size={24} />
          </div>

          <div className="info-content">
            <h3>Your privacy matters</h3>

            <p>
              Your health information is handled with privacy and security
              in mind.
            </p>
          </div>

          <div className="secure-badge">
            <ShieldCheck size={15} />
            Secure
          </div>

        </div>

        {/* About */}
        <div className="info-card about-card">

          <div className="info-icon about-icon">
            <HeartHandshake size={24} />
          </div>

          <div className="info-content">
            <h3>About AI HealthMate</h3>

            <p>
              A smart healthcare platform designed to make healthcare
              information easier to understand and manage.
            </p>
          </div>

          <Link to="/about" className="about-link">
            Learn More
            <ArrowRight size={16} />
          </Link>

        </div>

      </section>

      {/* ================= DISCLAIMER ================= */}
      <div className="dashboard-disclaimer">
        <strong>Important:</strong> AI HealthMate provides informational
        assistance and does not replace professional medical advice,
        diagnosis, or treatment.
      </div>

    </div>
  );
};

export default Dashboard;