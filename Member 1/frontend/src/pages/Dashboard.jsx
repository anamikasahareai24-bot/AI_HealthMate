import {
  HeartPulse,
  Droplets,
  Moon,
  Footprints,
  Activity,
  FileText,
  Pill,
  Bot,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

function Dashboard() {
  const healthStats = [
    {
      title: "Heart Rate",
      value: "72",
      unit: "BPM",
      status: "Normal",
      icon: HeartPulse,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
    {
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "Normal",
      icon: Activity,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Water Intake",
      value: "5",
      unit: "/ 8 glasses",
      status: "62% completed",
      icon: Droplets,
      iconBg: "bg-cyan-50",
      iconColor: "text-cyan-500",
    },
    {
      title: "Sleep",
      value: "7.2",
      unit: "hours",
      status: "Good",
      icon: Moon,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <p className="text-sm font-semibold text-blue-600">
              AI HEALTHMATE
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Health Dashboard
            </h1>

            <p className="mt-2 text-slate-500">
              Your health information and daily wellness overview.
            </p>
          </div>

          <Link
            to="/health-tracking"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Activity size={18} />
            Track Health
          </Link>

        </div>

        {/* Welcome Card */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-blue-600 p-6 text-white shadow-sm md:p-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>
              <p className="text-sm font-medium text-blue-100">
                Good to see you!
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Stay consistent with your health.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                Track your health, manage medicines, store medical
                reports and get AI-powered healthcare assistance.
              </p>
            </div>

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <HeartPulse size={40} />
            </div>

          </div>
        </div>

        {/* Health Stats */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {healthStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >

                <div className="flex items-start justify-between">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                  >
                    <Icon
                      size={23}
                      className={stat.iconColor}
                    />
                  </div>

                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                    {stat.status}
                  </span>

                </div>

                <p className="mt-4 text-sm text-slate-500">
                  {stat.title}
                </p>

                <div className="mt-1 flex items-baseline gap-1">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </h3>

                  <span className="text-sm text-slate-400">
                    {stat.unit}
                  </span>
                </div>

              </div>
            );
          })}

        </div>

        {/* Daily Activity */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">

          {/* Steps */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Footprints
                    size={23}
                    className="text-blue-600"
                  />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Daily Steps
                  </h2>

                  <p className="text-sm text-slate-500">
                    Today's activity
                  </p>
                </div>

              </div>

              <span className="text-sm font-semibold text-blue-600">
                6,240 / 8,000
              </span>

            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: "78%" }}
              />
            </div>

            <div className="mt-3 flex justify-between text-xs text-slate-400">
              <span>0 steps</span>
              <span>78% completed</span>
              <span>8,000 goal</span>
            </div>

          </div>

          {/* Weekly Progress */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                <TrendingUp
                  size={23}
                  className="text-green-600"
                />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Weekly Progress
                </h2>

                <p className="text-sm text-slate-500">
                  Your wellness activity
                </p>
              </div>

            </div>

            <div className="mt-6 grid grid-cols-7 gap-2">

              {[
                ["M", 70],
                ["T", 85],
                ["W", 55],
                ["T", 90],
                ["F", 65],
                ["S", 75],
                ["S", 80],
              ].map(([day, value], index) => (
                <div
                  key={`${day}-${index}`}
                  className="flex flex-col items-center gap-2"
                >

                  <div className="flex h-24 w-full items-end rounded-lg bg-slate-50">

                    <div
                      className="w-full rounded-lg bg-blue-500"
                      style={{ height: `${value}%` }}
                    />

                  </div>

                  <span className="text-xs font-medium text-slate-500">
                    {day}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="mb-8">

          <h2 className="mb-4 text-xl font-bold text-slate-900">
            Quick Actions
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* AI Assistant */}
            <Link
              to="/ai-health-center"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                  <Bot
                    size={23}
                    className="text-blue-600"
                  />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />

              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                AI Health Assistant
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Get AI-powered health guidance.
              </p>

            </Link>

            {/* Medicines */}
            <Link
              to="/medicines"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
                  <Pill
                    size={23}
                    className="text-green-600"
                  />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-green-600"
                />

              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Medicine Assistant
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Manage medicines and reminders.
              </p>

            </Link>

            {/* Medical Vault */}
            <Link
              to="/medical-vault"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">
                  <FileText
                    size={23}
                    className="text-purple-600"
                  />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-purple-600"
                />

              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Medical Vault
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Access your medical reports.
              </p>

            </Link>

            {/* Health Tracking */}
            <Link
              to="/health-tracking"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">
                  <Activity
                    size={23}
                    className="text-cyan-600"
                  />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-cyan-600"
                />

              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Health Tracking
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Monitor your daily health.
              </p>

            </Link>

          </div>
        </div>

        {/* Recent Medical Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Health Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep your health information updated for better tracking.
              </p>
            </div>

            <Link
              to="/health-tracking"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              View Health Tracking
              <ArrowRight size={17} />
            </Link>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Latest Heart Rate
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                72 BPM
              </p>

              <p className="mt-1 text-xs text-green-600">
                Within normal range
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Latest Weight
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                65 kg
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Last updated today
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Health Records
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {3}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Saved health records
              </p>
            </div>

          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4">
          <p className="text-sm leading-6 text-amber-800">
            <strong>Health Information:</strong> This dashboard
            provides general health tracking and educational
            information. It does not replace professional medical
            advice, diagnosis, or treatment.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;