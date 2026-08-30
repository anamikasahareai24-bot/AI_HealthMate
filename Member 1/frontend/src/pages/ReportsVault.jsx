import { useState } from "react";
import {
  FileText,
  Pill,
  FlaskConical,
  FolderOpen,
  Upload,
  Trash2,
  Eye,
  ShieldCheck,
} from "lucide-react";

function ReportsVault() {
  const [documents, setDocuments] = useState([]);
  const [category, setCategory] = useState("Medical Report");

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const newDocument = {
      id: Date.now(),
      name: file.name,
      category: category,
      date: new Date().toLocaleDateString(),
      size: `${(file.size / 1024).toFixed(1)} KB`,
      url: URL.createObjectURL(file),
    };

    setDocuments((prev) => [...prev, newDocument]);

    e.target.value = "";
  };

  const deleteDocument = (id) => {
    setDocuments((prev) =>
      prev.filter((document) => document.id !== id)
    );
  };

  const getIcon = (type) => {
    if (type === "Prescription") {
      return <Pill size={22} />;
    }

    if (type === "Test Report") {
      return <FlaskConical size={22} />;
    }

    if (type === "Other") {
      return <FolderOpen size={22} />;
    }

    return <FileText size={22} />;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                <ShieldCheck
                  size={27}
                  className="text-blue-600"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-blue-600">
                  SECURE HEALTH STORAGE
                </p>

                <h1 className="text-3xl font-bold text-slate-900">
                  Medical Vault
                </h1>
              </div>
            </div>

            <p className="mt-3 max-w-2xl text-slate-600">
              Keep your medical reports, prescriptions and important
              health documents organized in one place.
            </p>
          </div>

          {/* Upload Button */}
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700">
            <Upload size={19} />
            Upload Document

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleUpload}
              className="hidden"
            />
          </label>

        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <FileText className="text-blue-600" size={24} />

            <p className="mt-3 text-sm text-slate-500">
              Total Documents
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {documents.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <FileText className="text-blue-600" size={24} />

            <p className="mt-3 text-sm text-slate-500">
              Medical Reports
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {
                documents.filter(
                  (item) => item.category === "Medical Report"
                ).length
              }
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Pill className="text-purple-600" size={24} />

            <p className="mt-3 text-sm text-slate-500">
              Prescriptions
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {
                documents.filter(
                  (item) => item.category === "Prescription"
                ).length
              }
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <FlaskConical className="text-green-600" size={24} />

            <p className="mt-3 text-sm text-slate-500">
              Test Reports
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              {
                documents.filter(
                  (item) => item.category === "Test Report"
                ).length
              }
            </h2>
          </div>

        </div>

        {/* Category Selection */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <h2 className="font-bold text-slate-900">
            Select Document Type
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            {[
              "Medical Report",
              "Prescription",
              "Test Report",
              "Other",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  category === item
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

          <p className="mt-3 text-xs text-slate-400">
            Selected type: {category}
          </p>

        </div>

        {/* Documents */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">
            <FolderOpen
              size={23}
              className="text-blue-600"
            />

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                My Documents
              </h2>

              <p className="text-sm text-slate-500">
                Your uploaded medical documents
              </p>
            </div>
          </div>

          {documents.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-slate-50 p-10 text-center">

              <FileText
                size={42}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 font-semibold text-slate-700">
                No documents yet
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Select a document type and upload your first file.
              </p>

            </div>
          ) : (
            <div className="mt-6 space-y-3">

              {documents.map((document) => (
                <div
                  key={document.id}
                  className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      {getIcon(document.category)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {document.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {document.category} • {document.date} •{" "}
                        {document.size}
                      </p>
                    </div>

                  </div>

                  <div className="flex gap-2">

                    <a
                      href={document.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      <Eye size={16} />
                      View
                    </a>

                    <button
                      onClick={() =>
                        deleteDocument(document.id)
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* Security Note */}
        <div className="mt-6 flex gap-3 rounded-2xl border border-green-100 bg-green-50 p-5">

          <ShieldCheck
            size={22}
            className="mt-0.5 shrink-0 text-green-600"
          />

          <div>
            <h3 className="font-semibold text-green-900">
              Keep Your Medical Records Safe
            </h3>

            <p className="mt-1 text-sm leading-6 text-green-800">
              Your medical documents should only be shared with
              trusted healthcare professionals when necessary.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ReportsVault;