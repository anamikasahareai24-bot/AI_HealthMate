import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Pencil,
  Save,
  X,
  Camera,
  CheckCircle2,
} from "lucide-react";

import "./Profile.css";

function Profile() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Your Name",
    email: "your@email.com",
    phone: "",
    city: "",
    dateOfBirth: "",
    gender: "Prefer not to say",
    bloodGroup: "Not Added",
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const startEditing = () => {
    setTempProfile(profile);
    setEditing(true);
    setSaved(false);
  };

  const cancelEditing = () => {
    setTempProfile(profile);
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTempProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveProfile = () => {
    setProfile(tempProfile);
    setEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const initials =
    profile.name && profile.name !== "Your Name"
      ? profile.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "YN";

  return (
    <div className="profile-page">

      {/* ================= HEADER ================= */}

      <div className="profile-header">

        <div>
          <div className="profile-eyebrow">
            <User size={14} />
            MY PROFILE
          </div>

          <h1>
            Your Health,
            <span> Your Profile.</span>
          </h1>

          <p>
            Manage your personal information and
            healthcare account details.
          </p>
        </div>

        <div className="profile-header-icon">
          <User size={32} />
        </div>

      </div>


      {/* ================= SUCCESS ================= */}

      {saved && (
        <div className="profile-success">
          <CheckCircle2 size={16} />
          Profile updated successfully.
        </div>
      )}


      {/* ================= PROFILE CARD ================= */}

      <div className="profile-layout">

        {/* LEFT PROFILE CARD */}

        <div className="profile-card profile-main-card">

          <div className="profile-cover"></div>

          <div className="profile-avatar-wrapper">

            <div className="profile-avatar">
              {initials}
            </div>

            {editing && (
              <button className="avatar-camera">
                <Camera size={14} />
              </button>
            )}

          </div>

          <div className="profile-identity">

            <h2>
              {profile.name}
            </h2>

            <p>
              {profile.email}
            </p>

            <span className="profile-status">
              <span></span>
              Active Account
            </span>

          </div>


          <div className="profile-divider"></div>


          <div className="profile-mini-info">

            <div>
              <ShieldCheck size={16} />
              <span>Health Account</span>
            </div>

            <div>
              <CalendarDays size={16} />
              <span>
                {profile.dateOfBirth
                  ? profile.dateOfBirth
                  : "DOB not added"}
              </span>
            </div>

          </div>

        </div>


        {/* RIGHT DETAILS */}

        <div className="profile-card profile-details-card">

          <div className="profile-card-heading">

            <div>
              <span>PERSONAL INFORMATION</span>

              <h2>
                Account Details
              </h2>
            </div>

            {!editing ? (
              <button
                className="profile-edit-btn"
                onClick={startEditing}
              >
                <Pencil size={14} />
                Edit Profile
              </button>
            ) : (
              <div className="profile-edit-actions">

                <button
                  className="profile-cancel-btn"
                  onClick={cancelEditing}
                >
                  <X size={14} />
                  Cancel
                </button>

                <button
                  className="profile-save-btn"
                  onClick={saveProfile}
                >
                  <Save size={14} />
                  Save
                </button>

              </div>
            )}

          </div>


          <div className="profile-fields">

            {/* NAME */}

            <ProfileField
              icon={<User size={17} />}
              label="Full Name"
              name="name"
              value={
                editing
                  ? tempProfile.name
                  : profile.name
              }
              editing={editing}
              onChange={handleChange}
            />


            {/* EMAIL */}

            <ProfileField
              icon={<Mail size={17} />}
              label="Email Address"
              name="email"
              type="email"
              value={
                editing
                  ? tempProfile.email
                  : profile.email
              }
              editing={editing}
              onChange={handleChange}
            />


            {/* PHONE */}

            <ProfileField
              icon={<Phone size={17} />}
              label="Phone Number"
              name="phone"
              value={
                editing
                  ? tempProfile.phone
                  : profile.phone || "Not added"
              }
              editing={editing}
              onChange={handleChange}
            />


            {/* CITY */}

            <ProfileField
              icon={<MapPin size={17} />}
              label="City"
              name="city"
              value={
                editing
                  ? tempProfile.city
                  : profile.city || "Not added"
              }
              editing={editing}
              onChange={handleChange}
            />


            {/* DOB */}

            <div className="profile-field">

              <div className="field-icon">
                <CalendarDays size={17} />
              </div>

              <div className="field-content">

                <label>
                  Date of Birth
                </label>

                {editing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={tempProfile.dateOfBirth}
                    onChange={handleChange}
                  />
                ) : (
                  <p>
                    {profile.dateOfBirth ||
                      "Not added"}
                  </p>
                )}

              </div>

            </div>


            {/* GENDER */}

            <div className="profile-field">

              <div className="field-icon">
                <User size={17} />
              </div>

              <div className="field-content">

                <label>
                  Gender
                </label>

                {editing ? (
                  <select
                    name="gender"
                    value={tempProfile.gender}
                    onChange={handleChange}
                  >
                    <option>
                      Prefer not to say
                    </option>

                    <option>
                      Male
                    </option>

                    <option>
                      Female
                    </option>

                    <option>
                      Other
                    </option>
                  </select>
                ) : (
                  <p>
                    {profile.gender}
                  </p>
                )}

              </div>

            </div>


            {/* BLOOD GROUP */}

            <div className="profile-field">

              <div className="field-icon blood-icon">
                <span>+</span>
              </div>

              <div className="field-content">

                <label>
                  Blood Group
                </label>

                {editing ? (
                  <select
                    name="bloodGroup"
                    value={tempProfile.bloodGroup}
                    onChange={handleChange}
                  >
                    <option value="">Select blood group</option>
                    <option>
                      Not Added
                    </option>

                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                ) : (
                  <p>
                    {profile.bloodGroup || "Not added"}
                  </p>
                )}

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================= PRIVACY ================= */}

      <div className="profile-privacy">

        <div className="privacy-icon">
          <ShieldCheck size={20} />
        </div>

        <div>

          <strong>
            Your information matters
          </strong>

          <p>
            Keep your profile information accurate so
            your healthcare features can provide more
            relevant experiences.
          </p>

        </div>

      </div>

    </div>
  );
}


/* ================= FIELD COMPONENT ================= */

function ProfileField({
  icon,
  label,
  name,
  value,
  editing,
  onChange,
  type = "text",
}) {
  return (
    <div className="profile-field">

      <div className="field-icon">
        {icon}
      </div>

      <div className="field-content">

        <label>
          {label}
        </label>

        {editing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
          />
        ) : (
          <p>
            {value}
          </p>
        )}

      </div>

    </div>
  );
}

export default Profile;
