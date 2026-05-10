"use strict";
// =============================================
//  DavaoSafe — Main TypeScript Application
// =============================================
// ----- Navigation -----
function showPage(pageId) {
    const allPages = document.querySelectorAll(".page");
    allPages.forEach((page) => page.classList.remove("active"));
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add("active");
        window.scrollTo(0, 0);
    }
}
// ----- Login -----
function doLogin() {
    var _a, _b, _c, _d;
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");
    const email = (_b = (_a = emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : "";
    const password = (_d = (_c = passwordInput === null || passwordInput === void 0 ? void 0 : passwordInput.value) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : "";
    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }
    // Update profile display with email
    const profileEmailEl = document.getElementById("profile-email");
    if (profileEmailEl) {
        profileEmailEl.textContent = email;
    }
    showPage("page-home");
}
// ----- Status System -----
const statusConfigs = {
    safe: {
        level: "safe",
        label: "SAFE",
        temp: "32°C",
        alertText: "No active alerts in your area",
        alertDotColor: "green",
    },
    warning: {
        level: "warning",
        label: "WARNING",
        temp: "28°C",
        alertText: "Heavy rain advisory — stay alert",
        alertDotColor: "red",
    },
    danger: {
        level: "danger",
        label: "DANGER",
        temp: "25°C",
        alertText: "Typhoon Signal #1 — take precautions now!",
        alertDotColor: "red",
    },
};
function setStatus(level) {
    const config = statusConfigs[level];
    if (!config)
        return;
    const banner = document.getElementById("status-banner");
    const badge = banner === null || banner === void 0 ? void 0 : banner.querySelector(".status-badge");
    const tempEl = document.getElementById("home-temp");
    const alertTextEl = document.querySelector(".alert-text");
    const alertDot = document.querySelector(".alert-dot");
    if (banner) {
        banner.className = `status-banner ${level}`;
    }
    if (badge) {
        badge.textContent = config.label;
        badge.className = `status-badge ${level}`;
    }
    if (tempEl) {
        tempEl.textContent = config.temp;
    }
    if (alertTextEl) {
        alertTextEl.textContent = config.alertText;
    }
    if (alertDot) {
        alertDot.className = `alert-dot ${config.alertDotColor}`;
    }
}
// ----- Emergency SOS -----
function triggerSOS() {
    const modal = document.getElementById("sos-modal");
    if (modal) {
        modal.classList.remove("hidden");
    }
}
function closeModal() {
    const modal = document.getElementById("sos-modal");
    if (modal) {
        modal.classList.add("hidden");
        showPage("page-home");
    }
}
// ----- Report Incident -----
function submitReport() {
    alert("✅ Incident report submitted successfully! Authorities have been notified.");
    showPage("page-home");
}
// ----- Preparedness Checklist -----
function updateProgress() {
    const checkboxes = document.querySelectorAll("#checklist-items input[type='checkbox']");
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter((cb) => cb.checked).length;
    const progressEl = document.getElementById("checklist-progress");
    if (progressEl) {
        progressEl.textContent = `${checked} / ${total} done`;
    }
}
const allResults = [
    {
        type: "alert",
        title: "Flood alert — Buhangin",
        meta: "Alert · 3 mins ago",
        icon: "🔔",
    },
    {
        type: "alert",
        title: "Typhoon Signal #1 — Davao Region",
        meta: "Alert · Just now",
        icon: "🔔",
    },
    {
        type: "article",
        title: "What to do during a flood",
        meta: "Article · Preparedness guide",
        icon: "📄",
    },
    {
        type: "article",
        title: "Building your family emergency plan",
        meta: "Article · Preparedness guide",
        icon: "📄",
    },
    {
        type: "shelter",
        title: "Calinan Evacuation Center",
        meta: "Shelter · 3.2 km away",
        icon: "📍",
    },
    {
        type: "shelter",
        title: "Buhangin Sports Complex",
        meta: "Shelter · 1.8 km away",
        icon: "📍",
    },
];
let currentFilter = "all";
function doSearch(query) {
    const q = query.toLowerCase().trim();
    const resultsEl = document.getElementById("search-results");
    if (!resultsEl)
        return;
    const filtered = allResults.filter((item) => {
        const matchesQuery = q === "" || item.title.toLowerCase().includes(q) || item.meta.toLowerCase().includes(q);
        const matchesFilter = currentFilter === "all" || item.type === currentFilter;
        return matchesQuery && matchesFilter;
    });
    resultsEl.innerHTML = filtered
        .map((item) => `
      <div class="search-result-item ${item.type}-result">
        <span class="result-type-icon">${item.icon}</span>
        <div>
          <div class="result-title">${item.title}</div>
          <div class="result-meta">${item.meta}</div>
        </div>
      </div>
    `)
        .join("");
}
function filterTab(btn, filter) {
    var _a;
    document.querySelectorAll(".filter-tab").forEach((t) => t.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = filter;
    const searchInput = document.getElementById("search-input");
    doSearch((_a = searchInput === null || searchInput === void 0 ? void 0 : searchInput.value) !== null && _a !== void 0 ? _a : "");
}
function clearSearch() {
    const searchInput = document.getElementById("search-input");
    if (searchInput)
        searchInput.value = "";
    doSearch("");
}
// ----- Init -----
document.addEventListener("DOMContentLoaded", () => {
    // Show splash on load
    showPage("page-splash");
    // Close modal on backdrop click
    const modal = document.getElementById("sos-modal");
    modal === null || modal === void 0 ? void 0 : modal.addEventListener("click", (e) => {
        if (e.target === modal)
            closeModal();
    });
    // Initialize checklist progress
    updateProgress();
    console.log("DavaoSafe initialized ✅");
});
