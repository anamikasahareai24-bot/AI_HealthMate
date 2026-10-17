import React, { useRef, useState } from "react";
import {
  Vault,
  Upload,
  FileText,
  File,
  Image,
  Download,
  Trash2,
  Search,
  ShieldCheck,
  CalendarDays,
  X,
  CheckCircle2,
  FolderOpen,
} from "lucide-react";

import "./MedicalVault.css";

function MedicalVault() {
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([
    {
      id: 1,
      name: "Blood_Test_Report.pdf",
      type: "PDF",
      size: "1.2 MB",
      date: "Today",
      category: "Lab Report",
    },
    {
      id: 2,
      name: "Prescription_August.pdf",
      type: "PDF",
      size: "850 KB",
      date: "Aug 18",
      category: "Prescription",
    },
    {
      id: 3,
      name: "Health_Report.jpg",
      type: "IMAGE",
      size: "2.1 MB",
      date: "Aug 15",
      category: "Medical Document",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [category, setCategory] = useState("Medical Document");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) return;

    const newFiles = selectedFiles.map((file) => {
      const extension =
        file.name.split(".").pop()?.toUpperCase() || "FILE";

      return {
        id: Date.now() + Math.random(),
        name: file.name,
        type:
          extension === "PDF"
            ? "PDF"
            : ["JPG", "JPEG", "PNG", "WEBP"].includes(extension)
            ? "IMAGE"
            : "FILE",
        size: formatFileSize(file.size),
        date: "Just now",
        category,
        originalFile: file,
      };
    });

    setFiles((prev) => [...newFiles, ...prev]);

    setShowUpload(false);
    setUploadSuccess(true);

    setTimeout(() => {
      setUploadSuccess(false);
    }, 2500);

    event.target.value = "";
  };

  const deleteFile = (id) => {
    setFiles((prev) =>
      prev.filter((file) => file.id !== id)
    );
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalSize = files.reduce((total, file) => {
    if (file.size.includes("MB")) {
      return total + parseFloat(file.size);
    }

    if (file.size.includes("KB")) {
      return total + parseFloat(file.size) / 1024;
    }

    return total;
  }, 0);

  return (
    <div className="vault-page">

      {/* ================= HEADER ================= */}

      <div className="vault-header">

        <div>
          <div className="vault-eyebrow">
            <Vault size={14} />
            MEDICAL VAULT
          </div>

          <h1>
            Your Medical
            <span> Vault.</span>
          </h1>

          <p>
            Securely organize your medical reports,
            prescriptions and important health documents.
          </p>
        </div>

        <div className="vault-header-icon">
          <Vault size={35} />
        </div>

      </div>


      {/* ================= SUCCESS ================= */}

      {uploadSuccess && (
        <div className="vault-success">
          <CheckCircle2 size={16} />
          Document added to your Medical Vault.
        </div>
      )}


      {/* ================= SECURITY ================= */}

      <div className="vault-security">

        <div className="security-icon">
          <ShieldCheck size={21} />
        </div>

        <div>
          <strong>
            Your health documents stay organized
          </strong>

          <p>
            Use this vault to keep important medical
            documents together and easy to access.
          </p>
        </div>

      </div>


      {/* ================= STATS ================= */}

      <div className="vault-stats">

        <div className="vault-stat">
          <div className="vault-stat-icon">
            <FolderOpen size={18} />
          </div>

          <div>
            <span>Total Documents</span>
            <strong>{files.length}</strong>
          </div>
        </div>

        <div className="vault-stat">
          <div className="vault-stat-icon">
            <FileText size={18} />
          </div>

          <div>
            <span>PDF Documents</span>
            <strong>
              {files.filter(
                (file) => file.type === "PDF"
              ).length}
            </strong>
          </div>
        </div>

        <div className="vault-stat">
          <div className="vault-stat-icon">
            <Image size={18} />
          </div>

          <div>
            <span>Images</span>
            <strong>
              {files.filter(
                (file) => file.type === "IMAGE"
              ).length}
            </strong>
          </div>
        </div>

        <div className="vault-stat">
          <div className="vault-stat-icon">
            <Vault size={18} />
          </div>

          <div>
            <span>Storage Used</span>
            <strong>
              {totalSize.toFixed(1)} MB
            </strong>
          </div>
        </div>

      </div>


      {/* ================= TOOLBAR ================= */}

      <section className="vault-section">

        <div className="vault-toolbar">

          <div className="vault-search">

            <Search size={16} />

            <input
              type="text"
              placeholder="Search medical documents..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <button
            className="vault-upload-btn"
            onClick={() => setShowUpload(true)}
          >
            <Upload size={16} />
            Upload Document
          </button>

        </div>


        {/* ================= DOCUMENTS ================= */}

        <div className="vault-section-title">

          <div>
            <span>YOUR DOCUMENTS</span>

            <h2>
              Medical Records
            </h2>
          </div>

          <span className="vault-count">
            {filteredFiles.length} files
          </span>

        </div>


        {filteredFiles.length > 0 ? (

          <div className="documents-list">

            {filteredFiles.map((file) => (

              <div
                className="document-card"
                key={file.id}
              >

                <div className="document-icon">

                  {file.type === "PDF" ? (
                    <FileText size={23} />
                  ) : file.type === "IMAGE" ? (
                    <Image size={23} />
                  ) : (
                    <File size={23} />
                  )}

                </div>


                <div className="document-info">

                  <h3>
                    {file.name}
                  </h3>

                  <div className="document-meta">

                    <span>
                      {file.category}
                    </span>

                    <span>•</span>

                    <span>
                      {file.size}
                    </span>

                    <span>•</span>

                    <span>
                      <CalendarDays size={11} />
                      {file.date}
                    </span>

                  </div>

                </div>


                <div className="document-actions">

                  <button
                    title="Download"
                    onClick={() =>
                      downloadDocument(file)
                    }
                  >
                    <Download size={16} />
                  </button>

                  <button
                    className="delete-document"
                    title="Delete"
                    onClick={() =>
                      deleteFile(file.id)
                    }
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="vault-empty">

            <div>
              <FolderOpen size={28} />
            </div>

            <h3>
              No documents found
            </h3>

            <p>
              Upload a medical document to get started.
            </p>

            <button
              onClick={() => setShowUpload(true)}
            >
              <Upload size={15} />
              Upload Document
            </button>

          </div>

        )}

      </section>


      {/* ================= UPLOAD MODAL ================= */}

      {showUpload && (

        <div className="vault-modal-overlay">

          <div className="vault-modal">

            <div className="vault-modal-header">

              <div>
                <span>MEDICAL VAULT</span>

                <h2>
                  Upload Document
                </h2>
              </div>

              <button
                className="vault-close"
                onClick={() =>
                  setShowUpload(false)
                }
              >
                <X size={18} />
              </button>

            </div>


            <div
              className="upload-drop-area"
              onClick={openFilePicker}
            >

              <div className="upload-icon">
                <Upload size={25} />
              </div>

              <h3>
                Choose a document
              </h3>

              <p>
                PDF, JPG, PNG or other medical files
              </p>

              <span>
                Click here to browse files
              </span>

            </div>


            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx"
              className="hidden-file-input"
              onChange={handleFileSelect}
            />


            <div className="category-field">

              <label>
                Document Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option>
                  Medical Document
                </option>

                <option>
                  Lab Report
                </option>

                <option>
                  Prescription
                </option>

                <option>
                  Doctor Report
                </option>

                <option>
                  Scan / Imaging
                </option>

                <option>
                  Insurance Document
                </option>

              </select>

            </div>


            <div className="vault-modal-actions">

              <button
                className="vault-cancel"
                onClick={() =>
                  setShowUpload(false)
                }
              >
                Cancel
              </button>

              <button
                className="vault-browse"
                onClick={openFilePicker}
              >
                <Upload size={15} />
                Choose File
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================= DISCLAIMER ================= */}

      <div className="vault-disclaimer">

        <ShieldCheck size={17} />

        <p>
          Keep sensitive medical information protected.
          This frontend currently manages documents locally;
          connect a secure backend/storage service before
          using it for real patient records.
        </p>

      </div>

    </div>
  );
}


/* ================= FILE SIZE ================= */

function formatFileSize(bytes) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(
      1,
      Math.round(bytes / 1024)
    )} KB`;
  }

  return `${(
    bytes /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}


/* ================= DOWNLOAD ================= */

function downloadDocument(file) {
  if (!file.originalFile) {
    alert(
      "This is a demo document. Upload a real file to download it."
    );
    return;
  }

  const url = URL.createObjectURL(
    file.originalFile
  );

  const link = document.createElement("a");

  link.href = url;
  link.download = file.name;

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);
}


export default MedicalVault;