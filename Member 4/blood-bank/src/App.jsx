
import { useEffect, useState } from "react";
import "./App.css";

const DONORS_KEY = "healthmate_blood_donors";
const REQUESTS_KEY = "healthmate_blood_requests";
const BLOOD_GROUPS = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
];

function readStorage(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function BloodBank() {
  const [donors, setDonors] = useState(() =>
    readStorage(DONORS_KEY)
  );
  const [requests, setRequests] = useState(() =>
    readStorage(REQUESTS_KEY)
  );

  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [searched, setSearched] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    bloodGroup: "",
    city: "",
    phone: "",
    consent: false,
  });

  const [requestForm, setRequestForm] = useState({
    patientName: "",
    bloodGroup: "",
    city: "",
    units: "1",
    contact: "",
  });

  useEffect(() => {
    localStorage.setItem(DONORS_KEY, JSON.stringify(donors));
  }, [donors]);

  useEffect(() => {
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests));
  }, [requests]);

  const updateForm = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    setMessage("");

    const name = form.name.trim();
    const city = form.city.trim();
    const phone = form.phone.replace(/\D/g, "");

    if (!name || !form.bloodGroup || !city || !phone) {
      setMessage("Please fill in all required donor details.");
      return;
    }

    if (phone.length < 10 || phone.length > 15) {
      setMessage("Enter a valid contact number.");
      return;
    }

    if (!form.consent) {
      setMessage("Please give consent before registering.");
      return;
    }

    const duplicate = donors.some(
      (donor) => donor.phoneDigits === phone
    );

    if (duplicate) {
      setMessage(
        "This contact number is already registered in this browser."
      );
      return;
    }

    const newDonor = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name,
      bloodGroup: form.bloodGroup,
      city,
      phone: form.phone.trim(),
      phoneDigits: phone,
      consent: true,
      availability: "Needs confirmation",
      lastConfirmed: null,
      registeredAt: new Date().toISOString(),
    };

    setDonors((previous) => [...previous, newDonor]);
    setForm({
      name: "",
      bloodGroup: "",
      city: "",
      phone: "",
      consent: false,
    });
    setMessage("Registration saved on this device.");
  };

  const updateAvailability = (id, available) => {
    setDonors((previous) =>
      previous.map((donor) =>
        donor.id === id
          ? {
              ...donor,
              availability: available
                ? "Self-reported available"
                : "Unavailable",
              lastConfirmed: available
                ? new Date().toISOString()
                : null,
            }
          : donor
      )
    );
  };

  const withdrawDonor = (id) => {
    const confirmed = window.confirm(
      "Remove this donor registration from this browser?"
    );

    if (!confirmed) return;

    setDonors((previous) =>
      previous.filter((donor) => donor.id !== id)
    );
    setMessage("Donor registration removed from this browser.");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearched(true);
  };

  const handleReset = () => {
    setBloodGroup("");
    setLocation("");
    setSearched(false);
  };

  const filteredDonors = donors.filter((donor) => {
    const matchesGroup =
      !bloodGroup || donor.bloodGroup === bloodGroup;

    const matchesLocation =
      !location ||
      donor.city.toLowerCase().includes(location.trim().toLowerCase());

    return matchesGroup && matchesLocation && donor.consent;
  });

  const updateRequestForm = (event) => {
    const { name, value } = event.target;
    setRequestForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleRequest = (event) => {
    event.preventDefault();

    const contactDigits = requestForm.contact.replace(/\D/g, "");

    if (contactDigits.length < 10 || contactDigits.length > 15) {
      setMessage("Enter a valid contact number for the blood request.");
      return;
    }

    const request = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      patientName: requestForm.patientName.trim(),
      bloodGroup: requestForm.bloodGroup,
      city: requestForm.city.trim(),
      units: Number(requestForm.units),
      contact: requestForm.contact.trim(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setRequests((previous) => [...previous, request]);
    setRequestForm({
      patientName: "",
      bloodGroup: "",
      city: "",
      units: "1",
      contact: "",
    });
    setMessage("Request saved on this device. No blood bank has been contacted.");
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">🩸 AI HealthMate</div>
        <h1>Blood Donor & Blood Bank</h1>
        <p>
          Register voluntary donors, search local registrations,
          and record blood requests.
        </p>
      </header>

      <main className="container">
        {message && (
          <div className="message" role="status">
            <span>{message}</span>
            <button
              type="button"
              className="message-close"
              onClick={() => setMessage("")}
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        )}

        <section className="search-card">
          <div className="section-title">
            <h2>Find Blood Support</h2>
            <p>Search donor registrations saved in this browser.</p>
          </div>

          <form className="form-grid" onSubmit={handleSearch}>
            <div className="form-group">
              <label htmlFor="searchGroup">Blood Group</label>
              <select
                id="searchGroup"
                value={bloodGroup}
                onChange={(event) => setBloodGroup(event.target.value)}
              >
                <option value="">All blood groups</option>
                {BLOOD_GROUPS.map((group) => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="searchLocation">City or Area</label>
              <input
                id="searchLocation"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Enter city or area"
              />
            </div>

            <div className="button-group">
              <button className="search-button" type="submit">
                🔎 Search Donors
              </button>
              <button
                className="reset-button"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </section>

        {searched && (
          <section className="results-section">
            <div className="section-heading">
              <h2>Donor Search Results</h2>
              <p>
                {filteredDonors.length} matching registration
                {filteredDonors.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredDonors.length === 0 ? (
              <div className="empty-card">
                <div className="empty-icon">🩸</div>
                <h3>No matching registrations</h3>
                <p>Try another blood group or location.</p>
              </div>
            ) : (
              <div className="donor-grid">
                {filteredDonors.map((donor) => (
                  <article className="donor-card" key={donor.id}>
                    <div className="blood-badge">{donor.bloodGroup}</div>
                    <div className="donor-info">
                      <h3>{donor.name}</h3>
                      <p>📍 {donor.city}</p>
                      <p>
                        Status: <strong>{donor.availability}</strong>
                      </p>
                      {donor.lastConfirmed && (
                        <p>
                          Last self-confirmed:{" "}
                          {new Date(donor.lastConfirmed).toLocaleString()}
                        </p>
                      )}
                      <p className="small-note">
                        This registration is not independently verified.
                      </p>
                      <a
                        className="contact-button"
                        href={`tel:${donor.phone}`}
                      >
                        📞 Contact Donor
                      </a>
                      <button
                        type="button"
                        className="text-button"
                        onClick={() => withdrawDonor(donor.id)}
                      >
                        Remove registration
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="registration-card">
          <div className="section-heading">
            <h2>Register as a Blood Donor</h2>
            <p>Only register your own details with your consent.</p>
          </div>

          <form onSubmit={handleRegistration}>
            <div className="registration-grid">
              <div className="form-group">
                <label htmlFor="donorName">Full Name *</label>
                <input
                  id="donorName"
                  name="name"
                  value={form.name}
                  onChange={updateForm}
                  maxLength={80}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="donorGroup">Blood Group *</label>
                <select
                  id="donorGroup"
                  name="bloodGroup"
                  value={form.bloodGroup}
                  onChange={updateForm}
                  required
                >
                  <option value="">Select blood group</option>
                  {BLOOD_GROUPS.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="donorCity">City or Area *</label>
                <input
                  id="donorCity"
                  name="city"
                  value={form.city}
                  onChange={updateForm}
                  maxLength={100}
                  required
                  placeholder="Enter city or area"
                />
              </div>

              <div className="form-group">
                <label htmlFor="donorPhone">Contact Number *</label>
                <input
                  id="donorPhone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={updateForm}
                  maxLength={20}
                  required
                  placeholder="Enter contact number"
                />
              </div>
            </div>

            <label className="consent-row">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={updateForm}
                required
              />
              <span>
                I consent to storing these details in this browser and
                displaying my name, blood group, and city in donor searches.
                I understand that contact details may be visible to people
                using this browser.
              </span>
            </label>

            <button className="search-button" type="submit">
              Register as Donor
            </button>
          </form>
        </section>

        <section className="blood-bank-section">
          <div className="section-heading">
            <h2>Blood Banks</h2>
            <p>Verified contact information can be added here later.</p>
          </div>

          <div className="empty-card">
            <div className="empty-icon">🏥</div>
            <h3>No verified blood bank records added</h3>
            <p>
              Add a blood bank only after checking its name, address,
              and contact details from a reliable source.
            </p>
          </div>
        </section>

        <section className="request-card">
          <div className="request-icon">🚨</div>
          <div className="request-content">
            <h2>Need Blood Urgently?</h2>
            <p>
              Record a blood request below. This temporary form does not
              send alerts or contact hospitals or donors.
            </p>

            <form onSubmit={handleRequest} className="request-form">
              <div className="form-group">
                <label htmlFor="patientName">Patient Name (optional)</label>
                <input
                  id="patientName"
                  name="patientName"
                  value={requestForm.patientName}
                  onChange={updateRequestForm}
                  maxLength={80}
                  placeholder="Patient name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="requestGroup">Blood Group *</label>
                <select
                  id="requestGroup"
                  name="bloodGroup"
                  value={requestForm.bloodGroup}
                  onChange={updateRequestForm}
                  required
                >
                  <option value="">Select blood group</option>
                  {BLOOD_GROUPS.map((group) => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="requestCity">City or Area *</label>
                <input
                  id="requestCity"
                  name="city"
                  value={requestForm.city}
                  onChange={updateRequestForm}
                  maxLength={100}
                  required
                  placeholder="Where is blood needed?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="units">Units Needed *</label>
                <input
                  id="units"
                  name="units"
                  type="number"
                  min="1"
                  max="20"
                  value={requestForm.units}
                  onChange={updateRequestForm}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="requestContact">Contact Number *</label>
                <input
                  id="requestContact"
                  name="contact"
                  type="tel"
                  value={requestForm.contact}
                  onChange={updateRequestForm}
                  maxLength={20}
                  required
                  placeholder="Contact number"
                />
              </div>

              <button className="request-button" type="submit">
                Save Blood Request
              </button>
            </form>

            {requests.length > 0 && (
              <div className="saved-requests">
                <h3>Requests saved in this browser: {requests.length}</h3>
                {requests.map((request) => (
                  <div className="request-item" key={request.id}>
                    <strong>
                      {request.bloodGroup} — {request.city}
                    </strong>
                    <p>
                      {request.units} unit(s) · Status: {request.status}
                    </p>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() =>
                        setRequests((previous) =>
                          previous.filter((item) => item.id !== request.id)
                        )
                      }
                    >
                      Remove request
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="notice">
          <strong>Important:</strong> This is a temporary, browser-only
          demonstration. Registrations and requests are not shared with
          other devices or users. Donor details and availability are not
          independently verified. Blood group compatibility and donor
          suitability must be confirmed by qualified medical professionals.
          For emergencies, contact a hospital or emergency service directly.
        </div>
      </main>

      <footer>
        <p>AI HealthMate • Blood Donor & Blood Bank Service</p>
      </footer>
    </div>
  );
}

export default BloodBank;
