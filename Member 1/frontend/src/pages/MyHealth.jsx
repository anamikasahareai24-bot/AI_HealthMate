import React, { useEffect, useMemo, useState } from "react";
import {
  HeartPulse,
  Weight,
  Ruler,
  Edit3,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Pill,
  ClipboardList,
  UserRound,
} from "lucide-react";

import "./MyHealth.css";

function MyHealth() {
  const [isEditing, setIsEditing] = useState(false);

  const [healthData, setHealthData] = useState({
    age: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
  });

  const [profileSummary, setProfileSummary] = useState({
    bloodGroup: "",
    allergies: [],
    medicalHistory: "",
    medications: "",
    emergencyName: "",
    emergencyPhone: "",
  });

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("healthmate_health_profile");
      if (!savedProfile) return;
      const parsed = JSON.parse(savedProfile);
      setProfileSummary((previous) => ({
        ...previous,
        ...parsed,
        allergies: Array.isArray(parsed.allergies)
          ? parsed.allergies
          : parsed.allergies
            ? parsed.allergies.split(", ").filter(Boolean)
            : [],
      }));
    } catch (error) {
      console.error("Unable to load health profile summary:", error);
    }
  }, []);

  const [saved, setSaved] = useState(false);

  const updateValue = (field, value) => {
    setHealthData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const bmi = useMemo(() => {
    const height = Number(healthData.height);
    const weight = Number(healthData.weight);

    if (!height || !weight) return "Not available";

    const value = weight / ((height / 100) ** 2);

    return value.toFixed(1);
  }, [healthData.height, healthData.weight]);

  const bmiStatus = useMemo(() => {
    const value = Number(bmi);

    if (!value) return "Add height and weight to calculate";
    if (value < 18.5) return "Below normal range";
    if (value < 25) return "Normal range";
    if (value < 30) return "Above normal range";

    return "High range";
  }, [bmi]);

  const handleSave = () => {
    setIsEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="my-health-page">

      {/* ================= HEADER ================= */}

      <div className="my-health-header">

        <div>
          <div className="my-health-eyebrow">
            <HeartPulse size={14} />
            MY HEALTH
          </div>

          <h1>
            Your Health,
            <span> Your Data.</span>
          </h1>

          <p>
            Keep your important health information organized
            and easily accessible in one place.
          </p>
        </div>

        <div className="my-health-header-icon">
          <HeartPulse size={36} />
        </div>

      </div>


      {/* ================= SUCCESS ================= */}

      {saved && (
        <div className="health-success">
          <CheckCircle2 size={17} />
          Health information saved successfully.
        </div>
      )}


      {/* ================= PROFILE SUMMARY ================= */}

      <section className="health-profile-card">

        <div className="health-profile-left">

          <div className="health-avatar">
            <HeartPulse size={27} />
          </div>

          <div>
            <span className="health-small-label">
              HEALTH PROFILE
            </span>

            <h2>
              Personal Health Information
            </h2>

            <p>
              Keep your information updated for better
              health tracking.
            </p>
          </div>

        </div>


        {!isEditing ? (

          <button
            className="health-edit-btn"
            onClick={() => setIsEditing(true)}
          >
            <Edit3 size={15} />
            Edit Health
          </button>

        ) : (

          <div className="health-edit-actions">

            <button
              className="health-cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              <X size={15} />
              Cancel
            </button>

            <button
              className="health-save-btn"
              onClick={handleSave}
            >
              <Save size={15} />
              Save
            </button>

          </div>

        )}

      </section>


      {/* ================= BASIC INFORMATION ================= */}

      <section className="health-section">

        <div className="health-section-title">
          <div>
            <span>PERSONAL INFORMATION</span>
            <h2>Basic Health Details</h2>
          </div>
        </div>


        <div className="health-details-grid">

          <HealthField
            label="Age"
            value={healthData.age}
            editing={isEditing}
            onChange={(value) =>
              updateValue("age", value)
            }
            suffix="years"
          />

          <HealthField
            label="Gender"
            value={healthData.gender}
            editing={isEditing}
            type="select"
            options={[
              "Male",
              "Female",
              "Other",
              "Prefer not to say",
            ]}
            onChange={(value) =>
              updateValue("gender", value)
            }
          />

          <HealthField
            label="Blood Group"
            value={healthData.bloodGroup}
            editing={isEditing}
            type="select"
            options={[
              "A+",
              "A-",
              "B+",
              "B-",
              "AB+",
              "AB-",
              "O+",
              "O-",
            ]}
            onChange={(value) =>
              updateValue("bloodGroup", value)
            }
          />

          <HealthField
            label="Height"
            value={healthData.height}
            editing={isEditing}
            onChange={(value) =>
              updateValue("height", value)
            }
            suffix="cm"
          />

          <HealthField
            label="Weight"
            value={healthData.weight}
            editing={isEditing}
            onChange={(value) =>
              updateValue("weight", value)
            }
            suffix="kg"
          />

        </div>

      </section>


      {/* ================= HEALTH PROFILE SUMMARY ================= */}

      <section className="health-section">
        <div className="health-section-title">
          <div>
            <span>YOUR HEALTH PROFILE</span>
            <h2>Medical Summary</h2>
          </div>
          <a className="health-summary-edit" href="/health-profile">
            <Edit3 size={14} /> Update profile
          </a>
        </div>

        <div className="health-summary-grid">
          <HealthSummaryCard icon={ShieldCheck} title="Blood Group" value={profileSummary.bloodGroup || "Not added"} />
          <HealthSummaryCard
            icon={AlertCircle}
            title="Allergies"
            value={profileSummary.allergies?.length ? profileSummary.allergies.join(", ") : "None added"}
          />
          <HealthSummaryCard icon={ClipboardList} title="Medical History" value={profileSummary.medicalHistory || "Not added"} />
          <HealthSummaryCard icon={Pill} title="Medications" value={profileSummary.medications || "Not added"} />
          <HealthSummaryCard
            icon={UserRound}
            title="Emergency Contact"
            value={[profileSummary.emergencyName, profileSummary.emergencyPhone].filter(Boolean).join(" · ") || "Not added"}
          />
        </div>
      </section>


      {/* ================= BODY METRICS ================= */}

      <section className="health-section">

        <div className="health-section-title">
          <div>
            <span>BODY METRICS</span>
            <h2>Body Measurements</h2>
          </div>
        </div>


        <div className="metrics-grid">

          <div className="metric-card">

            <div className="metric-icon">
              <Weight size={21} />
            </div>

            <div>
              <span>Weight</span>

              <strong>
                {healthData.weight || "Not added"}
                {healthData.weight && <small> kg</small>}
              </strong>
            </div>

          </div>


          <div className="metric-card">

            <div className="metric-icon">
              <Ruler size={21} />
            </div>

            <div>
              <span>Height</span>

              <strong>
                {healthData.height || "Not added"}
                {healthData.height && <small> cm</small>}
              </strong>
            </div>

          </div>


          <div className="metric-card">

            <div className="metric-icon">
              <TrendingUp size={21} />
            </div>

            <div>
              <span>BMI</span>

              <strong>
                {bmi}
              </strong>

              <small className="bmi-status">
                {bmiStatus}
              </small>
            </div>

          </div>

        </div>

      </section>


      {/* ================= DISCLAIMER ================= */}

      <div className="health-disclaimer">

        <AlertCircle size={17} />

        <p>
          Your saved health profile is for personal reference.
          It should not be used as a substitute for professional
          medical diagnosis or treatment.
        </p>

      </div>

    </div>
  );
}


/* ================= HEALTH FIELD ================= */

function HealthField({
  label,
  value,
  editing,
  onChange,
  suffix,
  type = "text",
  options = [],
}) {
  return (
    <div className="health-field">

      <label>
        {label}
      </label>

      {editing ? (

        type === "select" ? (

          <select
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
          >
            <option value="">Select {label.toLowerCase()}</option>
            {options.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>

        ) : (

          <div className="field-input-wrapper">

            <input
              type="text"
              value={value}
              onChange={(e) =>
                onChange(e.target.value)
              }
            />

            {suffix && (
              <span>{suffix}</span>
            )}

          </div>

        )

      ) : (

        <div className="health-read-value">

          <strong className={value ? "" : "health-value-empty"}>
            {value || "Not added"}
          </strong>

          {suffix && (
            <span>{suffix}</span>
          )}

        </div>

      )}

    </div>
  );
}

function HealthSummaryCard({ icon: Icon, title, value }) {
  return (
    <article className="health-summary-card">
      <div className="health-summary-icon"><Icon size={18} /></div>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </article>
  );
}

export default MyHealth;
