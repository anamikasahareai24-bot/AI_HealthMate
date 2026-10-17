import React from "react";
import { Link } from "react-router-dom";

import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Droplets,
  FileText,
  HeartPulse,
  Hospital,
  Pill,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import "./Home.css";

const features = [
  {
    icon: Brain,
    title: "Disease Prediction",
    text: "Analyze symptoms and explore AI-assisted health insights.",
    link: "/disease-prediction",
  },
  {
    icon: Pill,
    title: "Medicine Assistant",
    text: "Explore medicine information and useful safety details.",
    link: "/medicines",
  },
  {
    icon: FileText,
    title: "Report Analyzer",
    text: "Understand important information from your medical reports.",
    link: "/report-analyzer",
  },
  {
    icon: Hospital,
    title: "Healthcare Services",
    text: "Explore useful healthcare services and medical resources.",
    link: "/healthcare-services",
  },
  {
    icon: Droplets,
    title: "Blood Support",
    text: "Access blood-related support information and resources.",
    link: "/blood-support",
  },
];

function Home() {
  return (
    <div className="home-page">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-glow glow-one"></div>
        <div className="hero-glow glow-two"></div>

        <div className="hero-container">

          {/* LEFT */}

          <div className="hero-copy">

            <div className="hero-badge">
              <Sparkles size={15} />
              <span>AI-Powered Healthcare</span>
            </div>

            <h1>
              Healthcare that
              <br />
              <span>understands you.</span>
            </h1>

            <p className="hero-description">
              AI HealthMate brings smart healthcare tools together
              so you can explore symptoms, medicines, medical reports
              and healthcare resources from one simple platform.
            </p>

            <div className="hero-actions">

              <Link
                to="/disease-prediction"
                className="main-action"
              >
                <Brain size={18} />
                Check Your Symptoms
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/dashboard"
                className="outline-action"
              >
                Explore Dashboard
              </Link>

            </div>

            <div className="hero-points">

              <div>
                <CheckCircle2 size={17} />
                Easy to use
              </div>

              <div>
                <ShieldCheck size={17} />
                Privacy focused
              </div>

              <div>
                <Activity size={17} />
                AI assisted
              </div>

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="hero-visual">

            <div className="visual-ring ring-one"></div>
            <div className="visual-ring ring-two"></div>

            <div className="health-panel">

              <div className="panel-header">

                <div className="panel-brand">

                  <div className="brand-mark">
                    <HeartPulse size={19} />
                  </div>

                  <div>
                    <small>AI HEALTHMATE</small>
                    <strong>Health Center</strong>
                  </div>

                </div>

                <div className="online-status">
                  <span></span>
                  Active
                </div>

              </div>


              <div className="health-main">

                <div className="health-score">

                  <div className="score-circle">

                    <HeartPulse size={21} />

                    <strong>82</strong>

                    <small>Health Score</small>

                  </div>

                </div>


                <div className="health-details">

                  <span className="detail-label">
                    YOUR HEALTH PROFILE
                  </span>

                  <h3>Looking good</h3>

                  <div className="score-bar">
                    <span></span>
                  </div>

                  <p>
                    Your health information is organized
                    and ready to explore.
                  </p>

                </div>

              </div>


              <div className="quick-tools">

                <div className="quick-tool">
                  <Activity size={18} />
                  <div>
                    <b>Vitals</b>
                    <small>Updated</small>
                  </div>
                </div>

                <div className="quick-tool">
                  <Pill size={18} />
                  <div>
                    <b>Medicines</b>
                    <small>Active</small>
                  </div>
                </div>

                <div className="quick-tool">
                  <FileText size={18} />
                  <div>
                    <b>Reports</b>
                    <small>Saved</small>
                  </div>
                </div>

              </div>

            </div>
            {/* FLOATING SECURITY */}

            <div className="floating-info info-two">

              <div className="floating-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <b>Protected</b>
                <span>Your data matters</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="feature-section">

        <div className="feature-intro">

          <div className="eyebrow">
            <Stethoscope size={15} />
            SMART HEALTHCARE
          </div>

          <h2>
            Everything you need,
            <span> in one place.</span>
          </h2>

          <p>
            Choose from a collection of healthcare tools designed
            to make your health information easier to access.
          </p>

        </div>


        <div className="feature-grid">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <Link
                key={feature.title}
                to={feature.link}
                className="feature-box"
              >

                <div className="feature-number">
                  0{index + 1}
                </div>

                <div className="feature-icon">
                  <Icon size={23} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.text}</p>

                <div className="feature-link">
                  Explore
                  <ChevronRight size={16} />
                </div>

              </Link>
            );

          })}

        </div>

      </section>


      {/* SMART SECTION */}

      <section className="smart-section">

        <div className="smart-container">

          <div className="smart-content">

            <div className="eyebrow">
              <HeartPulse size={15} />
              ONE SMART PLATFORM
            </div>

            <h2>
              Make healthcare
              <br />
              <span>simpler.</span>
            </h2>

            <p>
              AI HealthMate connects multiple healthcare utilities
              through a clean and easy-to-use interface.
            </p>

            <div className="smart-list">

              <div>
                <CheckCircle2 size={17} />
                Simple healthcare experience
              </div>

              <div>
                <CheckCircle2 size={17} />
                AI-assisted information
              </div>

              <div>
                <CheckCircle2 size={17} />
                Medical reports and medicines
              </div>

              <div>
                <CheckCircle2 size={17} />
                Healthcare resources in one place
              </div>

            </div>

          </div>


          <div className="smart-visual">

            <div className="smart-circle">

              <div className="smart-center">
                <HeartPulse size={42} />
                <strong>Health</strong>
                <small>At your fingertips</small>
              </div>

            </div>

            <div className="smart-chip chip-one">
              <Brain size={17} />
              AI Insights
            </div>

            <div className="smart-chip chip-two">
              <FileText size={17} />
              Reports
            </div>

            <div className="smart-chip chip-three">
              <Pill size={17} />
              Medicines
            </div>

          </div>

        </div>

      </section>


      {/* CTA */}

      <section className="final-section">

        <div className="final-icon">
          <HeartPulse size={28} />
        </div>

        <h2>
          Your health journey
          <br />
          starts here.
        </h2>

        <p>
          Explore AI HealthMate and discover a simpler
          way to access your healthcare tools.
        </p>

        <Link
          to="/dashboard"
          className="main-action final-button"
        >
          Get Started
          <ArrowRight size={18} />
        </Link>

      </section>


      {/* FOOTER */}

      <footer className="health-footer">

        <div>
          <HeartPulse size={17} />
          <span>AI HealthMate</span>
        </div>

        <p>
          Healthcare information made simpler with AI.
        </p>

      </footer>


      <div className="medical-disclaimer">

        <ShieldCheck size={15} />

        AI HealthMate provides informational assistance
        and does not replace professional medical advice,
        diagnosis or treatment.

      </div>

    </div>
  );
}

export default Home;