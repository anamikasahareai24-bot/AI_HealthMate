
import { useState } from "react";
import { getRecommendedSpecialist } from "../specialistMapping.js";


const commonConditions = [
  { name: "Migraine", icon: "🧠" },
  { name: "Headache", icon: "🤕" },
  { name: "Epilepsy", icon: "⚡" },
  { name: "Diabetes", icon: "🩸" },
  { name: "Thyroid Disorder", icon: "🦋" },
  { name: "Acne", icon: "✨" },
  { name: "Eczema", icon: "🧴" },
  { name: "Psoriasis", icon: "🩹" },
  { name: "Hair Loss", icon: "💇" },
  { name: "Asthma", icon: "🫁" },
  { name: "Pneumonia", icon: "🫁" },
  { name: "Hypertension", icon: "❤️" },
  { name: "Heart Disease", icon: "💓" },
  { name: "Kidney Disease", icon: "🫘" },
  { name: "Arthritis", icon: "🦴" },
  { name: "Joint Pain", icon: "🦴" },
  { name: "Glaucoma", icon: "👁️" },
  { name: "Cataracts", icon: "👁️" },
  { name: "Depression", icon: "🧠" },
  { name: "Anxiety", icon: "💭" },
  { name: "Gastritis", icon: "🩺" },
  { name: "Acid Reflux", icon: "🍽️" },
  { name: "Migraine", icon: "🧠" },
  { name: "Anemia", icon: "🩸" },
];

const specialistInfo = {
  Neurologist: {
    description: "Specializes in the brain, spinal cord, nerves, and nervous system.",
    conditions: ["Migraine", "Epilepsy", "Nerve disorders"],
    nextStep: "Describe your symptoms and their duration during your consultation.",
    icon: "🧠",
  },
  Dermatologist: {
    description: "Specializes in diseases of the skin, hair, and nails.",
    conditions: ["Acne", "Eczema", "Psoriasis"],
    nextStep: "Mention any skin changes, itching, or products that affect your condition.",
    icon: "🧴",
  },
  Endocrinologist: {
    description: "Specializes in hormones, glands, and metabolic conditions.",
    conditions: ["Diabetes", "Thyroid disorders", "Hormonal disorders"],
    nextStep: "Bring any available blood sugar or hormone test results.",
    icon: "🩸",
  },
  Pulmonologist: {
    description: "Specializes in diseases of the lungs and respiratory system.",
    conditions: ["Asthma", "Pneumonia", "Chronic lung conditions"],
    nextStep: "Discuss breathing symptoms, triggers, and current medicines.",
    icon: "🫁",
  },
  Cardiologist: {
    description: "Specializes in the heart and cardiovascular system.",
    conditions: ["Heart disease", "Hypertension", "Heart rhythm disorders"],
    nextStep: "Bring relevant blood pressure readings and previous test results.",
    icon: "❤️",
  },
  Nephrologist: {
    description: "Specializes in kidney function and kidney diseases.",
    conditions: ["Kidney disease", "Chronic kidney conditions"],
    nextStep: "Bring available kidney function reports and your medication list.",
    icon: "🫘",
  },
  Rheumatologist: {
    description: "Specializes in inflammatory and autoimmune conditions affecting joints and connective tissues.",
    conditions: ["Arthritis", "Autoimmune conditions", "Joint inflammation"],
    nextStep: "Describe joint pain, stiffness, swelling, and how long symptoms have lasted.",
    icon: "🦴",
  },
  Ophthalmologist: {
    description: "A medical doctor who diagnoses and treats eye diseases.",
    conditions: ["Glaucoma", "Cataracts", "Other eye conditions"],
    nextStep: "Mention any changes in vision and bring previous eye examination records.",
    icon: "👁️",
  },
  Psychiatrist: {
    description: "A medical doctor specializing in mental health conditions.",
    conditions: ["Depression", "Anxiety", "Other mental health conditions"],
    nextStep: "Discuss your symptoms, their duration, and how they affect daily life.",
    icon: "🧠",
  },
  Gastroenterologist: {
    description: "Specializes in the digestive system, including the stomach and intestines.",
    conditions: ["Gastritis", "Acid reflux", "Digestive disorders"],
    nextStep: "Describe your digestive symptoms, their frequency, and any medicines you take.",
    icon: "🩺",
  },
};

function SpecialistRecommendation() {
  const [disease, setDisease] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRecommendation = (value = disease) => {
    const query = value.trim();
    setDisease(value);
    setHasSearched(true);
    setRecommendation(query ? getRecommendedSpecialist(query) : null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleRecommendation();
    }
  };

  const info = recommendation
    ? specialistInfo[recommendation.specialist]
    : null;

  return (
    <main className="specialist-page">
      <div className="specialist-container">
        <header className="specialist-header">
          <div className="header-icon">🩺</div>
          <div>
            <span className="eyebrow">HEALTHCARE GUIDANCE</span>
            <h1>Specialist Recommendation</h1>
            <p>
              Find a suitable medical specialist for your condition.
            </p>
          </div>
        </header>

        <section className="search-card">
          <h2>What condition do you need help with?</h2>
          <p className="search-description">
            Enter a disease or select a common condition below.
          </p>

          <div className="search-row">
            <input
              id="disease"
              type="text"
              aria-label="Disease or medical condition"
              placeholder="e.g. Diabetes, Migraine, Asthma..."
              value={disease}
              onChange={(event) => {
                setDisease(event.target.value);
                setRecommendation(null);
                setHasSearched(false);
              }}
              onKeyDown={handleKeyDown}
            />
            <button onClick={() => handleRecommendation()}>
              Find Specialist
            </button>
          </div>

          <div className="popular-section">
            <span className="popular-label">COMMON CONDITIONS</span>
            <div className="condition-chips">
              {commonConditions.map((condition) => (
                <button
                  className="condition-chip"
                  key={condition.name}
                  onClick={() => handleRecommendation(condition.name)}
                >
                  <span>{condition.icon}</span> {condition.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {recommendation && (
          <section className="result-card" aria-live="polite">
            <div className="result-top">
              <div className="result-icon">
                {info?.icon || "🩺"}
              </div>
              <div className="result-heading">
                <span className="result-label">
                  YOUR RECOMMENDED SPECIALIST
                </span>
                <h2>{recommendation.specialist}</h2>
                <span className="department-badge">
                  {recommendation.department}
                </span>
              </div>
            </div>

            <div className="result-content">
              <div className="detail-section">
                <h3>Why this specialist?</h3>
                <p>{recommendation.reason}</p>
                {info && <p>{info.description}</p>}
              </div>

              {info && (
                <div className="detail-section">
                  <h3>Related conditions</h3>
                  <div className="condition-chips result-chips">
                    {info.conditions.map((condition) => (
                      <span className="detail-chip" key={condition}>
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {info && (
                <div className="next-step">
                  <span className="next-step-icon">📋</span>
                  <div>
                    <h3>Before your consultation</h3>
                    <p>{info.nextStep}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="recommendation-note">
              <span>ℹ️</span>
              <p>
                This is general informational guidance based on a local
                condition mapping. It is not a diagnosis. A qualified
                healthcare professional can determine the appropriate care.
              </p>
            </div>

            <button
              className="reset-button"
              onClick={() => {
                setDisease("");
                setRecommendation(null);
                setHasSearched(false);
              }}
            >
              Search another condition
            </button>
          </section>
        )}

        {hasSearched && !recommendation && (
          <section className="no-result" aria-live="polite">
            <span className="no-result-icon">🔎</span>
            <h2>No matching specialist found</h2>
            <p>
              We don't currently have a mapping for "{disease.trim()}".
              Try one of the common conditions above or enter a condition
              already supported by the system.
            </p>
          </section>
        )}

        {!recommendation && !hasSearched && (
          <section className="info-section">
            <div className="info-item">
              <span className="info-icon">🎯</span>
              <div>
                <h3>Condition-based guidance</h3>
                <p>
                  Get a specialist suggestion using the condition mapping
                  stored in the project.
                </p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🏥</span>
              <div>
                <h3>Understand the department</h3>
                <p>
                  Learn what the recommended specialist generally treats
                  and prepare for a consultation.
                </p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🩺</span>
              <div>
                <h3>When to Seek Medical Care</h3>
                <p>
                  Learn when to consult a healthcare professional.
                  Seek urgent medical help for severe or sudden symptoms.
                </p>
              </div>
            </div>

          </section>
        )}

        <p className="medical-disclaimer">
          For severe or sudden symptoms, seek urgent medical care instead
          of relying on an online recommendation.
        </p>
      </div>
    </main>
  );
}

export default SpecialistRecommendation;
