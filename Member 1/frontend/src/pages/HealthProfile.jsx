import React, { useEffect, useState } from "react";
import {
  UserRound,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  ShieldCheck,
  AlertCircle,
  Pill,
  Users,
  Activity,
  Save,
} from "lucide-react";
import "./HealthProfile.css";

const allergyOptions = [
  "No known allergies",
  "Dust",
  "Pollen",
  "Pets / Animals",
  "Peanuts",
  "Tree Nuts",
  "Milk / Dairy",
  "Eggs",
  "Gluten / Wheat",
  "Shellfish",
  "Fish",
  "Medicines",
  "Insect Stings",
  "Cosmetics / Chemicals",
  "Other",
];

const initialProfile = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  bloodGroup: "",

  phone: "",
  email: "",
  address: "",

  emergencyName: "",
  emergencyRelation: "",
  emergencyPhone: "",

  allergies: [],

  medicalHistory: "",
  medications: "",

  lifestyle: "",
  additionalNotes: "",
};

const HealthProfile = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [allergySearch, setAllergySearch] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem(
      "healthmate_health_profile"
    );

    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);

        setProfile({
          ...initialProfile,
          ...parsedProfile,

          // Old data compatibility
          allergies: Array.isArray(parsedProfile.allergies)
            ? parsedProfile.allergies
            : parsedProfile.allergies
            ? parsedProfile.allergies
                .split(", ")
                .filter(Boolean)
            : [],
        });
      } catch (error) {
        console.error("Unable to load health profile:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAllergyChange = (allergy) => {
    setProfile((prev) => {
      const currentAllergies = prev.allergies || [];

      // No known allergies
      if (allergy === "No known allergies") {
        if (currentAllergies.includes("No known allergies")) {
          return {
            ...prev,
            allergies: [],
          };
        }

        return {
          ...prev,
          allergies: ["No known allergies"],
        };
      }

      // If another allergy is selected, remove "No known allergies"
      let updatedAllergies = currentAllergies.filter(
        (item) => item !== "No known allergies"
      );

      if (updatedAllergies.includes(allergy)) {
        updatedAllergies = updatedAllergies.filter(
          (item) => item !== allergy
        );
      } else {
        updatedAllergies = [
          ...updatedAllergies,
          allergy,
        ];
      }

      return {
        ...prev,
        allergies: updatedAllergies,
      };
    });
  };

  const addCustomAllergy = () => {
    const allergy = allergySearch.trim();
    if (!allergy) return;

    const existing = [...allergyOptions, ...profile.allergies].some(
      (item) => item.toLowerCase() === allergy.toLowerCase()
    );

    if (!existing) handleAllergyChange(allergy);
    setAllergySearch("");
  };

  const customAllergies = profile.allergies.filter(
    (allergy) => !allergyOptions.includes(allergy)
  );
  const visibleAllergies = [...allergyOptions, ...customAllergies].filter(
    (allergy) => allergy.toLowerCase().includes(allergySearch.trim().toLowerCase())
  );

  const handleSave = () => {
    localStorage.setItem(
      "healthmate_health_profile",
      JSON.stringify(profile)
    );

    alert("Health profile saved successfully.");
  };

  return (
    <div className="health-profile-page">

      {/* ================= HEADER ================= */}

      <div className="health-profile-header">

        <div className="header-left">

          <div className="profile-main-icon">
            <HeartPulse size={28} />
          </div>

          <div>
            <span className="page-kicker">
              MY HEALTH
            </span>

            <h1>Health Profile</h1>

            <p>
              Keep your personal and medical information
              updated in one place.
            </p>
          </div>

        </div>

        <button
          className="save-profile-btn"
          onClick={handleSave}
        >
          <Save size={17} />
          Save Profile
        </button>

      </div>

      {/* ================= STATUS ================= */}

      <div className="profile-status-card">

        <div className="status-icon">
          <ShieldCheck size={23} />
        </div>

        <div>
          <h3>Your health information</h3>

          <p>
            Keep this information accurate so AI HealthMate
            can provide more relevant healthcare assistance.
          </p>
        </div>

      </div>

      {/* ================= PERSONAL INFORMATION ================= */}

      <section className="profile-section">

        <div className="section-title">

          <div className="section-title-icon blue">
            <UserRound size={20} />
          </div>

          <div>
            <h2>Personal Information</h2>

            <p>
              Your basic personal details
            </p>
          </div>

        </div>

        <div className="form-grid">

          <div className="form-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

          </div>

          <div className="form-group">

            <label>
              Date of Birth
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={profile.dateOfBirth}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>
              Gender
            </label>

            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="">
                Select gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

              <option value="Prefer not to say">
                Prefer not to say
              </option>
            </select>

          </div>

          <div className="form-group">

            <label>
              Blood Group
            </label>

            <select
              name="bloodGroup"
              value={profile.bloodGroup}
              onChange={handleChange}
            >
              <option value="">
                Select blood group
              </option>

              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

          </div>

        </div>

      </section>

      {/* ================= CONTACT INFORMATION ================= */}

      <section className="profile-section">

        <div className="section-title">

          <div className="section-title-icon teal">
            <Phone size={20} />
          </div>

          <div>
            <h2>Contact Information</h2>

            <p>
              Your contact and location details
            </p>
          </div>

        </div>

        <div className="form-grid">

          <div className="form-group">

            <label>
              <Phone size={14} />
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />

          </div>

          <div className="form-group">

            <label>
              <Mail size={14} />
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />

          </div>

          <div className="form-group full-width">

            <label>
              <MapPin size={14} />
              Address
            </label>

            <textarea
              name="address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows="3"
            />

          </div>

        </div>

      </section>

      {/* ================= MEDICAL INFORMATION ================= */}

      <section className="profile-section">

        <div className="section-title">

          <div className="section-title-icon red">
            <Activity size={20} />
          </div>

          <div>
            <h2>Medical Information</h2>

            <p>
              Important information about your health
            </p>
          </div>

        </div>

        <div className="form-grid">

          {/* ALLERGIES */}

          <div className="form-group full-width">

            <label>
              <AlertCircle size={14} />
              Allergies
            </label>

            <div className="allergy-search-row">
              <input
                type="search"
                className="allergy-search-input"
                value={allergySearch}
                onChange={(event) => setAllergySearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addCustomAllergy();
                  }
                }}
                placeholder="Search or type an allergy"
                aria-label="Search or add an allergy"
              />
              {allergySearch.trim() && ![...allergyOptions, ...profile.allergies].some(
                (item) => item.toLowerCase() === allergySearch.trim().toLowerCase()
              ) && (
                <button
                  type="button"
                  className="add-allergy-btn"
                  onClick={addCustomAllergy}
                >
                  Add “{allergySearch.trim()}”
                </button>
              )}
            </div>

            <div className="allergy-options">

              {visibleAllergies.map((allergy) => {

                const selected =
                  profile.allergies.includes(allergy);

                return (
                  <button
                    type="button"
                    key={allergy}
                    className={`allergy-option ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleAllergyChange(allergy)
                    }
                  >

                    <span className="allergy-check">
                      {selected && "✓"}
                    </span>

                    <span>
                      {allergy}
                    </span>

                  </button>
                );
              })}

            </div>

            {profile.allergies.length === 0 && (
                <p className="empty-field">
                  No allergy information added.
                </p>
              )}

          </div>

          {/* MEDICAL HISTORY */}

          <div className="form-group full-width">

            <label>
              <HeartPulse size={14} />
              Medical History
            </label>

            <textarea
              name="medicalHistory"
              value={profile.medicalHistory}
              onChange={handleChange}
              placeholder="Mention previous illnesses, surgeries, chronic conditions, etc."
              rows="4"
            />

          </div>

          {/* MEDICATIONS */}

          <div className="form-group full-width">

            <label>
              <Pill size={14} />
              Current Medications
            </label>

            <textarea
              name="medications"
              value={profile.medications}
              onChange={handleChange}
              placeholder="List any medicines you currently take..."
              rows="3"
            />

          </div>

        </div>

      </section>

      {/* ================= EMERGENCY CONTACT ================= */}

      <section className="profile-section emergency-section">

        <div className="section-title">

          <div className="section-title-icon orange">
            <Users size={20} />
          </div>

          <div>
            <h2>Emergency Contact</h2>

            <p>
              Someone who can be contacted in an emergency
            </p>
          </div>

        </div>

        <div className="form-grid">

          <div className="form-group">

            <label>
              Contact Name
            </label>

            <input
              type="text"
              name="emergencyName"
              value={profile.emergencyName}
              onChange={handleChange}
              placeholder="Emergency contact name"
            />

          </div>

          <div className="form-group">

            <label>
              Relationship
            </label>

            <input
              type="text"
              name="emergencyRelation"
              value={profile.emergencyRelation}
              onChange={handleChange}
              placeholder="Example: Father, Mother, Spouse"
            />

          </div>

          <div className="form-group">

            <label>
              Emergency Phone
            </label>

            <input
              type="tel"
              name="emergencyPhone"
              value={profile.emergencyPhone}
              onChange={handleChange}
              placeholder="Emergency contact number"
            />

          </div>

        </div>

      </section>

      {/* ================= LIFESTYLE ================= */}

      <section className="profile-section">

        <div className="section-title">

          <div className="section-title-icon green">
            <Activity size={20} />
          </div>

          <div>
            <h2>Lifestyle Information</h2>

            <p>
              Information that may help understand your
              lifestyle
            </p>
          </div>

        </div>

        <div className="form-grid">

          <div className="form-group full-width">

            <label>
              Lifestyle & Habits
            </label>

            <textarea
              name="lifestyle"
              value={profile.lifestyle}
              onChange={handleChange}
              placeholder="Example: Exercise routine, smoking, alcohol consumption, dietary preferences..."
              rows="4"
            />

          </div>

          <div className="form-group full-width">

            <label>
              Additional Notes
            </label>

            <textarea
              name="additionalNotes"
              value={profile.additionalNotes}
              onChange={handleChange}
              placeholder="Any other health information you want to keep in your profile..."
              rows="4"
            />

          </div>

        </div>

      </section>

      {/* ================= PRIVACY NOTE ================= */}

      <div className="profile-note">

        <ShieldCheck size={18} />

        <p>
          <strong>Privacy note:</strong> Only add health
          information that you are comfortable storing in
          this application. This frontend version stores
          profile data locally in your browser.
        </p>

      </div>

    </div>
  );
};

export default HealthProfile;