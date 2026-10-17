import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  HeartPulse,
  Home,
  LayoutDashboard,
  Brain,
  Pill,
  FileText,
  Hospital,
  Droplets,
  Activity,
  Vault,
  User,
  Info,
  X,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menu = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Health Profile",
      path: "/health-profile",
      icon: HeartPulse,
    },
    {
      name: "Disease Prediction",
      path: "/disease-prediction",
      icon: Brain,
    },
    {
      name: "Medicine Assistant",
      path: "/medicines",
      icon: Pill,
    },
    {
      name: "Report Analyzer",
      path: "/report-analyzer",
      icon: FileText,
    },
    {
      name: "Healthcare Services",
      path: "/healthcare-services",
      icon: Hospital,
    },
    {
      name: "Blood Support",
      path: "/blood-support",
      icon: Droplets,
    },
    {
      name: "My Health",
      path: "/my-health",
      icon: HeartPulse,
    },
    
    {
      name: "Medical Vault",
      path: "/medical-vault",
      icon: Vault,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
    {
      name: "About",
      path: "/about",
      icon: Info,
    },
  ];

  const handleNavigate = () => {
    setOpen(false);
  };

  return (
    <>
      {/* 3 DOT BUTTON */}

      <button
        className="sidebar-menu-button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* DARK OVERLAY */}

      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}

      <aside className={`health-sidebar ${open ? "sidebar-open" : ""}`}>
        {/* HEADER */}

        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <HeartPulse size={22} />
            </div>

            <div>
              <strong>AI HealthMate</strong>
              <span>Smart Healthcare</span>
            </div>
          </div>

          <button
            className="sidebar-close"
            onClick={() => setOpen(false)}
          >
            <X size={21} />
          </button>
        </div>

        {/* MENU */}

        <div className="sidebar-content">
          <p className="sidebar-title">
            HEALTHCARE
          </p>

          <nav className="sidebar-nav">
            {menu.map((item) => {
              const Icon = item.icon;

              const active =
                location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigate}
                  className={`sidebar-link ${
                    active ? "active" : ""
                  }`}
                >
                  <Icon size={18} />

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* FOOTER */}

        <div className="sidebar-footer">
          <div className="sidebar-safety">
            <HeartPulse size={18} />

            <div>
              <strong>Health Information</strong>

              <p>
                AI-assisted information is for educational
                purposes and does not replace professional
                medical advice.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;