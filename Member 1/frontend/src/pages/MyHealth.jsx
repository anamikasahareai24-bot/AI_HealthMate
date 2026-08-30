import { Link } from "react-router-dom";
import {
  ArrowLeft,
  HeartPulse,
  Activity,
  Droplets,
  Scale,
  Thermometer,
  ShieldCheck,
} from "lucide-react";

function MyHealth() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">

          <Link
            to="/dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <p className="text-sm font-medium text-blue-600">
              AI HealthMate
            </p>

            <h1 className="text-2xl font-bold text-slate-900">
              My Health
            </h1>
          </div>

        </div>
      </header>


      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* Welcome */}
        <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-7 text-white shadow-lg">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
              <HeartPulse size={30} />
            </div>

            <div>
              <p className="text-sm text-blue-100">
                Health Overview
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                Keep track of your health
              </h2>
            </div>

          </div>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-blue-50">
            View your basic health information and keep important
            health details organized in one place.
          </p>

        </section>


        {/* ================= HEALTH STATUS ================= */}
        <section className="mt-8">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Health Status
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your current health information
            </p>
          </div>


          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Heart Rate */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                <HeartPulse
                  size={24}
                  className="text-red-500"
                />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Heart Rate
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                -- <span className="text-sm font-medium text-slate-400">BPM</span>
              </h3>

            </div>


            {/* Blood Pressure */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <Activity
                  size={24}
                  className="text-blue-600"
                />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Blood Pressure
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                -- / --
              </h3>

              <p className="text-xs text-slate-400">
                mmHg
              </p>

            </div>


            {/* Blood Group */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50">
                <Droplets
                  size={24}
                  className="text-rose-600"
                />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Blood Group
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                Not Added
              </h3>

            </div>


            {/* Temperature */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50">
                <Thermometer
                  size={24}
                  className="text-orange-600"
                />
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Temperature
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                -- °C
              </h3>

            </div>

          </div>

        </section>


        {/* ================= PERSONAL DETAILS ================= */}
        <section className="mt-10">

          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Health Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Important information about your health
            </p>
          </div>


          <div className="grid gap-6 lg:grid-cols-2">

            {/* Basic Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h3 className="text-lg font-bold text-slate-900">
                Basic Information
              </h3>

              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">
                    Age
                  </span>

                  <span className="font-semibold text-slate-900">
                    Not Added
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">
                    Gender
                  </span>

                  <span className="font-semibold text-slate-900">
                    Not Added
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">
                    Blood Group
                  </span>

                  <span className="font-semibold text-slate-900">
                    Not Added
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Weight
                  </span>

                  <span className="font-semibold text-slate-900">
                    Not Added
                  </span>
                </div>

              </div>

            </div>


            {/* Medical Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h3 className="text-lg font-bold text-slate-900">
                Medical Information
              </h3>

              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">
                    Allergies
                  </span>

                  <span className="font-semibold text-slate-900">
                    None Added
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">
                    Existing Conditions
                  </span>

                  <span className="font-semibold text-slate-900">
                    None Added
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-sm text-slate-500">
                    Current Medicines
                  </span>

                  <span className="font-semibold text-slate-900">
                    0
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Medical Reports
                  </span>

                  <span className="font-semibold text-slate-900">
                    0
                  </span>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ================= HEALTH SCORE ================= */}
        <section className="mt-10">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50">
                  <Scale
                    size={26}
                    className="text-green-600"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Health Profile
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Complete your health information to keep
                    your profile organized.
                  </p>
                </div>

              </div>

              <div className="rounded-xl bg-green-50 px-5 py-3 text-center">
                <p className="text-xs font-medium text-green-600">
                  Profile Status
                </p>

                <p className="mt-1 font-bold text-green-700">
                  Getting Started
                </p>
              </div>

            </div>

          </div>

        </section>


        {/* ================= SAFETY ================= */}
        <section className="mt-8">

          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

            <div className="flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
                <ShieldCheck
                  size={24}
                  className="text-blue-600"
                />
              </div>

              <div>

                <h3 className="font-bold text-slate-900">
                  Health Information Notice
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  This page is for organizing health information.
                  It does not replace advice, diagnosis, or treatment
                  from a qualified healthcare professional.
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default MyHealth;