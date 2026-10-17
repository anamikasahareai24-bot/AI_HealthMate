import React, { useState } from "react";
import {
  Pill,
  Search,
  Clock3,
  Bell,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  ShieldCheck,
  X,
  ImagePlus,
} from "lucide-react";

import "./Medicines.css";

function Medicines() {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol",
      dosage: "500 mg",
      frequency: "Twice a day",
      time: "08:00 AM",
      duration: "5 days",
      status: "Active",
    },
    {
      id: 2,
      name: "Vitamin D3",
      dosage: "1000 IU",
      frequency: "Once a day",
      time: "09:00 AM",
      duration: "30 days",
      status: "Active",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    dosage: "",
    frequency: "Once a day",
    time: "",
    duration: "",
    notes: "",
    photo: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const addMedicine = (e) => {
    e.preventDefault();

    if (!form.name || !form.dosage || !form.time) {
      return;
    }

    const newMedicine = {
      id: Date.now(),
      ...form,
      status: "Active",
    };

    setMedicines((prev) => [...prev, newMedicine]);

    setForm({
      name: "",
      dosage: "",
      frequency: "Once a day",
      time: "",
      duration: "",
      notes: "",
      photo: "",
    });

    setShowAdd(false);
  };

  const deleteMedicine = (id) => {
    setMedicines((prev) =>
      prev.filter((medicine) => medicine.id !== id)
    );
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="medicines-page">

      {/* ================= HEADER ================= */}

      <section className="medicines-header">

        <div>
          <div className="medicines-eyebrow">
            <Pill size={14} />
            MEDICATION MANAGEMENT
          </div>

          <h1>
            Medicine <span>Assistant</span>
          </h1>

          <p>
            Manage your medicines, dosage schedules and
            medication reminders in one place.
          </p>
        </div>

        <div className="medicine-header-icon">
          <Pill size={36} />
        </div>

      </section>


      {/* ================= QUICK STATS ================= */}

      <section className="medicine-stats">

        <div className="medicine-stat-card">
          <div className="medicine-stat-icon">
            <Pill size={20} />
          </div>

          <div>
            <span>Active Medicines</span>
            <strong>{medicines.length}</strong>
          </div>
        </div>


        <div className="medicine-stat-card">
          <div className="medicine-stat-icon">
            <Clock3 size={20} />
          </div>

          <div>
            <span>Today's Doses</span>
            <strong>{medicines.length}</strong>
          </div>
        </div>


        <div className="medicine-stat-card">
          <div className="medicine-stat-icon">
            <Bell size={20} />
          </div>

          <div>
            <span>Reminders</span>
            <strong>ON</strong>
          </div>
        </div>


        <div className="medicine-stat-card">
          <div className="medicine-stat-icon">
            <CheckCircle2 size={20} />
          </div>

          <div>
            <span>Adherence</span>
            <strong>Good</strong>
          </div>
        </div>

      </section>


      {/* ================= MAIN ================= */}

      <div className="medicine-layout">


        {/* LEFT */}

        <main className="medicine-main">

          <div className="medicine-list-card">

            <div className="medicine-list-header">

              <div>
                <span className="medicine-small-label">
                  YOUR MEDICATIONS
                </span>

                <h2>
                  Medicine Schedule
                </h2>
              </div>

              <button
                className="add-medicine-btn"
                onClick={() => setShowAdd(true)}
              >
                <Plus size={17} />
                Add Medicine
              </button>

            </div>


            {/* SEARCH */}

            <div className="medicine-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search medicine..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>


            {/* MEDICINES */}

            <div className="medicine-list">

              {filteredMedicines.length === 0 ? (

                <div className="empty-medicines">

                  <Pill size={35} />

                  <h3>
                    No medicines found
                  </h3>

                  <p>
                    Add a medicine to start managing
                    your medication schedule.
                  </p>

                </div>

              ) : (

                filteredMedicines.map((medicine) => (

                  <div
                    className="medicine-item"
                    key={medicine.id}
                  >

                    {medicine.photo ? (
                      <img
                        className="medicine-item-photo"
                        src={medicine.photo}
                        alt={`${medicine.name} medicine`}
                      />
                    ) : (
                      <div className="medicine-item-icon">
                        <Pill size={21} />
                      </div>
                    )}


                    <div className="medicine-info">

                      <div className="medicine-name-row">

                        <h3>
                          {medicine.name}
                        </h3>

                        <span className="active-badge">
                          {medicine.status}
                        </span>

                      </div>

                      <p>
                        {medicine.dosage}
                      </p>
                      {medicine.notes && (
                        <p className="medicine-notes">{medicine.notes}</p>
                      )}

                      <div className="medicine-details">

                        <span>
                          <Clock3 size={13} />
                          {medicine.frequency}
                        </span>

                        <span>
                          <Bell size={13} />
                          {medicine.time}
                        </span>

                        {medicine.duration && (
                          <span>
                            <CalendarDays size={13} />
                            {medicine.duration}
                          </span>
                        )}

                      </div>

                    </div>


                    <button
                      className="delete-medicine"
                      onClick={() =>
                        deleteMedicine(medicine.id)
                      }
                      title="Delete medicine"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                ))

              )}

            </div>

          </div>

        </main>


        {/* RIGHT */}

        <aside className="medicine-side">


          {/* TODAY */}

          <div className="today-card">

            <div className="today-title">

              <div className="today-icon">
                <CalendarDays size={18} />
              </div>

              <div>
                <span>
                  TODAY
                </span>

                <h3>
                  Medication Plan
                </h3>
              </div>

            </div>


            <div className="today-dose">

              <div className="dose-time">
                08:00 AM
              </div>

              <div className="dose-line">
                <strong>
                  Paracetamol
                </strong>

                <span>
                  500 mg
                </span>
              </div>

              <CheckCircle2
                size={18}
                className="dose-check"
              />

            </div>


            <div className="today-dose">

              <div className="dose-time">
                09:00 AM
              </div>

              <div className="dose-line">
                <strong>
                  Vitamin D3
                </strong>

                <span>
                  1000 IU
                </span>
              </div>

              <CheckCircle2
                size={18}
                className="dose-check"
              />

            </div>

          </div>


          {/* REMINDER */}

          <div className="reminder-card">

            <div className="reminder-icon">
              <Bell size={20} />
            </div>

            <div>

              <strong>
                Medication reminders
              </strong>

              <p>
                Reminders help you stay consistent
                with your medication schedule.
              </p>

            </div>

            <div className="reminder-status">
              ON
            </div>

          </div>


          {/* SAFETY */}

          <div className="medicine-safety">

            <div className="safety-icon">
              <ShieldCheck size={19} />
            </div>

            <div>

              <strong>
                Medication Safety
              </strong>

              <p>
                Always follow the dosage and
                instructions provided by your
                healthcare professional.
              </p>

            </div>

          </div>


          {/* WARNING */}

          <div className="medicine-warning">

            <AlertCircle size={18} />

            <p>
              Do not change or stop prescribed
              medicines without consulting your
              healthcare professional.
            </p>

          </div>

        </aside>

      </div>


      {/* ================= MODAL ================= */}

      {showAdd && (

        <div
          className="medicine-modal-overlay"
          onClick={() => setShowAdd(false)}
        >

          <div
            className="medicine-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <span>
                  MEDICATION
                </span>

                <h2>
                  Add Medicine
                </h2>

              </div>

              <button
                onClick={() =>
                  setShowAdd(false)
                }
              >
                <X size={19} />
              </button>

            </div>


            <form onSubmit={addMedicine}>

              <div className="modal-field">

                <label>
                  Medicine Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Paracetamol / दवा का नाम"
                />
                <small className="medicine-language-hint">
                  Medicine name and notes Hindi, Hinglish, ya English mein likh sakte hain.
                </small>

              </div>


              <div className="modal-field">

                <label>
                  Dosage
                </label>

                <input
                  name="dosage"
                  value={form.dosage}
                  onChange={handleChange}
                  placeholder="e.g. 500 mg"
                />

              </div>


              <div className="modal-field">
                <label htmlFor="medicine-notes">Medicine details / notes</label>
                <textarea
                  id="medicine-notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Hindi, Hinglish, or English mein instructions ya notes likhein"
                  rows="3"
                />
              </div>

              <div className="modal-field">
                <label htmlFor="medicine-photo">Medicine photo (optional)</label>
                <div className="medicine-photo-picker">
                  <input
                    id="medicine-photo"
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoChange}
                  />
                  <label htmlFor="medicine-photo" className="medicine-photo-button">
                    <ImagePlus size={17} />
                    {form.photo ? "Change photo" : "Add a photo"}
                  </label>
                  {form.photo && (
                    <img className="medicine-photo-preview" src={form.photo} alt="Medicine preview" />
                  )}
                </div>
              </div>

              <div className="modal-two">

                <div className="modal-field">

                  <label>
                    Frequency
                  </label>

                  <select
                    name="frequency"
                    value={form.frequency}
                    onChange={handleChange}
                  >

                    <option>
                      Once a day
                    </option>

                    <option>
                      Twice a day
                    </option>

                    <option>
                      Three times a day
                    </option>

                    <option>
                      As needed
                    </option>

                  </select>

                </div>


                <div className="modal-field">

                  <label>
                    Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                  />

                </div>

              </div>


              <div className="modal-field">

                <label>
                  Duration
                </label>

                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="e.g. 7 days"
                />

              </div>


              <button
                type="submit"
                className="save-medicine-btn"
              >
                <Plus size={18} />
                Save Medicine
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Medicines;