// =============================================
//  DavaoSafe — Main TypeScript Application
// =============================================

// ----- Types -----

type PageId =
  | "page-splash"
  | "page-login"
  | "page-signup"
  | "page-change-password"
  | "page-home"
  | "page-map"
  | "page-alerts"
  | "page-profile"
  | "page-sos"
  | "page-report"
  | "page-preparedness"
  | "page-search";

type StatusLevel = "safe" | "warning" | "danger";

interface StatusConfig {
  level: StatusLevel;
  label: string;
  temp: string;
  alertText: string;
  alertDotColor: string;
}

// ----- Navigation -----

function showPage(pageId: PageId): void {
  const allPages = document.querySelectorAll<HTMLElement>(".page");
  allPages.forEach((page) => page.classList.remove("active"));

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add("active");
    window.scrollTo(0, 0);
  }
}

// ----- Login -----

function doLogin(): void {
  const emailInput = document.getElementById("login-email") as HTMLInputElement;
  const passwordInput = document.getElementById(
    "login-password"
  ) as HTMLInputElement;

  const email: string = emailInput?.value?.trim() ?? "";
  const password: string = passwordInput?.value?.trim() ?? "";

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

const statusConfigs: Record<StatusLevel, StatusConfig> = {
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

function setStatus(level: StatusLevel): void {
  const config = statusConfigs[level];
  if (!config) return;

  const banner = document.getElementById("status-banner");
  const badge = banner?.querySelector<HTMLElement>(".status-badge");
  const tempEl = document.getElementById("home-temp");
  const alertTextEl = document.querySelector<HTMLElement>(".alert-text");
  const alertDot = document.querySelector<HTMLElement>(".alert-dot");

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

function triggerSOS(): void {
  const modal = document.getElementById("sos-modal");
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function closeModal(): void {
  const modal = document.getElementById("sos-modal");
  if (modal) {
    modal.classList.add("hidden");
    showPage("page-home");
  }
}

// ----- Report Incident -----

function submitReport(): void {
  alert("✅ Incident report submitted successfully! Authorities have been notified.");
  showPage("page-home");
}

// ----- Preparedness Checklist -----

function updateProgress(): void {
  const checkboxes = document.querySelectorAll<HTMLInputElement>(
    "#checklist-items input[type='checkbox']"
  );
  const total: number = checkboxes.length;
  const checked: number = Array.from(checkboxes).filter((cb) => cb.checked).length;

  const progressEl = document.getElementById("checklist-progress");
  if (progressEl) {
    progressEl.textContent = `${checked} / ${total} done`;
  }
}

// ----- Search -----

interface SearchResult {
  type: "alert" | "shelter" | "article";
  title: string;
  meta: string;
  icon: string;
}

const allResults: SearchResult[] = [
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

let currentFilter: string = "all";

function doSearch(query: string): void {
  const q = query.toLowerCase().trim();
  const resultsEl = document.getElementById("search-results");
  if (!resultsEl) return;

  const filtered = allResults.filter((item) => {
    const matchesQuery =
      q === "" || item.title.toLowerCase().includes(q) || item.meta.toLowerCase().includes(q);
    const matchesFilter =
      currentFilter === "all" || item.type === currentFilter;
    return matchesQuery && matchesFilter;
  });

  resultsEl.innerHTML = filtered
    .map(
      (item) => `
      <div class="search-result-item ${item.type}-result">
        <span class="result-type-icon">${item.icon}</span>
        <div>
          <div class="result-title">${item.title}</div>
          <div class="result-meta">${item.meta}</div>
        </div>
      </div>
    `
    )
    .join("");
}

function filterTab(btn: HTMLElement, filter: string): void {
  document.querySelectorAll<HTMLElement>(".filter-tab").forEach((t) =>
    t.classList.remove("active")
  );
  btn.classList.add("active");
  currentFilter = filter;

  const searchInput = document.getElementById("search-input") as HTMLInputElement;
  doSearch(searchInput?.value ?? "");
}

function clearSearch(): void {
  const searchInput = document.getElementById("search-input") as HTMLInputElement;
  if (searchInput) searchInput.value = "";
  doSearch("");
}

// ----- Init -----

document.addEventListener("DOMContentLoaded", (): void => {
  // Show splash on load
  showPage("page-splash");

  // Close modal on backdrop click
  const modal = document.getElementById("sos-modal");
  modal?.addEventListener("click", (e: MouseEvent): void => {
    if (e.target === modal) closeModal();
  });

  // Initialize checklist progress
  updateProgress();

  console.log("DavaoSafe initialized ✅");
});
