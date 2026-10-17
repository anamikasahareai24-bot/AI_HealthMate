import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import {
  Upload,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  Activity,
  HeartPulse,
  Droplets,
  X,
  Loader2,
  FileCheck2,
} from "lucide-react";

import "./ReportAnalyzer.css";

// PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

function ReportAnalyzer() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [reportInput, setReportInput] = useState("");
  const [pdfText, setPdfText] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [uploadNotice, setUploadNotice] = useState("");

  const [values, setValues] = useState([]);
  const [summary, setSummary] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // FILE SELECT
  // =====================================================

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setError("");
    setUploadNotice("");
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setFile(null);
    setPdfText("");
    setReportInput("");
    setValues([]);
    setSummary([]);
    setPageCount(0);
    setImagePreview("");

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Maximum file size is 10 MB.");
      event.target.value = "";
      return;
    }

    setFile(selectedFile);

    if (selectedFile.type === "application/pdf") {
      await readPdf(selectedFile);
      return;
    }

    if (selectedFile.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(selectedFile));
      setUploadNotice(
        "Photo uploaded. Type or paste the report values below to analyze them. Image text is not read automatically yet."
      );
      return;
    }

    setFile(null);
    setError("Please upload a PDF or an image file.");
  };

  // =====================================================
  // READ PDF
  // =====================================================

  const readPdf = async (selectedFile) => {
    try {
      setLoading(true);
      setError("");

      const arrayBuffer = await selectedFile.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise;

      setPageCount(pdf.numPages);

      let completeText = "";

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);

        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item) => item.str)
          .join(" ");

        completeText += `\n\n--- Page ${pageNumber} ---\n\n`;
        completeText += pageText;
      }

      const cleanedText = completeText
        .replace(/\s+/g, " ")
        .trim();

      setPdfText(cleanedText);
      setReportInput(cleanedText);

      const detectedValues = extractMedicalValues(cleanedText);

      setValues(detectedValues);

      const generatedSummary = generateSummary(
        detectedValues,
        cleanedText
      );

      setSummary(generatedSummary);

      if (!cleanedText) {
        setError(
          "No selectable text was found. This may be a scanned PDF. OCR is required for scanned reports."
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        "Unable to read this PDF. Please try another PDF file."
      );
    } finally {
      setLoading(false);
    }
  };

  const analyzeTypedReport = () => {
    const cleanedText = reportInput.trim();
    if (!cleanedText) {
      setError("Type or paste report text in Hindi, Hinglish, or English first.");
      return;
    }

    setError("");
    setPdfText(cleanedText);
    const detectedValues = extractMedicalValues(cleanedText);
    setValues(detectedValues);
    setSummary(generateSummary(detectedValues, cleanedText));
  };

  // =====================================================
  // MEDICAL VALUE EXTRACTION
  // =====================================================

  const extractMedicalValues = (text) => {
    const results = [];

    const normalized = text
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ");

    const patterns = [
      {
        name: "Hemoglobin",
        aliases: [
          "hemoglobin",
          "haemoglobin",
          "हीमोग्लोबिन",
          "hemoglobin level",
          "hb",
        ],
        unit: "g/dL",
      },

      {
        name: "White Blood Cells",
        aliases: [
          "wbc",
          "white blood cell",
          "white blood cells",
          "श्वेत रक्त कोशिकाएं",
          "safed khoon ke cells",
          "total leukocyte count",
          "tlc",
        ],
        unit: "/µL",
      },

      {
        name: "Red Blood Cells",
        aliases: [
          "rbc",
          "red blood cell",
          "red blood cells",
          "लाल रक्त कोशिकाएं",
          "laal khoon ke cells",
        ],
        unit: "million/µL",
      },

      {
        name: "Platelets",
        aliases: [
          "platelet",
          "platelets",
          "platelet count",
          "प्लेटलेट",
          "platelets ki ginti",
        ],
        unit: "/µL",
      },

      {
        name: "Blood Glucose",
        aliases: [
          "blood glucose",
          "glucose",
          "blood sugar",
          "fasting glucose",
          "fasting blood sugar",
          "fbs",
          "random blood sugar",
          "ब्लड शुगर",
          "रक्त शर्करा",
          "khoon ki sugar",
          "fasting sugar",
          "rbs",
        ],
        unit: "mg/dL",
      },

      {
        name: "HbA1c",
        aliases: [
          "hba1c",
          "hb a1c",
          "glycated hemoglobin",
          "glycosylated hemoglobin",
          "एचबीए1सी",
        ],
        unit: "%",
      },

      {
        name: "Total Cholesterol",
        aliases: [
          "total cholesterol",
          "cholesterol",
          "कोलेस्ट्रॉल",
        ],
        unit: "mg/dL",
      },

      {
        name: "Triglycerides",
        aliases: [
          "triglycerides",
          "triglyceride",
        ],
        unit: "mg/dL",
      },

      {
        name: "HDL",
        aliases: [
          "hdl",
          "hdl cholesterol",
        ],
        unit: "mg/dL",
      },

      {
        name: "LDL",
        aliases: [
          "ldl",
          "ldl cholesterol",
        ],
        unit: "mg/dL",
      },

      {
        name: "Creatinine",
        aliases: [
          "creatinine",
          "serum creatinine",
          "क्रिएटिनिन",
        ],
        unit: "mg/dL",
      },

      {
        name: "Urea",
        aliases: [
          "urea",
          "blood urea",
          "serum urea",
          "यूरिया",
        ],
        unit: "mg/dL",
      },

      {
        name: "ALT / SGPT",
        aliases: [
          "alt",
          "sgpt",
          "alanine aminotransferase",
        ],
        unit: "U/L",
      },

      {
        name: "AST / SGOT",
        aliases: [
          "ast",
          "sgot",
          "aspartate aminotransferase",
        ],
        unit: "U/L",
      },

      {
        name: "TSH",
        aliases: [
          "tsh",
          "thyroid stimulating hormone",
          "thyroid-stimulating hormone",
        ],
        unit: "mIU/L",
      },

      {
        name: "Vitamin D",
        aliases: [
          "vitamin d",
          "25-oh vitamin d",
          "25 hydroxy vitamin d",
        ],
        unit: "ng/mL",
      },

      {
        name: "Vitamin B12",
        aliases: [
          "vitamin b12",
          "vit b12",
          "cobalamin",
        ],
        unit: "pg/mL",
      },
    ];

    patterns.forEach((test) => {
      test.aliases.forEach((alias) => {
        const escapedAlias = escapeRegex(alias);

        const regex = new RegExp(
          `${escapedAlias}\\s*(?:[:=\\-])?\\s*(\\d+(?:\\.\\d+)?)\\s*(mg/dl|g/dl|u/l|miu/l|ng/ml|pg/ml|%|/ul|/µl|million/µl)?`,
          "i"
        );

        const match = normalized.match(regex);

        if (match) {
          const alreadyExists = results.some(
            (item) => item.name === test.name
          );

          if (!alreadyExists) {
            results.push({
              name: test.name,
              value: match[1],
              unit: match[2] || test.unit,
              source: match[0].trim(),
            });
          }
        }
      });
    });

    return results;
  };

  const escapeRegex = (value) => {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // =====================================================
  // SUMMARY
  // =====================================================

  const generateSummary = (detectedValues, text) => {
    const result = [];

    if (detectedValues.length === 0) {
      result.push({
        type: "info",
        title: "No common values detected",
        text:
          "The PDF was read, but no supported medical test values were automatically identified.",
      });

      return result;
    }

    result.push({
      type: "success",
      title: "Report successfully read",
      text: `The system extracted ${detectedValues.length} commonly recognized medical value(s) from the report.`,
    });

    const lowerText = text.toLowerCase();

    if (
      lowerText.includes("normal") ||
      lowerText.includes("within normal")
    ) {
      result.push({
        type: "info",
        title: "Normal-range information found",
        text:
          "The report contains wording related to normal/reference ranges. Individual values should still be reviewed with their laboratory reference ranges.",
      });
    }

    if (
      lowerText.includes("high") ||
      lowerText.includes("elevated") ||
      lowerText.includes("above")
    ) {
      result.push({
        type: "warning",
        title: "Possible elevated result wording found",
        text:
          "The report contains wording such as high, elevated or above. This is not a diagnosis; compare the value with the reference range printed on the report.",
      });
    }

    if (
      lowerText.includes("low") ||
      lowerText.includes("below") ||
      lowerText.includes("decreased")
    ) {
      result.push({
        type: "warning",
        title: "Possible low result wording found",
        text:
          "The report contains wording such as low, below or decreased. Review the corresponding reference range and discuss significant findings with a healthcare professional.",
      });
    }

    return result;
  };

  // =====================================================
  // REMOVE FILE
  // =====================================================

  const removeFile = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setFile(null);
    setImagePreview("");
    setReportInput("");
    setPdfText("");
    setUploadNotice("");
    setPageCount(0);
    setValues([]);
    setSummary([]);
    setError("");
  };

  // =====================================================
  // FORMAT TEXT
  // =====================================================

  const getFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    const mb = bytes / (1024 * 1024);

    if (mb >= 1) {
      return `${mb.toFixed(2)} MB`;
    }

    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div className="report-page">

      {/* ================= HEADER ================= */}

      <section className="report-header">

        <div>

          <div className="report-eyebrow">
            <FileText size={14} />
            SMART MEDICAL REPORT ANALYZER
          </div>

          <h1>
            Report <span>Analyzer</span>
          </h1>

          <p>
            Upload a medical PDF or photo, or type report text in
            Hindi, Hinglish, or English to review common medical values.
          </p>

        </div>

        <div className="report-header-icon">
          <HeartPulse size={35} />
        </div>

      </section>


      {/* ================= MAIN ================= */}

      <div className="report-container">

        {/* ================= UPLOAD CARD ================= */}

        <section className="report-card">

          <div className="report-card-header">

            <div>
              <span>STEP 01</span>
              <h2>Upload or enter medical report</h2>
            </div>

            <FileCheck2
              size={23}
              className="green-icon"
            />

          </div>


          <label className="upload-box">

            <input
              type="file"
              accept="application/pdf,.pdf,image/*"
              onChange={handleFileChange}
            />

            <div className="upload-circle">
              <Upload size={27} />
            </div>

            <h3>
              Click to upload a PDF or photo
            </h3>

            <p>
              Supported formats: PDF, JPG, PNG, WEBP
            </p>

            <small>
              Maximum file size: 10 MB
            </small>

          </label>


          <div className="report-text-entry">
            <label htmlFor="report-text-input">
              Report text <span>Hindi / Hinglish / English</span>
            </label>
            <textarea
              id="report-text-input"
              value={reportInput}
              onChange={(event) => setReportInput(event.target.value)}
              placeholder="Report ke test names aur values yahan type/paste karein... / Type or paste report text here..."
              rows="5"
            />
            <button
              type="button"
              className="analyze-text-btn"
              onClick={analyzeTypedReport}
            >
              <Search size={16} />
              Analyze report text
            </button>
          </div>

          {uploadNotice && (
            <div className="upload-notice">
              <AlertCircle size={18} />
              <span>{uploadNotice}</span>
            </div>
          )}

          {imagePreview && (
            <div className="report-image-preview-wrap">
              <img className="report-image-preview" src={imagePreview} alt="Uploaded medical report" />
            </div>
          )}

          {/* FILE */}

          {file && (

            <div className="file-preview">

              <div className="file-icon">
                <FileText size={22} />
              </div>

              <div className="file-details">

                <strong>
                  {file.name}
                </strong>

                <span>
                  {getFileSize(file.size)}
                  {" • "}
                  {file.type === "application/pdf"
                    ? `${pageCount} page${pageCount !== 1 ? "s" : ""}`
                    : "Image report"}
                </span>

              </div>

              <button
                className="remove-btn"
                onClick={removeFile}
              >
                <X size={17} />
              </button>

            </div>

          )}


          {/* LOADING */}

          {loading && (

            <div className="loading-box">

              <Loader2
                size={20}
                className="spin"
              />

              <div>

                <strong>
                  Reading PDF...
                </strong>

                <span>
                  Extracting text from your report
                </span>

              </div>

            </div>

          )}


          {/* ERROR */}

          {error && (

            <div className="error-box">

              <AlertCircle size={19} />

              <span>
                {error}
              </span>

            </div>

          )}

        </section>


        {/* ================= EXTRACTED VALUES ================= */}

        {values.length > 0 && (

          <section className="report-card">

            <div className="report-card-header">

              <div>
                <span>STEP 02</span>

                <h2>
                  Detected Medical Values
                </h2>
              </div>

              <Activity
                size={23}
                className="green-icon"
              />

            </div>


            <div className="values-grid">

              {values.map((item, index) => (

                <div
                  className="value-card"
                  key={`${item.name}-${index}`}
                >

                  <div className="value-card-top">

                    <div className="value-icon">
                      <Droplets size={17} />
                    </div>

                    <CheckCircle2
                      size={16}
                      className="value-check"
                    />

                  </div>

                  <span>
                    {item.name}
                  </span>

                  <strong>
                    {item.value}
                    {" "}
                    <small>
                      {item.unit}
                    </small>
                  </strong>

                  <em>
                    Extracted from PDF
                  </em>

                </div>

              ))}

            </div>

          </section>

        )}


        {/* ================= SUMMARY ================= */}

        {summary.length > 0 && (

          <section className="report-card">

            <div className="report-card-header">

              <div>
                <span>STEP 03</span>

                <h2>
                  Readable Summary
                </h2>
              </div>

              <Search
                size={23}
                className="green-icon"
              />

            </div>


            <div className="summary-list">

              {summary.map((item, index) => (

                <div
                  className={`summary-item ${item.type}`}
                  key={index}
                >

                  {item.type === "success" ? (
                    <CheckCircle2 size={19} />
                  ) : item.type === "warning" ? (
                    <AlertCircle size={19} />
                  ) : (
                    <FileText size={19} />
                  )}

                  <div>

                    <strong>
                      {item.title}
                    </strong>

                    <p>
                      {item.text}
                    </p>

                  </div>

                </div>

              ))}

            </div>


            <div className="medical-note">

              <AlertCircle size={18} />

              <p>
                This automated summary is for educational
                assistance only. It does not diagnose disease
                or replace advice from a qualified healthcare
                professional. Always compare results with the
                reference range printed by the laboratory.
              </p>

            </div>

          </section>

        )}


        {/* ================= RAW TEXT ================= */}

        {pdfText && (

          <section className="report-card">

            <div className="report-card-header">

              <div>
                <span>EXTRACTED DOCUMENT</span>

                <h2>
                  Report Text
                </h2>
              </div>

              <FileText
                size={23}
                className="green-icon"
              />

            </div>


            <div className="text-language-badge">
              Hindi / Hinglish / English text supported
            </div>


            <div className="pdf-text-box">
              {pdfText}
            </div>

          </section>

        )}

      </div>

    </div>
  );
}

export default ReportAnalyzer;