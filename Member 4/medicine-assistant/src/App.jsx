import { useState } from "react";
import "./App.css";
import { medicineData } from "./data/medicines";

function App() {
  const [search, setSearch] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const filteredMedicines = medicineData.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleSelect = (medicine) => {
    setSelectedMedicine(medicine);
  };
  
  const handleSearch = (event) => {
  if (event.key === "Enter") {
    const medicine = medicineData.find(
      (item) =>
         item.name.toLowerCase().includes(search.trim().toLowerCase())
    );

    if (medicine) {
      setSelectedMedicine(medicine);
    }
  }
  };
  return (
    <div className="app">
      <header className="header">
        <div className="logo">💊 AI HealthMate</div>

        <div className="header-content">
          <h1>Medicine Assistant</h1>
          <p>
            Search medicines and view general information about their uses,
            side effects and precautions.
          </p>
        </div>
      </header>

      <main className="main-container">
        <section className="search-section">
          <h2>🔎 Search Medicine</h2>

          <div className="search-box">
            <input
              type="text"
              placeholder="Enter medicine name..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleSearch}
            />

            <button onClick={() => setSearch(search.trim())}>
                  🔍 Search
            </button>
          </div>
          </section>
        <section className="content-section">
          

          <div className="details-panel">
            {selectedMedicine ? (
              <>
                <div className="details-header">
                  <div className="large-medicine-icon">💊</div>

                  <div>
                    <h2>{selectedMedicine.name}</h2>
                    <p>{selectedMedicine.category}</p>
                  </div>
                </div>

                <div className="info-card">
                  <h3>🩺 Common Uses</h3>

                  <ul>
                    {selectedMedicine.uses.map((use) => (
                      <li key={use}>{use}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-card">
                  <h3>⚠️ Common Side Effects</h3>

                  <ul>
                    {selectedMedicine.sideEffects.map((effect) => (
                      <li key={effect}>{effect}</li>
                    ))}
                  </ul>
                </div>

                <div className="info-card">
                  <h3>🛡️ Precautions</h3>
                  <p>{selectedMedicine.precautions}</p>
                </div>

                <div className="info-card">
                  <h3>🔄 Interaction Information</h3>

                  <ul>
                    {selectedMedicine.interactions.map((interaction) => (
                      <li key={interaction}>{interaction}</li>
                    ))}
                  </ul>
                </div>
                
                {selectedMedicine.administration && (
                  <div className="info-card">
                   <h3>💊 How to Take</h3>
                   <p>{selectedMedicine.administration}</p>
                  </div>
                )}

                {selectedMedicine.whenToSeekHelp && (
                  <div className="info-card">
                   <h3>🚨 When to Seek Medical Help</h3>
                   <p>{selectedMedicine.whenToSeekHelp}</p>
                  </div>
                )}

                 {selectedMedicine.prescription && (
                    <div className="info-card">
                     <h3>📋 Prescription Information</h3>
                     <p>{selectedMedicine.prescription}</p>
                    </div>
                )}

              </>
            ) : (
              
          <div className="select-message">
            <div className="select-icon">💊</div>

            <h2>Search a Medicine</h2>

            <p>
              Enter a medicine name in the search bar above to view
              its uses, side effects, precautions, and interactions.
            </p>
          </div>

            )}
          </div>
        </section>

        <section className="disclaimer">
          <h3>⚕️ Medical Disclaimer</h3>

          <p>
            This Medicine Assistant provides general educational information
            only. It does not provide medical diagnosis or prescribe
            medicines. Always consult a qualified healthcare professional
            before starting, stopping, or changing any medication.
          </p>
        </section>
      </main>

      <footer>
        <p>AI HealthMate • Medicine Information Assistant</p>
      </footer>
    </div>
  );
}

export default App;