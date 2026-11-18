/* Iffi ERP browser-only prototype. All records live in memory and reset on refresh. */
(() => {
  const companies = [
    { name: "Iffi Naturals (Pvt.) Ltd.", city: "Lahore", ntn: "7128456-2", phone: "+92 42 3576 8012", email: "hello@iffinaturals.pk", bank: "HBL — Gulberg Branch", country: "Pakistan", address: "28-B, Gulberg III, Lahore" },
    { name: "Iffi Labs", city: "Karachi", ntn: "4382190-8", phone: "+92 21 3452 0090", email: "ops@iffilabs.pk", bank: "Meezan Bank", country: "Pakistan", address: "Suite 402, Clifton, Karachi" }
  ];
  let activeCompany = companies[0];
  const customers = [
    { name:"Sana Beauty Co.", number:"CUS-00031", email:"orders@sanabeauty.pk", city:"Lahore", status:"Active", quotes:5 },
    { name:"The Botanica Store", number:"CUS-00028", email:"procurement@botanica.pk", city:"Islamabad", status:"Active", quotes:3 },
    { name:"Glow & Grace", number:"CUS-00024", email:"hello@glowgrace.pk", city:"Karachi", status:"Active", quotes:4 },
    { name:"Nura Organics", number:"CUS-00019", email:"team@nura.pk", city:"Faisalabad", status:"Active", quotes:2 },
    { name:"Olive & Oak Retail", number:"CUS-00015", email:"buying@oliveoak.pk", city:"Lahore", status:"Archived", quotes:1 }
  ];
  const vendors = [
    { name:"Pak Aroma Ingredients", number:"VEN-00016", email:"sales@pakaroma.com", city:"Lahore", phone:"+92 42 3722 4018", bank:"UBL", country:"Pakistan", ntn:"3276154-1", status:"Active" },
    { name:"PureChem Traders", number:"VEN-00012", email:"orders@purechem.pk", city:"Karachi", phone:"+92 21 3231 6670", bank:"Bank Alfalah", country:"Pakistan", ntn:"7120669-8", status:"Active" },
    { name:"GlassPak Packaging", number:"VEN-00009", email:"info@glasspak.pk", city:"Gujranwala", phone:"+92 55 325 9980", bank:"HBL", country:"Pakistan", ntn:"1849320-4", status:"Active" },
    { name:"LabelCraft", number:"VEN-00006", email:"hello@labelcraft.pk", city:"Lahore", phone:"+92 42 3588 2160", bank:"Meezan Bank", country:"Pakistan", ntn:"6931208-2", status:"Active" }
  ];
  const ingredients = [
    { name:"Aloe Vera Extract", code:"ING-0018", price:1850, vendor:"Pak Aroma Ingredients", updated:"18 Nov 2026", status:"Active" },
    { name:"Shea Butter (Refined)", code:"ING-0015", price:2640, vendor:"PureChem Traders", updated:"16 Nov 2026", status:"Active" },
    { name:"Jojoba Oil", code:"ING-0012", price:4280, vendor:"Pak Aroma Ingredients", updated:"12 Nov 2026", status:"Active" },
    { name:"Vitamin E (Tocopherol)", code:"ING-0009", price:6900, vendor:"PureChem Traders", updated:"10 Nov 2026", status:"Active" },
    { name:"Lavender Essential Oil", code:"ING-0007", price:8750, vendor:"Pak Aroma Ingredients", updated:"08 Nov 2026", status:"Active" },
    { name:"Glycerin, Vegetable", code:"ING-0004", price:720, vendor:"PureChem Traders", updated:"02 Nov 2026", status:"Active" }
  ];
  const products = [
    { name:"Botanical Glow Serum", code:"PRD-0011", category:"Skincare", recipe:"RC-0011 · v3", cost:412, status:"Approved" },
    { name:"Aloe Daily Moisturizer", code:"PRD-0008", category:"Skincare", recipe:"RC-0008 · v2", cost:286, status:"Approved" },
    { name:"Lavender Hand Cream", code:"PRD-0005", category:"Body care", recipe:"RC-0005 · v1", cost:198, status:"In review" },
    { name:"Rose Hydration Mist", code:"PRD-0003", category:"Skincare", recipe:"RC-0003 · v4", cost:154, status:"Approved" }
  ];
  const slabs = [
    { min:1,max:5,label:"1–5 kg",unit:790 },
    { min:6,max:10,label:"6–10 kg",unit:720 },
    { min:11,max:15,label:"11–15 kg",unit:675 },
    { min:16,max:20,label:"16–20 kg",unit:640 },
    { min:21,max:30,label:"21–30 kg",unit:610 },
    { min:31,max:9999,label:"Above 30 kg",unit:580 }
  ];
  let quotes = [
    { ref:"QT-2026-0048", customer:"Sana Beauty Co.", product:"Botanical Glow Serum", quantity:10, units:100, date:"18 Nov 2026", total:74800, status:"Submitted", recipe:"Botanical Glow Serum" },
    { ref:"QT-2026-0047", customer:"The Botanica Store", product:"Aloe Daily Moisturizer", quantity:5, units:50, date:"17 Nov 2026", total:38400, status:"Approved", recipe:"Aloe Daily Moisturizer" },
    { ref:"QT-2026-0046", customer:"Glow & Grace", product:"Lavender Hand Cream", quantity:8, units:80, date:"16 Nov 2026", total:52200, status:"Draft", recipe:"Lavender Hand Cream" },
    { ref:"QT-2026-0045", customer:"Sana Beauty Co.", product:"Botanical Glow Serum", quantity:6, units:60, date:"13 Nov 2026", total:45900, status:"Approved", recipe:"Botanical Glow Serum" },
    { ref:"QT-2026-0044", customer:"Nura Organics", product:"Rose Hydration Mist", quantity:12, units:120, date:"12 Nov 2026", total:58700, status:"Rejected", recipe:"Rose Hydration Mist" }
  ];
  let invoices = [
    { no:"INV-2026-0028", customer:"The Botanica Store", date:"10 Nov 2026", due:"10 Dec 2026", total:38400, paid:20000, status:"Partially Paid", item:"Aloe Daily Moisturizer · 50 units" },
    { no:"INV-2026-0027", customer:"Sana Beauty Co.", date:"02 Nov 2026", due:"02 Dec 2026", total:74800, paid:74800, status:"Paid", item:"Botanical Glow Serum · 100 units" },
    { no:"INV-2026-0026", customer:"Glow & Grace", date:"28 Oct 2026", due:"12 Nov 2026", total:52200, paid:0, status:"Overdue", item:"Lavender Hand Cream · 80 units" },
    { no:"INV-2026-0025", customer:"Nura Organics", date:"21 Oct 2026", due:"20 Nov 2026", total:58700, paid:0, status:"Issued", item:"Rose Hydration Mist · 120 units" }
  ];
  let payments = [
    { ref:"PAY-2026-0033", date:"14 Nov 2026", party:"Sana Beauty Co.", invoice:"INV-2026-0027", method:"Bank transfer", amount:74800, status:"Confirmed" },
    { ref:"PAY-2026-0031", date:"13 Nov 2026", party:"The Botanica Store", invoice:"INV-2026-0028", method:"Cheque", amount:20000, status:"Confirmed" },
    { ref:"PAY-2026-0029", date:"06 Nov 2026", party:"Pak Aroma Ingredients", invoice:"Vendor payment", method:"Bank transfer", amount:32500, status:"Confirmed", type:"Vendor" }
  ];
  const quoteHistory = {
    "Sana Beauty Co.": { product:"Botanical Glow Serum", quantity:10, units:100, labour:5200, design:1800, packaging:12500, label:3500, box:2800, carton:1600, transport:1800, selling:748 },
    "The Botanica Store": { product:"Aloe Daily Moisturizer", quantity:5, units:50, labour:3000, design:1200, packaging:6500, label:1800, box:1500, carton:900, transport:1200, selling:768 },
    "Glow & Grace": { product:"Lavender Hand Cream", quantity:8, units:80, labour:3800, design:1000, packaging:8200, label:2400, box:1900, carton:1100, transport:1400, selling:652.5 },
    "Nura Organics": { product:"Rose Hydration Mist", quantity:12, units:120, labour:4600, design:1400, packaging:10800, label:3200, box:2200, carton:1500, transport:1600, selling:489.17 }
  };
  let currentPage = "dashboard";
  let selectedInvoice = null;
  let ingredientRows = [];
  let toastBootstrap;
  const app = document.getElementById("app");
  const money = n => "Rs " + Number(n || 0).toLocaleString("en-PK", { maximumFractionDigits:0 });
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  const statusClass = s => ({ "Approved":"", "Paid":"", "Confirmed":"", "Active":"", "Submitted":"warning", "Partially Paid":"warning", "In review":"info", "Issued":"info", "Draft":"neutral", "Archived":"neutral", "Overdue":"danger", "Rejected":"danger", "Reversed":"danger", "Cancelled":"neutral" }[s] ?? "neutral");
  const statusPill = s => `<span class="status ${statusClass(s)}"><span>●</span>${esc(s)}</span>`;
  const selectOptions = (items, selected) => items.map(v => `<option ${v===selected?"selected":""}>${esc(v)}</option>`).join("");
  function showToast(message) {
    const node = document.createElement("div");
    node.className = "toast align-items-center text-bg-white";
    node.setAttribute("role","status");
    node.innerHTML = `<div class="d-flex"><div class="toast-body"><i class="bi bi-check-circle-fill text-success me-2"></i>${esc(message)}</div><button class="btn-close me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
    document.getElementById("toast-container").appendChild(node);
    const toast = new bootstrap.Toast(node,{delay:2600}); toast.show();
    node.addEventListener("hidden.bs.toast",()=>node.remove());
  }
  function navItem(id,label,icon) { return `<a class="nav-link ${currentPage===id?"active":""}" data-page="${id}"><i class="bi ${icon}"></i><span>${label}</span></a>`; }
  function appShell(content) {
    app.innerHTML = `<div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand"><div class="brand-mark">i</div><div><div class="brand-name">iffi</div><div class="brand-tag">Business workspace</div></div></div>
        <div class="side-nav">
          <div class="nav-caption">Workspace</div>${navItem("dashboard","Overview","bi-grid-1x2")}
          <div class="nav-caption">Sales & finance</div>${navItem("quickquote","Quick Quote","bi-lightning-charge")}${navItem("quotations","Quotations","bi-file-earmark-text")}${navItem("invoices","Invoices","bi-receipt")}${navItem("payments","Payments","bi-wallet2")}
          <div class="nav-caption">Catalogue</div>${navItem("customers","Customers","bi-people")}${navItem("vendors","Vendors","bi-truck")}${navItem("products","Products & recipes","bi-box-seam")}${navItem("ingredients","Ingredients","bi-droplet")}${navItem("slabs","Weight pricing","bi-sliders")}
          <div class="nav-caption">Administration</div>${navItem("companies","Companies","bi-buildings")}
        </div>
        <div class="side-bottom"><div class="workspace-note"><div class="avatar">AS</div><div><div style="font-size:11px;font-weight:700">Ayesha Siddiqui</div><div style="font-size:10px;color:#87928c">Company administrator</div></div><i class="bi bi-three-dots ms-auto text-secondary"></i></div></div>
      </aside>
      <main class="main-area">
        <header class="topbar"><div class="top-left"><button class="icon-btn mobile-menu" id="mobile-menu" aria-label="Toggle menu"><i class="bi bi-list"></i></button><select class="company-select" id="company-select" aria-label="Active company">${companies.map((c,i)=>`<option value="${i}" ${c===activeCompany?"selected":""}>${esc(c.name)}</option>`).join("")}</select><span class="date-label"><i class="bi bi-calendar3 me-1"></i> Wednesday, 18 November 2026</span></div>
          <div class="top-right"><button class="icon-btn" title="Notifications" id="notifications"><i class="bi bi-bell"></i></button><div class="user-chip"><div class="avatar">AS</div><div class="top-user-name"><div style="font-size:11px;font-weight:700">Ayesha Siddiqui</div><div style="font-size:10px;color:#87928c">Administrator</div></div><button class="icon-btn" id="logout" title="Log out"><i class="bi bi-box-arrow-right"></i></button></div></div>
        </header><div class="content">${content}</div>
      </main>
    </div>`;
    app.querySelectorAll("[data-page]").forEach(el => el.addEventListener("click",()=>navigate(el.dataset.page)));
    document.getElementById("company-select").addEventListener("change",e=>{activeCompany=companies[Number(e.target.value)];currentPage="dashboard";render();showToast(`Switched workspace to ${activeCompany.name}`);});
    document.getElementById("mobile-menu").addEventListener("click",()=>document.getElementById("sidebar").classList.toggle("open"));
    document.getElementById("logout").addEventListener("click",renderLogin);
    document.getElementById("notifications").addEventListener("click",()=>showToast("You're all caught up."));
  }
  function navigate(page) { currentPage=page; selectedInvoice=null; render(); window.scrollTo({top:0,behavior:"smooth"}); }
  function heading(eyebrow,title,subtitle,action="") { return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p class="page-subtitle">${subtitle}</p></div>${action}</div>`; }
  function pageAction(label,icon,id) { return `<button class="btn btn-primary" id="${id}"><i class="bi ${icon} me-1"></i>${label}</button>`; }
  function dashboard() {
    const pending=quotes.filter(q=>q.status==="Submitted").length;
    return `${heading("Wednesday, 18 November 2026","Good morning, Ayesha <span style='color:var(--green)'>👋</span>","Here’s what’s happening across your business today.",pageAction("Create quick quote","bi-plus-lg","dash-quote"))}
      <div class="stat-grid">
        ${statCard("Customers",customers.length,"bi-people","+2 this month","up")}${statCard("Vendors",vendors.length,"bi-truck","Across 4 categories","")}
        ${statCard("Ingredients",ingredients.length,"bi-droplet","2 price updates this week","")}${statCard("Products",products.length,"bi-box-seam","3 approved recipes","")}
      </div>
      <div class="stat-grid" style="grid-template-columns:repeat(4,minmax(0,1fr));margin-top:-5px">
        ${statCard("Pending quotations",pending,"bi-file-earmark-text","Needs review","up")}${statCard("Approved this month","12","bi-patch-check","Rs 486,200 total","")}
        ${statCard("Outstanding invoices",money(128900),"bi-receipt","3 invoices due","")}${statCard("Received this month",money(193500),"bi-wallet2","+12.8% vs last month","up")}
      </div>
      <div class="dashboard-grid">
        <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Sales overview</h3><div class="panel-sub">Quotation value · last 6 months</div></div><div class="chart-legend"><span><i class="legend-dot"></i>Quoted</span><span><i class="legend-dot gold"></i>Invoiced</span></div></div>
          <div class="chart-area"><div class="bar-chart">${[[45,27],[63,39],[51,34],[76,54],[66,43],[91,68]].map(v=>`<div class="bar-group"><div class="bar" style="height:${v[0]}%"></div><div class="bar alt" style="height:${v[1]}%"></div></div>`).join("")}</div><div class="chart-labels"><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span></div></div></section>
        <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Recent activity</h3><div class="panel-sub">Latest updates in your workspace</div></div><button class="btn btn-light" id="activity-view">View all</button></div>
          <div class="activity-list">${activity("bi-file-earmark-plus","<b>New quotation</b> QT-2026-0048 created for Sana Beauty Co.","10 min ago")}${activity("bi-wallet2","<b>Payment received</b> Rs 20,000 from The Botanica Store.","2 hours ago")}${activity("bi-droplet","<b>Ingredient price updated</b> Aloe Vera Extract · Rs 1,850/kg","Yesterday")}${activity("bi-patch-check","<b>Quotation approved</b> QT-2026-0047 is ready to invoice.","Yesterday")}</div></section>
      </div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Recent quotations</h3><div class="panel-sub">Track your latest sales opportunities</div></div><button class="btn btn-light" id="all-quotes">View quotations <i class="bi bi-arrow-right ms-1"></i></button></div>${quoteTable(quotes.slice(0,4))}</section>`;
  }
  function statCard(label,value,icon,foot,trend) { return `<div class="card-panel stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon"><i class="bi ${icon}"></i></span></div><div class="stat-value">${value}</div><div class="stat-foot">${trend?`<span class="trend"><i class="bi bi-arrow-up-right"></i> ${foot.split(" ")[0]}</span>${foot.substring(foot.indexOf(" "))}`:foot}</div></div>`; }
  function activity(icon,text,time) { return `<div class="activity-item"><div class="activity-icon"><i class="bi ${icon}"></i></div><div class="activity-copy">${text}</div><span class="activity-time">${time}</span></div>`; }
  function quoteTable(rows) {
    return `<div class="table-wrap"><table class="table"><thead><tr><th>Quotation</th><th>Customer</th><th>Product</th><th>Date</th><th>Value</th><th>Status</th></tr></thead><tbody>${rows.map(q=>`<tr><td><span class="table-name">${q.ref}</span></td><td>${esc(q.customer)}</td><td>${esc(q.product)}</td><td>${q.date}</td><td class="table-name">${money(q.total)}</td><td>${statusPill(q.status)}</td></tr>`).join("")}</tbody></table></div>`;
  }
  function genericListPage(kind) {
    const config={
      customers:{title:"Customer Management",sub:"Manage customer profiles and follow their quotation history.",data:customers,cols:["Customer","Customer no.","Email","City","Quotes","Status"],action:"Add customer"},
      vendors:{title:"Vendor Management",sub:"Keep your vendor contacts and business details up to date.",data:vendors,cols:["Vendor","Vendor no.","Email","City","Phone","Status"],action:"Add vendor"},
      companies:{title:"Company Management",sub:"Manage company profiles and the details used on business documents.",data:companies,cols:["Company","NTN","Email","City","Phone","Country"],action:"Add company"}
    }[kind];
    const rows=config.data.map(x=>{
      if(kind==="customers") return [x.name,x.number,x.email,x.city,x.quotes,statusPill(x.status)];
      if(kind==="vendors") return [x.name,x.number,x.email,x.city,x.phone,statusPill(x.status)];
      return [x.name,x.ntn,x.email,x.city,x.phone,x.country];
    });
    const headers=`<tr>${config.cols.map(x=>`<th>${x}</th>`).join("")}<th></th></tr>`;
    return `${heading("Administration",config.title,config.sub,pageAction(config.action,"bi-plus-lg","add-record"))}
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">${config.data.length} records</h3><div class="panel-sub">Search, view and maintain your ${kind}</div></div><div class="filter-row"><div class="search-box"><i class="bi bi-search"></i><input id="record-search" class="form-control" placeholder="Search ${kind}..."></div><button class="btn btn-light" id="export-list"><i class="bi bi-download me-1"></i>Export</button></div></div>
      <div class="table-wrap"><table class="table" id="records-table"><thead>${headers}</thead><tbody>${rows.map((r,i)=>`<tr>${r.map((v,j)=>`<td>${j===0?`<span class="table-name">${esc(v)}</span>`:v}</td>`).join("")}<td><button class="icon-btn record-view" data-index="${i}" title="View details"><i class="bi bi-arrow-up-right"></i></button></td></tr>`).join("")}</tbody></table></div></section>
      ${kind==="customers"?`<div class="help-copy mt-3"><i class="bi bi-info-circle me-1"></i>Archived customers remain available in transaction history and can’t be hard-deleted.</div>`:""}`;
  }
  function catalogPage(kind) {
    if(kind==="ingredients") return `${heading("Catalogue","Ingredient management","Manage your raw materials, vendor pricing and price history.",pageAction("Add ingredient","bi-plus-lg","add-ingredient"))}
      <div class="d-flex gap-2 flex-wrap mb-3"><div class="card-panel mini-kpi"><div class="mini-kpi-label">Active ingredients</div><div class="mini-kpi-value">${ingredients.length}</div></div><div class="card-panel mini-kpi"><div class="mini-kpi-label">Price updates this month</div><div class="mini-kpi-value">8</div></div><div class="card-panel mini-kpi"><div class="mini-kpi-label">Linked vendors</div><div class="mini-kpi-value">2</div></div></div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Ingredients</h3><div class="panel-sub">Prices shown in PKR per kilogram · latest vendor price</div></div><div class="filter-row"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="record-search" placeholder="Search ingredients..."></div><button class="btn btn-light" id="price-history"><i class="bi bi-clock-history me-1"></i>Price history</button></div></div>
      <div class="table-wrap"><table class="table" id="records-table"><thead><tr><th>Ingredient</th><th>Code</th><th>Price / kg</th><th>Vendor</th><th>Last updated</th><th>Status</th><th></th></tr></thead><tbody>${ingredients.map((x,i)=>`<tr><td class="table-name">${x.name}</td><td>${x.code}</td><td class="table-name">${money(x.price)}</td><td>${x.vendor}</td><td>${x.updated}</td><td>${statusPill(x.status)}</td><td><button class="icon-btn ingredient-edit" data-index="${i}"><i class="bi bi-pencil"></i></button></td></tr>`).join("")}</tbody></table></div></section>`;
    if(kind==="products") return `${heading("Catalogue","Products & recipes","Build approved BOMs and understand ingredient cost at a glance.",pageAction("New recipe","bi-plus-lg","new-recipe"))}
      <div class="d-flex gap-2 mb-3"><button class="btn btn-primary" id="product-tab">Products & recipes</button><button class="btn btn-light" id="open-slabs">Weight price slabs</button></div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Product catalogue</h3><div class="panel-sub">Products link to versioned, costed ingredient recipes</div></div><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="record-search" placeholder="Search products..."></div></div>
      <div class="table-wrap"><table class="table" id="records-table"><thead><tr><th>Product</th><th>Code</th><th>Category</th><th>Recipe version</th><th>Cost / unit</th><th>Approval</th><th></th></tr></thead><tbody>${products.map((p,i)=>`<tr><td class="table-name">${p.name}</td><td>${p.code}</td><td>${p.category}</td><td>${p.recipe}</td><td class="table-name">${money(p.cost)}</td><td>${statusPill(p.status)}</td><td><button class="icon-btn product-edit" data-index="${i}" title="Edit recipe"><i class="bi bi-pencil"></i></button></td></tr>`).join("")}</tbody></table></div></section>
      <div class="help-copy mt-3"><i class="bi bi-shield-check me-1"></i>Recipe edits create a new version. Approved recipes are preserved for quotation and audit history.</div>`;
  }
  function slabsPage() {
    return `${heading("Pricing configuration","Weight-based price slabs","Configure non-overlapping quantity ranges and their selling price per unit.",pageAction("Add price slab","bi-plus-lg","add-slab"))}
      <div class="alert alert-success py-2 px-3" style="font-size:11px;border:0;background:#eaf4ee;color:#356b50"><i class="bi bi-info-circle me-1"></i>Exactly one active slab is applied using the actual order weight. Prices are illustrative and configurable.</div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Active pricing schedule</h3><div class="panel-sub">PKR per finished unit · valid from 01 Oct 2026</div></div><span class="status">6 active slabs</span></div>
      <div class="table-wrap"><table class="table"><thead><tr><th>Quantity range</th><th>Lower bound</th><th>Upper bound</th><th>Price / unit</th><th>Effective from</th><th>Status</th><th></th></tr></thead><tbody>${slabs.map((s,i)=>`<tr><td><span class="slab-range">${s.label}</span></td><td>${s.min} kg</td><td>${s.max===9999?"No limit":s.max+" kg"}</td><td class="table-name">${money(s.unit)}</td><td>01 Oct 2026</td><td>${statusPill("Active")}</td><td><button class="icon-btn slab-edit" data-index="${i}"><i class="bi bi-pencil"></i></button></td></tr>`).join("")}</tbody></table></div></section>
      <div class="help-copy mt-3"><i class="bi bi-exclamation-circle me-1"></i>Business confirmation is needed for the 20 kg boundary; current prototype assigns 20 kg to the 16–20 kg slab.</div>`;
  }
  function quickQuote() {
    const customer = document.getElementById("quote-customer")?.value || customers[0].name;
    if (window.quoteLoadedCustomer === undefined && !window.quoteDraft) window.quoteLoadedCustomer = customer;
    const hist=quoteHistory[customer];
    const blank={product:products[0].name,quantity:1,units:1,labour:0,design:0,packaging:0,label:0,box:0,carton:0,transport:0,selling:0};
    const data=window.quoteDraft || (window.quoteLoadedCustomer===null?blank:(hist?{...hist}:blank));
    const isLoaded=window.quoteLoadedCustomer===customer;
    const product=products.find(x=>x.name===data.product)||products[0];
    const ingredientCost=Math.round(product.cost*(Number(data.units)||1));
    const labour=Number(data.labour)||0, design=Number(data.design)||0, packaging=Number(data.packaging)||0, label=Number(data.label)||0, box=Number(data.box)||0, carton=Number(data.carton)||0, transport=Number(data.transport)||0;
    const total=ingredientCost+labour+design+packaging+label+box+carton+transport;
    const units=Math.max(1,Number(data.units)||1);
    const sellUnit=Number(data.selling)||0;
    const sellTotal=sellUnit*units;
    const profit=sellTotal-total;
    return `${heading("Sales · Quick Quote","Quick Quote","Create a costed quotation. Selecting a customer loads their latest saved quote as a new editable copy.",`<button class="btn btn-light me-1" id="reset-quote"><i class="bi bi-arrow-counterclockwise me-1"></i>Reset</button><button class="btn btn-primary" id="save-quote"><i class="bi bi-check2 me-1"></i>Save quotation</button>`)}
      <div class="quote-layout"><section class="card-panel">
        <div class="quote-section"><div class="section-label"><span class="section-number">1</span>Customer & product</div><div class="row g-3">
          <div class="col-md-6"><label class="form-label">Customer <span class="text-danger">*</span></label><select class="form-select" id="quote-customer">${selectOptions(customers.filter(c=>c.status==="Active").map(c=>c.name),customer)}</select><div class="form-hint">${isLoaded?"Latest saved quote loaded as an editable copy.":"No prior quote found; a blank quote is ready."}</div></div>
          <div class="col-md-6"><label class="form-label">Quote date & time</label><input class="form-control readonly" value="18 Nov 2026 · 05:09 PM" readonly></div>
          <div class="col-md-6"><label class="form-label">Product / recipe</label><select id="quote-product" class="form-select">${selectOptions(products.map(p=>p.name),product.name)}</select></div>
          <div class="col-md-3"><label class="form-label">Actual weight (kg)</label><input id="quote-quantity" class="form-control" type="number" min="1" value="${data.quantity}"></div>
          <div class="col-md-3"><label class="form-label">Total units</label><input id="quote-units" class="form-control" type="number" min="1" value="${data.units}"></div>
        </div></div>
        <div class="quote-section"><div class="section-label"><span class="section-number">2</span>Production & packaging costs <span class="ms-auto status">${slabs.find(s=>Number(data.quantity)>=s.min&&Number(data.quantity)<=s.max)?.label||"No slab"}</span></div>
          <div class="row g-3">
          ${costInput("Labour cost","labour",labour)}${costInput("Design cost","design",design)}${costInput("Bottle / jar / tube","packaging",packaging)}${costInput("Label cost","label",label)}${costInput("Box cost","box",box)}${costInput("Carton cost","carton",carton)}${costInput("Transportation","transport",transport)}${costInput("Selling price / unit","selling",sellUnit)}
          </div></div>
        <div class="quote-section"><div class="section-label"><span class="section-number">3</span>Costing summary</div>
          <div class="detail-grid"><div class="detail-box"><div class="detail-label">Ingredient cost</div><div class="detail-value">${money(ingredientCost)}</div></div><div class="detail-box"><div class="detail-label">Total production cost</div><div class="detail-value">${money(total)}</div></div><div class="detail-box"><div class="detail-label">Cost / unit</div><div class="detail-value">${money(total/units)}</div></div></div>
        </div>
      </section>
      <aside class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Quotation summary</h3><div class="panel-sub">Estimate · ex. tax</div></div><i class="bi bi-receipt text-success fs-5"></i></div>
        <div class="px-3 pb-3"><div class="detail-box mb-3"><div class="detail-label">Customer</div><div class="detail-value">${esc(customer)}</div><div class="detail-label mt-2">Price slab</div><div class="detail-value">${slabs.find(s=>Number(data.quantity)>=s.min&&Number(data.quantity)<=s.max)?.label||"—"}</div></div>
          <div class="total-row"><span>Ingredient cost</span><b>${money(ingredientCost)}</b></div><div class="total-row"><span>Labour & design</span><b>${money(labour+design)}</b></div><div class="total-row"><span>Packaging & delivery</span><b>${money(packaging+label+box+carton+transport)}</b></div>
          <div class="total-row"><span>Per-unit cost</span><b>${money(total/units)}</b></div><div class="total-row"><span>Selling price / unit</span><b>${money(sellUnit)}</b></div><div class="total-row grand"><span>Quotation total<br><small style="font-weight:400;color:#87928b">${units} units</small></span><strong>${money(sellTotal)}</strong></div>
          <div class="d-flex justify-content-between mt-3 pt-2" style="font-size:11px"><span>Estimated profit</span><b class="${profit<0?"text-danger":"text-success"}">${money(profit)} (${sellTotal?Math.round(profit/sellTotal*100):0}%)</b></div>
        </div><div class="quote-total"><div class="help-copy"><i class="bi bi-lightbulb me-1 text-success"></i>Update any cost to recalculate totals. Saved quotes are separate records; existing history is unchanged.</div></div>
      </aside></div>`;
  }
  function costInput(label,id,value) { return `<div class="col-sm-6 col-lg-3"><label class="form-label">${label}</label><div class="input-group input-group-sm"><span class="input-group-text">Rs</span><input id="quote-${id}" type="number" min="0" step="1" class="form-control quote-cost" value="${value}"></div></div>`; }
  function quotationsPage() { return `${heading("Sales","Quotation management","Review quote history, status and value across your active company.",pageAction("Create quotation","bi-plus-lg","new-quote"))}
    <div class="filter-row mb-3"><div class="search-box"><i class="bi bi-search"></i><input id="record-search" class="form-control" placeholder="Search quotations..."></div><select class="form-select" id="status-filter" style="width:155px"><option>All statuses</option>${["Draft","Submitted","Approved","Rejected"].map(s=>`<option>${s}</option>`).join("")}</select></div>
    <section class="card-panel">${quoteTable(quotes)}</section>
    <div class="help-copy mt-3"><i class="bi bi-info-circle me-1"></i>Approved quotations are preserved; edits should be made as a new revision. Approval trail and PDF generation are represented in this prototype.</div>`;
  }
  function invoicesPage() {
    if(selectedInvoice) return invoiceDetail(selectedInvoice);
    return `${heading("Finance","Invoice management","Create invoices from approved sales and keep an eye on payment status.",pageAction("New invoice","bi-plus-lg","new-invoice"))}
      <div class="invoice-summary"><div class="card-panel"><div class="mini-kpi-label">Invoice total</div><div class="mini-kpi-value">${money(invoices.reduce((a,x)=>a+x.total,0))}</div></div><div class="card-panel"><div class="mini-kpi-label">Paid</div><div class="mini-kpi-value text-success">${money(invoices.reduce((a,x)=>a+x.paid,0))}</div></div><div class="card-panel"><div class="mini-kpi-label">Outstanding</div><div class="mini-kpi-value">${money(invoices.reduce((a,x)=>a+x.total-x.paid,0))}</div></div><div class="card-panel"><div class="mini-kpi-label">Overdue</div><div class="mini-kpi-value text-danger">1 invoice</div></div></div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Invoices</h3><div class="panel-sub">${invoices.length} invoices · balances update when payments are allocated</div></div><div class="filter-row"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="record-search" placeholder="Search invoices..."></div></div></div>
      <div class="table-wrap"><table class="table" id="invoice-table"><thead><tr><th>Invoice</th><th>Customer</th><th>Issue date</th><th>Due date</th><th>Total</th><th>Balance</th><th>Status</th><th></th></tr></thead><tbody>${invoices.map((i,n)=>`<tr><td class="table-name">${i.no}</td><td>${i.customer}</td><td>${i.date}</td><td>${i.due}</td><td class="table-name">${money(i.total)}</td><td class="${i.total-i.paid?"text-danger":"text-success"}">${money(i.total-i.paid)}</td><td>${statusPill(invoiceStatus(i))}</td><td><button class="btn btn-light invoice-open" data-index="${n}">View</button></td></tr>`).join("")}</tbody></table></div></section>`;
  }
  function invoiceStatus(i) { if(i.paid>=i.total)return "Paid";if(i.paid>0)return "Partially Paid";return i.status; }
  function invoiceDetail(i) {
    const balance=i.total-i.paid;
    return `${heading("Finance · Invoices",`Invoice ${i.no}`,`${i.customer} · Issued ${i.date}`,`<button class="btn btn-light me-1" id="back-invoices"><i class="bi bi-arrow-left me-1"></i>Back to invoices</button><button class="btn btn-primary" id="invoice-pay" ${balance<=0?"disabled":""}><i class="bi bi-wallet2 me-1"></i>Record payment</button>`)}
      <div class="quote-layout"><section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Invoice details</h3><div class="panel-sub">Payment due ${i.due}</div></div>${statusPill(invoiceStatus(i))}</div><div class="px-3 pb-3">
        <div class="detail-grid mb-4"><div class="detail-box"><div class="detail-label">Customer</div><div class="detail-value">${i.customer}</div></div><div class="detail-box"><div class="detail-label">Invoice date</div><div class="detail-value">${i.date}</div></div><div class="detail-box"><div class="detail-label">Due date</div><div class="detail-value">${i.due}</div></div></div>
        <div class="line-items-box"><div class="table-wrap"><table class="table"><thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Amount</th></tr></thead><tbody><tr><td class="table-name">${i.item.split(" · ")[0]}<span class="table-muted">Approved quotation item</span></td><td>${i.item.split(" · ")[1]?.split(" ")[0]||1}</td><td>${money(i.total/(Number(i.item.match(/\\d+/)?.[0])||1))}</td><td class="table-name">${money(i.total)}</td></tr></tbody></table></div></div>
        <div class="d-flex justify-content-end"><div style="width:250px"><div class="total-row"><span>Subtotal</span><b>${money(i.total)}</b></div><div class="total-row"><span>Tax</span><b>${money(0)}</b></div><div class="total-row grand"><span>Invoice total</span><strong>${money(i.total)}</strong></div><div class="total-row"><span>Paid</span><b class="text-success">${money(i.paid)}</b></div><div class="total-row"><span>Outstanding</span><b class="text-danger">${money(balance)}</b></div></div></div>
      </div></section><aside class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Company details</h3><div class="panel-sub">Printed on invoice</div></div></div><div class="px-3 pb-3"><div class="detail-value">${esc(activeCompany.name)}</div><div class="help-copy mt-2">${esc(activeCompany.address)}<br>NTN ${activeCompany.ntn}<br>${activeCompany.email}<br>${activeCompany.bank}</div><hr><div class="section-label">Payment history</div>${payments.filter(p=>p.invoice===i.no).length?payments.filter(p=>p.invoice===i.no).map(p=>`<div class="activity-item"><div class="activity-icon"><i class="bi bi-check2"></i></div><div class="activity-copy"><b>${money(p.amount)}</b><br>${p.method} · ${p.date}</div>${statusPill(p.status)}</div>`).join(""):`<div class="help-copy">No payments allocated yet.</div>`}</div></aside></div>`;
  }
  function paymentsPage() {
    return `${heading("Finance","Payment management","Record customer receipts and vendor payments with allocation references.",pageAction("Record payment","bi-plus-lg","add-payment"))}
      <div class="invoice-summary"><div class="card-panel"><div class="mini-kpi-label">Receipts this month</div><div class="mini-kpi-value">${money(114800)}</div></div><div class="card-panel"><div class="mini-kpi-label">Customer receipts</div><div class="mini-kpi-value">${payments.filter(p=>p.type!=="Vendor").length}</div></div><div class="card-panel"><div class="mini-kpi-label">Vendor payments</div><div class="mini-kpi-value">${payments.filter(p=>p.type==="Vendor").length}</div></div><div class="card-panel"><div class="mini-kpi-label">Unapplied</div><div class="mini-kpi-value">${money(0)}</div></div></div>
      <section class="card-panel"><div class="panel-heading"><div><h3 class="panel-title">Payment activity</h3><div class="panel-sub">Confirmed payments remain in the audit trail</div></div><div class="filter-row"><div class="search-box"><i class="bi bi-search"></i><input class="form-control" id="record-search" placeholder="Search payments..."></div><select class="form-select" id="payment-type" style="width:145px"><option>All payments</option><option>Customer receipt</option><option>Vendor payment</option></select></div></div>
      <div class="table-wrap"><table class="table" id="payment-table"><thead><tr><th>Payment ref.</th><th>Date</th><th>Party</th><th>Type</th><th>Allocation</th><th>Method</th><th>Amount</th><th>Status</th></tr></thead><tbody>${payments.map(p=>`<tr><td class="table-name">${p.ref}</td><td>${p.date}</td><td>${p.party}</td><td>${p.type==="Vendor"?"Vendor payment":"Customer receipt"}</td><td>${p.invoice}</td><td>${p.method}</td><td class="table-name">${money(p.amount)}</td><td>${statusPill(p.status)}</td></tr>`).join("")}</tbody></table></div></section>
      <div class="help-copy mt-3"><i class="bi bi-shield-lock me-1"></i>Confirmed transactions are adjusted through reversal, not deletion. Allocations cannot exceed the invoice balance.</div>`;
  }
  function render() {
    const pages={dashboard,customers:()=>genericListPage("customers"),vendors:()=>genericListPage("vendors"),companies:()=>genericListPage("companies"),ingredients:()=>catalogPage("ingredients"),products:()=>catalogPage("products"),slabs:slabsPage,quickquote:quickQuote,quotations:quotationsPage,invoices:invoicesPage,payments:paymentsPage};
    appShell((pages[currentPage]||dashboard)());
    bindCommon();
    if(currentPage==="quickquote") bindQuote();
    if(currentPage==="invoices"&&!selectedInvoice) document.querySelectorAll(".invoice-open").forEach(b=>b.onclick=()=>{selectedInvoice=invoices[Number(b.dataset.index)];render();});
    if(currentPage==="invoices"&&selectedInvoice){document.getElementById("back-invoices").onclick=()=>{selectedInvoice=null;render();};document.getElementById("invoice-pay").onclick=()=>openPaymentModal(selectedInvoice);}
  }
  function bindCommon() {
    const bind=(id,fn)=>{const e=document.getElementById(id);if(e)e.onclick=fn;};
    bind("dash-quote",()=>{window.quoteDraft=null;window.quoteLoadedCustomer=null;navigate("quickquote");});
    bind("all-quotes",()=>navigate("quotations"));bind("activity-view",()=>navigate("quotations"));
    bind("new-quote",()=>{window.quoteDraft=null;window.quoteLoadedCustomer=null;navigate("quickquote");});
    bind("open-slabs",()=>navigate("slabs"));bind("new-recipe",()=>openRecipeModal());bind("product-tab",()=>{});
    bind("add-record",()=>openMasterModal(currentPage));
    bind("add-ingredient",()=>openIngredientModal());
    bind("add-slab",()=>openSlabModal());
    bind("add-payment",()=>openPaymentModal());
    bind("new-invoice",()=>openInvoiceModal());
    bind("export-list",()=>showToast("Demo export prepared — no file was downloaded."));
    bind("price-history",()=>showToast("Price history: Aloe Vera Extract · Rs 1,720 → Rs 1,850/kg."));
    bind("reset-quote",()=>{window.quoteDraft=null;window.quoteLoadedCustomer=null;render();showToast("Quick quote reset.");});
    bind("save-quote",saveQuote);
    const search=document.getElementById("record-search");
    if(search) search.addEventListener("input",()=>filterTable(search.value));
    const sf=document.getElementById("status-filter");
    if(sf) sf.onchange=()=>{const q=sf.value;document.querySelectorAll("#records-table tbody tr").forEach(r=>r.style.display=(q==="All statuses"||r.textContent.includes(q))?"":"none");};
    const pf=document.getElementById("payment-type");
    if(pf) pf.onchange=()=>{const q=pf.value;document.querySelectorAll("#payment-table tbody tr").forEach(r=>r.style.display=(q==="All payments"||r.cells[3].textContent===q)?"":"none");};
    document.querySelectorAll(".ingredient-edit").forEach(b=>b.onclick=()=>openIngredientModal(Number(b.dataset.index)));
    document.querySelectorAll(".slab-edit").forEach(b=>b.onclick=()=>openSlabModal(Number(b.dataset.index)));
    document.querySelectorAll(".product-edit").forEach(b=>b.onclick=()=>openRecipeModal(Number(b.dataset.index)));
  }
  function filterTable(q) {
    const table=document.getElementById("records-table")||document.getElementById("invoice-table")||document.getElementById("payment-table");
    if(!table)return;
    table.querySelectorAll("tbody tr").forEach(row=>row.style.display=row.textContent.toLowerCase().includes(q.toLowerCase())?"":"none");
  }
  function bindQuote() {
    const customer=document.getElementById("quote-customer");
    customer.onchange=()=>{const c=customer.value;const h=quoteHistory[c];window.quoteLoadedCustomer=h?c:null;window.quoteDraft=h?{...h}:{product:products[0].name,quantity:1,units:1,labour:0,design:0,packaging:0,label:0,box:0,carton:0,transport:0,selling:0};render();};
    const ids=["product","quantity","units","labour","design","packaging","label","box","carton","transport","selling"];
    ids.forEach(id=>{const el=document.getElementById("quote-"+id);el.addEventListener(id==="product"?"change":"change",()=>{const d=window.quoteDraft||{};d[id]=id==="product"?el.value:Number(el.value);window.quoteDraft=d;render();});});
  }
  function saveQuote() {
    const customer=document.getElementById("quote-customer").value;
    const product=document.getElementById("quote-product").value;
    const quantity=Number(document.getElementById("quote-quantity").value);
    const units=Number(document.getElementById("quote-units").value);
    if(!customer||!product||quantity<=0||units<=0){showToast("Complete customer, product, weight and units before saving.");return;}
    const fields=["labour","design","packaging","label","box","carton","transport","selling"];
    const d={customer,product,quantity,units};fields.forEach(k=>d[k]=Number(document.getElementById("quote-"+k).value)||0);
    const p=products.find(x=>x.name===product);const total=(p.cost*units)+d.labour+d.design+d.packaging+d.label+d.box+d.carton+d.transport;
    const ref=`QT-2026-${String(49+quotes.length-5).padStart(4,"0")}`;
    quotes.unshift({ref,customer,product,quantity,units,date:"18 Nov 2026",total:Math.round(d.selling*units),status:"Draft",recipe:product});
    window.quoteDraft=null;window.quoteLoadedCustomer=null;showToast(`Quotation ${ref} saved as a new draft.`);navigate("quotations");
  }
  function modalShell(title,body,saveLabel,saveHandler) {
    const old=document.getElementById("active-modal");if(old)old.remove();
    const wrap=document.createElement("div");wrap.id="active-modal";wrap.innerHTML=`<div class="modal fade" tabindex="-1"><div class="modal-dialog modal-dialog-centered modal-lg"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">${title}</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">${body}</div><div class="modal-footer"><button class="btn btn-light" data-bs-dismiss="modal">Cancel</button><button class="btn btn-primary" id="modal-save">${saveLabel}</button></div></div></div></div>`;
    document.body.appendChild(wrap);const modal=new bootstrap.Modal(wrap.querySelector(".modal"));wrap.querySelector("#modal-save").onclick=()=>saveHandler(modal);modal.show();wrap.querySelector(".modal").addEventListener("hidden.bs.modal",()=>wrap.remove());
  }
  function openMasterModal(kind) {
    const isCustomer=kind==="customers", isVendor=kind==="vendors", entity=isCustomer?"customer":isVendor?"vendor":"company";
    const fields=isCustomer?[["name","Customer name"],["number","Customer number"],["email","Email"],["city","City"]]:
      isVendor?[["name","Vendor name"],["address","Address"],["city","City"],["phone","Phone"],["bank","Bank"],["country","Country"],["email","Email"],["ntn","NTN"]]:
      [["name","Company name"],["address","Address"],["ntn","NTN"],["phone","Phone"],["email","Email"],["bank","Bank"],["city","City"],["country","Country"]];
    modalShell(`Add ${entity}`,`<div class="row g-3">${fields.map(([id,label])=>`<div class="${fields.length>4?"col-md-6":"col-md-6"}"><label class="form-label">${label} *</label><input class="form-control" id="master-${id}" placeholder="${label}"></div>`).join("")}</div>`, `Save ${entity}`,modal=>{
      const record={};fields.forEach(([id])=>record[id]=document.getElementById("master-"+id).value.trim());
      if(fields.some(([id])=>!record[id])){showToast("Please complete all required fields.");return;}
      if(isCustomer){record.status="Active";record.quotes=0;customers.unshift(record);}
      else if(isVendor){record.number=`VEN-${String(17+vendors.length).padStart(5,"0")}`;record.status="Active";vendors.unshift(record);}
      else companies.unshift(record);
      modal.hide();render();showToast(`${entity[0].toUpperCase()+entity.slice(1)} added successfully.`);
    });
  }
  function openIngredientModal(index) {
    const item=index===undefined?{name:"",price:"",vendor:vendors[0].name}:ingredients[index];
    modalShell(index===undefined?"Add ingredient":"Update ingredient",`<div class="row g-3"><div class="col-md-6"><label class="form-label">Ingredient name *</label><input class="form-control" id="ing-name" value="${esc(item.name)}"></div><div class="col-md-6"><label class="form-label">Price per kg (PKR) *</label><input type="number" class="form-control" id="ing-price" value="${item.price}"></div><div class="col-md-6"><label class="form-label">Vendor</label><select class="form-select" id="ing-vendor">${selectOptions(vendors.map(v=>v.name),item.vendor)}</select></div><div class="col-md-6"><label class="form-label">COA / literature</label><input type="file" class="form-control" id="ing-file"><div class="form-hint">Prototype only — uploaded file is not stored.</div></div></div>`,index===undefined?"Add ingredient":"Save changes",modal=>{
      const name=document.getElementById("ing-name").value.trim(),price=Number(document.getElementById("ing-price").value);
      if(!name||price<=0){showToast("Enter an ingredient name and valid price.");return;}
      if(index===undefined) ingredients.unshift({name,code:`ING-${String(ingredients.length+19).padStart(4,"0")}`,price,vendor:document.getElementById("ing-vendor").value,updated:"18 Nov 2026",status:"Active"});
      else Object.assign(ingredients[index],{name,price,vendor:document.getElementById("ing-vendor").value,updated:"18 Nov 2026"});
      modal.hide();render();showToast("Ingredient saved. Price history updated.");
    });
  }
  function openSlabModal(index) {
    const x=index===undefined?{min:"",max:"",unit:""}:slabs[index];
    modalShell(index===undefined?"Add weight price slab":"Edit weight price slab",`<div class="row g-3"><div class="col-md-4"><label class="form-label">Minimum kg *</label><input type="number" min="1" class="form-control" id="slab-min" value="${x.min===31?"":x.min}"></div><div class="col-md-4"><label class="form-label">Maximum kg</label><input type="number" min="1" class="form-control" id="slab-max" value="${x.max===9999?"":x.max}" placeholder="Leave blank for no limit"></div><div class="col-md-4"><label class="form-label">Price per unit (PKR) *</label><input type="number" min="1" class="form-control" id="slab-unit" value="${x.unit}"></div><div class="col-12"><div class="help-copy">Ranges must not overlap. A blank maximum creates an open-ended slab (e.g. Above 30 kg).</div></div></div>`, "Save slab",modal=>{
      const min=Number(document.getElementById("slab-min").value),rawMax=document.getElementById("slab-max").value,max=rawMax?Number(rawMax):9999,unit=Number(document.getElementById("slab-unit").value);
      if(min<1||max<min||unit<=0){showToast("Enter a valid range and price.");return;}
      if(slabs.some((s,i)=>i!==index&&min<=s.max&&max>=s.min)){showToast("This range overlaps an existing price slab.");return;}
      const obj={min,max,label:max===9999?`Above ${min-1} kg`:`${min}–${max} kg`,unit};
      if(index===undefined)slabs.push(obj);else slabs[index]=obj;
      slabs.sort((a,b)=>a.min-b.min);modal.hide();render();showToast("Price slab saved.");
    });
  }
  function openRecipeModal(index) {
    const p=index===undefined?{name:"",code:"",category:"Skincare"}:products[index];
    ingredientRows=index===undefined?[{ingredient:ingredients[0].name,qty:0.04},{ingredient:ingredients[1].name,qty:0.025},{ingredient:ingredients[3].name,qty:0.005}]:[{ingredient:ingredients[0].name,qty:0.04},{ingredient:ingredients[2].name,qty:0.02}];
    const body=`<div class="row g-3 mb-4"><div class="col-md-6"><label class="form-label">Product / recipe name *</label><input class="form-control" id="recipe-name" value="${esc(p.name)}" placeholder="e.g. Citrus Hand Lotion"></div><div class="col-md-3"><label class="form-label">Category</label><select class="form-select" id="recipe-category">${selectOptions(["Skincare","Body care","Hair care"],p.category)}</select></div><div class="col-md-3"><label class="form-label">Approval status</label><select class="form-select" id="recipe-status">${selectOptions(["Draft","In review","Approved"],"Draft")}</select></div></div>
      <div class="split-heading mb-2"><div><div class="section-label mb-0">BOM ingredients</div><div class="form-hint">Quantity per finished unit · ingredient unit price is per kg</div></div><button class="btn btn-light" id="recipe-add-row"><i class="bi bi-plus me-1"></i>Add ingredient</button></div>
      <div class="recipe-line" style="color:#929c96;font-size:9px"><div>INGREDIENT</div><div>QTY (KG / UNIT)</div><div>PRICE / KG</div><div>LINE COST</div><div></div></div><div id="recipe-rows"></div>
      <div class="d-flex justify-content-end pt-2"><div class="detail-box" style="min-width:200px"><div class="detail-label">Calculated cost per unit</div><div class="detail-value text-success fs-6" id="recipe-total">Rs 0</div></div></div>`;
    modalShell(index===undefined?"New product recipe":"Edit product recipe",body,"Save recipe version",modal=>{
      const name=document.getElementById("recipe-name").value.trim();
      if(!name){showToast("Recipe name is required.");return;}
      const cost=ingredientRows.reduce((sum,r)=>sum+Number(r.qty)*Number(ingredients.find(i=>i.name===r.ingredient)?.price||0),0);
      const record={name,code:p.code||`PRD-${String(products.length+12).padStart(4,"0")}`,category:document.getElementById("recipe-category").value,recipe:`RC-${String(products.length+12).padStart(4,"0")} · v${index===undefined?1:3}`,cost:Math.round(cost),status:document.getElementById("recipe-status").value};
      if(index===undefined)products.unshift(record);else products[index]=record;
      modal.hide();render();showToast("Recipe version saved with ingredient costing.");
    });
    const paintRows=()=>{
      const c=document.getElementById("recipe-rows");if(!c)return;
      c.innerHTML=ingredientRows.map((r,i)=>{const ing=ingredients.find(x=>x.name===r.ingredient)||ingredients[0];return `<div class="recipe-line"><select class="form-select recipe-ingredient" data-i="${i}">${selectOptions(ingredients.map(x=>x.name),r.ingredient)}</select><input class="form-control recipe-qty" data-i="${i}" type="number" min="0" step="0.001" value="${r.qty}"><input class="form-control readonly" readonly value="${money(ing.price)}"><div class="form-control readonly recipe-line-total">${money(ing.price*r.qty)}</div><button class="icon-btn recipe-remove" data-i="${i}"><i class="bi bi-x"></i></button></div>`;}).join("");
      const total=ingredientRows.reduce((a,r)=>a+Number(r.qty)*(ingredients.find(x=>x.name===r.ingredient)?.price||0),0);document.getElementById("recipe-total").textContent=money(total);
      c.querySelectorAll(".recipe-ingredient").forEach(e=>e.onchange=()=>{ingredientRows[Number(e.dataset.i)].ingredient=e.value;paintRows();});
      c.querySelectorAll(".recipe-qty").forEach(e=>e.oninput=()=>{ingredientRows[Number(e.dataset.i)].qty=Number(e.value);paintRows();});
      c.querySelectorAll(".recipe-remove").forEach(e=>e.onclick=()=>{ingredientRows.splice(Number(e.dataset.i),1);paintRows();});
    };
    document.getElementById("recipe-add-row").onclick=()=>{ingredientRows.push({ingredient:ingredients[0].name,qty:0});paintRows();};
    paintRows();
  }
  function openInvoiceModal() {
    const customer=customers.find(c=>c.status==="Active").name;
    const approved=quotes.filter(q=>q.status==="Approved");
    modalShell("Create invoice",`<div class="row g-3"><div class="col-md-6"><label class="form-label">Customer *</label><select class="form-select" id="inv-customer">${selectOptions(customers.filter(c=>c.status==="Active").map(c=>c.name),customer)}</select></div><div class="col-md-6"><label class="form-label">Approved quotation *</label><select class="form-select" id="inv-quote">${approved.map(q=>`<option value="${q.ref}">${q.ref} · ${q.customer} · ${money(q.total)}</option>`).join("")}</select></div><div class="col-md-6"><label class="form-label">Issue date</label><input class="form-control" type="date" id="inv-date" value="2026-11-18"></div><div class="col-md-6"><label class="form-label">Due date</label><input class="form-control" type="date" id="inv-due" value="2026-12-18"></div><div class="col-12 help-copy">An invoice is created from an approved quotation. Issued invoices retain their number and audit history.</div></div>`, "Create invoice",modal=>{
      const q=approved.find(x=>x.ref===document.getElementById("inv-quote").value);if(!q){showToast("Select an approved quotation.");return;}
      const no=`INV-2026-${String(29+invoices.length-4).padStart(4,"0")}`;
      invoices.unshift({no,customer:document.getElementById("inv-customer").value,date:"18 Nov 2026",due:"18 Dec 2026",total:q.total,paid:0,status:"Issued",item:`${q.product} · ${q.units||1} units`});
      modal.hide();render();showToast(`Invoice ${no} created.`);
    });
  }
  function openPaymentModal(invoice) {
    const openInvoices=invoices.filter(i=>i.total>i.paid);
    const chosen=invoice||openInvoices[0];
    modalShell("Record payment",`<div class="row g-3">
      <div class="col-md-6"><label class="form-label">Payment type</label><select class="form-select" id="pay-type"><option>Customer receipt</option><option>Vendor payment</option></select></div>
      <div class="col-md-6"><label class="form-label">Payment date *</label><input type="date" class="form-control" id="pay-date" value="2026-11-18"></div>
      <div class="col-md-6"><label class="form-label">Customer / vendor *</label><select class="form-select" id="pay-party">${selectOptions([...customers.filter(c=>c.status==="Active").map(c=>c.name),...vendors.map(v=>v.name)],chosen?.customer||customers[0].name)}</select></div>
      <div class="col-md-6"><label class="form-label">Invoice allocation</label><select class="form-select" id="pay-invoice"><option value="">Unapplied</option>${openInvoices.map(i=>`<option value="${i.no}" ${chosen?.no===i.no?"selected":""}>${i.no} · balance ${money(i.total-i.paid)}</option>`).join("")}</select></div>
      <div class="col-md-6"><label class="form-label">Amount (PKR) *</label><input type="number" min="1" class="form-control" id="pay-amount" value="${chosen?chosen.total-chosen.paid:""}"></div>
      <div class="col-md-6"><label class="form-label">Payment method</label><select class="form-select" id="pay-method">${selectOptions(["Bank transfer","Cash","Cheque","Card","Electronic"],"Bank transfer")}</select></div>
      <div class="col-md-6"><label class="form-label">Reference / cheque no.</label><input class="form-control" id="pay-ref" placeholder="e.g. TRX-218463"></div>
      <div class="col-md-6"><label class="form-label">Bank</label><input class="form-control" id="pay-bank" placeholder="Bank name"></div>
      <div class="col-12"><label class="form-label">Notes</label><input class="form-control" id="pay-notes" placeholder="Optional notes"></div>
      <div class="col-12 help-copy"><i class="bi bi-info-circle me-1"></i>Payment allocation cannot exceed outstanding balance. Confirmation creates an immutable payment entry.</div></div>`, "Confirm payment",modal=>{
      const amount=Number(document.getElementById("pay-amount").value),invno=document.getElementById("pay-invoice").value,party=document.getElementById("pay-party").value;
      if(amount<=0){showToast("Enter a valid payment amount.");return;}
      const target=invoices.find(i=>i.no===invno);
      if(target&&amount>target.total-target.paid){showToast("Payment exceeds the invoice outstanding balance.");return;}
      const type=document.getElementById("pay-type").value==="Vendor payment"?"Vendor":"Customer";
      if(target){target.paid+=amount;target.status=target.paid===target.total?"Paid":"Partially Paid";}
      const ref=`PAY-2026-${String(34+payments.length).padStart(4,"0")}`;
      payments.unshift({ref,date:"18 Nov 2026",party,invoice:target?target.no:"Unapplied",method:document.getElementById("pay-method").value,amount,status:"Confirmed",type:type==="Vendor"?"Vendor":"Customer"});
      modal.hide();if(selectedInvoice){selectedInvoice=target||selectedInvoice;}render();showToast(`Payment ${ref} confirmed and allocated.`);
    });
    const typeEl=document.getElementById("pay-type");
    typeEl.onchange=()=>{const partyEl=document.getElementById("pay-party");const invoiceEl=document.getElementById("pay-invoice");const isVendor=typeEl.value==="Vendor payment";const list=isVendor?vendors.map(v=>v.name):customers.filter(c=>c.status==="Active").map(c=>c.name);partyEl.innerHTML=selectOptions(list,list[0]);invoiceEl.disabled=isVendor;if(isVendor)invoiceEl.value="";};
    document.getElementById("pay-invoice").onchange=e=>{const i=invoices.find(x=>x.no===e.target.value);if(i)document.getElementById("pay-amount").value=i.total-i.paid;};
  }
  function renderLogin() {
    app.innerHTML=`<div class="login-screen"><section class="login-visual"><div class="brand login-logo"><div class="brand-mark" style="background:#fff;color:var(--green)">i</div><div><div class="brand-name" style="color:#fff">iffi</div><div class="brand-tag" style="color:rgba(255,255,255,.6)">Business workspace</div></div></div><div><div class="eyebrow" style="color:#b4d7c7">A calmer way to run your business</div><h1 class="login-main-title">Everything in your business, in one place.</h1><p class="login-copy">From your first customer quote to the final payment — manage your products, costs and customer relationships with clarity.</p></div><div class="login-visual-foot">© 2026 Iffi ERP · Prototype preview</div></section>
      <section class="login-form-side"><form class="login-form" id="login-form"><div class="eyebrow">Welcome back</div><h2>Sign in to your workspace</h2><p class="page-subtitle mb-4">Use the demo account to explore the Iffi ERP prototype.</p>
        <label class="form-label" for="login-email">Email address</label><input class="form-control mb-3" id="login-email" type="email" value="ayesha@iffinaturals.pk" required>
        <label class="form-label" for="login-password">Password</label><div class="input-group mb-3"><input class="form-control" id="login-password" type="password" value="iffi-demo" required><button class="btn btn-light" type="button" id="toggle-password"><i class="bi bi-eye"></i></button></div>
        <div class="d-flex justify-content-between align-items-center mb-4"><label class="d-flex align-items-center gap-2" style="font-size:11px;color:#68746d"><input type="checkbox" checked> Remember me</label><a href="#" id="forgot-password" style="font-size:11px;color:var(--green);text-decoration:none">Forgot password?</a></div>
        <button class="btn btn-primary w-100 py-2" type="submit">Sign in <i class="bi bi-arrow-right ms-1"></i></button>
        <div class="login-demo-hint"><i class="bi bi-info-circle me-1"></i>Demo mode — any valid email and password will open the workspace. No credentials are sent or stored.</div>
      </form></section></div>`;
    document.getElementById("login-form").onsubmit=e=>{e.preventDefault();render();};
    document.getElementById("toggle-password").onclick=()=>{const p=document.getElementById("login-password");p.type=p.type==="password"?"text":"password";};
    document.getElementById("forgot-password").onclick=e=>{e.preventDefault();showToast("Password reset is not connected in this browser-only demo.");};
  }
  renderLogin();
})();
