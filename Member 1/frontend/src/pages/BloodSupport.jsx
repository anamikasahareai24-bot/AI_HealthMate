import { useState } from "react";
import { Droplets, Phone, AlertCircle } from "lucide-react";

function BloodSupport() {
  const [formData, setFormData] = useState({
    type: "Blood Required",
    bloodGroup: "",
    units: "",
    contact: "",
    emergency: "No",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Blood support request submitted successfully!");

    setFormData({
      type: "Blood Required",
      bloodGroup: "",
      units: "",
      contact: "",
      emergency: "No",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
              <Droplets size={25} className="text-red-600" />
            </div>

            <div>
              <p className="text-sm font-semibold text-red-600">
                Blood Support
              </p>

              <h1 className="text-3xl font-bold text-slate-900">
                Blood Assistance
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-slate-600">
            Create a blood support request or share your availability
            as a donor.
          </p>
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <h2 className="text-xl font-bold text-slate-900">
            Blood Support Request
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Please provide the required information below.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">

            {/* Request Type */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Request Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option>Blood Required</option>
                <option>Blood Donor</option>
              </select>
            </div>

            {/* Blood Group + Units */}
            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Blood Group
                </label>

                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                >
                  <option value="">Select Blood Group</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Required Units
                </label>

                <input
                  type="number"
                  name="units"
                  value={formData.units}
                  onChange={handleChange}
                  placeholder="e.g. 2"
                  min="1"
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
                />
              </div>

            </div>

            {/* Contact */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Phone size={16} />
                Contact Number
              </label>

              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Emergency */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <AlertCircle size={16} />
                Is this an emergency?
              </label>

              <select
                name="emergency"
                value={formData.emergency}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Additional Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Add any additional information..."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-red-600 px-6 py-3.5 font-semibold text-white transition hover:bg-red-700"
            >
              Submit Blood Request
            </button>

          </form>
        </div>

        {/* Safety Note */}
        <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">
          <p className="text-sm font-semibold text-red-900">
            Important
          </p>

          <p className="mt-1 text-sm leading-6 text-red-800">
            For a serious medical emergency, contact your local emergency
            services or a healthcare professional immediately.
          </p>
        </div>

      </div>
    </div>
  );
}

export default BloodSupport;