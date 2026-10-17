import React from "react";
import {
  HeartPulse,
  Brain,
  ShieldCheck,
  Activity,
  FileText,
  Hospital,
  Pill,
  Droplets,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import "./About.css";

function About() {
  const features = [
    {
      icon: Brain,
      title: "AI Health Assistant",
      text: "Get health-related information and guidance through an easy-to-use AI assistant.",
    },
    {
      icon: Pill,
      title: "Medicine Assistant",
      text: "Keep medicine-related information organized and easier to access.",
    },
    {
      icon: FileText,
      title: "Report Analyzer",
      text: "Upload medical reports and view extracted information in a readable format.",
    },
    {
      icon: Hospital,
      title: "Nearby Healthcare",
      text: "Explore healthcare services and useful medical resources.",
    },
    {
      icon: Droplets,
      title: "Blood Support",
      text: "Access blood-support related features from one dedicated place.",
    },
    {
      icon: Activity,
      title: "Health Tracking",
      text: "Keep track of important health-related information over time.",
    },
  ];

  return (
    <div className="about-page">

      {/* ================= HERO ================= */}

      <section className="about-hero">

        <div className="about-hero-content">

          <div className="about-eyebrow">
            <Sparkles size={14} />
            ABOUT AI HEALTHMATE
          </div>

          <h1>
            Healthcare made
            <span> simpler.</span>
          </h1>

          <p>
            AI HealthMate is a smart healthcare platform designed
            to bring useful health tools, medical information and
            personal health management features together in one place.
          </p>

          <div className="about-hero-buttons">

            <a href="/dashboard" className="about-primary-btn">
              Explore Dashboard
              <ArrowRight size={15} />
            </a>

            <a href="/health-profile" className="about-secondary-btn">
              Health Profile
            </a>

          </div>

        </div>


        {/* HEART VISUAL */}

        <div className="about-heart-area">

          <div className="heart-glow"></div>

          <div className="about-heart-card">

            <HeartPulse size={62} />

          </div>

          <div className="heart-floating-card">

            <CheckCircle2 size={16} />

            <div>
              <strong>HealthMate</strong>
              <span>Smart healthcare</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= INTRO ================= */}

      <section className="about-intro">

        <div className="about-section-label">
          OUR PURPOSE
        </div>

        <h2>
          One place for your
          <span> health journey.</span>
        </h2>

        <p>
          Managing health information can sometimes feel complicated.
          AI HealthMate brings different healthcare-related tools
          together so that users can access, organize and understand
          their health information through a simple interface.
        </p>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="about-features">

        <div className="about-section-heading">

          <div>
            <div className="about-section-label">
              WHAT YOU CAN DO
            </div>

            <h2>
              Everything in one
              <span> place.</span>
            </h2>
          </div>

          <p>
            Explore the different healthcare features available
            inside AI HealthMate.
          </p>

        </div>


        <div className="features-grid">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <div
                className="about-feature-card"
                key={index}
              >

                <div className="feature-icon">
                  <Icon size={21} />
                </div>

                <div className="feature-number">
                  0{index + 1}
                </div>

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.text}
                </p>

              </div>
            );

          })}

        </div>

      </section>


      {/* ================= VALUES ================= */}

      <section className="about-values">

        <div className="values-content">

          <div className="about-section-label">
            DESIGNED WITH CARE
          </div>

          <h2>
            Technology with a
            <span> human touch.</span>
          </h2>

          <p>
            AI HealthMate focuses on making healthcare-related
            technology easier to understand and simpler to use.
            The platform is designed around accessibility,
            organization and a clean user experience.
          </p>


          <div className="value-list">

            <div className="value-item">

              <div className="value-check">
                <CheckCircle2 size={17} />
              </div>

              <div>
                <strong>
                  Simple experience
                </strong>

                <span>
                  Clean interfaces designed to make features easy to navigate.
                </span>
              </div>

            </div>


            <div className="value-item">

              <div className="value-check">
                <CheckCircle2 size={17} />
              </div>

              <div>
                <strong>
                  Organized health information
                </strong>

                <span>
                  Keep important healthcare information and documents together.
                </span>
              </div>

            </div>


            <div className="value-item">

              <div className="value-check">
                <CheckCircle2 size={17} />
              </div>

              <div>
                <strong>
                  User-focused design
                </strong>

                <span>
                  Built around a straightforward and accessible experience.
                </span>
              </div>

            </div>

          </div>

        </div>


        <div className="values-visual">

          <div className="values-circle">

            <HeartPulse size={58} />

            <span>
              AI
              <br />
              HealthMate
            </span>

          </div>

        </div>

      </section>


      {/* ================= SAFETY ================= */}

      <section className="about-safety">

        <div className="safety-icon">
          <ShieldCheck size={25} />
        </div>

        <div className="safety-content">

          <div className="about-section-label">
            IMPORTANT
          </div>

          <h2>
            Health information should be handled responsibly.
          </h2>

          <p>
            AI-generated information and digital healthcare tools
            are intended to support education and organization.
            They should not be considered a replacement for a
            qualified healthcare professional, diagnosis or
            emergency medical care.
          </p>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="about-cta">

        <div className="cta-heart">
          <HeartPulse size={30} />
        </div>

        <h2>
          Your health journey,
          <span> organized.</span>
        </h2>

        <p>
          Explore AI HealthMate and discover the healthcare tools
          available to you.
        </p>

        <a
          href="/dashboard"
          className="about-cta-btn"
        >
          Go to Dashboard
          <ArrowRight size={15} />
        </a>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="about-footer">

        <div className="footer-logo">

          <div>
            <HeartPulse size={19} />
          </div>

          <strong>
            AI HealthMate
          </strong>

        </div>

        <p>
          Smart Healthcare • Designed for a simpler experience
        </p>

      </footer>

    </div>
  );
}

export default About;