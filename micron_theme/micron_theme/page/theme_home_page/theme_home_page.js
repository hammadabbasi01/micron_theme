/**
 * Spark360 desk home page.
 *
 * The whole thing lives on one route: /app/theme-home-page
 *   /app/theme-home-page              -> module launcher (home)
 *   /app/theme-home-page/accounting   -> Accounting view, rendered in place
 *
 * Nothing here redirects to the standard ERPNext workspaces. Sidebar clicks
 * just change the sub-route, so the browser back/forward buttons work and a
 * module view can be bookmarked.
 *
 * To add or edit a module, touch MODULES below - nothing else. Every doctype
 * is permission-checked against frappe.boot.user.can_read, so links the user
 * cannot open (or apps that are not installed, e.g. HRMS) simply do not render.
 */

frappe.pages['theme-home-page'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: '',
		single_column: true,
	});

	// ── Strip the default desk chrome so this page owns the whole viewport ──
	$(wrapper).find('.page-head').hide();
	$(wrapper).find('.container').css({ 'max-width': 'none', padding: 0 });
	$(wrapper).find('.page-container, .page-body, .page-content').css({ 'padding-bottom': 0, 'margin-bottom': 0 });
	$(wrapper).find('.layout-main-section-wrapper').css({ 'margin-bottom': 0 });
	$(wrapper).find('.layout-main-section').css({
		'padding-bottom': 0,
		'margin-bottom': 0,
		border: 'none',
		'border-radius': 0,
		background: 'transparent',
		'box-shadow': 'none',
	});

	inject_thp_styles();
	frappe.thp_home = new Spark360Desk(page, wrapper);
};

// Fires on every route change into this page, including sub-routes.
frappe.pages['theme-home-page'].on_page_show = function () {
	if (frappe.thp_home) frappe.thp_home.route_changed();
};

// ══════════════════════════════════════════════════════════════
//  MODULE DEFINITIONS
// ══════════════════════════════════════════════════════════════
//  key      - matches the sub-route: /app/theme-home-page/<key>
//  kpis     - live counts. { label, doctype, filters }
//  chart    - one monthly chart. value_field omitted => document count.
//  cards    - link groups. A link is { label, doctype } or { label, route: [...] }
//  reports  - query report names, opened as /app/query-report/<name>
//
//  Report names must match the reports installed on YOUR site. If one is
//  missing, remove it from the list - Frappe will otherwise show "not found".
// ══════════════════════════════════════════════════════════════
const THP_MODULES = {
	accounting: {
		label: 'Accounting',
		icon: '💰',
		accent: '#e8a317',
		tile: '#fdf3dd',
		blurb: 'Ledgers, invoices and financial statements',
		kpis: [
			{ label: 'Draft sales invoices', doctype: 'Sales Invoice', filters: { docstatus: 0 } },
			{ label: 'Unpaid sales invoices', doctype: 'Sales Invoice', filters: { status: 'Unpaid' } },
			{ label: 'Unpaid purchase invoices', doctype: 'Purchase Invoice', filters: { status: 'Unpaid' } },
			{ label: 'Draft journal entries', doctype: 'Journal Entry', filters: { docstatus: 0 } },
		],
		chart: {
			title: 'Submitted sales invoices',
			doctype: 'Sales Invoice',
			date_field: 'posting_date',
			value_field: 'base_grand_total',
			filters: { docstatus: 1 },
			type: 'bar',
			months: 6,
		},
		cards: [
			{
				title: 'Transactions',
				icon: '🧾',
				links: [
					{ label: 'Sales Invoice', doctype: 'Sales Invoice' },
					{ label: 'Purchase Invoice', doctype: 'Purchase Invoice' },
					{ label: 'Payment Entry', doctype: 'Payment Entry' },
					{ label: 'Journal Entry', doctype: 'Journal Entry' },
				],
			},
			{
				title: 'Masters',
				icon: '🏛️',
				links: [
					{ label: 'Chart of Accounts', doctype: 'Account', route: ['Tree', 'Account'] },
					{ label: 'Cost Center', doctype: 'Cost Center', route: ['Tree', 'Cost Center'] },
					{ label: 'Company', doctype: 'Company' },
					{ label: 'Customer', doctype: 'Customer' },
					{ label: 'Supplier', doctype: 'Supplier' },
				],
			},
			{
				title: 'Setup',
				icon: '⚙️',
				links: [
					{ label: 'Fiscal Year', doctype: 'Fiscal Year' },
					{ label: 'Mode of Payment', doctype: 'Mode of Payment' },
					{ label: 'Payment Terms Template', doctype: 'Payment Terms Template' },
					{ label: 'Accounts Settings', doctype: 'Accounts Settings', route: ['Form', 'Accounts Settings'] },
				],
			},
		],
		reports: [
			'General Ledger',
			'Trial Balance',
			'Balance Sheet',
			'Profit and Loss Statement',
			'Accounts Receivable',
			'Accounts Payable',
			'Sales Register',
			'Purchase Register',
		],
	},

	selling: {
		label: 'Selling',
		icon: '🏷️',
		accent: '#e0741a',
		tile: '#fdeee0',
		blurb: 'Quotations, sales orders and customers',
		kpis: [
			{ label: 'Open quotations', doctype: 'Quotation', filters: { status: 'Open' } },
			{ label: 'Orders to deliver', doctype: 'Sales Order', filters: { status: 'To Deliver and Bill' } },
			{ label: 'Draft sales orders', doctype: 'Sales Order', filters: { docstatus: 0 } },
		],
		chart: {
			title: 'Sales order value',
			doctype: 'Sales Order',
			date_field: 'transaction_date',
			value_field: 'base_grand_total',
			filters: { docstatus: 1 },
			type: 'bar',
			months: 6,
		},
		cards: [
			{
				title: 'Transactions',
				icon: '📄',
				links: [
					{ label: 'Quotation', doctype: 'Quotation' },
					{ label: 'Sales Order', doctype: 'Sales Order' },
					{ label: 'Delivery Note', doctype: 'Delivery Note' },
					{ label: 'Sales Invoice', doctype: 'Sales Invoice' },
				],
			},
			{
				title: 'Masters',
				icon: '👤',
				links: [
					{ label: 'Customer', doctype: 'Customer' },
					{ label: 'Item', doctype: 'Item' },
					{ label: 'Price List', doctype: 'Price List' },
					{ label: 'Item Price', doctype: 'Item Price' },
					{ label: 'Sales Taxes and Charges Template', doctype: 'Sales Taxes and Charges Template' },
				],
			},
		],
		reports: [
			'Sales Order Analysis',
			'Item-wise Sales History',
			'Sales Register',
			'Quotation Trends',
			'Territory Wise Sales',
			'Customer Credit Balance',
		],
	},

	buying: {
		label: 'Buying',
		icon: '🛒',
		accent: '#e05252',
		tile: '#fdeaea',
		blurb: 'Procurement from requisition to invoice',
		kpis: [
			{ label: 'Requests to order', doctype: 'Material Request', filters: { status: 'Pending' } },
			{ label: 'Draft purchase orders', doctype: 'Purchase Order', filters: { docstatus: 0 } },
			{ label: 'Orders to receive', doctype: 'Purchase Order', filters: { status: 'To Receive and Bill' } },
		],
		chart: {
			title: 'Purchase order value',
			doctype: 'Purchase Order',
			date_field: 'transaction_date',
			value_field: 'base_grand_total',
			filters: { docstatus: 1 },
			type: 'bar',
			months: 6,
		},
		cards: [
			{
				title: 'Transactions',
				icon: '📥',
				links: [
					{ label: 'Material Request', doctype: 'Material Request' },
					{ label: 'Request for Quotation', doctype: 'Request for Quotation' },
					{ label: 'Supplier Quotation', doctype: 'Supplier Quotation' },
					{ label: 'Purchase Order', doctype: 'Purchase Order' },
					{ label: 'Purchase Receipt', doctype: 'Purchase Receipt' },
				],
			},
			{
				title: 'Masters',
				icon: '🏢',
				links: [
					{ label: 'Supplier', doctype: 'Supplier' },
					{ label: 'Supplier Group', doctype: 'Supplier Group', route: ['Tree', 'Supplier Group'] },
					{ label: 'Item', doctype: 'Item' },
					{ label: 'Purchase Taxes and Charges Template', doctype: 'Purchase Taxes and Charges Template' },
				],
			},
		],
		reports: [
			'Purchase Order Analysis',
			'Purchase Register',
			'Item-wise Purchase History',
			'Requested Items to Order',
			'Supplier Quotation Comparison',
			'Purchase Order Trends',
		],
	},

	stock: {
		label: 'Stock',
		icon: '📦',
		accent: '#1fae5c',
		tile: '#e3f9ee',
		blurb: 'Inventory movement, balances and warehouses',
		kpis: [
			{ label: 'Draft stock entries', doctype: 'Stock Entry', filters: { docstatus: 0 } },
			{ label: 'Draft delivery notes', doctype: 'Delivery Note', filters: { docstatus: 0 } },
			{ label: 'Draft purchase receipts', doctype: 'Purchase Receipt', filters: { docstatus: 0 } },
		],
		chart: {
			title: 'Stock entries posted',
			doctype: 'Stock Entry',
			date_field: 'posting_date',
			filters: { docstatus: 1 },
			type: 'line',
			months: 6,
		},
		cards: [
			{
				title: 'Transactions',
				icon: '🚚',
				links: [
					{ label: 'Stock Entry', doctype: 'Stock Entry' },
					{ label: 'Delivery Note', doctype: 'Delivery Note' },
					{ label: 'Purchase Receipt', doctype: 'Purchase Receipt' },
					{ label: 'Material Request', doctype: 'Material Request' },
					{ label: 'Stock Reconciliation', doctype: 'Stock Reconciliation' },
				],
			},
			{
				title: 'Masters',
				icon: '🏷️',
				links: [
					{ label: 'Item', doctype: 'Item' },
					{ label: 'Warehouse', doctype: 'Warehouse', route: ['Tree', 'Warehouse'] },
					{ label: 'Item Group', doctype: 'Item Group', route: ['Tree', 'Item Group'] },
					{ label: 'Brand', doctype: 'Brand' },
					{ label: 'UOM', doctype: 'UOM' },
				],
			},
		],
		reports: [
			'Stock Balance',
			'Stock Ledger',
			'Stock Projected Qty',
			'Item Shortage Report',
			'Stock Ageing',
			'Batch-Wise Balance History',
		],
	},

	manufacturing: {
		label: 'Manufacturing',
		icon: '🏭',
		accent: '#0ba7c4',
		tile: '#e0f6fb',
		blurb: 'Production orders, BOMs and job cards',
		kpis: [
			{ label: 'Work orders in process', doctype: 'Work Order', filters: { status: 'In Process' } },
			{ label: 'Open job cards', doctype: 'Job Card', filters: { docstatus: 0 } },
			{ label: 'Active BOMs', doctype: 'BOM', filters: { is_active: 1 } },
		],
		chart: {
			title: 'Work orders created',
			doctype: 'Work Order',
			date_field: 'creation',
			type: 'line',
			months: 6,
		},
		cards: [
			{
				title: 'Production',
				icon: '⚙️',
				links: [
					{ label: 'Work Order', doctype: 'Work Order' },
					{ label: 'Job Card', doctype: 'Job Card' },
					{ label: 'Production Plan', doctype: 'Production Plan' },
					{ label: 'Stock Entry', doctype: 'Stock Entry' },
				],
			},
			{
				title: 'Masters',
				icon: '🧩',
				links: [
					{ label: 'BOM', doctype: 'BOM' },
					{ label: 'Item', doctype: 'Item' },
					{ label: 'Workstation', doctype: 'Workstation' },
					{ label: 'Operation', doctype: 'Operation' },
					{ label: 'Routing', doctype: 'Routing' },
				],
			},
		],
		reports: [
			'Production Analytics',
			'Work Order Summary',
			'Job Card Summary',
			'BOM Stock Report',
			'BOM Explorer',
			'Production Planning Report',
		],
	},

	crm: {
		label: 'CRM',
		icon: '👥',
		accent: '#8b5cf6',
		tile: '#efebfe',
		blurb: 'Leads, opportunities and the sales pipeline',
		kpis: [
			{ label: 'Open leads', doctype: 'Lead', filters: { status: 'Open' } },
			{ label: 'Open opportunities', doctype: 'Opportunity', filters: { status: 'Open' } },
			{ label: 'Draft quotations', doctype: 'Quotation', filters: { docstatus: 0 } },
		],
		chart: {
			title: 'Leads created',
			doctype: 'Lead',
			date_field: 'creation',
			type: 'line',
			months: 6,
		},
		cards: [
			{
				title: 'Pipeline',
				icon: '📈',
				links: [
					{ label: 'Lead', doctype: 'Lead' },
					{ label: 'Opportunity', doctype: 'Opportunity' },
					{ label: 'Quotation', doctype: 'Quotation' },
					{ label: 'Customer', doctype: 'Customer' },
				],
			},
			{
				title: 'Masters',
				icon: '🗂️',
				links: [
					{ label: 'Customer Group', doctype: 'Customer Group', route: ['Tree', 'Customer Group'] },
					{ label: 'Territory', doctype: 'Territory', route: ['Tree', 'Territory'] },
					{ label: 'Sales Person', doctype: 'Sales Person', route: ['Tree', 'Sales Person'] },
					{ label: 'Campaign', doctype: 'Campaign' },
				],
			},
		],
		reports: [
			'Lead Details',
			'Opportunity Summary by Sales Stage',
			'Inactive Customers',
			'Customer Acquisition and Loyalty',
		],
	},

	hr: {
		label: 'HR',
		icon: '👤',
		accent: '#e0468f',
		tile: '#fdeaf3',
		blurb: 'Employees, attendance and payroll',
		kpis: [
			{ label: 'Active employees', doctype: 'Employee', filters: { status: 'Active' } },
			{ label: 'Open leave applications', doctype: 'Leave Application', filters: { status: 'Open' } },
			{ label: 'Draft salary slips', doctype: 'Salary Slip', filters: { docstatus: 0 } },
		],
		chart: {
			title: 'Leave applications',
			doctype: 'Leave Application',
			date_field: 'creation',
			type: 'line',
			months: 6,
		},
		cards: [
			{
				title: 'People',
				icon: '🧑‍💼',
				links: [
					{ label: 'Employee', doctype: 'Employee' },
					{ label: 'Attendance', doctype: 'Attendance' },
					{ label: 'Leave Application', doctype: 'Leave Application' },
					{ label: 'Employee Checkin', doctype: 'Employee Checkin' },
				],
			},
			{
				title: 'Payroll',
				icon: '💵',
				links: [
					{ label: 'Payroll Entry', doctype: 'Payroll Entry' },
					{ label: 'Salary Slip', doctype: 'Salary Slip' },
					{ label: 'Salary Structure', doctype: 'Salary Structure' },
					{ label: 'Salary Component', doctype: 'Salary Component' },
				],
			},
			{
				title: 'Recruitment',
				icon: '📣',
				links: [
					{ label: 'Job Opening', doctype: 'Job Opening' },
					{ label: 'Job Applicant', doctype: 'Job Applicant' },
					{ label: 'Interview', doctype: 'Interview' },
				],
			},
		],
		reports: [
			'Monthly Attendance Sheet',
			'Employee Leave Balance',
			'Salary Register',
			'Employee Analytics',
		],
	},

	projects: {
		label: 'Projects',
		icon: '📊',
		accent: '#3b6fe0',
		tile: '#e6eefd',
		blurb: 'Projects, tasks and timesheets',
		kpis: [
			{ label: 'Open projects', doctype: 'Project', filters: { status: 'Open' } },
			{ label: 'Open tasks', doctype: 'Task', filters: { status: 'Open' } },
			{ label: 'Draft timesheets', doctype: 'Timesheet', filters: { docstatus: 0 } },
		],
		chart: {
			title: 'Tasks created',
			doctype: 'Task',
			date_field: 'creation',
			type: 'line',
			months: 6,
		},
		cards: [
			{
				title: 'Delivery',
				icon: '📋',
				links: [
					{ label: 'Project', doctype: 'Project' },
					{ label: 'Task', doctype: 'Task' },
					{ label: 'Timesheet', doctype: 'Timesheet' },
					{ label: 'Project Template', doctype: 'Project Template' },
					{ label: 'Activity Type', doctype: 'Activity Type' },
				],
			},
		],
		reports: [
			'Project Summary',
			'Daily Timesheet Summary',
			'Project Profitability',
			'Employee Hours Utilization Based On Timesheet',
		],
	},

	assets: {
		label: 'Assets',
		icon: '💼',
		accent: '#6c5dd3',
		tile: '#efebfe',
		blurb: 'Fixed assets, depreciation and maintenance',
		kpis: [
			{ label: 'Submitted assets', doctype: 'Asset', filters: { docstatus: 1 } },
			{ label: 'Draft assets', doctype: 'Asset', filters: { docstatus: 0 } },
			{ label: 'Asset repairs', doctype: 'Asset Repair', filters: { docstatus: 0 } },
		],
		chart: {
			title: 'Assets purchased',
			doctype: 'Asset',
			date_field: 'purchase_date',
			value_field: 'gross_purchase_amount',
			filters: { docstatus: 1 },
			type: 'bar',
			months: 6,
		},
		cards: [
			{
				title: 'Asset records',
				icon: '🏗️',
				links: [
					{ label: 'Asset', doctype: 'Asset' },
					{ label: 'Asset Movement', doctype: 'Asset Movement' },
					{ label: 'Asset Repair', doctype: 'Asset Repair' },
					{ label: 'Asset Value Adjustment', doctype: 'Asset Value Adjustment' },
				],
			},
			{
				title: 'Masters',
				icon: '🗄️',
				links: [
					{ label: 'Asset Category', doctype: 'Asset Category' },
					{ label: 'Location', doctype: 'Location', route: ['Tree', 'Location'] },
					{ label: 'Asset Maintenance', doctype: 'Asset Maintenance' },
				],
			},
		],
		reports: [
			'Fixed Asset Register',
			'Asset Depreciation Ledger',
			'Asset Depreciations and Balances',
		],
	},

	settings: {
		label: 'Settings',
		icon: '⚙️',
		accent: '#5a6b85',
		tile: '#eef1f5',
		blurb: 'Users, customisation and system configuration',
		kpis: [],
		cards: [
			{
				title: 'Users & permissions',
				icon: '🔐',
				links: [
					{ label: 'User', doctype: 'User' },
					{ label: 'Role', doctype: 'Role' },
					{ label: 'Role Permission Manager', route: ['permission-manager'] },
					{ label: 'User Permission', doctype: 'User Permission' },
				],
			},
			{
				title: 'Customisation',
				icon: '🧰',
				links: [
					{ label: 'Custom Field', doctype: 'Custom Field' },
					{ label: 'Property Setter', doctype: 'Property Setter' },
					{ label: 'Client Script', doctype: 'Client Script' },
					{ label: 'Server Script', doctype: 'Server Script' },
					{ label: 'Print Format', doctype: 'Print Format' },
				],
			},
			{
				title: 'Data & email',
				icon: '📤',
				links: [
					{ label: 'Data Import', doctype: 'Data Import' },
					{ label: 'Bulk Update', route: ['bulk-update'] },
					{ label: 'Email Account', doctype: 'Email Account' },
					{ label: 'Letter Head', doctype: 'Letter Head' },
					{ label: 'Notification', doctype: 'Notification' },
				],
			},
			{
				title: 'Company setup',
				icon: '🏢',
				links: [
					{ label: 'Company', doctype: 'Company' },
					{ label: 'Fiscal Year', doctype: 'Fiscal Year' },
					{ label: 'Currency', doctype: 'Currency' },
					{ label: 'Global Defaults', doctype: 'Global Defaults', route: ['Form', 'Global Defaults'] },
				],
			},
		],
		reports: [],
	},
};

// Sidebar order. 'home' is the launcher; the rest map to THP_MODULES keys.
const THP_NAV = ['home', 'accounting', 'selling', 'buying', 'stock', 'manufacturing', 'crm', 'hr', 'projects', 'assets', 'settings'];

const THP_SHORTCUTS = [
	{ icon: '📦', label: 'Item', doctype: 'Item' },
	{ icon: '👤', label: 'Customer', doctype: 'Customer' },
	{ icon: '🏢', label: 'Supplier', doctype: 'Supplier' },
	{ icon: '🧾', label: 'Sales Invoice', doctype: 'Sales Invoice' },
	{ icon: '📥', label: 'Purchase Invoice', doctype: 'Purchase Invoice' },
];

// ══════════════════════════════════════════════════════════════
//  Page
// ══════════════════════════════════════════════════════════════
class Spark360Desk {
	constructor(page, wrapper) {
		this.page = page;
		this.wrapper = wrapper;
		this.current = null;

		this.$root = $(`
			<div class="thp-root">
				<nav class="thp-sidebar" id="thp-sidebar"></nav>
				<div class="thp-content" id="thp-content"><div class="thp-inner" id="thp-inner"></div></div>
			</div>
		`);
		$(page.body).html('').append(this.$root);

		this.$sidebar = this.$root.find('#thp-sidebar');
		this.$content = this.$root.find('#thp-content');
		this.$inner = this.$root.find('#thp-inner');

		this.build_sidebar();
		this.fit_height();
		setTimeout(() => this.fit_height(), 120);
		$(window).off('resize.thp').on('resize.thp', frappe.utils.debounce(() => this.fit_height(), 100));

		this.route_changed();
	}

	// Fill everything below the page's real top edge, whatever the desk padding is.
	fit_height() {
		if (!this.$root.is(':visible')) return;
		const top = this.$root[0].getBoundingClientRect().top;
		this.$root.css('height', Math.max(window.innerHeight - top, 320) + 'px');
	}

	can_read(doctype) {
		if (!doctype) return true;
		const allowed = frappe.boot && frappe.boot.user && frappe.boot.user.can_read;
		return !allowed || allowed.indexOf(doctype) !== -1;
	}

	// ── Sidebar ──────────────────────────────────────────────
	build_sidebar() {
		const $sb = this.$sidebar;
		$sb.on('mouseenter focusin', () => this.$root.addClass('nav-open'));
		$sb.on('mouseleave focusout', () => this.$root.removeClass('nav-open'));

		THP_NAV.forEach((key) => {
			const conf = key === 'home' ? { label: 'Home', icon: '🏠' } : THP_MODULES[key];
			if (!conf) return;

			const $item = $(`
				<div class="thp-nav-item" data-key="${key}" tabindex="0" title="${frappe.utils.escape_html(conf.label)}">
					<span class="thp-icon">${conf.icon}</span>
					<span class="thp-label">${frappe.utils.escape_html(conf.label)}</span>
				</div>
			`);

			// Route only - rendering happens in route_changed(), so the back
			// button and a pasted URL behave exactly like a click.
			const go = () => {
				if (key === 'home') frappe.set_route('theme-home-page');
				else frappe.set_route('theme-home-page', key);
			};
			$item.on('click', go);
			$item.on('keydown', (e) => { if (e.which === 13) go(); });
			$sb.append($item);
		});
	}

	set_active(key) {
		this.$sidebar.find('.thp-nav-item').removeClass('active')
			.filter(`[data-key="${key}"]`).addClass('active');
	}

	// ── Routing ──────────────────────────────────────────────
	route_changed() {
		const route = frappe.get_route() || [];
		if (route[0] !== 'theme-home-page') return;

		const key = route[1];
		this.fit_height();

		if (key && THP_MODULES[key]) {
			this.set_active(key);
			this.render_module(key);
		} else {
			this.set_active('home');
			this.render_home();
		}
		this.$content.scrollTop(0);
	}

	// ── Home (launcher) ──────────────────────────────────────
	render_home() {
		this.current = null;

		const greeting = this.get_greeting();
		const $inner = this.$inner.empty();

		$inner.append(`
			<div class="thp-topbar">
				<div>
					<div class="thp-topbar-title">${greeting}</div>
					<div class="thp-topbar-sub">Pick a module to open it here, without leaving this page.</div>
				</div>
				<div class="thp-topbar-actions">
					<button class="thp-btn" id="thp-workspaces">Standard workspaces</button>
				</div>
			</div>
		`);
		$inner.find('#thp-workspaces').on('click', () => frappe.set_route('app'));

		// shortcuts
		const $sc = $('<div class="thp-shortcuts"><span class="thp-shortcuts-label">Shortcuts</span></div>');
		THP_SHORTCUTS.filter((s) => this.can_read(s.doctype)).forEach((s) => {
			$(`<button class="thp-shortcut-btn"><span class="sc-icon">${s.icon}</span>${frappe.utils.escape_html(s.label)}</button>`)
				.on('click', () => frappe.set_route('List', s.doctype))
				.appendTo($sc);
		});
		$inner.append($sc);

		// module tiles
		$inner.append('<div class="thp-section-title">All modules</div>');
		const $grid = $('<div class="thp-cards-grid"></div>');

		THP_NAV.filter((k) => k !== 'home').forEach((key) => {
			const m = THP_MODULES[key];
			const links = [].concat(...m.cards.map((c) => c.links))
				.filter((l) => this.can_read(l.doctype))
				.slice(0, 4);

			const linksHtml = links
				.map((l, i) => `<li data-idx="${i}">${frappe.utils.escape_html(l.label)}</li>`)
				.join('');

			const $card = $(`
				<div class="thp-card" tabindex="0" style="--card-accent:${m.accent}; --card-bg:${m.tile}; --card-tint:${m.accent}22; --card-edge:${m.accent}55;">
					<div class="thp-card-header">
						<div class="thp-card-icon">${m.icon}</div>
						<div>
							<div class="thp-card-title">${frappe.utils.escape_html(m.label)}</div>
							<div class="thp-card-sub">${frappe.utils.escape_html(m.blurb)}</div>
						</div>
					</div>
					<ul class="thp-card-links">${linksHtml}</ul>
				</div>
			`);

			const open = () => frappe.set_route('theme-home-page', key);
			$card.on('click', open);
			$card.on('keydown', (e) => { if (e.which === 13) open(); });
			$card.find('.thp-card-links li').on('click', (e) => {
				e.stopPropagation();
				this.open_link(links[$(e.currentTarget).data('idx')]);
			});

			$grid.append($card);
		});

		$inner.append($grid);
	}

	get_greeting() {
		const hour = new Date().getHours();
		const part = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
		const first = (frappe.session.user_fullname || '').split(' ')[0];
		return first ? `${part}, ${frappe.utils.escape_html(first)}` : part;
	}

	// ── Module view ──────────────────────────────────────────
	render_module(key) {
		this.current = key;
		const m = THP_MODULES[key];
		const $inner = this.$inner.empty();

		// header
		const $head = $(`
			<div class="thp-topbar">
				<div class="thp-mod-head">
					<button class="thp-back" title="Back to all modules">←</button>
					<div class="thp-mod-icon" style="background:${m.tile}">${m.icon}</div>
					<div>
						<div class="thp-topbar-title">${frappe.utils.escape_html(m.label)}</div>
						<div class="thp-topbar-sub">${frappe.utils.escape_html(m.blurb)}</div>
					</div>
				</div>
				<div class="thp-topbar-actions">
					<button class="thp-btn thp-open-ws">Open standard workspace</button>
				</div>
			</div>
		`);
		$head.find('.thp-back').on('click', () => frappe.set_route('theme-home-page'));
		$head.find('.thp-open-ws').on('click', () => frappe.set_route('app', key));
		$inner.append($head);

		// KPI row
		const kpis = (m.kpis || []).filter((k) => this.can_read(k.doctype));
		if (kpis.length) {
			const $row = $('<div class="thp-kpi-row"></div>');
			kpis.forEach((k, i) => {
				$row.append(`
					<div class="thp-kpi" style="--card-accent:${m.accent}" data-kpi="${i}">
						<div class="thp-kpi-value">–</div>
						<div class="thp-kpi-label">${frappe.utils.escape_html(k.label)}</div>
					</div>
				`);
			});
			$inner.append($row);

			kpis.forEach((k, i) => {
				frappe.db.count(k.doctype, { filters: k.filters || {} })
					.then((n) => {
						const $el = $row.find(`[data-kpi="${i}"]`);
						$el.find('.thp-kpi-value').text(frappe.utils.is_null(n) ? '–' : n);
						$el.on('click', () => frappe.set_route('List', k.doctype, k.filters || {}))
							.addClass('clickable');
					})
					.catch(() => $row.find(`[data-kpi="${i}"]`).remove());
			});
		}

		// chart
		if (m.chart && this.can_read(m.chart.doctype)) {
			const $chart = $(`
				<div class="thp-chart-card">
					<div class="thp-chart-title">${frappe.utils.escape_html(m.chart.title)}<span class="thp-chart-note">last ${m.chart.months || 6} months</span></div>
					<div class="thp-chart-body"><div class="thp-chart-msg">Loading…</div></div>
				</div>
			`);
			$inner.append($chart);
			this.draw_chart($chart.find('.thp-chart-body'), m.chart, m.accent);
		}

		// link cards
		$inner.append('<div class="thp-section-title">Masters &amp; transactions</div>');
		const $grid = $('<div class="thp-cards-grid"></div>');

		m.cards.forEach((card) => {
			const links = card.links.filter((l) => this.can_read(l.doctype));
			if (!links.length) return;

			const linksHtml = links.map((l, i) => `<li data-idx="${i}">${frappe.utils.escape_html(l.label)}</li>`).join('');
			const $card = $(`
				<div class="thp-card static" style="--card-accent:${m.accent}; --card-bg:${m.tile}; --card-tint:${m.accent}22; --card-edge:${m.accent}55;">
					<div class="thp-card-header">
						<div class="thp-card-icon">${card.icon}</div>
						<div class="thp-card-title">${frappe.utils.escape_html(card.title)}</div>
					</div>
					<ul class="thp-card-links">${linksHtml}</ul>
				</div>
			`);
			$card.find('.thp-card-links li').on('click', (e) => this.open_link(links[$(e.currentTarget).data('idx')]));
			$grid.append($card);
		});
		$inner.append($grid);

		// reports
		if ((m.reports || []).length) {
			$inner.append('<div class="thp-section-title">Reports</div>');
			const $reports = $('<div class="thp-report-list"></div>');
			m.reports.forEach((name) => {
				$(`<button class="thp-report-btn" style="--card-accent:${m.accent}"><span class="rp-dot"></span>${frappe.utils.escape_html(name)}</button>`)
					.on('click', () => frappe.set_route('query-report', name))
					.appendTo($reports);
			});
			$inner.append($reports);
		}
	}

	open_link(link) {
		if (!link) return;
		if (link.route) frappe.set_route.apply(null, link.route);
		else frappe.set_route('List', link.doctype);
	}

	// ── Chart ────────────────────────────────────────────────
	// Pulls the raw rows for the window and buckets them by month on the
	// client. Fine for a desk widget; if a doctype grows past a few thousand
	// rows a month, swap this for a Dashboard Chart / server-side aggregate.
	draw_chart($body, cfg, accent) {
		const months = cfg.months || 6;
		const today = frappe.datetime.get_today();
		const start = frappe.datetime.add_months(today, -(months - 1)).slice(0, 8) + '01';

		const keys = [];
		const labels = [];
		for (let i = months - 1; i >= 0; i--) {
			const d = frappe.datetime.add_months(today, -i);
			keys.push(d.slice(0, 7));
			labels.push(moment(d.slice(0, 7) + '-01').format('MMM YY'));
		}

		const filters = Object.assign({}, cfg.filters || {});
		filters[cfg.date_field] = ['>=', start];

		const fields = [cfg.date_field];
		if (cfg.value_field) fields.push(cfg.value_field);

		frappe.db.get_list(cfg.doctype, { filters, fields, limit: 5000 })
			.then((rows) => {
				const totals = {};
				keys.forEach((k) => (totals[k] = 0));

				(rows || []).forEach((r) => {
					const raw = r[cfg.date_field];
					if (!raw) return;
					const k = String(raw).slice(0, 7);
					if (!(k in totals)) return;
					totals[k] += cfg.value_field ? flt(r[cfg.value_field]) : 1;
				});

				const values = keys.map((k) => Math.round(totals[k] * 100) / 100);

				if (!values.some((v) => v)) {
					$body.html('<div class="thp-chart-msg">No data in this period</div>');
					return;
				}
				if (typeof frappe.Chart === 'undefined') {
					$body.html('<div class="thp-chart-msg">Chart library unavailable</div>');
					return;
				}

				$body.empty();
				new frappe.Chart($body[0], {
					data: { labels, datasets: [{ name: cfg.value_field ? 'Amount' : 'Count', values }] },
					type: cfg.type || 'bar',
					height: 210,
					colors: [accent],
					axisOptions: { xAxisMode: 'tick', yAxisMode: 'span' },
					barOptions: { spaceRatio: 0.55 },
					lineOptions: { regionFill: 1, hideDots: 0 },
					animate: false,
				});
			})
			.catch(() => $body.html('<div class="thp-chart-msg">Could not load this chart</div>'));
	}
}

// ══════════════════════════════════════════════════════════════
//  Styles
// ══════════════════════════════════════════════════════════════
function inject_thp_styles() {
	if (document.getElementById('theme-home-page-style')) return;
	const style = document.createElement('style');
	style.id = 'theme-home-page-style';
	style.textContent = `
		.thp-root {
			--bg-1:#eaf1fc; --bg-2:#f6f8fd;
			--ink:#16213e; --ink-soft:#6b7a99; --ink-faint:#9aa7c2;
			--card:#ffffff; --border:#e4eaf7;
			--blue:#3b6fe0;
			--shadow-sm: 0 1px 2px rgba(22,33,62,0.06);
			--shadow-lg: 0 20px 45px rgba(59,111,224,0.16);
			--rail: 66px;
			--rail-open: 214px;

			display: flex;
			gap: 12px;
			box-sizing: border-box;
			padding: 12px;
			overflow: hidden;
			font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
			color: var(--ink);
			background:
				radial-gradient(1100px 500px at 85% -10%, rgba(111,168,245,0.20), transparent 60%),
				radial-gradient(900px 500px at -10% 10%, rgba(108,93,211,0.10), transparent 55%),
				linear-gradient(160deg, var(--bg-1), var(--bg-2) 60%);
			margin: -15px -15px 0;
		}
		.thp-root *, .thp-root *::before, .thp-root *::after { box-sizing: border-box; }

		/* ── Sidebar ── */
		.thp-sidebar {
			flex: 0 0 var(--rail); width: var(--rail);
			display: flex; flex-direction: column; gap: 3px;
			padding: 10px 0;
			border-radius: 18px;
			background: rgba(214,229,250,0.52);
			backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
			box-shadow: inset 0 0 0 1px rgba(255,255,255,0.55);
			overflow-x: hidden; overflow-y: auto;
			transition: flex-basis .3s cubic-bezier(.4,0,.2,1), width .3s cubic-bezier(.4,0,.2,1);
		}
		.thp-root.nav-open .thp-sidebar { flex-basis: var(--rail-open); width: var(--rail-open); }
		.thp-sidebar::-webkit-scrollbar { width: 0; }

		.thp-nav-item {
			display: flex; align-items: center; gap: 12px;
			height: 44px; margin: 0 9px; padding: 0 12px;
			border-radius: 13px; cursor: pointer; white-space: nowrap; flex-shrink: 0;
			transition: background .16s ease, box-shadow .16s ease;
		}
		.thp-nav-item:hover { background: rgba(255,255,255,0.62); }
		.thp-nav-item.active { background: #ffffff; box-shadow: 0 2px 8px -2px rgba(22,33,62,0.14); }
		.thp-nav-item:focus-visible { outline: 2px solid var(--blue); outline-offset: -2px; }
		.thp-nav-item .thp-icon { font-size: 18px; line-height: 1; width: 24px; text-align: center; flex-shrink: 0; transition: transform .16s ease; }
		.thp-nav-item:hover .thp-icon { transform: scale(1.1); }
		.thp-nav-item .thp-label { font-size: 13.5px; font-weight: 500; color: var(--ink-soft); opacity: 0; transition: opacity .2s .06s ease; pointer-events: none; }
		.thp-root.nav-open .thp-label { opacity: 1; }
		.thp-nav-item.active .thp-label { color: var(--blue); font-weight: 600; }

		/* ── Content ── */
		.thp-content { flex: 1 1 auto; min-width: 0; overflow-y: auto; padding: 18px 20px 32px 12px; }
		.thp-inner { max-width: 1180px; }

		/* ── Top bar ── */
		.thp-topbar { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 22px; flex-wrap: wrap; }
		.thp-topbar-title { font-family: 'Lexend', 'Inter', sans-serif; font-size: 25px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.2; }
		.thp-topbar-sub { font-size: 13.5px; color: var(--ink-soft); margin-top: 4px; }
		.thp-topbar-actions { display: flex; gap: 10px; }

		.thp-mod-head { display: flex; align-items: center; gap: 12px; }
		.thp-back {
			width: 34px; height: 34px; flex-shrink: 0;
			border-radius: 11px; border: 1px solid var(--border); background: #fff;
			color: var(--ink-soft); font-size: 16px; line-height: 1; cursor: pointer;
			box-shadow: var(--shadow-sm); transition: color .15s ease, border-color .15s ease;
		}
		.thp-back:hover { color: var(--blue); border-color: rgba(59,111,224,0.35); }
		.thp-mod-icon {
			width: 42px; height: 42px; border-radius: 12px; flex-shrink: 0;
			display: flex; align-items: center; justify-content: center;
			font-size: 21px; line-height: 1;
			box-shadow: inset 0 0 0 1px rgba(22,33,62,0.05);
		}

		.thp-btn {
			padding: 9px 18px; border-radius: 11px;
			border: 1px solid var(--border); background: #fff;
			font-family: inherit; font-size: 13px; font-weight: 500; color: var(--ink-soft);
			cursor: pointer; box-shadow: var(--shadow-sm);
			transition: background .15s ease, border-color .15s ease, color .15s ease;
		}
		.thp-btn:hover { color: var(--blue); border-color: rgba(59,111,224,0.35); background: #fbfcff; }

		/* ── Labels ── */
		.thp-section-title { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-faint); margin: 26px 0 14px; }
		.thp-inner > .thp-section-title:first-of-type { margin-top: 4px; }

		/* ── Shortcuts ── */
		.thp-shortcuts { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; margin-bottom: 8px; }
		.thp-shortcuts-label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-faint); margin-right: 4px; }
		.thp-shortcut-btn {
			display: inline-flex; align-items: center; gap: 7px;
			padding: 8px 15px; background: #fff;
			border: 1px solid var(--border); border-radius: 999px;
			font-family: inherit; font-size: 13px; font-weight: 500; color: var(--ink-soft);
			cursor: pointer; box-shadow: var(--shadow-sm);
			transition: color .15s ease, border-color .15s ease, transform .15s ease, box-shadow .15s ease;
		}
		.thp-shortcut-btn:hover { color: var(--blue); border-color: rgba(59,111,224,0.4); transform: translateY(-1px); box-shadow: 0 6px 16px -8px rgba(59,111,224,0.5); }
		.thp-shortcut-btn .sc-icon { font-size: 14px; line-height: 1; }

		/* ── KPIs ── */
		.thp-kpi-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(168px, 1fr)); gap: 12px; margin-bottom: 16px; }
		.thp-kpi {
			position: relative; background: #fff; border: 1px solid var(--border);
			border-radius: 14px; padding: 14px 16px; box-shadow: var(--shadow-sm);
			transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease;
		}
		.thp-kpi::before { content: ""; position: absolute; left: 16px; top: 0; width: 22px; height: 3px; border-radius: 0 0 3px 3px; background: var(--card-accent, var(--blue)); }
		.thp-kpi.clickable { cursor: pointer; }
		.thp-kpi.clickable:hover { transform: translateY(-2px); box-shadow: 0 10px 22px -12px rgba(22,33,62,0.35); border-color: var(--card-accent, var(--border)); }
		.thp-kpi-value { font-family: 'Lexend', 'Inter', sans-serif; font-size: 24px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.1; font-variant-numeric: tabular-nums; }
		.thp-kpi-label { font-size: 12.5px; color: var(--ink-soft); margin-top: 3px; }

		/* ── Chart ── */
		.thp-chart-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; padding: 16px 18px 6px; box-shadow: var(--shadow-sm); }
		.thp-chart-title { display: flex; align-items: baseline; gap: 8px; font-size: 13.5px; font-weight: 600; }
		.thp-chart-note { font-size: 12px; font-weight: 400; color: var(--ink-faint); }
		.thp-chart-body { min-height: 210px; display: flex; align-items: center; justify-content: center; }
		.thp-chart-body > .chart-container { width: 100%; }
		.thp-chart-msg { font-size: 13px; color: var(--ink-faint); padding: 60px 0; }

		/* ── Cards ── */
		.thp-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(232px, 1fr)); gap: 16px; }
		.thp-card {
			position: relative; background: var(--card); border: 1px solid var(--border);
			border-radius: 16px; padding: 18px; cursor: pointer; overflow: hidden;
			box-shadow: var(--shadow-sm);
			transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
		}
		.thp-card.static { cursor: default; }
		.thp-card::after {
			content: ""; position: absolute; inset: 0; pointer-events: none;
			background: radial-gradient(130px 95px at 88% -10%, var(--card-tint, transparent), transparent 70%);
			opacity: 0; transition: opacity .18s ease;
		}
		.thp-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--card-edge, var(--border)); }
		.thp-card.static:hover { transform: none; box-shadow: var(--shadow-sm); }
		.thp-card:hover::after { opacity: .9; }
		.thp-card:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }

		.thp-card-header { display: flex; align-items: center; gap: 11px; margin-bottom: 14px; }
		.thp-card-icon {
			width: 38px; height: 38px; border-radius: 11px;
			display: flex; align-items: center; justify-content: center;
			font-size: 19px; line-height: 1;
			background: var(--card-bg, #eef3ff);
			box-shadow: inset 0 0 0 1px rgba(22,33,62,0.04);
			flex-shrink: 0; transition: transform .18s ease;
		}
		.thp-card:hover .thp-card-icon { transform: scale(1.06); }
		.thp-card.static:hover .thp-card-icon { transform: none; }
		.thp-card-title { font-size: 15px; font-weight: 700; letter-spacing: -0.01em; }
		.thp-card-sub { font-size: 12px; color: var(--ink-soft); margin-top: 1px; }

		.thp-card-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1px; position: relative; z-index: 1; }
		.thp-card-links li {
			display: flex; align-items: center; gap: 8px;
			font-size: 12.5px; color: var(--ink-soft);
			padding: 4px 6px; margin-left: -6px;
			border-radius: 7px; cursor: pointer;
			transition: color .14s ease, background .14s ease;
		}
		.thp-card-links li::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: var(--card-accent, var(--blue)); flex-shrink: 0; opacity: .75; }
		.thp-card-links li:hover { color: var(--card-accent, var(--blue)); background: rgba(22,33,62,0.035); }

		/* ── Reports ── */
		.thp-report-list { display: flex; flex-wrap: wrap; gap: 9px; }
		.thp-report-btn {
			display: inline-flex; align-items: center; gap: 8px;
			padding: 9px 15px; background: #fff;
			border: 1px solid var(--border); border-radius: 11px;
			font-family: inherit; font-size: 13px; font-weight: 500; color: var(--ink-soft);
			cursor: pointer; box-shadow: var(--shadow-sm);
			transition: color .15s ease, border-color .15s ease, transform .15s ease;
		}
		.thp-report-btn .rp-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--card-accent, var(--blue)); opacity: .8; }
		.thp-report-btn:hover { color: var(--card-accent, var(--blue)); border-color: var(--card-accent, var(--border)); transform: translateY(-1px); }

		/* ── Scrollbar ── */
		.thp-content::-webkit-scrollbar { width: 8px; }
		.thp-content::-webkit-scrollbar-track { background: transparent; }
		.thp-content::-webkit-scrollbar-thumb { background: #d3ddef; border-radius: 4px; border: 2px solid transparent; background-clip: content-box; }
		.thp-content::-webkit-scrollbar-thumb:hover { background: #bccbe6; background-clip: content-box; }

		@media (max-width: 640px) {
			.thp-root { padding: 8px; gap: 8px; }
			.thp-content { padding: 14px 8px 24px 6px; }
			.thp-topbar-title { font-size: 21px; }
			.thp-cards-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
			.thp-kpi-row { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
		}
		@media (prefers-reduced-motion: reduce) {
			.thp-root *, .thp-root *::after { transition: none !important; }
		}
	`;
	document.head.appendChild(style);
}

//////////////////////////////////////// Old Code ////////////////////////////////////

// frappe.pages['theme-home-page'].on_page_load = function (wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: '',
// 		single_column: true,
// 	});

// 	// ── Strip the default desk chrome so this page owns the whole viewport ──
// 	// Frappe puts a white rounded panel + a large bottom margin around page
// 	// content; both are what left the grey gap under the page.
// 	$(wrapper).find('.page-head').hide();
// 	$(wrapper).find('.container').css({ 'max-width': 'none', padding: 0 });
// 	$(wrapper).find('.page-container, .page-body, .page-content').css({ 'padding-bottom': 0, 'margin-bottom': 0 });
// 	$(wrapper).find('.layout-main-section-wrapper').css({ 'margin-bottom': 0 });
// 	$(wrapper).find('.layout-main-section').css({
// 		'padding-bottom': 0,
// 		'margin-bottom': 0,
// 		border: 'none',
// 		'border-radius': 0,
// 		background: 'transparent',
// 		'box-shadow': 'none',
// 	});

// 	// ── Styles ──────────────────────────────────────────────────
// 	if (!document.getElementById('theme-home-page-style')) {
// 		const style = document.createElement('style');
// 		style.id = 'theme-home-page-style';
// 		style.textContent = `
// 			.thp-root {
// 				/* same token set as the Spark360 module page */
// 				--bg-1:#eaf1fc; --bg-2:#f6f8fd;
// 				--ink:#16213e; --ink-soft:#6b7a99; --ink-faint:#9aa7c2;
// 				--card:#ffffff; --border:#e4eaf7;
// 				--blue:#3b6fe0; --blue-soft:#e6eefd;
// 				--shadow-sm: 0 1px 2px rgba(22,33,62,0.06);
// 				--shadow-lg: 0 20px 45px rgba(59,111,224,0.16);
// 				--rail: 66px;
// 				--rail-open: 214px;

// 				display: flex;
// 				gap: 12px;
// 				box-sizing: border-box;
// 				padding: 12px;
// 				overflow: hidden;
// 				font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
// 				color: var(--ink);
// 				background:
// 					radial-gradient(1100px 500px at 85% -10%, rgba(111,168,245,0.20), transparent 60%),
// 					radial-gradient(900px 500px at -10% 10%, rgba(108,93,211,0.10), transparent 55%),
// 					linear-gradient(160deg, var(--bg-1), var(--bg-2) 60%);
// 				margin: -15px -15px 0;
// 			}
// 			.thp-root *, .thp-root *::before, .thp-root *::after { box-sizing: border-box; }

// 			/* ── Sidebar: floating rounded rail, tinted glass, pushes content ── */
// 			.thp-sidebar {
// 				flex: 0 0 var(--rail);
// 				width: var(--rail);
// 				display: flex;
// 				flex-direction: column;
// 				gap: 3px;
// 				padding: 10px 0;
// 				border-radius: 18px;
// 				background: rgba(214,229,250,0.52);
// 				backdrop-filter: blur(10px);
// 				-webkit-backdrop-filter: blur(10px);
// 				box-shadow: inset 0 0 0 1px rgba(255,255,255,0.55);
// 				overflow-x: hidden;
// 				overflow-y: auto;
// 				transition: flex-basis .3s cubic-bezier(.4,0,.2,1), width .3s cubic-bezier(.4,0,.2,1);
// 			}
// 			.thp-root.nav-open .thp-sidebar { flex-basis: var(--rail-open); width: var(--rail-open); }
// 			.thp-sidebar::-webkit-scrollbar { width: 0; }

// 			.thp-nav-item {
// 				display: flex;
// 				align-items: center;
// 				gap: 12px;
// 				height: 44px;
// 				margin: 0 9px;
// 				padding: 0 12px;
// 				border-radius: 13px;
// 				cursor: pointer;
// 				white-space: nowrap;
// 				flex-shrink: 0;
// 				transition: background .16s ease, box-shadow .16s ease;
// 			}
// 			.thp-nav-item:hover { background: rgba(255,255,255,0.62); }
// 			.thp-nav-item.active { background: #ffffff; box-shadow: 0 2px 8px -2px rgba(22,33,62,0.14); }
// 			.thp-nav-item:focus-visible { outline: 2px solid var(--blue); outline-offset: -2px; }

// 			.thp-nav-item .thp-icon {
// 				font-size: 18px;
// 				line-height: 1;
// 				width: 24px;
// 				text-align: center;
// 				flex-shrink: 0;
// 				transition: transform .16s ease;
// 			}
// 			.thp-nav-item:hover .thp-icon { transform: scale(1.1); }
// 			.thp-nav-item .thp-label {
// 				font-size: 13.5px;
// 				font-weight: 500;
// 				color: var(--ink-soft);
// 				opacity: 0;
// 				transition: opacity .2s .06s ease;
// 				pointer-events: none;
// 			}
// 			.thp-root.nav-open .thp-label { opacity: 1; }
// 			.thp-nav-item.active .thp-label { color: var(--blue); font-weight: 600; }

// 			/* ── Content ── */
// 			.thp-content {
// 				flex: 1 1 auto;
// 				min-width: 0;
// 				overflow-y: auto;
// 				padding: 18px 20px 28px 12px;
// 			}
// 			.thp-inner { max-width: 1180px; }

// 			/* ── Top bar ── */
// 			.thp-topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 22px; flex-wrap: wrap; }
// 			.thp-topbar-title { font-family: 'Lexend', 'Inter', sans-serif; font-size: 25px; font-weight: 600; letter-spacing: -0.02em; }
// 			.thp-topbar-actions { display: flex; gap: 10px; }
// 			.thp-btn {
// 				padding: 9px 18px;
// 				border-radius: 11px;
// 				border: 1px solid var(--border);
// 				background: #fff;
// 				font-family: inherit;
// 				font-size: 13px;
// 				font-weight: 500;
// 				color: var(--ink-soft);
// 				cursor: pointer;
// 				box-shadow: var(--shadow-sm);
// 				transition: background .15s ease, border-color .15s ease, color .15s ease;
// 			}
// 			.thp-btn:hover { color: var(--blue); border-color: rgba(59,111,224,0.35); background: #fbfcff; }
// 			.thp-btn.primary { background: var(--blue); color: #fff; border-color: var(--blue); box-shadow: 0 6px 16px -6px rgba(59,111,224,0.55); }
// 			.thp-btn.primary:hover { background: #3363d6; color: #fff; }

// 			/* ── Labels ── */
// 			.thp-section-title {
// 				font-size: 12px; font-weight: 700; letter-spacing: 0.08em;
// 				text-transform: uppercase; color: var(--ink-faint);
// 				margin: 4px 0 14px;
// 			}

// 			/* ── Shortcuts ── */
// 			.thp-shortcuts { display: flex; align-items: center; gap: 9px; flex-wrap: wrap; margin-bottom: 26px; }
// 			.thp-shortcuts-label { font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-faint); margin-right: 4px; }
// 			.thp-shortcut-btn {
// 				display: inline-flex; align-items: center; gap: 7px;
// 				padding: 8px 15px;
// 				background: #fff;
// 				border: 1px solid var(--border);
// 				border-radius: 999px;
// 				font-family: inherit; font-size: 13px; font-weight: 500;
// 				color: var(--ink-soft);
// 				cursor: pointer;
// 				box-shadow: var(--shadow-sm);
// 				transition: color .15s ease, border-color .15s ease, transform .15s ease, box-shadow .15s ease;
// 			}
// 			.thp-shortcut-btn:hover { color: var(--blue); border-color: rgba(59,111,224,0.4); transform: translateY(-1px); box-shadow: 0 6px 16px -8px rgba(59,111,224,0.5); }
// 			.thp-shortcut-btn .sc-icon { font-size: 14px; line-height: 1; }

// 			/* ── Cards ── */
// 			.thp-cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(232px, 1fr)); gap: 16px; }

// 			.thp-card {
// 				position: relative;
// 				background: var(--card);
// 				border: 1px solid var(--border);
// 				border-radius: 16px;
// 				padding: 18px;
// 				cursor: pointer;
// 				overflow: hidden;
// 				box-shadow: var(--shadow-sm);
// 				transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
// 			}
// 			.thp-card::after {
// 				content: ""; position: absolute; inset: 0; pointer-events: none;
// 				background: radial-gradient(130px 95px at 88% -10%, var(--card-tint, transparent), transparent 70%);
// 				opacity: 0; transition: opacity .18s ease;
// 			}
// 			.thp-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--card-edge, var(--border)); }
// 			.thp-card:hover::after { opacity: .9; }
// 			.thp-card:focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; }

// 			.thp-card-header { display: flex; align-items: center; gap: 11px; margin-bottom: 14px; }
// 			.thp-card-icon {
// 				width: 38px; height: 38px; border-radius: 11px;
// 				display: flex; align-items: center; justify-content: center;
// 				font-size: 19px; line-height: 1;
// 				background: var(--card-bg, #eef3ff);
// 				box-shadow: inset 0 0 0 1px rgba(22,33,62,0.04);
// 				flex-shrink: 0;
// 				transition: transform .18s ease;
// 			}
// 			.thp-card:hover .thp-card-icon { transform: scale(1.06); }
// 			.thp-card-title { font-size: 15px; font-weight: 700; letter-spacing: -0.01em; }

// 			.thp-card-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 1px; position: relative; z-index: 1; }
// 			.thp-card-links li {
// 				display: flex; align-items: center; gap: 8px;
// 				font-size: 12.5px; color: var(--ink-soft);
// 				padding: 4px 6px; margin-left: -6px;
// 				border-radius: 7px; cursor: pointer;
// 				transition: color .14s ease, background .14s ease;
// 			}
// 			.thp-card-links li::before {
// 				content: ""; width: 5px; height: 5px; border-radius: 50%;
// 				background: var(--card-accent, var(--blue)); flex-shrink: 0; opacity: .75;
// 			}
// 			.thp-card-links li:hover { color: var(--card-accent, var(--blue)); background: rgba(22,33,62,0.035); }

// 			/* ── Scrollbar ── */
// 			.thp-content::-webkit-scrollbar { width: 8px; }
// 			.thp-content::-webkit-scrollbar-track { background: transparent; }
// 			.thp-content::-webkit-scrollbar-thumb { background: #d3ddef; border-radius: 4px; border: 2px solid transparent; background-clip: content-box; }
// 			.thp-content::-webkit-scrollbar-thumb:hover { background: #bccbe6; background-clip: content-box; }

// 			@media (max-width: 640px) {
// 				.thp-root { padding: 8px; gap: 8px; }
// 				.thp-content { padding: 14px 8px 24px 6px; }
// 				.thp-topbar-title { font-size: 21px; }
// 				.thp-cards-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; }
// 			}
// 			@media (prefers-reduced-motion: reduce) {
// 				.thp-root *, .thp-root *::after { transition: none !important; }
// 			}
// 		`;
// 		document.head.appendChild(style);
// 	}

// 	// ── Data ────────────────────────────────────────────────────
// 	const NAV_MODULES = [
// 		{ key: 'home', icon: '🏠', label: 'Home' },
// 		{ key: 'accounting', icon: '💰', label: 'Accounting' },
// 		{ key: 'stock', icon: '📦', label: 'Stock' },
// 		{ key: 'crm', icon: '👥', label: 'CRM' },
// 		{ key: 'buying', icon: '🛒', label: 'Buying' },
// 		{ key: 'selling', icon: '🏷️', label: 'Selling' },
// 		{ key: 'manufacturing', icon: '🏭', label: 'Manufacturing' },
// 		{ key: 'hr', icon: '👤', label: 'HR' },
// 		{ key: 'projects', icon: '📊', label: 'Projects' },
// 		{ key: 'assets', icon: '💼', label: 'Assets' },
// 		{ key: 'settings', icon: '⚙️', label: 'Settings' },
// 	];

// 	const SHORTCUTS = [
// 		{ icon: '📦', label: 'Item', route: '/app/item' },
// 		{ icon: '👤', label: 'Customer', route: '/app/customer' },
// 		{ icon: '🏢', label: 'Supplier', route: '/app/supplier' },
// 		{ icon: '🧾', label: 'Sales Invoice', route: '/app/sales-invoice' },
// 		{ icon: '🏆', label: 'Leaderboard', route: '/app/crm-leaderboard' },
// 	];

// 	const MODULE_CARDS = [
// 		{
// 			key: 'accounting',
// 			icon: '💰', accent: '#e8a317', bg: '#fdf3dd',
// 			title: 'Accounting',
// 			links: ['Chart of Accounts', 'Company', 'Customer', 'Supplier'],
// 			routes: ['/app/account', '/app/company', '/app/customer', '/app/supplier'],
// 		},
// 		{
// 			key: 'stock',
// 			icon: '📦', accent: '#1fae5c', bg: '#e3f9ee',
// 			title: 'Stock',
// 			links: ['Item', 'Warehouse', 'Brand', 'Stock Reconciliation'],
// 			routes: ['/app/item', '/app/warehouse', '/app/brand', '/app/stock-reconciliation'],
// 		},
// 		{
// 			key: 'crm',
// 			icon: '🤝', accent: '#8b5cf6', bg: '#efebfe',
// 			title: 'CRM',
// 			links: ['Lead', 'Customer Group', 'Territory'],
// 			routes: ['/app/crm-lead', '/app/customer-group', '/app/territory'],
// 		},
// 		{
// 			key: 'buying',
// 			icon: '🛒', accent: '#e05252', bg: '#fdeaea',
// 			title: 'Buying',
// 			links: ['Purchase Order', 'Supplier Quotation', 'RFQ'],
// 			routes: ['/app/purchase-order', '/app/supplier-quotation', '/app/request-for-quotation'],
// 		},
// 		{
// 			key: 'manufacturing',
// 			icon: '🏭', accent: '#0ba7c4', bg: '#e0f6fb',
// 			title: 'Manufacturing',
// 			links: ['Bill of Materials', 'Work Order', 'Job Card'],
// 			routes: ['/app/bom', '/app/work-order', '/app/job-card'],
// 		},
// 		{
// 			key: 'data_import',
// 			icon: '📥', accent: '#3b6fe0', bg: '#e6eefd',
// 			title: 'Data Import',
// 			links: ['Import Data', 'Letter Head', 'Email Account'],
// 			routes: ['/app/data-import', '/app/letter-head', '/app/email-account'],
// 		},
// 		{
// 			key: 'selling',
// 			icon: '🏷️', accent: '#e0741a', bg: '#fdeee0',
// 			title: 'Selling',
// 			links: ['Sales Order', 'Quotation', 'Customer'],
// 			routes: ['/app/sales-order', '/app/quotation', '/app/customer'],
// 		},
// 		{
// 			key: 'hr',
// 			icon: '👤', accent: '#e0468f', bg: '#fdeaf3',
// 			title: 'HR & Payroll',
// 			links: ['Employee', 'Attendance', 'Payroll Entry', 'Leave Application'],
// 			routes: ['/app/employee', '/app/attendance', '/app/payroll-entry', '/app/leave-application'],
// 		},
// 	];

// 	// ── Layout ──────────────────────────────────────────────────
// 	const $root = $(`
// 		<div class="thp-root">
// 			<nav class="thp-sidebar" id="thp-sidebar"></nav>
// 			<div class="thp-content" id="thp-content"><div class="thp-inner" id="thp-inner"></div></div>
// 		</div>
// 	`);

// 	$(page.body).html('').append($root);

// 	// Measure the real distance from the viewport top and fill everything
// 	// below it - avoids the hard-coded "100vh - 60px" being off by the
// 	// desk's own padding, which is what left a gap at the bottom.
// 	function fit_height() {
// 		if (!$root.is(':visible')) return;
// 		const top = $root[0].getBoundingClientRect().top;
// 		$root.css('height', Math.max(window.innerHeight - top, 320) + 'px');
// 	}
// 	fit_height();
// 	setTimeout(fit_height, 120);
// 	$(window).off('resize.thp').on('resize.thp', frappe.utils.debounce(fit_height, 100));

// 	// Sidebar
// 	const $sidebar = $root.find('#thp-sidebar');
// 	$sidebar.on('mouseenter', () => $root.addClass('nav-open'));
// 	$sidebar.on('mouseleave', () => $root.removeClass('nav-open'));
// 	$sidebar.on('focusin', () => $root.addClass('nav-open'));
// 	$sidebar.on('focusout', () => $root.removeClass('nav-open'));

// 	NAV_MODULES.forEach((m) => {
// 		const $item = $(`
// 			<div class="thp-nav-item${m.key === 'home' ? ' active' : ''}" data-key="${m.key}" tabindex="0" title="${frappe.utils.escape_html(m.label)}">
// 				<span class="thp-icon">${m.icon}</span>
// 				<span class="thp-label">${frappe.utils.escape_html(m.label)}</span>
// 			</div>
// 		`);
// 		const go = () => {
// 			$sidebar.find('.thp-nav-item').removeClass('active');
// 			$item.addClass('active');
// 			if (m.key !== 'home') frappe.set_route('app', m.key.replace('_', '-'));
// 		};
// 		$item.on('click', go);
// 		$item.on('keydown', (e) => { if (e.which === 13) go(); });
// 		$sidebar.append($item);
// 	});

// 	const $inner = $root.find('#thp-inner');

// 	// Top bar
// 	const $topbar = $(`
// 		<div class="thp-topbar">
// 			<div class="thp-topbar-title">Home</div>
// 			<div class="thp-topbar-actions">
// 				<button class="thp-btn" id="thp-customize">Customize</button>
// 				<button class="thp-btn primary" id="thp-new-workspace">Create workspace</button>
// 			</div>
// 		</div>
// 	`);
// 	$topbar.find('#thp-customize').on('click', () => frappe.set_route('List', 'Workspace'));
// 	$topbar.find('#thp-new-workspace').on('click', () => frappe.new_doc('Workspace'));
// 	$inner.append($topbar);

// 	// Shortcuts
// 	const $shortcuts = $('<div class="thp-shortcuts"></div>');
// 	$shortcuts.append('<span class="thp-shortcuts-label">Shortcuts</span>');
// 	SHORTCUTS.forEach((s) => {
// 		const $btn = $(`<button class="thp-shortcut-btn"><span class="sc-icon">${s.icon}</span>${frappe.utils.escape_html(s.label)}</button>`);
// 		$btn.on('click', () => frappe.set_route(s.route));
// 		$shortcuts.append($btn);
// 	});
// 	$inner.append($shortcuts);

// 	// Cards
// 	$inner.append('<div class="thp-section-title">Reports &amp; masters</div>');

// 	const $grid = $('<div class="thp-cards-grid"></div>');
// 	MODULE_CARDS.forEach((card) => {
// 		const linksHtml = card.links
// 			.map((link, i) => `<li data-route="${card.routes[i]}">${frappe.utils.escape_html(link)}</li>`)
// 			.join('');

// 		const $card = $(`
// 			<div class="thp-card" tabindex="0" style="--card-accent:${card.accent}; --card-bg:${card.bg}; --card-tint:${card.accent}22; --card-edge:${card.accent}55;">
// 				<div class="thp-card-header">
// 					<div class="thp-card-icon">${card.icon}</div>
// 					<div class="thp-card-title">${frappe.utils.escape_html(card.title)}</div>
// 				</div>
// 				<ul class="thp-card-links">${linksHtml}</ul>
// 			</div>
// 		`);

// 		const open_module = () => frappe.set_route('app', card.key.replace('_', '-'));
// 		$card.on('click', open_module);
// 		$card.on('keydown', (e) => { if (e.which === 13) open_module(); });

// 		$card.find('.thp-card-links li').on('click', function (e) {
// 			e.stopPropagation();
// 			const route = $(this).data('route');
// 			if (route) frappe.set_route(route);
// 		});

// 		$grid.append($card);
// 	});
// 	$inner.append($grid);
// };
// frappe.pages['theme-home-page'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: '',
// 		single_column: true
// 	});

// 	// Hide default page head/title bar for a clean look
// 	$(wrapper).find('.page-head').hide();

// 	// Inject CSS
// 	if (!document.getElementById('theme-home-page-style')) {
// 		const style = document.createElement('style');
// 		style.id = 'theme-home-page-style';
// 		style.textContent = `
// 			/* ── Reset & Base ── */
// 			.thp-root {
// 				display: flex;
// 				height: calc(100vh - 60px);
// 				background: #f0f4f8;
// 				overflow: hidden;
// 				font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
// 			}

// 			/* ── Sidebar ── */
// 			.thp-sidebar {
// 				display: flex;
// 				flex-direction: column;
// 				align-items: flex-start;
// 				width: 64px;
// 				min-width: 64px;
// 				background: #1a2332;
// 				transition: width 0.32s cubic-bezier(0.4, 0, 0.2, 1);
// 				overflow: hidden;
// 				z-index: 10;
// 				box-shadow: 4px 0 16px rgba(0,0,0,0.18);
// 				padding-top: 12px;
// 			}
// 			.thp-sidebar:hover,
// 			.thp-sidebar.expanded {
// 				width: 220px;
// 			}

// 			/* ── Sidebar Item ── */
// 			.thp-nav-item {
// 				display: flex;
// 				align-items: center;
// 				width: 100%;
// 				height: 52px;
// 				cursor: pointer;
// 				padding: 0 18px;
// 				gap: 14px;
// 				transition: background 0.18s, border-left 0.18s;
// 				border-left: 3px solid transparent;
// 				white-space: nowrap;
// 				position: relative;
// 			}
// 			.thp-nav-item:hover,
// 			.thp-nav-item.active {
// 				background: rgba(255,255,255,0.10);
// 				border-left: 3px solid #4f8ef7;
// 			}
// 			.thp-nav-item .thp-icon {
// 				font-size: 22px;
// 				flex-shrink: 0;
// 				width: 28px;
// 				text-align: center;
// 				filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
// 				transition: transform 0.18s;
// 			}
// 			.thp-nav-item:hover .thp-icon {
// 				transform: scale(1.12);
// 			}
// 			.thp-nav-item .thp-label {
// 				font-size: 13.5px;
// 				font-weight: 500;
// 				color: #c8d6e5;
// 				letter-spacing: 0.01em;
// 				opacity: 0;
// 				transition: opacity 0.22s 0.06s;
// 				pointer-events: none;
// 			}
// 			.thp-sidebar:hover .thp-label,
// 			.thp-sidebar.expanded .thp-label {
// 				opacity: 1;
// 			}
// 			.thp-nav-item.active .thp-label {
// 				color: #ffffff;
// 			}

// 			/* ── Main Content ── */
// 			.thp-content {
// 				flex: 1;
// 				overflow-y: auto;
// 				padding: 28px 32px;
// 				display: flex;
// 				flex-direction: column;
// 				gap: 0;
// 			}

// 			/* ── Top Shortcuts Bar ── */
// 			.thp-shortcuts {
// 				display: flex;
// 				align-items: center;
// 				gap: 10px;
// 				margin-bottom: 24px;
// 				flex-wrap: wrap;
// 			}
// 			.thp-shortcuts-label {
// 				font-size: 11px;
// 				font-weight: 700;
// 				letter-spacing: 0.12em;
// 				color: #8a99b0;
// 				text-transform: uppercase;
// 				margin-right: 4px;
// 			}
// 			.thp-shortcut-btn {
// 				display: inline-flex;
// 				align-items: center;
// 				gap: 6px;
// 				padding: 7px 14px;
// 				background: #fff;
// 				border: 1.5px solid #e2e8f0;
// 				border-radius: 20px;
// 				font-size: 13px;
// 				font-weight: 500;
// 				color: #3a4a5c;
// 				cursor: pointer;
// 				transition: background 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.12s;
// 				box-shadow: 0 1px 3px rgba(0,0,0,0.06);
// 				text-decoration: none;
// 			}
// 			.thp-shortcut-btn:hover {
// 				background: #4f8ef7;
// 				color: #fff;
// 				border-color: #4f8ef7;
// 				box-shadow: 0 4px 12px rgba(79,142,247,0.28);
// 				transform: translateY(-1px);
// 			}
// 			.thp-shortcut-btn .sc-icon { font-size: 15px; }

// 			/* ── Section Title ── */
// 			.thp-section-title {
// 				font-size: 11px;
// 				font-weight: 700;
// 				letter-spacing: 0.12em;
// 				color: #8a99b0;
// 				text-transform: uppercase;
// 				margin-bottom: 16px;
// 				padding-bottom: 6px;
// 				border-bottom: 1.5px solid #e2e8f0;
// 			}

// 			/* ── Cards Grid ── */
// 			.thp-cards-grid {
// 				display: grid;
// 				grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
// 				gap: 18px;
// 				margin-bottom: 8px;
// 			}

// 			/* ── Module Card ── */
// 			.thp-card {
// 				background: #fff;
// 				border-radius: 14px;
// 				border: 1.5px solid #e8edf4;
// 				padding: 20px 20px 16px;
// 				box-shadow: 0 2px 8px rgba(0,0,0,0.05);
// 				transition: transform 0.18s, box-shadow 0.18s, border-color 0.18s;
// 				cursor: pointer;
// 				position: relative;
// 				overflow: hidden;
// 			}
// 			.thp-card::before {
// 				content: '';
// 				position: absolute;
// 				top: 0; left: 0; right: 0;
// 				height: 3px;
// 				background: var(--card-accent, #4f8ef7);
// 				opacity: 0;
// 				transition: opacity 0.18s;
// 			}
// 			.thp-card:hover {
// 				transform: translateY(-3px);
// 				box-shadow: 0 8px 24px rgba(0,0,0,0.10);
// 				border-color: var(--card-accent, #4f8ef7);
// 			}
// 			.thp-card:hover::before { opacity: 1; }

// 			.thp-card-header {
// 				display: flex;
// 				align-items: center;
// 				gap: 10px;
// 				margin-bottom: 14px;
// 			}
// 			.thp-card-icon {
// 				font-size: 26px;
// 				width: 42px;
// 				height: 42px;
// 				display: flex;
// 				align-items: center;
// 				justify-content: center;
// 				background: var(--card-bg, #eef3ff);
// 				border-radius: 10px;
// 				flex-shrink: 0;
// 			}
// 			.thp-card-title {
// 				font-size: 15px;
// 				font-weight: 700;
// 				color: #1a2332;
// 				letter-spacing: -0.01em;
// 			}

// 			.thp-card-links {
// 				list-style: none;
// 				margin: 0; padding: 0;
// 				display: flex;
// 				flex-direction: column;
// 				gap: 4px;
// 			}
// 			.thp-card-links li {
// 				display: flex;
// 				align-items: center;
// 				gap: 6px;
// 				font-size: 12.5px;
// 				color: #4a5a6e;
// 				padding: 3px 0;
// 				cursor: pointer;
// 				transition: color 0.14s, padding-left 0.14s;
// 				border-radius: 4px;
// 			}
// 			.thp-card-links li::before {
// 				content: '•';
// 				color: var(--card-accent, #4f8ef7);
// 				font-size: 14px;
// 				line-height: 1;
// 			}
// 			.thp-card-links li:hover {
// 				color: var(--card-accent, #4f8ef7);
// 				padding-left: 4px;
// 			}

// 			/* Tag badge */
// 			.thp-badge {
// 				display: inline-block;
// 				padding: 2px 8px;
// 				border-radius: 20px;
// 				font-size: 11px;
// 				font-weight: 600;
// 				background: #ff7043;
// 				color: #fff;
// 				margin-left: 4px;
// 			}

// 			/* ── Top action bar ── */
// 			.thp-topbar {
// 				display: flex;
// 				align-items: center;
// 				justify-content: space-between;
// 				margin-bottom: 20px;
// 			}
// 			.thp-topbar-title {
// 				font-size: 20px;
// 				font-weight: 700;
// 				color: #1a2332;
// 			}
// 			.thp-topbar-actions { display: flex; gap: 10px; }
// 			.thp-btn {
// 				padding: 8px 18px;
// 				border-radius: 8px;
// 				border: 1.5px solid #e2e8f0;
// 				background: #fff;
// 				font-size: 13px;
// 				font-weight: 500;
// 				color: #3a4a5c;
// 				cursor: pointer;
// 				transition: background 0.15s, border-color 0.15s;
// 			}
// 			.thp-btn:hover { background: #f0f4f8; border-color: #b0bec5; }
// 			.thp-btn.primary {
// 				background: #4f8ef7;
// 				color: #fff;
// 				border-color: #4f8ef7;
// 			}
// 			.thp-btn.primary:hover { background: #3a7cf0; }

// 			/* scrollbar */
// 			.thp-content::-webkit-scrollbar { width: 6px; }
// 			.thp-content::-webkit-scrollbar-track { background: transparent; }
// 			.thp-content::-webkit-scrollbar-thumb { background: #c8d6e5; border-radius: 3px; }
// 		`;
// 		document.head.appendChild(style);
// 	}

// 	// ── Data ────────────────────────────────────────────────────
// 	const NAV_MODULES = [
// 		{ key: 'home',          icon: '🏠', label: 'Home' },
// 		{ key: 'accounting',    icon: '💰', label: 'Accounting' },
// 		{ key: 'stock',         icon: '🛒', label: 'Stock' },
// 		{ key: 'crm',           icon: '👥', label: 'CRM' },
// 		{ key: 'buying',        icon: '📦', label: 'Buying' },
// 		{ key: 'selling',       icon: '🏷️', label: 'Selling' },
// 		{ key: 'manufacturing', icon: '🏭', label: 'Manufacturing' },
// 		{ key: 'hr',            icon: '👤', label: 'HR' },
// 		{ key: 'projects',      icon: '📊', label: 'Projects' },
// 		{ key: 'assets',        icon: '🚚', label: 'Assets' },
// 		{ key: 'settings',      icon: '⚙️', label: 'Settings' },
// 	];

// 	const SHORTCUTS = [
// 		{ icon: '📦', label: 'Item',         route: '/app/item' },
// 		{ icon: '👤', label: 'Customer',     route: '/app/customer' },
// 		{ icon: '🏢', label: 'Supplier',     route: '/app/supplier' },
// 		{ icon: '🧾', label: 'Sales Invoice', route: '/app/sales-invoice' },
// 		{ icon: '🏆', label: 'Leaderboard',  route: '/app/crm-leaderboard' },
// 	];

// 	const MODULE_CARDS = [
// 		{
// 			key: 'accounting',
// 			icon: '💰', accent: '#f59e0b', bg: '#fef3c7',
// 			title: 'Accounting',
// 			links: ['Chart of Accounts', 'Company', 'Customer', 'Supplier'],
// 			routes: ['/app/account', '/app/company', '/app/customer', '/app/supplier']
// 		},
// 		{
// 			key: 'stock',
// 			icon: '📦', accent: '#10b981', bg: '#d1fae5',
// 			title: 'Stock',
// 			links: ['Item', 'Warehouse', 'Brand', 'Stock Reconciliation'],
// 			routes: ['/app/item', '/app/warehouse', '/app/brand', '/app/stock-reconciliation']
// 		},
// 		{
// 			key: 'crm',
// 			icon: '🤝', accent: '#8b5cf6', bg: '#ede9fe',
// 			title: 'CRM',
// 			links: ['Lead', 'Customer Group', 'Territory'],
// 			routes: ['/app/crm-lead', '/app/customer-group', '/app/territory'],
// 			badges: { 'Territory': '' }
// 		},
// 		{
// 			key: 'buying',
// 			icon: '🛒', accent: '#ef4444', bg: '#fee2e2',
// 			title: 'Buying',
// 			links: ['Purchase Order', 'Supplier Quotation', 'RFQ'],
// 			routes: ['/app/purchase-order', '/app/supplier-quotation', '/app/request-for-quotation']
// 		},
// 		{
// 			key: 'manufacturing',
// 			icon: '🏭', accent: '#06b6d4', bg: '#cffafe',
// 			title: 'Manufacturing',
// 			links: ['Bill of Materials', 'Work Order', 'Job Card'],
// 			routes: ['/app/bom', '/app/work-order', '/app/job-card']
// 		},
// 		{
// 			key: 'data_import',
// 			icon: '📥', accent: '#4f8ef7', bg: '#eef3ff',
// 			title: 'Data Import',
// 			links: ['Import Data', 'Letter Head', 'Email Account'],
// 			routes: ['/app/data-import', '/app/letter-head', '/app/email-account']
// 		},
// 		{
// 			key: 'selling',
// 			icon: '🏷️', accent: '#f97316', bg: '#ffedd5',
// 			title: 'Selling',
// 			links: ['Sales Order', 'Quotation', 'Customer'],
// 			routes: ['/app/sales-order', '/app/quotation', '/app/customer']
// 		},
// 		{
// 			key: 'hr',
// 			icon: '👤', accent: '#ec4899', bg: '#fce7f3',
// 			title: 'HR & Payroll',
// 			links: ['Employee', 'Attendance', 'Payroll Entry', 'Leave Application'],
// 			routes: ['/app/employee', '/app/attendance', '/app/payroll-entry', '/app/leave-application']
// 		},
// 	];

// 	// ── Build HTML ───────────────────────────────────────────────
// 	const $root = $(`
// 		<div class="thp-root">
// 			<nav class="thp-sidebar" id="thp-sidebar"></nav>
// 			<div class="thp-content" id="thp-content"></div>
// 		</div>
// 	`);

// 	$(page.body).html('').append($root);

// 	// Sidebar
// 	const $sidebar = $root.find('#thp-sidebar');
// 	NAV_MODULES.forEach(m => {
// 		const $item = $(`
// 			<div class="thp-nav-item${m.key === 'home' ? ' active' : ''}" data-key="${m.key}">
// 				<span class="thp-icon">${m.icon}</span>
// 				<span class="thp-label">${m.label}</span>
// 			</div>
// 		`);
// 		$item.on('click', function() {
// 			$sidebar.find('.thp-nav-item').removeClass('active');
// 			$(this).addClass('active');
// 			if (m.key !== 'home') {
// 				frappe.set_route('app', m.key.replace('_', '-'));
// 			}
// 		});
// 		$sidebar.append($item);
// 	});

// 	// Content
// 	const $content = $root.find('#thp-content');

// 	// Top bar
// 	$content.append(`
// 		<div class="thp-topbar">
// 			<div class="thp-topbar-title">🏠 Home</div>
// 			<div class="thp-topbar-actions">
// 				<button class="thp-btn">Edit</button>
// 				<button class="thp-btn primary">+ Create Workspace</button>
// 			</div>
// 		</div>
// 	`);

// 	// Shortcuts
// 	const $shortcuts = $(`<div class="thp-shortcuts"></div>`);
// 	$shortcuts.append(`<span class="thp-shortcuts-label">Shortcuts</span>`);
// 	SHORTCUTS.forEach(s => {
// 		const $btn = $(`
// 			<button class="thp-shortcut-btn">
// 				<span class="sc-icon">${s.icon}</span> ${s.label}
// 			</button>
// 		`);
// 		$btn.on('click', () => frappe.set_route(s.route));
// 		$shortcuts.append($btn);
// 	});
// 	$content.append($shortcuts);

// 	// Section title
// 	$content.append(`<div class="thp-section-title">Reports &amp; Masters</div>`);

// 	// Cards grid
// 	const $grid = $(`<div class="thp-cards-grid"></div>`);
// 	MODULE_CARDS.forEach(card => {
// 		const linksHtml = card.links.map((link, i) => {
// 			const badge = (card.badges && card.badges[link] !== undefined)
// 				? `<span class="thp-badge">${link}</span>` : link;
// 			return `<li data-route="${card.routes[i]}">${badge}</li>`;
// 		}).join('');

// 		const $card = $(`
// 			<div class="thp-card" style="--card-accent:${card.accent}; --card-bg:${card.bg}">
// 				<div class="thp-card-header">
// 					<div class="thp-card-icon">${card.icon}</div>
// 					<div class="thp-card-title">${card.title}</div>
// 				</div>
// 				<ul class="thp-card-links">${linksHtml}</ul>
// 			</div>
// 		`);

// 		$card.on('click', function() {
// 			frappe.set_route('app', card.key.replace('_', '-'));
// 		});

// 		$card.find('.thp-card-links li').on('click', function(e) {
// 			e.stopPropagation();
// 			const route = $(this).data('route');
// 			if (route) frappe.set_route(route);
// 		});

// 		$grid.append($card);
// 	});
// 	$content.append($grid);
// };
