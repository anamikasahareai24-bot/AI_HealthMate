import { useState } from "react";
import "./App.css";

const medicineData = [
  {
    name: "Paracetamol",
    category: "Pain Relief / Fever",
    uses: [
      "Relieves mild to moderate pain",
      "Helps reduce fever",
      "Commonly used for headaches and body aches",
    ],
    sideEffects: [
      "Nausea",
      "Stomach discomfort",
      "Rarely, allergic reactions",
    ],
    precautions:
      "Do not exceed the recommended amount. People with liver disease should consult a healthcare professional before use.",
    interactions: [
      "May interact with other medicines containing paracetamol or acetaminophen",
      "Alcohol may increase the risk of liver damage",
    ],
  },
  {
    name: "Ibuprofen",
    category: "Pain Relief / Anti-inflammatory",
    uses: [
      "Relieves mild to moderate pain",
      "Helps reduce inflammation",
      "May help with menstrual pain and muscle aches",
    ],
    sideEffects: [
      "Stomach discomfort",
      "Nausea",
      "Heartburn",
    ],
    precautions:
      "People with stomach ulcers, kidney problems, or certain heart conditions should consult a healthcare professional before use.",
    interactions: [
      "May interact with blood-thinning medicines",
      "Taking multiple NSAID medicines together may increase side effects",
    ],
  },
  {
    name: "Cetirizine",
    category: "Antihistamine / Allergy",
    uses: [
      "Helps relieve allergy symptoms",
      "May reduce sneezing and runny nose",
      "Helps relieve itching and watery eyes",
    ],
    sideEffects: [
      "Drowsiness",
      "Dry mouth",
      "Headache",
    ],
    precautions:
      "May cause drowsiness. Avoid driving or operating machinery if you feel sleepy.",
    interactions: [
      "Alcohol and other medicines that cause drowsiness may increase sleepiness",
    ],
  },
  {
    name: "Loratadine",
    category: "Antihistamine / Allergy",
    uses: [
      "Helps relieve seasonal allergy symptoms",
      "May reduce sneezing and runny nose",
      "Helps relieve itchy or watery eyes",
    ],
    sideEffects: [
      "Headache",
      "Drowsiness in some people",
      "Dry mouth",
    ],
    precautions:
      "Tell a healthcare professional about other medicines you are taking.",
    interactions: [
      "Some medicines may affect how loratadine is processed by the body",
    ],
  },
  {
    name: "Omeprazole",
    category: "Acid Reduction",
    uses: [
      "Reduces stomach acid",
      "Used for acid reflux and heartburn",
      "May be used for certain stomach ulcers",
    ],
    sideEffects: [
      "Headache",
      "Nausea",
      "Abdominal discomfort",
    ],
    precautions:
      "Long-term use should be discussed with a healthcare professional.",
    interactions: [
      "May interact with some prescription medicines",
      "Tell your healthcare professional about all medicines you take",
    ],
  },
  {
    name: "Pantoprazole",
    category: "Acid Reduction",
    uses: [
      "Reduces stomach acid",
      "Used for acid reflux and heartburn",
      "May be used for certain acid-related stomach conditions",
    ],
    sideEffects: [
      "Headache",
      "Nausea",
      "Abdominal discomfort",
    ],
    precautions:
      "Long-term treatment should be monitored by a healthcare professional.",
    interactions: [
      "May interact with certain prescription medicines",
    ],
  },
  {
    name: "Amoxicillin",
    category: "Antibiotic",
    uses: [
      "Used to treat certain bacterial infections",
      "May be prescribed for some respiratory infections",
      "May be prescribed for other susceptible bacterial infections",
    ],
    sideEffects: [
      "Nausea",
      "Diarrhea",
      "Skin rash",
    ],
    precautions:
      "Use only when prescribed by a qualified healthcare professional. Tell them if you have a history of penicillin allergy.",
    interactions: [
      "May interact with certain medicines",
      "Tell your healthcare professional about other medicines you take",
    ],
  },
  {
    name: "Azithromycin",
    category: "Antibiotic",
    uses: [
      "Used to treat certain bacterial infections",
      "May be prescribed for some respiratory infections",
      "May be used for certain other susceptible infections",
    ],
    sideEffects: [
      "Nausea",
      "Diarrhea",
      "Abdominal discomfort",
    ],
    precautions:
      "Use only when prescribed. People with certain heart rhythm problems should discuss its use with a healthcare professional.",
    interactions: [
      "May interact with medicines that affect heart rhythm",
      "May interact with certain other medicines",
    ],
  },
  {
    name: "Metformin",
    category: "Diabetes Medicine",
    uses: [
      "Used to help control blood glucose in type 2 diabetes",
      "Works together with diet and physical activity",
    ],
    sideEffects: [
      "Nausea",
      "Diarrhea",
      "Stomach discomfort",
    ],
    precautions:
      "People with kidney problems should discuss its use with a healthcare professional.",
    interactions: [
      "May interact with certain medicines",
      "Tell your healthcare professional about kidney conditions and all medicines you take",
    ],
  },
  {
    name: "Amlodipine",
    category: "Blood Pressure Medicine",
    uses: [
      "Used to help lower high blood pressure",
      "May be used for certain types of chest pain",
    ],
    sideEffects: [
      "Swelling of the ankles or feet",
      "Headache",
      "Dizziness",
    ],
    precautions:
      "Blood pressure should be monitored. Report significant dizziness or swelling to a healthcare professional.",
    interactions: [
      "May interact with certain blood pressure medicines",
      "Tell your healthcare professional about all medicines you take",
    ],
  },
  {
    name: "Losartan",
    category: "Blood Pressure Medicine",
    uses: [
      "Used to treat high blood pressure",
      "May be used for certain heart or kidney-related conditions",
    ],
    sideEffects: [
      "Dizziness",
      "Headache",
      "Fatigue",
    ],
    precautions:
      "Pregnancy requires special medical advice because medicines in this class can harm a developing baby.",
    interactions: [
      "May interact with potassium supplements",
      "May interact with certain blood pressure medicines",
    ],
  },
  {
    name: "Atorvastatin",
    category: "Cholesterol Medicine",
    uses: [
      "Helps lower LDL cholesterol",
      "May help reduce the risk of certain cardiovascular events",
    ],
    sideEffects: [
      "Muscle aches",
      "Headache",
      "Digestive discomfort",
    ],
    precautions:
      "Report unexplained or severe muscle pain to a healthcare professional.",
    interactions: [
      "May interact with certain antibiotics and antifungal medicines",
      "Tell your healthcare professional about all medicines you take",
    ],
  },
  {
    name: "Levothyroxine",
    category: "Thyroid Medicine",
    uses: [
      "Used to replace thyroid hormone",
      "Commonly used for an underactive thyroid",
    ],
    sideEffects: [
      "If the dose is too high, symptoms may include fast heartbeat",
      "Nervousness",
      "Increased sweating",
    ],
    precautions:
      "The appropriate dose is individualized and usually requires medical monitoring and blood tests.",
    interactions: [
      "Some medicines and supplements can affect its absorption",
      "Calcium and iron supplements may interfere with absorption when taken together",
    ],
  },
  {
    name: "Salbutamol",
    category: "Bronchodilator / Respiratory",
    uses: [
      "Helps relieve breathing difficulty caused by airway narrowing",
      "Commonly used for quick relief of certain asthma symptoms",
    ],
    sideEffects: [
      "Shakiness",
      "Fast heartbeat",
      "Headache",
    ],
    precautions:
      "Use according to the instructions provided by a healthcare professional.",
    interactions: [
      "May interact with certain heart or blood pressure medicines",
    ],
  },
  {
    name: "Montelukast",
    category: "Allergy / Respiratory",
    uses: [
      "May be used as part of treatment for asthma",
      "May help control certain allergic rhinitis symptoms",
    ],
    sideEffects: [
      "Headache",
      "Abdominal discomfort",
      "Sleep-related changes may occur",
    ],
    precautions:
      "Discuss any unusual mood, behavior, or sleep changes with a healthcare professional.",
    interactions: [
      "Tell your healthcare professional about all medicines you take",
    ],
  },
  {
    name: "Diclofenac",
    category: "Pain Relief / Anti-inflammatory",
    uses: [
      "Helps relieve certain types of pain",
      "Reduces inflammation",
      "May be used for certain joint or muscle conditions",
    ],
    sideEffects: [
      "Stomach discomfort",
      "Nausea",
      "Heartburn",
    ],
    precautions:
      "Long-term or high-dose use can increase certain stomach, kidney, and cardiovascular risks. Consult a healthcare professional.",
    interactions: [
      "May interact with blood-thinning medicines",
      "Avoid combining with other NSAIDs unless advised by a healthcare professional",
    ],
  },
  {
    name: "Doxycycline",
    category: "Antibiotic",
    uses: [
      "Used to treat certain bacterial infections",
      "May be prescribed for some skin infections",
      "May be used for certain respiratory infections",
    ],
    sideEffects: [
      "Nausea",
      "Diarrhea",
      "Increased sensitivity to sunlight",
    ],
    precautions:
      "Take only as prescribed. Some people need special advice regarding pregnancy and age.",
    interactions: [
      "Antacids and some mineral supplements can reduce absorption",
      "Tell your healthcare professional about all medicines and supplements",
    ],
  },
  {
    name: "Aspirin",
    category: "Pain Relief / Antiplatelet",
    uses: [
      "Can relieve certain types of pain and fever",
      "May be prescribed in specific cardiovascular situations",
    ],
    sideEffects: [
      "Stomach irritation",
      "Nausea",
      "Increased risk of bleeding",
    ],
    precautions:
      "Not appropriate for everyone. Children and teenagers should not be given aspirin for certain viral illnesses unless specifically advised by a healthcare professional.",
    interactions: [
      "May interact with blood-thinning medicines",
      "Other NSAIDs may increase certain side effects",
    ],
  },
  {
    name: "Clotrimazole",
    category: "Antifungal",
    uses: [
      "Used to treat certain fungal skin infections",
      "May help with conditions such as athlete's foot and ringworm",
    ],
    sideEffects: [
      "Skin irritation",
      "Redness",
      "Burning or itching at the application site",
    ],
    precautions:
      "For external products, avoid contact with eyes and follow the product instructions.",
    interactions: [
      "Interactions depend on the formulation and how the medicine is used",
    ],
  },
  {
    name: "Ondansetron",
    category: "Anti-nausea Medicine",
    uses: [
      "Used to help prevent nausea and vomiting in certain situations",
      "May be prescribed after certain medical treatments or procedures",
    ],
    sideEffects: [
      "Headache",
      "Constipation",
      "Dizziness",
    ],
    precautions:
      "People with certain heart rhythm conditions should discuss its use with a healthcare professional.",
    interactions: [
      "May interact with medicines that affect heart rhythm",
      "Tell your healthcare professional about all medicines you take",
    ],
  },
  {
    name: "ORS",
    category: "Oral Rehydration",
    uses: [
      "Helps replace fluids and electrolytes lost during dehydration",
      "Commonly used during diarrhea or vomiting",
    ],
    sideEffects: [
      "Usually well tolerated when prepared correctly",
      "Incorrect preparation can cause electrolyte problems",
    ],
    precautions:
      "Prepare according to the product instructions and use safe drinking water.",
    interactions: [
      "Tell a healthcare professional about other treatments being used for severe illness",
    ],
  },
];

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

            <button onClick={() => setSearch("")}>Clear</button>
          </div>
        </section>

        <section className="content-section">
          <div className="medicine-list">
            <h2>Available Medicines</h2>

            {filteredMedicines.length === 0 ? (
              <div className="empty-box">
                <span>💊</span>
                <p>No medicine found.</p>
              </div>
            ) : (
              filteredMedicines.map((medicine) => (
                <button
                  className={`medicine-card ${
                    selectedMedicine?.name === medicine.name
                      ? "selected"
                      : ""
                  }`}
                  key={medicine.name}
                  onClick={() => handleSelect(medicine)}
                >
                  <div className="medicine-icon">💊</div>

                  <div>
                    <h3>{medicine.name}</h3>
                    <p>{medicine.category}</p>
                  </div>
                </button>
              ))
            )}
          </div>

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
              </>
            ) : (
              <div className="select-message">
                <div className="select-icon">💊</div>

                <h2>Select a Medicine</h2>

                <p>
                  Choose a medicine from the list to view its general
                  information.
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