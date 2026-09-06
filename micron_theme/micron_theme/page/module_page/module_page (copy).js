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

		this.icons = {
			framework: '<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 12l9 4 9-4"/><path d="M3 17l9 4 9-4"/>',
			organization: '<rect x="4" y="10" width="6" height="10"/><rect x="14" y="4" width="6" height="16"/><path d="M4 10V6h6v4"/>',
			accounting: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9h8M8 13h5M8 17h3"/>',
			assets: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/>',
			buying: '<circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.6 12.4a2 2 0 002 1.6h8.8a2 2 0 002-1.6L21 8H6"/>',
			manufacturing: '<path d="M3 20V10l5 4V10l5 4V10l6 4v6H3z"/><path d="M7 20v-3M13 20v-3"/>',
			projects: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M3 17l4-4 3 3 5-5 4 4"/>',
			quality: '<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/>',
			selling: '<path d="M20.6 12.4L12 21l-9-9 8.6-8.6H20a1 1 0 011 1v7.6z"/><circle cx="16" cy="8" r="1.4"/>',
			stock: '<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M3 8l9 5 9-5"/>',
			subcontracting: '<path d="M17 2l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/>',
			settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 11-4 0v-.2a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 110-4h.2a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.6V3a2 2 0 114 0v.2a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.6 1H21a2 2 0 110 4h-.2a1.7 1.7 0 00-1.6 1z"/>',
			hr: '<path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>',
			arrow: '<path d="M7 17L17 7M7 7h10v10"/>',
		};

		// -----------------------------------------------------------------
		// IMPORTANT: `route` below is what gets passed to frappe.set_route().
		// Open each module once in your Desk, check the URL after /app/...,
		// and update these values to match your site's real workspace routes.
		// -----------------------------------------------------------------
		this.modules = [
			{ name: 'Organization', sub: 'Company & structure', icon: 'organization', tone: '--indigo', route: 'organization' },
			{ name: 'Accounting', sub: 'Ledgers & finance', icon: 'accounting', tone: '--green', route: 'accounting' },
			{ name: 'Assets', sub: 'Fixed asset tracking', icon: 'assets', tone: '--purple', route: 'assets' },
			{ name: 'Buying', sub: 'Procurement', icon: 'buying', tone: '--violet', route: 'buying' },
			{ name: 'Manufacturing', sub: 'Production & BOM', icon: 'manufacturing', tone: '--orange', route: 'manufacturing' },
			{ name: 'Projects', sub: 'Tasks & timelines', icon: 'projects', tone: '--blue', route: 'projects' },
			{ name: 'Quality', sub: 'Inspections & checks', icon: 'quality', tone: '--teal', route: 'quality' },
			{ name: 'Selling', sub: 'Sales & analytics', icon: 'selling', tone: '--emerald', route: 'selling' },
			{ name: 'Stock', sub: 'Inventory & logistics', icon: 'stock', tone: '--amber', route: 'stock' },
			{ name: 'Subcontracting', sub: 'Outsourced production', icon: 'subcontracting', tone: '--rose', route: 'subcontracting' },
			{ name: 'HR', sub: 'Human resources', icon: 'hr', tone: '--purple', route: 'hr' },
			{ name: 'Framework', sub: 'Core system tools', icon: 'framework', tone: '--slate', route: 'framework' },
			{ name: 'Settings', sub: 'System configuration', icon: 'settings', tone: '--slate', route: 'erpnext-settings' },
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

			.spark360-modules .hero { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 52px 32px 8px; }
			.spark360-modules .eyebrow { display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; color: var(--blue); background: rgba(59,111,224,0.08); border: 1px solid rgba(59,111,224,0.18); padding: 5px 11px; border-radius: 999px; margin-bottom: 14px; }
			.spark360-modules .eyebrow svg { width: 13px; height: 13px; }
			.spark360-modules .hero h1 { font-family: 'Lexend', sans-serif; font-size: 32px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 8px; }
			.spark360-modules .hero p { font-size: 15px; color: var(--ink-soft); margin: 0; max-width: 560px; line-height: 1.55; }

			.spark360-modules .grid-wrap { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 28px 32px 60px; }
			.spark360-modules .section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-faint); margin: 0 0 16px; }
			.spark360-modules .module-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 16px; }

			.spark360-modules .module-card { position: relative; background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 14px; cursor: pointer; box-shadow: var(--shadow-sm); transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; overflow: hidden; }
			.spark360-modules .module-card::after { content: ""; position: absolute; inset: 0; background: radial-gradient(120px 90px at 85% -10%, var(--tint, transparent), transparent 70%); opacity: 0; transition: opacity .18s ease; pointer-events: none; }
			.spark360-modules .module-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--edge, var(--border)); }
			.spark360-modules .module-card:hover::after { opacity: 0.9; }
			.spark360-modules .module-card:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }

			.spark360-modules .m-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--tone); box-shadow: var(--shadow-sm); flex-shrink: 0; }
			.spark360-modules .m-icon svg { width: 22px; height: 22px; color: #fff; }
			.spark360-modules .m-name { font-weight: 700; font-size: 15px; letter-spacing: -0.01em; }
			.spark360-modules .m-sub { font-size: 12.5px; color: var(--ink-soft); margin-top: 2px; line-height: 1.4; }
			.spark360-modules .m-arrow { position: absolute; top: 18px; right: 18px; width: 24px; height: 24px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--ink-faint); opacity: 0; transform: translate(-4px,4px); transition: opacity .18s ease, transform .18s ease, color .18s ease; }
			.spark360-modules .m-arrow svg { width: 14px; height: 14px; }
			.spark360-modules .module-card:hover .m-arrow { opacity: 1; transform: translate(0,0); color: var(--blue); }

			.spark360-modules .status-strip { position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; padding: 0 32px 8px; display: flex; gap: 12px; flex-wrap: wrap; }
			.spark360-modules .pill { display: flex; align-items: center; gap: 10px; background: #fff; border: 1px solid var(--border); border-radius: 13px; padding: 11px 16px; box-shadow: var(--shadow-sm); }
			.spark360-modules .pill-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
			.spark360-modules .pill-icon svg { width: 14px; height: 14px; color: #fff; }
			.spark360-modules .pill-title { font-size: 12.5px; font-weight: 700; }
			.spark360-modules .pill-sub { font-size: 11.5px; color: var(--ink-soft); }

			@media (max-width: 640px) {
				.spark360-modules .hero { padding: 32px 16px 4px; }
				.spark360-modules .hero h1 { font-size: 25px; }
				.spark360-modules .grid-wrap { padding: 22px 16px 40px; }
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
					<div class="eyebrow">
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.5 8.5L23 11l-8.5 2.5L12 22l-2.5-8.5L1 11l8.5-2.5L12 0z"/></svg>
						SMART BUSINESS ERP
					</div>
					<h1>Every module, one connected platform</h1>
					<p>Pick a module below to jump straight into it — HR, sales, stock, buying and CRM all stay synced through Spark360.</p>
				</section>

				<section class="grid-wrap">
					<p class="section-label">All modules</p>
					<div class="module-grid" id="spark360-module-grid"></div>
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
					<a class="module-card" data-route="${m.route}" style="--tone:${tone}; --tint:${tone}22; --edge:${tone}55;" tabindex="0">
						<div class="m-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${this.icons.arrow}</svg></div>
						<div class="m-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${this.icons[m.icon]}</svg></div>
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