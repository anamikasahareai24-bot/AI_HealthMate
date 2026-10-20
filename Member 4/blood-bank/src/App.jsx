
import { useState } from "react";
import bloodBanks from "./bloodBanks";
import "./App.css";

const districts = [
  "All Districts",
  "Balod",
  "Baloda Bazar",
  "Balrampur-Ramanujganj",
  "Bastar",
  "Bemetara",
  "Bijapur",
  "Bilaspur",
  "Dantewada",
  "Dhamtari",
  "Durg",
  "Gariyaband",
  "Gaurela-Pendra-Marwahi",
  "Janjgir-Champa",
  "Jashpur",
  "Kawardha",
  "Kanker",
  "Kondagaon",
  "Korba",
  "Koriya",
  "Mahasamund",
  "Manendragarh-Chirmiri-Bharatpur",
  "Mungeli",
  "Narayanpur",
  "Raigarh",
  "Raipur",
  "Rajnandgaon",
  "Sukma",
  "Surajpur",
  "Surguja",
];

export default function BloodBank() {
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] =
    useState("All Districts");

  const filteredBanks = bloodBanks.filter((bank) => {
    const matchesDistrict =
      selectedDistrict === "All Districts" ||
      bank.district.toLowerCase() ===
        selectedDistrict.toLowerCase();

    const searchText =
      `${bank.name} ${bank.address} ${bank.district}`.toLowerCase();

    const matchesSearch = searchText.includes(
      search.trim().toLowerCase()
    );

    return matchesDistrict && matchesSearch;
  });

  return (
    <main className="blood-page">
      <header className="blood-header">
        <div className="blood-logo">+</div>
        <p className="blood-eyebrow">AI HEALTHMATE</p>
        <h1>Blood Bank Directory</h1>
        <p className="blood-subtitle">
          Find blood banks in Raipur and across Chhattisgarh.
          Contact a bank directly to confirm blood availability.
        </p>
      </header>

      <section className="blood-notice">
        <strong>Important:</strong> This directory provides contact
        information only. It does not show live blood-stock availability.
        Please call the blood bank before visiting.
      </section>

      <section className="blood-search">
        
<div className="blood-filter-row">
  <div className="blood-filter-field">
    <label htmlFor="district">Select district</label>
    <select
      id="district"
      value={selectedDistrict}
      onChange={(e) => setSelectedDistrict(e.target.value)}
    >
      {districts.map((district) => (
        <option key={district} value={district}>
          {district}
        </option>
      ))}
    </select>
  </div>

  <div className="blood-filter-field">
    <label htmlFor="state">State</label>
    <input
      id="state"
      type="text"
      value="Chhattisgarh"
      readOnly
    />
  </div>
</div>


        <button
          className="blood-reset"
          onClick={() => {
            setSearch("");
            setSelectedDistrict("All Districts");
          }}
        >
          Clear search
        </button>
      </section>

      <section className="blood-results">
        <div className="blood-results-heading">
          <h2>Blood Banks</h2>
          <span>{filteredBanks.length} found</span>
        </div>

        {filteredBanks.length === 0 ? (
          <div className="blood-empty">
            <div className="blood-empty-icon">+</div>
            <h3>No blood banks found</h3>
            <p>
              No matching records are currently in the directory.
              Verified blood-bank details will appear here when added
              to the dataset.
            </p>
          </div>
        ) : (
          <div className="blood-grid">
            {filteredBanks.map((bank) => (
              <article className="blood-card" key={bank.id}>
                <div className="blood-card-icon">+</div>

                <div className="blood-card-content">
                  <h3>{bank.name}</h3>
                  <p className="blood-card-district">
                    {bank.district}, Chhattisgarh
                  </p>

                  <div className="blood-detail">
                    <span className="blood-detail-label">
                      Address
                    </span>
                    <p>{bank.address}</p>
                  </div>

                  <div className="blood-detail">
                    <span className="blood-detail-label">
                      Phone
                    </span>
                    <p>{bank.phone}</p>
                  </div>

                  {bank.source && (
                    <p className="blood-source">
                      Source: {bank.source}
                    </p>
                  )}

                  <a
                    className="blood-call"
                    href={`tel:${String(bank.phone).replace(
                      /[^\d+]/g,
                      ""
                    )}`}
                  >
                    Call Blood Bank
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer className="blood-footer">
        Always confirm current blood availability directly with
        the blood bank. Contact information should be verified
        before use.
      </footer>
    </main>
  );
}
