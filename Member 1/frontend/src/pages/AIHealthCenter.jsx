import { useState } from "react";
import { Bot, HeartPulse, Send, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";

function AIHealthCenter() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        type: "user",
        text: message,
      },
    ]);

    setMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      {/* ================= HEADER ================= */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-6 py-16">

        <div className="mx-auto max-w-5xl text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <Bot size={32} />
          </div>

          <h1 className="mt-6 text-4xl font-extrabold text-slate-900">
            AI Healthcare Assistant
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-slate-600">
            Ask questions about your health information and get
            easy-to-understand AI-assisted guidance.
          </p>

        </div>

      </section>


      {/* ================= AI CHAT AREA ================= */}
      <section className="px-6 py-12">

        <div className="mx-auto max-w-4xl">

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

            {/* Chat Header */}
            <div className="flex items-center gap-4 border-b border-slate-200 p-5">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <HeartPulse
                  size={24}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  AI HealthMate
                </h2>

                <p className="text-sm text-green-600">
                  ● Assistant Ready
                </p>
              </div>

            </div>


            {/* Welcome Message */}

            <div className="min-h-[350px] bg-slate-50 p-6">

              <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                    <Bot
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                  <div>

                    <p className="font-semibold text-slate-900">
                      Hello! I'm AI HealthMate 👋
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Tell me what you would like to understand
                      about your health. You can ask about symptoms,
                      medical reports or general health information.
                    </p>

                  </div>

                </div>

              </div>
              {messages.map((msg, index) => (
  <div
    key={index}
    className="mt-4 ml-auto max-w-2xl rounded-2xl bg-blue-600 p-4 text-white shadow-sm"
  >
    <p className="text-sm leading-6">
      {msg.text}
    </p>
  </div>
))}

            </div>


            {/* Input Area */}
            <div className="border-t border-slate-200 bg-white p-5">

              <div className="flex gap-3">

                <input
                 type="text"
                 value={message}
                 onChange={(e) => setMessage(e.target.value)}
                 onKeyDown={(e) => {
                  if (e.key === "Enter") {
                       handleSend();
                   }
               }}
                 placeholder="Type your health question..."
                className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={handleSend}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <Send size={18} />
                  Send
                </button>

              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">

                <ShieldCheck
                  size={16}
                  className="text-green-600"
                />

                AI-generated information is for educational purposes
                and is not a medical diagnosis.

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default AIHealthCenter;