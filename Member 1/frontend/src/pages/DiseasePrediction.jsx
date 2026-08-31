import { useMemo, useState } from "react";
import {
  Search,
  X,
  Brain,
  ChevronDown,
  Loader2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";

function DiseasePrediction() {
  const commonSymptoms = [
    "Fever",
    "Headache",
    "Cough",
    "Fatigue",
    "Nausea",
    "Vomiting",
    "Dizziness",
    "Chest Pain",
    "Abdominal Pain",
    "Shortness of Breath",
  ];

  // Temporary sample options for UI testing.
  // Replace this array with your actual 377 supported symptoms.
  const otherSymptoms = [
    "Fever",
    "Headache",
    "Cough",
    "Fatigue",
    "Nausea",
    "Vomiting",
    "Dizziness",
    "Chest Pain",
    "Abdominal Pain",
    "Shortness of Breath",
    "Sore Throat",
    "Runny Nose",
    "Muscle Pain",
    "Joint Pain",
    "Back Pain",
    "Skin Rash",
    "Itching",
    "Sneezing",
    "Weakness",
    "Loss of Appetite",
    "Abdominal Bloating",
    "Difficulty Swallowing",
    "Chest Tightness",
    "Nasal Congestion",
  ];

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [lowConfidence, setLowConfidence] = useState(false);

  const filteredSymptoms = useMemo(() => {
    const query = search.trim().toLowerCase();

    return otherSymptoms
      .filter(
        (symptom) =>
          !selectedSymptoms.includes(symptom) &&
          symptom.toLowerCase().includes(query)
      )
      .slice(0, 8);
  }, [search, selectedSymptoms]);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) => {
      if (prev.includes(symptom)) {
        return prev.filter((item) => item !== symptom);
      }

      return [...prev, symptom];
    });

    setPredictions([]);
    setLowConfidence(false);
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.filter((item) => item !== symptom)
    );

    setPredictions([]);
    setLowConfidence(false);
  };

  const predictConditions = () => {
    if (selectedSymptoms.length < 2) {
      return;
    }

    setLoading(true);
    setPredictions([]);
    setLowConfidence(false);

    // Temporary UI demo response.
    // Later replace this part with your real ML/API prediction.
    setTimeout(() => {
      setPredictions([
        {
          name: "Contact Dermatitis",
          confidence: 15.18,
        },
        {
          name: "Allergy",
          confidence: 1.96,
        },
        {
          name: "Eczema",
          confidence: 1.45,
        },
      ]);

      setLowConfidence(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
              <Brain
                size={27}
                className="text-blue-600"
              />
            </div>

            <div>
              <p className="text-sm font-semibold text-blue-600">
                AI HEALTHMATE
              </p>

              <h1 className="text-3xl font-bold text-slate-900">
                Disease Prediction
              </h1>
            </div>

          </div>

          <p className="mt-3 max-w-3xl text-slate-600">
            Select your symptoms to explore possible health
            conditions based on the available prediction model.
          </p>
        </div>

        {/* Symptom Selection */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900">
              Symptom Selection
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select at least two symptoms to continue.
            </p>
          </div>

          {/* Common Symptoms */}
          <section>
            <div className="mb-4">
              <h3 className="font-bold text-slate-900">
                1. Common Symptoms
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Choose one or more commonly reported symptoms.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {commonSymptoms.map((symptom) => {
                const selected =
                  selectedSymptoms.includes(symptom);

                return (
                  <label
                    key={symptom}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      selected
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() =>
                        toggleSymptom(symptom)
                      }
                      className="h-4 w-4 accent-blue-600"
                    />

                    <span className="text-sm font-medium text-slate-700">
                      {symptom}
                    </span>
                  </label>
                );
              })}

            </div>
          </section>

          {/* Other Symptoms */}
          <section className="mt-10">
            <div className="mb-4">
              <h3 className="font-bold text-slate-900">
                2. Other Symptoms
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Search and select from the supported symptoms.
              </p>
            </div>

            <div className="relative">

              <div
                className={`flex items-center rounded-xl border bg-white ${
                  dropdownOpen
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-slate-300"
                }`}
              >

                <Search
                  size={19}
                  className="ml-4 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onFocus={() =>
                    setDropdownOpen(true)
                  }
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setDropdownOpen(true);
                  }}
                  placeholder="Search symptoms..."
                  className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setDropdownOpen((prev) => !prev)
                  }
                  className="mr-3 text-slate-400"
                >
                  <ChevronDown size={20} />
                </button>

              </div>

              {dropdownOpen && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">

                  {filteredSymptoms.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto p-2">

                      {filteredSymptoms.map((symptom) => (
                        <button
                          type="button"
                          key={symptom}
                          onClick={() => {
                            toggleSymptom(symptom);
                            setSearch("");
                          }}
                          className="block w-full rounded-lg px-3 py-3 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                        >
                          {symptom}
                        </button>
                      ))}

                    </div>
                  ) : (
                    <div className="p-5 text-center text-sm text-slate-500">
                      No supported symptom found.
                    </div>
                  )}

                </div>
              )}

            </div>
          </section>

          {/* Selected Symptoms */}
          <section className="mt-8">

            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">
                Selected Symptoms
              </h3>

              <span className="text-sm text-slate-500">
                {selectedSymptoms.length} selected
              </span>
            </div>

            {selectedSymptoms.length > 0 ? (
              <div className="flex flex-wrap gap-2">

                {selectedSymptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                  >
                    {symptom}

                    <button
                      type="button"
                      onClick={() =>
                        removeSymptom(symptom)
                      }
                      className="rounded-full hover:bg-blue-100"
                      aria-label={`Remove ${symptom}`}
                    >
                      <X size={15} />
                    </button>
                  </div>
                ))}

              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center text-sm text-slate-500">
                No symptoms selected yet.
              </div>
            )}

          </section>

          {/* Validation */}
          {selectedSymptoms.length === 1 && (
            <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-medium text-amber-800">
                Please select at least one more symptom to
                predict possible conditions.
              </p>
            </div>
          )}

          {/* Predict Button */}
          <button
            type="button"
            disabled={
              selectedSymptoms.length < 2 || loading
            }
            onClick={predictConditions}
            className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold transition ${
              selectedSymptoms.length >= 2 && !loading
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >
            {loading ? (
              <>
                <Loader2
                  size={19}
                  className="animate-spin"
                />
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <Brain size={19} />
                Predict Possible Conditions
              </>
            )}
          </button>

        </div>

        {/* Results */}
        {predictions.length > 0 && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

            <div className="flex items-start gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50">
                <ShieldCheck
                  size={23}
                  className="text-green-600"
                />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Possible Conditions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  These are model-generated possibilities, not
                  a medical diagnosis.
                </p>
              </div>

            </div>

            <div className="mt-6 space-y-4">

              {predictions.map((prediction, index) => (
                <div
                  key={prediction.name}
                  className="rounded-2xl border border-slate-200 p-5"
                >

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                        {index + 1}
                      </div>

                      <h3 className="font-bold text-slate-900">
                        {prediction.name}
                      </h3>

                    </div>

                    <span className="text-sm font-semibold text-blue-600">
                      {prediction.confidence.toFixed(2)}%
                    </span>

                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${Math.min(
                          prediction.confidence,
                          100
                        )}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Confidence
                  </p>

                </div>
              ))}

            </div>

            {/* Low Confidence */}
            {lowConfidence && (
              <div className="mt-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">

                <AlertTriangle
                  size={21}
                  className="mt-0.5 shrink-0 text-amber-600"
                />

                <p className="text-sm leading-6 text-amber-800">
                  Prediction confidence is low. Please select
                  more symptoms or consult a healthcare
                  professional.
                </p>

              </div>
            )}

          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <p className="text-sm leading-6 text-slate-600">
            <strong className="text-slate-800">
              Medical Disclaimer:
            </strong>{" "}
            This tool provides possible conditions based on
            the selected symptoms and is not a medical
            diagnosis. Please consult a qualified healthcare
            professional for proper diagnosis and treatment.
          </p>

        </div>

      </div>
    </div>
  );
}

export default DiseasePrediction;