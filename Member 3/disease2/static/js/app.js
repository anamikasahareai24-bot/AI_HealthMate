/**
 * Clinical AI - Disease Prediction System
 * Frontend Application Logic (v1.1)
 */

document.addEventListener("DOMContentLoaded", () => {
    // State
    const state = {
        allSymptoms: [],
        categories: {},
        selectedSymptoms: new Set(),
        currentCategory: "all",
        searchQuery: "",
        presets: []
    };

    // DOM Elements
    const symptomPillsContainer = document.getElementById("symptom-pills");
    const symptomLoading = document.getElementById("symptom-loading");
    const categoryTabsContainer = document.getElementById("category-tabs");
    const symptomSearchInput = document.getElementById("symptom-search");
    const btnClearSearch = document.getElementById("btn-clear-search");
    const selectedTagsContainer = document.getElementById("selected-tags");
    const symptomCounter = document.getElementById("symptom-counter");
    const trayCount = document.getElementById("tray-count");
    const btnClearAll = document.getElementById("btn-clear-all");
    const btnPredict = document.getElementById("btn-predict");
    const presetSelect = document.getElementById("preset-select");
    const btnLoadPreset = document.getElementById("btn-load-preset");

    const emptyState = document.getElementById("empty-state");
    const resultsContent = document.getElementById("results-content");
    const predictionsList = document.getElementById("predictions-list");
    const resAnalyzedCount = document.getElementById("res-analyzed-count");
    const statusBadge = document.getElementById("status-badge");

    const metricsModal = document.getElementById("metrics-modal");
    const btnViewMetrics = document.getElementById("btn-view-metrics");
    const btnCloseModal = document.getElementById("btn-close-modal");
    const modalMetricsBody = document.getElementById("modal-metrics-body");

    // Initialize
    init();

    async function init() {
        console.log("[*] Initializing Clinical AI UI...");
        await Promise.all([loadSymptoms(), loadPresets()]);
        setupEventListeners();
        console.log("[+] UI initialized successfully.");
    }

    async function loadSymptoms() {
        try {
            const res = await fetch("/api/symptoms");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            state.allSymptoms = data.symptoms || [];
            state.categories = data.categories || {};
            
            if (symptomLoading) symptomLoading.style.display = "none";
            renderCategoryTabs();
            renderSymptomPills();
        } catch (err) {
            console.error("Error loading symptoms:", err);
            if (symptomLoading) symptomLoading.textContent = "Error loading symptoms. Please ensure backend is running.";
        }
    }

    async function loadPresets() {
        try {
            const res = await fetch("/api/presets");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            state.presets = data.presets || [];
            
            presetSelect.innerHTML = '<option value="">-- Choose a Preset Clinical Case (10 Presets) --</option>';
            state.presets.forEach(p => {
                const opt = document.createElement("option");
                opt.value = p.id;
                opt.textContent = `${p.name} (${p.symptoms.length} symptoms)`;
                presetSelect.appendChild(opt);
            });
        } catch (err) {
            console.error("Error loading presets:", err);
        }
    }

    function renderCategoryTabs() {
        categoryTabsContainer.innerHTML = '<button class="cat-tab active" data-category="all">All (377)</button>';
        
        for (const [catName, symList] of Object.entries(state.categories)) {
            const btn = document.createElement("button");
            btn.className = "cat-tab";
            btn.dataset.category = catName;
            btn.textContent = `${catName} (${symList.length})`;
            categoryTabsContainer.appendChild(btn);
        }
    }

    function renderSymptomPills() {
        symptomPillsContainer.innerHTML = "";
        
        let filtered = state.allSymptoms;

        // Filter by category
        if (state.currentCategory !== "all") {
            const catSymptoms = new Set(state.categories[state.currentCategory] || []);
            filtered = filtered.filter(s => catSymptoms.has(s));
        }

        // Filter by search query
        if (state.searchQuery.trim()) {
            const q = state.searchQuery.toLowerCase().trim();
            filtered = filtered.filter(s => s.toLowerCase().includes(q));
        }

        if (filtered.length === 0) {
            symptomPillsContainer.innerHTML = '<p class="empty-hint">No matching symptoms found.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        filtered.forEach(symptom => {
            const pill = document.createElement("div");
            const isSelected = state.selectedSymptoms.has(symptom);
            pill.className = `symptom-pill ${isSelected ? "selected" : ""}`;
            pill.textContent = symptom;
            pill.addEventListener("click", () => toggleSymptom(symptom));
            fragment.appendChild(pill);
        });

        symptomPillsContainer.appendChild(fragment);
    }

    function toggleSymptom(symptom) {
        if (state.selectedSymptoms.has(symptom)) {
            state.selectedSymptoms.delete(symptom);
        } else {
            state.selectedSymptoms.add(symptom);
        }
        updateSelectedUI();
    }

    function updateSelectedUI() {
        const count = state.selectedSymptoms.size;
        symptomCounter.textContent = `${count} Selected`;
        trayCount.textContent = count;
        btnPredict.disabled = count === 0;

        // Render selected tags in tray
        if (count === 0) {
            selectedTagsContainer.innerHTML = '<p class="empty-hint">No symptoms selected yet. Click symptoms above or load a test case.</p>';
        } else {
            selectedTagsContainer.innerHTML = "";
            state.selectedSymptoms.forEach(s => {
                const tag = document.createElement("span");
                tag.className = "active-tag";
                tag.innerHTML = `
                    <span>${s}</span>
                    <button class="active-tag-remove" title="Remove">&times;</button>
                `;
                tag.querySelector(".active-tag-remove").addEventListener("click", (e) => {
                    e.stopPropagation();
                    toggleSymptom(s);
                });
                selectedTagsContainer.appendChild(tag);
            });
        }

        // Re-render pills to reflect active states
        renderSymptomPills();
    }

    function applyPreset(presetId) {
        if (!presetId) return;
        const preset = state.presets.find(p => p.id === presetId);
        if (!preset) return;

        state.selectedSymptoms = new Set(preset.symptoms);
        updateSelectedUI();
        triggerPrediction();
    }

    function setupEventListeners() {
        // Search Input
        symptomSearchInput.addEventListener("input", (e) => {
            state.searchQuery = e.target.value;
            btnClearSearch.style.display = state.searchQuery ? "block" : "none";
            renderSymptomPills();
        });

        btnClearSearch.addEventListener("click", () => {
            symptomSearchInput.value = "";
            state.searchQuery = "";
            btnClearSearch.style.display = "none";
            renderSymptomPills();
        });

        // Category Tab Switch
        categoryTabsContainer.addEventListener("click", (e) => {
            const tab = e.target.closest(".cat-tab");
            if (!tab) return;
            
            document.querySelectorAll(".cat-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            state.currentCategory = tab.dataset.category;
            renderSymptomPills();
        });

        // Clear All
        btnClearAll.addEventListener("click", () => {
            state.selectedSymptoms.clear();
            presetSelect.value = "";
            btnLoadPreset.disabled = true;
            updateSelectedUI();
            
            // Reset right panel
            emptyState.style.display = "flex";
            resultsContent.style.display = "none";
            statusBadge.textContent = "Awaiting Symptoms";
            statusBadge.className = "badge";
        });

        // Preset Selector - auto load on change or button click
        presetSelect.addEventListener("change", () => {
            const val = presetSelect.value;
            btnLoadPreset.disabled = !val;
            if (val) {
                applyPreset(val);
            }
        });

        btnLoadPreset.addEventListener("click", () => {
            applyPreset(presetSelect.value);
        });

        // Predict Button
        btnPredict.addEventListener("click", () => {
            triggerPrediction();
        });

        // Metrics Modal Listeners
        btnViewMetrics.addEventListener("click", openMetricsModal);
        btnCloseModal.addEventListener("click", () => metricsModal.style.display = "none");
        metricsModal.addEventListener("click", (e) => {
            if (e.target === metricsModal) metricsModal.style.display = "none";
        });
    }

    async function triggerPrediction() {
        if (state.selectedSymptoms.size === 0) {
            alert("Please select at least 1 symptom first.");
            return;
        }

        const symptomArray = Array.from(state.selectedSymptoms);
        console.log("[*] Sending prediction request for symptoms:", symptomArray);

        btnPredict.disabled = true;
        btnPredict.innerHTML = `
            <svg class="spin-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
                <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Analyzing Symptom Patterns...
        `;
        statusBadge.textContent = "Analyzing Patterns...";
        statusBadge.className = "badge badge-pulse";

        try {
            const res = await fetch("/api/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    symptoms: symptomArray,
                    top_k: 3
                })
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Server returned error ${res.status}: ${errText}`);
            }

            const data = await res.json();
            console.log("[+] Prediction results received:", data);
            renderPredictionResults(data);
        } catch (err) {
            console.error("Prediction error:", err);
            alert(`Prediction failed: ${err.message}`);
        } finally {
            btnPredict.disabled = false;
            btnPredict.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Analyze Symptoms & Predict Disease
            `;
            statusBadge.textContent = "Differential Ready";
        }
    }

    function renderPredictionResults(data) {
        if (!data || !data.top_predictions || data.top_predictions.length === 0) {
            alert("No predictions returned by the model.");
            return;
        }

        emptyState.style.display = "none";
        resultsContent.style.display = "block";
        
        const count = data.recognized_symptoms ? data.recognized_symptoms.length : state.selectedSymptoms.size;
        resAnalyzedCount.textContent = `${count} symptoms evaluated`;

        predictionsList.innerHTML = "";

        data.top_predictions.forEach(pred => {
            const card = document.createElement("div");
            card.className = `disease-card rank-${pred.rank}`;
            
            const pct = parseFloat(pred.confidence_percentage) || ((pred.confidence_score || 0) * 100);

            card.innerHTML = `
                <div class="card-top">
                    <div class="card-title-group">
                        <div class="rank-badge">${pred.rank}</div>
                        <h4 class="disease-name">${pred.disease}</h4>
                    </div>
                    <span class="confidence-badge">${pred.confidence_percentage}</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: 0%"></div>
                </div>
                <div style="font-size:0.8rem; color:#94a3b8; display:flex; justify-content:space-between; margin-top:0.35rem;">
                    <span>Differential Likelihood</span>
                    <span>Confidence Score: ${pred.confidence_percentage}</span>
                </div>
            `;

            predictionsList.appendChild(card);

            // Animate progress bar fill
            setTimeout(() => {
                const fillEl = card.querySelector(".progress-bar-fill");
                if (fillEl) {
                    fillEl.style.width = `${Math.min(pct, 100)}%`;
                }
            }, 60);
        });
    }

    async function openMetricsModal() {
        metricsModal.style.display = "flex";
        try {
            const res = await fetch("/api/metrics");
            const data = await res.json();
            const evalMeta = data.evaluation || {};
            const splitMeta = data.split_metadata || {};

            modalMetricsBody.innerHTML = `
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-val">${(evalMeta.accuracy_top1 * 100).toFixed(2)}%</div>
                        <div class="metric-lbl">Top-1 Accuracy</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-val">${(evalMeta.accuracy_top3 * 100).toFixed(2)}%</div>
                        <div class="metric-lbl">Top-3 Accuracy</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-val">${(evalMeta.accuracy_top5 * 100).toFixed(2)}%</div>
                        <div class="metric-lbl">Top-5 Accuracy</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-val">${(evalMeta.macro_f1 * 100).toFixed(2)}%</div>
                        <div class="metric-lbl">Macro F1-Score (413 Classes)</div>
                    </div>
                </div>
                <div style="font-size:0.875rem; color:#94a3b8; line-height:1.6; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1rem;">
                    <p><strong>Training Samples:</strong> ${splitMeta.train_samples?.toLocaleString() || "147,563"}</p>
                    <p><strong>Unseen Test Samples:</strong> ${evalMeta.test_samples_count?.toLocaleString() || "36,891"}</p>
                    <p><strong>Disease Classes:</strong> ${evalMeta.num_classes || 413}</p>
                    <p><strong>Input Symptom Dimensions:</strong> 377 Binary Features</p>
                    <p><strong>Classifier:</strong> Random Forest (100 Trees, max_depth=30, class_weight='balanced')</p>
                </div>
            `;
        } catch (err) {
            modalMetricsBody.innerHTML = '<p style="color:var(--accent-rose)">Failed to load metrics metadata.</p>';
        }
    }
});
