/* ============================================================
   ERPNEXT PROFESSIONAL THEME v4 — JS (INSTANT LOGO SWAP FIX)
   ============================================================ */
(function () {
  "use strict";

  const MODULE_META = {
    "Home":                     { emoji: "🏠", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
    "Accounting":               { emoji: "💰", bg: "linear-gradient(135deg,#dcfce7,#bbf7d0)" },
    "Accounts":                 { emoji: "💰", bg: "linear-gradient(135deg,#dcfce7,#bbf7d0)" },
    "Stock":                    { emoji: "📦", bg: "linear-gradient(135deg,#ede9fe,#ddd6fe)" },
    "Inventory":                { emoji: "📦", bg: "linear-gradient(135deg,#ede9fe,#ddd6fe)" },
    "CRM":                      { emoji: "🤝", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
    "Buying":                   { emoji: "🛒", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
    "Purchase":                 { emoji: "🛒", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
    "Selling":                  { emoji: "🏷️", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
    "Sales":                    { emoji: "🏷️", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
    "Manufacturing":            { emoji: "🏭", bg: "linear-gradient(135deg,#fee2e2,#fecaca)" },
    "HR":                       { emoji: "👥", bg: "linear-gradient(135deg,#f3e8ff,#e9d5ff)" },
    "Payroll":                  { emoji: "💵", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
    "Human Resources":          { emoji: "👥", bg: "linear-gradient(135deg,#f3e8ff,#e9d5ff)" },
    "Projects":                 { emoji: "📊", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
    "Project":                  { emoji: "📊", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
    "Quality":                  { emoji: "✅", bg: "linear-gradient(135deg,#fef9c3,#fde68a)" },
    "Quality Management":       { emoji: "✅", bg: "linear-gradient(135deg,#fef9c3,#fde68a)" },
    "Support":                  { emoji: "🎧", bg: "linear-gradient(135deg,#e0f2fe,#bae6fd)" },
    "Assets":                   { emoji: "🏢", bg: "linear-gradient(135deg,#fef3c7,#fde68a)" },
    "Asset":                    { emoji: "🏢", bg: "linear-gradient(135deg,#fef3c7,#fde68a)" },
    "Data Import and Settings": { emoji: "⚙️", bg: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" },
    "Data Import":              { emoji: "📥", bg: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" },
    "Settings":                 { emoji: "⚙️", bg: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" },
    "Loans":                    { emoji: "🏦", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
    "Agriculture":              { emoji: "🌱", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
    "Retail":                   { emoji: "🏪", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
    "Healthcare":               { emoji: "❤️", bg: "linear-gradient(135deg,#fee2e2,#fecaca)" },
    "Education":                { emoji: "🎓", bg: "linear-gradient(135deg,#e0f2fe,#bae6fd)" },
    "Non Profit":               { emoji: "🤲", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
    "Item":                     { emoji: "📦", bg: "linear-gradient(135deg,#ede9fe,#ddd6fe)" },
    "Customer":                 { emoji: "👤", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
    "Supplier":                 { emoji: "🚚", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
    "Sales Invoice":            { emoji: "🧾", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
    "Leaderboard":              { emoji: "🏆", bg: "linear-gradient(135deg,#fef9c3,#fde68a)" },
    "Purchase Invoice":         { emoji: "📋", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
    "Purchase Order":           { emoji: "📋", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
  };

  function getMeta(name) {
    if (!name) return { emoji: "📋", bg: "linear-gradient(135deg,#e8f4f8,#c8e6f0)" };
    const clean = name.trim();
    if (MODULE_META[clean]) return MODULE_META[clean];
    for (const key of Object.keys(MODULE_META)) {
      if (clean.toLowerCase().includes(key.toLowerCase()) ||
          key.toLowerCase().includes(clean.toLowerCase())) {
        return MODULE_META[key];
      }
    }
    return { emoji: "📋", bg: "linear-gradient(135deg,#e8f4f8,#c8e6f0)" };
  }

  /* ----------------------------------------------------------
     INSTANT CUSTOM LOGO REPLACEMENT
     ---------------------------------------------------------- */
  function replaceAppLogo() {
    const brand = document.querySelector(".navbar-brand, .navbar .navbar-brand");
    if (brand && brand.dataset.customLogo !== "1") {
      const dynamicRoute = window.location.origin + "/app/module-page";
      brand.setAttribute("href", dynamicRoute);

      brand.innerHTML = `
        <img src="/assets/micron_theme/images/spark_logo.png" 
             style="height: 28px; width: auto; object-fit: contain; display: block;" 
             alt="Logo"
             data-custom-logo="1">
      `;
      brand.dataset.customLogo = "1";
    }
  }

  /* ----------------------------------------------------------
     1. HIDE "PUBLIC" label
     ---------------------------------------------------------- */
  function hidePublicLabel() {
    document.querySelectorAll(
      ".desk-sidebar .sidebar-section-head, " +
      ".desk-sidebar .list-sidebar-label, " +
      ".desk-sidebar .desk-sidebar-section > .sidebar-section-head"
    ).forEach(el => {
      el.style.display = "none";
    });
  }

  /* ----------------------------------------------------------
     2. COLORIZE + ALWAYS SHOW SIDEBAR ICONS
     ---------------------------------------------------------- */
  function colorizeSidebar() {
    const sidebar = document.querySelector(".desk-sidebar");
    if (!sidebar) return;

    document.querySelectorAll(
      ".desk-sidebar .sidebar-item-container, .desk-sidebar .desk-sidebar-item"
    ).forEach(item => {
      item.style.display = "flex";
      item.style.alignItems = "center";
      item.style.overflow = "hidden";
      item.style.whiteSpace = "nowrap";

      const labelEl = item.querySelector(".sidebar-item-label");
      const iconWrap = item.querySelector(".sidebar-item-icon");

      const name = labelEl ? labelEl.textContent.trim() : "";
      const meta = getMeta(name);

      if (iconWrap && !iconWrap.dataset.themed) {
        iconWrap.style.cssText = `
          background: ${meta.bg} !important;
          border-radius: 10px !important;
          width: 36px !important;
          height: 36px !important;
          min-width: 36px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-size: 18px !important;
          line-height: 1 !important;
          flex-shrink: 0 !important;
        `;
        iconWrap.innerHTML = `<span style="font-size:18px;line-height:1;display:block;">${meta.emoji}</span>`;
        iconWrap.dataset.themed = "1";
      }
    });
  }

  /* ----------------------------------------------------------
     3. COLORIZE MODULE CARDS
     ---------------------------------------------------------- */
  function colorizeCards() {
    document.querySelectorAll(".widget.links-widget-box").forEach(card => {
      if (card.dataset.themed) return;
      const titleEl = card.querySelector(".widget-title");
      if (!titleEl) return;
      const name = titleEl.textContent.trim();
      const meta = getMeta(name);

      const iconEl = card.querySelector(".widget-head .icon");
      if (iconEl) {
        iconEl.style.cssText = `
          background: ${meta.bg} !important;
          border-radius: 12px !important;
          width: 42px !important;
          height: 42px !important;
          min-width: 42px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 !important;
          border: none !important;
          flex-shrink: 0 !important;
        `;
        iconEl.innerHTML = `<span style="font-size:22px;line-height:1;display:block;">${meta.emoji}</span>`;
      }

      titleEl.style.fontSize = "14px";
      titleEl.style.fontWeight = "700";
      titleEl.style.color = "#1e293b";

      card.dataset.themed = "1";
    });
  }

  /* ----------------------------------------------------------
     4. COLORIZE SHORTCUT PILLS
     ---------------------------------------------------------- */
  function colorizeShortcuts() {
    document.querySelectorAll(".widget.shortcut-widget-box").forEach(card => {
      if (card.dataset.themed) return;
      const titleEl = card.querySelector(".widget-title");
      if (!titleEl) return;
      const name = titleEl.textContent.trim();
      const meta = getMeta(name);

      card.style.padding = "8px 14px";
      card.style.minHeight = "unset";
      card.style.display = "flex";
      card.style.alignItems = "center";

      const iconWrap = card.querySelector(".shortcut-widget-icon");
      if (iconWrap) {
        iconWrap.style.cssText = `
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 34px !important;
          height: 34px !important;
          min-width: 34px !important;
          border-radius: 9px !important;
          background: ${meta.bg} !important;
          font-size: 18px !important;
          line-height: 1 !important;
          flex-shrink: 0 !important;
        `;
        iconWrap.innerHTML = `<span style="font-size:18px;line-height:1;display:block;">${meta.emoji}</span>`;
      }

      titleEl.style.fontSize = "13px";
      titleEl.style.fontWeight = "600";
      titleEl.style.color = "#1e293b";

      const head = card.querySelector(".widget-head");
      if (head) {
        head.style.padding = "0";
        head.style.borderBottom = "none";
        head.style.marginBottom = "0";
      }

      card.dataset.themed = "1";
    });
  }

  /* ----------------------------------------------------------
     5. REDUCE GAPS between sections
     ---------------------------------------------------------- */
  function reduceGaps() {
    document.querySelectorAll(".widget-group").forEach(g => {
      g.style.marginBottom = "8px";
    });
    document.querySelectorAll(".widget-group .widgets-container").forEach(c => {
      c.style.gap = "8px";
    });
    document.querySelectorAll(".row.widget-row").forEach(r => {
      r.style.marginBottom = "8px";
    });
    document.querySelectorAll(".workspace-section-title, h3.workspace-section-title, .widget-group-title").forEach(h => {
      h.style.marginBottom = "8px";
      h.style.marginTop = "4px";
      h.style.fontSize = "11px";
      h.style.fontWeight = "700";
      h.style.color = "#94a3b8";
      h.style.textTransform = "uppercase";
      h.style.letterSpacing = "0.08em";
    });
  }

  /* ----------------------------------------------------------
     6. ADD DECORATIVE BACKGROUND & COMPREHENSIVE CONTROL STYLES
     ---------------------------------------------------------- */
  function addDecorativeBg() {
    if (document.getElementById("desk-bg-decor")) return;

    const style = document.createElement("style");
    style.id = "desk-bg-decor";
    style.textContent = `
      /* Hide default ERP logos immediately via CSS */
      .navbar-brand img:not([data-custom-logo="1"]),
      .navbar-brand svg,
      .navbar-brand .app-logo,
      .navbar-brand .frappe-icon {
        display: none !important;
        visibility: hidden !important;
      }

      /* Subtle mesh gradient background for the whole app body */
      .page-wrapper, .desk-body, body {
        background:
          radial-gradient(ellipse at 10% 20%, rgba(66,115,136,0.07) 0%, transparent 50%),
          radial-gradient(ellipse at 90% 10%, rgba(45,95,116,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 90%, rgba(66,115,136,0.05) 0%, transparent 50%),
          linear-gradient(160deg, #eef6fb 0%, #e8eef5 50%, #eff1f8 100%) !important;
      }
      
      /* ELEGANT GRADIENT BLUE NAVBAR */
      :root, body[data-theme="light"], body[data-theme="dark"] {
        --navbar-bg: linear-gradient(135deg, rgba(224, 239, 253, 0.9) 0%, rgba(240, 246, 255, 0.85) 100%) !important;
      }

      header.navbar, 
      .navbar, 
      .navbar-expand,
      [data-theme="light"] .navbar, 
      [data-theme="dark"] .navbar {
        background: linear-gradient(135deg, rgba(224, 239, 253, 0.95) 0%, rgba(240, 246, 255, 0.9) 100%) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border-bottom: 1px solid rgba(59, 130, 246, 0.2) !important;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.08) !important;
      }
      
      .navbar .nav-link,
      .navbar .navbar-nav,
      .navbar .help-link,
      .navbar .dropdown-toggle,
      .navbar .breadcrumb,
      .navbar .breadcrumb-item,
      .navbar .breadcrumb-item a,
      .navbar .user-name {
        color: #1e3a8a !important;
        font-weight: 600 !important;
      }
      
      .navbar .search-bar input, .navbar #navbar-search {
        background-color: rgba(255, 255, 255, 0.95) !important;
        border: 1px solid rgba(59, 130, 246, 0.25) !important;
        color: #1e3a8a !important;
        border-radius: 20px !important;
        padding-left: 36px !important;
        font-weight: 500 !important;
        transition: all 0.3s ease !important;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03) !important;
      }
      .navbar .search-bar input:focus, .navbar #navbar-search:focus {
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
      }
      .navbar .search-bar input::placeholder {
        color: #60a5fa !important;
      }

      /* AVATAR FIXES */
      .navbar .avatar-frame,
      .navbar .avatar,
      .navbar .user-avatar,
      .navbar .avatar-small {
        background: linear-gradient(135deg, #95cbe6 0%, #3b82f6 100%) !important;
        border: 2px solid #ffffff !important;
        box-shadow: 0 3px 10px rgba(30, 58, 138, 0.25) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 50% !important;
        transition: transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        cursor: pointer !important;
      }

      .navbar .avatar-frame:hover,
      .navbar .avatar:hover,
      .navbar .user-avatar:hover {
        transform: translateY(-3px) scale(1.08) !important;
        box-shadow: 0 6px 15px rgba(30, 58, 138, 0.35) !important;
      }

      .navbar .avatar-frame .avatar-text,
      .navbar .avatar-frame span,
      .navbar .avatar-frame div,
      .navbar .avatar .avatar-text {
        color: #ffffff !important;
        font-weight: 800 !important;
        font-size: 13px !important;
        text-transform: uppercase !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      /* WORK AREA WRAPPER */
      .layout-main-section-wrapper > .layout-main-section {
        background: rgba(255,255,255,0.65) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        border-radius: 16px !important;
        border: 1px solid rgba(255,255,255,0.8) !important;
        box-shadow: 0 4px 24px rgba(66,115,136,0.08) !important;
        padding: 16px !important;
        margin: 8px !important;
      }

      .shortcuts-header, .your-shortcuts-header {
        font-size: 11px !important;
        font-weight: 700 !important;
        color: #94a3b8 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.08em !important;
        margin-bottom: 6px !important;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  /* ----------------------------------------------------------
     7. CENTER SEARCH BAR & COLORIZE SEARCH ICON
     ---------------------------------------------------------- */
  function centerSearchBar() {
    const searchBar = document.querySelector(".navbar .search-bar, .navbar #navbar-search, .navbar .navbar-search");
    if (!searchBar) return;
    const container = document.querySelector(".navbar .container, .navbar > .container-fluid");
    if (container) container.style.position = "relative";
    
    searchBar.style.position = "absolute";
    searchBar.style.left = "50%";
    searchBar.style.transform = "translateX(-50%)";
    searchBar.style.width = "420px";
    searchBar.style.maxWidth = "420px";
    searchBar.style.zIndex = "10";

    const searchIcon = searchBar.querySelector(".search-icon, .icon-search, svg, use");
    if (searchIcon) {
      searchIcon.style.color = "#3b82f6";
      searchIcon.style.fill = "#3b82f6";
    }
  }

  /* ----------------------------------------------------------
     8. SIDEBAR HOVER
     ---------------------------------------------------------- */
  function fixSidebarHover() {
    const sidebar = document.querySelector(".desk-sidebar");
    if (!sidebar || sidebar.dataset.hoverBound) return;

    sidebar.style.width = "58px";
    sidebar.style.minWidth = "58px";
    sidebar.style.overflow = "hidden";
    sidebar.style.transition = "width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1)";

    sidebar.addEventListener("mouseenter", () => {
      sidebar.style.width = "224px";
      sidebar.style.minWidth = "224px";
    });
    sidebar.addEventListener("mouseleave", () => {
      sidebar.style.width = "58px";
      sidebar.style.minWidth = "58px";
    });

    sidebar.dataset.hoverBound = "1";
  }

  /* ----------------------------------------------------------
     9. DYNAMIC COLORIZE NAV BAR CONTROLS
     ---------------------------------------------------------- */
  function colorizeNavbarControls() {
    const bellBtn = document.querySelector(".navbar .notifications-icon, .navbar .nav-link-notifications, .navbar #navbar-notifications");
    if (bellBtn && !bellBtn.dataset.themedBell) {
      bellBtn.style.position = "relative";
      const bellSvg = bellBtn.querySelector("svg");
      if (bellSvg) {
        bellSvg.style.cssText = `
          color: #f59e0b !important;
          fill: #f59e0b !important;
          stroke: none !important;
          transform: scale(1.1);
          transition: transform 0.2s ease;
          cursor: pointer;
        `;
        bellBtn.addEventListener("mouseenter", () => bellSvg.style.transform = "scale(1.2) rotate(10deg)");
        bellBtn.addEventListener("mouseleave", () => bellSvg.style.transform = "scale(1.1) rotate(0deg)");
      }
      bellBtn.dataset.themedBell = "1";
    }
  }

  /* ----------------------------------------------------------
     RUN ALL
     ---------------------------------------------------------- */
  function runAll() {
    addDecorativeBg();
    replaceAppLogo();
    hidePublicLabel();
    colorizeSidebar();
    colorizeCards();
    colorizeShortcuts();
    reduceGaps();
    centerSearchBar();
    fixSidebarHover();
    colorizeNavbarControls();
  }

  // Execute styling as early as possible
  addDecorativeBg();
  replaceAppLogo();

  // Instant DOM Observer for Navbar Logo Swap
  const fastObserver = new MutationObserver(() => {
    replaceAppLogo();
  });
  fastObserver.observe(document.documentElement, { childList: true, subtree: true });

  // Page boot listeners
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runAll);
  } else {
    runAll();
  }

  // Re-run on Frappe SPA navigation events
  const pageObserver = new MutationObserver(() => {
    clearTimeout(window._themeTimer);
    window._themeTimer = setTimeout(runAll, 150);
  });
  pageObserver.observe(document.body || document.documentElement, { childList: true, subtree: true });

  if (typeof $ !== "undefined") {
    $(document).on("page-change", () => setTimeout(runAll, 200));
  }

})();

// Old Code before logo issue on load

// /* ============================================================
//    ERPNEXT PROFESSIONAL THEME v4 — JS
//    Fixes:
//    1. Hide "PUBLIC" label
//    2. Sidebar icons ALWAYS visible (not just on hover)
//    3. Reduce gaps between sections
//    4. Add decorative background mesh to desk page
//    5. Colorful emoji icons on cards, shortcuts, sidebar
//    6. Custom Elegant Gradient Navbar & Premium Controls Support
//    7. Custom Logo Replacement Support & Dynamic Redirect Link
//    8. Permanent CSS Fix for High-Visibility Avatar & Bell Controls
//    ============================================================ */
// (function () {
//   "use strict";

//   const MODULE_META = {
//     "Home":                     { emoji: "🏠", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
//     "Accounting":               { emoji: "💰", bg: "linear-gradient(135deg,#dcfce7,#bbf7d0)" },
//     "Accounts":                 { emoji: "💰", bg: "linear-gradient(135deg,#dcfce7,#bbf7d0)" },
//     "Stock":                    { emoji: "📦", bg: "linear-gradient(135deg,#ede9fe,#ddd6fe)" },
//     "Inventory":                { emoji: "📦", bg: "linear-gradient(135deg,#ede9fe,#ddd6fe)" },
//     "CRM":                      { emoji: "🤝", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
//     "Buying":                   { emoji: "🛒", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
//     "Purchase":                 { emoji: "🛒", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
//     "Selling":                  { emoji: "🏷️", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
//     "Sales":                    { emoji: "🏷️", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
//     "Manufacturing":            { emoji: "🏭", bg: "linear-gradient(135deg,#fee2e2,#fecaca)" },
//     "HR":                       { emoji: "👥", bg: "linear-gradient(135deg,#f3e8ff,#e9d5ff)" },
//     "Payroll":                  { emoji: "💵", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
//     "Human Resources":          { emoji: "👥", bg: "linear-gradient(135deg,#f3e8ff,#e9d5ff)" },
//     "Projects":                 { emoji: "📊", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
//     "Project":                  { emoji: "📊", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
//     "Quality":                  { emoji: "✅", bg: "linear-gradient(135deg,#fef9c3,#fde68a)" },
//     "Quality Management":       { emoji: "✅", bg: "linear-gradient(135deg,#fef9c3,#fde68a)" },
//     "Support":                  { emoji: "🎧", bg: "linear-gradient(135deg,#e0f2fe,#bae6fd)" },
//     "Assets":                   { emoji: "🏢", bg: "linear-gradient(135deg,#fef3c7,#fde68a)" },
//     "Asset":                    { emoji: "🏢", bg: "linear-gradient(135deg,#fef3c7,#fde68a)" },
//     "Data Import and Settings": { emoji: "⚙️", bg: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" },
//     "Data Import":              { emoji: "📥", bg: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" },
//     "Settings":                 { emoji: "⚙️", bg: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" },
//     "Loans":                    { emoji: "🏦", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
//     "Agriculture":              { emoji: "🌱", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
//     "Retail":                   { emoji: "🏪", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
//     "Healthcare":               { emoji: "❤️", bg: "linear-gradient(135deg,#fee2e2,#fecaca)" },
//     "Education":                { emoji: "🎓", bg: "linear-gradient(135deg,#e0f2fe,#bae6fd)" },
//     "Non Profit":               { emoji: "🤲", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
//     "Item":                     { emoji: "📦", bg: "linear-gradient(135deg,#ede9fe,#ddd6fe)" },
//     "Customer":                 { emoji: "👤", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
//     "Supplier":                 { emoji: "🚚", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
//     "Sales Invoice":            { emoji: "🧾", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
//     "Leaderboard":              { emoji: "🏆", bg: "linear-gradient(135deg,#fef9c3,#fde68a)" },
//     "Purchase Invoice":         { emoji: "📋", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
//     "Purchase Order":           { emoji: "📋", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
//   };

//   function getMeta(name) {
//     if (!name) return { emoji: "📋", bg: "linear-gradient(135deg,#e8f4f8,#c8e6f0)" };
//     const clean = name.trim();
//     if (MODULE_META[clean]) return MODULE_META[clean];
//     for (const key of Object.keys(MODULE_META)) {
//       if (clean.toLowerCase().includes(key.toLowerCase()) ||
//           key.toLowerCase().includes(clean.toLowerCase())) {
//         return MODULE_META[key];
//       }
//     }
//     return { emoji: "📋", bg: "linear-gradient(135deg,#e8f4f8,#c8e6f0)" };
//   }

//   /* ----------------------------------------------------------
//      1. HIDE "PUBLIC" label
//      ---------------------------------------------------------- */
//   function hidePublicLabel() {
//     document.querySelectorAll(
//       ".desk-sidebar .sidebar-section-head, " +
//       ".desk-sidebar .list-sidebar-label, " +
//       ".desk-sidebar .desk-sidebar-section > .sidebar-section-head"
//     ).forEach(el => {
//       el.style.display = "none";
//     });
//   }

//   /* ----------------------------------------------------------
//      2. COLORIZE + ALWAYS SHOW SIDEBAR ICONS
//      ---------------------------------------------------------- */
//   function colorizeSidebar() {
//     const sidebar = document.querySelector(".desk-sidebar");
//     if (!sidebar) return;

//     document.querySelectorAll(
//       ".desk-sidebar .sidebar-item-container, .desk-sidebar .desk-sidebar-item"
//     ).forEach(item => {
//       item.style.display = "flex";
//       item.style.alignItems = "center";
//       item.style.overflow = "hidden";
//       item.style.whiteSpace = "nowrap";

//       const labelEl = item.querySelector(".sidebar-item-label");
//       const iconWrap = item.querySelector(".sidebar-item-icon");

//       const name = labelEl ? labelEl.textContent.trim() : "";
//       const meta = getMeta(name);

//       if (iconWrap && !iconWrap.dataset.themed) {
//         iconWrap.style.cssText = `
//           background: ${meta.bg} !important;
//           border-radius: 10px !important;
//           width: 36px !important;
//           height: 36px !important;
//           min-width: 36px !important;
//           display: flex !important;
//           align-items: center !important;
//           justify-content: center !important;
//           font-size: 18px !important;
//           line-height: 1 !important;
//           flex-shrink: 0 !important;
//         `;
//         iconWrap.innerHTML = `<span style="font-size:18px;line-height:1;display:block;">${meta.emoji}</span>`;
//         iconWrap.dataset.themed = "1";
//       }
//     });
//   }

//   /* ----------------------------------------------------------
//      3. COLORIZE MODULE CARDS
//      ---------------------------------------------------------- */
//   function colorizeCards() {
//     document.querySelectorAll(".widget.links-widget-box").forEach(card => {
//       if (card.dataset.themed) return;
//       const titleEl = card.querySelector(".widget-title");
//       if (!titleEl) return;
//       const name = titleEl.textContent.trim();
//       const meta = getMeta(name);

//       const iconEl = card.querySelector(".widget-head .icon");
//       if (iconEl) {
//         iconEl.style.cssText = `
//           background: ${meta.bg} !important;
//           border-radius: 12px !important;
//           width: 42px !important;
//           height: 42px !important;
//           min-width: 42px !important;
//           display: flex !important;
//           align-items: center !important;
//           justify-content: center !important;
//           padding: 0 !important;
//           border: none !important;
//           flex-shrink: 0 !important;
//         `;
//         iconEl.innerHTML = `<span style="font-size:22px;line-height:1;display:block;">${meta.emoji}</span>`;
//       }

//       titleEl.style.fontSize = "14px";
//       titleEl.style.fontWeight = "700";
//       titleEl.style.color = "#1e293b";

//       card.dataset.themed = "1";
//     });
//   }

//   /* ----------------------------------------------------------
//      4. COLORIZE SHORTCUT PILLS
//      ---------------------------------------------------------- */
//   function colorizeShortcuts() {
//     document.querySelectorAll(".widget.shortcut-widget-box").forEach(card => {
//       if (card.dataset.themed) return;
//       const titleEl = card.querySelector(".widget-title");
//       if (!titleEl) return;
//       const name = titleEl.textContent.trim();
//       const meta = getMeta(name);

//       card.style.padding = "8px 14px";
//       card.style.minHeight = "unset";
//       card.style.display = "flex";
//       card.style.alignItems = "center";

//       const iconWrap = card.querySelector(".shortcut-widget-icon");
//       if (iconWrap) {
//         iconWrap.style.cssText = `
//           display: flex !important;
//           align-items: center !important;
//           justify-content: center !important;
//           width: 34px !important;
//           height: 34px !important;
//           min-width: 34px !important;
//           border-radius: 9px !important;
//           background: ${meta.bg} !important;
//           font-size: 18px !important;
//           line-height: 1 !important;
//           flex-shrink: 0 !important;
//         `;
//         iconWrap.innerHTML = `<span style="font-size:18px;line-height:1;display:block;">${meta.emoji}</span>`;
//       }

//       titleEl.style.fontSize = "13px";
//       titleEl.style.fontWeight = "600";
//       titleEl.style.color = "#1e293b";

//       const head = card.querySelector(".widget-head");
//       if (head) {
//         head.style.padding = "0";
//         head.style.borderBottom = "none";
//         head.style.marginBottom = "0";
//       }

//       card.dataset.themed = "1";
//     });
//   }

//   /* ----------------------------------------------------------
//      5. REDUCE GAPS between sections
//      ---------------------------------------------------------- */
//   function reduceGaps() {
//     document.querySelectorAll(".widget-group").forEach(g => {
//       g.style.marginBottom = "8px";
//     });
//     document.querySelectorAll(".widget-group .widgets-container").forEach(c => {
//       c.style.gap = "8px";
//     });
//     document.querySelectorAll(".row.widget-row").forEach(r => {
//       r.style.marginBottom = "8px";
//     });
//     document.querySelectorAll(".workspace-section-title, h3.workspace-section-title, .widget-group-title").forEach(h => {
//       h.style.marginBottom = "8px";
//       h.style.marginTop = "4px";
//       h.style.fontSize = "11px";
//       h.style.fontWeight = "700";
//       h.style.color = "#94a3b8";
//       h.style.textTransform = "uppercase";
//       h.style.letterSpacing = "0.08em";
//     });
//   }

//   /* ----------------------------------------------------------
//      6. ADD DECORATIVE BACKGROUND & COMPREHENSIVE CONTROL STYLES
//      ---------------------------------------------------------- */
//   function addDecorativeBg() {
//     if (document.getElementById("desk-bg-decor")) return;

//     const style = document.createElement("style");
//     style.id = "desk-bg-decor";
//     style.textContent = `
//       /* Subtle mesh gradient background for the whole app body */
//       .page-wrapper, .desk-body, body {
//         background:
//           radial-gradient(ellipse at 10% 20%, rgba(66,115,136,0.07) 0%, transparent 50%),
//           radial-gradient(ellipse at 90% 10%, rgba(45,95,116,0.06) 0%, transparent 50%),
//           radial-gradient(ellipse at 50% 90%, rgba(66,115,136,0.05) 0%, transparent 50%),
//           linear-gradient(160deg, #eef6fb 0%, #e8eef5 50%, #eff1f8 100%) !important;
//       }
      
//       /* ============================================================
//          ELEGANT GRADIENT BLUE NAVBAR (FROSTED GLASS EFFECT)
//          ============================================================ */
      
//       /* Override standard navbar variables globally */
//       :root, body[data-theme="light"], body[data-theme="dark"] {
//         --navbar-bg: linear-gradient(135deg, rgba(224, 239, 253, 0.9) 0%, rgba(240, 246, 255, 0.85) 100%) !important;
//       }

//       /* Elevate the header to a glassy gradient card */
//       header.navbar, 
//       .navbar, 
//       .navbar-expand,
//       [data-theme="light"] .navbar, 
//       [data-theme="dark"] .navbar {
//         background: linear-gradient(135deg, rgba(224, 239, 253, 0.95) 0%, rgba(240, 246, 255, 0.9) 100%) !important;
//         backdrop-filter: blur(12px) !important;
//         -webkit-backdrop-filter: blur(12px) !important;
//         border-bottom: 1px solid rgba(59, 130, 246, 0.2) !important;
//         box-shadow: 0 4px 20px rgba(59, 130, 246, 0.08) !important;
//       }
      
//       /* Keep navigation items sleek and elegant */
//       .navbar .nav-link,
//       .navbar .navbar-nav,
//       .navbar .help-link,
//       .navbar .dropdown-toggle,
//       .navbar .breadcrumb,
//       .navbar .breadcrumb-item,
//       .navbar .breadcrumb-item a,
//       .navbar .user-name {
//         color: #1e3a8a !important; /* Rich Dark Royal Blue */
//         font-weight: 600 !important;
//       }
      
//       /* Refined search bar layout and interactions */
//       .navbar .search-bar input, .navbar #navbar-search {
//         background-color: rgba(255, 255, 255, 0.95) !important;
//         border: 1px solid rgba(59, 130, 246, 0.25) !important;
//         color: #1e3a8a !important;
//         border-radius: 20px !important;
//         padding-left: 36px !important;
//         font-weight: 500 !important;
//         transition: all 0.3s ease !important;
//         box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03) !important;
//       }
//       .navbar .search-bar input:focus, .navbar #navbar-search:focus {
//         border-color: #3b82f6 !important;
//         box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
//       }
//       .navbar .search-bar input::placeholder {
//         color: #60a5fa !important;
//       }

//       /* ============================================================
//          CRITICAL HIGH-VISIBILITY AVATAR & BELL FIXES (STYLING VIA CSS)
//          ============================================================ */
      
//       /* Force the avatar frame to render a deep premium gradient */
//       .navbar .avatar-frame,
//       .navbar .avatar,
//       .navbar .user-avatar,
//       .navbar .avatar-small {
//         background: linear-gradient(135deg, #95cbe6 0%, #3b82f6 100%) !important; /* Rich Royal Blue Gradient */
//         border: 2px solid #ffffff !important;
//         box-shadow: 0 3px 10px rgba(30, 58, 138, 0.25) !important;
//         display: flex !important;
//         align-items: center !important;
//         justify-content: center !important;
//         border-radius: 50% !important;
//         transition: transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
//         cursor: pointer !important;
//       }

//       /* Elevate the icon slightly on hover */
//       .navbar .avatar-frame:hover,
//       .navbar .avatar:hover,
//       .navbar .user-avatar:hover {
//         transform: translateY(-3px) scale(1.08) !important;
//         box-shadow: 0 6px 15px rgba(30, 58, 138, 0.35) !important;
//       }

//       /* Force the inner letter ("A", etc.) to render crisp, bold white with deep contrast shadow */
//       .navbar .avatar-frame .avatar-text,
//       .navbar .avatar-frame span,
//       .navbar .avatar-frame div,
//       .navbar .avatar .avatar-text {
//         color: #ffffff !important;
//         font-weight: 800 !important;
//         font-size: 13px !important;
//         text-transform: uppercase !important;
//         text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
//         display: flex !important;
//         align-items: center !important;
//         justify-content: center !important;
//       }

//       /* ============================================================
//          WORK AREA WINDOW WRAPPER
//          ============================================================ */
//       .layout-main-section-wrapper > .layout-main-section {
//         background: rgba(255,255,255,0.65) !important;
//         backdrop-filter: blur(8px) !important;
//         -webkit-backdrop-filter: blur(8px) !important;
//         border-radius: 16px !important;
//         border: 1px solid rgba(255,255,255,0.8) !important;
//         box-shadow: 0 4px 24px rgba(66,115,136,0.08) !important;
//         padding: 16px !important;
//         margin: 8px !important;
//       }

//       /* Shortcut section label */
//       .shortcuts-header, .your-shortcuts-header {
//         font-size: 11px !important;
//         font-weight: 700 !important;
//         color: #94a3b8 !important;
//         text-transform: uppercase !important;
//         letter-spacing: 0.08em !important;
//         margin-bottom: 6px !important;
//       }
//     `;
//     document.head.appendChild(style);
//   }

//   /* ----------------------------------------------------------
//      7. CENTER SEARCH BAR & COLORIZE SEARCH ICON
//      ---------------------------------------------------------- */
//   function centerSearchBar() {
//     const searchBar = document.querySelector(".navbar .search-bar, .navbar #navbar-search, .navbar .navbar-search");
//     if (!searchBar) return;
//     const container = document.querySelector(".navbar .container, .navbar > .container-fluid");
//     if (container) container.style.position = "relative";
    
//     searchBar.style.position = "absolute";
//     searchBar.style.left = "50%";
//     searchBar.style.transform = "translateX(-50%)";
//     searchBar.style.width = "420px";
//     searchBar.style.maxWidth = "420px";
//     searchBar.style.zIndex = "10";

//     // Style and Colorize the Search Icon Inside Input
//     const searchIcon = searchBar.querySelector(".search-icon, .icon-search, svg, use");
//     if (searchIcon) {
//       searchIcon.style.color = "#3b82f6";
//       searchIcon.style.fill = "#3b82f6";
//     }
//   }

//   /* ----------------------------------------------------------
//      8. SIDEBAR HOVER
//      ---------------------------------------------------------- */
//   function fixSidebarHover() {
//     const sidebar = document.querySelector(".desk-sidebar");
//     if (!sidebar || sidebar.dataset.hoverBound) return;

//     sidebar.style.width = "58px";
//     sidebar.style.minWidth = "58px";
//     sidebar.style.overflow = "hidden";
//     sidebar.style.transition = "width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1)";

//     sidebar.addEventListener("mouseenter", () => {
//       sidebar.style.width = "224px";
//       sidebar.style.minWidth = "224px";
//     });
//     sidebar.addEventListener("mouseleave", () => {
//       sidebar.style.width = "58px";
//       sidebar.style.minWidth = "58px";
//     });

//     sidebar.dataset.hoverBound = "1";
//   }

//   /* ----------------------------------------------------------
//      9. CUSTOM LOGO SWAP WITH DYNAMIC DOMAIN REDIRECT
//      ---------------------------------------------------------- */
//   function replaceAppLogo() {
//     const brand = document.querySelector(".navbar-brand, .navbar .navbar-brand");
//     if (brand && !brand.dataset.customLogo) {
//       // Dynamically generate current domain (e.g., https://your-domain.com) + target subpage
//       const dynamicRoute = window.location.origin + "/app/module-page";
//       brand.setAttribute("href", dynamicRoute);

//       brand.innerHTML = `
//         <img src="/assets/micron_theme/images/spark_logo.png" 
//              style="height: 28px; width: auto; object-fit: contain; display: block;" 
//              alt="Logo">
//       `;
//       brand.dataset.customLogo = "1";
//     }
//   }

//   /* ----------------------------------------------------------
//      10. DYNAMIC COLORIZE NAV BAR CONTROLS (BELL & TRANSITIONS)
//      ---------------------------------------------------------- */
//   function colorizeNavbarControls() {
//     // Notification Bell Makeover
//     const bellBtn = document.querySelector(".navbar .notifications-icon, .navbar .nav-link-notifications, .navbar #navbar-notifications");
//     if (bellBtn && !bellBtn.dataset.themedBell) {
//       bellBtn.style.position = "relative";
//       const bellSvg = bellBtn.querySelector("svg");
//       if (bellSvg) {
//         bellSvg.style.cssText = `
//           color: #f59e0b !important; /* Glow gold/amber */
//           fill: #f59e0b !important;
//           stroke: none !important;
//           transform: scale(1.1);
//           transition: transform 0.2s ease;
//           cursor: pointer;
//         `;
//         bellBtn.addEventListener("mouseenter", () => bellSvg.style.transform = "scale(1.2) rotate(10deg)");
//         bellBtn.addEventListener("mouseleave", () => bellSvg.style.transform = "scale(1.1) rotate(0deg)");
//       }
//       bellBtn.dataset.themedBell = "1";
//     }
//   }

//   /* ----------------------------------------------------------
//      RUN ALL
//      ---------------------------------------------------------- */
//   function runAll() {
//     hidePublicLabel();
//     colorizeSidebar();
//     colorizeCards();
//     colorizeShortcuts();
//     reduceGaps();
//     addDecorativeBg(); // Injects the highly-visible avatar styles
//     centerSearchBar();
//     fixSidebarHover();
//     replaceAppLogo(); 
//     colorizeNavbarControls();
//   }

//   // Boot
//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", () => setTimeout(runAll, 400));
//   } else {
//     setTimeout(runAll, 400);
//   }

//   // Re-run on Frappe SPA navigation
//   const observer = new MutationObserver(() => {
//     clearTimeout(window._themeTimer);
//     window._themeTimer = setTimeout(runAll, 280);
//   });
//   observer.observe(document.body, { childList: true, subtree: true });

//   if (typeof $ !== "undefined") {
//     $(document).on("page-change", () => setTimeout(runAll, 400));
//   }

// })();

// /* ============================================================
//    ERPNEXT PROFESSIONAL THEME v4 — JS
//    Fixes:
//    1. Hide "PUBLIC" label
//    2. Sidebar icons ALWAYS visible (not just on hover)
//    3. Reduce gaps between sections
//    4. Add decorative background mesh to desk page
//    5. Colorful emoji icons on cards, shortcuts, sidebar
//    6. Custom Elegant Gradient Navbar & Premium Controls Support
//    7. Custom Logo Replacement Support
//    8. Permanent CSS Fix for High-Visibility Avatar & Bell Controls
//    ============================================================ */
// (function () {
//   "use strict";

//   const MODULE_META = {
//     "Home":                     { emoji: "🏠", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
//     "Accounting":               { emoji: "💰", bg: "linear-gradient(135deg,#dcfce7,#bbf7d0)" },
//     "Accounts":                 { emoji: "💰", bg: "linear-gradient(135deg,#dcfce7,#bbf7d0)" },
//     "Stock":                    { emoji: "📦", bg: "linear-gradient(135deg,#ede9fe,#ddd6fe)" },
//     "Inventory":                { emoji: "📦", bg: "linear-gradient(135deg,#ede9fe,#ddd6fe)" },
//     "CRM":                      { emoji: "🤝", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
//     "Buying":                   { emoji: "🛒", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
//     "Purchase":                 { emoji: "🛒", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
//     "Selling":                  { emoji: "🏷️", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
//     "Sales":                    { emoji: "🏷️", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
//     "Manufacturing":            { emoji: "🏭", bg: "linear-gradient(135deg,#fee2e2,#fecaca)" },
//     "HR":                       { emoji: "👥", bg: "linear-gradient(135deg,#f3e8ff,#e9d5ff)" },
//     "Payroll":                  { emoji: "💵", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
//     "Human Resources":          { emoji: "👥", bg: "linear-gradient(135deg,#f3e8ff,#e9d5ff)" },
//     "Projects":                 { emoji: "📊", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
//     "Project":                  { emoji: "📊", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
//     "Quality":                  { emoji: "✅", bg: "linear-gradient(135deg,#fef9c3,#fde68a)" },
//     "Quality Management":       { emoji: "✅", bg: "linear-gradient(135deg,#fef9c3,#fde68a)" },
//     "Support":                  { emoji: "🎧", bg: "linear-gradient(135deg,#e0f2fe,#bae6fd)" },
//     "Assets":                   { emoji: "🏢", bg: "linear-gradient(135deg,#fef3c7,#fde68a)" },
//     "Asset":                    { emoji: "🏢", bg: "linear-gradient(135deg,#fef3c7,#fde68a)" },
//     "Data Import and Settings": { emoji: "⚙️", bg: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" },
//     "Data Import":              { emoji: "📥", bg: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" },
//     "Settings":                 { emoji: "⚙️", bg: "linear-gradient(135deg,#f1f5f9,#e2e8f0)" },
//     "Loans":                    { emoji: "🏦", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
//     "Agriculture":              { emoji: "🌱", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
//     "Retail":                   { emoji: "🏪", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
//     "Healthcare":               { emoji: "❤️", bg: "linear-gradient(135deg,#fee2e2,#fecaca)" },
//     "Education":                { emoji: "🎓", bg: "linear-gradient(135deg,#e0f2fe,#bae6fd)" },
//     "Non Profit":               { emoji: "🤲", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
//     "Item":                     { emoji: "📦", bg: "linear-gradient(135deg,#ede9fe,#ddd6fe)" },
//     "Customer":                 { emoji: "👤", bg: "linear-gradient(135deg,#dbeafe,#bfdbfe)" },
//     "Supplier":                 { emoji: "🚚", bg: "linear-gradient(135deg,#d1fae5,#a7f3d0)" },
//     "Sales Invoice":            { emoji: "🧾", bg: "linear-gradient(135deg,#fce7f3,#fbcfe8)" },
//     "Leaderboard":              { emoji: "🏆", bg: "linear-gradient(135deg,#fef9c3,#fde68a)" },
//     "Purchase Invoice":         { emoji: "📋", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
//     "Purchase Order":           { emoji: "📋", bg: "linear-gradient(135deg,#ffedd5,#fed7aa)" },
//   };

//   function getMeta(name) {
//     if (!name) return { emoji: "📋", bg: "linear-gradient(135deg,#e8f4f8,#c8e6f0)" };
//     const clean = name.trim();
//     if (MODULE_META[clean]) return MODULE_META[clean];
//     for (const key of Object.keys(MODULE_META)) {
//       if (clean.toLowerCase().includes(key.toLowerCase()) ||
//           key.toLowerCase().includes(clean.toLowerCase())) {
//         return MODULE_META[key];
//       }
//     }
//     return { emoji: "📋", bg: "linear-gradient(135deg,#e8f4f8,#c8e6f0)" };
//   }

//   /* ----------------------------------------------------------
//      1. HIDE "PUBLIC" label
//      ---------------------------------------------------------- */
//   function hidePublicLabel() {
//     document.querySelectorAll(
//       ".desk-sidebar .sidebar-section-head, " +
//       ".desk-sidebar .list-sidebar-label, " +
//       ".desk-sidebar .desk-sidebar-section > .sidebar-section-head"
//     ).forEach(el => {
//       el.style.display = "none";
//     });
//   }

//   /* ----------------------------------------------------------
//      2. COLORIZE + ALWAYS SHOW SIDEBAR ICONS
//      ---------------------------------------------------------- */
//   function colorizeSidebar() {
//     const sidebar = document.querySelector(".desk-sidebar");
//     if (!sidebar) return;

//     document.querySelectorAll(
//       ".desk-sidebar .sidebar-item-container, .desk-sidebar .desk-sidebar-item"
//     ).forEach(item => {
//       item.style.display = "flex";
//       item.style.alignItems = "center";
//       item.style.overflow = "hidden";
//       item.style.whiteSpace = "nowrap";

//       const labelEl = item.querySelector(".sidebar-item-label");
//       const iconWrap = item.querySelector(".sidebar-item-icon");

//       const name = labelEl ? labelEl.textContent.trim() : "";
//       const meta = getMeta(name);

//       if (iconWrap && !iconWrap.dataset.themed) {
//         iconWrap.style.cssText = `
//           background: ${meta.bg} !important;
//           border-radius: 10px !important;
//           width: 36px !important;
//           height: 36px !important;
//           min-width: 36px !important;
//           display: flex !important;
//           align-items: center !important;
//           justify-content: center !important;
//           font-size: 18px !important;
//           line-height: 1 !important;
//           flex-shrink: 0 !important;
//         `;
//         iconWrap.innerHTML = `<span style="font-size:18px;line-height:1;display:block;">${meta.emoji}</span>`;
//         iconWrap.dataset.themed = "1";
//       }
//     });
//   }

//   /* ----------------------------------------------------------
//      3. COLORIZE MODULE CARDS
//      ---------------------------------------------------------- */
//   function colorizeCards() {
//     document.querySelectorAll(".widget.links-widget-box").forEach(card => {
//       if (card.dataset.themed) return;
//       const titleEl = card.querySelector(".widget-title");
//       if (!titleEl) return;
//       const name = titleEl.textContent.trim();
//       const meta = getMeta(name);

//       const iconEl = card.querySelector(".widget-head .icon");
//       if (iconEl) {
//         iconEl.style.cssText = `
//           background: ${meta.bg} !important;
//           border-radius: 12px !important;
//           width: 42px !important;
//           height: 42px !important;
//           min-width: 42px !important;
//           display: flex !important;
//           align-items: center !important;
//           justify-content: center !important;
//           padding: 0 !important;
//           border: none !important;
//           flex-shrink: 0 !important;
//         `;
//         iconEl.innerHTML = `<span style="font-size:22px;line-height:1;display:block;">${meta.emoji}</span>`;
//       }

//       titleEl.style.fontSize = "14px";
//       titleEl.style.fontWeight = "700";
//       titleEl.style.color = "#1e293b";

//       card.dataset.themed = "1";
//     });
//   }

//   /* ----------------------------------------------------------
//      4. COLORIZE SHORTCUT PILLS
//      ---------------------------------------------------------- */
//   function colorizeShortcuts() {
//     document.querySelectorAll(".widget.shortcut-widget-box").forEach(card => {
//       if (card.dataset.themed) return;
//       const titleEl = card.querySelector(".widget-title");
//       if (!titleEl) return;
//       const name = titleEl.textContent.trim();
//       const meta = getMeta(name);

//       card.style.padding = "8px 14px";
//       card.style.minHeight = "unset";
//       card.style.display = "flex";
//       card.style.alignItems = "center";

//       const iconWrap = card.querySelector(".shortcut-widget-icon");
//       if (iconWrap) {
//         iconWrap.style.cssText = `
//           display: flex !important;
//           align-items: center !important;
//           justify-content: center !important;
//           width: 34px !important;
//           height: 34px !important;
//           min-width: 34px !important;
//           border-radius: 9px !important;
//           background: ${meta.bg} !important;
//           font-size: 18px !important;
//           line-height: 1 !important;
//           flex-shrink: 0 !important;
//         `;
//         iconWrap.innerHTML = `<span style="font-size:18px;line-height:1;display:block;">${meta.emoji}</span>`;
//       }

//       titleEl.style.fontSize = "13px";
//       titleEl.style.fontWeight = "600";
//       titleEl.style.color = "#1e293b";

//       const head = card.querySelector(".widget-head");
//       if (head) {
//         head.style.padding = "0";
//         head.style.borderBottom = "none";
//         head.style.marginBottom = "0";
//       }

//       card.dataset.themed = "1";
//     });
//   }

//   /* ----------------------------------------------------------
//      5. REDUCE GAPS between sections
//      ---------------------------------------------------------- */
//   function reduceGaps() {
//     document.querySelectorAll(".widget-group").forEach(g => {
//       g.style.marginBottom = "8px";
//     });
//     document.querySelectorAll(".widget-group .widgets-container").forEach(c => {
//       c.style.gap = "8px";
//     });
//     document.querySelectorAll(".row.widget-row").forEach(r => {
//       r.style.marginBottom = "8px";
//     });
//     document.querySelectorAll(".workspace-section-title, h3.workspace-section-title, .widget-group-title").forEach(h => {
//       h.style.marginBottom = "8px";
//       h.style.marginTop = "4px";
//       h.style.fontSize = "11px";
//       h.style.fontWeight = "700";
//       h.style.color = "#94a3b8";
//       h.style.textTransform = "uppercase";
//       h.style.letterSpacing = "0.08em";
//     });
//   }

//   /* ----------------------------------------------------------
//      6. ADD DECORATIVE BACKGROUND & COMPREHENSIVE CONTROL STYLES
//      ---------------------------------------------------------- */
//   function addDecorativeBg() {
//     if (document.getElementById("desk-bg-decor")) return;

//     const style = document.createElement("style");
//     style.id = "desk-bg-decor";
//     style.textContent = `
//       /* Subtle mesh gradient background for the whole app body */
//       .page-wrapper, .desk-body, body {
//         background:
//           radial-gradient(ellipse at 10% 20%, rgba(66,115,136,0.07) 0%, transparent 50%),
//           radial-gradient(ellipse at 90% 10%, rgba(45,95,116,0.06) 0%, transparent 50%),
//           radial-gradient(ellipse at 50% 90%, rgba(66,115,136,0.05) 0%, transparent 50%),
//           linear-gradient(160deg, #eef6fb 0%, #e8eef5 50%, #eff1f8 100%) !important;
//       }
      
//       /* ============================================================
//          ELEGANT GRADIENT BLUE NAVBAR (FROSTED GLASS EFFECT)
//          ============================================================ */
      
//       /* Override standard navbar variables globally */
//       :root, body[data-theme="light"], body[data-theme="dark"] {
//         --navbar-bg: linear-gradient(135deg, rgba(224, 239, 253, 0.9) 0%, rgba(240, 246, 255, 0.85) 100%) !important;
//       }

//       /* Elevate the header to a glassy gradient card */
//       header.navbar, 
//       .navbar, 
//       .navbar-expand,
//       [data-theme="light"] .navbar, 
//       [data-theme="dark"] .navbar {
//         background: linear-gradient(135deg, rgba(224, 239, 253, 0.95) 0%, rgba(240, 246, 255, 0.9) 100%) !important;
//         backdrop-filter: blur(12px) !important;
//         -webkit-backdrop-filter: blur(12px) !important;
//         border-bottom: 1px solid rgba(59, 130, 246, 0.2) !important;
//         box-shadow: 0 4px 20px rgba(59, 130, 246, 0.08) !important;
//       }
      
//       /* Keep navigation items sleek and elegant */
//       .navbar .nav-link,
//       .navbar .navbar-nav,
//       .navbar .help-link,
//       .navbar .dropdown-toggle,
//       .navbar .breadcrumb,
//       .navbar .breadcrumb-item,
//       .navbar .breadcrumb-item a,
//       .navbar .user-name {
//         color: #1e3a8a !important; /* Rich Dark Royal Blue */
//         font-weight: 600 !important;
//       }
      
//       /* Refined search bar layout and interactions */
//       .navbar .search-bar input, .navbar #navbar-search {
//         background-color: rgba(255, 255, 255, 0.95) !important;
//         border: 1px solid rgba(59, 130, 246, 0.25) !important;
//         color: #1e3a8a !important;
//         border-radius: 20px !important;
//         padding-left: 36px !important;
//         font-weight: 500 !important;
//         transition: all 0.3s ease !important;
//         box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03) !important;
//       }
//       .navbar .search-bar input:focus, .navbar #navbar-search:focus {
//         border-color: #3b82f6 !important;
//         box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15) !important;
//       }
//       .navbar .search-bar input::placeholder {
//         color: #60a5fa !important;
//       }

//       /* ============================================================
//          CRITICAL HIGH-VISIBILITY AVATAR & BELL FIXES (STYLING VIA CSS)
//          ============================================================ */
      
//       /* Force the avatar frame to render a deep premium gradient */
//       .navbar .avatar-frame,
//       .navbar .avatar,
//       .navbar .user-avatar,
//       .navbar .avatar-small {
//         background: linear-gradient(135deg, #95cbe6 0%, #3b82f6 100%) !important; /* Rich Royal Blue Gradient */
//         border: 2px solid #ffffff !important;
//         box-shadow: 0 3px 10px rgba(30, 58, 138, 0.25) !important;
//         display: flex !important;
//         align-items: center !important;
//         justify-content: center !important;
//         border-radius: 50% !important;
//         transition: transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
//         cursor: pointer !important;
//       }

//       /* Elevate the icon slightly on hover */
//       .navbar .avatar-frame:hover,
//       .navbar .avatar:hover,
//       .navbar .user-avatar:hover {
//         transform: translateY(-3px) scale(1.08) !important;
//         box-shadow: 0 6px 15px rgba(30, 58, 138, 0.35) !important;
//       }

//       /* Force the inner letter ("A", etc.) to render crisp, bold white with deep contrast shadow */
//       .navbar .avatar-frame .avatar-text,
//       .navbar .avatar-frame span,
//       .navbar .avatar-frame div,
//       .navbar .avatar .avatar-text {
//         color: #ffffff !important;
//         font-weight: 800 !important;
//         font-size: 13px !important;
//         text-transform: uppercase !important;
//         text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
//         display: flex !important;
//         align-items: center !important;
//         justify-content: center !important;
//       }

//       /* ============================================================
//          WORK AREA WINDOW WRAPPER
//          ============================================================ */
//       .layout-main-section-wrapper > .layout-main-section {
//         background: rgba(255,255,255,0.65) !important;
//         backdrop-filter: blur(8px) !important;
//         -webkit-backdrop-filter: blur(8px) !important;
//         border-radius: 16px !important;
//         border: 1px solid rgba(255,255,255,0.8) !important;
//         box-shadow: 0 4px 24px rgba(66,115,136,0.08) !important;
//         padding: 16px !important;
//         margin: 8px !important;
//       }

//       /* Shortcut section label */
//       .shortcuts-header, .your-shortcuts-header {
//         font-size: 11px !important;
//         font-weight: 700 !important;
//         color: #94a3b8 !important;
//         text-transform: uppercase !important;
//         letter-spacing: 0.08em !important;
//         margin-bottom: 6px !important;
//       }
//     `;
//     document.head.appendChild(style);
//   }

//   /* ----------------------------------------------------------
//      7. CENTER SEARCH BAR & COLORIZE SEARCH ICON
//      ---------------------------------------------------------- */
//   function centerSearchBar() {
//     const searchBar = document.querySelector(".navbar .search-bar, .navbar #navbar-search, .navbar .navbar-search");
//     if (!searchBar) return;
//     const container = document.querySelector(".navbar .container, .navbar > .container-fluid");
//     if (container) container.style.position = "relative";
    
//     searchBar.style.position = "absolute";
//     searchBar.style.left = "50%";
//     searchBar.style.transform = "translateX(-50%)";
//     searchBar.style.width = "420px";
//     searchBar.style.maxWidth = "420px";
//     searchBar.style.zIndex = "10";

//     // Style and Colorize the Search Icon Inside Input
//     const searchIcon = searchBar.querySelector(".search-icon, .icon-search, svg, use");
//     if (searchIcon) {
//       searchIcon.style.color = "#3b82f6";
//       searchIcon.style.fill = "#3b82f6";
//     }
//   }

//   /* ----------------------------------------------------------
//      8. SIDEBAR HOVER
//      ---------------------------------------------------------- */
//   function fixSidebarHover() {
//     const sidebar = document.querySelector(".desk-sidebar");
//     if (!sidebar || sidebar.dataset.hoverBound) return;

//     sidebar.style.width = "58px";
//     sidebar.style.minWidth = "58px";
//     sidebar.style.overflow = "hidden";
//     sidebar.style.transition = "width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1)";

//     sidebar.addEventListener("mouseenter", () => {
//       sidebar.style.width = "224px";
//       sidebar.style.minWidth = "224px";
//     });
//     sidebar.addEventListener("mouseleave", () => {
//       sidebar.style.width = "58px";
//       sidebar.style.minWidth = "58px";
//     });

//     sidebar.dataset.hoverBound = "1";
//   }

//   /* ----------------------------------------------------------
//      9. CUSTOM LOGO SWAP
//      ---------------------------------------------------------- */
//   function replaceAppLogo() {
//     const brand = document.querySelector(".navbar-brand, .navbar .navbar-brand");
//     if (brand && !brand.dataset.customLogo) {
//       brand.innerHTML = `
//         <img src="/assets/micron_theme/images/spark_logo.png" 
//              style="height: 28px; width: auto; object-fit: contain; display: block;" 
//              alt="Logo">
//       `;
//       brand.dataset.customLogo = "1";
//     }
//   }

//   /* ----------------------------------------------------------
//      10. DYNAMIC COLORIZE NAV BAR CONTROLS (BELL & TRANSITIONS)
//      ---------------------------------------------------------- */
//   function colorizeNavbarControls() {
//     // Notification Bell Makeover
//     const bellBtn = document.querySelector(".navbar .notifications-icon, .navbar .nav-link-notifications, .navbar #navbar-notifications");
//     if (bellBtn && !bellBtn.dataset.themedBell) {
//       bellBtn.style.position = "relative";
//       const bellSvg = bellBtn.querySelector("svg");
//       if (bellSvg) {
//         bellSvg.style.cssText = `
//           color: #f59e0b !important; /* Glow gold/amber */
//           fill: #f59e0b !important;
//           stroke: none !important;
//           transform: scale(1.1);
//           transition: transform 0.2s ease;
//           cursor: pointer;
//         `;
//         bellBtn.addEventListener("mouseenter", () => bellSvg.style.transform = "scale(1.2) rotate(10deg)");
//         bellBtn.addEventListener("mouseleave", () => bellSvg.style.transform = "scale(1.1) rotate(0deg)");
//       }
//       bellBtn.dataset.themedBell = "1";
//     }
//   }

//   /* ----------------------------------------------------------
//      RUN ALL
//      ---------------------------------------------------------- */
//   function runAll() {
//     hidePublicLabel();
//     colorizeSidebar();
//     colorizeCards();
//     colorizeShortcuts();
//     reduceGaps();
//     addDecorativeBg(); // Injects the highly-visible avatar styles
//     centerSearchBar();
//     fixSidebarHover();
//     replaceAppLogo(); 
//     colorizeNavbarControls();
//   }

//   // Boot
//   if (document.readyState === "loading") {
//     document.addEventListener("DOMContentLoaded", () => setTimeout(runAll, 400));
//   } else {
//     setTimeout(runAll, 400);
//   }

//   // Re-run on Frappe SPA navigation
//   const observer = new MutationObserver(() => {
//     clearTimeout(window._themeTimer);
//     window._themeTimer = setTimeout(runAll, 280);
//   });
//   observer.observe(document.body, { childList: true, subtree: true });

//   if (typeof $ !== "undefined") {
//     $(document).on("page-change", () => setTimeout(runAll, 400));
//   }

// })();