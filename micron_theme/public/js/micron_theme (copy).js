/* ============================================================
   ERPNEXT PROFESSIONAL THEME v4 — JS
   Fixes:
   1. Hide "PUBLIC" label
   2. Sidebar icons ALWAYS visible (not just on hover)
   3. Reduce gaps between sections
   4. Add decorative background mesh to desk page
   5. Colorful emoji icons on cards, shortcuts, sidebar
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
     Key insight: the icon must always be visible.
     We style the item row so the icon is centered when sidebar
     is narrow (58px), and label shows when expanded.
     ---------------------------------------------------------- */
  function colorizeSidebar() {
    const sidebar = document.querySelector(".desk-sidebar");
    if (!sidebar) return;

    document.querySelectorAll(
      ".desk-sidebar .sidebar-item-container, .desk-sidebar .desk-sidebar-item"
    ).forEach(item => {
      // Always ensure the row uses flex and is centered
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
    // Reduce spacing above/below widget groups
    document.querySelectorAll(".widget-group").forEach(g => {
      g.style.marginBottom = "8px";
    });
    document.querySelectorAll(".widget-group .widgets-container").forEach(c => {
      c.style.gap = "8px";
    });
    // Reduce grid row gaps
    document.querySelectorAll(".row.widget-row").forEach(r => {
      r.style.marginBottom = "8px";
    });
    // Section heading spacing
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
     6. ADD DECORATIVE BACKGROUND to desk content area
     Injects subtle floating circles behind the content
     ---------------------------------------------------------- */
  function addDecorativeBg() {
    if (document.getElementById("desk-bg-decor")) return;

    const style = document.createElement("style");
    style.id = "desk-bg-decor";
    style.textContent = `
      /* Subtle mesh gradient background for the whole app body */
      .page-wrapper, .desk-body, body {
        background:
          radial-gradient(ellipse at 10% 20%, rgba(66,115,136,0.07) 0%, transparent 50%),
          radial-gradient(ellipse at 90% 10%, rgba(45,95,116,0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 90%, rgba(66,115,136,0.05) 0%, transparent 50%),
          linear-gradient(160deg, #eef6fb 0%, #e8eef5 50%, #eff1f8 100%) !important;
      }
      /* Give the main workspace area a glassy card feel */
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
      /* Shortcut section label */
      .shortcuts-header, .your-shortcuts-header {
        font-size: 11px !important;
        font-weight: 700 !important;
        color: #94a3b8 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.08em !important;
        margin-bottom: 6px !important;
      }
    `;
    document.head.appendChild(style);
  }

  /* ----------------------------------------------------------
     7. CENTER SEARCH BAR
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
  }

  /* ----------------------------------------------------------
     8. SIDEBAR HOVER
     ---------------------------------------------------------- */
  function fixSidebarHover() {
    const sidebar = document.querySelector(".desk-sidebar");
    if (!sidebar || sidebar.dataset.hoverBound) return;

    // Start collapsed — 58px shows the 36px icon centered with 11px padding each side
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
     RUN ALL
     ---------------------------------------------------------- */
  function runAll() {
    hidePublicLabel();
    colorizeSidebar();
    colorizeCards();
    colorizeShortcuts();
    reduceGaps();
    addDecorativeBg();
    centerSearchBar();
    fixSidebarHover();
  }

  // Boot
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(runAll, 400));
  } else {
    setTimeout(runAll, 400);
  }

  // Re-run on Frappe SPA navigation
  const observer = new MutationObserver(() => {
    clearTimeout(window._themeTimer);
    window._themeTimer = setTimeout(runAll, 280);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  if (typeof $ !== "undefined") {
    $(document).on("page-change", () => setTimeout(runAll, 400));
  }

})();
