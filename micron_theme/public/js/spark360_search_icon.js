/* ============================================================
   Spark360 — colourful navbar search icon
   Self-contained. Add to hooks.py:
     app_include_js = ["/assets/<your_app>/js/spark360_search_icon.js"]

   Why replace the icon instead of just recolouring it?
   Frappe's navbar icons are <use> references into a sprite sheet, and the
   theme's ".navbar .icon { fill/stroke: ... !important }" rule wins over
   anything we set on them. A gradient also cannot be applied to a sprite
   symbol from outside. So we drop in our own inline SVG that carries its
   own <linearGradient>, with the stroke set as a presentation attribute on
   the paths - those are children, so the theme rule never touches them.
   ============================================================ */
(function () {
	"use strict";

	const ICON_HTML = `
		<svg class="spark-search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="spark-search-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stop-color="#6fa8f5"/>
					<stop offset="55%" stop-color="#3b6fe0"/>
					<stop offset="100%" stop-color="#6c5dd3"/>
				</linearGradient>
			</defs>
			<circle cx="11" cy="11" r="6.4"
				stroke="url(#spark-search-grad)" stroke-width="2"/>
			<path d="M16.2 16.2L21 21"
				stroke="url(#spark-search-grad)" stroke-width="2" stroke-linecap="round"/>
			<path d="M18.4 3.2l.62 1.98 1.98.62-1.98.62-.62 1.98-.62-1.98L15.8 5.8l1.98-.62.62-1.98z"
				fill="#f2a922"/>
		</svg>
	`;

	function paintSearchIcon() {
		// Frappe renders the magnifier as an <svg class="icon"> right before
		// the #navbar-search input, inside .search-bar.
		const holders = document.querySelectorAll(
			".navbar .search-bar svg.icon, .navbar .search-bar .search-icon, #navbar-search-icon"
		);

		holders.forEach((el) => {
			if (el.classList.contains("spark-search-icon")) return;
			if (el.dataset.sparkDone) return;

			const holder = document.createElement("span");
			holder.className = "spark-search-icon-wrap";
			holder.innerHTML = ICON_HTML;
			holder.dataset.sparkDone = "1";

			el.replaceWith(holder);
		});
	}

	function boot() {
		paintSearchIcon();
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", () => setTimeout(boot, 300));
	} else {
		setTimeout(boot, 300);
	}

	// The navbar is re-rendered on some route changes; keep watching, but
	// cheaply - paintSearchIcon() bails out immediately once it has run.
	const observer = new MutationObserver(() => {
		clearTimeout(window._sparkSearchTimer);
		window._sparkSearchTimer = setTimeout(paintSearchIcon, 250);
	});
	observer.observe(document.body, { childList: true, subtree: true });

	if (typeof $ !== "undefined") {
		$(document).on("page-change", () => setTimeout(paintSearchIcon, 300));
	}
})();