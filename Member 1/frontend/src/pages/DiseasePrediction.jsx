import React, { useState } from "react";
import {
  Brain,
  HeartPulse,
  Thermometer,
  Activity,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Search,
  X,
} from "lucide-react";

import diseases from "../data/diseases.json";
import "./DiseasePrediction.css";

function DiseasePrediction() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    fever: "no",
    cough: "no",
    fatigue: "no",
    headache: "no",
    breathing: "no",
    chestPain: "no",
    nausea: "no",
    bodyPain: "no",
  });

  const [result, setResult] = useState(null);
  const [diseaseSearch, setDiseaseSearch] = useState("");
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const selectedSymptoms = [
    ["fever", "Fever"],
    ["cough", "Cough"],
    ["fatigue", "Fatigue"],
    ["headache", "Headache"],
    ["breathing", "Breathing difficulty"],
    ["chestPain", "Chest pain"],
    ["nausea", "Nausea"],
    ["bodyPain", "Body pain"],
  ].filter(([key]) => formData[key] === "yes").map(([, label]) => label);

  const searchSynonyms = {
    "bukhar": ["fever"],
    "बुखार": ["fever"],
    "dard": ["pain"],
    "दर्द": ["pain"],
    "pet dard": ["abdominal pain", "stomach pain"],
    "पेट दर्द": ["abdominal pain", "stomach pain"],
    "saans ki takleef": ["breathing difficulty", "shortness of breath"],
    "सांस की तकलीफ": ["breathing difficulty", "shortness of breath"],
    "khansi": ["cough"],
    "खांसी": ["cough"],
    "sir dard": ["headache"],
    "सिर दर्द": ["headache"],
    "ulti": ["vomiting"],
    "उल्टी": ["vomiting"],
  };
  const normalizeSearch = (value) =>
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const normalizedQuery = normalizeSearch(diseaseSearch);
  const expandedQueries = [
    normalizedQuery,
    ...(searchSynonyms[normalizedQuery] || []).map(normalizeSearch),
  ].filter(Boolean);
  const matchingDiseases = normalizedQuery
    ? diseases.filter((disease) => {
        const searchableText = normalizeSearch(
          `${disease.name} ${disease.description} ${(disease.aliases || []).join(" ")}`
        );
        return expandedQueries.some((query) => searchableText.includes(query));
      })
    : [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? "yes" : "no") : value,
    }));
  };

  const handlePrediction = (e) => {
    e.preventDefault();

    const requiredFields = [
      "age",
      "gender",
      "fever",
      "cough",
      "fatigue",
      "headache",
      "breathing",
      "chestPain",
      "nausea",
      "bodyPain",
    ];

    const isComplete = requiredFields.every(
      (field) => formData[field] !== ""
    );

    if (!isComplete) {
      setResult({
        type: "warning",
        title: "Complete your information",
        message:
          "Please answer all questions before running the prediction.",
      });

      return;
    }

    /*
      TEMPORARY FRONTEND DEMO RESULT

      Actual machine-learning model/API can be connected here later.
    */

    const symptoms = [
      formData.fever,
      formData.cough,
      formData.fatigue,
      formData.headache,
      formData.breathing,
      formData.chestPain,
      formData.nausea,
      formData.bodyPain,
    ];

    const yesCount = symptoms.filter(
      (item) => item === "yes"
    ).length;

    if (yesCount >= 6) {
      setResult({
        type: "attention",
        title: "Further medical evaluation recommended",
        message:
          "Multiple symptoms were reported. This screening result is not a diagnosis. Please consider consulting a qualified healthcare professional.",
      });
    } else if (yesCount >= 3) {
      setResult({
        type: "moderate",
        title: "Some symptoms detected",
        message:
          "Your responses indicate several symptoms. Monitor your condition and consider speaking with a healthcare professional if symptoms continue or worsen.",
      });
    } else {
      setResult({
        type: "normal",
        title: "No major warning pattern detected",
        message:
          "Based on the information entered, no strong warning pattern was detected by this demo screening.",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      age: "",
      gender: "",
      fever: "no",
      cough: "no",
      fatigue: "no",
      headache: "no",
      breathing: "no",
      chestPain: "no",
      nausea: "no",
      bodyPain: "no",
    });

    setResult(null);
  };

  return (
    <div className="disease-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <section className="disease-header">

        <div>

          <div className="disease-eyebrow">
            <Sparkles size={14} />
            AI HEALTH SCREENING
          </div>

          <h1>
            Disease <span>Prediction</span>
          </h1>

          <p>
            Enter your basic health information and symptoms
            to receive an AI-assisted preliminary health
            screening.
          </p>

        </div>

        <div className="prediction-header-icon">
          <Brain size={38} />
        </div>

      </section>


      {/* =========================
          DISCLAIMER
      ========================= */}

      <div className="prediction-disclaimer">

        <ShieldCheck size={18} />

        <div>
          <strong>Important health notice</strong>

          <p>
            This tool is for educational and screening purposes
            only. It does not provide a medical diagnosis or
            replace professional medical advice.
          </p>
        </div>

      </div>


      <section className="disease-search-card" aria-labelledby="disease-search-title">
        <div className="disease-search-heading">
          <div className="disease-search-icon">
            <Search size={20} />
          </div>
          <div>
            <span className="section-label">DISEASE DIRECTORY</span>
            <h2 id="disease-search-title">Search diseases</h2>
            <p>Search all 820 diseases from the Member 3 dataset in Hindi, Hinglish, or English.</p>
          </div>
        </div>

        <input
          className="disease-search-input"
          type="search"
          value={diseaseSearch}
          onChange={(event) => setDiseaseSearch(event.target.value)}
          placeholder="Search in Hindi, Hinglish, or English..."
          aria-label="Search diseases by name or description"
        />

        {diseaseSearch.trim() && (
          <div className="disease-search-results">
            <p className="disease-result-count">
              {matchingDiseases.length} result{matchingDiseases.length === 1 ? "" : "s"}
              {matchingDiseases.length > 10 ? " · Showing first 10" : ""}
            </p>
            {matchingDiseases.length ? (
              <div className="disease-result-list">
                {matchingDiseases.slice(0, 10).map((disease) => (
                  <button
                    type="button"
                    key={disease.name}
                    className={`disease-result-item ${selectedDiseases.some((item) => item.name === disease.name) ? "active" : ""}`}
                    aria-pressed={selectedDiseases.some((item) => item.name === disease.name)}
                    onClick={() =>
                      setSelectedDiseases((current) =>
                        current.some((item) => item.name === disease.name)
                          ? current.filter((item) => item.name !== disease.name)
                          : [...current, disease]
                      )
                    }
                  >
                    <span>{disease.name}</span>
                    {selectedDiseases.some((item) => item.name === disease.name) ? (
                      <CheckCircle2 className="disease-result-check selected" size={18} />
                    ) : (
                      <span className="disease-result-check" aria-hidden="true" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <p className="disease-no-results">No matching diseases found.</p>
            )}
          </div>
        )}

        {(selectedDiseases.length > 0 || selectedSymptoms.length > 0) && (
          <div className="selected-diseases-section">
            {selectedDiseases.length > 0 && (
              <>
                <h3>Selected diseases ({selectedDiseases.length})</h3>
                <div className="selected-diseases-list">
                  {selectedDiseases.map((disease) => (
                <article className="selected-disease-card" key={disease.name}>
                  <div className="selected-disease-copy">
                    <h4>{disease.name}</h4>
                    <p>{disease.description}</p>
                  </div>
                  <button
                    type="button"
                    className="remove-selected-disease"
                    aria-label={`Remove ${disease.name}`}
                    onClick={() =>
                      setSelectedDiseases((current) =>
                        current.filter((item) => item.name !== disease.name)
                      )
                    }
                  >
                    <X size={17} />
                  </button>
                </article>
                  ))}
                </div>
              </>
            )}
            {selectedSymptoms.length > 0 && (
              <div className="selected-symptoms-summary">
                <h3>Selected symptoms</h3>
                <div className="selected-symptoms-list">
                  {selectedSymptoms.map((symptom) => (
                    <span className="selected-symptom-chip" key={symptom}>
                      <CheckCircle2 size={15} />
                      {symptom}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="prediction-layout">


        {/* =========================
            FORM
        ========================= */}

        <form
          className="prediction-card"
          onSubmit={handlePrediction}
        >

          <div className="prediction-card-header">

            <div className="section-icon">
              <Stethoscope size={21} />
            </div>

            <div>
              <span className="section-label">
                HEALTH INFORMATION
              </span>

              <h2>
                Tell us about your symptoms
              </h2>
            </div>

          </div>


          {/* BASIC INFORMATION */}

          <div className="form-section">

            <div className="form-section-title">
              Basic Information
            </div>

            <div className="form-grid">

              <div className="input-group">

                <label>
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                />

              </div>


              <div className="input-group">

                <label>
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >

                  <option value="">
                    Select gender
                  </option>

                  <option value="male">
                    Male
                  </option>

                  <option value="female">
                    Female
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* SYMPTOMS */}

          <div className="form-section">

            <div className="form-section-title">
              Common Symptoms
            </div>
            <p className="symptom-hint">Tick the symptoms you currently have.</p>


            <div className="symptom-grid">

              <SymptomField
                icon={<Thermometer size={17} />}
                label="Fever"
                name="fever"
                value={formData.fever}
                onChange={handleChange}
              />

              <SymptomField
                icon={<Activity size={17} />}
                label="Cough"
                name="cough"
                value={formData.cough}
                onChange={handleChange}
              />

              <SymptomField
                icon={<HeartPulse size={17} />}
                label="Fatigue"
                name="fatigue"
                value={formData.fatigue}
                onChange={handleChange}
              />

              <SymptomField
                icon={<AlertCircle size={17} />}
                label="Headache"
                name="headache"
                value={formData.headache}
                onChange={handleChange}
              />

              <SymptomField
                icon={<Activity size={17} />}
                label="Breathing difficulty"
                name="breathing"
                value={formData.breathing}
                onChange={handleChange}
              />

              <SymptomField
                icon={<HeartPulse size={17} />}
                label="Chest pain"
                name="chestPain"
                value={formData.chestPain}
                onChange={handleChange}
              />

              <SymptomField
                icon={<AlertCircle size={17} />}
                label="Nausea"
                name="nausea"
                value={formData.nausea}
                onChange={handleChange}
              />

              <SymptomField
                icon={<Activity size={17} />}
                label="Body pain"
                name="bodyPain"
                value={formData.bodyPain}
                onChange={handleChange}
              />

            </div>

          </div>


          {/* BUTTONS */}

          <div className="prediction-actions">

            <button
              type="button"
              className="reset-button"
              onClick={resetForm}
            >
              <RotateCcw size={17} />
              Reset
            </button>

            <button
              type="submit"
              className="predict-button"
            >
              <Brain size={18} />
              Analyze Symptoms
              <ArrowRight size={17} />
            </button>

          </div>

        </form>


        {/* =========================
            RESULT PANEL
        ========================= */}

        <aside className="prediction-side">


          {/* RESULT */}

          <div className="result-card">

            <div className="result-card-top">

              <div className="result-icon">
                {result?.type === "attention" ? (
                  <AlertCircle size={25} />
                ) : result?.type === "warning" ? (
                  <AlertCircle size={25} />
                ) : (
                  <Brain size={25} />
                )}
              </div>

              <span>
                AI SCREENING
              </span>

            </div>


            {!result ? (

              <div className="empty-result">

                <div className="empty-brain">
                  <Brain size={35} />
                </div>

                <h3>
                  Your result will appear here
                </h3>

                <p>
                  Complete the symptom assessment and
                  click “Analyze Symptoms” to see your
                  preliminary screening result.
                </p>

              </div>

            ) : (

              <div
                className={`result-content ${result.type}`}
              >

                <div className="result-status">

                  {result.type === "normal" ? (
                    <CheckCircle2 size={25} />
                  ) : (
                    <AlertCircle size={25} />
                  )}

                </div>

                <h3>
                  {result.title}
                </h3>

                <p>
                  {result.message}
                </p>

              </div>

            )}

          </div>


          {/* HOW IT WORKS */}

          <div className="how-card">

            <div className="how-title">
              <Brain size={18} />
              How it works
            </div>

            <div className="how-step">

              <span>01</span>

              <div>
                <strong>
                  Enter information
                </strong>

                <p>
                  Provide your age, gender and symptoms.
                </p>
              </div>

            </div>


            <div className="how-step">

              <span>02</span>

              <div>
                <strong>
                  AI screening
                </strong>

                <p>
                  Your responses are analyzed for patterns.
                </p>
              </div>

            </div>


            <div className="how-step">

              <span>03</span>

              <div>
                <strong>
                  Review result
                </strong>

                <p>
                  Use the result as a health-information guide.
                </p>
              </div>

            </div>

          </div>


          {/* EMERGENCY */}

          <div className="emergency-card">

            <AlertCircle size={19} />

            <div>

              <strong>
                Experiencing severe symptoms?
              </strong>

              <p>
                Seek immediate medical attention for
                serious or rapidly worsening symptoms.
              </p>

            </div>

          </div>

        </aside>

      </div>

    </div>
  );
}


/* =========================
   SYMPTOM COMPONENT
========================= */

function SymptomField({
  icon,
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div className="symptom-field">

      <div className="symptom-label">

        <div className="symptom-icon">
          {icon}
        </div>

        <span>
          {label}
        </span>

      </div>

      <label className="symptom-toggle" aria-label={`${label} present`}>
        <input
          type="checkbox"
          name={name}
          checked={value === "yes"}
          onChange={onChange}
        />
        <span className="symptom-checkbox" aria-hidden="true" />
      </label>

    </div>
  );
}

export default DiseasePrediction;