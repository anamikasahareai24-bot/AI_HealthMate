import { useState } from "react";
import {
  Activity,
  HeartPulse,
  Droplets,
  Moon,
  Footprints,
  Scale,
  Thermometer,
  Plus,
  Trash2,
  Gauge,
} from "lucide-react";

function HealthTracking() {
  const [records, setRecords] = useState([]);

  const [form, setForm] = useState({
    heartRate: "",
    bloodPressure: "",
    bloodSugar: "",
    weight: "",
    sleep: "",
    water: "",
    steps: "",
    temperature: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addRecord = (e) => {
    e.preventDefault();

    const hasData = Object.values(form).some(
      (value) => value.trim() !== ""
    );

    if (!hasData) {
      alert("Please enter at least one health value.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      ...form,
    };

    setRecords((prev) => [newRecord, ...prev]);

    setForm({
      heartRate: "",
      bloodPressure: "",
      bloodSugar: "",
      weight: "",
      sleep: "",
      water: "",
      steps: "",
      temperature: "",
    });
  };

  const deleteRecord = (id) => {
    setRecords((prev) =>
      prev.filter((record) => record.id !== id)
    );
  };

  const steps = Number(form.steps) || 0;
  const water = Number(form.water) || 0;
  const sleep = Number(form.sleep) || 0;

  const stepsProgress = Math.min((steps / 8000) * 100, 100);
  const waterProgress = Math.min((water / 8) * 100, 100);
  const sleepProgress = Math.min((sleep / 8) * 100, 100);

  const getHeartStatus = () => {
    const rate = Number(form.heartRate);

    if (!rate) return "Not added";
    if (rate < 60) return "Low";
    if (rate <= 100) return "Normal";
    return "High";
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
              <Activity
                size={27}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-600">
                DAILY HEALTH MONITORING
              </p>

              <h1 className="text-3xl font-bold text-slate-900">
                Health Tracking
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-slate-600">
            Monitor your daily health measurements, habits and
            overall progress in one place.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <HeartPulse
              size={25}
              className="text-red-500"
            />

            <p className="mt-3 text-sm text-slate-500">
              Heart Rate
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {form.heartRate || "--"}
              <span className="ml-1 text-sm font-normal text-slate-400">
                BPM
              </span>
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Status: {getHeartStatus()}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Footprints
              size={25}
              className="text-blue-600"
            />

            <p className="mt-3 text-sm text-slate-500">
              Steps
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {form.steps || "--"}
            </h2>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${stepsProgress}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Goal: 8,000 steps
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Droplets
              size={25}
              className="text-cyan-500"
            />

            <p className="mt-3 text-sm text-slate-500">
              Water Intake
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {form.water || "--"}
              <span className="ml-1 text-sm font-normal text-slate-400">
                glasses
              </span>
            </h2>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-cyan-500"
                style={{ width: `${waterProgress}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Goal: 8 glasses
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Moon
              size={25}
              className="text-purple-500"
            />

            <p className="mt-3 text-sm text-slate-500">
              Sleep
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {form.sleep || "--"}
              <span className="ml-1 text-sm font-normal text-slate-400">
                hrs
              </span>
            </h2>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-purple-500"
                style={{ width: `${sleepProgress}%` }}
              />
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Goal: 8 hours
            </p>
          </div>

        </div>

        {/* Daily Progress */}
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <Gauge
              size={23}
              className="text-blue-600"
            />

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Today's Progress
              </h2>

              <p className="text-sm text-slate-500">
                Keep working towards your daily health goals.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-600">
                  Steps
                </span>
                <span className="font-semibold text-blue-600">
                  {Math.round(stepsProgress)}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-blue-600"
                  style={{ width: `${stepsProgress}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-600">
                  Water
                </span>
                <span className="font-semibold text-cyan-600">
                  {Math.round(waterProgress)}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-cyan-500"
                  style={{ width: `${waterProgress}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-600">
                  Sleep
                </span>
                <span className="font-semibold text-purple-600">
                  {Math.round(sleepProgress)}%
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-purple-500"
                  style={{ width: `${sleepProgress}%` }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Add Health Record */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Plus
                size={21}
                className="text-blue-600"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Add Health Record
              </h2>

              <p className="text-sm text-slate-500">
                Enter your latest health measurements.
              </p>
            </div>
          </div>

          <form
            onSubmit={addRecord}
            className="mt-6"
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  ❤️ Heart Rate
                </label>

                <input
                  type="number"
                  name="heartRate"
                  value={form.heartRate}
                  onChange={handleChange}
                  placeholder="72 BPM"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  🩸 Blood Pressure
                </label>

                <input
                  type="text"
                  name="bloodPressure"
                  value={form.bloodPressure}
                  onChange={handleChange}
                  placeholder="120/80"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  🩸 Blood Sugar
                </label>

                <input
                  type="number"
                  name="bloodSugar"
                  value={form.bloodSugar}
                  onChange={handleChange}
                  placeholder="100 mg/dL"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  ⚖️ Weight
                </label>

                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  placeholder="65 kg"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  😴 Sleep
                </label>

                <input
                  type="number"
                  step="0.1"
                  name="sleep"
                  value={form.sleep}
                  onChange={handleChange}
                  placeholder="8 hours"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  💧 Water Intake
                </label>

                <input
                  type="number"
                  name="water"
                  value={form.water}
                  onChange={handleChange}
                  placeholder="8 glasses"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  🚶 Steps
                </label>

                <input
                  type="number"
                  name="steps"
                  value={form.steps}
                  onChange={handleChange}
                  placeholder="8000"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  🌡️ Temperature
                </label>

                <input
                  type="number"
                  step="0.1"
                  name="temperature"
                  value={form.temperature}
                  onChange={handleChange}
                  placeholder="36.8 °C"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={19} />
              Save Health Record
            </button>

          </form>
        </div>

        {/* History */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Health History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your saved health records.
          </p>

          {records.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-slate-50 p-10 text-center">

              <Activity
                size={42}
                className="mx-auto text-slate-300"
              />

              <p className="mt-3 font-semibold text-slate-600">
                No health records yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Add your first record above.
              </p>

            </div>
          ) : (
            <div className="mt-6 space-y-4">

              {records.map((record) => (
                <div
                  key={record.id}
                  className="rounded-2xl border border-slate-200 p-5"
                >

                  <div className="mb-4 flex items-center justify-between">

                    <div>
                      <p className="font-semibold text-slate-800">
                        Health Record
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Recorded on {record.date}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        deleteRecord(record.id)
                      }
                      className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    {record.heartRate && (
                      <div className="rounded-xl bg-slate-50 p-3">
                        ❤️ Heart Rate
                        <strong className="mt-1 block">
                          {record.heartRate} BPM
                        </strong>
                      </div>
                    )}

                    {record.bloodPressure && (
                      <div className="rounded-xl bg-slate-50 p-3">
                        🩸 Blood Pressure
                        <strong className="mt-1 block">
                          {record.bloodPressure}
                        </strong>
                      </div>
                    )}

                    {record.bloodSugar && (
                      <div className="rounded-xl bg-slate-50 p-3">
                        🩸 Blood Sugar
                        <strong className="mt-1 block">
                          {record.bloodSugar} mg/dL
                        </strong>
                      </div>
                    )}

                    {record.weight && (
                      <div className="rounded-xl bg-slate-50 p-3">
                        ⚖️ Weight
                        <strong className="mt-1 block">
                          {record.weight} kg
                        </strong>
                      </div>
                    )}

                    {record.sleep && (
                      <div className="rounded-xl bg-slate-50 p-3">
                        😴 Sleep
                        <strong className="mt-1 block">
                          {record.sleep} hrs
                        </strong>
                      </div>
                    )}

                    {record.water && (
                      <div className="rounded-xl bg-slate-50 p-3">
                        💧 Water
                        <strong className="mt-1 block">
                          {record.water} glasses
                        </strong>
                      </div>
                    )}

                    {record.steps && (
                      <div className="rounded-xl bg-slate-50 p-3">
                        🚶 Steps
                        <strong className="mt-1 block">
                          {record.steps}
                        </strong>
                      </div>
                    )}

                    {record.temperature && (
                      <div className="rounded-xl bg-slate-50 p-3">
                        🌡️ Temperature
                        <strong className="mt-1 block">
                          {record.temperature} °C
                        </strong>
                      </div>
                    )}

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* Health Disclaimer */}
        <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-4">
          <p className="text-sm leading-6 text-amber-800">
            <strong>Note:</strong> Health Tracking is intended for
            personal monitoring and educational purposes. It does
            not replace professional medical advice or diagnosis.
          </p>
        </div>

      </div>
    </div>
  );
}

export default HealthTracking;