import { Link } from "react-router-dom";
import {
  Bot,
  FileText,
  Pill,
  HeartPulse,
  Hospital,
  ArrowRight,
  Activity,
  ShieldCheck,
} from "lucide-react";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <p className="text-sm font-medium text-blue-600">
              AI HealthMate
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              Patient Dashboard
            </h1>
          </div>

          <Link
            to="/profile"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700"
          >
            P
          </Link>

        </div>
      </header>


      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Welcome */}
        <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-7 text-white shadow-lg">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>
              <p className="text-sm font-medium text-blue-100">
                Welcome back 👋
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                Take care of your health
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-blue-50">
                Manage your health information, understand reports
                and access AI-powered healthcare tools from one place.
              </p>
            </div>

            <Link
              to="/ai-health-center"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50"
            >
              <Bot size={19} />
              Talk to AI
              <ArrowRight size={17} />
            </Link>

          </div>

        </section>


        {/* ================= OVERVIEW ================= */}
        <section className="mt-8">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Health Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Quick view of your healthcare information
            </p>
          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Health */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                  <HeartPulse className="text-red-500" size={24} />
                </div>

                <Activity size={19} className="text-slate-300" />

              </div>

              <p className="mt-5 text-sm text-slate-500">
                Health Status
              </p>

              <h3 className="mt-1 text-xl font-bold text-green-600">
                Good
              </h3>

            </div>


            {/* Reports */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                <FileText className="text-purple-600" size={24} />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Medical Reports
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                0
              </h3>

            </div>


            {/* Medicines */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                <Pill className="text-green-600" size={24} />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Medicines
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                0
              </h3>

            </div>


            {/* Services */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                <Hospital className="text-orange-600" size={24} />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Healthcare Services
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-900">
                Nearby
              </h3>

            </div>

          </div>

        </section>


        {/* ================= QUICK ACTIONS ================= */}
        <section className="mt-10">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Access your most-used healthcare tools
            </p>
          </div>


          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {/* AI */}
            <Link
              to="/ai-health-center"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Bot className="text-blue-600" size={24} />
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                AI Health Assistant
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Ask questions and understand your health information.
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
                Open Assistant
                <ArrowRight size={15} />
              </span>

            </Link>


            {/* Reports */}
            <Link
              to="/reports-vault"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50">
                <FileText className="text-purple-600" size={24} />
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                Medical Reports
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Upload and organize your medical reports.
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-purple-600">
                Open Reports
                <ArrowRight size={15} />
              </span>

            </Link>


            {/* Medicines */}
            <Link
              to="/medicines"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                <Pill className="text-green-600" size={24} />
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                Medicine Assistant
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Manage medicines and medication information.
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-green-600">
                View Medicines
                <ArrowRight size={15} />
              </span>

            </Link>


            {/* Healthcare */}
            <Link
              to="/healthcare-services"
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                <Hospital className="text-orange-600" size={24} />
              </div>

              <h3 className="mt-5 font-bold text-slate-900">
                Healthcare Services
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Find hospitals and useful healthcare services.
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-orange-600">
                Find Services
                <ArrowRight size={15} />
              </span>

            </Link>

          </div>

        </section>


        {/* ================= HEALTH TIP ================= */}
        <section className="mt-10">

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

            <div className="flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
                <ShieldCheck className="text-blue-600" size={24} />
              </div>

              <div>

                <h3 className="font-bold text-slate-900">
                  Your Health Information
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Keep your health details and medical records updated
                  so your healthcare tools can provide more useful
                  information.
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;