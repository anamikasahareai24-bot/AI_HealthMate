import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Bot,
  Mic,
  FileText,
  Pill,
  Hospital,
  Droplets,
  HeartPulse,
  BarChart3,
  ClipboardPen,
  Activity,
  LockKeyhole,
  Info,
  User,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      title: "Home",
      path: "/",
      icon: Home,
    },

    {
      title: "AI Health Assistant",
      path: "/ai-health-center",
      icon: Bot,
    },

    {
       title: "AI Health Interview",
       path: "/ai-health-interview",
       icon: Mic,
    },

    {
      title: "Medical Reports",
      path: "/reports-vault",
      icon: FileText,
    },

    {
      title: "Medicine Assistant",
      path: "/medicines",
      icon: Pill,
    },

    {
      title: "Nearby Healthcare",
      path: "/healthcare-services",
      icon: Hospital,
    },

    {
      title: "Blood Support",
      path: "/blood-support",
      icon: Droplets,
    },

    {
      title: "Health Overview",
      path: "/my-health",
      icon: BarChart3,
    },

    {
      title: "Health Details",
      path: "/health-details",
      icon: ClipboardPen,
    },

    {
      title: "Health Tracking",
      path: "/health-tracking",
      icon: Activity,
    },

    {
      title: "Medical Vault",
      path: "/medical-vault",
      icon: LockKeyhole,
    },

    {
      title: "About AI HealthMate",
      path: "/about",
      icon: Info,
    },

    {
      title: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <>
      {/* ================= TOP NAVBAR ================= */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <HeartPulse size={22} />
            </div>

            <div>
              <h1 className="text-lg font-extrabold text-slate-900">
                AI HealthMate
              </h1>

              <p className="hidden text-[10px] font-medium text-slate-500 sm:block">
                Smart Healthcare Assistant
              </p>
            </div>

          </Link>


          {/* Desktop Menu Button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
          >

            <Menu size={20} />

            <span className="hidden sm:block">
              Menu
            </span>

          </button>

        </div>

      </nav>


      {/* ================= OVERLAY ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
        />
      )}


      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-full w-[320px] max-w-[90vw] transform bg-white shadow-2xl transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <HeartPulse size={22} />
            </div>

            <div>

              <h2 className="font-bold text-slate-900">
                AI HealthMate
              </h2>

              <p className="text-xs text-slate-500">
                Healthcare Menu
              </p>

            </div>

          </div>


          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={22} />
          </button>

        </div>


        {/* Sidebar Content */}
        <div className="h-[calc(100%-80px)] overflow-y-auto px-4 py-5">

          {/* Section */}
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Healthcare
          </p>


          <div className="space-y-1">

            {menuItems.map((item) => {

              const Icon = item.icon;

              const active =
                location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                >

                  <Icon
                    size={19}
                    className={
                      active
                        ? "text-blue-600"
                        : "text-slate-500"
                    }
                  />

                  <span>
                    {item.title}
                  </span>

                </Link>
              );

            })}

          </div>


          {/* Bottom Information Card */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">

            <div className="flex items-start gap-3">

              <ShieldIcon />

              <div>

                <h3 className="text-sm font-bold text-slate-900">
                  Health Information
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-600">
                  AI-generated information is for educational
                  purposes and is not a medical diagnosis.
                </p>

              </div>

            </div>

          </div>

        </div>

      </aside>
    </>
  );
}


/* Small shield component */
function ShieldIcon() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
      🛡️
    </div>
  );
}

export default Navbar;