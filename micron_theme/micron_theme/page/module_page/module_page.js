frappe.pages['module-page'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: '',
		single_column: true,
	});

	frappe.spark360_module_page = new Spark360ModulePage(page);
};

class Spark360ModulePage {
	constructor(page) {
		this.page = page;
		this.$wrapper = $(page.body);

		// hide the default page head bar (title/breadcrumbs) so the
		// gradient hero sits flush under the desk navbar, like the login screen
		$(this.page.wrapper).find('.page-head').hide();
		$(this.page.wrapper).find('.container').css({ 'max-width': 'none', padding: 0 });

		// only the hover-arrow stays as a line icon; module glyphs are emoji (see below)
		this.icons = {
			arrow: '<path d="M7 17L17 7M7 7h10v10"/>',
		};

		// -----------------------------------------------------------------
		// IMPORTANT: `route` below is what gets passed to frappe.set_route().
		// Open each module once in your Desk, check the URL after /app/...,
		// and update these values to match your site's real workspace routes.
		//
		// `emoji` is the colorful glyph shown on the tile. `tile` is a soft
		// pastel background for the tile, and `tone` is the vivid color used
		// for the hover glow/border.
		// -----------------------------------------------------------------
		this.modules = [
			{ name: 'Home', sub: 'Company & structure', emoji: '🏢', tile: '#e8ebfd', tone: '--indigo', route: 'theme-home-page' },
			{ name: 'Accounting', sub: 'Ledgers & finance', emoji: '💰', tile: '#e3f9ee', tone: '--green', route: 'theme-home-page/accounting' },
			{ name: 'Assets', sub: 'Fixed asset tracking', emoji: '💼', tile: '#efebfe', tone: '--purple', route: 'theme-home-page/assets' },
			{ name: 'Buying', sub: 'Procurement', emoji: '🛒', tile: '#f3ebfe', tone: '--violet', route: 'theme-home-page/buying' },
			{ name: 'Manufacturing', sub: 'Production & BOM', emoji: '🏭', tile: '#fef2e0', tone: '--orange', route: 'theme-home-page/manufacturing' },
			{ name: 'Projects', sub: 'Tasks & timelines', emoji: '📋', tile: '#e6eefd', tone: '--blue', route: 'theme-home-page/projects' },
			{ name: 'Quality', sub: 'Inspections & checks', emoji: '🛡️', tile: '#e1faf6', tone: '--teal', route: 'theme-home-page/quality' },
			{ name: 'Selling', sub: 'Sales & analytics', emoji: '🏷️', tile: '#e7fbee', tone: '--emerald', route: 'theme-home-page/selling' },
			{ name: 'Stock', sub: 'Inventory & logistics', emoji: '📦', tile: '#fef6e0', tone: '--amber', route: 'theme-home-page/stock' },
			// { name: 'Subcontracting', sub: 'Outsourced production', emoji: '🤝', tile: '#fdeaf3', tone: '--rose', route: 'theme-home-page/subcontracting' },
			{ name: 'HR', sub: 'Human resources', emoji: '👥', tile: '#efebfe', tone: '--purple', route: 'theme-home-page/hr' },
			// { name: 'Framework', sub: 'Core system tools', emoji: '🧩', tile: '#eef1f5', tone: '--slate', route: 'framework' },
			{ name: 'Settings', sub: 'System configuration', emoji: '⚙️', tile: '#eceff3', tone: '--slate', route: 'theme-home-page/settings' },
		];

		this.load_fonts();
		this.inject_styles();
		this.render();
	}

	load_fonts() {
		if (document.getElementById('spark360-fonts')) return;
		$('<link>', {
			id: 'spark360-fonts',
			rel: 'stylesheet',
			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lexend:wght@500;600;700;800&display=swap',
		}).appendTo('head');
	}

	// Time-based greeting using the logged-in user's first name.
	// Want no text at all above the grid? Delete the <h1> line in render()
	// and reduce `.hero` padding to something small like 24px.
	get_greeting() {
		const hour = new Date().getHours();
		const part = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
		const full = frappe.session.user_fullname || '';
		const first = full.split(' ')[0];
		return first ? `${part}, ${frappe.utils.escape_html(first)}` : part;
	}

	inject_styles() {
		if (document.getElementById('spark360-modules-style')) return;

		const css = `
			.spark360-modules {
				--bg-1:#eaf1fc; --bg-2:#f6f8fd;
				--ink:#16213e; --ink-soft:#6b7a99; --ink-faint:#9aa7c2;
				--card:#ffffff; --border:#e4eaf7;
				--blue:#3b6fe0; --blue-light:#6fa8f5;
				--purple:#6c5dd3; --violet:#8b5cf6;
				--green:#1fae5c; --emerald:#22c55e;
				--orange:#e8871e; --amber:#f2a922;
				--teal:#14b8a6; --indigo:#4f63e8; --rose:#ec4899; --slate:#64748b;
				--shadow-sm: 0 1px 2px rgba(22,33,62,0.06);
				--shadow-md: 0 8px 24px rgba(22,33,62,0.08);
				--shadow-lg: 0 20px 45px rgba(59,111,224,0.16);

				position: relative;
				overflow: hidden;
				min-height: calc(100vh - var(--navbar-height, 60px));
				font-family: 'Inter', system-ui, sans-serif;
				color: var(--ink);
				background:
					radial-gradient(1100px 500px at 85% -10%, rgba(111,168,245,0.20), transparent 60%),
					radial-gradient(900px 500px at -10% 10%, rgba(108,93,211,0.10), transparent 55%),
					linear-gradient(160deg, var(--bg-1), var(--bg-2) 60%);
				margin: -15px -15px 0;
				padding-bottom: 20px;
			}
			.spark360-modules a { text-decoration: none; color: inherit; }
			.spark360-modules .orbit-deco { position: absolute; top: -180px; right: -180px; width: 520px; height: 520px; pointer-events: none; opacity: 0.55; z-index: 0; }
			.spark360-modules .sparkle { position: absolute; color: var(--blue-light); opacity: 0.6; z-index: 0; }

			.spark360-modules .hero { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 40px 32px 0; }
			.spark360-modules .hero h1 { font-family: 'Lexend', sans-serif; font-size: 26px; font-weight: 600; letter-spacing: -0.02em; margin: 0; }

			.spark360-modules .grid-wrap { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 26px 32px 60px; }
			.spark360-modules .section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-faint); margin: 0 0 16px; }
			.spark360-modules .module-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; }

			.spark360-modules .module-card { position: relative; background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 18px; display: flex; flex-direction: column; gap: 12px; cursor: pointer; box-shadow: var(--shadow-sm); transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; overflow: hidden; }
			.spark360-modules .module-card::after { content: ""; position: absolute; inset: 0; background: radial-gradient(120px 90px at 85% -10%, var(--tint, transparent), transparent 70%); opacity: 0; transition: opacity .18s ease; pointer-events: none; }
			.spark360-modules .module-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--edge, var(--border)); }
			.spark360-modules .module-card:hover::after { opacity: 0.9; }
			.spark360-modules .module-card:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }

			/* smaller icon box: 38px tile, 19px emoji (was 48px / 24px) */
			.spark360-modules .m-icon { width: 38px; height: 38px; border-radius: 11px; display: flex; align-items: center; justify-content: center; background: var(--tile, #f1f4fa); box-shadow: inset 0 0 0 1px rgba(22,33,62,0.04); flex-shrink: 0; font-size: 19px; line-height: 1; transition: transform .18s ease; }
			.spark360-modules .module-card:hover .m-icon { transform: scale(1.06); }
			.spark360-modules .m-name { font-weight: 700; font-size: 15px; letter-spacing: -0.01em; }
			.spark360-modules .m-sub { font-size: 12.5px; color: var(--ink-soft); margin-top: 2px; line-height: 1.4; }
			.spark360-modules .m-arrow { position: absolute; top: 16px; right: 16px; width: 24px; height: 24px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--ink-faint); opacity: 0; transform: translate(-4px,4px); transition: opacity .18s ease, transform .18s ease, color .18s ease; }
			.spark360-modules .m-arrow svg { width: 14px; height: 14px; }
			.spark360-modules .module-card:hover .m-arrow { opacity: 1; transform: translate(0,0); color: var(--blue); }

			.spark360-modules .status-strip { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 0 32px 8px; display: flex; gap: 12px; flex-wrap: wrap; }
			.spark360-modules .pill { display: flex; align-items: center; gap: 10px; background: #fff; border: 1px solid var(--border); border-radius: 13px; padding: 11px 16px; box-shadow: var(--shadow-sm); }
			.spark360-modules .pill-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
			.spark360-modules .pill-icon svg { width: 14px; height: 14px; color: #fff; }
			.spark360-modules .pill-title { font-size: 12.5px; font-weight: 700; }
			.spark360-modules .pill-sub { font-size: 11.5px; color: var(--ink-soft); }

			@media (max-width: 640px) {
				.spark360-modules .hero { padding: 28px 16px 0; }
				.spark360-modules .hero h1 { font-size: 22px; }
				.spark360-modules .grid-wrap { padding: 20px 16px 40px; }
				.spark360-modules .status-strip { padding: 0 16px 8px; }
				.spark360-modules .module-grid { grid-template-columns: repeat(auto-fill, minmax(150px,1fr)); gap: 12px; }
			}
			@media (prefers-reduced-motion: reduce) {
				.spark360-modules * { transition: none !important; }
			}
		`;

		$('<style>', { id: 'spark360-modules-style', text: css }).appendTo('head');
	}

	render() {
		this.$wrapper.html(`
			<div class="spark360-modules">
				<svg class="orbit-deco" viewBox="0 0 520 520" fill="none">
					<circle cx="260" cy="260" r="230" stroke="#3b6fe0" stroke-opacity="0.10" stroke-width="1"/>
					<circle cx="260" cy="260" r="160" stroke="#3b6fe0" stroke-opacity="0.14" stroke-dasharray="3 6" stroke-width="1"/>
					<circle cx="260" cy="260" r="90" stroke="#6c5dd3" stroke-opacity="0.12" stroke-width="1"/>
				</svg>
				<svg class="sparkle" style="top:24px; right:64px; width:20px; height:20px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.2 7.8L22 10l-7.8 2.2L12 20l-2.2-7.8L2 10l7.8-2.2L12 0z"/></svg>
				<svg class="sparkle" style="top:180px; left:26px; width:10px; height:10px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.2 7.8L22 10l-7.8 2.2L12 20l-2.2-7.8L2 10l7.8-2.2L12 0z"/></svg>

				<section class="hero">
					<h1>${this.get_greeting()}</h1>
				</section>

				<section class="grid-wrap">
					<p class="section-label">All modules</p>
					<div class="module-grid" id="spark360-module-grid"></div>
				</section>

				<section class="status-strip">
					<div class="pill">
						<div class="pill-icon" style="background:var(--blue);">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.5 9a9 9 0 0114.85-3.36L23 10M1 14l4.65 4.36A9 9 0 0020.5 15"/></svg>
						</div>
						<div><div class="pill-title">Real-time</div><div class="pill-sub">Data sync</div></div>
					</div>
					<div class="pill">
						<div class="pill-icon" style="background:var(--orange);">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/></svg>
						</div>
						<div><div class="pill-title">99.98%</div><div class="pill-sub">Uptime</div></div>
					</div>
					<div class="pill">
						<div class="pill-icon" style="background:var(--green);">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.6A5 5 0 0018 8h-1.3A7 7 0 104 15.3"/><path d="M12 12v6M9 15l3 3 3-3"/></svg>
						</div>
						<div><div class="pill-title">Cloud Sync</div><div class="pill-sub">Always connected</div></div>
					</div>
				</section>
			</div>
		`);

		this.render_module_cards();
		this.bind_events();
	}

	render_module_cards() {
		const $grid = this.$wrapper.find('#spark360-module-grid');
		const html = this.modules
			.map((m) => {
				const tone = `var(${m.tone})`;
				return `
					<a class="module-card" data-route="${m.route}" style="--tone:${tone}; --tint:${tone}22; --edge:${tone}55; --tile:${m.tile};" tabindex="0">
						<div class="m-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${this.icons.arrow}</svg></div>
						<div class="m-icon">${m.emoji}</div>
						<div>
							<div class="m-name">${frappe.utils.escape_html(m.name)}</div>
							<div class="m-sub">${frappe.utils.escape_html(m.sub)}</div>
						</div>
					</a>
				`;
			})
			.join('');
		$grid.html(html);
	}

	bind_events() {
		this.$wrapper.on('click keypress', '.module-card', (e) => {
			if (e.type === 'keypress' && e.which !== 13) return; // only Enter key
			e.preventDefault();
			const route = $(e.currentTarget).data('route');
			if (route) frappe.set_route(route);
		});
	}
}

// frappe.pages['module-page'].on_page_load = function (wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: '',
// 		single_column: true,
// 	});

// 	frappe.spark360_module_page = new Spark360ModulePage(page);
// };

// class Spark360ModulePage {
// 	constructor(page) {
// 		this.page = page;
// 		this.$wrapper = $(page.body);

// 		// hide the default page head bar (title/breadcrumbs) so the
// 		// gradient hero sits flush under the desk navbar, like the login screen
// 		$(this.page.wrapper).find('.page-head').hide();
// 		$(this.page.wrapper).find('.container').css({ 'max-width': 'none', padding: 0 });

// 		// only the hover-arrow stays as a line icon; module glyphs are now emoji (see below)
// 		this.icons = {
// 			arrow: '<path d="M7 17L17 7M7 7h10v10"/>',
// 		};

// 		// -----------------------------------------------------------------
// 		// IMPORTANT: `route` below is what gets passed to frappe.set_route().
// 		// Open each module once in your Desk, check the URL after /app/...,
// 		// and update these values to match your site's real workspace routes.
// 		//
// 		// `emoji` is the colorful glyph shown on the tile. `tile` is a soft
// 		// pastel background for the tile, and `tone` is the vivid color used
// 		// for the hover glow/border. Swap the emoji for any other you like —
// 		// they render natively, no image files or extra requests needed.
// 		// -----------------------------------------------------------------
// 		this.modules = [
// 			{ name: 'Organization', sub: 'Company & structure', emoji: '🏢', tile: '#e8ebfd', tone: '--indigo', route: 'organization' },
// 			{ name: 'Accounting', sub: 'Ledgers & finance', emoji: '💰', tile: '#e3f9ee', tone: '--green', route: 'accounting' },
// 			{ name: 'Assets', sub: 'Fixed asset tracking', emoji: '💼', tile: '#efebfe', tone: '--purple', route: 'assets' },
// 			{ name: 'Buying', sub: 'Procurement', emoji: '🛒', tile: '#f3ebfe', tone: '--violet', route: 'buying' },
// 			{ name: 'Manufacturing', sub: 'Production & BOM', emoji: '🏭', tile: '#fef2e0', tone: '--orange', route: 'manufacturing' },
// 			{ name: 'Projects', sub: 'Tasks & timelines', emoji: '📋', tile: '#e6eefd', tone: '--blue', route: 'projects' },
// 			{ name: 'Quality', sub: 'Inspections & checks', emoji: '🛡️', tile: '#e1faf6', tone: '--teal', route: 'quality' },
// 			{ name: 'Selling', sub: 'Sales & analytics', emoji: '🏷️', tile: '#e7fbee', tone: '--emerald', route: 'selling' },
// 			{ name: 'Stock', sub: 'Inventory & logistics', emoji: '📦', tile: '#fef6e0', tone: '--amber', route: 'stock' },
// 			{ name: 'Subcontracting', sub: 'Outsourced production', emoji: '🤝', tile: '#fdeaf3', tone: '--rose', route: 'subcontracting' },
// 			{ name: 'HR', sub: 'Human resources', emoji: '👥', tile: '#efebfe', tone: '--purple', route: 'hr' },
// 			{ name: 'Framework', sub: 'Core system tools', emoji: '🧩', tile: '#eef1f5', tone: '--slate', route: 'framework' },
// 			{ name: 'Settings', sub: 'System configuration', emoji: '⚙️', tile: '#eceff3', tone: '--slate', route: 'erpnext-settings' },
// 		];

// 		this.load_fonts();
// 		this.inject_styles();
// 		this.render();
// 	}

// 	load_fonts() {
// 		if (document.getElementById('spark360-fonts')) return;
// 		$('<link>', {
// 			id: 'spark360-fonts',
// 			rel: 'stylesheet',
// 			href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lexend:wght@500;600;700;800&display=swap',
// 		}).appendTo('head');
// 	}

// 	inject_styles() {
// 		if (document.getElementById('spark360-modules-style')) return;

// 		const css = `
// 			.spark360-modules {
// 				--bg-1:#eaf1fc; --bg-2:#f6f8fd;
// 				--ink:#16213e; --ink-soft:#6b7a99; --ink-faint:#9aa7c2;
// 				--card:#ffffff; --border:#e4eaf7;
// 				--blue:#3b6fe0; --blue-light:#6fa8f5;
// 				--purple:#6c5dd3; --violet:#8b5cf6;
// 				--green:#1fae5c; --emerald:#22c55e;
// 				--orange:#e8871e; --amber:#f2a922;
// 				--teal:#14b8a6; --indigo:#4f63e8; --rose:#ec4899; --slate:#64748b;
// 				--shadow-sm: 0 1px 2px rgba(22,33,62,0.06);
// 				--shadow-md: 0 8px 24px rgba(22,33,62,0.08);
// 				--shadow-lg: 0 20px 45px rgba(59,111,224,0.16);

// 				position: relative;
// 				overflow: hidden;
// 				min-height: calc(100vh - var(--navbar-height, 60px));
// 				font-family: 'Inter', system-ui, sans-serif;
// 				color: var(--ink);
// 				background:
// 					radial-gradient(1100px 500px at 85% -10%, rgba(111,168,245,0.20), transparent 60%),
// 					radial-gradient(900px 500px at -10% 10%, rgba(108,93,211,0.10), transparent 55%),
// 					linear-gradient(160deg, var(--bg-1), var(--bg-2) 60%);
// 				margin: -15px -15px 0;
// 				padding-bottom: 20px;
// 			}
// 			.spark360-modules a { text-decoration: none; color: inherit; }
// 			.spark360-modules .orbit-deco { position: absolute; top: -180px; right: -180px; width: 520px; height: 520px; pointer-events: none; opacity: 0.55; z-index: 0; }
// 			.spark360-modules .sparkle { position: absolute; color: var(--blue-light); opacity: 0.6; z-index: 0; }

// 			.spark360-modules .hero { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 52px 32px 8px; }
// 			.spark360-modules .eyebrow { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; color: var(--blue); background: rgba(59,111,224,0.08); border: 1px solid rgba(59,111,224,0.18); padding: 5px 11px; border-radius: 999px; margin-bottom: 14px; }
// 			.spark360-modules .eyebrow svg { width: 13px; height: 13px; }
// 			.spark360-modules .hero h1 { font-family: 'Lexend', sans-serif; font-size: 32px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 8px; }
// 			.spark360-modules .hero p { font-size: 15px; color: var(--ink-soft); margin: 0; max-width: 560px; line-height: 1.55; }

// 			.spark360-modules .grid-wrap { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 28px 32px 60px; }
// 			.spark360-modules .section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-faint); margin: 0 0 16px; }
// 			.spark360-modules .module-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; }

// 			.spark360-modules .module-card { position: relative; background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 14px; cursor: pointer; box-shadow: var(--shadow-sm); transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; overflow: hidden; }
// 			.spark360-modules .module-card::after { content: ""; position: absolute; inset: 0; background: radial-gradient(120px 90px at 85% -10%, var(--tint, transparent), transparent 70%); opacity: 0; transition: opacity .18s ease; pointer-events: none; }
// 			.spark360-modules .module-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--edge, var(--border)); }
// 			.spark360-modules .module-card:hover::after { opacity: 0.9; }
// 			.spark360-modules .module-card:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }

// 			.spark360-modules .m-icon { width: 48px; height: 48px; border-radius: 13px; display: flex; align-items: center; justify-content: center; background: var(--tile, #f1f4fa); box-shadow: inset 0 0 0 1px rgba(22,33,62,0.04); flex-shrink: 0; font-size: 24px; line-height: 1; transition: transform .18s ease; }
// 			.spark360-modules .module-card:hover .m-icon { transform: scale(1.06); }
// 			.spark360-modules .m-name { font-weight: 700; font-size: 15px; letter-spacing: -0.01em; }
// 			.spark360-modules .m-sub { font-size: 12.5px; color: var(--ink-soft); margin-top: 2px; line-height: 1.4; }
// 			.spark360-modules .m-arrow { position: absolute; top: 18px; right: 18px; width: 24px; height: 24px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--ink-faint); opacity: 0; transform: translate(-4px,4px); transition: opacity .18s ease, transform .18s ease, color .18s ease; }
// 			.spark360-modules .m-arrow svg { width: 14px; height: 14px; }
// 			.spark360-modules .module-card:hover .m-arrow { opacity: 1; transform: translate(0,0); color: var(--blue); }

// 			.spark360-modules .status-strip { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 0 32px 8px; display: flex; gap: 12px; flex-wrap: wrap; }
// 			.spark360-modules .pill { display: flex; align-items: center; gap: 10px; background: #fff; border: 1px solid var(--border); border-radius: 13px; padding: 11px 16px; box-shadow: var(--shadow-sm); }
// 			.spark360-modules .pill-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
// 			.spark360-modules .pill-icon svg { width: 14px; height: 14px; color: #fff; }
// 			.spark360-modules .pill-title { font-size: 12.5px; font-weight: 700; }
// 			.spark360-modules .pill-sub { font-size: 11.5px; color: var(--ink-soft); }

// 			@media (max-width: 640px) {
// 				.spark360-modules .hero { padding: 32px 16px 4px; }
// 				.spark360-modules .hero h1 { font-size: 25px; }
// 				.spark360-modules .grid-wrap { padding: 22px 16px 40px; }
// 				.spark360-modules .status-strip { padding: 0 16px 8px; }
// 				.spark360-modules .module-grid { grid-template-columns: repeat(auto-fill, minmax(150px,1fr)); gap: 12px; }
// 			}
// 			@media (prefers-reduced-motion: reduce) {
// 				.spark360-modules * { transition: none !important; }
// 			}
// 		`;

// 		$('<style>', { id: 'spark360-modules-style', text: css }).appendTo('head');
// 	}

// 	render() {
// 		this.$wrapper.html(`
// 			<div class="spark360-modules">
// 				<svg class="orbit-deco" viewBox="0 0 520 520" fill="none">
// 					<circle cx="260" cy="260" r="230" stroke="#3b6fe0" stroke-opacity="0.10" stroke-width="1"/>
// 					<circle cx="260" cy="260" r="160" stroke="#3b6fe0" stroke-opacity="0.14" stroke-dasharray="3 6" stroke-width="1"/>
// 					<circle cx="260" cy="260" r="90" stroke="#6c5dd3" stroke-opacity="0.12" stroke-width="1"/>
// 				</svg>
// 				<svg class="sparkle" style="top:24px; right:64px; width:20px; height:20px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.2 7.8L22 10l-7.8 2.2L12 20l-2.2-7.8L2 10l7.8-2.2L12 0z"/></svg>
// 				<svg class="sparkle" style="top:180px; left:26px; width:10px; height:10px;" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.2 7.8L22 10l-7.8 2.2L12 20l-2.2-7.8L2 10l7.8-2.2L12 0z"/></svg>

// 				<section class="hero">
// 					<div class="eyebrow">
// 						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5L12 0z"/></svg>
// 						SMART BUSINESS ERP
// 					</div>
// 					<h1>Every module, one connected platform</h1>
// 					<p>Pick a module below to jump straight into it — HR, sales, stock, buying and CRM all stay synced through Spark360.</p>
// 				</section>

// 				<section class="grid-wrap">
// 					<p class="section-label">All modules</p>
// 					<div class="module-grid" id="spark360-module-grid"></div>
// 				</section>

// 				<section class="status-strip">
// 					<div class="pill">
// 						<div class="pill-icon" style="background:var(--blue);">
// 							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.5 9a9 9 0 0114.85-3.36L23 10M1 14l4.65 4.36A9 9 0 0020.5 15"/></svg>
// 						</div>
// 						<div><div class="pill-title">Real-time</div><div class="pill-sub">Data sync</div></div>
// 					</div>
// 					<div class="pill">
// 						<div class="pill-icon" style="background:var(--orange);">
// 							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/></svg>
// 						</div>
// 						<div><div class="pill-title">99.98%</div><div class="pill-sub">Uptime</div></div>
// 					</div>
// 					<div class="pill">
// 						<div class="pill-icon" style="background:var(--green);">
// 							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.6A5 5 0 0018 8h-1.3A7 7 0 104 15.3"/><path d="M12 12v6M9 15l3 3 3-3"/></svg>
// 						</div>
// 						<div><div class="pill-title">Cloud Sync</div><div class="pill-sub">Always connected</div></div>
// 					</div>
// 				</section>
// 			</div>
// 		`);

// 		this.render_module_cards();
// 		this.bind_events();
// 	}

// 	render_module_cards() {
// 		const $grid = this.$wrapper.find('#spark360-module-grid');
// 		const html = this.modules
// 			.map((m) => {
// 				const tone = `var(${m.tone})`;
// 				return `
// 					<a class="module-card" data-route="${m.route}" style="--tone:${tone}; --tint:${tone}22; --edge:${tone}55; --tile:${m.tile};" tabindex="0">
// 						<div class="m-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${this.icons.arrow}</svg></div>
// 						<div class="m-icon">${m.emoji}</div>
// 						<div>
// 							<div class="m-name">${frappe.utils.escape_html(m.name)}</div>
// 							<div class="m-sub">${frappe.utils.escape_html(m.sub)}</div>
// 						</div>
// 					</a>
// 				`;
// 			})
// 			.join('');
// 		$grid.html(html);
// 	}

// 	bind_events() {
// 		this.$wrapper.on('click keypress', '.module-card', (e) => {
// 			if (e.type === 'keypress' && e.which !== 13) return; // only Enter key
// 			e.preventDefault();
// 			const route = $(e.currentTarget).data('route');
// 			if (route) frappe.set_route(route);
// 		});
// 	}
// }