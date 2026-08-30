import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  FileText,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ================= NAVBAR ================= */}
      <Navbar />


      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">

        {/* Background decoration */}
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />

        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">

          {/* ================= LEFT CONTENT ================= */}
          <div>

            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">

              <HeartPulse
                size={18}
                className="text-blue-600"
              />

              <span className="text-sm font-semibold text-blue-700">
                AI-Powered Healthcare Assistant
              </span>

            </div>


            {/* Heading */}
            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">

              Your Health.
              <br />

              <span className="text-blue-600">
                Smarter with AI.
              </span>

            </h1>


            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              AI HealthMate helps you understand health information,
              organize medical records, manage medicines and discover
              useful healthcare services — all in one place.
            </p>


            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <Link
                to="/ai-health-center"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >

                <Bot size={20} />

                Talk to AI Assistant

                <ArrowRight size={18} />

              </Link>


              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-600"
              >
                Open Dashboard
              </Link>

            </div>


            {/* Trust Points */}
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-600">

              <div className="flex items-center gap-2">

                <ShieldCheck
                  size={18}
                  className="text-green-600"
                />

                Secure Health Data

              </div>


              <div className="flex items-center gap-2">

                <FileText
                  size={18}
                  className="text-blue-600"
                />

                Medical Records

              </div>

            </div>

          </div>


          {/* ================= RIGHT VISUAL ================= */}
          <div className="relative flex justify-center lg:justify-end">

            <div className="relative h-[390px] w-full max-w-[480px]">

              {/* Circle */}
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100" />


              {/* Main Card */}
              <div className="absolute left-1/2 top-1/2 w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white bg-white p-7 shadow-2xl">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">

                  <HeartPulse size={42} />

                </div>


                <h2 className="mt-6 text-center text-2xl font-bold text-slate-900">
                  AI HealthMate
                </h2>


                <p className="mt-2 text-center text-sm leading-6 text-slate-500">
                  Your personal AI healthcare companion
                </p>


                {/* Mini Cards */}
                <div className="mt-6 grid grid-cols-2 gap-3">

                  <div className="rounded-xl bg-blue-50 p-3 text-center">

                    <Bot
                      size={22}
                      className="mx-auto text-blue-600"
                    />

                    <p className="mt-2 text-xs font-semibold text-slate-700">
                      AI Assistant
                    </p>

                  </div>


                  <div className="rounded-xl bg-cyan-50 p-3 text-center">

                    <FileText
                      size={22}
                      className="mx-auto text-cyan-600"
                    />

                    <p className="mt-2 text-xs font-semibold text-slate-700">
                      Medical Reports
                    </p>

                  </div>

                </div>

              </div>


              {/* Floating Card 1 */}
              <div className="absolute left-0 top-12 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-lg">

                <p className="text-xs text-slate-500">
                  Health Support
                </p>

                <p className="font-bold text-green-600">
                  Available 24/7
                </p>

              </div>


              {/* Floating Card 2 */}
              <div className="absolute bottom-12 right-0 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-lg">

                <p className="text-xs text-slate-500">
                  Health Journey
                </p>

                <p className="font-bold text-blue-600">
                  Made Simple
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= QUICK ACTIONS ================= */}
      <section className="bg-white px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Get Started
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900">
              Start Your Healthcare Journey
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Choose a healthcare tool from the sidebar or start
              directly with your AI healthcare assistant.
            </p>

          </div>


          <div className="mt-10 flex justify-center">

            <Link
              to="/ai-health-center"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
            >

              <Bot size={20} />

              Start with AI Assistant

              <ArrowRight size={18} />

            </Link>

          </div>

        </div>

      </section>
      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-slate-50 px-6 py-20">

        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Your Healthcare Journey, Simplified
            </h2>

            <p className="mt-4 text-slate-600">
              AI HealthMate brings your essential healthcare tools
              together in a simple and easy-to-use experience.
            </p>

          </div>


          {/* Steps */}
          <div className="mt-14 grid gap-8 md:grid-cols-4">

            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                👤
              </div>

              <div className="mt-5 text-sm font-bold text-blue-600">
                STEP 01
              </div>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                Add Your Health Details
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Add relevant health information and symptoms to
                help organize your healthcare journey.
              </p>

            </div>


            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
                🤖
              </div>

              <div className="mt-5 text-sm font-bold text-purple-600">
                STEP 02
              </div>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                AI Analyzes Information
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                AI-powered tools can help analyze symptoms,
                reports and other health information.
              </p>

            </div>


            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                📊
              </div>

              <div className="mt-5 text-sm font-bold text-green-600">
                STEP 03
              </div>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                Understand Your Results
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                View easy-to-understand insights and organize
                important health information.
              </p>

            </div>


            {/* Step 4 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
                🏥
              </div>

              <div className="mt-5 text-sm font-bold text-orange-600">
                STEP 04
              </div>

              <h3 className="mt-2 text-lg font-bold text-slate-900">
                Take the Next Step
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Find relevant healthcare services and decide when
                professional medical care may be appropriate.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= SAFETY ================= */}
      <section className="bg-slate-50 px-6 py-16">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm md:p-10">

            <div className="flex flex-col gap-6 md:flex-row md:items-start">

              {/* Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                🛡️
              </div>


              {/* Content */}
              <div>

                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Important Health Information
                </p>


                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  AI HealthMate is a Healthcare Support Tool
                </h2>


                <p className="mt-4 leading-7 text-slate-600">
                  AI-generated health information is intended for
                  educational and informational purposes. It should
                  not be considered a medical diagnosis or a replacement
                  for advice from a qualified healthcare professional.
                </p>


                {/* Emergency */}
                <div className="mt-6 rounded-2xl bg-red-50 p-5">

                  <div className="flex items-start gap-3">

                    <span className="text-xl">
                      🚨
                    </span>


                    <div>

                      <h3 className="font-bold text-red-700">
                        Medical Emergency?
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-red-600">
                        If you are experiencing a serious or
                        life-threatening medical situation, seek
                        immediate professional medical assistance
                        or contact your local emergency service.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 px-6 py-12 text-white">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-4">

            {/* Brand */}
            <div>

              <div className="flex items-center gap-2">

                <HeartPulse size={26} />

                <span className="text-xl font-bold">
                  AI HealthMate
                </span>

              </div>


              <p className="mt-4 text-sm leading-6 text-slate-400">
                An AI-powered healthcare support platform designed
                to help users understand and organize their health
                information.
              </p>

            </div>


            {/* Healthcare */}
            <div>

              <h3 className="font-semibold">
                Healthcare
              </h3>


              <div className="mt-4 space-y-3 text-sm text-slate-400">

                <Link
                  to="/ai-health-center"
                  className="block hover:text-white"
                >
                  AI Assistant
                </Link>


                <Link
                  to="/reports-vault"
                  className="block hover:text-white"
                >
                  Medical Reports
                </Link>


                <Link
                  to="/medicines"
                  className="block hover:text-white"
                >
                  Medicine Assistant
                </Link>

              </div>

            </div>


            {/* Services */}
            <div>

              <h3 className="font-semibold">
                Services
              </h3>


              <div className="mt-4 space-y-3 text-sm text-slate-400">

                <Link
                  to="/healthcare-services"
                  className="block hover:text-white"
                >
                  Nearby Healthcare
                </Link>


                <Link
                  to="/my-health"
                  className="block hover:text-white"
                >
                  My Health
                </Link>


                <Link
                  to="/reports-vault"
                  className="block hover:text-white"
                >
                  Medical Vault
                </Link>

              </div>

            </div>


            {/* Important */}
            <div>

              <h3 className="font-semibold">
                Important
              </h3>


              <div className="mt-4 space-y-3 text-sm text-slate-400">

                <p>
                  Privacy Focused
                </p>

                <p>
                  Secure Health Data
                </p>

                <p>
                  AI-assisted Information
                </p>

              </div>

            </div>

          </div>


          {/* Copyright */}
          <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">

            © 2026 AI HealthMate. All rights reserved.

          </div>

        </div>

      </footer>

    </div>
  );
}

export default Home;