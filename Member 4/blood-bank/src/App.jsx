import { useState } from "react";
import "./App.css";

const donorData = [
  {
    id: 1,
    name: "Amit Sharma",
    bloodGroup: "A+",
    city: "Raipur",
    phone: "+91 90000 10001",
    distance: 2.4,
  },
  {
    id: 2,
    name: "Priya Verma",
    bloodGroup: "B+",
    city: "Raipur",
    phone: "+91 90000 10002",
    distance: 4.1,
  },
  {
    id: 3,
    name: "Rahul Patel",
    bloodGroup: "O+",
    city: "Raipur",
    phone: "+91 90000 10003",
    distance: 5.7,
  },
  {
    id: 4,
    name: "Neha Singh",
    bloodGroup: "O-",
    city: "Raipur",
    phone: "+91 90000 10004",
    distance: 7.2,
  },
];

const bloodBankData = [
  {
    id: 1,
    name: "District Blood Bank",
    city: "Raipur",
    address: "Government Hospital Campus, Raipur",
    phone: "+91 771 123 4567",
  },
  {
    id: 2,
    name: "Regional Blood Centre",
    city: "Raipur",
    address: "Main Medical Campus, Raipur",
    phone: "+91 771 234 5678",
  },
];

function BloodBank() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const results = donorData.filter((donor) => {
      const groupMatches =
        !bloodGroup || donor.bloodGroup === bloodGroup;

      const locationMatches =
        !location ||
        donor.city.toLowerCase().includes(location.toLowerCase());

      return groupMatches && locationMatches;
    });

    setDonors(results);
    setSearched(true);
  };

  const handleReset = () => {
    setBloodGroup("");
    setLocation("");
    setDonors([]);
    setSearched(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="logo">🩸 AI HealthMate</div>

          <h1>Blood Donor & Blood Bank</h1>

          <p>
            Find suitable blood donors and nearby blood bank
            information.
          </p>
        </div>
      </header>

      <main className="container">
        <section className="search-card">
          <div className="section-title">
            <h2>Find Blood Support</h2>
            <p>
              Search using blood group and location.
            </p>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="bloodGroup">
                Blood Group
              </label>

              <select
                id="bloodGroup"
                value={bloodGroup}
                onChange={(event) =>
                  setBloodGroup(event.target.value)
                }
              >
                <option value="">Select blood group</option>
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

            <div className="form-group">
              <label htmlFor="location">
                Location
              </label>

              <input
                id="location"
                type="text"
                placeholder="Enter city or area"
                value={location}
                onChange={(event) =>
                  setLocation(event.target.value)
                }
              />
            </div>

            <div className="button-group">
              <button
                className="search-button"
                onClick={handleSearch}
              >
                🔎 Search Donors
              </button>

              <button
                className="reset-button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        {searched && (
          <section className="results-section">
            <div className="section-heading">
              <div>
                <h2>Available Donors</h2>
                <p>
                  {donors.length} matching donor
                  {donors.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>

            {donors.length === 0 ? (
              <div className="empty-card">
                <div className="empty-icon">🩸</div>
                <h3>No matching donors found</h3>
                <p>
                  Try another blood group or location.
                </p>
              </div>
            ) : (
              <div className="donor-grid">
                {donors.map((donor) => (
                  <article
                    className="donor-card"
                    key={donor.id}
                  >
                    <div className="blood-badge">
                      {donor.bloodGroup}
                    </div>

                    <div className="donor-info">
                      <h3>{donor.name}</h3>

                      <p>📍 {donor.city}</p>

                      <p>
                        📏 {donor.distance.toFixed(1)} km
                        away
                      </p>

                      <p>📞 {donor.phone}</p>

                      <a
                        className="contact-button"
                        href={`tel:${donor.phone}`}
                      >
                        📞 Contact Donor
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        <section className="blood-bank-section">
          <div className="section-heading">
            <div>
              <h2>Blood Banks</h2>
              <p>
                Blood bank information available in the
                system.
              </p>
            </div>
          </div>

          <div className="blood-bank-grid">
            {bloodBankData.map((bank) => (
              <article
                className="blood-bank-card"
                key={bank.id}
              >
                <div className="bank-icon">🏥</div>

                <div>
                  <h3>{bank.name}</h3>

                  <p>📍 {bank.address}</p>

                  <p>📞 {bank.phone}</p>

                  <a
                    className="maps-button"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${bank.name}, ${bank.city}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🧭 View on Google Maps
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="request-card">
          <div className="request-icon">🚨</div>

          <div>
            <h2>Need Blood Urgently?</h2>

            <p>
              Submit a blood request through the
              healthcare system. The request can later be
              connected to the backend and notification
              system.
            </p>

            <button
              className="request-button"
              onClick={() =>
                alert(
                  "Blood request functionality will be connected to the backend."
                )
              }
            >
              📝 Request Blood
            </button>
          </div>
        </section>

        <div className="notice">
          <strong>⚠️ Important:</strong> The donor information
          currently shown is development/demo data. It must
          be replaced with consented, verified data before
          real-world use. Blood availability should always be
          confirmed directly with the blood bank.
        </div>
      </main>

      <footer>
        <p>
          AI HealthMate • Blood Donor & Blood Bank Management
        </p>
      </footer>
    </div>
  );
}

export default BloodBank;