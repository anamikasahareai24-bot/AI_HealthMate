import { useState } from "react";
import { getRecommendedSpecialist } from "../specialistMapping.js";

function SpecialistRecommendation() {
  const [disease, setDisease] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  const handleRecommendation = () => {
    const result = getRecommendedSpecialist(disease);
    setRecommendation(result);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleRecommendation();
    }
  };

  return (
    <div className="specialist-page">
      <div className="specialist-container">

        {/* Header */}
        <div className="specialist-header">
          <div className="header-icon">🩺</div>

          <div>
            <h1>AI Specialist Recommendation</h1>
            <p>
              Find the appropriate type of medical specialist
              based on your condition.
            </p>
          </div>
        </div>

        {/* Search Card */}
        <div className="search-card">
          <label htmlFor="disease">
            Enter your disease or condition
          </label>

          <div className="search-row">
            <input
              id="disease"
              type="text"
              placeholder="e.g. Diabetes, Migraine, Asthma..."
              value={disease}
              onChange={(event) => {
                setDisease(event.target.value);
                setRecommendation(null);
              }}
              onKeyDown={handleKeyDown}
            />

            <button onClick={handleRecommendation}>
              Find Specialist
            </button>
          </div>

          <p className="input-hint">
            Enter a condition and we'll suggest the relevant specialist.
          </p>
        </div>

        {/* Recommendation Result */}
        {recommendation && (
          <div className="result-card">

            <div className="result-title">
              <span className="result-icon">✓</span>

              <div>
                <span className="result-label">
                  Recommended Specialist
                </span>
                <h2>{recommendation.specialist}</h2>
              </div>
            </div>

            <div className="department-badge">
              {recommendation.department}
            </div>

            <div className="reason-section">
              <h3>Why this specialist?</h3>

              <p>{recommendation.reason}</p>
            </div>

            <div className="recommendation-note">
              <span>ℹ️</span>
              <p>
                This recommendation is for informational purposes
                and does not replace professional medical advice.
              </p>
            </div>

          </div>
        )}

        {/* No Result */}
        {disease && !recommendation && (
          <div className="no-result">
            <div className="no-result-icon">🔍</div>

            <h3>No specialist found</h3>

            <p>
              We don't currently have a recommendation for
              "{disease}".
            </p>

            <p>
              Please try another disease or condition.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!disease && (
          <div className="info-section">

            <div className="info-item">
              <span>🧠</span>
              <div>
                <h3>Smart Recommendation</h3>
                <p>
                  Get a specialist suggestion based on your condition.
                </p>
              </div>
            </div>

            <div className="info-item">
              <span>🏥</span>
              <div>
                <h3>Healthcare Guidance</h3>
                <p>
                  Use the recommendation to identify the appropriate
                  medical department.
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default SpecialistRecommendation;