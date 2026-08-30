function About() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-white border-b border-slate-200 px-6 py-16">
        <div className="mx-auto max-w-5xl text-center">

          <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
            About AI HealthMate
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
            Smarter Healthcare Support with AI
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            AI HealthMate is an AI-powered healthcare support platform
            designed to help users understand, organize and manage their
            health information in one place.
          </p>

        </div>
      </section>


      {/* What is AI HealthMate */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">

          <div className="grid gap-8 md:grid-cols-2">

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                ❤️
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                What is AI HealthMate?
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                AI HealthMate brings useful healthcare tools together
                in a simple and easy-to-use platform. Users can explore
                health information, understand medical reports, manage
                medicines and discover healthcare services.
              </p>

            </div>


            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                🤖
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                How AI Helps
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                AI-assisted features can help users understand general
                health information and organize their healthcare
                journey in a more convenient way.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* Features */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">

          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              What You Can Do
            </h2>

            <p className="mt-3 text-slate-600">
              Explore the main healthcare tools available in AI HealthMate.
            </p>
          </div>


          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-3xl">🤖</div>

              <h3 className="mt-4 font-bold text-slate-900">
                AI Assistant
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ask general health-related questions and understand
                information more easily.
              </p>
            </div>


            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-3xl">📄</div>

              <h3 className="mt-4 font-bold text-slate-900">
                Medical Reports
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Organize and understand important medical report
                information.
              </p>
            </div>


            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-3xl">💊</div>

              <h3 className="mt-4 font-bold text-slate-900">
                Medicine Assistant
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Keep useful medicine-related information organized.
              </p>
            </div>


            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="text-3xl">🏥</div>

              <h3 className="mt-4 font-bold text-slate-900">
                Healthcare Services
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore useful healthcare services and nearby facilities.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* Safety */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">

          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">

            <div className="flex gap-4">

              <div className="text-2xl">
                🛡️
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Important Health Information
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  AI HealthMate provides AI-generated information for
                  educational and informational purposes. It is not a
                  replacement for professional medical advice, diagnosis
                  or treatment.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* Footer */}
      <footer className="bg-slate-900 px-6 py-8 text-center text-sm text-slate-400">

        <p>
          © 2026 AI HealthMate. All rights reserved.
        </p>

        <p className="mt-2">
          Smart Healthcare Assistant
        </p>

      </footer>

    </div>
  );
}

export default About;