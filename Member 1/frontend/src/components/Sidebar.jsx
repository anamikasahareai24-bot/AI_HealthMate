import {
  Home,
  Bot,
  FileText,
  Pill,
  Hospital,
  HeartPulse,
  Droplets,
  Activity,
  Vault,
  User,
  Info,
  LayoutDashboard,
  Brain,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const mainMenu = [
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
      name: "AI Health Assistant",
      path: "/ai-health-center",
      icon: Bot,
    },
    
    {
      name: "Medicine Assistant",
      path: "/medicines",
      icon: Pill,
    },
    {
      name: "Nearby Healthcare",
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
      name: "Health Tracking",
      path: "/health-tracking",
      icon: Activity,
    },
    {
      name: "Medical Vault",
      path: "/medical-vault",
      icon: Vault,
    },
    {
     name: "Disease Prediction",
     path: "/disease-prediction",
     icon: Brain,
  },

  ];

  
  const accountMenu = [
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

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
          <HeartPulse
            size={24}
            className="text-white"
          />
        </div>

        <div>
          <h1 className="font-bold text-slate-900">
            AI HealthMate
          </h1>

          <p className="text-xs text-slate-500">
            Smart Healthcare
          </p>
        </div>

      </div>


      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto px-3 py-5">

        <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          Healthcare
        </p>

        <nav className="space-y-1">

          {mainMenu.map((item) => {
            const Icon = item.icon;

            const isActive =
              location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={19} />

                <span>
                  {item.name}
                </span>
              </Link>
            );
          })}

        </nav>


        {/* Account */}
        <div className="mt-8">

          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            Account
          </p>

          <nav className="space-y-1">

            {accountMenu.map((item) => {
              const Icon = item.icon;

              const isActive =
                location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={19} />

                  <span>
                    {item.name}
                  </span>
                </Link>
              );
            })}

          </nav>

        </div>

      </div>


      {/* Bottom Safety Message */}
      <div className="border-t border-slate-200 p-4">

        <div className="rounded-xl bg-slate-50 p-3">

          <p className="text-xs font-semibold text-slate-700">
            Health Information
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            AI-generated information is for educational purposes
            and does not replace professional medical advice.
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;